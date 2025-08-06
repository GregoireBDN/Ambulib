# CLAUDE.md - API Backend

## Vue d'ensemble

API backend NestJS pour Ambulib - Application de services d'ambulance.

### Architecture
- **Framework**: NestJS avec PostgreSQL/Prisma ORM
- **Authentification**: JWT + Google OAuth avec hachage Argon2
- **Base de données**: PostgreSQL avec Prisma ORM
- **Architecture modulaire** avec guards/decorators

## Modules principaux

### Auth Module (`src/auth/`)
- Authentification JWT et Google OAuth
- Stratégies de connexion multiples
- Guards pour la protection des routes
- Gestion des rôles utilisateur

### User Module (`src/user/`)
- Gestion des profils utilisateur
- Attribution des rôles (CLIENT, ADMIN, FLEET_MANAGER, AMBULANCE_DRIVER)
- Relations avec les autres entités

### Admin Module (`src/admin/`)
- Fonctions administratives
- Gestion des utilisateurs et véhicules
- Tableaux de bord et rapports globaux

### Booking Module (`src/booking/`)
- Système de réservation d'ambulances
- Gestion des informations médicales
- Intégration avec les tickets de transport

## Modèles de données clés

- **User**: Profils utilisateur avec rôles
- **Booking**: Réservations d'ambulance
- **MedicalInfo**: Informations médicales
- **TransportTicket**: Tickets de transport
- **Ambulance**: Véhicules
- **Route**: Itinéraires
- **Assignment**: Affectations

## Variables d'environnement requises

```bash
DATABASE_URL=              # PostgreSQL connection
SESSION_SECRET_KEY=        # Session encryption
BACKEND_URL=              # API base URL
JWT_SECRET=               # JWT signing
GOOGLE_CLIENT_ID=         # OAuth
GOOGLE_CLIENT_SECRET=     # OAuth
```

## Commandes de développement

```bash
# Développement
pnpm dev:api              # Démarrer l'API
pnpm studio               # Ouvrir Prisma Studio

# Base de données
npx prisma db pull        # Synchroniser le schéma
npx prisma generate       # Générer le client
npx prisma migrate dev    # Appliquer les migrations

# Tests
pnpm test:e2e            # Tests end-to-end

# Documentation
pnpm swagger             # Générer la documentation Swagger
```

## Architecture des rôles

1. **CLIENT**: Patients/tuteurs - réservations, informations médicales
2. **ADMIN**: Gestion utilisateurs, véhicules, rapports globaux
3. **FLEET_MANAGER**: Planification ambulances, affectation routes, opérations
4. **AMBULANCE_DRIVER**: Consultation planning, gestion trajets, mises à jour statut

## Points d'attention

### Accessibilité
- API doit soutenir l'interface accessible (WCAG 2.1 AA)
- Données structurées pour les lecteurs d'écran
- Réponses prévisibles et cohérentes

### Sécurité
- Validation stricte des entrées
- Protection contre les injections
- Chiffrement des données sensibles
- Audit trail des actions importantes

### Performance
- Cache intelligent pour les requêtes fréquentes
- Optimisation des requêtes Prisma
- Pagination des gros datasets
- Monitoring des temps de réponse