# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Ambulib - Application pour services d'ambulance (Turborepo monorepo):

- **API** (`apps/api`): NestJS backend with PostgreSQL/Prisma → [📖 API Documentation](apps/api/CLAUDE.md)
- **Mobile** (`apps/mobile`): Expo React Native application → [📱 Mobile Documentation](apps/mobile/CLAUDE.md)
- **Client** (`apps/client`): Next.js app for patients/guardians → [👥 Client Documentation](apps/client/CLAUDE.md)
- **Fleet** (`apps/fleet`): Next.js app for fleet managers → [🚗 Fleet Documentation](apps/fleet/CLAUDE.md)
- **Admin** (`apps/admin`): Next.js app for administrators → [⚙️ Admin Documentation](apps/admin/CLAUDE.md)
- **UI** (`packages/ui`): Shared React components with shadcn/ui → [🎨 UI Documentation](packages/ui/CLAUDE.md)

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
pnpm dev          # Start all apps (note: UI package will run in watch mode)
pnpm dev:api      # NestJS API only
pnpm dev:mobile   # Expo mobile only
pnpm turbo dev --filter=client   # Client app only
pnpm turbo dev --filter=fleet    # Fleet manager app only
pnpm turbo dev --filter=admin    # Admin app only

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

## Tech Stack Overview

- **Backend**: NestJS + PostgreSQL/Prisma ORM + JWT/OAuth
- **Mobile**: Expo React Native + NativeWind + React Navigation
- **Web Apps**: Next.js 15 + App Router + TypeScript + Tailwind CSS 4.x
- **UI Package**: React + shadcn/ui + Custom Accessible Components
- **Monorepo**: Turborepo with shared dependencies and build pipeline

> 📚 **Detailed technical information** is available in each project's CLAUDE.md file

## Important Environment Variables

```bash
DATABASE_URL=              # PostgreSQL connection
SESSION_SECRET_KEY=        # Session encryption
BACKEND_URL=              # API base URL
JWT_SECRET=               # JWT signing
GOOGLE_CLIENT_ID=         # OAuth
GOOGLE_CLIENT_SECRET=     # OAuth
```

## Quick Reference

### Working on specific projects

- **API Backend**: See [apps/api/CLAUDE.md](apps/api/CLAUDE.md) for modules, authentication, database models
- **Mobile App**: See [apps/mobile/CLAUDE.md](apps/mobile/CLAUDE.md) for React Native, accessibility, navigation
- **Client Interface**: See [apps/client/CLAUDE.md](apps/client/CLAUDE.md) for senior-focused UI, accessibility features
- **Fleet Management**: See [apps/fleet/CLAUDE.md](apps/fleet/CLAUDE.md) for operations dashboard, real-time features
- **Admin Panel**: See [apps/admin/CLAUDE.md](apps/admin/CLAUDE.md) for user management, system configuration
- **UI Components**: See [packages/ui/CLAUDE.md](packages/ui/CLAUDE.md) for shadcn/ui setup, accessible components
- **Shared Packages**: See [packages/CLAUDE.md](packages/CLAUDE.md) for ESLint config, TypeScript config, and UI package overview

## Monorepo Structure

```
ambulib/
├── apps/
│   ├── api/           # NestJS Backend + PostgreSQL
│   ├── mobile/        # Expo React Native
│   ├── client/        # Next.js Patient Interface
│   ├── fleet/         # Next.js Fleet Management
│   └── admin/         # Next.js Admin Panel
├── packages/          # Shared packages → [📦 Packages Documentation](packages/CLAUDE.md)
│   ├── ui/           # Shared Components (shadcn/ui + Accessible)
│   ├── eslint-config/        # ESLint configuration partagée
│   └── typescript-config/    # TypeScript configuration partagée
└── turbo.json        # Monorepo build configuration
```

### Key Commands

```bash
# Start all in development
pnpm dev

# Start individual apps
pnpm dev:api                    # Backend only
pnpm turbo dev --filter=client  # Client app only
pnpm turbo dev --filter=fleet   # Fleet app only
pnpm turbo dev --filter=admin   # Admin app only

# Quality assurance (REQUIRED before commits)
pnpm test && pnpm lint && pnpm check-types && pnpm build
```
