import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { BookingModule } from '../src/booking/booking.module';
import { AuthModule } from '../src/auth/auth.module';
import { UserModule } from '../src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import {
  Role,
  BookingStatus,
  BookingType,
  SpecialRequirements,
} from '@prisma/client';
import { hash } from 'argon2';

describe('BookingController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  let clientUser: any;
  let adminUser: any;
  let driverUser: any;
  let fleetManagerUser: any;

  let clientToken: string;
  let adminToken: string;
  let _driverToken: string;
  let _fleetManagerToken: string;

  let testBooking: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        BookingModule,
        AuthModule,
        UserModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    prismaService = moduleFixture.get<PrismaService>(PrismaService);
    jwtService = moduleFixture.get<JwtService>(JwtService);

    await app.init();

    // Clean up database
    await prismaService.booking.deleteMany();
    await prismaService.user.deleteMany();

    // Create test users
    const hashedPassword = await hash('testPassword123');

    clientUser = await prismaService.user.create({
      data: {
        email: 'client@test.com',
        firstName: 'John',
        lastName: 'Client',
        password: hashedPassword,
        role: Role.CLIENT,
        authProvider: 'CREDENTIALS',
        isProfileComplete: true,
        phoneNumber: '+33123456789',
      },
    });

    adminUser = await prismaService.user.create({
      data: {
        email: 'admin@test.com',
        firstName: 'Admin',
        lastName: 'User',
        password: hashedPassword,
        role: Role.ADMIN,
        authProvider: 'CREDENTIALS',
        isProfileComplete: true,
        phoneNumber: '+33987654321',
      },
    });

    driverUser = await prismaService.user.create({
      data: {
        email: 'driver@test.com',
        firstName: 'Driver',
        lastName: 'User',
        password: hashedPassword,
        role: Role.AMBULANCE_DRIVER,
        authProvider: 'CREDENTIALS',
        isProfileComplete: true,
        phoneNumber: '+33555666777',
      },
    });

    fleetManagerUser = await prismaService.user.create({
      data: {
        email: 'fleet@test.com',
        firstName: 'Fleet',
        lastName: 'Manager',
        password: hashedPassword,
        role: Role.FLEET_MANAGER,
        authProvider: 'CREDENTIALS',
        isProfileComplete: true,
        phoneNumber: '+33444555666',
      },
    });

    // Generate JWT tokens
    clientToken = jwtService.sign({ sub: clientUser.id });
    adminToken = jwtService.sign({ sub: adminUser.id });
    _driverToken = jwtService.sign({ sub: driverUser.id });
    _fleetManagerToken = jwtService.sign({ sub: fleetManagerUser.id });
  });

  afterAll(async () => {
    // Clean up
    await prismaService.booking.deleteMany();
    await prismaService.user.deleteMany();
    await app.close();
  });

  afterEach(async () => {
    // Clean up bookings after each test
    await prismaService.booking.deleteMany();
  });

  describe('POST /bookings', () => {
    const validBookingDto = {
      pickupAddress: '123 rue de la Santé, Paris',
      destinationAddress:
        'Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, Paris',
      pickupPostalCode: '75014',
      destinationPostalCode: '75010',
      pickupDateTime: '2024-12-25T14:00:00.000Z',
      appointmentDateTime: '2024-12-25T14:30:00.000Z',
      bookingType: BookingType.MEDICAL_APPOINTMENT,
      specialRequirements: [SpecialRequirements.NEEDS_OXYGEN],
      notes: 'Patient avec mobilité réduite',
      estimatedDuration: 60,
    };

    it('should create a booking as client', () => {
      return request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(validBookingDto)
        .expect(201)
        .then((response) => {
          expect(response.body).toMatchObject({
            id: expect.any(Number),
            clientId: clientUser.id,
            pickupAddress: validBookingDto.pickupAddress,
            destinationAddress: validBookingDto.destinationAddress,
            bookingType: BookingType.MEDICAL_APPOINTMENT,
            status: BookingStatus.PENDING,
          });
          testBooking = response.body;
        });
    });

    it('should create emergency booking without scheduled date', () => {
      const emergencyDto = {
        ...validBookingDto,
        bookingType: BookingType.EMERGENCY,
        appointmentDateTime: undefined,
      };

      return request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(emergencyDto)
        .expect(201)
        .then((response) => {
          expect(response.body.bookingType).toBe(BookingType.EMERGENCY);
          expect(response.body.scheduledDateTime).toBeNull();
        });
    });

    it('should reject booking creation by non-client', () => {
      return request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(validBookingDto)
        .expect(403);
    });

    it('should reject booking without required fields', () => {
      const invalidDto = {
        pickupAddress: '123 rue',
        // Missing required fields
      };

      return request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(invalidDto)
        .expect(400);
    });

    it('should reject scheduled booking without date', () => {
      const invalidDto = {
        ...validBookingDto,
        appointmentDateTime: undefined,
      };

      return request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(invalidDto)
        .expect(400);
    });

    it('should reject emergency booking with scheduled date', () => {
      const invalidDto = {
        ...validBookingDto,
        bookingType: BookingType.EMERGENCY,
      };

      return request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(invalidDto)
        .expect(400);
    });

    it('should reject booking with past date', () => {
      const pastDateDto = {
        ...validBookingDto,
        appointmentDateTime: '2023-01-01T10:00:00.000Z',
      };

      return request(app.getHttpServer())
        .post('/bookings')
        .set('Authorization', `Bearer ${clientToken}`)
        .send(pastDateDto)
        .expect(400);
    });

    it('should reject unauthenticated requests', () => {
      return request(app.getHttpServer())
        .post('/bookings')
        .send(validBookingDto)
        .expect(401);
    });
  });

  describe('GET /bookings', () => {
    beforeEach(async () => {
      // Create test bookings
      testBooking = await prismaService.booking.create({
        data: {
          clientId: clientUser.id,
          pickupAddress: '123 rue de la Santé',
          destinationAddress: 'Hôpital Saint-Louis',
          bookingType: BookingType.MEDICAL_APPOINTMENT,
          status: BookingStatus.PENDING,
          pickupDateTime: new Date('2024-12-25T14:00:00Z'),
          appointmentDateTime: new Date('2024-12-25T14:30:00Z'),
        },
      });

      // Create another booking for different client
      await prismaService.booking.create({
        data: {
          clientId: adminUser.id,
          pickupAddress: '456 rue de la Paix',
          destinationAddress: 'Hôpital Central',
          bookingType: BookingType.EMERGENCY,
          status: BookingStatus.CONFIRMED,
          pickupDateTime: new Date(),
        },
      });
    });

    it('should get client bookings', () => {
      return request(app.getHttpServer())
        .get('/bookings')
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toHaveLength(1);
          expect(response.body.data[0].clientId).toBe(clientUser.id);
          expect(response.body.meta).toMatchObject({
            total: 1,
            page: 1,
            limit: 10,
            totalPages: 1,
          });
        });
    });

    it('should get all bookings as admin', () => {
      return request(app.getHttpServer())
        .get('/bookings')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toHaveLength(2);
          expect(response.body.meta.total).toBe(2);
        });
    });

    it('should filter bookings by status', () => {
      return request(app.getHttpServer())
        .get('/bookings?status=PENDING')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toHaveLength(1);
          expect(response.body.data[0].status).toBe(BookingStatus.PENDING);
        });
    });

    it('should filter bookings by type', () => {
      return request(app.getHttpServer())
        .get('/bookings?bookingType=EMERGENCY')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toHaveLength(1);
          expect(response.body.data[0].bookingType).toBe(BookingType.EMERGENCY);
        });
    });

    it('should paginate results', () => {
      return request(app.getHttpServer())
        .get('/bookings?page=1&limit=1')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.data).toHaveLength(1);
          expect(response.body.meta).toMatchObject({
            page: 1,
            limit: 1,
            totalPages: 2,
          });
        });
    });

    it('should reject unauthenticated requests', () => {
      return request(app.getHttpServer()).get('/bookings').expect(401);
    });
  });

  describe('GET /bookings/stats', () => {
    beforeEach(async () => {
      // Create test bookings with different statuses
      await prismaService.booking.createMany({
        data: [
          {
            clientId: clientUser.id,
            pickupAddress: '123 rue A',
            destinationAddress: 'Hôpital A',
            bookingType: BookingType.MEDICAL_APPOINTMENT,
            status: BookingStatus.PENDING,
            pickupDateTime: new Date(),
          },
          {
            clientId: clientUser.id,
            pickupAddress: '456 rue B',
            destinationAddress: 'Hôpital B',
            bookingType: BookingType.EMERGENCY,
            status: BookingStatus.CONFIRMED,
            pickupDateTime: new Date(),
          },
          {
            clientId: clientUser.id,
            pickupAddress: '789 rue C',
            destinationAddress: 'Hôpital C',
            bookingType: BookingType.MEDICAL_APPOINTMENT,
            status: BookingStatus.COMPLETED,
            pickupDateTime: new Date(),
          },
        ],
      });
    });

    it('should get booking statistics for client', () => {
      return request(app.getHttpServer())
        .get('/bookings/stats')
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body).toMatchObject({
            total: 3,
            byStatus: {
              pending: 1,
              confirmed: 1,
              inProgress: 0,
              completed: 1,
              cancelled: 0,
            },
            byType: {
              emergency: 1,
              scheduled: 2,
            },
          });
        });
    });

    it('should get booking statistics for admin', () => {
      return request(app.getHttpServer())
        .get('/bookings/stats')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.total).toBe(3);
          expect(response.body.byStatus).toBeDefined();
          expect(response.body.byType).toBeDefined();
        });
    });

    it('should reject unauthenticated requests', () => {
      return request(app.getHttpServer()).get('/bookings/stats').expect(401);
    });
  });

  describe('GET /bookings/:id', () => {
    beforeEach(async () => {
      testBooking = await prismaService.booking.create({
        data: {
          clientId: clientUser.id,
          pickupAddress: '123 rue de la Santé',
          destinationAddress: 'Hôpital Saint-Louis',
          bookingType: BookingType.MEDICAL_APPOINTMENT,
          status: BookingStatus.PENDING,
          pickupDateTime: new Date(),
        },
      });
    });

    it('should get booking by id as owner', () => {
      return request(app.getHttpServer())
        .get(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(testBooking.id);
          expect(response.body.clientId).toBe(clientUser.id);
        });
    });

    it('should get booking by id as admin', () => {
      return request(app.getHttpServer())
        .get(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.id).toBe(testBooking.id);
        });
    });

    it('should reject access to other client booking', () => {
      // Create booking for admin user
      return prismaService.booking
        .create({
          data: {
            clientId: adminUser.id,
            pickupAddress: '456 rue',
            destinationAddress: 'Hôpital',
            bookingType: BookingType.EMERGENCY,
            pickupDateTime: new Date(),
          },
        })
        .then((otherBooking) => {
          return request(app.getHttpServer())
            .get(`/bookings/${otherBooking.id}`)
            .set('Authorization', `Bearer ${clientToken}`)
            .expect(403);
        });
    });

    it('should return 404 for non-existent booking', () => {
      return request(app.getHttpServer())
        .get('/bookings/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });

    it('should reject invalid id format', () => {
      return request(app.getHttpServer())
        .get('/bookings/invalid-id')
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(400);
    });
  });

  describe('PATCH /bookings/:id', () => {
    beforeEach(async () => {
      testBooking = await prismaService.booking.create({
        data: {
          clientId: clientUser.id,
          pickupAddress: '123 rue de la Santé',
          destinationAddress: 'Hôpital Saint-Louis',
          bookingType: BookingType.MEDICAL_APPOINTMENT,
          status: BookingStatus.PENDING,
          pickupDateTime: new Date('2024-12-25T14:00:00Z'),
          appointmentDateTime: new Date('2024-12-25T14:30:00Z'),
        },
      });
    });

    it('should update booking as client', () => {
      const updateDto = {
        notes: 'Updated notes by client',
        estimatedDuration: 90,
      };

      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send(updateDto)
        .expect(200)
        .then((response) => {
          expect(response.body.notes).toBe(updateDto.notes);
          expect(response.body.estimatedDuration).toBe(
            updateDto.estimatedDuration,
          );
        });
    });

    it('should update booking status as admin', () => {
      const updateDto = {
        status: BookingStatus.CONFIRMED,
      };

      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateDto)
        .expect(200)
        .then((response) => {
          expect(response.body.status).toBe(BookingStatus.CONFIRMED);
        });
    });

    it('should reject status update by client (except cancellation)', () => {
      const updateDto = {
        status: BookingStatus.CONFIRMED,
      };

      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send(updateDto)
        .expect(403);
    });

    it('should allow client to cancel booking', () => {
      const updateDto = {
        status: BookingStatus.CANCELLED,
      };

      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .send(updateDto)
        .expect(200)
        .then((response) => {
          expect(response.body.status).toBe(BookingStatus.CANCELLED);
        });
    });

    it('should reject update of completed booking', async () => {
      // Update booking to completed first
      await prismaService.booking.update({
        where: { id: testBooking.id },
        data: { status: BookingStatus.COMPLETED },
      });

      const updateDto = {
        notes: 'Trying to update completed booking',
      };

      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateDto)
        .expect(400);
    });

    it('should reject past date updates', () => {
      const updateDto = {
        appointmentDateTime: '2023-01-01T10:00:00.000Z',
      };

      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateDto)
        .expect(400);
    });
  });

  describe('PATCH /bookings/:id/cancel', () => {
    beforeEach(async () => {
      testBooking = await prismaService.booking.create({
        data: {
          clientId: clientUser.id,
          pickupAddress: '123 rue de la Santé',
          destinationAddress: 'Hôpital Saint-Louis',
          bookingType: BookingType.MEDICAL_APPOINTMENT,
          status: BookingStatus.PENDING,
          pickupDateTime: new Date(),
        },
      });
    });

    it('should cancel booking as client', () => {
      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}/cancel`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.status).toBe(BookingStatus.CANCELLED);
        });
    });

    it('should cancel booking as admin', () => {
      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}/cancel`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200)
        .then((response) => {
          expect(response.body.status).toBe(BookingStatus.CANCELLED);
        });
    });

    it('should reject cancellation by unauthorized user', async () => {
      // Create another client
      const otherClient = await prismaService.user.create({
        data: {
          email: 'other@test.com',
          firstName: 'Other',
          lastName: 'Client',
          password: await hash('password'),
          role: Role.CLIENT,
          authProvider: 'CREDENTIALS',
          isProfileComplete: true,
        },
      });

      const otherToken = jwtService.sign({ sub: otherClient.id });

      return request(app.getHttpServer())
        .patch(`/bookings/${testBooking.id}/cancel`)
        .set('Authorization', `Bearer ${otherToken}`)
        .expect(403);
    });
  });

  describe('DELETE /bookings/:id', () => {
    beforeEach(async () => {
      testBooking = await prismaService.booking.create({
        data: {
          clientId: clientUser.id,
          pickupAddress: '123 rue de la Santé',
          destinationAddress: 'Hôpital Saint-Louis',
          bookingType: BookingType.MEDICAL_APPOINTMENT,
          status: BookingStatus.CANCELLED,
          pickupDateTime: new Date(),
        },
      });
    });

    it('should delete booking as admin', () => {
      return request(app.getHttpServer())
        .delete(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(204);
    });

    it('should reject deletion by non-admin', () => {
      return request(app.getHttpServer())
        .delete(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${clientToken}`)
        .expect(403);
    });

    it('should reject deletion of in-progress booking', async () => {
      // Update booking to in-progress
      await prismaService.booking.update({
        where: { id: testBooking.id },
        data: { status: BookingStatus.IN_PROGRESS },
      });

      return request(app.getHttpServer())
        .delete(`/bookings/${testBooking.id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(400);
    });

    it('should return 404 for non-existent booking', () => {
      return request(app.getHttpServer())
        .delete('/bookings/999999')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });
});
