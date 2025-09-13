import { IsOptional, IsEnum, IsDateString, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BookingStatus, BookingType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class BookingFiltersDto {
  @ApiProperty({
    description: 'Filtrer par statut',
    enum: BookingStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @ApiProperty({
    description: 'Filtrer par type de réservation',
    enum: BookingType,
    required: false,
  })
  @IsOptional()
  @IsEnum(BookingType)
  bookingType?: BookingType;

  @ApiProperty({
    description: 'Date de début pour filtrer les réservations',
    example: '2024-01-01T00:00:00Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'Date de fin pour filtrer les réservations',
    example: '2024-12-31T23:59:59Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({
    description: 'Numéro de page',
    example: 1,
    minimum: 1,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value as string, 10))
  @IsInt()
  page?: number = 1;

  @ApiProperty({
    description: "Nombre d'éléments par page",
    example: 10,
    minimum: 1,
    maximum: 100,
    required: false,
  })
  @IsOptional()
  @Transform(({ value }) => parseInt(value as string, 10))
  @IsInt()
  limit?: number = 10;
}
