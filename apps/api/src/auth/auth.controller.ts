import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { Role } from '@prisma/client';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import {
  SignupDto,
  SigninDto,
  RefreshTokenDto,
  CompleteProfileDto,
  AuthResponseDto,
} from './dto/auth.dto';

interface RequestWithUser extends Request {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    role: Role;
    email: string;
    isProfileComplete: boolean;
  };
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  @ApiOperation({
    summary: "Inscription d'un nouvel utilisateur",
    description:
      'Crée un nouveau compte utilisateur avec les informations fournies',
  })
  @ApiBody({ type: SignupDto })
  @ApiCreatedResponse({
    description: 'Utilisateur créé avec succès',
    type: AuthResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Données invalides ou email déjà utilisé',
  })
  registerUser(@Body() createUserDto: CreateUserDto) {
    console.log('Signup request received:', createUserDto);
    try {
      console.log('Calling authService.registerUser...');
      const result = this.authService.registerUser(createUserDto);
      console.log('Signup successful:', result);
      return result;
    } catch (error) {
      console.error('Signup error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
      });
      throw error;
    }
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('signin')
  @ApiOperation({
    summary: 'Connexion utilisateur',
    description: 'Authentifie un utilisateur avec son email et mot de passe',
  })
  @ApiBody({ type: SigninDto })
  @ApiResponse({
    status: 200,
    description: 'Connexion réussie',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Email ou mot de passe incorrect',
  })
  login(@Request() req: RequestWithUser) {
    return this.authService.login(
      req.user.id,
      req.user.firstName,
      req.user.lastName,
      req.user.role,
      req.user.isProfileComplete,
    );
  }

  @Roles('ADMIN', 'AMBULANCE_DRIVER')
  @Get('protected')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Endpoint protégé',
    description:
      'Endpoint accessible uniquement aux utilisateurs authentifiés avec les rôles ADMIN ou DRIVER',
  })
  @ApiResponse({
    status: 200,
    description: 'Accès autorisé',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Now you can access this protected API. this is your user ID: 1',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token JWT manquant ou invalide',
  })
  getAll(@Request() req: RequestWithUser) {
    return {
      message: `Now you can access this protected API. this is your user ID: ${req.user.id}`,
    };
  }

  @Public()
  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @ApiOperation({
    summary: "Rafraîchir le token d'accès",
    description:
      "Utilise le refresh token pour obtenir un nouveau token d'accès",
  })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({
    status: 200,
    description: 'Token rafraîchi avec succès',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Refresh token invalide ou expiré',
  })
  refreshToken(@Request() req: RequestWithUser) {
    return this.authService.refreshToken(
      req.user.id,
      req.user.firstName,
      req.user.lastName,
      req.user.isProfileComplete,
    );
  }

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  @ApiOperation({
    summary: 'Connexion avec Google',
    description: "Redirige vers l'authentification Google OAuth",
  })
  @ApiResponse({
    status: 302,
    description: 'Redirection vers Google OAuth',
  })
  googleLogin() {}

  @Public()
  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  @ApiOperation({
    summary: 'Callback Google OAuth',
    description: "Endpoint de callback pour l'authentification Google OAuth",
  })
  @ApiResponse({
    status: 302,
    description: "Redirection vers l'application frontend avec les tokens",
  })
  async googleCallback(@Request() req: RequestWithUser, @Res() res: Response) {
    try {
      const response = await this.authService.login(
        req.user.id,
        req.user.firstName,
        req.user.lastName,
        req.user.role,
        req.user.isProfileComplete,
      );

      const redirectUrl = new URL(
        'http://localhost:3000/api/auth/google/callback',
      );
      redirectUrl.searchParams.append('userId', response.id.toString());
      redirectUrl.searchParams.append('firstName', response.firstName);
      redirectUrl.searchParams.append('lastName', response.lastName);
      redirectUrl.searchParams.append('email', req.user.email);
      redirectUrl.searchParams.append('accessToken', response.accessToken);
      redirectUrl.searchParams.append('refreshToken', response.refreshToken);
      redirectUrl.searchParams.append('role', response.role.toString());
      redirectUrl.searchParams.append(
        'isProfileComplete',
        response.isProfileComplete.toString(),
      );

      res.redirect(redirectUrl.toString());
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect(
        'http://localhost:3000/auth/signin?error=google_auth_failed',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('complete-profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Compléter le profil utilisateur',
    description: 'Met à jour les informations du profil utilisateur',
  })
  @ApiBody({ type: CompleteProfileDto })
  @ApiResponse({
    status: 200,
    description: 'Profil mis à jour avec succès',
    type: AuthResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token JWT manquant ou invalide',
  })
  @ApiBadRequestResponse({
    description: 'Données invalides',
  })
  completeProfile(
    @Request() req: RequestWithUser,
    @Body() profileData: Partial<CreateUserDto>,
  ) {
    return this.authService.completeProfile(req.user.id, profileData);
  }

  @Post('signout')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({
    summary: 'Déconnexion utilisateur',
    description: "Déconnecte l'utilisateur et invalide ses tokens",
  })
  @ApiResponse({
    status: 200,
    description: 'Déconnexion réussie',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'User signed out successfully',
        },
      },
    },
  })
  @ApiUnauthorizedResponse({
    description: 'Token JWT manquant ou invalide',
  })
  signOut(@Req() req: RequestWithUser) {
    return this.authService.signOut(req.user.id);
  }
}
