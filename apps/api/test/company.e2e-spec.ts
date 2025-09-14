import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import * as request from 'supertest';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { Role, CompanyStatus } from '@prisma/client';

describe('Company Endpoints (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let superAdminToken: string;
  let companyAdminToken: string;
  let _clientToken: string;
  let testCompany: any;
  let testUser: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prismaService = app.get<PrismaService>(PrismaService);
    jwtService = app.get<JwtService>(JwtService);

    await app.init();
  });

  beforeEach(async () => {
    // Clean database
    await prismaService.assignment.deleteMany();
    await prismaService.ambulance.deleteMany();
    await prismaService.booking.deleteMany();
    await prismaService.transportTicket.deleteMany();
    await prismaService.medicalInfo.deleteMany();
    await prismaService.dependent.deleteMany();
    await prismaService.emergencyContact.deleteMany();
    await prismaService.user.deleteMany();
    await prismaService.company.deleteMany();

    // Create test users
    const hashedPassword = await hash('password123');

    // Create super admin
    const superAdmin = await prismaService.user.create({
      data: {
        email: 'superadmin@test.com',
        firstName: 'Super',
        lastName: 'Admin',
        password: hashedPassword,
        role: Role.SUPER_ADMIN,
        authProvider: 'CREDENTIALS',
        isProfileComplete: true,
        companyId: null,
      },
    });

    // Create client user
    const client = await prismaService.user.create({
      data: {
        email: 'client@test.com',
        firstName: 'Client',
        lastName: 'User',
        password: hashedPassword,
        role: Role.CLIENT,
        authProvider: 'CREDENTIALS',
        isProfileComplete: true,
        companyId: null,
      },
    });

    // Create test company first
    testCompany = await prismaService.company.create({
      data: {
        name: 'Test Ambulances',
        email: 'company@test.com',
        status: CompanyStatus.APPROVED,
        licenseNumber: 'LIC-TEST-001',
        address: '123 Test Street',
        phoneNumber: '+33123456789',
      },
    });

    // Create company admin
    const companyAdmin = await prismaService.user.create({
      data: {
        email: 'admin@test.com',
        firstName: 'Company',
        lastName: 'Admin',
        password: hashedPassword,
        role: Role.ADMIN,
        authProvider: 'CREDENTIALS',
        isProfileComplete: true,
        companyId: testCompany.id,
      },
    });

    testUser = companyAdmin;

    // Generate tokens
    superAdminToken = jwtService.sign({ sub: superAdmin.id });
    companyAdminToken = jwtService.sign({ sub: companyAdmin.id });
    _clientToken = jwtService.sign({ sub: client.id });
  });

  afterAll(async () => {
    await prismaService.$disconnect();
    await app.close();
  });

  describe('POST /companies/register', () => {
    const registrationDto = {
      name: 'New Ambulance Service',
      email: 'new@ambulance.com',
      phoneNumber: '+33123456789',
      address: '123 Main Street',
      city: 'Paris',
      postalCode: '75001',
      licenseNumber: 'LIC-NEW-001',
      notes: 'Test registration',
      adminUser: {
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@new.com',
        password: 'password123',
        phoneNumber: '+33987654321',
      },
    };

    it('should register a new company successfully', async () => {
      const response = await request(app.getHttpServer())
        .post('/companies/register')
        .send(registrationDto)
        .expect(201);

      expect(response.body.company.name).toBe(registrationDto.name);
      expect(response.body.company.status).toBe(CompanyStatus.PENDING);
      expect(response.body.message).toBe(
        'Company registration submitted for approval',
      );
    });

    it('should reject duplicate company email', async () => {
      const duplicateDto = {
        ...registrationDto,
        email: 'company@test.com', // Already exists
        adminUser: {
          ...registrationDto.adminUser,
          email: 'different@email.com',
        },
      };

      await request(app.getHttpServer())
        .post('/companies/register')
        .send(duplicateDto)
        .expect(409);
    });

    it('should reject duplicate admin email', async () => {
      const duplicateDto = {
        ...registrationDto,
        email: 'different@company.com',
        adminUser: {
          ...registrationDto.adminUser,
          email: 'admin@test.com', // Already exists
        },
      };

      await request(app.getHttpServer())
        .post('/companies/register')
        .send(duplicateDto)
        .expect(409);
    });
  });

  describe('GET /companies/pending', () => {
    it('should return pending companies for super admin', async () => {
      // Create a pending company
      await prismaService.company.create({
        data: {
          name: 'Pending Company',
          email: 'pending@test.com',
          status: CompanyStatus.PENDING,
          licenseNumber: 'LIC-PENDING-001',
          address: '456 Pending Street',
          phoneNumber: '+33987654321',
        },
      });

      const response = await request(app.getHttpServer())
        .get('/companies/pending')
        .set('Authorization', `Bearer ${superAdminToken}`)
        .expect(200);

      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].status).toBe(CompanyStatus.PENDING);
    });

    it('should reject access for non-super-admin', async () => {
      await request(app.getHttpServer())
        .get('/companies/pending')
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .expect(403);
    });
  });

  describe('PUT /companies/:id/approval', () => {
    let pendingCompany: any;

    beforeEach(async () => {
      pendingCompany = await prismaService.company.create({
        data: {
          name: 'Pending Company',
          email: 'pending@test.com',
          status: CompanyStatus.PENDING,
          licenseNumber: 'LIC-PENDING-002',
          address: '789 Pending Avenue',
          phoneNumber: '+33111222333',
        },
      });
    });

    it('should approve company as super admin', async () => {
      const approvalDto = {
        status: CompanyStatus.APPROVED,
        notes: 'Approved after verification',
      };

      const response = await request(app.getHttpServer())
        .put(`/companies/${pendingCompany.id}/approval`)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send(approvalDto)
        .expect(200);

      expect(response.body.status).toBe(CompanyStatus.APPROVED);
      expect(response.body.approvedAt).toBeDefined();
    });

    it('should reject company as super admin', async () => {
      const rejectionDto = {
        status: CompanyStatus.REJECTED,
        notes: 'Missing required documents',
      };

      const response = await request(app.getHttpServer())
        .put(`/companies/${pendingCompany.id}/approval`)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .send(rejectionDto)
        .expect(200);

      expect(response.body.status).toBe(CompanyStatus.REJECTED);
    });

    it('should reject access for non-super-admin', async () => {
      await request(app.getHttpServer())
        .put(`/companies/${pendingCompany.id}/approval`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .send({ status: CompanyStatus.APPROVED })
        .expect(403);
    });
  });

  describe('GET /companies/:id', () => {
    it('should return company details for company admin', async () => {
      const response = await request(app.getHttpServer())
        .get(`/companies/${testCompany.id}`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .expect(200);

      expect(response.body.id).toBe(testCompany.id);
      expect(response.body.name).toBe(testCompany.name);
      expect(response.body.users).toBeDefined();
    });

    it('should return company details for super admin', async () => {
      const response = await request(app.getHttpServer())
        .get(`/companies/${testCompany.id}`)
        .set('Authorization', `Bearer ${superAdminToken}`)
        .expect(200);

      expect(response.body.id).toBe(testCompany.id);
    });

    it('should reject access for different company admin', async () => {
      // Create another company and admin
      const otherCompany = await prismaService.company.create({
        data: {
          name: 'Other Company',
          email: 'other@test.com',
          status: CompanyStatus.APPROVED,
          licenseNumber: 'LIC-OTHER-001',
          address: '321 Other Street',
          phoneNumber: '+33444555666',
        },
      });

      const otherAdmin = await prismaService.user.create({
        data: {
          email: 'other-admin@test.com',
          firstName: 'Other',
          lastName: 'Admin',
          password: await hash('password123'),
          role: Role.ADMIN,
          authProvider: 'CREDENTIALS',
          isProfileComplete: true,
          companyId: otherCompany.id,
        },
      });

      const otherToken = jwtService.sign({ sub: otherAdmin.id });

      await request(app.getHttpServer())
        .get(`/companies/${testCompany.id}`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(403);
    });
  });

  describe('POST /companies/:id/users', () => {
    const createUserDto = {
      firstName: 'New',
      lastName: 'Driver',
      email: 'driver@test.com',
      password: 'password123',
      role: Role.AMBULANCE_DRIVER,
      phoneNumber: '+33555666777',
    };

    it('should create user as company admin', async () => {
      const response = await request(app.getHttpServer())
        .post(`/companies/${testCompany.id}/users`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .send(createUserDto)
        .expect(201);

      expect(response.body.email).toBe(createUserDto.email);
      expect(response.body.role).toBe(createUserDto.role);
      expect(response.body.companyId).toBe(testCompany.id);
    });

    it('should reject CLIENT role creation', async () => {
      const clientDto = { ...createUserDto, role: Role.CLIENT };

      await request(app.getHttpServer())
        .post(`/companies/${testCompany.id}/users`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .send(clientDto)
        .expect(400);
    });

    it('should reject SUPER_ADMIN role creation', async () => {
      const superAdminDto = { ...createUserDto, role: Role.SUPER_ADMIN };

      await request(app.getHttpServer())
        .post(`/companies/${testCompany.id}/users`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .send(superAdminDto)
        .expect(400);
    });

    it('should reject duplicate email', async () => {
      const duplicateDto = { ...createUserDto, email: 'admin@test.com' };

      await request(app.getHttpServer())
        .post(`/companies/${testCompany.id}/users`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .send(duplicateDto)
        .expect(409);
    });
  });

  describe('GET /companies/:id/users', () => {
    it('should return company users', async () => {
      const response = await request(app.getHttpServer())
        .get(`/companies/${testCompany.id}/users`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0].companyId).toBe(testCompany.id);
    });
  });

  describe('DELETE /companies/:companyId/users/:userId', () => {
    let testDriver: any;

    beforeEach(async () => {
      testDriver = await prismaService.user.create({
        data: {
          email: 'driver@test.com',
          firstName: 'Test',
          lastName: 'Driver',
          password: await hash('password123'),
          role: Role.AMBULANCE_DRIVER,
          authProvider: 'CREDENTIALS',
          isProfileComplete: true,
          companyId: testCompany.id,
        },
      });
    });

    it('should delete user as company admin', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/companies/${testCompany.id}/users/${testDriver.id}`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .expect(200);

      expect(response.body.message).toBe('User deleted successfully');
    });

    it('should prevent deleting last admin', async () => {
      await request(app.getHttpServer())
        .delete(`/companies/${testCompany.id}/users/${testUser.id}`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .expect(400);
    });
  });

  describe('Multi-tenant isolation', () => {
    let company2: any;
    let admin2: any;
    let admin2Token: string;

    beforeEach(async () => {
      // Create second company
      company2 = await prismaService.company.create({
        data: {
          name: 'Company 2',
          email: 'company2@test.com',
          status: CompanyStatus.APPROVED,
          licenseNumber: 'LIC-2',
          address: '654 Company2 Boulevard',
          phoneNumber: '+33777888999',
        },
      });

      admin2 = await prismaService.user.create({
        data: {
          email: 'admin2@test.com',
          firstName: 'Admin',
          lastName: 'Two',
          password: await hash('password123'),
          role: Role.ADMIN,
          authProvider: 'CREDENTIALS',
          isProfileComplete: true,
          companyId: company2.id,
        },
      });

      admin2Token = jwtService.sign({ sub: admin2.id });
    });

    it('should isolate company data access', async () => {
      // Company 1 admin should not access Company 2
      await request(app.getHttpServer())
        .get(`/companies/${company2.id}`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .expect(403);

      // Company 2 admin should not access Company 1
      await request(app.getHttpServer())
        .get(`/companies/${testCompany.id}`)
        .set('Authorization', `Bearer ${admin2Token}`)
        .expect(403);
    });

    it('should isolate user creation', async () => {
      const userDto = {
        firstName: 'Cross',
        lastName: 'Company',
        email: 'cross@test.com',
        password: 'password123',
        role: Role.FLEET_MANAGER,
      };

      // Company 1 admin should not create user in Company 2
      await request(app.getHttpServer())
        .post(`/companies/${company2.id}/users`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .send(userDto)
        .expect(403);
    });

    it('should isolate user deletion', async () => {
      // Company 1 admin should not delete users from Company 2
      await request(app.getHttpServer())
        .delete(`/companies/${company2.id}/users/${admin2.id}`)
        .set('Authorization', `Bearer ${companyAdminToken}`)
        .expect(403);
    });
  });
});
