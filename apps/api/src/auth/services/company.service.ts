import {
  Injectable,
  ConflictException,
  NotFoundException,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from '../../user/user.service';
import { hash } from 'argon2';
import { CompanyRegistrationDto, CompanyApprovalDto } from '../dto/company.dto';
import { CompanyStatus, Role, AuthProvider } from '@prisma/client';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async registerCompany(registrationDto: CompanyRegistrationDto) {
    this.logger.log(`Registering new company: ${registrationDto.name}`);

    try {
      // Vérifier que l'email de l'entreprise n'existe pas
      const existingCompany = await this.prisma.company.findFirst({
        where: { email: registrationDto.email },
      });

      if (existingCompany) {
        throw new ConflictException('Company email already exists');
      }

      // Vérifier que l'email de l'admin n'existe pas
      const existingUser = await this.userService.findByEmail(
        registrationDto.adminUser.email,
      );

      if (existingUser) {
        throw new ConflictException('Admin user email already exists');
      }

      // Vérifier le numéro de licence s'il est fourni
      if (registrationDto.licenseNumber) {
        const existingLicense = await this.prisma.company.findUnique({
          where: { licenseNumber: registrationDto.licenseNumber },
        });

        if (existingLicense) {
          throw new ConflictException('License number already exists');
        }
      }

      // Créer l'entreprise et l'utilisateur admin dans une transaction
      const result = await this.prisma.$transaction(async (prisma) => {
        // Créer l'entreprise
        const company = await prisma.company.create({
          data: {
            name: registrationDto.name,
            email: registrationDto.email,
            phoneNumber: registrationDto.phoneNumber || '',
            address: registrationDto.address || '',
            licenseNumber: registrationDto.licenseNumber || '',
          },
        });

        // Créer l'utilisateur admin
        const hashedPassword = await hash(registrationDto.adminUser.password);
        const adminUser = await prisma.user.create({
          data: {
            firstName: registrationDto.adminUser.firstName,
            lastName: registrationDto.adminUser.lastName,
            email: registrationDto.adminUser.email,
            password: hashedPassword,
            phoneNumber: registrationDto.adminUser.phoneNumber,
            role: Role.ADMIN,
            companyId: company.id,
            authProvider: AuthProvider.CREDENTIALS,
            isProfileComplete: true,
          },
        });

        return { company, adminUser };
      });

      this.logger.log(
        `Company ${result.company.name} registered successfully with ID: ${result.company.id}`,
      );

      return {
        company: result.company,
        message: 'Company registration submitted for approval',
      };
    } catch (error) {
      this.logger.error(
        `Error in registerCompany for ${registrationDto.name}:`,
        error instanceof Error ? error.stack : String(error),
      );
      throw error;
    }
  }

  async approveCompany(approvalDto: CompanyApprovalDto) {
    this.logger.log(
      `Processing company approval for ID: ${approvalDto.companyId}`,
    );

    const company = await this.prisma.company.findUnique({
      where: { id: approvalDto.companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (company.status !== CompanyStatus.PENDING) {
      throw new BadRequestException('Company is not in pending status');
    }

    const updatedCompany = await this.prisma.company.update({
      where: { id: approvalDto.companyId },
      data: {
        status: approvalDto.status,
        // approvedAt field does not exist in schema
      },
    });

    this.logger.log(
      `Company ${updatedCompany.name} status updated to: ${approvalDto.status}`,
    );

    return updatedCompany;
  }

  async getPendingCompanies() {
    return this.prisma.company.findMany({
      where: { status: CompanyStatus.PENDING },
      include: {
        users: {
          where: { role: Role.ADMIN },
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getCompanyById(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            phoneNumber: true,
            createdAt: true,
          },
        },
        ambulances: {
          select: {
            id: true,
            licensePlate: true,
            model: true,
            status: true,
          },
        },
      },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return company;
  }

  async createCompanyUser(companyId: number, userDto: any) {
    this.logger.log(`Creating user for company ID: ${companyId}`);

    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    if (company.status !== CompanyStatus.APPROVED) {
      throw new BadRequestException('Company must be approved to create users');
    }

    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException('User email already exists');
    }

    if (userDto.role === Role.CLIENT) {
      throw new BadRequestException('Cannot create CLIENT role within company');
    }

    if (userDto.role === Role.SUPER_ADMIN) {
      throw new BadRequestException('Cannot create SUPER_ADMIN role');
    }

    const hashedPassword = await hash(userDto.password);
    const user = await this.prisma.user.create({
      data: {
        firstName: userDto.firstName,
        lastName: userDto.lastName,
        email: userDto.email,
        password: hashedPassword,
        phoneNumber: userDto.phoneNumber,
        role: userDto.role,
        companyId,
        authProvider: AuthProvider.CREDENTIALS,
        isProfileComplete: true,
      },
    });

    this.logger.log(
      `User ${user.email} created successfully for company ${company.name}`,
    );

    return user;
  }

  async getCompanyUsers(companyId: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    return this.prisma.user.findMany({
      where: { companyId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        phoneNumber: true,
        createdAt: true,
        isProfileComplete: true,
      },
    });
  }

  async deleteCompanyUser(companyId: number, userId: number) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.companyId !== companyId) {
      throw new BadRequestException('User does not belong to this company');
    }

    if (user.role === Role.ADMIN) {
      const adminCount = await this.prisma.user.count({
        where: { companyId, role: Role.ADMIN },
      });

      if (adminCount <= 1) {
        throw new BadRequestException('Cannot delete the last admin user');
      }
    }

    await this.prisma.user.delete({
      where: { id: userId },
    });

    this.logger.log(`User ${user.email} deleted from company ${company.name}`);

    return { message: 'User deleted successfully' };
  }
}
