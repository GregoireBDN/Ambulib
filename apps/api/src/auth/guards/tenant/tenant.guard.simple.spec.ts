import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TenantGuard } from './tenant.guard';
import { PrismaService } from '../../../prisma/prisma.service';
import { Role } from '@prisma/client';

describe('TenantGuard - Simple Tests', () => {
  let guard: TenantGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TenantGuard,
        {
          provide: Reflector,
          useValue: { get: jest.fn() },
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    guard = module.get<TenantGuard>(TenantGuard);
  });

  const createMockContext = (
    user: any,
    params = {},
    body = {},
    query = {},
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
    } as any;
  };

  describe('SUPER_ADMIN access', () => {
    it('should allow SUPER_ADMIN to access anything', async () => {
      const user = { id: 1, role: Role.SUPER_ADMIN, companyId: null };
      const context = createMockContext(user);

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  describe('CLIENT access', () => {
    it('should allow CLIENT to access without company restriction', async () => {
      const user = { id: 1, role: Role.CLIENT, companyId: null };
      const context = createMockContext(user);

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });
  });

  describe('Company user access', () => {
    it('should allow access when user belongs to same company', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockContext(user, { companyId: '1' });

      const result = await guard.canActivate(context);

      expect(result).toBe(true);
    });

    it('should throw ForbiddenException when accessing different company', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: 1 };
      const context = createMockContext(user, { companyId: '2' });

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when company user has no companyId', async () => {
      const user = { id: 1, role: Role.ADMIN, companyId: null };
      const context = createMockContext(user);

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });

  describe('Authentication check', () => {
    it('should throw ForbiddenException when no user', async () => {
      const context = createMockContext(null);

      await expect(guard.canActivate(context)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
