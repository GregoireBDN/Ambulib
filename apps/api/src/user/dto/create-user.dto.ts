import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
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
}
