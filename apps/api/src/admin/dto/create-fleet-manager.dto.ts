import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFleetManagerDto {
  @ApiProperty({
    description: 'Adresse email du gestionnaire de flotte',
    example: 'manager@example.com',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Mot de passe (minimum 8 caractères)',
    example: 'motdepasse123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Prénom',
    example: 'Jean',
  })
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Nom de famille',
    example: 'Dupont',
  })
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Numéro de téléphone',
    example: '+33123456789',
    required: false,
  })
  @IsOptional()
  @IsString()
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
    description: 'Âge (minimum 18 ans)',
    example: 35,
    minimum: 18,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(18)
  age?: number;
}
