import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Role } from '@prisma/client';

export interface SystemStats {
  totalUsers: number;
  totalClients: number;
  totalDrivers: number;
  totalFleetManagers: number;
  totalAmbulances: number;
  availableAmbulances: number;
  totalBookings: number;
  pendingBookings: number;
}

@Injectable()
export class AdminStatsService {
  constructor(private readonly prisma: PrismaService) {}

  private get db(): PrismaService {
    return this.prisma as PrismaService;
  }

  async getSystemStats(): Promise<SystemStats> {
    const totalUsers = await this.db.user.count();
    const totalClients = await this.db.user.count({
      where: { role: 'CLIENT' as Role },
    });
    const totalDrivers = await this.db.user.count({
      where: { role: 'AMBULANCE_DRIVER' as Role },
    });
    const totalFleetManagers = await this.db.user.count({
      where: { role: 'FLEET_MANAGER' as Role },
    });
    const totalAmbulances = await this.db.ambulance.count();
    const availableAmbulances = await this.db.ambulance.count({
      where: { status: 'AVAILABLE' },
    });
    const totalBookings = await this.db.booking.count();
    const pendingBookings = await this.db.booking.count({
      where: { status: 'PENDING' },
    });

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
