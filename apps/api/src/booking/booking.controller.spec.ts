import { Test, TestingModule } from '@nestjs/testing';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import {
  Role,
  BookingStatus,
  BookingType,
  SpecialRequirements,
} from '@prisma/client';

describe('BookingController', () => {
  let controller: BookingController;
  let bookingService: BookingService;

  const mockBookingService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    cancel: jest.fn(),
    remove: jest.fn(),
    getBookingStats: jest.fn(),
  };

  const mockRequest = {
    user: {
      id: 1,
      role: Role.CLIENT,
    },
  };

  const mockBooking = {
    id: 1,
    clientId: 1,
    dependentId: null,
    pickupAddress: '123 rue de la Santé',
    destinationAddress: 'Hôpital Saint-Louis',
    pickupCity: 'Paris',
    destinationCity: 'Paris',
    pickupPostalCode: '75010',
    destinationPostalCode: '75010',
    scheduledDateTime: new Date('2024-12-25T14:30:00Z'),
    bookingType: BookingType.MEDICAL_APPOINTMENT,
    status: BookingStatus.PENDING,
    specialRequirements: [SpecialRequirements.NEEDS_OXYGEN],
    notes: 'Patient avec mobilité réduite',
    estimatedDuration: 60,
    createdAt: new Date(),
    updatedAt: new Date(),
    client: {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+33123456789',
    },
    dependent: null,
    transportTickets: [],
    assignments: [],
  };

  const mockBookingsList = {
    data: [mockBooking],
    meta: {
      total: 1,
      page: 1,
      limit: 10,
      totalPages: 1,
    },
  };

  const mockBookingStats = {
    total: 15,
    byStatus: {
      pending: 2,
      confirmed: 3,
      inProgress: 1,
      completed: 8,
      cancelled: 1,
    },
    byType: {
      emergency: 5,
      scheduled: 10,
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingController],
      providers: [
        {
          provide: BookingService,
          useValue: mockBookingService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<BookingController>(BookingController);
    bookingService = module.get<BookingService>(BookingService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    const createBookingDto = {
      pickupAddress: '123 rue de la Santé',
      destinationAddress: 'Hôpital Saint-Louis',
      pickupCity: 'Paris',
      destinationCity: 'Paris',
      pickupPostalCode: '75010',
      destinationPostalCode: '75010',
      scheduledDateTime: '2024-12-25T14:30:00Z',
      bookingType: BookingType.MEDICAL_APPOINTMENT,
      specialRequirements: [SpecialRequirements.NEEDS_OXYGEN],
      notes: 'Patient avec mobilité réduite',
      estimatedDuration: 60,
    };

    it('should create a booking', async () => {
      mockBookingService.create.mockResolvedValue(mockBooking);

      const result = await controller.create(
        mockRequest as any,
        createBookingDto,
      );

      expect(bookingService.create).toHaveBeenCalledWith(
        mockRequest.user.id,
        createBookingDto,
      );
      expect(result).toEqual(mockBooking);
    });

    it('should handle service errors', async () => {
      const error = new Error('Service error');
      mockBookingService.create.mockRejectedValue(error);

      await expect(
        controller.create(mockRequest as any, createBookingDto),
      ).rejects.toThrow(error);
    });
  });

  describe('findAll', () => {
    const filters = {
      page: 1,
      limit: 10,
      status: BookingStatus.PENDING,
      bookingType: BookingType.MEDICAL_APPOINTMENT,
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-12-31T23:59:59Z',
    };

    it('should return paginated bookings', async () => {
      mockBookingService.findAll.mockResolvedValue(mockBookingsList);

      const result = await controller.findAll(mockRequest as any, filters);

      expect(bookingService.findAll).toHaveBeenCalledWith(
        mockRequest.user.id,
        mockRequest.user.role,
        filters,
      );
      expect(result).toEqual(mockBookingsList);
    });

    it('should handle empty filters', async () => {
      const emptyFilters = {};
      mockBookingService.findAll.mockResolvedValue(mockBookingsList);

      await controller.findAll(mockRequest as any, emptyFilters as any);

      expect(bookingService.findAll).toHaveBeenCalledWith(
        mockRequest.user.id,
        mockRequest.user.role,
        emptyFilters,
      );
    });
  });

  describe('getStats', () => {
    it('should return booking statistics', async () => {
      mockBookingService.getBookingStats.mockResolvedValue(mockBookingStats);

      const result = await controller.getStats(mockRequest as any);

      expect(bookingService.getBookingStats).toHaveBeenCalledWith(
        mockRequest.user.id,
        mockRequest.user.role,
      );
      expect(result).toEqual(mockBookingStats);
    });

    it('should handle service errors', async () => {
      const error = new Error('Stats error');
      mockBookingService.getBookingStats.mockRejectedValue(error);

      await expect(controller.getStats(mockRequest as any)).rejects.toThrow(
        error,
      );
    });
  });

  describe('findOne', () => {
    it('should return a single booking', async () => {
      mockBookingService.findOne.mockResolvedValue(mockBooking);

      const result = await controller.findOne(1, mockRequest as any);

      expect(bookingService.findOne).toHaveBeenCalledWith(
        1,
        mockRequest.user.id,
        mockRequest.user.role,
      );
      expect(result).toEqual(mockBooking);
    });

    it('should handle not found errors', async () => {
      const error = new Error('Booking not found');
      mockBookingService.findOne.mockRejectedValue(error);

      await expect(controller.findOne(999, mockRequest as any)).rejects.toThrow(
        error,
      );
    });
  });

  describe('update', () => {
    const updateBookingDto = {
      notes: 'Updated notes',
      status: BookingStatus.CONFIRMED,
    };

    it('should update a booking', async () => {
      const updatedBooking = { ...mockBooking, ...updateBookingDto };
      mockBookingService.update.mockResolvedValue(updatedBooking);

      const result = await controller.update(
        1,
        mockRequest as any,
        updateBookingDto,
      );

      expect(bookingService.update).toHaveBeenCalledWith(
        1,
        mockRequest.user.id,
        mockRequest.user.role,
        updateBookingDto,
      );
      expect(result).toEqual(updatedBooking);
    });

    it('should handle update errors', async () => {
      const error = new Error('Update failed');
      mockBookingService.update.mockRejectedValue(error);

      await expect(
        controller.update(1, mockRequest as any, updateBookingDto),
      ).rejects.toThrow(error);
    });
  });

  describe('cancel', () => {
    it('should cancel a booking', async () => {
      const cancelledBooking = {
        ...mockBooking,
        status: BookingStatus.CANCELLED,
      };
      mockBookingService.cancel.mockResolvedValue(cancelledBooking);

      const result = await controller.cancel(1, mockRequest as any);

      expect(bookingService.cancel).toHaveBeenCalledWith(
        1,
        mockRequest.user.id,
        mockRequest.user.role,
      );
      expect(result).toEqual(cancelledBooking);
    });

    it('should handle cancellation errors', async () => {
      const error = new Error('Cancellation failed');
      mockBookingService.cancel.mockRejectedValue(error);

      await expect(controller.cancel(1, mockRequest as any)).rejects.toThrow(
        error,
      );
    });
  });

  describe('remove', () => {
    it('should delete a booking', async () => {
      mockBookingService.remove.mockResolvedValue(undefined);

      const result = await controller.remove(1, mockRequest as any);

      expect(bookingService.remove).toHaveBeenCalledWith(
        1,
        mockRequest.user.id,
        mockRequest.user.role,
      );
      expect(result).toBeUndefined();
    });

    it('should handle deletion errors', async () => {
      const error = new Error('Deletion failed');
      mockBookingService.remove.mockRejectedValue(error);

      await expect(controller.remove(1, mockRequest as any)).rejects.toThrow(
        error,
      );
    });
  });

  describe('Role-based access', () => {
    it('should work with different user roles', async () => {
      const adminRequest = {
        user: {
          id: 2,
          role: Role.ADMIN,
        },
      };

      mockBookingService.findAll.mockResolvedValue(mockBookingsList);

      await controller.findAll(adminRequest as any, {});

      expect(bookingService.findAll).toHaveBeenCalledWith(2, Role.ADMIN, {});
    });

    it('should work with fleet manager role', async () => {
      const fleetManagerRequest = {
        user: {
          id: 3,
          role: Role.FLEET_MANAGER,
        },
      };

      mockBookingService.findOne.mockResolvedValue(mockBooking);

      await controller.findOne(1, fleetManagerRequest as any);

      expect(bookingService.findOne).toHaveBeenCalledWith(
        1,
        3,
        Role.FLEET_MANAGER,
      );
    });

    it('should work with ambulance driver role', async () => {
      const driverRequest = {
        user: {
          id: 4,
          role: Role.AMBULANCE_DRIVER,
        },
      };

      mockBookingService.getBookingStats.mockResolvedValue(mockBookingStats);

      await controller.getStats(driverRequest as any);

      expect(bookingService.getBookingStats).toHaveBeenCalledWith(
        4,
        Role.AMBULANCE_DRIVER,
      );
    });
  });

  describe('Parameter validation', () => {
    it('should handle ParseIntPipe for id parameter', async () => {
      mockBookingService.findOne.mockResolvedValue(mockBooking);

      // Test with valid number
      await controller.findOne(1, mockRequest as any);
      expect(bookingService.findOne).toHaveBeenCalledWith(
        1,
        mockRequest.user.id,
        mockRequest.user.role,
      );

      // ParseIntPipe validation is handled by NestJS framework
      // In real tests, invalid strings would be rejected before reaching the controller method
    });
  });

  describe('DTO validation', () => {
    it('should handle valid create booking DTO', async () => {
      const validDto = {
        pickupAddress: '123 rue de la Santé',
        destinationAddress: 'Hôpital Saint-Louis',
        pickupCity: 'Paris',
        destinationCity: 'Paris',
        bookingType: BookingType.MEDICAL_APPOINTMENT,
        scheduledDateTime: '2024-12-25T14:30:00Z',
      };

      mockBookingService.create.mockResolvedValue(mockBooking);

      await controller.create(mockRequest as any, validDto);

      expect(bookingService.create).toHaveBeenCalledWith(
        mockRequest.user.id,
        validDto,
      );
    });

    it('should handle valid update booking DTO', async () => {
      const validUpdateDto = {
        notes: 'Updated notes',
        estimatedDuration: 90,
      };

      const updatedBooking = { ...mockBooking, ...validUpdateDto };
      mockBookingService.update.mockResolvedValue(updatedBooking);

      await controller.update(1, mockRequest as any, validUpdateDto);

      expect(bookingService.update).toHaveBeenCalledWith(
        1,
        mockRequest.user.id,
        mockRequest.user.role,
        validUpdateDto,
      );
    });

    it('should handle valid filters DTO', async () => {
      const validFilters = {
        status: BookingStatus.CONFIRMED,
        page: 2,
        limit: 5,
      };

      mockBookingService.findAll.mockResolvedValue(mockBookingsList);

      await controller.findAll(mockRequest as any, validFilters);

      expect(bookingService.findAll).toHaveBeenCalledWith(
        mockRequest.user.id,
        mockRequest.user.role,
        validFilters,
      );
    });
  });
});
