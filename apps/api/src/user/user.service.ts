import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { PrismaService } from '../prisma/prisma.service';
import { hash, verify } from 'argon2';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const {
      password,
      age,
      birthDate,
      socialSecurity,
      allergies,
      medications,
      mobility,
      mobilityDetails,
      doctorName,
      doctorPhone,
      emergencyContactName,
      emergencyContactPhone,
      emergencyContactRelation,
      ...userData
    } = createUserDto;

    const hashedPassword = await hash(password);

    // Calculer l'âge à partir de la date de naissance si fournie
    let calculatedAge = age
      ? typeof age === 'string'
        ? parseInt(age)
        : age
      : null;
    if (birthDate && !calculatedAge) {
      const birth = new Date(birthDate);
      const today = new Date();
      calculatedAge = today.getFullYear() - birth.getFullYear();
    }

    // Créer l'utilisateur avec une transaction pour gérer les relations
    const result = await this.prisma.$transaction(async (prisma) => {
      // 1. Créer l'utilisateur principal
      const user = await prisma.user.create({
        data: {
          password: hashedPassword,
          age: calculatedAge,
          ...userData,
          updatedAt: new Date(),
        },
      });

      // 2. Créer les informations médicales si fournies
      if (
        allergies ||
        medications ||
        socialSecurity ||
        doctorName ||
        doctorPhone
      ) {
        await prisma.medicalInfo.create({
          data: {
            userId: user.id,
            allergies: allergies || null,
            medications: medications || null,
            medicalConditions:
              mobility && mobility !== 'none'
                ? `Mobilité réduite: ${mobility}${mobilityDetails ? ` - ${mobilityDetails}` : ''}`
                : null,
            doctorName: doctorName || null,
            doctorPhone: doctorPhone || null,
            insuranceNumber: socialSecurity || null, // Utiliser le champ existant
          },
        });
      }

      // 3. Créer le contact d'urgence si fourni
      if (
        emergencyContactName &&
        emergencyContactPhone &&
        emergencyContactRelation
      ) {
        // Séparer le nom complet en prénom et nom
        const [firstName, ...lastNameParts] = emergencyContactName.split(' ');
        const lastName = lastNameParts.join(' ') || firstName;

        await prisma.emergencyContact.create({
          data: {
            userId: user.id,
            firstName: firstName,
            lastName: lastName,
            phoneNumber: emergencyContactPhone,
            relationship: emergencyContactRelation,
          },
        });
      }

      return user;
    });

    return result;
  }

  async findByEmail(email: string) {
    const result = await this.prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        password: true,
        isProfileComplete: true,
        companyId: true,
        hashedRefreshToken: true,
      },
    });
    return result;
  }

  async findOne(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        emergencyContact: true,
        dependent: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    // Exclure le mot de passe et le refresh token de la réponse
    const {
      password: _password,
      hashedRefreshToken: _hashedRefreshToken,
      ...userWithoutSensitiveData
    } = user;
    return userWithoutSensitiveData;
  }

  // Méthode interne pour récupérer l'utilisateur avec tous les champs (pour AuthService)
  async findOneInternal(userId: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        emergencyContact: true,
        dependent: true,
      },
    });
  }

  async updateHashedRefreshToken(userId: number, hashedRT: string | null) {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRefreshToken: hashedRT,
      },
    });
  }

  async update(userId: number, data: Prisma.UserUpdateInput) {
    return await this.prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  async updateProfile(userId: number, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    // Séparer les données utilisateur des données de contact d'urgence
    const {
      emergencyContactFirstName,
      emergencyContactLastName,
      emergencyContactPhoneNumber,
      emergencyContactRelationship,
      ...userData
    } = dto;

    // Mettre à jour les données utilisateur
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
        isProfileComplete: true,
      },
      include: {
        emergencyContact: true,
      },
    });

    // Gérer le contact d'urgence si des données sont fournies
    if (
      emergencyContactFirstName ||
      emergencyContactLastName ||
      emergencyContactPhoneNumber ||
      emergencyContactRelationship
    ) {
      const emergencyContactData = {
        firstName: emergencyContactFirstName || '',
        lastName: emergencyContactLastName || '',
        phoneNumber: emergencyContactPhoneNumber || '',
        relationship: emergencyContactRelationship || '',
      };

      await this.prisma.emergencyContact.upsert({
        where: { userId },
        update: emergencyContactData,
        create: {
          ...emergencyContactData,
          userId,
        },
      });
    }

    // Retourner l'utilisateur mis à jour sans données sensibles
    const {
      password: _password,
      hashedRefreshToken: _hashedRefreshToken,
      ...userWithoutSensitiveData
    } = updatedUser;
    return userWithoutSensitiveData;
  }

  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    // Vérifier l'ancien mot de passe
    const isOldPasswordValid = await verify(user.password, dto.currentPassword);
    if (!isOldPasswordValid) {
      throw new BadRequestException('Ancien mot de passe incorrect');
    }

    // Hasher le nouveau mot de passe
    const hashedNewPassword = await hash(dto.newPassword);

    // Mettre à jour le mot de passe
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
        hashedRefreshToken: null, // Invalider les tokens existants
      },
    });

    return { message: 'Mot de passe changé avec succès' };
  }

  async getUserBookings(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    return await this.prisma.booking.findMany({
      where: { clientId: userId },
      orderBy: { createdAt: 'desc' },
      include: {
        transportTickets: true,
        assignments: {
          include: {
            ambulance: true,
            driver: {
              select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteAccount(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    // Supprimer l'utilisateur (les relations seront supprimées en cascade si configurées)
    await this.prisma.user.delete({
      where: { id: userId },
    });

    return;
  }
}
