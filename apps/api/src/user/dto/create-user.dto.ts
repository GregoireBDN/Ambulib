import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  Matches,
  MinLength,
} from 'class-validator';
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
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @Matches(/[a-zA-Z]/, {
    message: 'Le mot de passe doit contenir au moins une lettre',
  })
  @Matches(/\d/, {
    message: 'Le mot de passe doit contenir au moins un chiffre',
  })
  @Matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
    message:
      'Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)',
  })
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

  @IsOptional()
  @IsNumber()
  companyId?: number;

  // Nouveaux champs du FormStepper
  @IsOptional()
  @IsString()
  birthDate?: string;

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
  mobility?: string;

  @IsOptional()
  @IsString()
  mobilityDetails?: string;

  @IsOptional()
  @IsString()
  doctorName?: string;

  @IsOptional()
  @IsString()
  doctorPhone?: string;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @IsOptional()
  @IsString()
  emergencyContactRelation?: string;
}
