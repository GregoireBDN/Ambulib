import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';
import { AuthProvider } from '@prisma/client';

export class SignupDto {
  @ApiProperty({
    description: "Prénom de l'utilisateur",
    example: 'Jean',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "Nom de famille de l'utilisateur",
    example: 'Dupont',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: 'jean.dupont@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    example: 'motdepasse123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "Âge de l'utilisateur",
    example: '25',
    required: false,
  })
  @IsOptional()
  @IsString()
  age?: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Adresse postale',
    example: '123 Rue de la Paix',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Ville',
    example: 'Paris',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Code postal',
    example: '75001',
    required: false,
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({
    description: "Fournisseur d'authentification",
    enum: AuthProvider,
    required: false,
  })
  @IsOptional()
  authProvider?: AuthProvider;

  @ApiProperty({
    description: 'Indique si le profil est complet',
    example: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isProfileComplete?: boolean;
}

export class SigninDto {
  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: 'jean.dupont@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    example: 'motdepasse123',
  })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token de rafraîchissement',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken: string;
}

export class CompleteProfileDto {
  @ApiProperty({
    description: "Âge de l'utilisateur",
    example: '25',
    required: false,
  })
  @IsOptional()
  @IsString()
  age?: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Adresse postale',
    example: '123 Rue de la Paix',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({
    description: 'Ville',
    example: 'Paris',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Code postal',
    example: '75001',
    required: false,
  })
  @IsOptional()
  @IsString()
  postalCode?: string;
}

export class AuthResponseDto {
  @ApiProperty({ description: "ID de l'utilisateur" })
  id: number;

  @ApiProperty({ description: "Prénom de l'utilisateur" })
  firstName: string;

  @ApiProperty({ description: "Nom de famille de l'utilisateur" })
  lastName: string;

  @ApiProperty({ description: "Adresse email de l'utilisateur" })
  email: string;

  @ApiProperty({ description: "Rôle de l'utilisateur" })
  role: string;

  @ApiProperty({ description: "Token d'accès JWT" })
  accessToken: string;

  @ApiProperty({ description: 'Token de rafraîchissement' })
  refreshToken: string;

  @ApiProperty({ description: 'Indique si le profil est complet' })
  isProfileComplete: boolean;
}
