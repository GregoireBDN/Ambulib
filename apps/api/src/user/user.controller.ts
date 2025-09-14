import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiBearerAuth,
  ApiOkResponse,
  ApiNoContentResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    role: string;
  };
}

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({
    summary: 'Récupérer son profil',
    description:
      "Permet à l'utilisateur connecté de récupérer ses informations de profil",
  })
  @ApiOkResponse({
    description: 'Profil récupéré avec succès',
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
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token JWT requis pour accéder au profil',
  })
  @ApiNotFoundResponse({ description: 'Utilisateur introuvable' })
  getProfile(@Request() req: RequestWithUser) {
    return this.userService.findOne(req.user.id);
  }

  @Put('profile')
  @ApiOperation({
    summary: 'Mettre à jour son profil',
    description:
      "Permet à l'utilisateur connecté de mettre à jour ses informations personnelles",
  })
  @ApiBody({
    type: UpdateProfileDto,
    description: 'Informations du profil à mettre à jour',
  })
  @ApiOkResponse({
    description: 'Profil mis à jour avec succès',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        email: { type: 'string' },
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        role: { type: 'string' },
        phoneNumber: { type: 'string', nullable: true },
        address: { type: 'string', nullable: true },
        city: { type: 'string', nullable: true },
        postalCode: { type: 'string', nullable: true },
        age: { type: 'number', nullable: true },
        isProfileComplete: { type: 'boolean' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiBadRequestResponse({ description: 'Données invalides' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiNotFoundResponse({ description: 'Utilisateur introuvable' })
  updateProfile(
    @Request() req: RequestWithUser,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(req.user.id, dto);
  }

  @Put('change-password')
  @ApiOperation({
    summary: 'Changer son mot de passe',
    description: "Permet à l'utilisateur connecté de changer son mot de passe",
  })
  @ApiBody({
    type: ChangePasswordDto,
    description: 'Ancien et nouveau mot de passe',
  })
  @ApiOkResponse({
    description: 'Mot de passe changé avec succès',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Mot de passe changé avec succès' },
      },
    },
  })
  @ApiBadRequestResponse({
    description:
      'Ancien mot de passe incorrect ou nouveau mot de passe invalide',
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiNotFoundResponse({ description: 'Utilisateur introuvable' })
  changePassword(
    @Request() req: RequestWithUser,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(req.user.id, dto);
  }

  @Get('my-bookings')
  @ApiOperation({
    summary: 'Mes réservations',
    description: "Récupère toutes les réservations de l'utilisateur connecté",
  })
  @ApiOkResponse({
    description: 'Liste des réservations récupérée avec succès',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'number', example: 1 },
          pickupAddress: { type: 'string', example: '123 rue de la Paix' },
          destinationAddress: {
            type: 'string',
            example: '456 Hôpital Central',
          },
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
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  getMyBookings(@Request() req: RequestWithUser) {
    return this.userService.getUserBookings(req.user.id);
  }

  @Delete('account')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer son compte',
    description:
      "Permet à l'utilisateur de supprimer définitivement son compte (action irréversible)",
  })
  @ApiNoContentResponse({ description: 'Compte supprimé avec succès' })
  @ApiUnauthorizedResponse({ description: 'Token JWT requis' })
  @ApiNotFoundResponse({ description: 'Utilisateur introuvable' })
  deleteAccount(@Request() req: RequestWithUser) {
    return this.userService.deleteAccount(req.user.id);
  }
}
