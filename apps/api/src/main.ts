import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration CORS pour permettre l'accès depuis l'app mobile
  app.enableCors({
    origin: true, // Permet toutes les origines en développement
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('Ambulib API')
    .setDescription(
      "API pour l'application Ambulib - Gestion des ambulances et des interventions",
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez votre token JWT',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('auth', "Endpoints d'authentification")
    .addTag('users', 'Gestion du profil utilisateur')
    .addTag(
      'admin',
      'Administration système - Gestion des utilisateurs et de la flotte',
    )
    .addTag('health', "Vérification de l'état de l'API")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3001);
  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3001}`,
  );
  console.log(
    `📚 Swagger documentation available at: http://localhost:${process.env.PORT ?? 3001}/api/docs`,
  );
}
void bootstrap();
