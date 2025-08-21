import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { Role } from '@prisma/client';
import { Response } from 'express';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: jest.Mocked<AuthService>;

  const mockUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
    role: Role.CLIENT,
    isProfileComplete: true,
    companyId: null,
    birthDate: new Date('1990-01-01'),
    country: 'France',
  };

  const mockAuthResponse = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    role: Role.CLIENT,
    isProfileComplete: true,
    companyId: undefined,
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  };

  const mockCreateUserDto: CreateUserDto = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'test@example.com',
    password: 'TestPassword123!',
  };

  const mockRequest = {
    user: mockUser,
  } as any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            registerUser: jest.fn(),
            login: jest.fn(),
            refreshToken: jest.fn(),
            completeProfile: jest.fn(),
            signOut: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('registerUser', () => {
    it('should register a new user successfully', async () => {
      authService.registerUser.mockResolvedValue(mockAuthResponse);

      const result = await controller.registerUser(mockCreateUserDto);

      expect(authService.registerUser).toHaveBeenCalledWith(mockCreateUserDto);
      expect(result).toEqual(mockAuthResponse);
    });

    it('should handle registration errors', async () => {
      const error = new Error('Registration failed');
      authService.registerUser.mockRejectedValue(error);

      await expect(controller.registerUser(mockCreateUserDto)).rejects.toThrow(
        'Registration failed',
      );
    });
  });

  describe('login', () => {
    it('should login user successfully', async () => {
      authService.login.mockResolvedValue(mockAuthResponse);

      const result = await controller.login(mockRequest);

      expect(authService.login).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.firstName,
        mockUser.lastName,
        mockUser.role,
        mockUser.isProfileComplete,
      );
      expect(result).toEqual(mockAuthResponse);
    });
  });

  describe('getAll (protected endpoint)', () => {
    it('should return protected message with user ID', () => {
      const result = controller.getAll(mockRequest);

      expect(result).toEqual({
        message: `Now you can access this protected API. this is your user ID: ${mockUser.id}`,
      });
    });
  });

  describe('refreshToken', () => {
    it('should refresh token successfully', async () => {
      authService.refreshToken.mockResolvedValue(mockAuthResponse);

      const result = await controller.refreshToken(mockRequest);

      expect(authService.refreshToken).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.firstName,
        mockUser.lastName,
        mockUser.isProfileComplete,
      );
      expect(result).toEqual(mockAuthResponse);
    });
  });

  describe('googleLogin', () => {
    it('should handle Google login redirect', () => {
      // This endpoint just initiates OAuth flow, no return value
      const result = controller.googleLogin();
      expect(result).toBeUndefined();
    });
  });

  describe('googleCallback', () => {
    it('should handle Google callback successfully', async () => {
      const mockResponse = {
        redirect: jest.fn(),
      } as any as Response;

      authService.login.mockResolvedValue(mockAuthResponse);

      await controller.googleCallback(mockRequest, mockResponse);

      expect(authService.login).toHaveBeenCalledWith(
        mockUser.id,
        mockUser.firstName,
        mockUser.lastName,
        mockUser.role,
        mockUser.isProfileComplete,
      );
      expect(mockResponse.redirect).toHaveBeenCalledWith(
        expect.stringContaining(
          'http://localhost:3000/api/auth/google/callback',
        ),
      );
    });

    it('should handle Google callback error', async () => {
      const mockResponse = {
        redirect: jest.fn(),
      } as any as Response;

      authService.login.mockRejectedValue(new Error('Login failed'));

      await controller.googleCallback(mockRequest, mockResponse);

      expect(mockResponse.redirect).toHaveBeenCalledWith(
        'http://localhost:3000/auth/signin?error=google_auth_failed',
      );
    });
  });

  describe('completeProfile', () => {
    it('should complete profile successfully', async () => {
      const profileData = { age: '30', phoneNumber: '+33123456789' };
      const updatedResponse = {
        ...mockUser,
        email: 'test@example.com',
        password: 'hashedPassword',
        hashedRefreshToken: null,
        address: '123 Main St',
        city: 'Paris',
        postalCode: '75001',
        authProvider: 'CREDENTIALS' as any,
        age: 30,
        phoneNumber: '+33123456789',
        isEmailVerified: false,
        emailVerificationToken: null,
        emailVerificationExpires: null,
        companyId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      authService.completeProfile.mockResolvedValue(updatedResponse);

      const result = await controller.completeProfile(mockRequest, profileData);

      expect(authService.completeProfile).toHaveBeenCalledWith(
        mockUser.id,
        profileData,
      );
      expect(result).toEqual(updatedResponse);
    });
  });

  describe('signOut', () => {
    it('should sign out user successfully', async () => {
      const signOutResponse = {
        ...mockUser,
        email: 'test@example.com',
        password: 'hashedPassword',
        hashedRefreshToken: null,
        address: '123 Main St',
        city: 'Paris',
        postalCode: '75001',
        authProvider: 'CREDENTIALS' as any,
        age: 25,
        phoneNumber: '+33123456789',
        isEmailVerified: false,
        emailVerificationToken: null,
        emailVerificationExpires: null,
        companyId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      authService.signOut.mockResolvedValue(signOutResponse);

      const result = await controller.signOut(mockRequest);

      expect(authService.signOut).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(signOutResponse);
    });
  });
});
