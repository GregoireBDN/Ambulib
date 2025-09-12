import {
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// DTO pour les données sensibles médicales uniquement
export class EmergencyContactDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  phone: string;

  @IsString()
  relation: string;
}

export class SensitiveFormDataDto {
  @IsOptional()
  @IsString()
  socialSecurity?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsOptional()
  @IsString()
  medications?: string;

  @IsOptional()
  @IsString()
  mobility?: 'none' | 'wheelchair' | 'walker' | 'cane' | 'other';

  @IsOptional()
  @IsString()
  mobilityDetails?: string;

  @IsOptional()
  @IsString()
  doctorName?: string;

  @IsOptional()
  @IsString()
  doctorPhone?: string;

  @ValidateNested()
  @Type(() => EmergencyContactDto)
  @IsObject()
  emergencyContact: EmergencyContactDto;
}

export class SaveFormDraftDto {
  @ValidateNested()
  @Type(() => SensitiveFormDataDto)
  @IsObject()
  sensitiveData: SensitiveFormDataDto;
}

export class FormDraftResponseDto {
  success: boolean;
  draftId?: string;
  expiresAt?: Date;
  message?: string;
}
