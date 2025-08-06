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
import { Role } from '@prisma/client';

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
  async registerCompany(@Body() registrationDto: CompanyRegistrationDto) {
    return this.companyService.registerCompany(registrationDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
  @Get('pending')
  @ApiOperation({
    summary: 'Get all pending company registrations (Super Admin only)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of pending companies',
    type: [CompanyResponseDto],
  })
  async getPendingCompanies() {
    return this.companyService.getPendingCompanies();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SUPER_ADMIN)
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
  ) {
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
  async getCompany(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.getCompanyById(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
  @Roles(Role.ADMIN)
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
    @Request() req: any,
  ) {
    // SUPER_ADMIN peut accéder à toutes les entreprises
    if (req.user.role === Role.SUPER_ADMIN) {
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
  async getCompanyUsers(@Param('id', ParseIntPipe) companyId: number) {
    return this.companyService.getCompanyUsers(companyId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
  @Roles(Role.ADMIN)
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
    @Request() req: any,
  ) {
    // SUPER_ADMIN peut accéder à toutes les entreprises
    if (req.user.role === Role.SUPER_ADMIN) {
      return this.companyService.deleteCompanyUser(companyId, userId);
    }

    // Vérifier que l'admin appartient à cette entreprise
    if (req.user.companyId !== companyId) {
      throw new Error('Access denied');
    }

    return this.companyService.deleteCompanyUser(companyId, userId);
  }
}
