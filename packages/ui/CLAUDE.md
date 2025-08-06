# CLAUDE.md - UI Package

## Vue d'ensemble

Package de composants UI partagé pour Ambulib - Système de design unifié avec composants accessibles et shadcn/ui.

### Objectif
Fournir une bibliothèque de composants réutilisables qui:
- Respecte les standards d'accessibilité WCAG 2.1 Level AA
- Offre une expérience optimale pour les seniors et personnes handicapées
- Maintient une cohérence visuelle dans tout le monorepo
- Intègre les meilleurs composants shadcn/ui

## Stack technique

- **Framework**: React 19 avec TypeScript
- **Styling**: Tailwind CSS 4.x avec CSS Variables
- **Base Components**: shadcn/ui + Radix UI primitives
- **Accessibilité**: Composants spécialisés sur-mesure
- **Build**: Concurrent build (TypeScript + CSS)

## Architecture des composants

### Structure du package
```
packages/ui/src/
├── components/
│   ├── ui/                     # Composants shadcn/ui de base
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   └── accessible/             # Composants accessibles spécialisés
│       ├── EmergencyButton.tsx
│       ├── LargeButton.tsx
│       ├── AccessibleInput.tsx
│       └── SeniorCard.tsx
├── lib/
│   └── utils.ts               # Utilitaires (cn, etc.)
└── styles/
    ├── styles.css             # Point d'entrée CSS
    └── globals.css            # Variables et styles de base
```

### Système d'exports
```typescript
// Export principal du package
export * from "./components/ui"
export * from "./components/accessible"
export { cn } from "./lib/utils"

// Exports individuels pour tree-shaking optimal
export { Button, buttonVariants } from "./components/ui/button"
export { EmergencyButton } from "./components/accessible/EmergencyButton"
```

## Composants shadcn/ui

### Composants de base disponibles
- **Button**: Bouton avec variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Système de cartes avec Header, Content, Footer
- **Input**: Champs de saisie avec états focus et validation

### Configuration shadcn/ui
```json
{
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/styles/globals.css",
    "baseColor": "zinc",
    "cssVariables": true
  }
}
```

### Styles avec CSS Variables
```css
/* Styles générés automatiquement */
.bg-primary {
  background-color: hsl(var(--primary));
}

.hover\:bg-primary\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
```

## Composants accessibles spécialisés

### `EmergencyButton`
Bouton d'urgence haute visibilité pour situations critiques:
```tsx
<EmergencyButton>
  🚨 URGENCE
</EmergencyButton>
```
- Taille minimale 60x200px
- Animation pulse discrète
- Focus ring ultra-visible (ring-4, offset-4)
- Couleurs rouge haute visibilité

### `LargeButton`
Bouton de grande taille pour faciliter l'interaction:
```tsx
<LargeButton variant="secondary">
  Action importante
</LargeButton>
```
- Taille minimale 44x44px (WCAG AA)
- Texte 18px avec espacement des lettres
- Extend du Button shadcn/ui avec améliorations

### `AccessibleInput`
Champ de saisie avec labels et descriptions intégrés:
```tsx
<AccessibleInput
  label="Votre nom complet"
  description="Entrez votre nom et prénom"
  placeholder="Ex: Marie Dupont"
/>
```
- Labels toujours visibles
- Descriptions contextuelles
- États d'erreur avec aria-invalid
- Taille généreuse (48px de hauteur)

### `SeniorCard`
Carte optimisée pour les seniors:
```tsx
<SeniorCard 
  title="Titre de la carte"
  description="Description claire"
>
  <p>Contenu de la carte</p>
</SeniorCard>
```
- Bordures épaisses (border-2)
- Ombres marquées pour la profondeur
- Texte large et espacé
- Focus-within visible

## Système de styles

### CSS Variables (Design Tokens)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --destructive: 0 84.2% 60.2%;
  --border: 214.3 31.8% 91.4%;
  --radius: 0.5rem;
}
```

### Styles d'accessibilité intégrés
```css
/* Focus indicators toujours visibles */
*:focus-visible {
  outline: 2px solid hsl(222.2 47.4% 11.2%);
  outline-offset: 2px;
}

/* Support contraste élevé */
@media (prefers-contrast: high) {
  :root {
    --border: 0 0% 20%;
    --ring: 222.2 84% 4.9%;
  }
}

/* Réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Build et développement

### Scripts disponibles
```bash
# Développement avec watch mode
pnpm dev                    # TypeScript + CSS watch
pnpm dev:styles            # CSS watch uniquement

# Build de production
pnpm build                 # TypeScript + CSS build
pnpm build:styles          # CSS build uniquement

# Qualité
pnpm lint                  # ESLint
pnpm check-types          # TypeScript check
```

### Configuration Tailwind CSS 4.x
```typescript
// tailwind.config.ts
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // Configuration automatique avec CSS Variables
} satisfies Config
```

## Utilisation dans les apps

### Import des composants
```tsx
// Dans les applications du monorepo
import { 
  // shadcn/ui composants
  Button, 
  Card, 
  Input,
  // Composants accessibles
  EmergencyButton,
  LargeButton,
  AccessibleInput,
  SeniorCard,
  // Utilitaires
  cn 
} from "@repo/ui"
```

### Import des styles
```css
/* Dans app/globals.css */
@import "tailwindcss";
@import "@repo/ui/styles/globals.css";
@import "@repo/ui/styles.css";
```

## Guidelines d'utilisation

### Quand utiliser quoi
- **Composants shadcn/ui**: Interfaces standard, composants de base
- **Composants accessibles**: Interface client seniors, situations d'urgence
- **Mix des deux**: Parfaitement compatible, utiliser selon le contexte

### Bonnes pratiques
- Toujours inclure les styles CSS du package
- Utiliser `cn()` pour combiner les classes CSS
- Tester avec lecteurs d'écran lors de l'ajout de nouveaux composants
- Respecter les tailles minimales pour l'accessibilité

## Évolution et maintenance

### Ajout de nouveaux composants
1. Créer le composant dans `src/components/ui/` ou `src/components/accessible/`
2. Exporter dans `src/index.ts`
3. Tester l'accessibilité
4. Documenter dans ce CLAUDE.md

### Compatibilité
- React 19 uniquement (peer dependency)
- Node.js 18+ pour le build
- Compatible avec tous les bundlers modernes
- Support TypeScript strict