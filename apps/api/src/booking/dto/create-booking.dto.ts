import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsDateString,
  IsArray,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingType, SpecialRequirements } from '@prisma/client';

export class CreateBookingDto {
  @ApiProperty({
    description:
      "ID du dépendant (optionnel, pour réserver pour quelqu'un d'autre)",
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  dependentId?: number;

  @ApiProperty({
    description: 'Adresse de prise en charge',
    example: '123 rue de la Santé, Paris',
  })
  @IsString()
  @MinLength(5)
  pickupAddress: string;

  @ApiProperty({
    description: 'Adresse de destination',
    example: 'Hôpital Saint-Louis, 1 Avenue Claude Vellefaux, Paris',
  })
  @IsString()
  @MinLength(5)
  destinationAddress: string;

  @ApiProperty({
    description: 'Ville de prise en charge',
    example: 'Paris',
  })
  @IsString()
  pickupCity: string;

  @ApiProperty({
    description: 'Ville de destination',
    example: 'Paris',
  })
  @IsString()
  destinationCity: string;

  @ApiProperty({
    description: 'Code postal de prise en charge',
    example: '75010',
    required: false,
  })
  @IsOptional()
  @IsString()
  pickupPostalCode?: string;

  @ApiProperty({
    description: 'Code postal de destination',
    example: '75010',
    required: false,
  })
  @IsOptional()
  @IsString()
  destinationPostalCode?: string;

  @ApiProperty({
    description:
      'Date et heure prévues (requis pour les réservations programmées)',
    example: '2024-12-25T14:30:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  scheduledDateTime?: string;

  @ApiProperty({
    description: 'Type de réservation',
    enum: BookingType,
    example: BookingType.SCHEDULED,
  })
  @IsEnum(BookingType)
  bookingType: BookingType;

  @ApiProperty({
    description: 'Besoins spéciaux pour le transport',
    enum: SpecialRequirements,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(SpecialRequirements, { each: true })
  specialRequirements?: SpecialRequirements[];

  @ApiProperty({
    description: 'Notes supplémentaires',
    example: "Patient avec mobilité réduite, besoin d'assistance",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Durée estimée en minutes',
    example: 60,
    required: false,
  })
  @IsOptional()
  @IsInt()
  estimatedDuration?: number;
}
