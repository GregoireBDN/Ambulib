import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { AuthProvider } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  age?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  authProvider?: AuthProvider;

  @IsOptional()
  @IsBoolean()
  isProfileComplete?: boolean;
}
