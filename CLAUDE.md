# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Ambulib, a full-stack application for ambulance services built as a Turborepo monorepo with three main applications:

- **API** (`apps/api`): NestJS backend with PostgreSQL database, authentication, and user management
- **Web** (`apps/web`): Next.js frontend with server-side rendering and authentication
- **Mobile** (`apps/mobile`): Expo React Native mobile application

## Development Commands

### Main Development Commands
```bash
# Start all applications in development mode
pnpm dev

# Start specific applications
pnpm dev:api    # NestJS API server
pnpm dev:web    # Next.js web application  
pnpm dev:mobile # Expo mobile app

# Build all applications
pnpm build

# Lint all code
pnpm lint

# Type checking
pnpm check-types

# Format code
pnpm format

# Run tests
pnpm test

# Run end-to-end tests
pnpm test:e2e
```

### Application-Specific Commands
```bash
# API (NestJS) - from apps/api/
pnpm dev           # Start development server
pnpm test          # Run unit tests
pnpm test:e2e      # Run end-to-end tests
pnpm test:cov      # Run tests with coverage

# Web (Next.js) - from apps/web/
pnpm dev           # Start development server
pnpm build         # Build for production
pnpm start         # Start production server
pnpm lint          # Run ESLint
pnpm check-types   # TypeScript type checking

# Mobile (Expo) - from apps/mobile/
pnpm start         # Start Expo development server
pnpm android       # Run on Android
pnpm ios           # Run on iOS
pnpm web           # Run in web browser
```

## Architecture & Key Technologies

### Monorepo (Turborepo)
- **Build System**: Turborepo for task orchestration and caching
- **Package Manager**: pnpm with workspaces
- **Task Pipeline**: Optimized build dependencies and parallel execution
- **Caching**: Intelligent caching for builds, tests, and type checking
- **Environment Variables**: Properly declared for cache invalidation

### Backend (NestJS API)
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT tokens with refresh token strategy, Google OAuth, local auth
- **Password Hashing**: Argon2
- **Architecture**: Modular NestJS with guards, decorators, and strategies
- **Key Modules**: Auth, User, Prisma service

### Frontend (Next.js Web)
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS with Radix UI components
- **Authentication**: Server actions with session management using cookies
- **State Management**: Server-side with Zod validation
- **UI Components**: Custom component library in `components/ui/`

### Mobile (Expo React Native)
- **Framework**: Expo 50 with React Native
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Navigation**: React Navigation (screens structure visible)
- **Shared UI**: Uses workspace shared UI components

### Database Schema
Key models:
- **User**: Main user entity with roles (USER, ADMIN, DRIVER, SUPER_ADMIN)
- **EmergencyContact**: User's emergency contact information
- **Dependent**: User's dependents
- **AuthProvider**: CREDENTIALS or GOOGLE authentication
- **Role-based access control** with different permission levels

## Project Structure Conventions

### Component Organization
- Shared UI components in `components/ui/` with TypeScript
- Feature-specific components organized by domain (auth, dashboard, landing)
- Each component directory includes index.ts for clean imports

### Authentication Flow
- JWT access tokens with refresh token rotation
- Session management via server-side cookies in Next.js
- Google OAuth integration available
- Role-based authorization with guards

### Environment Variables
The applications expect these environment variables:
- `DATABASE_URL`: PostgreSQL connection string  
- `SESSION_SECRET_KEY`: For session encryption
- `BACKEND_URL`: API base URL for frontend communication
- `JWT_SECRET`: JWT token signing secret
- `REFRESH_TOKEN_SECRET`: Refresh token signing secret
- `GOOGLE_CLIENT_ID`: Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Google OAuth client secret
- `CORS_ORIGIN`: CORS allowed origin
- `FRONTEND_URL`: Frontend application URL

## Development Workflow

1. **Turborepo Tasks**: Use `pnpm <command>` at root to run tasks across all packages
2. **Database Changes**: Modify `apps/api/prisma/schema.prisma` then run migrations
3. **API Development**: Use NestJS modules, guards, and decorators pattern
4. **Frontend Development**: Use server actions for form handling, Zod for validation
5. **Mobile Development**: Follow Expo conventions, use NativeWind for styling
6. **Testing**: Run `pnpm test` before commits, especially for API endpoints
7. **Build Pipeline**: Dependencies are automatically resolved by Turborepo

## Common Patterns

### API Error Handling
- Authentication guards protect routes
- Role-based access using decorators
- Prisma service handles database operations

### Frontend Form Handling
- Server actions for form submission
- Zod schemas for validation
- Error state management with FormState type

### Shared Code
- UI components shared via workspace packages (`@repo/ui`)
- TypeScript configurations shared across apps (`@repo/typescript-config`)
- ESLint configurations shared for consistency (`@repo/eslint-config`)

## Turborepo Configuration

### Task Pipeline
The `turbo.json` defines:
- **build**: Builds all applications with proper dependency order
- **dev**: Starts development servers (persistent, no cache)
- **lint**: Runs ESLint across all packages
- **test**: Runs unit tests with coverage
- **check-types**: TypeScript type checking

### Environment Variables
All required environment variables are declared in `turbo.json` for proper cache invalidation.

### Commands to Remember
```bash
# Development
pnpm dev                    # Start all apps
pnpm dev:api               # Start only API
pnpm dev:web               # Start only web app  
pnpm dev:mobile            # Start only mobile app

# Quality checks
pnpm lint                  # Lint all packages
pnpm check-types          # Type check all packages
pnpm test                 # Run all tests

# Production
pnpm build                # Build all packages
```