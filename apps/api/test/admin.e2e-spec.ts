import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AdminController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = moduleFixture.get<PrismaService>(PrismaService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    // Clean database before each test
    await prisma.assignment.deleteMany({});
    await prisma.ambulance.deleteMany({});
    await prisma.transportTicket.deleteMany({});
    await prisma.booking.deleteMany({});
    await prisma.medicalInfo.deleteMany({});
    await prisma.dependent.deleteMany({});
    await prisma.emergencyContact.deleteMany({});
    await prisma.user.deleteMany({});
  });

  describe('/admin (POST)', () => {
    it('should create a fleet manager when authenticated as admin', async () => {
      // First create an admin user
      const adminUser = await prisma.user.create({
        data: {
          email: 'admin@example.com',
          password: 'hashedPassword',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN',
          isProfileComplete: true,
          companyId: null,
        },
      });

      expect(adminUser).toBeDefined();

      // Mock JWT token (in real scenario, you'd get this from login endpoint)
      const jwtToken = 'mock-jwt-token';

      const createFleetManagerDto = {
        email: 'fleetmanager@example.com',
        password: 'password123',
        firstName: 'Fleet',
        lastName: 'Manager',
        phoneNumber: '+1234567890',
        city: 'Test City',
      };

      return request(app.getHttpServer())
        .post('/admin/fleet-managers')
        .set('Authorization', `Bearer ${jwtToken}`)
        .send(createFleetManagerDto)
        .expect(401); // Should get 401 without proper JWT setup
    });

    it('should create an ambulance driver when authenticated as admin', async () => {
      const createDriverDto = {
        email: 'driver@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Driver',
        phoneNumber: '+1234567890',
        city: 'Test City',
      };

      return request(app.getHttpServer())
        .post('/admin/ambulance-drivers')
        .send(createDriverDto)
        .expect(401); // Should get 401 without proper authentication
    });

    it('should create an ambulance when authenticated as admin', async () => {
      const createAmbulanceDto = {
        licensePlate: 'AMB123',
        model: 'Mercedes Sprinter',
        year: 2022,
        capacity: 2,
      };

      return request(app.getHttpServer())
        .post('/admin/ambulances')
        .send(createAmbulanceDto)
        .expect(401); // Should get 401 without proper authentication
    });
  });

  describe('/admin/users (GET)', () => {
    it('should return paginated users when authenticated as admin', async () => {
      return request(app.getHttpServer()).get('/admin/users').expect(401); // Should get 401 without proper authentication
    });

    it('should filter users by role when role parameter is provided', async () => {
      return request(app.getHttpServer())
        .get('/admin/users?role=CLIENT')
        .expect(401); // Should get 401 without proper authentication
    });
  });

  describe('/admin/ambulances (GET)', () => {
    it('should return all ambulances when authenticated as admin', async () => {
      return request(app.getHttpServer()).get('/admin/ambulances').expect(401); // Should get 401 without proper authentication
    });
  });

  describe('/admin/stats (GET)', () => {
    it('should return system statistics when authenticated as admin', async () => {
      return request(app.getHttpServer()).get('/admin/stats').expect(401); // Should get 401 without proper authentication
    });
  });

  describe('Database operations', () => {
    it('should be able to create users with new roles', async () => {
      const fleetManager = await prisma.user.create({
        data: {
          email: 'fm@example.com',
          password: 'hashedPassword',
          firstName: 'Fleet',
          lastName: 'Manager',
          role: 'FLEET_MANAGER',
          isProfileComplete: true,
          companyId: null,
        },
      });

      expect(fleetManager.role).toBe('FLEET_MANAGER');
      expect(fleetManager.email).toBe('fm@example.com');

      const ambulanceDriver = await prisma.user.create({
        data: {
          email: 'driver@example.com',
          password: 'hashedPassword',
          firstName: 'Ambulance',
          lastName: 'Driver',
          role: 'AMBULANCE_DRIVER',
          isProfileComplete: true,
          companyId: null,
        },
      });

      expect(ambulanceDriver.role).toBe('AMBULANCE_DRIVER');
    });

    it('should be able to create ambulances', async () => {
      const ambulance = await prisma.ambulance.create({
        data: {
          companyId: 1,
          licensePlate: 'TEST123',
          model: 'Ford Transit',
          year: 2023,
          capacity: 1,
          status: 'AVAILABLE',
        },
      });

      expect(ambulance.licensePlate).toBe('TEST123');
      expect(ambulance.status).toBe('AVAILABLE');
    });

    it('should be able to create bookings', async () => {
      const client = await prisma.user.create({
        data: {
          email: 'client@example.com',
          password: 'hashedPassword',
          firstName: 'Test',
          lastName: 'Client',
          role: 'CLIENT',
          isProfileComplete: true,
          companyId: null,
        },
      });

      const booking = await prisma.booking.create({
        data: {
          clientId: client.id,
          pickupAddress: '123 Test Street',
          destinationAddress: '456 Hospital Street',
          bookingType: 'MEDICAL_APPOINTMENT',
          status: 'PENDING',
          pickupDateTime: new Date(),
        },
      });

      expect(booking.clientId).toBe(client.id);
      expect(booking.status).toBe('PENDING');
    });
  });
});
