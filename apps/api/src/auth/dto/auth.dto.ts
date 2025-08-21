import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { AuthProvider, Role } from '@prisma/client';

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
    example: 'TestPassword123!',
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

  // Nouveaux champs du FormStepper pour l'inscription enrichie
  @ApiProperty({
    description: 'Date de naissance',
    example: '1990-05-15',
    required: false,
  })
  @IsOptional()
  @IsString()
  birthDate?: string;

  @ApiProperty({
    description: 'Numéro de sécurité sociale',
    example: '123456789012345',
    required: false,
  })
  @IsOptional()
  @IsString()
  socialSecurity?: string;

  @ApiProperty({
    description: 'Allergies connues',
    example: 'Pénicilline, Latex',
    required: false,
  })
  @IsOptional()
  @IsString()
  allergies?: string;

  @ApiProperty({
    description: 'Médicaments actuels',
    example: 'Doliprane 1000mg matin et soir',
    required: false,
  })
  @IsOptional()
  @IsString()
  medications?: string;

  @ApiProperty({
    description: 'Type de mobilité',
    example: 'wheelchair',
    required: false,
  })
  @IsOptional()
  @IsString()
  mobility?: string;

  @ApiProperty({
    description: 'Détails de mobilité',
    example: 'Fauteuil roulant électrique',
    required: false,
  })
  @IsOptional()
  @IsString()
  mobilityDetails?: string;

  @ApiProperty({
    description: 'Nom du médecin traitant',
    example: 'Dr. Martin Dupont',
    required: false,
  })
  @IsOptional()
  @IsString()
  doctorName?: string;

  @ApiProperty({
    description: 'Téléphone du médecin traitant',
    example: '0123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  doctorPhone?: string;

  @ApiProperty({
    description: 'Nom complet du contact d\'urgence',
    example: 'Marie Dubois',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @ApiProperty({
    description: 'Téléphone du contact d\'urgence',
    example: '0123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @ApiProperty({
    description: 'Relation avec le contact d\'urgence',
    example: 'Conjoint(e)',
    required: false,
  })
  @IsOptional()
  @IsString()
  emergencyContactRelation?: string;
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
    example: 'TestPassword123!',
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

export class CreateCompanyUserDto {
  @ApiProperty({
    description: "Prénom de l'utilisateur",
    example: 'Pierre',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "Nom de famille de l'utilisateur",
    example: 'Dubois',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "Adresse email de l'utilisateur",
    example: 'pierre.dubois@ambulances-paris.fr',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Mot de passe de l'utilisateur",
    example: 'TestPassword123!',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: "Rôle de l'utilisateur dans l'entreprise",
    enum: Role,
    example: Role.AMBULANCE_DRIVER,
  })
  role: Role;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
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

  @ApiProperty({ description: "ID de l'entreprise", required: false })
  companyId?: number;

  @ApiProperty({ description: "Token d'accès JWT" })
  accessToken: string;

  @ApiProperty({ description: 'Token de rafraîchissement' })
  refreshToken: string;

  @ApiProperty({ description: 'Indique si le profil est complet' })
  isProfileComplete: boolean;
}
