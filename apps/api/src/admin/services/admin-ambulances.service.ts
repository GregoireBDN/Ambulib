import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAmbulanceDto } from '../dto/create-ambulance.dto';
import { Prisma, Role, Ambulance } from '@prisma/client';

type AmbulanceWithDriver = Prisma.AmbulanceGetPayload<{
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
}>;

type AmbulanceWithRelations = Prisma.AmbulanceGetPayload<{
  include: {
    driver: true;
    assignments: {
      include: {
        booking: true;
      };
    };
  };
}>;

@Injectable()
export class AdminAmbulancesService {
  constructor(private readonly prisma: PrismaService) {}

  async createAmbulance(dto: CreateAmbulanceDto): Promise<Ambulance> {
    const existingAmbulance = await (this.prisma as PrismaService).ambulance.findUnique({
      where: { licensePlate: dto.licensePlate },
    });

    if (existingAmbulance) {
      throw new ConflictException(
        'Ambulance with this license plate already exists',
      );
    }

    if (dto.driverId) {
      const driver = await (this.prisma as PrismaService).user.findUnique({
        where: { id: dto.driverId, role: 'AMBULANCE_DRIVER' as Role },
      });

      if (!driver) {
        throw new NotFoundException('Ambulance driver not found');
      }
    }

    return (await (this.prisma as PrismaService).ambulance.create({
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

  async getAllAmbulances(): Promise<AmbulanceWithDriver[]> {
    return (await (this.prisma as PrismaService).ambulance.findMany({
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
    })) as AmbulanceWithDriver[];
  }

  async getAmbulanceById(id: number): Promise<AmbulanceWithRelations> {
    const ambulance = await (this.prisma as PrismaService).ambulance.findUnique({
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
    });

    if (!ambulance) {
      throw new NotFoundException('Ambulance not found');
    }

    return ambulance as AmbulanceWithRelations;
  }

  async updateAmbulance(
    id: number,
    dto: Partial<CreateAmbulanceDto>,
  ): Promise<Ambulance> {
    const ambulance = await (this.prisma as PrismaService).ambulance.findUnique({
      where: { id },
    });

    if (!ambulance) {
      throw new NotFoundException('Ambulance not found');
    }

    if (dto.licensePlate && dto.licensePlate !== ambulance.licensePlate) {
      const existingAmbulance = await (this.prisma as PrismaService).ambulance.findUnique({
        where: { licensePlate: dto.licensePlate },
      });

      if (existingAmbulance) {
        throw new ConflictException(
          'Ambulance with this license plate already exists',
        );
      }
    }

    return (await (this.prisma as PrismaService).ambulance.update({
      where: { id },
      data: dto,
      include: {
        driver: true,
      },
    })) as Ambulance;
  }

  async deleteAmbulance(id: number): Promise<void> {
    const ambulance = await (this.prisma as PrismaService).ambulance.findUnique({
      where: { id },
    });

    if (!ambulance) {
      throw new NotFoundException('Ambulance not found');
    }

    await (this.prisma as PrismaService).ambulance.delete({
      where: { id },
    });
  }
}
