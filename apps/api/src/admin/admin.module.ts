import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminUsersService } from './services/admin-users.service';
import { AdminAmbulancesService } from './services/admin-ambulances.service';
import { AdminStatsService } from './services/admin-stats.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AdminController],
  providers: [
    AdminService,
    AdminUsersService,
    AdminAmbulancesService,
    AdminStatsService,
    PrismaService,
  ],
  exports: [AdminService],
})
export class AdminModule {}
