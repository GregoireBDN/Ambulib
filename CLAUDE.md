# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

Ambulib - Application pour services d'ambulance (Turborepo monorepo):
- **API** (`apps/api`): NestJS backend with PostgreSQL/Prisma
- **Web** (`apps/web`): Next.js frontend with authentication and dashboards
- **Mobile** (`apps/mobile`): Expo React Native for ambulance drivers

## ACCESSIBILITÉ PRIORITAIRE

**CIBLE**: Personnes âgées et handicapées nécessitant des services d'ambulance
- WCAG 2.1 Level AA obligatoire
- Interface simple, intuitive et rassurante
- Support complet lecteurs d'écran et navigation clavier

### Composants Accessibles Disponibles
```
@repo/ui/components/accessible/
├── LargeButton.tsx (44px+, contraste élevé)
├── AccessibleInput.tsx (ARIA complet)
├── EmergencyButton.tsx (double confirmation)
└── AccessibleChart.tsx (alternatives textuelles)
```

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
pnpm dev:web      # Next.js web only
pnpm dev:mobile   # Expo mobile only

# Quality checks (REQUIRED before commits)
pnpm test         # Run tests (80% coverage minimum)
pnpm test:e2e     # E2E tests for API changes
pnpm lint         # ESLint
pnpm check-types  # TypeScript checking
pnpm build        # Build all apps
```

## Tech Stack

### Backend (apps/api)
- NestJS with PostgreSQL/Prisma ORM
- JWT auth + Google OAuth, Argon2 hashing
- Modular architecture with guards/decorators

### Frontend (apps/web)  
- Next.js 15 App Router + TailwindCSS
- Recharts for data visualization
- Server actions + Zod validation

### Mobile (apps/mobile)
- Expo 50 + React Native
- NativeWind styling + React Navigation

### Key Database Models
User, Booking, MedicalInfo, TransportTicket, Ambulance, Route, Assignment

## shadcn/ui & Component System

### Structure
```
packages/ui/src/
├── components/ui/          # shadcn/ui components
├── components/accessible/  # Accessible components for target users
└── lib/utils.ts           # Shared utilities
```

### Usage
```typescript
// Standard components
import { Button, Card } from "@repo/ui"

// Accessible components (for seniors/handicapped)
import { LargeButton, AccessibleInput } from "@repo/ui"
```

### Adding Components
```bash
cd packages/ui
npx shadcn@latest add [component-name]
```

## Important Environment Variables
```bash
DATABASE_URL=              # PostgreSQL connection
SESSION_SECRET_KEY=        # Session encryption
BACKEND_URL=              # API base URL
JWT_SECRET=               # JWT signing
GOOGLE_CLIENT_ID=         # OAuth
GOOGLE_CLIENT_SECRET=     # OAuth
```

## shadcn/ui Component System

### Architecture
- **Shared UI Package**: `packages/ui` contains all shadcn/ui components and accessible components
- **shadcn/ui CLI**: Fully configured and functional in `packages/ui/`
- **Path Mapping**: `@repo/ui/*` points to shared components across all apps
- **Component Structure**:
  ```
  packages/ui/src/
  ├── components/ui/          # shadcn/ui components
  ├── components/accessible/  # Custom accessible components
  ├── lib/utils.ts           # Shared utilities (cn function)
  └── styles/globals.css     # Design tokens and CSS variables
  ```

### Usage Guidelines

#### Adding New shadcn/ui Components
```bash
cd packages/ui
npx shadcn@latest add [component-name]
```

#### Importing Components in Apps
```typescript
// Standard shadcn/ui components
import { Button, Card, Input } from "@repo/ui"

// Accessible components (for seniors/handicapped users)
import { LargeButton, AccessibleInput, EmergencyButton } from "@repo/ui"

// Utilities
import { cn } from "@repo/ui/lib/utils"
```

#### Component Categories

**Standard UI Components** (`@repo/ui/components/ui`):
- Core: Button, Card, Input, Label, Textarea
- Forms: Checkbox, Select, Progress, Separator  
- Charts: AreaChart, BarChart, LineChart, PieChart, ChartContainer
- Layout: Alert Dialog (and other components added via CLI)

**Accessible Components** (`@repo/ui/components/accessible`):
- LargeButton: WCAG-compliant buttons (44px+ minimum)
- AccessibleInput: Enhanced form inputs with proper ARIA
- EmergencyButton: Critical action button with double confirmation
- SeniorCard: Senior-friendly card layout
- AccessibleChart: Charts with text alternatives

#### Configuration Files
- `packages/ui/components.json`: shadcn/ui configuration
- `packages/ui/tsconfig.json`: TypeScript configuration with proper path mapping
- Apps reference shared components via `@repo/ui/*` path mapping

#### Development Best Practices
1. **Never modify** shadcn/ui components directly - use composition or extend them
2. **Use accessible variants** for senior/handicapped users (LargeButton vs Button)
3. **Follow design tokens** defined in `packages/ui/src/styles/globals.css`
4. **Test CLI functionality** after any configuration changes
5. **Maintain separation**: Keep Next.js-specific components in apps, not in packages/ui

#### Design System Integration
- **CSS Variables**: All components use CSS custom properties for theming
- **Consistent Spacing**: Uses Tailwind design tokens
- **Color System**: Semantic color naming (primary, secondary, muted, etc.)
- **Responsive Design**: Mobile-first approach with proper breakpoints
- **Dark Mode Ready**: CSS variables support automatic theme switching

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