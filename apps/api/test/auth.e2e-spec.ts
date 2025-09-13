import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true }),
    );

    prismaService = moduleFixture.get<PrismaService>(PrismaService);

    await app.init();
  });

  afterAll(async () => {
    // Clean up test data
    await prismaService.user.deleteMany({
      where: {
        email: {
          contains: 'test-e2e',
        },
      },
    });

    await app.close();
  });

  describe('/auth/signup (POST)', () => {
    it('should create a new user successfully', async () => {
      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test-e2e-signup@example.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto)
        .expect(201);

      expect(response.body).toMatchObject({
        id: expect.any(Number),
        firstName: 'John',
        lastName: 'Doe',
        role: 'USER',
        isProfileComplete: true,
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should fail with invalid email', async () => {
      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        password: 'password123',
      };

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto)
        .expect(400);
    });

    it('should fail with missing required fields', async () => {
      const createUserDto = {
        firstName: 'John',
        // lastName missing
        email: 'test@example.com',
        password: 'password123',
      };

      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto)
        .expect(400);
    });

    it('should fail with duplicate email', async () => {
      const createUserDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test-e2e-duplicate@example.com',
        password: 'password123',
      };

      // First signup should succeed
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto)
        .expect(201);

      // Second signup with same email should fail
      await request(app.getHttpServer())
        .post('/auth/signup')
        .send(createUserDto)
        .expect(409);
    });
  });

  describe('/auth/signin (POST)', () => {
    beforeAll(async () => {
      // Create a test user for signin tests
      await request(app.getHttpServer()).post('/auth/signup').send({
        firstName: 'Test',
        lastName: 'User',
        email: 'test-e2e-signin@example.com',
        password: 'password123',
      });
    });

    it('should sign in with valid credentials', async () => {
      const signinDto = {
        email: 'test-e2e-signin@example.com',
        password: 'password123',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send(signinDto)
        .expect(200);

      expect(response.body).toMatchObject({
        id: expect.any(Number),
        firstName: 'Test',
        lastName: 'User',
        role: 'USER',
        isProfileComplete: true,
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should fail with invalid email', async () => {
      const signinDto = {
        email: 'nonexistent@example.com',
        password: 'password123',
      };

      await request(app.getHttpServer())
        .post('/auth/signin')
        .send(signinDto)
        .expect(401);
    });

    it('should fail with invalid password', async () => {
      const signinDto = {
        email: 'test-e2e-signin@example.com',
        password: 'wrongpassword',
      };

      await request(app.getHttpServer())
        .post('/auth/signin')
        .send(signinDto)
        .expect(401);
    });
  });

  describe('/auth/refresh (POST)', () => {
    let refreshToken: string;

    beforeAll(async () => {
      // Create a user and get refresh token
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          firstName: 'Refresh',
          lastName: 'User',
          email: 'test-e2e-refresh@example.com',
          password: 'password123',
        });

      refreshToken = response.body.refreshToken;
    });

    it('should refresh tokens with valid refresh token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken })
        .expect(200);

      expect(response.body).toMatchObject({
        id: expect.any(Number),
        firstName: 'Refresh',
        lastName: 'User',
        isProfileComplete: true,
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });

    it('should fail with invalid refresh token', async () => {
      await request(app.getHttpServer())
        .post('/auth/refresh')
        .send({ refreshToken: 'invalid-token' })
        .expect(401);
    });
  });

  describe('/auth/protected (GET)', () => {
    let accessToken: string;

    beforeAll(async () => {
      // Create an admin user for protected endpoint test
      const _user = await prismaService.user.create({
        data: {
          firstName: 'Admin',
          lastName: 'User',
          email: 'test-e2e-admin@example.com',
          password: 'hashedpassword',
          role: 'ADMIN',
          isProfileComplete: true,
          authProvider: 'CREDENTIALS',
        },
      });

      // Sign in to get token
      const _response = await request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          email: 'test-e2e-admin@example.com',
          password: 'password123',
        });

      // This might fail because password is not properly hashed
      // Let's get a token from signup instead
      const signupResponse = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          firstName: 'Admin2',
          lastName: 'User',
          email: 'test-e2e-admin2@example.com',
          password: 'password123',
        });

      accessToken = signupResponse.body.accessToken;

      // Update user role to ADMIN
      await prismaService.user.update({
        where: { email: 'test-e2e-admin2@example.com' },
        data: { role: 'ADMIN' },
      });
    });

    it('should access protected endpoint with valid token and ADMIN role', async () => {
      const response = await request(app.getHttpServer())
        .get('/auth/protected')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);

      expect(response.body).toMatchObject({
        message: expect.stringContaining(
          'Now you can access this protected API',
        ),
      });
    });

    it('should fail without token', async () => {
      await request(app.getHttpServer()).get('/auth/protected').expect(401);
    });

    it('should fail with invalid token', async () => {
      await request(app.getHttpServer())
        .get('/auth/protected')
        .set('Authorization', 'Bearer invalid-token')
        .expect(401);
    });
  });

  describe('/auth/signout (POST)', () => {
    let accessToken: string;

    beforeAll(async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          firstName: 'Signout',
          lastName: 'User',
          email: 'test-e2e-signout@example.com',
          password: 'password123',
        });

      accessToken = response.body.accessToken;
    });

    it('should sign out successfully with valid token', async () => {
      await request(app.getHttpServer())
        .post('/auth/signout')
        .set('Authorization', `Bearer ${accessToken}`)
        .expect(200);
    });

    it('should fail without token', async () => {
      await request(app.getHttpServer()).post('/auth/signout').expect(401);
    });
  });
});
