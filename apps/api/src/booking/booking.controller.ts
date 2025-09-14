import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingFiltersDto } from './dto/booking-filters.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

interface RequestWithUser extends Request {
  user: {
    id: number;
    role: Role;
  };
}

@ApiTags('bookings')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Roles(Role.CLIENT)
  @ApiOperation({
    summary: 'Créer une nouvelle réservation',
    description:
      "Permet aux clients de créer une nouvelle réservation d'ambulance",
  })
  @ApiBody({
    type: CreateBookingDto,
    description: 'Données de la réservation à créer',
  })
  @ApiCreatedResponse({
    description: 'Réservation créée avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        clientId: { type: 'number', example: 1 },
        dependentId: { type: 'number', nullable: true },
        pickupAddress: { type: 'string', example: '123 rue de la Santé' },
        destinationAddress: { type: 'string', example: 'Hôpital Saint-Louis' },
        pickupCity: { type: 'string', example: 'Paris' },
        destinationCity: { type: 'string', example: 'Paris' },
        scheduledDateTime: {
          type: 'string',
          format: 'date-time',
          nullable: true,
        },
        bookingType: { type: 'string', enum: ['SCHEDULED', 'EMERGENCY'] },
        status: {
          type: 'string',
          enum: [
            'PENDING',
            'CONFIRMED',
            'IN_PROGRESS',
            'COMPLETED',
            'CANCELLED',
          ],
        },
        specialRequirements: { type: 'array', items: { type: 'string' } },
        notes: { type: 'string', nullable: true },
        estimatedDuration: { type: 'number', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Données invalides ou règles métier non respectées',
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiForbiddenResponse({
    description: 'Seuls les clients peuvent créer des réservations',
  })
  create(
    @Request() req: RequestWithUser,
    @Body() createBookingDto: CreateBookingDto,
  ) {
    return this.bookingService.create(req.user.id, createBookingDto);
  }

  @Get()
  @Roles(
    Role.CLIENT,
    Role.AMBULANCE_DRIVER,
    Role.FLEET_MANAGER,
    Role.ADMIN,
    Role.SUPER_ADMIN,
  )
  @ApiOperation({
    summary: 'Lister les réservations',
    description:
      "Récupère la liste des réservations selon le rôle de l'utilisateur",
  })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
  })
  @ApiQuery({
    name: 'bookingType',
    required: false,
    enum: ['SCHEDULED', 'EMERGENCY'],
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: 'string',
    format: 'date-time',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: 'string',
    format: 'date-time',
  })
  @ApiQuery({ name: 'page', required: false, type: 'number', minimum: 1 })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: 'number',
    minimum: 1,
    maximum: 100,
  })
  @ApiOkResponse({
    description: 'Liste des réservations récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              pickupAddress: { type: 'string' },
              destinationAddress: { type: 'string' },
              scheduledDateTime: {
                type: 'string',
                format: 'date-time',
                nullable: true,
              },
              bookingType: { type: 'string' },
              status: { type: 'string' },
              createdAt: { type: 'string', format: 'date-time' },
            },
          },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  findAll(
    @Request() req: RequestWithUser,
    @Query() filters: BookingFiltersDto,
  ) {
    return this.bookingService.findAll(req.user.id, req.user.role, filters);
  }

  @Get('stats')
  @Roles(
    Role.CLIENT,
    Role.AMBULANCE_DRIVER,
    Role.FLEET_MANAGER,
    Role.ADMIN,
    Role.SUPER_ADMIN,
  )
  @ApiOperation({
    summary: 'Statistiques des réservations',
    description:
      "Récupère les statistiques des réservations selon le rôle de l'utilisateur",
  })
  @ApiOkResponse({
    description: 'Statistiques récupérées avec succès',
    schema: {
      type: 'object',
      properties: {
        total: { type: 'number', example: 150 },
        byStatus: {
          type: 'object',
          properties: {
            pending: { type: 'number', example: 10 },
            confirmed: { type: 'number', example: 20 },
            inProgress: { type: 'number', example: 5 },
            completed: { type: 'number', example: 100 },
            cancelled: { type: 'number', example: 15 },
          },
        },
        byType: {
          type: 'object',
          properties: {
            emergency: { type: 'number', example: 30 },
            scheduled: { type: 'number', example: 120 },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  getStats(@Request() req: RequestWithUser) {
    return this.bookingService.getBookingStats(req.user.id, req.user.role);
  }

  @Get(':id')
  @Roles(
    Role.CLIENT,
    Role.AMBULANCE_DRIVER,
    Role.FLEET_MANAGER,
    Role.ADMIN,
    Role.SUPER_ADMIN,
  )
  @ApiOperation({
    summary: 'Récupérer une réservation',
    description: "Récupère les détails d'une réservation spécifique",
  })
  @ApiOkResponse({
    description: 'Réservation récupérée avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        clientId: { type: 'number' },
        pickupAddress: { type: 'string' },
        destinationAddress: { type: 'string' },
        scheduledDateTime: {
          type: 'string',
          format: 'date-time',
          nullable: true,
        },
        bookingType: { type: 'string' },
        status: { type: 'string' },
        client: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phoneNumber: { type: 'string' },
          },
        },
        assignments: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              ambulance: { type: 'object' },
              driver: { type: 'object' },
            },
          },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiNotFoundResponse({ description: 'Réservation introuvable' })
  @ApiForbiddenResponse({
    description: 'Accès non autorisé à cette réservation',
  })
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.bookingService.findOne(id, req.user.id, req.user.role);
  }

  @Patch(':id')
  @Roles(Role.CLIENT, Role.FLEET_MANAGER, Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Modifier une réservation',
    description:
      'Permet de modifier une réservation existante selon les permissions',
  })
  @ApiBody({
    type: UpdateBookingDto,
    description: 'Données à modifier',
  })
  @ApiOkResponse({
    description: 'Réservation modifiée avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        status: { type: 'string' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Données invalides ou modification non autorisée',
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiNotFoundResponse({ description: 'Réservation introuvable' })
  @ApiForbiddenResponse({ description: 'Permissions insuffisantes' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
    @Body() updateBookingDto: UpdateBookingDto,
  ) {
    return this.bookingService.update(
      id,
      req.user.id,
      req.user.role,
      updateBookingDto,
    );
  }

  @Patch(':id/cancel')
  @Roles(Role.CLIENT, Role.FLEET_MANAGER, Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Annuler une réservation',
    description: "Permet d'annuler une réservation existante",
  })
  @ApiOkResponse({
    description: 'Réservation annulée avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        status: { type: 'string', example: 'CANCELLED' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Annulation non autorisée (réservation déjà terminée)',
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiNotFoundResponse({ description: 'Réservation introuvable' })
  @ApiForbiddenResponse({ description: 'Permissions insuffisantes' })
  cancel(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.bookingService.cancel(id, req.user.id, req.user.role);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(Role.ADMIN, Role.SUPER_ADMIN)
  @ApiOperation({
    summary: 'Supprimer une réservation',
    description:
      'Permet aux administrateurs de supprimer définitivement une réservation',
  })
  @ApiNoContentResponse({ description: 'Réservation supprimée avec succès' })
  @ApiBadRequestResponse({
    description: 'Suppression non autorisée (réservation en cours)',
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiNotFoundResponse({ description: 'Réservation introuvable' })
  @ApiForbiddenResponse({
    description: 'Seuls les administrateurs peuvent supprimer des réservations',
  })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    return this.bookingService.remove(id, req.user.id, req.user.role);
  }
}
