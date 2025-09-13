import { Injectable } from '@nestjs/common';
import { CreateFleetManagerDto } from './dto/create-fleet-manager.dto';
import { CreateAmbulanceDriverDto } from './dto/create-ambulance-driver.dto';
import { CreateAmbulanceDto } from './dto/create-ambulance.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, User, Ambulance } from '@prisma/client';
import { AdminUsersService } from './services/admin-users.service';
import { AdminAmbulancesService } from './services/admin-ambulances.service';
import { AdminStatsService, SystemStats } from './services/admin-stats.service';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminUsersService: AdminUsersService,
    private readonly adminAmbulancesService: AdminAmbulancesService,
    private readonly adminStatsService: AdminStatsService,
  ) {}

  async createFleetManager(dto: CreateFleetManagerDto): Promise<User> {
    return this.adminUsersService.createFleetManager(dto);
  }

  async createAmbulanceDriver(dto: CreateAmbulanceDriverDto): Promise<User> {
    return this.adminUsersService.createAmbulanceDriver(dto);
  }

  async createAmbulance(dto: CreateAmbulanceDto): Promise<Ambulance> {
    return this.adminAmbulancesService.createAmbulance(dto);
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
    return this.adminUsersService.getAllUsers(page, limit, role);
  }

  async getUserById(id: number): Promise<User> {
    return this.adminUsersService.getUserById(id);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    return this.adminUsersService.updateUser(id, dto);
  }

  async deleteUser(id: number): Promise<void> {
    return this.adminUsersService.deleteUser(id);
  }

  async getAllAmbulances(): Promise<Ambulance[]> {
    return this.adminAmbulancesService.getAllAmbulances();
  }

  async getAmbulanceById(id: number): Promise<Ambulance> {
    return this.adminAmbulancesService.getAmbulanceById(id);
  }

  async updateAmbulance(
    id: number,
    dto: Partial<CreateAmbulanceDto>,
  ): Promise<Ambulance> {
    return this.adminAmbulancesService.updateAmbulance(id, dto);
  }

  async deleteAmbulance(id: number): Promise<void> {
    return this.adminAmbulancesService.deleteAmbulance(id);
  }

  async getSystemStats(): Promise<SystemStats> {
    return this.adminStatsService.getSystemStats();
  }
}
