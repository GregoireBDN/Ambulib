import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingFiltersDto } from './dto/booking-filters.dto';
import { BookingStatus, BookingType, Role } from '@prisma/client';

@Injectable()
export class BookingService {
  private readonly logger = new Logger(BookingService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createBookingDto: CreateBookingDto) {
    this.logger.log(`Creating booking for user ${userId}`);

    // Vérifier que l'utilisateur existe et est un client
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (user.role !== Role.CLIENT) {
      throw new ForbiddenException(
        'Seuls les clients peuvent créer des réservations',
      );
    }

    // Vérifier le dépendant si spécifié
    if (createBookingDto.dependentId) {
      const dependent = await this.prisma.dependent.findFirst({
        where: {
          id: createBookingDto.dependentId,
          userId: userId,
        },
      });

      if (!dependent) {
        throw new NotFoundException('Dépendant introuvable ou non autorisé');
      }
    }

    // Validation pour les réservations programmées
    if (createBookingDto.bookingType === BookingType.MEDICAL_APPOINTMENT) {
      if (!createBookingDto.pickupDateTime) {
        throw new BadRequestException(
          'Date et heure requises pour les réservations programmées',
        );
      }

      const scheduledDate = new Date(createBookingDto.pickupDateTime);
      const now = new Date();

      if (scheduledDate <= now) {
        throw new BadRequestException(
          'La date de réservation doit être dans le futur',
        );
      }
    }

    // Validation pour les urgences
    if (createBookingDto.bookingType === BookingType.EMERGENCY) {
      if (createBookingDto.pickupDateTime) {
        throw new BadRequestException(
          "Les réservations d'urgence ne peuvent pas avoir de date programmée",
        );
      }
    }

    try {
      const booking = await this.prisma.booking.create({
        data: {
          ...createBookingDto,
          clientId: userId,
          pickupDateTime: createBookingDto.pickupDateTime
            ? new Date(createBookingDto.pickupDateTime)
            : new Date(),
        },
        include: {
          client: {
            select: {
              firstName: true,
              lastName: true,
              phoneNumber: true,
            },
          },
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

      this.logger.log(`Booking created successfully with ID: ${booking.id}`);
      return booking;
    } catch (error) {
      this.logger.error(`Error creating booking for user ${userId}:`, error);
      throw new BadRequestException(
        'Erreur lors de la création de la réservation',
      );
    }
  }

  async findAll(userId: number, userRole: Role, filters: BookingFiltersDto) {
    this.logger.log(
      `Fetching bookings for user ${userId} with role ${userRole}`,
    );

    const {
      page = 1,
      limit = 10,
      status,
      bookingType,
      startDate,
      endDate,
    } = filters;
    const skip = (page - 1) * limit;

    // Construction des filtres de base
    interface WhereFilter {
      clientId?: number;
      assignments?: {
        some: {
          driverId: number;
        };
      };
      status?: BookingStatus;
      bookingType?: BookingType;
      createdAt?: {
        gte?: Date;
        lte?: Date;
      };
    }

    const where: WhereFilter = {};

    // Filtres par rôle
    if (userRole === Role.CLIENT) {
      where.clientId = userId;
    } else if (userRole === Role.AMBULANCE_DRIVER) {
      where.assignments = {
        some: {
          driverId: userId,
        },
      };
    }
    // Les admins et gestionnaires de flotte voient toutes les réservations

    // Filtres optionnels
    if (status) {
      where.status = status;
    }

    if (bookingType) {
      where.bookingType = bookingType;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    try {
      const [bookings, total] = await Promise.all([
        this.prisma.booking.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
          include: {
            client: {
              select: {
                firstName: true,
                lastName: true,
                phoneNumber: true,
              },
            },
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
        }),
        this.prisma.booking.count({ where }),
      ]);

      return {
        data: bookings,
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      this.logger.error(`Error fetching bookings:`, error);
      throw new BadRequestException(
        'Erreur lors de la récupération des réservations',
      );
    }
  }

  async findOne(id: number, userId: number, userRole: Role) {
    this.logger.log(`Fetching booking ${id} for user ${userId}`);

    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            firstName: true,
            lastName: true,
            phoneNumber: true,
            email: true,
          },
        },
        // dependent: true, // Relation non disponible dans le schéma actuel
        transportTickets: true,
        assignments: {
          include: {
            ambulance: {
              select: {
                id: true,
                licensePlate: true,
                model: true,
              },
            },
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

    if (!booking) {
      throw new NotFoundException('Réservation introuvable');
    }

    // Vérifier les autorisations
    if (userRole === Role.CLIENT && booking.clientId !== userId) {
      throw new ForbiddenException('Accès non autorisé à cette réservation');
    }

    if (userRole === Role.AMBULANCE_DRIVER) {
      const hasAccess =
        booking.assignments?.some(
          (assignment) => assignment.driverId === userId,
        ) || false;
      if (!hasAccess) {
        throw new ForbiddenException('Accès non autorisé à cette réservation');
      }
    }

    return booking;
  }

  async update(
    id: number,
    userId: number,
    userRole: Role,
    updateBookingDto: UpdateBookingDto,
  ) {
    this.logger.log(`Updating booking ${id} by user ${userId}`);

    const booking = await this.findOne(id, userId, userRole);

    // Vérifications de règles métier pour les mises à jour
    if (booking.status === BookingStatus.COMPLETED) {
      throw new BadRequestException(
        'Impossible de modifier une réservation terminée',
      );
    }

    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException(
        'Impossible de modifier une réservation annulée',
      );
    }

    // Seuls les clients peuvent modifier leurs propres réservations (sauf le statut)
    if (userRole === Role.CLIENT) {
      if (
        updateBookingDto.status &&
        updateBookingDto.status !== BookingStatus.CANCELLED
      ) {
        throw new ForbiddenException(
          'Les clients ne peuvent que annuler leurs réservations',
        );
      }

      if (booking.status !== BookingStatus.PENDING) {
        throw new BadRequestException(
          'Seules les réservations en attente peuvent être modifiées',
        );
      }
    }

    // Validation pour les changements de date
    if (updateBookingDto.pickupDateTime) {
      const scheduledDate = new Date(updateBookingDto.pickupDateTime);
      const now = new Date();

      if (scheduledDate <= now) {
        throw new BadRequestException(
          'La nouvelle date doit être dans le futur',
        );
      }
    }

    try {
      const updatedBooking = await this.prisma.booking.update({
        where: { id },
        data: {
          ...updateBookingDto,
          pickupDateTime: updateBookingDto.pickupDateTime
            ? new Date(updateBookingDto.pickupDateTime)
            : undefined,
        },
        include: {
          client: {
            select: {
              firstName: true,
              lastName: true,
              phoneNumber: true,
            },
          },
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

      this.logger.log(`Booking ${id} updated successfully`);
      return updatedBooking;
    } catch (error) {
      this.logger.error(`Error updating booking ${id}:`, error);
      throw new BadRequestException(
        'Erreur lors de la mise à jour de la réservation',
      );
    }
  }

  async cancel(id: number, userId: number, userRole: Role) {
    this.logger.log(`Cancelling booking ${id} by user ${userId}`);

    return this.update(id, userId, userRole, {
      status: BookingStatus.CANCELLED,
    });
  }

  async remove(id: number, userId: number, userRole: Role) {
    this.logger.log(`Deleting booking ${id} by user ${userId}`);

    // Seuls les admins peuvent supprimer des réservations
    if (userRole !== Role.ADMIN && userRole !== Role.SUPER_ADMIN) {
      throw new ForbiddenException(
        'Seuls les administrateurs peuvent supprimer des réservations',
      );
    }

    const booking = await this.prisma.booking.findUnique({
      where: { id },
    });

    if (!booking) {
      throw new NotFoundException('Réservation introuvable');
    }

    if (booking.status === BookingStatus.IN_PROGRESS) {
      throw new BadRequestException(
        'Impossible de supprimer une réservation en cours',
      );
    }

    try {
      await this.prisma.booking.delete({
        where: { id },
      });

      this.logger.log(`Booking ${id} deleted successfully`);
      return;
    } catch (error) {
      this.logger.error(`Error deleting booking ${id}:`, error);
      throw new BadRequestException(
        'Erreur lors de la suppression de la réservation',
      );
    }
  }

  async getBookingStats(userId: number, userRole: Role) {
    this.logger.log(`Getting booking stats for user ${userId}`);

    interface StatsWhereFilter {
      clientId?: number;
      assignments?: {
        some: {
          driverId: number;
        };
      };
    }

    const where: StatsWhereFilter = {};

    // Filtres par rôle
    if (userRole === Role.CLIENT) {
      where.clientId = userId;
    } else if (userRole === Role.AMBULANCE_DRIVER) {
      where.assignments = {
        some: {
          driverId: userId,
        },
      };
    }

    try {
      const [
        totalBookings,
        pendingBookings,
        confirmedBookings,
        inProgressBookings,
        completedBookings,
        cancelledBookings,
        emergencyBookings,
      ] = await Promise.all([
        this.prisma.booking.count({ where }),
        this.prisma.booking.count({
          where: { ...where, status: BookingStatus.PENDING },
        }),
        this.prisma.booking.count({
          where: { ...where, status: BookingStatus.CONFIRMED },
        }),
        this.prisma.booking.count({
          where: { ...where, status: BookingStatus.IN_PROGRESS },
        }),
        this.prisma.booking.count({
          where: { ...where, status: BookingStatus.COMPLETED },
        }),
        this.prisma.booking.count({
          where: { ...where, status: BookingStatus.CANCELLED },
        }),
        this.prisma.booking.count({
          where: { ...where, bookingType: BookingType.EMERGENCY },
        }),
      ]);

      return {
        total: totalBookings,
        byStatus: {
          pending: pendingBookings,
          confirmed: confirmedBookings,
          inProgress: inProgressBookings,
          completed: completedBookings,
          cancelled: cancelledBookings,
        },
        byType: {
          emergency: emergencyBookings,
          scheduled: totalBookings - emergencyBookings,
        },
      };
    } catch (error) {
      this.logger.error(`Error getting booking stats:`, error);
      throw new BadRequestException(
        'Erreur lors de la récupération des statistiques',
      );
    }
  }
}
