import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { PrismaService } from '../prisma/prisma.service';
import { randomBytes } from 'crypto';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  /**
   * Génère un code de vérification à 6 chiffres
   */
  private generateVerificationCode(): string {
    // Générer un code à 6 chiffres cryptographiquement sécurisé
    const bytes = randomBytes(3);
    const code = parseInt(bytes.toString('hex'), 16) % 1000000;
    return code.toString().padStart(6, '0');
  }

  /**
   * Envoie un code de vérification à l'adresse email spécifiée
   */
  async sendVerificationCode(email: string): Promise<void> {
    // Vérifier s'il n'y a pas déjà une vérification en cours
    const existingVerification = await this.prisma.emailVerification.findFirst({
      where: {
        email,
        expiresAt: {
          gte: new Date(),
        },
        attempts: {
          lt: 3,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Si une vérification est déjà en cours et qu'elle a été créée il y a moins de 60 secondes
    if (existingVerification && 
        new Date().getTime() - existingVerification.createdAt.getTime() < 60000) {
      throw new HttpException(
        'Un code de vérification a déjà été envoyé. Veuillez attendre 60 secondes avant de demander un nouveau code.',
        HttpStatus.TOO_MANY_REQUESTS
      );
    }

    // Invalider toutes les vérifications précédentes pour cet email
    await this.prisma.emailVerification.updateMany({
      where: {
        email,
        isVerified: false,
      },
      data: {
        expiresAt: new Date(), // Les faire expirer immédiatement
      },
    });

    // Générer un nouveau code
    const code = this.generateVerificationCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Sauvegarder le code en base de données
    await this.prisma.emailVerification.create({
      data: {
        email,
        code,
        expiresAt,
        attempts: 0,
        isVerified: false,
      },
    });

    // Envoyer l'email
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Vérification de votre adresse email - HavRid',
        template: 'email-verification',
        context: {
          code,
        },
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      
      // Supprimer la vérification si l'envoi a échoué
      await this.prisma.emailVerification.deleteMany({
        where: {
          email,
          code,
        },
      });
      
      throw new BadRequestException(
        'Impossible d\'envoyer l\'email de vérification. Veuillez réessayer plus tard.'
      );
    }
  }

  /**
   * Vérifie un code de vérification
   */
  async verifyCode(email: string, code: string): Promise<boolean> {
    const verification = await this.prisma.emailVerification.findFirst({
      where: {
        email,
        expiresAt: {
          gte: new Date(),
        },
        isVerified: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!verification) {
      throw new BadRequestException(
        'Code de vérification non trouvé ou expiré. Veuillez demander un nouveau code.'
      );
    }

    // Vérifier si le nombre maximum de tentatives a été atteint
    if (verification.attempts >= 3) {
      throw new BadRequestException(
        'Nombre maximum de tentatives atteint. Veuillez demander un nouveau code.'
      );
    }

    // Incrémenter le nombre de tentatives
    await this.prisma.emailVerification.update({
      where: {
        id: verification.id,
      },
      data: {
        attempts: verification.attempts + 1,
      },
    });

    // Vérifier si le code est correct
    if (verification.code !== code) {
      const attemptsLeft = 2 - verification.attempts;
      throw new BadRequestException(
        attemptsLeft > 0 
          ? `Code incorrect. Il vous reste ${attemptsLeft} tentative(s).`
          : 'Code incorrect. Nombre maximum de tentatives atteint.'
      );
    }

    // Marquer la vérification comme réussie
    await this.prisma.emailVerification.update({
      where: {
        id: verification.id,
      },
      data: {
        isVerified: true,
      },
    });

    return true;
  }

  /**
   * Vérifie si une adresse email a été vérifiée
   */
  async isEmailVerified(email: string): Promise<boolean> {
    const verification = await this.prisma.emailVerification.findFirst({
      where: {
        email,
        isVerified: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return !!verification;
  }

  /**
   * Nettoie les vérifications expirées (à appeler périodiquement)
   */
  async cleanupExpiredVerifications(): Promise<void> {
    await this.prisma.emailVerification.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  /**
   * Supprime toutes les vérifications pour un email donné
   */
  async removeVerifications(email: string): Promise<void> {
    await this.prisma.emailVerification.deleteMany({
      where: {
        email,
      },
    });
  }
}