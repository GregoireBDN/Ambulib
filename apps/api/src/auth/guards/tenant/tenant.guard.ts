import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '../../../prisma/prisma.service';
import { Role } from '@prisma/client';
import { RequestWithUser } from '../../../common/interfaces/request-with-user.interface';

@Injectable()
export class TenantGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
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

  private extractCompanyIdFromRequest(request: RequestWithUser): number | null {
    const companyId: string | undefined =
      (request.params as Record<string, string>)?.companyId ||
      ((request.body as Record<string, unknown>)?.companyId as string) ||
      (request.query as Record<string, string>)?.companyId;

    return companyId ? parseInt(companyId, 10) : null;
  }
}
