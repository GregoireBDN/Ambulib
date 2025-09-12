import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { BookingModule } from './booking/booking.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    UserModule,
    AdminModule,
    BookingModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host:
            process.env.NODE_ENV === 'production'
              ? process.env.SMTP_HOST
              : 'localhost',
          port:
            process.env.NODE_ENV === 'production'
              ? parseInt(process.env.SMTP_PORT || '587')
              : 1025,
          ignoreTLS: process.env.NODE_ENV !== 'production',
          secure: process.env.NODE_ENV === 'production',
          auth:
            process.env.NODE_ENV === 'production'
              ? {
                  user: process.env.SMTP_USER,
                  pass: process.env.SMTP_PASS,
                }
              : undefined,
        },
        defaults: {
          from: '"HavRid" <noreply@havrid.fr>',
        },
        preview: process.env.NODE_ENV !== 'production',
        template: {
          dir: join(__dirname, '../templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
