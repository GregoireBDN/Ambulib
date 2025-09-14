import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantGuard } from './tenant.guard';
import { PrismaService } from '../../../prisma/prisma.service';
import { Role } from '@prisma/client';
import { RequestWithUser } from '../../../common/interfaces/request-with-user.interface';

describe('TenantGuard', () => {
  let guard: TenantGuard;

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
  });

  const createMockExecutionContext = (
    user: { companyId?: number | null; role: Role } | null,
    params: Record<string, unknown> = {},
    body: Record<string, unknown> = {},
    query: Record<string, unknown> = {},
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
    it('should allow access for SUPER_ADMIN', () => {
      const user = { id: 1, role: Role.SUPER_ADMIN, companyId: null };
      const context = createMockExecutionContext(user);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access for CLIENT users', () => {
      const user = { id: 1, role: Role.CLIENT, companyId: null };
      const context = createMockExecutionContext(user);

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access when user belongs to same company', () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, { companyId: '1' });

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should allow access when no company resource is specified', () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, {}, {}, {});

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException when user is not authenticated', () => {
      const context = createMockExecutionContext(null);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException when company user has no companyId', () => {
      const user = { id: 1, role: Role.ADMIN, companyId: null };
      const context = createMockExecutionContext(user);

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException when user tries to access different company', () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, { companyId: '2' });

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });

    it('should extract companyId from request body', () => {
      const user = { id: 1, role: Role.FLEET_MANAGER, companyId: 1 };
      const context = createMockExecutionContext(user, {}, { companyId: 1 });

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should extract companyId from query parameters', () => {
      const user = { id: 1, role: Role.AMBULANCE_DRIVER, companyId: 1 };
      const context = createMockExecutionContext(
        user,
        {},
        {},
        { companyId: '1' },
      );

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should handle string companyId conversion', () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, { companyId: '1' });

      const result = guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException with string companyId mismatch', () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockExecutionContext(user, { companyId: '2' });

      expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
    });
  });

  describe('extractCompanyIdFromRequest', () => {
    it('should extract companyId from params', () => {
      const request = {
        params: { companyId: '1' },
        body: {},
        query: {},
      } as unknown as RequestWithUser;

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBe(1);
    });

    it('should extract companyId from body when params not available', () => {
      const request = {
        params: {},
        body: { companyId: 2 },
        query: {},
      } as unknown as RequestWithUser;

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBe(2);
    });

    it('should extract companyId from query when params and body not available', () => {
      const request = {
        params: {},
        body: {},
        query: { companyId: '3' },
      } as unknown as RequestWithUser;

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBe(3);
    });

    it('should return null when no companyId found', () => {
      const request = {
        params: {},
        body: {},
        query: {},
      } as unknown as RequestWithUser;

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBeNull();
    });

    it('should handle invalid companyId format', () => {
      const request = {
        params: { companyId: 'invalid' },
        body: {},
        query: {},
      } as unknown as RequestWithUser;

      const result = guard['extractCompanyIdFromRequest'](request);

      expect(result).toBeNaN();
    });
  });
});
