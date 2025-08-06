# CLAUDE.md - Application Client

## Vue d'ensemble

Application web Next.js pour les patients et tuteurs - Interface d'Ambulib optimisée pour l'accessibilité.

### Cible prioritaire
**Personnes âgées et handicapées** nécessitant des services d'ambulance:
- Interface simple, intuitive et rassurante
- WCAG 2.1 Level AA obligatoire
- Support complet lecteurs d'écran et navigation clavier

## Stack technique

- **Framework**: Next.js 15 avec App Router
- **Styling**: Tailwind CSS 4.x
- **Composants UI**: Package partagé `@repo/ui` avec shadcn/ui
- **Accessibilité**: Composants personnalisés pour seniors
- **TypeScript**: Configuration stricte

## Composants spécialisés utilisés

### Composants accessibles (`@repo/ui`)
- `EmergencyButton`: Bouton d'urgence haute visibilité
- `LargeButton`: Boutons de grande taille pour faciliter l'interaction
- `AccessibleInput`: Champs de saisie avec labels et descriptions
- `SeniorCard`: Cartes avec contraste élevé et espacement généreux

### Composants shadcn/ui
- `Button`, `Card`, `Input`: Composants de base avec styles cohérents
- Intégration parfaite avec les composants accessibles

## Configuration

### Fichier `components.json`
- Configuration shadcn/ui pour le monorepo
- Aliases pointant vers `@repo/ui`
- Support Tailwind CSS 4.x

### Imports disponibles
```tsx
import { 
  // Composants accessibles
  EmergencyButton, 
  LargeButton, 
  AccessibleInput, 
  SeniorCard,
  // Composants shadcn/ui
  Button,
  Card,
  Input
} from "@repo/ui"
```

## Structure des pages

### Page d'accueil (`app/page.tsx`)
- Bouton d'urgence proéminent
- Services principaux dans des cartes accessibles
- Interface adaptée aux seniors
- Tests des composants intégrés

## Fonctionnalités principales

1. **Réservation d'ambulance**
   - Formulaire simplifié et accessible
   - Validation en temps réel avec messages clairs
   - Support navigation clavier complète

2. **Informations médicales**
   - Consultation du dossier médical
   - Mise à jour des prescriptions
   - Interface haute lisibilité

3. **Suivi des trajets**
   - Historique des transports
   - Prochains rendez-vous
   - Statuts en temps réel

4. **Aide et contact**
   - Support 24h/24 7j/7
   - Multiple canaux de contact
   - Interface guidée

## Guidelines d'accessibilité

### Tailles et espacement
- Boutons minimum 44x44px
- Texte base 16px, titres plus grands
- Espacement généreux entre éléments
- Marges confortables

### Couleurs et contraste
- Contraste minimum 4.5:1 pour le texte normal
- Contraste minimum 3:1 pour le texte large
- Mode contraste élevé supporté
- Couleurs d'erreur distinctives

### Navigation et interaction
- Navigation complète au clavier
- Focus visuel ultra-visible (ring-4, offset-4)
- Pas d'animations distrayantes
- Réduction de mouvement respectée

### Lecteurs d'écran
- Labels descriptifs sur tous les éléments
- Rôles ARIA appropriés
- Descriptions contextuelles
- Structure heading logique

## Commandes de développement

```bash
# Développement
pnpm turbo dev --filter=client    # Démarrer l'app client

# Build et qualité
pnpm turbo build --filter=client  # Build de production
pnpm turbo lint --filter=client   # Linting
pnpm turbo check-types --filter=client # Vérification TypeScript

# Tests d'accessibilité
# Tester avec lecteurs d'écran (VoiceOver, NVDA)
# Navigation complète au clavier
# Test contraste élevé et réduction mouvement
```

## Points d'attention spécifiques

### Performance pour seniors
- Temps de chargement optimisés
- Pas d'animations lourdes
- Interface réactive sur appareils anciens
- Cache intelligent

### Simplicité d'usage
- Pas plus de 3 clics pour les actions principales
- Messages d'erreur en français simple
- Confirmation des actions importantes
- Annulation possible partout