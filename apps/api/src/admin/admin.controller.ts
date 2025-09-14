import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateFleetManagerDto } from './dto/create-fleet-manager.dto';
import { CreateAmbulanceDriverDto } from './dto/create-ambulance-driver.dto';
import { CreateAmbulanceDto } from './dto/create-ambulance.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('fleet-managers')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer un gestionnaire de flotte',
    description:
      'Permet aux administrateurs de créer un nouveau compte gestionnaire de flotte',
  })
  @ApiBody({
    type: CreateFleetManagerDto,
    description: 'Informations du gestionnaire de flotte à créer',
  })
  @ApiCreatedResponse({
    description: 'Gestionnaire de flotte créé avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        email: { type: 'string', example: 'manager@example.com' },
        firstName: { type: 'string', example: 'Jean' },
        lastName: { type: 'string', example: 'Dupont' },
        role: { type: 'string', example: 'FLEET_MANAGER' },
        isProfileComplete: { type: 'boolean', example: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'Un utilisateur avec cet email existe déjà',
  })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  createFleetManager(@Body() dto: CreateFleetManagerDto) {
    return this.adminService.createFleetManager(dto);
  }

  @Post('ambulance-drivers')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer un ambulancier',
    description:
      'Permet aux administrateurs de créer un nouveau compte ambulancier',
  })
  @ApiBody({
    type: CreateAmbulanceDriverDto,
    description: "Informations de l'ambulancier à créer",
  })
  @ApiCreatedResponse({
    description: 'Ambulancier créé avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 2 },
        email: { type: 'string', example: 'driver@example.com' },
        firstName: { type: 'string', example: 'Marie' },
        lastName: { type: 'string', example: 'Martin' },
        role: { type: 'string', example: 'AMBULANCE_DRIVER' },
        isProfileComplete: { type: 'boolean', example: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiConflictResponse({
    description: 'Un utilisateur avec cet email existe déjà',
  })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  createAmbulanceDriver(@Body() dto: CreateAmbulanceDriverDto) {
    return this.adminService.createAmbulanceDriver(dto);
  }

  @Post('ambulances')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Créer une ambulance',
    description:
      "Permet aux administrateurs d'ajouter une nouvelle ambulance à la flotte",
  })
  @ApiBody({
    type: CreateAmbulanceDto,
    description: "Informations de l'ambulance à créer",
  })
  @ApiCreatedResponse({
    description: 'Ambulance créée avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        licensePlate: { type: 'string', example: 'AMB-001' },
        vehicleModel: { type: 'string', example: 'Mercedes Sprinter' },
        vehicleYear: { type: 'number', example: 2023 },
        capacity: { type: 'number', example: 2 },
        status: {
          type: 'string',
          example: 'AVAILABLE',
          enum: ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE'],
        },
        driverId: { type: 'number', example: 2, nullable: true },
        driver: {
          type: 'object',
          nullable: true,
          properties: {
            id: { type: 'number', example: 2 },
            firstName: { type: 'string', example: 'Marie' },
            lastName: { type: 'string', example: 'Martin' },
            email: { type: 'string', example: 'driver@example.com' },
          },
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiConflictResponse({
    description:
      "Une ambulance avec cette plaque d'immatriculation existe déjà",
  })
  @ApiNotFoundResponse({
    description: 'Ambulancier introuvable (si driverId fourni)',
  })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  createAmbulance(@Body() dto: CreateAmbulanceDto) {
    return this.adminService.createAmbulance(dto);
  }

  @Get('users')
  @ApiOperation({
    summary: 'Lister tous les utilisateurs',
    description:
      'Récupère la liste paginée de tous les utilisateurs avec filtrage optionnel par rôle',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: 'number',
    example: 1,
    description: 'Numéro de page (défaut: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    example: 10,
    description: "Nombre d'éléments par page (défaut: 10)",
  })
  @ApiQuery({
    name: 'role',
    required: false,
    enum: [
      'CLIENT',
      'FLEET_MANAGER',
      'AMBULANCE_DRIVER',
      'ADMIN',
      'SUPER_ADMIN',
    ],
    description: 'Filtrer par rôle spécifique',
  })
  @ApiOkResponse({
    description: 'Liste des utilisateurs récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        users: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              email: { type: 'string', example: 'user@example.com' },
              firstName: { type: 'string', example: 'Jean' },
              lastName: { type: 'string', example: 'Dupont' },
              role: {
                type: 'string',
                example: 'CLIENT',
                enum: [
                  'CLIENT',
                  'FLEET_MANAGER',
                  'AMBULANCE_DRIVER',
                  'ADMIN',
                  'SUPER_ADMIN',
                ],
              },
              phoneNumber: {
                type: 'string',
                example: '+33123456789',
                nullable: true,
              },
              city: { type: 'string', example: 'Paris', nullable: true },
              isProfileComplete: { type: 'boolean', example: true },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        total: {
          type: 'number',
          example: 50,
          description: "Nombre total d'utilisateurs",
        },
        page: { type: 'number', example: 1, description: 'Page actuelle' },
        totalPages: {
          type: 'number',
          example: 5,
          description: 'Nombre total de pages',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  getAllUsers(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('role') role?: Role,
  ) {
    return this.adminService.getAllUsers(parseInt(page), parseInt(limit), role);
  }

  @Get('users/:id')
  @ApiOperation({
    summary: 'Récupérer un utilisateur par ID',
    description: "Récupère les détails complets d'un utilisateur spécifique",
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: "ID de l'utilisateur",
  })
  @ApiOkResponse({
    description: 'Utilisateur trouvé avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        email: { type: 'string', example: 'user@example.com' },
        firstName: { type: 'string', example: 'Jean' },
        lastName: { type: 'string', example: 'Dupont' },
        role: { type: 'string', example: 'CLIENT' },
        phoneNumber: {
          type: 'string',
          example: '+33123456789',
          nullable: true,
        },
        address: {
          type: 'string',
          example: '123 rue de la Paix',
          nullable: true,
        },
        city: { type: 'string', example: 'Paris', nullable: true },
        postalCode: { type: 'string', example: '75001', nullable: true },
        age: { type: 'number', example: 30, nullable: true },
        isProfileComplete: { type: 'boolean', example: true },
        emergencyContact: {
          type: 'object',
          nullable: true,
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phoneNumber: { type: 'string' },
            relationship: { type: 'string' },
          },
        },
        dependent: { type: 'array', items: { type: 'object' } },
        bookings: {
          type: 'array',
          description: '5 dernières réservations',
          items: { type: 'object' },
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Utilisateur introuvable' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getUserById(id);
  }

  @Put('users/:id')
  @ApiOperation({
    summary: 'Mettre à jour un utilisateur',
    description: "Met à jour les informations d'un utilisateur existant",
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: "ID de l'utilisateur",
  })
  @ApiBody({ type: UpdateUserDto, description: 'Données à mettre à jour' })
  @ApiOkResponse({ description: 'Utilisateur mis à jour avec succès' })
  @ApiNotFoundResponse({ description: 'Utilisateur introuvable' })
  @ApiConflictResponse({
    description: 'Email déjà utilisé par un autre utilisateur',
  })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.adminService.updateUser(id, dto);
  }

  @Delete('users/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer un utilisateur',
    description: 'Supprime définitivement un utilisateur du système',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: "ID de l'utilisateur",
  })
  @ApiNoContentResponse({ description: 'Utilisateur supprimé avec succès' })
  @ApiNotFoundResponse({ description: 'Utilisateur introuvable' })
  @ApiForbiddenResponse({
    description: 'Impossible de supprimer un super administrateur',
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteUser(id);
  }

  @Get('ambulances')
  @ApiOperation({
    summary: 'Lister toutes les ambulances',
    description:
      'Récupère la liste complète de toutes les ambulances de la flotte',
  })
  @ApiOkResponse({
    description: 'Liste des ambulances récupérée avec succès',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          licensePlate: { type: 'string', example: 'AMB-001' },
          vehicleModel: { type: 'string', example: 'Mercedes Sprinter' },
          vehicleYear: { type: 'number', example: 2023 },
          capacity: { type: 'number', example: 2 },
          status: {
            type: 'string',
            enum: ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE'],
          },
          driver: {
            type: 'object',
            nullable: true,
            properties: {
              id: { type: 'number' },
              firstName: { type: 'string' },
              lastName: { type: 'string' },
              email: { type: 'string' },
            },
          },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  getAllAmbulances() {
    return this.adminService.getAllAmbulances();
  }

  @Get('ambulances/:id')
  @ApiOperation({
    summary: 'Récupérer une ambulance par ID',
    description: "Récupère les détails complets d'une ambulance spécifique",
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: "ID de l'ambulance",
  })
  @ApiOkResponse({
    description: 'Ambulance trouvée avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        licensePlate: { type: 'string', example: 'AMB-001' },
        vehicleModel: { type: 'string', example: 'Mercedes Sprinter' },
        vehicleYear: { type: 'number', example: 2023 },
        capacity: { type: 'number', example: 2 },
        status: {
          type: 'string',
          enum: ['AVAILABLE', 'IN_USE', 'MAINTENANCE', 'OUT_OF_SERVICE'],
        },
        mileage: { type: 'number', example: 50000, nullable: true },
        lastMaintenance: {
          type: 'string',
          format: 'date-time',
          nullable: true,
        },
        nextMaintenance: {
          type: 'string',
          format: 'date-time',
          nullable: true,
        },
        driver: { type: 'object', nullable: true },
        assignments: {
          type: 'array',
          description: '10 dernières affectations',
          items: { type: 'object' },
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'Ambulance introuvable' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  getAmbulanceById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getAmbulanceById(id);
  }

  @Put('ambulances/:id')
  @ApiOperation({
    summary: 'Mettre à jour une ambulance',
    description: "Met à jour les informations d'une ambulance existante",
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: "ID de l'ambulance",
  })
  @ApiBody({ description: 'Données à mettre à jour (partielles)' })
  @ApiOkResponse({ description: 'Ambulance mise à jour avec succès' })
  @ApiNotFoundResponse({ description: 'Ambulance introuvable' })
  @ApiConflictResponse({
    description: "Plaque d'immatriculation déjà utilisée",
  })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  updateAmbulance(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateAmbulanceDto>,
  ) {
    return this.adminService.updateAmbulance(id, dto);
  }

  @Delete('ambulances/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer une ambulance',
    description: 'Supprime définitivement une ambulance de la flotte',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    example: 1,
    description: "ID de l'ambulance",
  })
  @ApiNoContentResponse({ description: 'Ambulance supprimée avec succès' })
  @ApiNotFoundResponse({ description: 'Ambulance introuvable' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  deleteAmbulance(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteAmbulance(id);
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Statistiques du système',
    description: 'Récupère les statistiques globales du système Ambulib',
  })
  @ApiOkResponse({
    description: 'Statistiques récupérées avec succès',
    schema: {
      type: 'object',
      properties: {
        totalUsers: {
          type: 'number',
          example: 150,
          description: "Nombre total d'utilisateurs",
        },
        totalClients: {
          type: 'number',
          example: 120,
          description: 'Nombre de clients',
        },
        totalDrivers: {
          type: 'number',
          example: 15,
          description: "Nombre d'ambulanciers",
        },
        totalFleetManagers: {
          type: 'number',
          example: 5,
          description: 'Nombre de gestionnaires de flotte',
        },
        totalAmbulances: {
          type: 'number',
          example: 20,
          description: "Nombre total d'ambulances",
        },
        availableAmbulances: {
          type: 'number',
          example: 12,
          description: 'Ambulances disponibles',
        },
        totalBookings: {
          type: 'number',
          example: 500,
          description: 'Nombre total de réservations',
        },
        pendingBookings: {
          type: 'number',
          example: 25,
          description: 'Réservations en attente',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({ description: 'Accès réservé aux administrateurs' })
  getSystemStats() {
    return this.adminService.getSystemStats();
  }
}
