# CLAUDE.md - Packages

## Vue d'ensemble

Documentation des packages partagés d'Ambulib - Outils et composants réutilisables dans tout le monorepo.

## Packages disponibles

### 🎨 UI Package (`packages/ui/`)
**Système de design et composants React**
- Composants shadcn/ui + composants accessibles spécialisés
- Standards WCAG 2.1 Level AA pour seniors et handicapés
- Build system CSS avec Tailwind CSS 4.x
- Types TypeScript complets

📖 [Documentation complète](ui/CLAUDE.md)

```tsx
// Utilisation
import { Button, Card, EmergencyButton, SeniorCard } from "@repo/ui"
```

### ⚡ ESLint Config (`packages/eslint-config/`)
**Configuration ESLint partagée** - Standards de qualité de code unifiés dans tout le monorepo.

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
  }
}
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

### 🔧 TypeScript Config (`packages/typescript-config/`)
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
@repo/ui
├── Utilise @repo/typescript-config pour le build
├── Respecte @repo/eslint-config pour la qualité
└── Exporté vers toutes les apps

@repo/eslint-config  
├── Appliqué à @repo/ui
├── Appliqué à toutes les apps
└── Intègre règles d'accessibilité

@repo/typescript-config
├── Base pour @repo/ui
├── Base pour toutes les apps  
└── Paths mapping vers @repo/ui
```

## Utilisation dans les apps

### Installation automatique
Les packages sont automatiquement disponibles via workspace dependencies:

```json
// Dans package.json des apps
{
  "dependencies": {
    "@repo/ui": "workspace:*"
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*"  
  }
}
```

### Import et utilisation
```tsx
// Import des composants UI
import { 
  // shadcn/ui composants
  Button, Card, Input,
  // Composants accessibles
  EmergencyButton, LargeButton, AccessibleInput,
  // Utilitaires
  cn 
} from "@repo/ui"

// Import des styles (dans globals.css)
@import "@repo/ui/styles/globals.css";
@import "@repo/ui/styles.css";
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

### Développement du package UI
```bash
# Démarrer en watch mode
cd packages/ui && pnpm dev

# Build pour production  
cd packages/ui && pnpm build

# Test des composants
cd packages/ui && pnpm test
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