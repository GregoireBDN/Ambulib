# CLAUDE.md - Packages

## Vue d'ensemble

Documentation des packages partagés de HavRid - Outils et composants réutilisables dans tout le monorepo.

## Packages disponibles

### 🎨 UI Package (`packages/ui/`) ✅ COMPLET

**Système de design et composants React de base**

- 16 composants shadcn/ui + composants d'authentification
- Système de couleurs OKLCH scientifique pour accessibilité médicale
- Tailwind CSS 4.x avec CSS-first configuration (`theme.css`)
- Storybook intégré avec tests d'accessibilité automatisés
- Architecture TypeScript complète avec 80%+ coverage

📖 [Documentation complète](ui/CLAUDE.md)

```tsx
// Utilisation - Composants de base
import { Button, Card, Input, Label } from "@repo/ui";
```

### ♿ UI Accessible Package (`packages/ui-accessible/`) ✅ NOUVEAU

**Composants accessibles spécialisés pour seniors et personnes handicapées**

- 9 composants ultra-accessibles pour l'app client uniquement
- Standards WCAG 2.1 Level AA dépassés (AAA quand possible)
- Focus indicators renforcés, tailles tactiles généreuses
- Tests d'accessibilité automatisés avec axe-core
- Storybook dédié sur port 6007

📖 [Documentation complète](ui-accessible/CLAUDE.md)

```tsx
// Utilisation - App client uniquement
import { EmergencyButton, SeniorCard, AccessibleForm } from "@repo/ui-accessible";
```

### ⚡ ESLint Config (`packages/eslint-config/`) ✅ COMPLET

**Configuration ESLint partagée** - Standards de qualité unifiés dans tout le monorepo.

**Configuration principale (`next.js`):**

```javascript
module.exports = {
  extends: ["next/core-web-vitals", "prettier"],
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/no-unescaped-entities": "off",
    "react/jsx-key": "error",
  },
};
```

**Utilisation dans les projets:**

```json
// .eslintrc.json
{
  "extends": ["@repo/eslint-config/next"]
}
```

**Fonctionnalités:**

- Intégration TypeScript + React + Next.js
- Règles d'accessibilité automatiques via Next.js core-web-vitals
- Compatible Prettier pour éviter conflits formatage
- Support jsx-a11y pour validation ARIA et accessibilité

### 🔧 TypeScript Config (`packages/typescript-config/`) ✅ COMPLET

**Configurations TypeScript partagées** - Standards de compilation cohérents pour tout le monorepo.

**Configuration de base (`base.json`):**

```json
{
  "compilerOptions": {
    "strict": true,
    "declaration": true,
    "declarationMap": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

**Configuration Next.js (`nextjs.json`):**

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "target": "ES2017",
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@repo/ui": ["../../packages/ui/src"]
    }
  }
}
```

**Utilisation dans les projets:**

```json
// Next.js apps
{
  "extends": "@repo/typescript-config/nextjs"
}

// Packages Node.js
{
  "extends": "@repo/typescript-config/base"
}
```

**Fonctionnalités:**

- Mode strict pour sécurité maximale des types
- Path mapping automatique (`@/*`, `@repo/ui`)
- Compilation incrémentale pour builds rapides
- Support complet Next.js et React 19

## Architecture des packages

### Principe de conception

- **Réutilisabilité**: Utilisables dans toutes les apps du monorepo
- **Cohérence**: Standards unifiés pour tout le projet
- **Accessibilité**: WCAG 2.1 Level AA intégré par défaut
- **Performance**: Build optimisé et tree-shaking

### Relations entre packages

```
@repo/ui (Composants de base)
├── Utilise @repo/typescript-config pour le build
├── Respecte @repo/eslint-config pour la qualité
└── Exporté vers toutes les apps

@repo/ui-accessible (Composants seniors)
├── Hérite de @repo/ui pour les utilitaires et styles de base
├── Utilise @repo/typescript-config pour le build
├── Respecte @repo/eslint-config pour la qualité
└── Exporté vers l'app client uniquement

@repo/eslint-config
├── Appliqué à @repo/ui et @repo/ui-accessible
├── Appliqué à toutes les apps
└── Intègre règles d'accessibilité

@repo/typescript-config
├── Base pour @repo/ui et @repo/ui-accessible
├── Base pour toutes les apps
└── Paths mapping vers les packages UI
```

## Utilisation dans les apps

### Installation automatique

Les packages sont automatiquement disponibles via workspace dependencies:

```json
// Dans package.json de toutes les apps
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*"
  }
}

// Dans package.json de l'app client uniquement
{
  "dependencies": {
    "@repo/ui": "workspace:*",
    "@repo/ui-accessible": "workspace:*"
  }
}
```

### Import et utilisation

```tsx
// Import des composants UI de base (toutes les apps)
import {
  // shadcn/ui composants
  Button, Card, Input, Label,
  // Composants auth
  SignInForm, SignUpForm,
  // Utilitaires
  cn
} from "@repo/ui"

// Import des composants accessibles (app client uniquement)
import {
  EmergencyButton, SeniorCard, AccessibleForm,
  MedicalInput, AnnouncementRegion, FormStepProgress
} from "@repo/ui-accessible"

// Import des styles (dans globals.css de chaque app)
@import "tailwindcss";
@import "@repo/ui/styles/theme.css";
@import "@repo/ui/styles/globals.css";

// App client uniquement - styles accessibilité renforcée
@import "@repo/ui-accessible/src/styles/globals.css";
```

## Développement des packages

### Commandes globales

```bash
# Build tous les packages
pnpm turbo build --filter=./packages/*

# Lint tous les packages
pnpm turbo lint --filter=./packages/*

# Test tous les packages
pnpm turbo test --filter=./packages/*
```

### Développement des packages UI

```bash
# Package UI de base
cd packages/ui && pnpm dev          # Watch mode
cd packages/ui && pnpm storybook    # Storybook port 6006
cd packages/ui && pnpm test         # Tests

# Package UI accessible
cd packages/ui-accessible && pnpm dev          # Watch mode  
cd packages/ui-accessible && pnpm storybook    # Storybook port 6007
cd packages/ui-accessible && pnpm test         # Tests + a11y

# Storybook global depuis la racine
pnpm storybook                      # Lance les deux Storybooks
pnpm storybook:ui                   # UI de base uniquement
pnpm storybook:ui-accessible        # Accessibles uniquement
```

## Standards qualité

### Tests obligatoires

- **Composants UI**: Tests de rendu et accessibilité
- **ESLint Config**: Validation sur exemples de code
- **TypeScript Config**: Compilation sans erreur

### Coverage requirements

- **UI Package**: 80% minimum
- **Config Packages**: 90% minimum (plus simple à tester)

### Accessibilité

- Tests automatisés avec `@testing-library/jest-dom`
- Validation manuelle avec lecteurs d'écran
- Conformité WCAG 2.1 Level AA vérifiée

## Versioning et publication

### Stratégie de versions

- **Semantic Versioning**: MAJOR.MINOR.PATCH
- **Synchronized releases**: Tous les packages versionnés ensemble
- **Breaking changes**: Documentation et migration guide

### Workflow de mise à jour

1. Développement dans feature branch
2. Tests sur toutes les apps consommatrices
3. Update version dans package.json
4. Documentation des changements
5. Merge et deploy coordonnés

## Bonnes pratiques

### Ajout de nouveaux packages

1. Créer dans `packages/nom-package/`
2. Ajouter `CLAUDE.md` avec documentation complète
3. Configurer build dans `turbo.json`
4. Ajouter aux apps consommatrices
5. Mettre à jour ce fichier packages/CLAUDE.md

### Maintenance

- **Review mensuelle** des dépendances
- **Update coordonnée** des versions
- **Monitoring** de l'usage dans les apps
- **Performance audit** régulier

### Guidelines contribution

- Suivre les standards définis dans `eslint-config`
- Tester sur toutes les plateformes cibles
- Documenter les breaking changes
- Maintenir compatibilité ascendante quand possible
