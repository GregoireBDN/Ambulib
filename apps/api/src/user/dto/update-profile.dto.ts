import { IsString, IsOptional, IsInt, Min, IsArray } from 'class-validator';
import { SpecialRequirements } from '@prisma/client';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @IsInt()
  @Min(0)
  @IsOptional()
  age?: number;

  @IsString()
  @IsOptional()
  notes?: string;

  @IsString()
  @IsOptional()
  medicalCondition?: string;

  @IsArray()
  @IsOptional()
  specialRequirements?: SpecialRequirements[];

  @IsString()
  @IsOptional()
  emergencyContactFirstName?: string;

  @IsString()
  @IsOptional()
  emergencyContactLastName?: string;

  @IsString()
  @IsOptional()
  emergencyContactPhoneNumber?: string;

  @IsString()
  @IsOptional()
  emergencyContactRelationship?: string;
}
