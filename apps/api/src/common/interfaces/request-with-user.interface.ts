import { Request } from 'express';
import { Role } from '@prisma/client';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    companyId?: number;
    isEmailVerified: boolean;
    isProfileComplete: boolean;
  };
}
