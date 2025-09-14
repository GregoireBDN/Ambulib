/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFleetManagerDto } from '../dto/create-fleet-manager.dto';
import { CreateAmbulanceDriverDto } from '../dto/create-ambulance-driver.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Prisma, Role, User } from '@prisma/client';
import * as argon from 'argon2';

type UserWithRelations = Prisma.UserGetPayload<{
  include: {
    emergencyContact: true;
    dependent: true;
  };
}>;

type PaginatedUsersResponse = {
  users: Array<{
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    phoneNumber: string | null;
    city: string | null;
    isProfileComplete: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
  total: number;
  page: number;
  totalPages: number;
};

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  private get db(): PrismaService {
    return this.prisma;
  }

  async createFleetManager(dto: CreateFleetManagerDto): Promise<User> {
    const existingUser = await this.db.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await argon.hash(dto.password);

    return await this.db.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        role: 'FLEET_MANAGER' as Role,
        isProfileComplete: true,
      },
    });
  }

  async createAmbulanceDriver(dto: CreateAmbulanceDriverDto): Promise<User> {
    const existingUser = await this.db.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await argon.hash(dto.password);

    return await this.db.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        role: 'AMBULANCE_DRIVER' as Role,
        isProfileComplete: true,
      },
    });
  }

  async getAllUsers(
    page: number = 1,
    limit: number = 10,
    role?: Role,
  ): Promise<PaginatedUsersResponse> {
    const skip = (page - 1) * limit;
    const where = role ? { role } : {};

    const [users, total] = await Promise.all([
      this.db.user.findMany({
        where,
        skip,
        take: limit,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          phoneNumber: true,
          city: true,
          isProfileComplete: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.db.user.count({ where }),
    ]);

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserById(id: number): Promise<UserWithRelations> {
    const user = await this.db.user.findUnique({
      where: { id },
      include: {
        emergencyContact: true,
        dependent: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user as UserWithRelations;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.db.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    return await this.db.user.update({
      where: { id },
      data: dto,
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === ('SUPER_ADMIN' as Role)) {
      throw new ForbiddenException('Cannot delete super admin user');
    }

    await this.db.user.delete({
      where: { id },
    });
  }
}
