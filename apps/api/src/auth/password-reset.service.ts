import {
  Injectable,
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class PasswordResetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Génère un token de réinitialisation UUID v4
   */
  private generateResetToken(): string {
    return randomUUID();
  }

  /**
   * Envoie un lien de réinitialisation de mot de passe à l'adresse email spécifiée
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    // Vérifier si l'utilisateur existe
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Pour des raisons de sécurité, ne pas révéler si l'email existe
      // Mais retourner un succès apparent
      return;
    }

    // Vérifier s'il n'y a pas déjà une demande de réinitialisation récente
    const existingReset = await this.prisma.passwordReset.findFirst({
      where: {
        email,
        expiresAt: {
          gte: new Date(),
        },
        attempts: {
          lt: 5, // Maximum 5 tentatives
        },
        isUsed: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Si une demande a été faite il y a moins de 15 minutes
    if (
      existingReset &&
      new Date().getTime() - existingReset.createdAt.getTime() < 15 * 60 * 1000
    ) {
      throw new HttpException(
        'Un email de réinitialisation a déjà été envoyé. Veuillez attendre 15 minutes avant de faire une nouvelle demande.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    // Générer un nouveau token
    const token = this.generateResetToken();
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // Expire dans 1 heure

    // Invalider les anciens tokens pour cet email
    await this.prisma.passwordReset.updateMany({
      where: {
        email,
        isUsed: false,
      },
      data: {
        isUsed: true,
      },
    });

    // Créer le nouveau token
    await this.prisma.passwordReset.create({
      data: {
        email,
        token,
        expiresAt,
      },
    });

    // Construire l'URL de réinitialisation
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3001'}/reset-password?token=${token}`;

    try {
      // Envoyer l'email
      await this.mailerService.sendMail({
        to: email,
        subject: 'HavRid - Réinitialisation de votre mot de passe',
        template: 'password-reset',
        context: {
          resetUrl,
          userEmail: email,
          expiryTime: '1 heure',
        },
      });

      console.log(`Email de réinitialisation envoyé à ${email}`);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
      throw new HttpException(
        "Erreur lors de l'envoi de l'email de réinitialisation",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Vérifie un token de réinitialisation
   */
  async verifyResetToken(token: string): Promise<boolean> {
    const resetToken = await this.prisma.passwordReset.findUnique({
      where: {
        token,
      },
    });

    if (!resetToken) {
      return false;
    }

    if (resetToken.isUsed) {
      return false;
    }

    if (new Date() > resetToken.expiresAt) {
      return false;
    }

    if (resetToken.attempts >= 5) {
      return false;
    }

    return true;
  }

  /**
   * Réinitialise le mot de passe avec un token valide
   */
  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetToken = await this.prisma.passwordReset.findUnique({
      where: {
        token,
      },
    });

    if (!resetToken || resetToken.isUsed || new Date() > resetToken.expiresAt) {
      throw new BadRequestException(
        'Token de réinitialisation invalide ou expiré',
      );
    }

    if (resetToken.attempts >= 5) {
      throw new BadRequestException(
        'Trop de tentatives. Demandez un nouveau lien de réinitialisation.',
      );
    }

    // Incrémenter le nombre de tentatives
    await this.prisma.passwordReset.update({
      where: {
        id: resetToken.id,
      },
      data: {
        attempts: resetToken.attempts + 1,
      },
    });

    // Vérifier que l'utilisateur existe toujours
    const user = await this.prisma.user.findUnique({
      where: { email: resetToken.email },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    // Hacher le nouveau mot de passe
    const hashedPassword = await argon2.hash(newPassword);

    try {
      // Commencer une transaction pour s'assurer de la cohérence
      await this.prisma.$transaction(async (tx) => {
        // Mettre à jour le mot de passe
        await tx.user.update({
          where: { email: resetToken.email },
          data: {
            password: hashedPassword,
            // Invalider tous les refresh tokens existants pour forcer une nouvelle connexion
            hashedRefreshToken: null,
          },
        });

        // Marquer le token comme utilisé
        await tx.passwordReset.update({
          where: {
            id: resetToken.id,
          },
          data: {
            isUsed: true,
          },
        });

        // Invalider tous les autres tokens de réinitialisation pour cet email
        await tx.passwordReset.updateMany({
          where: {
            email: resetToken.email,
            id: {
              not: resetToken.id,
            },
            isUsed: false,
          },
          data: {
            isUsed: true,
          },
        });
      });

      console.log(
        `Mot de passe réinitialisé avec succès pour ${resetToken.email}`,
      );
    } catch (error) {
      console.error(
        'Erreur lors de la réinitialisation du mot de passe:',
        error,
      );
      throw new HttpException(
        'Erreur lors de la réinitialisation du mot de passe',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Nettoie les tokens expirés (à utiliser dans un cron job)
   */
  async cleanupExpiredTokens(): Promise<void> {
    await this.prisma.passwordReset.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}
