import { Test, TestingModule } from '@nestjs/testing';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Role } from '@prisma/client';

describe('AdminController', () => {
  let controller: AdminController;
  let service: jest.Mocked<AdminService>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    password: 'hashedPassword',
    hashedRefreshToken: null,
    firstName: 'John',
    lastName: 'Doe',
    role: Role.FLEET_MANAGER,
    age: null,
    phoneNumber: null,
    address: null,
    city: null,
    postalCode: null,
    authProvider: 'CREDENTIALS' as any,
    isProfileComplete: true,
    isEmailVerified: false,
    emailVerificationToken: null,
    emailVerificationExpires: null,
    companyId: 1,
    notes: null,
    medicalCondition: null,
    specialRequirements: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAmbulance = {
    id: 1,
    licensePlate: 'ABC123',
    vehicleModel: 'Mercedes Sprinter',
    vehicleYear: 2022,
    capacity: 2,
    status: 'AVAILABLE' as any,
    driverId: null,
    companyId: 1,
    lastMaintenance: null,
    nextMaintenance: null,
    mileage: null,
    notes: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockAdminService = {
      createFleetManager: jest.fn(),
      createAmbulanceDriver: jest.fn(),
      createAmbulance: jest.fn(),
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
      getAllAmbulances: jest.fn(),
      getAmbulanceById: jest.fn(),
      updateAmbulance: jest.fn(),
      deleteAmbulance: jest.fn(),
      getSystemStats: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminController],
      providers: [
        {
          provide: AdminService,
          useValue: mockAdminService,
        },
      ],
    }).compile();

    controller = module.get<AdminController>(AdminController);
    service = module.get(AdminService);
  });

  describe('createFleetManager', () => {
    it('should create a fleet manager', async () => {
      const dto = {
        email: 'manager@example.com',
        password: 'password123',
        firstName: 'Jane',
        lastName: 'Smith',
      };

      service.createFleetManager.mockResolvedValue(mockUser);

      const result = await controller.createFleetManager(dto);

      expect(service.createFleetManager).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('createAmbulanceDriver', () => {
    it('should create an ambulance driver', async () => {
      const dto = {
        email: 'driver@example.com',
        password: 'password123',
        firstName: 'Bob',
        lastName: 'Wilson',
      };

      service.createAmbulanceDriver.mockResolvedValue({
        ...mockUser,
        role: Role.AMBULANCE_DRIVER,
      });

      const result = await controller.createAmbulanceDriver(dto);

      expect(service.createAmbulanceDriver).toHaveBeenCalledWith(dto);
      expect(result.role).toBe(Role.AMBULANCE_DRIVER);
    });
  });

  describe('createAmbulance', () => {
    it('should create an ambulance', async () => {
      const dto = {
        licensePlate: 'XYZ789',
        vehicleModel: 'Ford Transit',
        vehicleYear: 2023,
        capacity: 1,
      };

      service.createAmbulance.mockResolvedValue(mockAmbulance);

      const result = await controller.createAmbulance(dto);

      expect(service.createAmbulance).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockAmbulance);
    });
  });

  describe('getAllUsers', () => {
    it('should return paginated users', async () => {
      const mockResponse = {
        users: [mockUser],
        total: 1,
        page: 1,
        totalPages: 1,
      };

      service.getAllUsers.mockResolvedValue(mockResponse);

      const result = await controller.getAllUsers('1', '10', Role.CLIENT);

      expect(service.getAllUsers).toHaveBeenCalledWith(1, 10, Role.CLIENT);
      expect(result).toEqual(mockResponse);
    });

    it('should use default values for page and limit', async () => {
      const mockResponse = {
        users: [mockUser],
        total: 1,
        page: 1,
        totalPages: 1,
      };

      service.getAllUsers.mockResolvedValue(mockResponse);

      await controller.getAllUsers();

      expect(service.getAllUsers).toHaveBeenCalledWith(1, 10, undefined);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      service.getUserById.mockResolvedValue(mockUser);

      const result = await controller.getUserById(1);

      expect(service.getUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('updateUser', () => {
    it('should update user', async () => {
      const dto = { firstName: 'Updated Name' };
      const updatedUser = { ...mockUser, firstName: 'Updated Name' };

      service.updateUser.mockResolvedValue(updatedUser);

      const result = await controller.updateUser(1, dto);

      expect(service.updateUser).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(updatedUser);
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      service.deleteUser.mockResolvedValue();

      await controller.deleteUser(1);

      expect(service.deleteUser).toHaveBeenCalledWith(1);
    });
  });

  describe('getAllAmbulances', () => {
    it('should return all ambulances', async () => {
      service.getAllAmbulances.mockResolvedValue([mockAmbulance]);

      const result = await controller.getAllAmbulances();

      expect(service.getAllAmbulances).toHaveBeenCalled();
      expect(result).toEqual([mockAmbulance]);
    });
  });

  describe('getAmbulanceById', () => {
    it('should return ambulance by id', async () => {
      service.getAmbulanceById.mockResolvedValue(mockAmbulance);

      const result = await controller.getAmbulanceById(1);

      expect(service.getAmbulanceById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockAmbulance);
    });
  });

  describe('updateAmbulance', () => {
    it('should update ambulance', async () => {
      const dto = { vehicleModel: 'Updated Model' };
      const updatedAmbulance = {
        ...mockAmbulance,
        vehicleModel: 'Updated Model',
      };

      service.updateAmbulance.mockResolvedValue(updatedAmbulance);

      const result = await controller.updateAmbulance(1, dto);

      expect(service.updateAmbulance).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual(updatedAmbulance);
    });
  });

  describe('deleteAmbulance', () => {
    it('should delete ambulance', async () => {
      service.deleteAmbulance.mockResolvedValue();

      await controller.deleteAmbulance(1);

      expect(service.deleteAmbulance).toHaveBeenCalledWith(1);
    });
  });

  describe('getSystemStats', () => {
    it('should return system statistics', async () => {
      const mockStats = {
        totalUsers: 100,
        totalClients: 80,
        totalDrivers: 10,
        totalFleetManagers: 5,
        totalAmbulances: 15,
        availableAmbulances: 12,
        totalBookings: 200,
        pendingBookings: 25,
      };

      service.getSystemStats.mockResolvedValue(mockStats);

      const result = await controller.getSystemStats();

      expect(service.getSystemStats).toHaveBeenCalled();
      expect(result).toEqual(mockStats);
    });
  });
});
