import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role, AuthProvider } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';

jest.mock('argon2');

describe('UserService', () => {
  let service: UserService;
  let prismaService: jest.Mocked<PrismaService>;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'hashedPassword',
    role: Role.CLIENT,
    isProfileComplete: true,
    hashedRefreshToken: 'hashedRefreshToken',
    age: 25,
    phoneNumber: '+33123456789',
    address: '123 Main St',
    city: 'Paris',
    postalCode: '75001',
    authProvider: AuthProvider.CREDENTIALS,
    isEmailVerified: false,
    emailVerificationToken: null,
    emailVerificationExpires: null,
  };

  const mockCreateUserDto: CreateUserDto = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123',
    age: '25',
    phoneNumber: '+33123456789',
    address: '123 Main St',
    city: 'Paris',
    postalCode: '75001',
  };

  beforeEach(async () => {
    const mockPrismaService = {
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get(PrismaService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user successfully', async () => {
      (argon2.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prismaService.user.create as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.create(mockCreateUserDto);

      expect(argon2.hash).toHaveBeenCalledWith(mockCreateUserDto.password);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: {
          password: 'hashedPassword',
          age: 25,
          email: mockCreateUserDto.email,
          firstName: mockCreateUserDto.firstName,
          lastName: mockCreateUserDto.lastName,
          phoneNumber: mockCreateUserDto.phoneNumber,
          address: mockCreateUserDto.address,
          city: mockCreateUserDto.city,
          postalCode: mockCreateUserDto.postalCode,
        },
      });
      expect(result).toEqual(mockUser);
    });

    it('should handle string age conversion', async () => {
      (argon2.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prismaService.user.create as jest.Mock).mockResolvedValue(mockUser);

      const createUserDtoWithStringAge = { ...mockCreateUserDto, age: '30' };
      await service.create(createUserDtoWithStringAge);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          age: 30,
        }),
      });
    });

    it('should handle null age', async () => {
      (argon2.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (prismaService.user.create as jest.Mock).mockResolvedValue(mockUser);

      const createUserDtoWithoutAge = { ...mockCreateUserDto };
      delete createUserDtoWithoutAge.age;

      await service.create(createUserDtoWithoutAge);

      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          age: null,
        }),
      });
    });

    it('should throw error if user creation fails', async () => {
      (argon2.hash as jest.Mock).mockResolvedValue('hashedPassword');
      const error = new Error('Database error');
      (prismaService.user.create as jest.Mock).mockRejectedValue(error);

      await expect(service.create(mockCreateUserDto)).rejects.toThrow(
        'Database error',
      );
    });

    it('should throw error if password hashing fails', async () => {
      const error = new Error('Hashing failed');
      (argon2.hash as jest.Mock).mockRejectedValue(error);

      await expect(service.create(mockCreateUserDto)).rejects.toThrow(
        'Hashing failed',
      );
    });
  });

  describe('findByEmail', () => {
    it('should find user by email successfully', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findByEmail('test@example.com');

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
      expect(result).toEqual(mockUser);
    });

    it('should return null if user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@example.com');

      expect(result).toBeNull();
    });

    it('should throw error if database operation fails', async () => {
      const error = new Error('Database error');
      (prismaService.user.findUnique as jest.Mock).mockRejectedValue(error);

      await expect(service.findByEmail('test@example.com')).rejects.toThrow(
        'Database error',
      );
    });
  });

  describe('findOne', () => {
    it('should find user by ID successfully', async () => {
      const { password, hashedRefreshToken, ...expectedUserWithoutSensitiveData } = mockUser;

      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.findOne(1);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          emergencyContact: true,
          dependent: true,
        },
      });
      expect(result).toEqual(expectedUserWithoutSensitiveData);
    });

    it('should throw NotFoundException if user not found', async () => {
      (prismaService.user.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow(
        new NotFoundException('Utilisateur introuvable'),
      );
    });
  });

  describe('updateHashedRefreshToken', () => {
    it('should update hashed refresh token successfully', async () => {
      const updatedUser = { ...mockUser, hashedRefreshToken: 'newHashedToken' };
      (prismaService.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await service.updateHashedRefreshToken(
        1,
        'newHashedToken',
      );

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { hashedRefreshToken: 'newHashedToken' },
      });
      expect(result).toEqual(updatedUser);
    });

    it('should set refresh token to null when signing out', async () => {
      const updatedUser = { ...mockUser, hashedRefreshToken: null };
      (prismaService.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await service.updateHashedRefreshToken(1, null);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { hashedRefreshToken: null },
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('update', () => {
    it('should update user successfully', async () => {
      const updateData = { firstName: 'Jane', age: 30 };
      const updatedUser = { ...mockUser, firstName: 'Jane', age: 30 };
      (prismaService.user.update as jest.Mock).mockResolvedValue(updatedUser);

      const result = await service.update(1, updateData);

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
      expect(result).toEqual(updatedUser);
    });

    it('should handle empty update data', async () => {
      (prismaService.user.update as jest.Mock).mockResolvedValue(mockUser);

      const result = await service.update(1, {});

      expect(prismaService.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: {},
      });
      expect(result).toEqual(mockUser);
    });
  });
});
