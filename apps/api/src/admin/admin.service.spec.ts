import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Role, AmbulanceStatus } from '@prisma/client';
import * as argon from 'argon2';

jest.mock('argon2');

describe('AdminService', () => {
  let service: AdminService;
  let prisma: jest.Mocked<PrismaService>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: Role.FLEET_MANAGER,
    password: 'hashedPassword',
    isProfileComplete: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockAmbulance = {
    id: 1,
    licensePlate: 'ABC123',
    vehicleModel: 'Mercedes Sprinter',
    vehicleYear: 2022,
    capacity: 2,
    status: AmbulanceStatus.AVAILABLE,
    driverId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      ambulance: {
        findUnique: jest.fn(),
        create: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      booking: {
        count: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<AdminService>(AdminService);
    prisma = module.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createFleetManager', () => {
    const createFleetManagerDto = {
      email: 'manager@example.com',
      password: 'TestPassword123!',
      firstName: 'Jane',
      lastName: 'Smith',
    };

    it('should create a fleet manager successfully', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue({
        ...mockUser,
        ...createFleetManagerDto,
      });
      (argon.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const result = await service.createFleetManager(createFleetManagerDto);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { email: createFleetManagerDto.email },
      });
      expect(argon.hash).toHaveBeenCalledWith(createFleetManagerDto.password);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...createFleetManagerDto,
          password: 'hashedPassword',
          role: Role.FLEET_MANAGER,
          isProfileComplete: true,
        },
      });
      expect(result).toEqual({ ...mockUser, ...createFleetManagerDto });
    });

    it('should throw ConflictException if user already exists', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      await expect(
        service.createFleetManager(createFleetManagerDto),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('createAmbulanceDriver', () => {
    const createDriverDto = {
      email: 'driver@example.com',
      password: 'TestPassword123!',
      firstName: 'Bob',
      lastName: 'Wilson',
    };

    it('should create an ambulance driver successfully', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue({
        ...mockUser,
        ...createDriverDto,
        role: Role.AMBULANCE_DRIVER,
      });
      (argon.hash as jest.Mock).mockResolvedValue('hashedPassword');

      const result = await service.createAmbulanceDriver(createDriverDto);

      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          ...createDriverDto,
          password: 'hashedPassword',
          role: Role.AMBULANCE_DRIVER,
          isProfileComplete: true,
        },
      });
      expect(result.role).toBe(Role.AMBULANCE_DRIVER);
    });
  });

  describe('createAmbulance', () => {
    const createAmbulanceDto = {
      licensePlate: 'XYZ789',
      model: 'Ford Transit',
      year: 2023,
      capacity: 1,
      driverId: 1,
    };

    it('should create an ambulance successfully', async () => {
      (prisma.ambulance.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        role: Role.AMBULANCE_DRIVER,
      });
      (prisma.ambulance.create as jest.Mock).mockResolvedValue({
        ...mockAmbulance,
        ...createAmbulanceDto,
        companyId: 1,
        driver: mockUser,
        company: { id: 1, name: 'Test Company' },
      });

      await service.createAmbulance(createAmbulanceDto);

      expect(prisma.ambulance.findUnique).toHaveBeenCalledWith({
        where: { licensePlate: createAmbulanceDto.licensePlate },
      });
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: createAmbulanceDto.driverId, role: Role.AMBULANCE_DRIVER },
      });
      expect(prisma.ambulance.create).toHaveBeenCalledWith({
        data: {
          ...createAmbulanceDto,
          companyId: 1,
        },
        include: {
          driver: true,
          company: true,
        },
      });
    });

    it('should throw ConflictException if ambulance already exists', async () => {
      (prisma.ambulance.findUnique as jest.Mock).mockResolvedValue(
        mockAmbulance,
      );

      await expect(service.createAmbulance(createAmbulanceDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw NotFoundException if driver not found', async () => {
      (prisma.ambulance.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.createAmbulance(createAmbulanceDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getAllUsers', () => {
    it('should return paginated users', async () => {
      const mockUsers = [mockUser];
      (prisma.user.findMany as jest.Mock).mockResolvedValue(mockUsers);
      (prisma.user.count as jest.Mock).mockResolvedValue(1);

      const result = await service.getAllUsers(1, 10);

      expect(result).toEqual({
        users: mockUsers,
        total: 1,
        page: 1,
        totalPages: 1,
      });
    });

    it('should filter by role when provided', async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([mockUser]);
      (prisma.user.count as jest.Mock).mockResolvedValue(1);

      await service.getAllUsers(1, 10, Role.FLEET_MANAGER);

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: { role: Role.FLEET_MANAGER },
        skip: 0,
        take: 10,
        select: expect.objectContaining({}),
        orderBy: { createdAt: 'desc' },
      });
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        emergencyContact: null,
        dependent: [],
        bookings: [],
      });

      const result = await service.getUserById(1);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          emergencyContact: true,
          dependent: true,
        },
      });
      expect(result).toBeDefined();
    });

    it('should throw NotFoundException if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.getUserById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
      (prisma.user.delete as jest.Mock).mockResolvedValue(mockUser);

      await service.deleteUser(1);

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw NotFoundException if user not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.deleteUser(1)).rejects.toThrow(NotFoundException);
    });

    it('should throw ForbiddenException if trying to delete super admin', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        ...mockUser,
        role: Role.SUPER_ADMIN,
      });

      await expect(service.deleteUser(1)).rejects.toThrow(ForbiddenException);
    });
  });

  describe('getSystemStats', () => {
    it('should return system statistics', async () => {
      (prisma.user.count as jest.Mock)
        .mockResolvedValueOnce(100) // totalUsers
        .mockResolvedValueOnce(80) // totalClients
        .mockResolvedValueOnce(10) // totalDrivers
        .mockResolvedValueOnce(5); // totalFleetManagers

      (prisma.ambulance.count as jest.Mock)
        .mockResolvedValueOnce(15) // totalAmbulances
        .mockResolvedValueOnce(12); // availableAmbulances

      (prisma.booking.count as jest.Mock)
        .mockResolvedValueOnce(200) // totalBookings
        .mockResolvedValueOnce(25); // pendingBookings

      const result = await service.getSystemStats();

      expect(result).toEqual({
        totalUsers: 100,
        totalClients: 80,
        totalDrivers: 10,
        totalFleetManagers: 5,
        totalAmbulances: 15,
        availableAmbulances: 12,
        totalBookings: 200,
        pendingBookings: 25,
      });
    });
  });
});
