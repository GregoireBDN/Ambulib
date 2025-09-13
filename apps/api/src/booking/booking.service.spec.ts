import { Test, TestingModule } from '@nestjs/testing';
import { BookingService } from './booking.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import {
  Role,
  BookingStatus,
  BookingType,
  SpecialRequirements,
} from '@prisma/client';

describe('BookingService', () => {
  let service: BookingService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
    },
    dependent: {
      findFirst: jest.fn(),
    },
    booking: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
    },
  };

  const mockUser = {
    id: 1,
    email: 'client@test.com',
    firstName: 'John',
    lastName: 'Doe',
    role: Role.CLIENT,
    phoneNumber: '+33123456789',
  };

  const mockBooking = {
    id: 1,
    clientId: 1,
    pickupAddress: '123 rue de la Santé',
    destinationAddress: 'Hôpital Saint-Louis',
    pickupDateTime: new Date('2024-12-25T14:30:00Z'),
    appointmentDateTime: new Date('2024-12-25T15:00:00Z'),
    returnTrip: false,
    returnDateTime: null,
    bookingType: BookingType.MEDICAL_APPOINTMENT,
    status: BookingStatus.PENDING,
    specialRequirements: [SpecialRequirements.NEEDS_OXYGEN],
    notes: 'Patient avec mobilité réduite',
    totalCost: 45.0,
    createdAt: new Date(),
    updatedAt: new Date(),
    client: {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+33123456789',
      email: 'john@test.com',
    },
    transportTickets: [],
    assignments: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<BookingService>(BookingService);
    prismaService = module.get<PrismaService>(PrismaService);

    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 30); // 30 days from now

    const createBookingDto = {
      pickupAddress: '123 rue de la Santé',
      destinationAddress: 'Hôpital Saint-Louis',
      pickupCity: 'Paris',
      destinationCity: 'Paris',
      pickupPostalCode: '75010',
      destinationPostalCode: '75010',
      pickupDateTime: futureDate.toISOString(),
      bookingType: BookingType.MEDICAL_APPOINTMENT,
      specialRequirements: [SpecialRequirements.NEEDS_OXYGEN],
      notes: 'Patient avec mobilité réduite',
      estimatedDuration: 60,
    };

    it('should create a booking successfully', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.booking.create.mockResolvedValue(mockBooking);

      const result = await service.create(1, createBookingDto);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prismaService.booking.create).toHaveBeenCalledWith({
        data: {
          ...createBookingDto,
          clientId: 1,
          pickupDateTime: new Date(createBookingDto.pickupDateTime),
        },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockBooking);
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.create(1, createBookingDto)).rejects.toThrow(
        new NotFoundException('Utilisateur introuvable'),
      );
    });

    it('should throw ForbiddenException if user is not a client', async () => {
      const nonClientUser = { ...mockUser, role: Role.ADMIN };
      mockPrismaService.user.findUnique.mockResolvedValue(nonClientUser);

      await expect(service.create(1, createBookingDto)).rejects.toThrow(
        new ForbiddenException(
          'Seuls les clients peuvent créer des réservations',
        ),
      );
    });

    it('should throw BadRequestException for scheduled booking without date', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      const invalidDto = { ...createBookingDto, pickupDateTime: undefined };

      await expect(service.create(1, invalidDto)).rejects.toThrow(
        new BadRequestException(
          'Date et heure requises pour les réservations programmées',
        ),
      );
    });

    it('should throw BadRequestException for past date', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      const pastDateDto = {
        ...createBookingDto,
        pickupDateTime: '2023-01-01T10:00:00Z',
      };

      await expect(service.create(1, pastDateDto)).rejects.toThrow(
        new BadRequestException(
          'La date de réservation doit être dans le futur',
        ),
      );
    });

    it('should throw BadRequestException for emergency booking with scheduled date', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      const emergencyDto = {
        ...createBookingDto,
        bookingType: BookingType.EMERGENCY,
        scheduledDateTime: futureDate.toISOString(),
      };

      await expect(service.create(1, emergencyDto)).rejects.toThrow(
        new BadRequestException(
          "Les réservations d'urgence ne peuvent pas avoir de date programmée",
        ),
      );
    });

    it('should verify dependent ownership when dependentId is provided', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.dependent.findFirst.mockResolvedValue({
        id: 1,
        userId: 1,
      });
      mockPrismaService.booking.create.mockResolvedValue(mockBooking);

      const dtoWithDependent = { ...createBookingDto, dependentId: 1 };
      await service.create(1, dtoWithDependent);

      expect(prismaService.dependent.findFirst).toHaveBeenCalledWith({
        where: {
          id: 1,
          userId: 1,
        },
      });
    });

    it('should throw NotFoundException for non-owned dependent', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(mockUser);
      mockPrismaService.dependent.findFirst.mockResolvedValue(null);

      const dtoWithDependent = { ...createBookingDto, dependentId: 1 };

      await expect(service.create(1, dtoWithDependent)).rejects.toThrow(
        new NotFoundException('Dépendant introuvable ou non autorisé'),
      );
    });
  });

  describe('findAll', () => {
    const mockBookingsList = [mockBooking];
    const filters = { page: 1, limit: 10 };

    it('should return bookings for client', async () => {
      mockPrismaService.booking.findMany.mockResolvedValue(mockBookingsList);
      mockPrismaService.booking.count.mockResolvedValue(1);

      const result = await service.findAll(1, Role.CLIENT, filters);

      expect(prismaService.booking.findMany).toHaveBeenCalledWith({
        where: { clientId: 1 },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object),
      });
      expect(result).toEqual({
        data: mockBookingsList,
        meta: {
          total: 1,
          page: 1,
          limit: 10,
          totalPages: 1,
        },
      });
    });

    it('should return bookings for ambulance driver', async () => {
      mockPrismaService.booking.findMany.mockResolvedValue(mockBookingsList);
      mockPrismaService.booking.count.mockResolvedValue(1);

      const result = await service.findAll(2, Role.AMBULANCE_DRIVER, filters);

      expect(prismaService.booking.findMany).toHaveBeenCalledWith({
        where: {
          assignments: {
            some: {
              driverId: 2,
            },
          },
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object),
      });
      expect(result).toBeDefined();
    });

    it('should apply status filter', async () => {
      mockPrismaService.booking.findMany.mockResolvedValue(mockBookingsList);
      mockPrismaService.booking.count.mockResolvedValue(1);

      const filtersWithStatus = { ...filters, status: BookingStatus.CONFIRMED };
      await service.findAll(1, Role.CLIENT, filtersWithStatus);

      expect(prismaService.booking.findMany).toHaveBeenCalledWith({
        where: {
          clientId: 1,
          status: BookingStatus.CONFIRMED,
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object),
      });
    });

    it('should apply date range filter', async () => {
      mockPrismaService.booking.findMany.mockResolvedValue(mockBookingsList);
      mockPrismaService.booking.count.mockResolvedValue(1);

      const filtersWithDates = {
        ...filters,
        startDate: '2024-01-01T00:00:00Z',
        endDate: '2024-12-31T23:59:59Z',
      };
      await service.findAll(1, Role.CLIENT, filtersWithDates);

      expect(prismaService.booking.findMany).toHaveBeenCalledWith({
        where: {
          clientId: 1,
          createdAt: {
            gte: new Date('2024-01-01T00:00:00Z'),
            lte: new Date('2024-12-31T23:59:59Z'),
          },
        },
        skip: 0,
        take: 10,
        orderBy: { createdAt: 'desc' },
        include: expect.any(Object),
      });
    });
  });

  describe('findOne', () => {
    it('should return booking for authorized client', async () => {
      mockPrismaService.booking.findUnique.mockResolvedValue(mockBooking);

      const result = await service.findOne(1, 1, Role.CLIENT);

      expect(prismaService.booking.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: expect.any(Object),
      });
      expect(result).toEqual(mockBooking);
    });

    it('should throw NotFoundException if booking does not exist', async () => {
      mockPrismaService.booking.findUnique.mockResolvedValue(null);

      await expect(service.findOne(1, 1, Role.CLIENT)).rejects.toThrow(
        new NotFoundException('Réservation introuvable'),
      );
    });

    it('should throw ForbiddenException for unauthorized client', async () => {
      const otherUserBooking = { ...mockBooking, clientId: 2 };
      mockPrismaService.booking.findUnique.mockResolvedValue(otherUserBooking);

      await expect(service.findOne(1, 1, Role.CLIENT)).rejects.toThrow(
        new ForbiddenException('Accès non autorisé à cette réservation'),
      );
    });

    it('should allow admin to access any booking', async () => {
      const otherUserBooking = { ...mockBooking, clientId: 2 };
      mockPrismaService.booking.findUnique.mockResolvedValue(otherUserBooking);

      const result = await service.findOne(1, 1, Role.ADMIN);

      expect(result).toEqual(otherUserBooking);
    });
  });

  describe('update', () => {
    const updateDto = { notes: 'Updated notes' };

    beforeEach(() => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockBooking);
    });

    it('should update booking successfully', async () => {
      const updatedBooking = { ...mockBooking, ...updateDto };
      mockPrismaService.booking.update.mockResolvedValue(updatedBooking);

      const result = await service.update(1, 1, Role.ADMIN, updateDto);

      expect(prismaService.booking.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateDto,
        include: expect.any(Object),
      });
      expect(result).toEqual(updatedBooking);
    });

    it('should throw BadRequestException for completed booking', async () => {
      const completedBooking = {
        ...mockBooking,
        status: BookingStatus.COMPLETED,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(completedBooking);

      await expect(service.update(1, 1, Role.ADMIN, updateDto)).rejects.toThrow(
        new BadRequestException(
          'Impossible de modifier une réservation terminée',
        ),
      );
    });

    it('should throw BadRequestException for cancelled booking', async () => {
      const cancelledBooking = {
        ...mockBooking,
        status: BookingStatus.CANCELLED,
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(cancelledBooking);

      await expect(service.update(1, 1, Role.ADMIN, updateDto)).rejects.toThrow(
        new BadRequestException(
          'Impossible de modifier une réservation annulée',
        ),
      );
    });

    it('should restrict client status updates', async () => {
      const statusUpdate = { status: BookingStatus.CONFIRMED };

      await expect(
        service.update(1, 1, Role.CLIENT, statusUpdate),
      ).rejects.toThrow(
        new ForbiddenException(
          'Les clients ne peuvent que annuler leurs réservations',
        ),
      );
    });

    it('should allow client to cancel their booking', async () => {
      const cancelUpdate = { status: BookingStatus.CANCELLED };
      const updatedBooking = {
        ...mockBooking,
        status: BookingStatus.CANCELLED,
      };
      mockPrismaService.booking.update.mockResolvedValue(updatedBooking);

      const result = await service.update(1, 1, Role.CLIENT, cancelUpdate);

      expect(result.status).toBe(BookingStatus.CANCELLED);
    });

    it('should validate future date for rescheduling', async () => {
      const pastDateUpdate = { pickupDateTime: '2023-01-01T10:00:00Z' };

      await expect(
        service.update(1, 1, Role.ADMIN, pastDateUpdate),
      ).rejects.toThrow(
        new BadRequestException('La nouvelle date doit être dans le futur'),
      );
    });
  });

  describe('cancel', () => {
    it('should cancel booking', async () => {
      const cancelledBooking = {
        ...mockBooking,
        status: BookingStatus.CANCELLED,
      };
      jest.spyOn(service, 'update').mockResolvedValue(cancelledBooking);

      const result = await service.cancel(1, 1, Role.CLIENT);

      expect(service.update).toHaveBeenCalledWith(1, 1, Role.CLIENT, {
        status: BookingStatus.CANCELLED,
      });
      expect(result.status).toBe(BookingStatus.CANCELLED);
    });
  });

  describe('remove', () => {
    it('should delete booking as admin', async () => {
      mockPrismaService.booking.findUnique.mockResolvedValue(mockBooking);
      mockPrismaService.booking.delete.mockResolvedValue(mockBooking);

      await service.remove(1, 1, Role.ADMIN);

      expect(prismaService.booking.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw ForbiddenException for non-admin', async () => {
      await expect(service.remove(1, 1, Role.CLIENT)).rejects.toThrow(
        new ForbiddenException(
          'Seuls les administrateurs peuvent supprimer des réservations',
        ),
      );
    });

    it('should throw NotFoundException if booking does not exist', async () => {
      mockPrismaService.booking.findUnique.mockResolvedValue(null);

      await expect(service.remove(1, 1, Role.ADMIN)).rejects.toThrow(
        new NotFoundException('Réservation introuvable'),
      );
    });

    it('should throw BadRequestException for in-progress booking', async () => {
      const inProgressBooking = {
        ...mockBooking,
        status: BookingStatus.IN_PROGRESS,
      };
      mockPrismaService.booking.findUnique.mockResolvedValue(inProgressBooking);

      await expect(service.remove(1, 1, Role.ADMIN)).rejects.toThrow(
        new BadRequestException(
          'Impossible de supprimer une réservation en cours',
        ),
      );
    });
  });

  describe('getBookingStats', () => {
    it('should return booking statistics for client', async () => {
      mockPrismaService.booking.count
        .mockResolvedValueOnce(15) // total
        .mockResolvedValueOnce(2) // pending
        .mockResolvedValueOnce(3) // confirmed
        .mockResolvedValueOnce(1) // in progress
        .mockResolvedValueOnce(8) // completed
        .mockResolvedValueOnce(1) // cancelled
        .mockResolvedValueOnce(5); // emergency

      const result = await service.getBookingStats(1, Role.CLIENT);

      expect(result).toEqual({
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
      });

      // Verify that all count calls were made with client filter
      expect(prismaService.booking.count).toHaveBeenCalledWith({
        where: { clientId: 1 },
      });
    });

    it('should return booking statistics for ambulance driver', async () => {
      mockPrismaService.booking.count
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(1)
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(1)
        .mockResolvedValueOnce(5)
        .mockResolvedValueOnce(1)
        .mockResolvedValueOnce(3);

      await service.getBookingStats(2, Role.AMBULANCE_DRIVER);

      // Verify that count was called with driver assignment filter
      expect(prismaService.booking.count).toHaveBeenCalledWith({
        where: {
          assignments: {
            some: {
              driverId: 2,
            },
          },
        },
      });
    });

    it('should return all booking statistics for admin', async () => {
      mockPrismaService.booking.count
        .mockResolvedValueOnce(50)
        .mockResolvedValueOnce(5)
        .mockResolvedValueOnce(10)
        .mockResolvedValueOnce(3)
        .mockResolvedValueOnce(30)
        .mockResolvedValueOnce(2)
        .mockResolvedValueOnce(15);

      await service.getBookingStats(1, Role.ADMIN);

      // Verify that count was called without user-specific filters
      expect(prismaService.booking.count).toHaveBeenCalledWith({
        where: {},
      });
    });
  });
});
