import { IsString, IsOptional, IsInt, Min, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SpecialRequirements } from '@prisma/client';

export class UpdateProfileDto {
  @ApiProperty({
    description: 'Prénom',
    example: 'Jean',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiProperty({
    description: 'Nom de famille',
    example: 'Dupont',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33123456789',
    required: false,
  })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'Adresse complète',
    example: '123 rue de la Paix',
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
    description: 'Âge',
    example: 30,
    minimum: 18,
    required: false,
  })
  @IsInt()
  @Min(18)
  @IsOptional()
  age?: number;

  @ApiProperty({
    description: 'Notes personnelles',
    example: 'Informations supplémentaires',
    required: false,
  })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiProperty({
    description: 'Conditions médicales',
    example: 'Diabète, Hypertension',
    required: false,
  })
  @IsString()
  @IsOptional()
  medicalCondition?: string;

  @ApiProperty({
    description: 'Besoins spéciaux pour le transport',
    enum: SpecialRequirements,
    isArray: true,
    required: false,
  })
  @IsArray()
  @IsOptional()
  specialRequirements?: SpecialRequirements[];

  @ApiProperty({
    description: "Prénom du contact d'urgence",
    example: 'Marie',
    required: false,
  })
  @IsString()
  @IsOptional()
  emergencyContactFirstName?: string;

  @ApiProperty({
    description: "Nom du contact d'urgence",
    example: 'Dupont',
    required: false,
  })
  @IsString()
  @IsOptional()
  emergencyContactLastName?: string;

  @ApiProperty({
    description: "Téléphone du contact d'urgence",
    example: '+33987654321',
    required: false,
  })
  @IsString()
  @IsOptional()
  emergencyContactPhoneNumber?: string;

  @ApiProperty({
    description: "Relation avec le contact d'urgence",
    example: 'Épouse',
    required: false,
  })
  @IsString()
  @IsOptional()
  emergencyContactRelationship?: string;
}
