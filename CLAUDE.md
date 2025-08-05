# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Ambulib - Application pour services d'ambulance (Turborepo monorepo):

- **API** (`apps/api`): NestJS backend with PostgreSQL/Prisma
- **Mobile** (`apps/mobile`): Expo React Native application

## ACCESSIBILITÉ PRIORITAIRE

**CIBLE**: Personnes âgées et handicapées nécessitant des services d'ambulance

- WCAG 2.1 Level AA obligatoire
- Interface simple, intuitive et rassurante
- Support complet lecteurs d'écran et navigation clavier

## Règles de Développement

- Pas d'emoji dans le code/communication
- Tests obligatoires avant commits (80% coverage minimum)
- Toujours utiliser les composants accessibles pour la cible principale

## User Roles

1. **CLIENT**: Patients/guardians - booking, medical info, transport tickets
2. **ADMIN**: User management, vehicle management, global reports
3. **FLEET_MANAGER**: Ambulance scheduling, route assignment, operations
4. **AMBULANCE_DRIVER**: Schedule consultation, ride management, status updates

## Development Commands

```bash
# Main commands
pnpm dev          # Start all apps
pnpm dev:api      # NestJS API only
pnpm dev:mobile   # Expo mobile only

# Quality checks (REQUIRED before commits)
pnpm test         # Run tests (80% coverage minimum)
pnpm test:e2e     # E2E tests for API changes
pnpm lint         # ESLint
pnpm check-types  # TypeScript checking
pnpm build        # Build all apps

# Additional utilities
pnpm format       # Format code with Prettier
pnpm studio       # Open Prisma Studio
pnpm swagger      # Generate Swagger documentation
pnpm full-stack   # Run full stack development
```

## Tech Stack

### Backend (apps/api)

- NestJS with PostgreSQL/Prisma ORM
- JWT auth + Google OAuth, Argon2 hashing
- Modular architecture with guards/decorators
- Key modules: Auth, User, Admin, Booking

### Mobile (apps/mobile)

- Expo React Native application
- TailwindCSS with NativeWind for styling
- Navigation with React Navigation

### API Modules Overview

- **Auth**: Authentication with JWT/Google OAuth, role-based access
- **User**: User profile management, role assignments
- **Admin**: Administrative functions, user/vehicle management
- **Booking**: Ambulance booking system with medical information
- **Prisma**: Database service layer

### Key Database Models

User, Booking, MedicalInfo, TransportTicket, Ambulance, Route, Assignment

## Important Environment Variables

```bash
DATABASE_URL=              # PostgreSQL connection
SESSION_SECRET_KEY=        # Session encryption
BACKEND_URL=              # API base URL
JWT_SECRET=               # JWT signing
GOOGLE_CLIENT_ID=         # OAuth
GOOGLE_CLIENT_SECRET=     # OAuth
```

## Mobile Components Architecture

### Component Structure

```
apps/mobile/src/
├── components/
│   └── common/
│       └── Button.tsx          # Accessible button component
├── screens/
│   ├── HomeScreen.tsx
│   └── public/
│       ├── signinScreen/
│       └── signupScreen/
├── navigation/
│   └── AppNavigator.tsx        # React Navigation setup
└── assets/
    └── img/                    # App assets and logos
```

### Accessibility Guidelines for Mobile

- **Touch Target Size**: Minimum 44pt for all interactive elements
- **Screen Reader Support**: VoiceOver/TalkBack compatibility
- **High Contrast**: Support for system accessibility settings
- **Voice Control**: Compatible with voice navigation
- **Simple Navigation**: Intuitive flow for elderly users

### Mobile Development Best Practices

1. **Accessibility First**: Always implement WCAG 2.1 AA standards
2. **Platform Conventions**: Follow iOS/Android design guidelines
3. **Performance**: Optimize for older devices commonly used by seniors
4. **Offline Support**: Essential features work without internet
5. **Large Text**: Support dynamic type sizing

## Turborepo Configuration

### Task Pipeline

The `turbo.json` defines:

- **build**: Builds all applications with proper dependency order
- **dev**: Starts development servers (persistent, no cache)
- **start:dev**: Alternative development command for API
- **start**: Start command for mobile app
- **lint**: Runs ESLint across all packages
- **test**: Runs unit tests with coverage
- **test:e2e**: End-to-end testing
- **check-types**: TypeScript type checking

### Environment Variables

All required environment variables are declared in `turbo.json` for proper cache invalidation:
`NODE_ENV`, `DATABASE_URL`, `BACKEND_URL`, `JWT_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `SESSION_SECRET_KEY`

### Commands to Remember

```bash
# Development
pnpm dev                    # Start all apps
pnpm dev:api               # Start only API
pnpm dev:mobile            # Start only mobile app

# Quality checks
pnpm lint                  # Lint all packages
pnpm check-types          # Type check all packages
pnpm test                 # Run all tests
pnpm test:e2e             # Run e2e tests

# Production
pnpm build                # Build all packages

# Utilities
pnpm format               # Format with Prettier
pnpm studio               # Prisma Studio
pnpm swagger              # API documentation
```
