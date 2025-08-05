import {
  IsEmail,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAmbulanceDriverDto {
  @ApiProperty({
    description: "Adresse email de l'ambulancier",
    example: 'driver@example.com',
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

  @ApiProperty({ description: 'Prénom', example: 'Marie' })
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'Nom de famille', example: 'Martin' })
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
    example: '456 avenue des Ambulances',
    required: false,
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiProperty({ description: 'Ville', example: 'Lyon', required: false })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Code postal',
    example: '69000',
    required: false,
  })
  @IsOptional()
  @IsString()
  postalCode?: string;

  @ApiProperty({
    description: 'Âge (minimum 18 ans)',
    example: 28,
    minimum: 18,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(18)
  age?: number;
}
