import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { CompanyService } from '../services/company.service';
import { RequestWithUser } from '../../common/interfaces/request-with-user.interface';
import {
  CompanyRegistrationDto,
  CompanyApprovalDto,
  CompanyResponseDto,
} from '../dto/company.dto';
import { CreateCompanyUserDto } from '../dto/auth.dto';
import { JwtAuthGuard } from '../guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../guards/roles/roles.guard';
import { TenantGuard } from '../guards/tenant/tenant.guard';
import { Roles } from '../decorators/roles.decorator';
import { Tenant } from '../decorators/tenant.decorator';
import { Public } from '../decorators/public.decorator';
import { Role, CompanyStatus } from '@prisma/client';

interface CompanyRegistrationResponse {
  company: {
    id: number;
    name: string;
    email: string;
    status: CompanyStatus;
    phoneNumber: string;
    address: string;
    licenseNumber: string;
    createdAt: Date;
    updatedAt: Date;
  };
  message: string;
}

interface CompanyUserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  companyId: number | null;
  phoneNumber?: string | null;
  isProfileComplete?: boolean;
  createdAt?: Date;
  password?: string;
  hashedRefreshToken?: string | null;
  age?: number | null;
  address?: string | null;
  city?: string | null;
  postalCode?: string | null;
  country?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  emergencyContactRelation?: string | null;
  isEmailVerified?: boolean;
  authProvider?: string;
  updatedAt?: Date;
}

interface CompanyDetailsResponse {
  id: number;
  name: string;
  email: string;
  status: CompanyStatus;
  phoneNumber: string;
  address: string;
  licenseNumber: string;
  createdAt: Date;
  updatedAt: Date;
  users: {
    id: number;
    email: string;
    role: Role;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    createdAt: Date;
  }[];
  ambulances: {
    id: number;
    status: any;
    licensePlate: string;
    model: string;
  }[];
}

@ApiTags('Company Management')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register a new ambulance company' })
  @ApiResponse({
    status: 201,
    description: 'Company registration submitted',
    type: CompanyResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Company email or license already exists',
  })
  async registerCompany(
    @Body() registrationDto: CompanyRegistrationDto,
  ): Promise<CompanyRegistrationResponse> {
    return this.companyService.registerCompany(registrationDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN' as Role)
  @Get('pending')
  @ApiOperation({
    summary: 'Get all pending company registrations (Super Admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of pending companies',
    type: [CompanyResponseDto],
  })
  async getPendingCompanies(): Promise<
    {
      id: number;
      name: string;
      email: string;
      status: CompanyStatus;
      phoneNumber: string;
      address: string;
      licenseNumber: string;
      createdAt: Date;
      updatedAt: Date;
      users: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        phoneNumber: string | null;
      }[];
    }[]
  > {
    return this.companyService.getPendingCompanies();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPER_ADMIN' as Role)
  @Put(':id/approval')
  @ApiOperation({
    summary: 'Approve or reject a company registration (Super Admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'Company status updated',
    type: CompanyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async approveCompany(
    @Param('id', ParseIntPipe) companyId: number,
    @Body() approvalDto: Omit<CompanyApprovalDto, 'companyId'>,
  ): Promise<{
    id: number;
    name: string;
    email: string;
    status: CompanyStatus;
    phoneNumber: string;
    address: string;
    licenseNumber: string;
    createdAt: Date;
    updatedAt: Date;
  }> {
    return this.companyService.approveCompany({ ...approvalDto, companyId });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @Tenant()
  @Get(':id')
  @ApiOperation({ summary: 'Get company details' })
  @ApiResponse({
    status: 200,
    description: 'Company details',
    type: CompanyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Company not found' })
  async getCompany(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CompanyDetailsResponse> {
    return this.companyService.getCompanyById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
  @Roles('ADMIN' as Role)
  @Tenant()
  @Post(':id/users')
  @ApiOperation({
    summary: 'Create a new user for the company (Company Admin only)',
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 409, description: 'User email already exists' })
  async createCompanyUser(
    @Param('id', ParseIntPipe) companyId: number,
    @Body() userDto: CreateCompanyUserDto,
    @Request() req: RequestWithUser,
  ): Promise<CompanyUserResponse> {
    // SUPER_ADMIN peut accéder à toutes les entreprises
    if (req.user.role === ('SUPER_ADMIN' as Role)) {
      return this.companyService.createCompanyUser(companyId, userDto);
    }

    // Vérifier que l'admin appartient à cette entreprise
    if (req.user.companyId !== companyId) {
      throw new Error('Access denied');
    }

    return this.companyService.createCompanyUser(companyId, userDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, TenantGuard)
  @Tenant()
  @Get(':id/users')
  @ApiOperation({ summary: 'Get all users in the company' })
  @ApiResponse({ status: 200, description: 'List of company users' })
  async getCompanyUsers(@Param('id', ParseIntPipe) companyId: number): Promise<
    {
      id: number;
      email: string;
      role: Role;
      firstName: string;
      lastName: string;
      phoneNumber: string | null;
      isProfileComplete: boolean;
      createdAt: Date;
    }[]
  > {
    return this.companyService.getCompanyUsers(companyId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
  @Roles('ADMIN' as Role)
  @Tenant()
  @Delete(':companyId/users/:userId')
  @ApiOperation({
    summary: 'Delete a user from the company (Company Admin only)',
  })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User or company not found' })
  async deleteCompanyUser(
    @Param('companyId', ParseIntPipe) companyId: number,
    @Param('userId', ParseIntPipe) userId: number,
    @Request() req: RequestWithUser,
  ): Promise<{ message: string }> {
    // SUPER_ADMIN peut accéder à toutes les entreprises
    if (req.user.role === ('SUPER_ADMIN' as Role)) {
      return this.companyService.deleteCompanyUser(companyId, userId);
    }

    // Vérifier que l'admin appartient à cette entreprise
    if (req.user.companyId !== companyId) {
      throw new Error('Access denied');
    }

    return this.companyService.deleteCompanyUser(companyId, userId);
  }
}
