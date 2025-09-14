import {
  IsEmail,
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

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
  @IsInt()
  @Min(18)
  age?: number;

  @IsOptional()
  @IsEnum([
    'CLIENT',
    'ADMIN',
    'FLEET_MANAGER',
    'AMBULANCE_DRIVER',
    'SUPER_ADMIN',
  ])
  role?: Role;

  @IsOptional()
  @IsBoolean()
  isProfileComplete?: boolean;
}
