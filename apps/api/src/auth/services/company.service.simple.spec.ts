import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { CompanyStatus, Role } from '@prisma/client';

describe('CompanyService - Simple Tests', () => {
  let service: CompanyService;
  let prismaService: any;
  let userService: any;

  beforeEach(async () => {
    const mockPrismaService = {
      company: {
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        findMany: jest.fn(),
      },
      user: {
        create: jest.fn(),
        findUnique: jest.fn(),
        findMany: jest.fn(),
        delete: jest.fn(),
        count: jest.fn(),
      },
      $transaction: jest.fn(),
    };

    const mockUserService = {
      findByEmail: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    prismaService = module.get(PrismaService);
    userService = module.get(UserService);
  });

  describe('registerCompany - Basic validation', () => {
    const mockRegistrationDto = {
      name: 'Test Ambulances',
      email: 'test@ambulances.com',
      adminUser: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@test.com',
        password: 'password123',
      },
    };

    it('should throw ConflictException if company email exists', async () => {
      // Mock company email already exists
      prismaService.company.findUnique.mockResolvedValue({ id: 1 });

      await expect(
        service.registerCompany(mockRegistrationDto as any),
      ).rejects.toThrow(ConflictException);

      expect(prismaService.company.findUnique).toHaveBeenCalledWith({
        where: { email: mockRegistrationDto.email },
      });
    });

    it('should throw ConflictException if admin email exists', async () => {
      // Mock company email doesn't exist, but admin email exists
      prismaService.company.findUnique.mockResolvedValue(null);
      userService.findByEmail.mockResolvedValue({ id: 1 });

      await expect(
        service.registerCompany(mockRegistrationDto as any),
      ).rejects.toThrow(ConflictException);

      expect(userService.findByEmail).toHaveBeenCalledWith(
        mockRegistrationDto.adminUser.email,
      );
    });
  });

  describe('approveCompany', () => {
    it('should throw NotFoundException if company not found', async () => {
      prismaService.company.findUnique.mockResolvedValue(null);

      await expect(
        service.approveCompany({
          companyId: 999,
          status: CompanyStatus.APPROVED,
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw BadRequestException if company not pending', async () => {
      prismaService.company.findUnique.mockResolvedValue({
        id: 1,
        status: CompanyStatus.APPROVED,
      });

      await expect(
        service.approveCompany({
          companyId: 1,
          status: CompanyStatus.APPROVED,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('createCompanyUser - Role validation', () => {
    const mockUserDto = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@user.com',
      password: 'password123',
      role: Role.CLIENT, // Invalid role
    };

    it('should throw BadRequestException for CLIENT role', async () => {
      prismaService.company.findUnique.mockResolvedValue({
        id: 1,
        status: CompanyStatus.APPROVED,
      });
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.createCompanyUser(1, mockUserDto)).rejects.toThrow(
        'Cannot create CLIENT role within company',
      );
    });

    it('should throw BadRequestException for SUPER_ADMIN role', async () => {
      const superAdminDto = { ...mockUserDto, role: Role.SUPER_ADMIN };

      prismaService.company.findUnique.mockResolvedValue({
        id: 1,
        status: CompanyStatus.APPROVED,
      });
      userService.findByEmail.mockResolvedValue(null);

      await expect(service.createCompanyUser(1, superAdminDto)).rejects.toThrow(
        'Cannot create SUPER_ADMIN role',
      );
    });
  });

  describe('getCompanyById', () => {
    it('should throw NotFoundException if company not found', async () => {
      prismaService.company.findUnique.mockResolvedValue(null);

      await expect(service.getCompanyById(999)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('getPendingCompanies', () => {
    it('should call prisma with correct filter', async () => {
      prismaService.company.findMany.mockResolvedValue([]);

      await service.getPendingCompanies();

      expect(prismaService.company.findMany).toHaveBeenCalledWith({
        where: { status: CompanyStatus.PENDING },
        include: {
          users: {
            where: { role: Role.ADMIN },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              phoneNumber: true,
            },
          },
        },
        orderBy: { registrationDate: 'desc' },
      });
    });
  });
});
