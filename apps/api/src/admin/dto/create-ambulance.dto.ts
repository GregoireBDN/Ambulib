import { IsString, IsInt, Min, Max, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AmbulanceStatus } from '@prisma/client';

export class CreateAmbulanceDto {
  @ApiProperty({
    description: "Plaque d'immatriculation de l'ambulance",
    example: 'AMB-001',
  })
  @IsString()
  licensePlate: string;

  @ApiProperty({
    description: 'Modèle du véhicule',
    example: 'Mercedes Sprinter',
  })
  @IsString()
  vehicleModel: string;

  @ApiProperty({
    description: 'Année du véhicule',
    example: 2023,
    minimum: 1900,
    maximum: new Date().getFullYear() + 1,
  })
  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear() + 1)
  vehicleYear: number;

  @ApiProperty({
    description: 'Capacité de transport (nombre de patients)',
    example: 2,
    minimum: 1,
    maximum: 10,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  capacity: number;

  @ApiProperty({
    description: "Statut de l'ambulance",
    enum: AmbulanceStatus,
    example: 'AVAILABLE',
    required: false,
  })
  @IsOptional()
  @IsEnum(AmbulanceStatus)
  status?: AmbulanceStatus;

  @ApiProperty({
    description: "ID de l'ambulancier assigné",
    example: 2,
    required: false,
  })
  @IsOptional()
  @IsInt()
  driverId?: number;

  @ApiProperty({
    description: 'Kilométrage actuel',
    example: 50000,
    minimum: 0,
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  mileage?: number;

  @ApiProperty({
    description: "Notes ou commentaires sur l'ambulance",
    example: "Équipée d'un défibrillateur",
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
