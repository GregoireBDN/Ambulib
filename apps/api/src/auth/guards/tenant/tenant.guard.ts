import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (user.role === Role.SUPER_ADMIN) {
      return true;
    }

    if (user.role === Role.CLIENT) {
      return true;
    }

    if (!user.companyId) {
      throw new ForbiddenException('User not associated with any company');
    }

    const resourceCompanyId = this.extractCompanyIdFromRequest(request);

    if (resourceCompanyId && user.companyId !== resourceCompanyId) {
      throw new ForbiddenException('Access denied: different company');
    }

    return true;
  }

  private extractCompanyIdFromRequest(request: any): number | null {
    const companyId =
      request.params?.companyId ||
      request.body?.companyId ||
      request.query?.companyId;

    return companyId ? parseInt(companyId, 10) : null;
  }
}
