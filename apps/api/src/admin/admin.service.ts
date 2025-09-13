import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFleetManagerDto } from './dto/create-fleet-manager.dto';
import { CreateAmbulanceDriverDto } from './dto/create-ambulance-driver.dto';
import { CreateAmbulanceDto } from './dto/create-ambulance.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, Role, User, Ambulance } from '@prisma/client';
import * as argon from 'argon2';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createFleetManager(dto: CreateFleetManagerDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await argon.hash(dto.password);

    return await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        role: 'FLEET_MANAGER' as Role,
        isProfileComplete: true,
      },
    });
  }

  async createAmbulanceDriver(dto: CreateAmbulanceDriverDto): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await argon.hash(dto.password);

    return await this.prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
        role: 'AMBULANCE_DRIVER' as Role,
        isProfileComplete: true,
      },
    });
  }

  async createAmbulance(dto: CreateAmbulanceDto): Promise<Ambulance> {
    const existingAmbulance = await this.prisma.ambulance.findUnique({
      where: { licensePlate: dto.licensePlate },
    });

    if (existingAmbulance) {
      throw new ConflictException(
        'Ambulance with this license plate already exists',
      );
    }

    if (dto.driverId) {
      const driver = await this.prisma.user.findUnique({
        where: { id: dto.driverId, role: 'AMBULANCE_DRIVER' as Role },
      });

      if (!driver) {
        throw new NotFoundException('Ambulance driver not found');
      }
    }

    return (await this.prisma.ambulance.create({
      data: {
        ...dto,
        companyId: 1, // TODO: Récupérer companyId dynamiquement
      },
      include: {
        driver: true,
        company: true,
      },
    })) as Ambulance;
  }

  async getAllUsers(
    page: number = 1,
    limit: number = 10,
    role?: Role,
  ): Promise<{
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
  }> {
    const skip = (page - 1) * limit;
    const where = role ? { role } : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
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
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getUserById(id: number): Promise<User> {
    const user = (await this.prisma.user.findUnique({
      where: { id },
      include: {
        emergencyContact: true,
        dependent: true,
      },
    })) as Prisma.UserGetPayload<{
      include: {
        emergencyContact: true;
        dependent: true;
      };
    }> | null;

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }
    }

    return await this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role === ('SUPER_ADMIN' as Role)) {
      throw new ForbiddenException('Cannot delete super admin user');
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getAllAmbulances(): Promise<Ambulance[]> {
    return (await this.prisma.ambulance.findMany({
      include: {
        driver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })) as Prisma.AmbulanceGetPayload<{
      include: {
        driver: {
          select: {
            id: true;
            firstName: true;
            lastName: true;
            email: true;
          };
        };
      };
    }>[];
  }

  async getAmbulanceById(id: number): Promise<Ambulance> {
    const ambulance = (await this.prisma.ambulance.findUnique({
      where: { id },
      include: {
        driver: true,
        assignments: {
          include: {
            booking: true,
          },
          take: 10,
          orderBy: { assignedAt: 'desc' },
        },
      },
    })) as Prisma.AmbulanceGetPayload<{
      include: {
        driver: true;
        assignments: {
          include: {
            booking: true;
          };
        };
      };
    }> | null;

    if (!ambulance) {
      throw new NotFoundException('Ambulance not found');
    }

    return ambulance;
  }

  async updateAmbulance(
    id: number,
    dto: Partial<CreateAmbulanceDto>,
  ): Promise<Ambulance> {
    const ambulance = await this.prisma.ambulance.findUnique({
      where: { id },
    });

    if (!ambulance) {
      throw new NotFoundException('Ambulance not found');
    }

    if (dto.licensePlate && dto.licensePlate !== ambulance.licensePlate) {
      const existingAmbulance = await this.prisma.ambulance.findUnique({
        where: { licensePlate: dto.licensePlate },
      });

      if (existingAmbulance) {
        throw new ConflictException(
          'Ambulance with this license plate already exists',
        );
      }
    }

    return (await this.prisma.ambulance.update({
      where: { id },
      data: dto,
      include: {
        driver: true,
      },
    })) as Ambulance;
  }

  async deleteAmbulance(id: number): Promise<void> {
    const ambulance = await this.prisma.ambulance.findUnique({
      where: { id },
    });

    if (!ambulance) {
      throw new NotFoundException('Ambulance not found');
    }

    await this.prisma.ambulance.delete({
      where: { id },
    });
  }

  async getSystemStats(): Promise<{
    totalUsers: number;
    totalClients: number;
    totalDrivers: number;
    totalFleetManagers: number;
    totalAmbulances: number;
    availableAmbulances: number;
    totalBookings: number;
    pendingBookings: number;
  }> {
    const [
      totalUsers,
      totalClients,
      totalDrivers,
      totalFleetManagers,
      totalAmbulances,
      availableAmbulances,
      totalBookings,
      pendingBookings,
    ] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.user.count({
        where: { role: 'CLIENT' as Role },
      }),
      this.prisma.user.count({
        where: { role: 'AMBULANCE_DRIVER' as Role },
      }),
      this.prisma.user.count({
        where: { role: 'FLEET_MANAGER' as Role },
      }),
      this.prisma.ambulance.count(),
      this.prisma.ambulance.count({
        where: { status: 'AVAILABLE' },
      }),
      this.prisma.booking.count(),
      this.prisma.booking.count({
        where: { status: 'PENDING' },
      }),
    ]);

    return {
      totalUsers,
      totalClients,
      totalDrivers,
      totalFleetManagers,
      totalAmbulances,
      availableAmbulances,
      totalBookings,
      pendingBookings,
    };
  }
}
