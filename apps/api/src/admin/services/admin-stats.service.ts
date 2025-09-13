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
