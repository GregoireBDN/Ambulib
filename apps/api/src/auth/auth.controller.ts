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
  Param,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { Response } from 'express';
import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
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
import {
  SendVerificationCodeDto,
  VerifyCodeDto,
} from './dto/email-verification.dto';
import { ForgotPasswordDto, ResetPasswordDto } from './dto/password-reset.dto';
import { EmailVerificationService } from './email-verification.service';
import { PasswordResetService } from './password-reset.service';
import { RequestWithUser } from '../common/interfaces/request-with-user.interface';
import { Role, Prisma } from '@prisma/client';

// Interface moved to ../common/interfaces/request-with-user.interface.ts

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly passwordResetService: PasswordResetService,
  ) {}

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
    return this.authService.registerUser(createUserDto);
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
      'Endpoint accessible uniquement aux utilisateurs authentifiés avec les rôles ADMIN ou AMBULANCE_DRIVER',
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
      const response: {
        id: number;
        firstName: string;
        lastName: string;
        role: Role;
        isProfileComplete: boolean;
        accessToken: string;
        refreshToken: string;
      } = await this.authService.login(
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
      redirectUrl.searchParams.append('role', String(response.role));
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

  @Public()
  @Post('check-email')
  @ApiOperation({
    summary: "Vérifier la disponibilité d'un email",
    description: 'Vérifie si un email est déjà utilisé dans le système',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
          example: 'user@example.com',
        },
      },
      required: ['email'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Email vérifié avec succès',
    schema: {
      type: 'object',
      properties: {
        available: {
          type: 'boolean',
          description: 'true si email disponible, false si déjà utilisé',
        },
        message: {
          type: 'string',
          description: 'Message explicatif',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Email manquant ou format invalide',
  })
  async checkEmail(@Body('email') email: string) {
    if (!email) {
      throw new BadRequestException('Email requis');
    }

    try {
      const existingUser: Prisma.UserGetPayload<{
        select: {
          id: true;
          email: true;
          firstName: true;
          lastName: true;
          role: true;
          password: true;
          isProfileComplete: true;
          companyId: true;
          hashedRefreshToken: true;
        };
      }> | null = await this.userService.findByEmail(email);

      if (existingUser) {
        return {
          available: false,
          message: 'Cette adresse email est déjà utilisée',
        };
      }

      return {
        available: true,
        message: 'Cette adresse email est disponible',
      };
    } catch (error) {
      console.error('Erreur lors de la vérification email:', error);
      throw new InternalServerErrorException('Erreur lors de la vérification');
    }
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

  @Public()
  @Post('send-verification-code')
  @ApiOperation({
    summary: 'Envoyer un code de vérification par email',
    description:
      "Génère et envoie un code de vérification à 6 chiffres à l'adresse email spécifiée",
  })
  @ApiBody({ type: SendVerificationCodeDto })
  @ApiResponse({
    status: 201,
    description: 'Code de vérification envoyé avec succès',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Code de vérification envoyé avec succès',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "Email invalide ou erreur d'envoi",
  })
  @ApiResponse({
    status: 429,
    description: 'Trop de tentatives - veuillez patienter',
  })
  async sendVerificationCode(@Body() sendCodeDto: SendVerificationCodeDto) {
    try {
      await this.emailVerificationService.sendVerificationCode(
        sendCodeDto.email,
      );
      return {
        message: 'Code de vérification envoyé avec succès',
      };
    } catch (error) {
      console.error("Erreur lors de l'envoi du code:", error);
      throw error;
    }
  }

  @Public()
  @Post('verify-code')
  @ApiOperation({
    summary: 'Vérifier un code de vérification',
    description:
      'Vérifie si le code de vérification fourni est correct et valide',
  })
  @ApiBody({ type: VerifyCodeDto })
  @ApiResponse({
    status: 200,
    description: 'Code vérifié avec succès',
    schema: {
      type: 'object',
      properties: {
        verified: {
          type: 'boolean',
          example: true,
        },
        message: {
          type: 'string',
          example: 'Code vérifié avec succès',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Code incorrect, expiré ou nombre de tentatives dépassé',
  })
  async verifyCode(@Body() verifyCodeDto: VerifyCodeDto) {
    try {
      const isVerified = await this.emailVerificationService.verifyCode(
        verifyCodeDto.email,
        verifyCodeDto.code,
      );

      return {
        verified: isVerified,
        message: 'Code vérifié avec succès',
      };
    } catch (error) {
      console.error('Erreur lors de la vérification du code:', error);
      throw error;
    }
  }

  @Public()
  @Get('email-verification-status/:email')
  @ApiOperation({
    summary: "Vérifier le statut de vérification d'un email",
    description: 'Vérifie si une adresse email a déjà été vérifiée',
  })
  @ApiResponse({
    status: 200,
    description: 'Statut de vérification récupéré',
    schema: {
      type: 'object',
      properties: {
        verified: {
          type: 'boolean',
          example: true,
        },
        email: {
          type: 'string',
          example: 'user@example.com',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Email invalide',
  })
  async getEmailVerificationStatus(@Param('email') email: string) {
    const isVerified =
      await this.emailVerificationService.isEmailVerified(email);

    return {
      verified: isVerified,
      email,
    };
  }

  @Public()
  @Post('forgot-password')
  @ApiOperation({
    summary: 'Demander la réinitialisation du mot de passe',
    description:
      'Génère un token de réinitialisation et envoie un email avec le lien de réinitialisation',
  })
  @ApiBody({ type: ForgotPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Email de réinitialisation envoyé (ou silence pour sécurité)',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example:
            'Si cette adresse email est enregistrée, vous recevrez un lien de réinitialisation.',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Email invalide',
  })
  @ApiResponse({
    status: 429,
    description: 'Trop de tentatives - veuillez patienter',
  })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    try {
      await this.passwordResetService.sendPasswordResetEmail(
        forgotPasswordDto.email,
      );

      // Retour neutre pour des raisons de sécurité
      return {
        message:
          'Si cette adresse email est enregistrée, vous recevrez un lien de réinitialisation.',
      };
    } catch (error) {
      console.error('Erreur lors de la demande de réinitialisation:', error);
      throw error;
    }
  }

  @Public()
  @Post('reset-password')
  @ApiOperation({
    summary: 'Réinitialiser le mot de passe',
    description:
      'Réinitialise le mot de passe en utilisant le token reçu par email',
  })
  @ApiBody({ type: ResetPasswordDto })
  @ApiResponse({
    status: 200,
    description: 'Mot de passe réinitialisé avec succès',
    schema: {
      type: 'object',
      properties: {
        message: {
          type: 'string',
          example: 'Mot de passe réinitialisé avec succès',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Token invalide, expiré ou mot de passe trop faible',
  })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      await this.passwordResetService.resetPassword(
        resetPasswordDto.token,
        resetPasswordDto.newPassword,
      );

      return {
        message: 'Mot de passe réinitialisé avec succès',
      };
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw error;
    }
  }

  @Public()
  @Get('verify-reset-token/:token')
  @ApiOperation({
    summary: "Vérifier la validité d'un token de réinitialisation",
    description:
      'Vérifie si un token de réinitialisation est valide et non expiré',
  })
  @ApiResponse({
    status: 200,
    description: 'Statut du token de réinitialisation',
    schema: {
      type: 'object',
      properties: {
        valid: {
          type: 'boolean',
          example: true,
        },
        token: {
          type: 'string',
          example: 'clp1a2b3c-d4e5-6789-abcd-ef0123456789',
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: 'Token invalide',
  })
  async verifyResetToken(@Param('token') token: string) {
    const isValid = await this.passwordResetService.verifyResetToken(token);

    return {
      valid: isValid,
      token,
    };
  }
}
