import { PrismaClient, Role, CompanyStatus, BookingStatus, BookingType, AmbulanceStatus, SpecialRequirements } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Créer des compagnies d'ambulance
  const company1 = await prisma.company.create({
    data: {
      name: 'Ambulances Paris Nord',
      licenseNumber: 'AMB-75-001',
      address: '123 Rue de la Santé, 75018 Paris',
      phoneNumber: '01 42 85 90 00',
      email: 'contact@amb-paris-nord.fr',
      status: CompanyStatus.APPROVED,
    },
  });

  const company2 = await prisma.company.create({
    data: {
      name: 'Services Médicaux Lyon',
      licenseNumber: 'AMB-69-002',
      address: '456 Avenue de la République, 69003 Lyon',
      phoneNumber: '04 72 11 22 33',
      email: 'info@sml-lyon.fr',
      status: CompanyStatus.APPROVED,
    },
  });

  // 2. Créer des utilisateurs avec mots de passe hashés
  const hashedPassword = await argon2.hash('password123');

  // Admin de la compagnie 1
  const admin1 = await prisma.user.create({
    data: {
      email: 'admin@amb-paris-nord.fr',
      password: hashedPassword,
      firstName: 'Marie',
      lastName: 'Dupont',
      phoneNumber: '06 12 34 56 78',
      address: '15 Rue de Rivoli, 75001 Paris',
      role: Role.ADMIN,
      companyId: company1.id,
      isProfileComplete: true,
      city: 'Paris',
      postalCode: '75001',
    },
  });

  // Gestionnaire de flotte
  const fleetManager = await prisma.user.create({
    data: {
      email: 'fleet@amb-paris-nord.fr',
      password: hashedPassword,
      firstName: 'Pierre',
      lastName: 'Martin',
      phoneNumber: '06 98 76 54 32',
      address: '45 Boulevard Saint-Germain, 75005 Paris',
      role: Role.FLEET_MANAGER,
      companyId: company1.id,
      isProfileComplete: true,
      city: 'Paris',
      postalCode: '75005',
    },
  });

  // Conducteurs d'ambulance
  const driver1 = await prisma.user.create({
    data: {
      email: 'driver1@amb-paris-nord.fr',
      password: hashedPassword,
      firstName: 'Jean',
      lastName: 'Leroy',
      phoneNumber: '06 11 22 33 44',
      address: '89 Rue de la Paix, 75009 Paris',
      role: Role.AMBULANCE_DRIVER,
      companyId: company1.id,
      isProfileComplete: true,
      city: 'Paris',
      postalCode: '75009',
    },
  });

  const driver2 = await prisma.user.create({
    data: {
      email: 'driver2@amb-paris-nord.fr',
      password: hashedPassword,
      firstName: 'Sophie',
      lastName: 'Bernard',
      phoneNumber: '06 55 66 77 88',
      address: '12 Avenue des Champs-Élysées, 75008 Paris',
      role: Role.AMBULANCE_DRIVER,
      companyId: company2.id,
      isProfileComplete: true,
      city: 'Lyon',
      postalCode: '69003',
    },
  });

  // Clients
  const client1 = await prisma.user.create({
    data: {
      email: 'cliente.senior@gmail.com',
      password: hashedPassword,
      firstName: 'Françoise',
      lastName: 'Moreau',
      phoneNumber: '01 45 67 89 01',
      address: '78 Rue du Faubourg Saint-Antoine, 75011 Paris',
      role: Role.CLIENT,
      age: 78,
      isProfileComplete: true,
      city: 'Paris',
      postalCode: '75011',
    },
  });

  const client2 = await prisma.user.create({
    data: {
      email: 'client.famille@gmail.com',
      password: hashedPassword,
      firstName: 'Robert',
      lastName: 'Dubois',
      phoneNumber: '04 78 90 12 34',
      address: '33 Place Bellecour, 69002 Lyon',
      role: Role.CLIENT,
      age: 65,
      isProfileComplete: true,
      city: 'Lyon',
      postalCode: '69002',
    },
  });

  // 3. Créer des informations médicales
  await prisma.medicalInfo.create({
    data: {
      userId: client1.id,
      allergies: 'Pénicilline, Aspirine',
      medications: 'Cardioton 5mg (matin), Doliprane (selon douleur)',
      medicalConditions: 'Hypertension artérielle, Arthrose genoux',
      doctorName: 'Dr. Laurent Rousseau',
      doctorPhone: '01 42 75 38 29',
      insuranceNumber: '1 45 12 75 123 456 78',
    },
  });

  await prisma.medicalInfo.create({
    data: {
      userId: client2.id,
      allergies: 'Aucune allergie connue',
      medications: 'Metformine 500mg (2x/jour)',
      medicalConditions: 'Diabète type 2',
      doctorName: 'Dr. Anne Petit',
      doctorPhone: '04 72 33 44 55',
      insuranceNumber: '1 58 09 69 234 567 89',
    },
  });

  // 4. Créer des contacts d'urgence
  await prisma.emergencyContact.create({
    data: {
      userId: client1.id,
      firstName: 'Michel',
      lastName: 'Moreau',
      phoneNumber: '06 23 45 67 89',
      email: 'michel.moreau@gmail.com',
      relationship: 'Fils',
    },
  });

  await prisma.emergencyContact.create({
    data: {
      userId: client2.id,
      firstName: 'Catherine',
      lastName: 'Dubois',
      phoneNumber: '06 87 65 43 21',
      email: 'catherine.dubois@outlook.fr',
      relationship: 'Épouse',
    },
  });

  // 5. Créer des personnes à charge
  await prisma.dependent.create({
    data: {
      userId: client2.id,
      firstName: 'Marie',
      lastName: 'Dubois',
      age: 23,
      address: '33 Place Bellecour, 69002 Lyon',
      city: 'Lyon',
      postalCode: '69002',
      phoneNumber: '06 12 98 76 54',
    },
  });

  // 6. Créer des ambulances
  const ambulance1 = await prisma.ambulance.create({
    data: {
      licensePlate: 'AB-123-CD',
      vehicleModel: 'Mercedes Sprinter Ambulance',
      vehicleYear: 2021,
      capacity: 2,
      status: AmbulanceStatus.AVAILABLE,
      companyId: company1.id,
      driverId: driver1.id,
    },
  });

  const ambulance2 = await prisma.ambulance.create({
    data: {
      licensePlate: 'EF-456-GH',
      vehicleModel: 'Renault Master Ambulance',
      vehicleYear: 2020,
      capacity: 3,
      status: AmbulanceStatus.AVAILABLE,
      companyId: company2.id,
      driverId: driver2.id,
    },
  });

  const ambulance3 = await prisma.ambulance.create({
    data: {
      licensePlate: 'IJ-789-KL',
      vehicleModel: 'Ford Transit Ambulance',
      vehicleYear: 2022,
      capacity: 2,
      status: AmbulanceStatus.MAINTENANCE,
      companyId: company1.id,
    },
  });

  // 7. Créer des réservations
  const booking1 = await prisma.booking.create({
    data: {
      clientId: client1.id,
      pickupAddress: '78 Rue du Faubourg Saint-Antoine, 75011 Paris',
      destinationAddress: 'Hôpital Pitié-Salpêtrière, 47-83 Bd de l\'Hôpital, 75013 Paris',
      pickupCity: 'Paris',
      destinationCity: 'Paris',
      scheduledDateTime: new Date('2025-08-22T10:30:00'),
      status: BookingStatus.CONFIRMED,
      bookingType: BookingType.SCHEDULED,
      specialRequirements: [SpecialRequirements.NEEDS_LYING_TRANSPORT],
      notes: 'Patient nécessite un brancard pour le transport. Rendez-vous cardiologie.',
      estimatedDuration: 120,
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      clientId: client2.id,
      pickupAddress: '33 Place Bellecour, 69002 Lyon',
      destinationAddress: 'Centre Hospitalier Lyon Sud, 165 Chem. du Grand Revoyet, 69310 Pierre-Bénite',
      pickupCity: 'Lyon',
      destinationCity: 'Pierre-Bénite',
      scheduledDateTime: new Date('2025-08-23T14:00:00'),
      status: BookingStatus.CONFIRMED,
      bookingType: BookingType.SCHEDULED,
      specialRequirements: [SpecialRequirements.MEDICATIONS],
      notes: 'Transport pour dialyse programmée. Patient diabétique.',
      estimatedDuration: 90,
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      clientId: client1.id,
      pickupAddress: '78 Rue du Faubourg Saint-Antoine, 75011 Paris',
      destinationAddress: 'Clinique Saint-Louis, 1 Av. Claude Vellefaux, 75010 Paris',
      pickupCity: 'Paris',
      destinationCity: 'Paris',
      scheduledDateTime: new Date('2025-08-25T09:15:00'),
      status: BookingStatus.PENDING,
      bookingType: BookingType.SCHEDULED,
      notes: 'Transfer pour examens complémentaires.',
      estimatedDuration: 60,
    },
  });

  // 8. Créer des affectations
  await prisma.assignment.create({
    data: {
      bookingId: booking1.id,
      ambulanceId: ambulance1.id,
      driverId: driver1.id,
      createdById: admin1.id,
      startedAt: new Date('2025-08-22T10:25:00'),
    },
  });

  await prisma.assignment.create({
    data: {
      bookingId: booking2.id,
      ambulanceId: ambulance2.id,
      driverId: driver2.id,
      createdById: fleetManager.id,
    },
  });

  // 9. Créer des tickets de transport
  await prisma.transportTicket.create({
    data: {
      bookingId: booking1.id,
      ticketNumber: 'TKT-2025-001',
      ticketType: 'MEDICAL_TRANSPORT',
      validUntil: new Date('2025-08-22T23:59:59'),
      isUsed: false,
    },
  });

  await prisma.transportTicket.create({
    data: {
      bookingId: booking2.id,
      ticketNumber: 'TKT-2025-002',
      ticketType: 'SCHEDULED_TRANSPORT',
      validUntil: new Date('2025-08-23T23:59:59'),
      isUsed: false,
    },
  });


  console.log('✅ Seed completed successfully!');
  console.log(`📊 Created:
  - ${2} Companies
  - ${6} Users (1 Admin, 1 Fleet Manager, 2 Drivers, 2 Clients)
  - ${2} Medical Info records
  - ${2} Emergency Contacts
  - ${1} Dependent
  - ${3} Ambulances
  - ${3} Bookings
  - ${2} Assignments
  - ${2} Transport Tickets`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });