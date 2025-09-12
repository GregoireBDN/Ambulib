import { CompanyController } from './company.controller';
import { CompanyStatus, Role } from '@prisma/client';
import { CompanyService } from '../services/company.service';
import { CompanyRegistrationDto } from '../dto/company-registration.dto';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';

describe('CompanyController - Isolated Logic Tests', () => {
  let controller: CompanyController;
  let mockService: jest.Mocked<CompanyService>;

  beforeEach(() => {
    mockService = {
      registerCompany: jest.fn(),
      getPendingCompanies: jest.fn(),
      approveCompany: jest.fn(),
      getCompanyById: jest.fn(),
      createCompanyUser: jest.fn(),
      getCompanyUsers: jest.fn(),
      deleteCompanyUser: jest.fn(),
    };

    // Create controller instance without NestJS testing module
    controller = new CompanyController(mockService);
  });

  describe('registerCompany', () => {
    it('should call service.registerCompany with correct data', async () => {
      const registrationDto = {
        name: 'Test Company',
        email: 'test@company.com',
        adminUser: {
          firstName: 'Admin',
          lastName: 'User',
          email: 'admin@test.com',
          password: 'TestPassword123!',
        },
      };

      const expectedResult = {
        company: { id: 1, name: 'Test Company' },
        message: 'Company registration submitted for approval',
      };

      mockService.registerCompany.mockResolvedValue(expectedResult);

      const result = await controller.registerCompany(
        registrationDto as CompanyRegistrationDto,
      );

      expect(mockService.registerCompany).toHaveBeenCalledWith(registrationDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('approveCompany', () => {
    it('should call service.approveCompany with correct parameters', async () => {
      const approvalDto = {
        status: CompanyStatus.APPROVED,
        notes: 'Approved',
      };

      const expectedResult = {
        id: 1,
        status: CompanyStatus.APPROVED,
      };

      mockService.approveCompany.mockResolvedValue(expectedResult);

      const result = await controller.approveCompany(1, approvalDto);

      expect(mockService.approveCompany).toHaveBeenCalledWith({
        ...approvalDto,
        companyId: 1,
      });
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createCompanyUser - Access Control Logic', () => {
    it('should allow same company admin to create user', async () => {
      const mockRequest = {
        user: { companyId: 1, role: Role.ADMIN },
      };

      const userDto = {
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@test.com',
        password: 'TestPassword123!',
        role: Role.AMBULANCE_DRIVER,
      };

      const expectedUser = { id: 2, ...userDto, companyId: 1 };
      mockService.createCompanyUser.mockResolvedValue(expectedUser);

      const result = await controller.createCompanyUser(
        1,
        userDto,
        mockRequest,
      );

      expect(mockService.createCompanyUser).toHaveBeenCalledWith(1, userDto);
      expect(result).toEqual(expectedUser);
    });

    it('should deny different company admin access', async () => {
      const mockRequest = {
        user: { companyId: 2, role: Role.ADMIN },
      };

      const userDto = {
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@test.com',
        password: 'TestPassword123!',
        role: Role.AMBULANCE_DRIVER,
      };

      await expect(
        controller.createCompanyUser(1, userDto, mockRequest),
      ).rejects.toThrow('Access denied');
    });

    it('should allow SUPER_ADMIN to access any company', async () => {
      const mockRequest = {
        user: { companyId: null, role: Role.SUPER_ADMIN },
      };

      const userDto = {
        firstName: 'New',
        lastName: 'User',
        email: 'newuser@test.com',
        password: 'TestPassword123!',
        role: Role.AMBULANCE_DRIVER,
      };

      const expectedUser = { id: 2, ...userDto, companyId: 1 };
      mockService.createCompanyUser.mockResolvedValue(expectedUser);

      const result = await controller.createCompanyUser(
        1,
        userDto,
        mockRequest,
      );

      expect(mockService.createCompanyUser).toHaveBeenCalledWith(1, userDto);
      expect(result).toEqual(expectedUser);
    });
  });

  describe('deleteCompanyUser - Access Control Logic', () => {
    it('should allow same company admin to delete user', async () => {
      const mockRequest = {
        user: { companyId: 1, role: Role.ADMIN },
      };

      const expectedResult = { message: 'User deleted successfully' };
      mockService.deleteCompanyUser.mockResolvedValue(expectedResult);

      const result = await controller.deleteCompanyUser(1, 2, mockRequest);

      expect(mockService.deleteCompanyUser).toHaveBeenCalledWith(1, 2);
      expect(result).toEqual(expectedResult);
    });

    it('should deny different company admin from deleting user', async () => {
      const mockRequest = {
        user: { companyId: 2, role: Role.ADMIN },
      };

      await expect(
        controller.deleteCompanyUser(1, 2, mockRequest),
      ).rejects.toThrow('Access denied');
    });
  });

  describe('getCompany', () => {
    it('should call service.getCompanyById', async () => {
      const expectedCompany = { id: 1, name: 'Test Company', ambulances: [], users: [] } as any;
      mockService.getCompanyById.mockResolvedValue(expectedCompany);

      const result = await controller.getCompany(1);

      expect(mockService.getCompanyById).toHaveBeenCalledWith(1);
      expect(result).toEqual(expectedCompany);
    });
  });

  describe('getPendingCompanies', () => {
    it('should call service.getPendingCompanies', async () => {
      const expectedCompanies = [{ id: 1, name: 'Test Company', users: [] }] as any;
      mockService.getPendingCompanies.mockResolvedValue(expectedCompanies);

      const result = await controller.getPendingCompanies();

      expect(mockService.getPendingCompanies).toHaveBeenCalled();
      expect(result).toEqual(expectedCompanies);
    });
  });
});
