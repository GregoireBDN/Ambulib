import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { Role, AuthProvider } from '@prisma/client';
import * as argon2 from 'argon2';
import refreshConfig from './config/refresh.config';

jest.mock('argon2');

describe('AuthService', () => {
  let service: AuthService;
  let userService: jest.Mocked<UserService>;
  let jwtService: jest.Mocked<JwtService>;

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
    createdAt: new Date(),
    updatedAt: new Date(),
    notes: null,
    medicalCondition: null,
    specialRequirements: [],
    emergencyContact: null,
    dependent: [],
  };

  const mockCreateUserDto = {
    email: 'test@example.com',
    firstName: 'John',
    lastName: 'Doe',
    password: 'password123',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            findOne: jest.fn(),
            findOneInternal: jest.fn(),
            updateHashedRefreshToken: jest.fn(),
            update: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
        {
          provide: refreshConfig.KEY,
          useValue: {
            secret: 'refresh-secret',
            expiresIn: '7d',
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);

    // Reset mocks
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      userService.findByEmail.mockResolvedValue(null);
      userService.create.mockResolvedValue(mockUser);
      jwtService.signAsync
        .mockResolvedValueOnce('accessToken')
        .mockResolvedValueOnce('refreshToken');
      (argon2.hash as jest.Mock).mockResolvedValue('hashedRefreshToken');

      const result = await service.registerUser(mockCreateUserDto);

      expect(userService.findByEmail).toHaveBeenCalledWith(
        mockCreateUserDto.email,
      );
      expect(userService.create).toHaveBeenCalledWith({
        ...mockCreateUserDto,
        authProvider: AuthProvider.CREDENTIALS,
        isProfileComplete: true,
      });
      expect(result).toEqual({
        id: mockUser.id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        role: mockUser.role,
        isProfileComplete: mockUser.isProfileComplete,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
    });

    it('should throw ConflictException if user already exists', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);

      await expect(service.registerUser(mockCreateUserDto)).rejects.toThrow(
        ConflictException,
      );
      expect(userService.create).not.toHaveBeenCalled();
    });
  });

  describe('validateLocalUser', () => {
    it('should validate user with correct credentials', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      (argon2.verify as jest.Mock).mockResolvedValue(true);

      const result = await service.validateLocalUser(
        'test@example.com',
        'password123',
      );

      expect(result).toEqual({
        id: mockUser.id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        role: mockUser.role,
        isProfileComplete: mockUser.isProfileComplete,
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findByEmail.mockResolvedValue(null);

      await expect(
        service.validateLocalUser('test@example.com', 'password123'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is incorrect', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);
      (argon2.verify as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateLocalUser('test@example.com', 'wrongpassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user has no password', async () => {
      userService.findByEmail.mockResolvedValue({ ...mockUser, password: '' });

      await expect(
        service.validateLocalUser('test@example.com', 'password123'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should login user and return tokens', async () => {
      jwtService.signAsync
        .mockResolvedValueOnce('accessToken')
        .mockResolvedValueOnce('refreshToken');
      (argon2.hash as jest.Mock).mockResolvedValue('hashedRefreshToken');
      userService.updateHashedRefreshToken.mockResolvedValue(mockUser);

      const result = await service.login(
        mockUser.id,
        mockUser.firstName,
        mockUser.lastName,
        mockUser.role,
        mockUser.isProfileComplete,
      );

      expect(result).toEqual({
        id: mockUser.id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        role: mockUser.role,
        isProfileComplete: mockUser.isProfileComplete,
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      expect(userService.updateHashedRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        'hashedRefreshToken',
      );
    });
  });

  describe('generateTokens', () => {
    it('should generate access and refresh tokens', async () => {
      jwtService.signAsync
        .mockResolvedValueOnce('accessToken')
        .mockResolvedValueOnce('refreshToken');

      const result = await service.generateTokens(mockUser.id);

      expect(result).toEqual({
        accessToken: 'accessToken',
        refreshToken: 'refreshToken',
      });
      expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
    });
  });

  describe('validateJwtUser', () => {
    it('should validate JWT user successfully', async () => {
      userService.findOne.mockResolvedValue(mockUser);

      const result = await service.validateJwtUser(mockUser.id);

      expect(result).toEqual({
        id: mockUser.id,
        role: mockUser.role,
        isProfileComplete: mockUser.isProfileComplete,
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findOne.mockRejectedValue(new NotFoundException('User not found'));

      await expect(service.validateJwtUser(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('validateRefreshToken', () => {
    it('should validate refresh token successfully', async () => {
      userService.findOneInternal.mockResolvedValue(mockUser);
      (argon2.verify as jest.Mock).mockResolvedValue(true);

      const result = await service.validateRefreshToken(
        mockUser.id,
        'refreshToken',
      );

      expect(result).toEqual({
        id: mockUser.id,
        isProfileComplete: mockUser.isProfileComplete,
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findOneInternal.mockResolvedValue(null);

      await expect(
        service.validateRefreshToken(999, 'refreshToken'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if no refresh token stored', async () => {
      userService.findOneInternal.mockResolvedValue({
        ...mockUser,
        hashedRefreshToken: null,
      });

      await expect(
        service.validateRefreshToken(mockUser.id, 'refreshToken'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if refresh token invalid', async () => {
      userService.findOneInternal.mockResolvedValue(mockUser);
      (argon2.verify as jest.Mock).mockResolvedValue(false);

      await expect(
        service.validateRefreshToken(mockUser.id, 'invalidToken'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refreshToken', () => {
    it('should refresh tokens successfully', async () => {
      jwtService.signAsync
        .mockResolvedValueOnce('newAccessToken')
        .mockResolvedValueOnce('newRefreshToken');
      (argon2.hash as jest.Mock).mockResolvedValue('newHashedRefreshToken');
      userService.updateHashedRefreshToken.mockResolvedValue(mockUser);

      const result = await service.refreshToken(
        mockUser.id,
        mockUser.firstName,
        mockUser.lastName,
        mockUser.isProfileComplete,
      );

      expect(result).toEqual({
        id: mockUser.id,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        isProfileComplete: mockUser.isProfileComplete,
        accessToken: 'newAccessToken',
        refreshToken: 'newRefreshToken',
      });
    });
  });

  describe('validateGoogleUser', () => {
    it('should return existing user if found', async () => {
      userService.findByEmail.mockResolvedValue(mockUser);

      const result = await service.validateGoogleUser(mockCreateUserDto);

      expect(result).toEqual(mockUser);
      expect(userService.create).not.toHaveBeenCalled();
    });

    it('should create new user if not found', async () => {
      const newGoogleUser = {
        ...mockUser,
        authProvider: AuthProvider.GOOGLE,
        isProfileComplete: false,
      };
      userService.findByEmail.mockResolvedValue(null);
      userService.create.mockResolvedValue(newGoogleUser);

      const result = await service.validateGoogleUser(mockCreateUserDto);

      expect(userService.create).toHaveBeenCalledWith({
        ...mockCreateUserDto,
        authProvider: AuthProvider.GOOGLE,
        isProfileComplete: false,
      });
      expect(result).toEqual(newGoogleUser);
    });
  });

  describe('completeProfile', () => {
    it('should complete user profile successfully', async () => {
      const profileData = { age: '30', phoneNumber: '+33987654321' };
      const updatedUser = { ...mockUser, age: 30, phoneNumber: '+33987654321' };

      userService.findOne.mockResolvedValue(mockUser);
      userService.update.mockResolvedValue(updatedUser);

      const result = await service.completeProfile(mockUser.id, profileData);

      expect(userService.update).toHaveBeenCalledWith(mockUser.id, {
        phoneNumber: '+33987654321',
        age: 30,
        isProfileComplete: true,
      });
      expect(result).toEqual(updatedUser);
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findOne.mockRejectedValue(new NotFoundException('User not found'));

      await expect(service.completeProfile(999, {})).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      userService.updateHashedRefreshToken.mockResolvedValue({
        ...mockUser,
        hashedRefreshToken: null,
      });

      const result = await service.signOut(mockUser.id);

      expect(userService.updateHashedRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
        null,
      );
      expect(result.hashedRefreshToken).toBeNull();
    });
  });
});
