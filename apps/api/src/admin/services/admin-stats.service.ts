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

  async getSystemStats(): Promise<SystemStats> {
    const totalUsers = await this.prisma.user.count();
    const totalClients = await this.prisma.user.count({
      where: { role: 'CLIENT' as Role },
    });
    const totalDrivers = await this.prisma.user.count({
      where: { role: 'AMBULANCE_DRIVER' as Role },
    });
    const totalFleetManagers = await this.prisma.user.count({
      where: { role: 'FLEET_MANAGER' as Role },
    });
    const totalAmbulances = await this.prisma.ambulance.count();
    const availableAmbulances = await this.prisma.ambulance.count({
      where: { status: 'AVAILABLE' },
    });
    const totalBookings = await this.prisma.booking.count();
    const pendingBookings = await this.prisma.booking.count({
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
