import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional } from 'class-validator';
import { CompanyStatus } from '@prisma/client';

export class CompanyRegistrationDto {
  @ApiProperty({
    description: "Nom de l'entreprise",
    example: 'Ambulances Paris',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: "Email de contact de l'entreprise",
    example: 'contact@ambulances-paris.fr',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({
    description: "Adresse de l'entreprise",
    example: '123 Avenue des Champs-Élysées',
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
    example: '75008',
    required: false,
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({
    description: "Numéro de licence d'ambulance",
    example: 'AMB-75-2024-001',
    required: false,
  })
  @IsOptional()
  @IsString()
  licenseNumber?: string;

  @ApiProperty({
    description: 'Notes supplémentaires',
    example: "Demande d'inscription pour services d'ambulance privée",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: "Informations de l'administrateur de l'entreprise",
  })
  adminUser: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber?: string;
  };
}

export class CompanyAdminDto {
  @ApiProperty({
    description: "Prénom de l'administrateur",
    example: 'Marie',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: "Nom de famille de l'administrateur",
    example: 'Martin',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: "Email de l'administrateur",
    example: 'marie.martin@ambulances-paris.fr',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: "Mot de passe de l'administrateur",
    example: 'MotDePasseSecurise123!',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class CompanyApprovalDto {
  @ApiProperty({
    description: "ID de l'entreprise",
    example: 1,
  })
  companyId: number;

  @ApiProperty({
    description: "Statut de l'entreprise",
    enum: CompanyStatus,
    example: CompanyStatus.APPROVED,
  })
  status: CompanyStatus;

  @ApiProperty({
    description: "Notes d'approbation",
    example: 'Entreprise approuvée après vérification des documents',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CompanyResponseDto {
  @ApiProperty({ description: "ID de l'entreprise" })
  id: number;

  @ApiProperty({ description: "Nom de l'entreprise" })
  name: string;

  @ApiProperty({ description: "Email de l'entreprise" })
  email: string;

  @ApiProperty({ description: "Statut de l'entreprise" })
  status: CompanyStatus;

  @ApiProperty({ description: "Date d'inscription" })
  registrationDate: Date;

  @ApiProperty({ description: "Date d'approbation", required: false })
  approvedAt?: Date;

  @ApiProperty({ description: 'Numéro de licence', required: false })
  licenseNumber?: string;
}
