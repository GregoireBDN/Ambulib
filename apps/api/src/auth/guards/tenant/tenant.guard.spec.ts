import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantGuard } from './tenant.guard';
import { PrismaService } from '../../../prisma/prisma.service';
import { Role } from '@prisma/client';

describe('TenantGuard', () => {
  let guard: TenantGuard;
  let reflector: jest.Mocked<Reflector>;
  let prismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const mockReflector = {
      get: jest.fn(),
    };

    const mockPrismaService = {
      // Add any needed Prisma methods here
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantGuard,
        { provide: Reflector, useValue: mockReflector },
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    guard = module.get<TenantGuard>(TenantGuard);
    reflector = module.get(Reflector);
    prismaService = module.get(PrismaService);
  });

  const createMockExecutionContext = (
    user: any,
    params: any = {},
    body: any = {},
    query: any = {},
  ): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          user,
          params,
          body,
          query,
        }),
      }),
    } as ExecutionContext;
  };

  describe('canActivate', () => {
    it('should allow access for SUPER_ADMIN', async () => {
      const user = { id: 1, role: Role.SUPER_ADMIN, companyId: null };
      const context = createMockExecutionContext(user);

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access for CLIENT users', async () => {
      const user = { id: 1, role: Role.CLIENT, companyId: null };
      const context = createMockExecutionContext(user);

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access when user belongs to same company', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, { companyId: '1' });

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access when no company resource is specified', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, {}, {}, {});

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException when user is not authenticated', async () => {
      const context = createMockExecutionContext(null);

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when company user has no companyId', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: null };
      const context = createMockExecutionContext(user);

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when user tries to access different company', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, { companyId: '2' });

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should extract companyId from request body', async () => {
      const user = { id: 1, role: Role.FLEET_MANAGER, companyId: 1 };
      const context = createMockExecutionContext(user, {}, { companyId: 1 });

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should extract companyId from query parameters', async () => {
      const user = { id: 1, role: Role.AMBULANCE_DRIVER, companyId: 1 };
      const context = createMockExecutionContext(
        user,
        {},
        {},
        { companyId: '1' },
      );

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should handle string companyId conversion', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, { companyId: '1' });

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException with string companyId mismatch', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, { companyId: '2' });

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('extractCompanyIdFromRequest', () => {
    it('should extract companyId from params', () => {
      const request = {
        params: { companyId: '1' },
        body: {},
        query: {},
      };

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBe(1);
    });

    it('should extract companyId from body when params not available', () => {
      const request = {
        params: {},
        body: { companyId: 2 },
        query: {},
      };

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBe(2);
    });

    it('should extract companyId from query when params and body not available', () => {
      const request = {
        params: {},
        body: {},
        query: { companyId: '3' },
      };

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBe(3);
    });

    it('should return null when no companyId found', () => {
      const request = {
        params: {},
        body: {},
        query: {},
      };

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBeNull();
    });

    it('should handle invalid companyId format', () => {
      const request = {
        params: { companyId: 'invalid' },
        body: {},
        query: {},
      };

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBeNaN();
    });
  });
});
