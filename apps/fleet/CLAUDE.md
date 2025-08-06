# CLAUDE.md - Fleet Manager Application

## Vue d'ensemble

Application web Next.js pour les gestionnaires de flotte - Interface de gestion opérationnelle d'Ambulib.

### Utilisateurs cibles
**Gestionnaires de flotte** responsables de:
- Planification et programmation des ambulances
- Affectation des routes et itinéraires
- Supervision des opérations en temps réel
- Gestion des ressources et du personnel

## Stack technique

- **Framework**: Next.js 15 avec App Router
- **Styling**: Tailwind CSS 4.x
- **Composants UI**: Package partagé `@repo/ui` avec shadcn/ui
- **TypeScript**: Configuration stricte
- **Accessibilité**: Standards WCAG 2.1 Level AA

## Fonctionnalités principales

### 1. Gestion de la flotte
- Vue d'ensemble des ambulances disponibles
- Statuts en temps réel (disponible, en mission, maintenance)
- Historique des véhicules et maintenance
- Géolocalisation des ambulances

### 2. Planification des missions
- Calendrier des réservations
- Affectation automatique et manuelle
- Optimisation des routes
- Gestion des priorités d'urgence

### 3. Supervision opérationnelle
- Tableau de bord en temps réel
- Alertes et notifications
- Communication avec les conducteurs
- Suivi des performances

### 4. Gestion du personnel
- Planning des conducteurs
- Disponibilités et congés
- Compétences et certifications
- Evaluation des performances

## Configuration

### Fichier `components.json`
- Configuration shadcn/ui pour le monorepo
- Aliases pointant vers `@repo/ui`
- Support Tailwind CSS 4.x

### Imports disponibles
```tsx
import { 
  // Composants UI de base
  Button,
  Card,
  Input,
  // Composants spécialisés
  DataTable,
  Calendar,
  Map
} from "@repo/ui"
```

## Architecture des vues

### Dashboard principal
- KPIs opérationnels
- Alertes prioritaires
- Vue carte en temps réel
- Statistiques de performance

### Gestion des missions
- Liste des missions actives
- Planning hebdomadaire/mensuel
- Interface d'affectation
- Outils d'optimisation

### Gestion de flotte
- Inventaire des véhicules
- Maintenance programmée
- Géolocalisation
- Historique des missions

### Rapports et analytiques
- Tableaux de bord personnalisables
- Exports de données
- Analyses de performance
- Prédictions et recommandations

## Interface utilisateur

### Principles de design
- Interface professionnelle et efficace
- Accès rapide aux informations critiques
- Workflows optimisés pour la productivité
- Responsive design pour tablettes

### Composants spécialisés
- **FleetMap**: Carte interactive avec positions
- **MissionPlanner**: Calendrier de planification
- **StatusBoard**: Tableau de statuts en temps réel
- **AlertPanel**: Panneau d'alertes prioritaires

## Intégrations système

### API Backend
- Synchronisation temps réel via WebSockets
- Endpoints REST pour CRUD operations
- Authentification JWT avec rôles
- Cache intelligent pour performance

### Services externes
- APIs de géolocalisation et routing
- Services de notifications push
- Intégrations télémétrie véhicules
- Systèmes de communication radio

## Commandes de développement

```bash
# Développement
pnpm turbo dev --filter=fleet     # Démarrer l'app fleet

# Build et qualité
pnpm turbo build --filter=fleet   # Build de production
pnpm turbo lint --filter=fleet    # Linting
pnpm turbo check-types --filter=fleet # Vérification TypeScript

# Tests spécifiques
pnpm turbo test --filter=fleet    # Tests unitaires
```

## Points d'attention

### Performance temps réel
- WebSockets pour mises à jour live
- Optimisation des requêtes fréquentes
- Cache des données de géolocalisation
- Lazy loading des composants lourds

### Fiabilité opérationnelle
- Gestion des déconnexions réseau
- Fallbacks en cas d'erreur
- Sauvegarde automatique des états
- Synchronisation différée

### Sécurité
- Accès basé sur les rôles (FLEET_MANAGER)
- Audit trail des actions critiques
- Chiffrement des communications
- Protection des données de localisation

### UX/UI spécifique métier
- Codes couleur pour statuts (vert=disponible, rouge=urgence)
- Shortcuts clavier pour actions fréquentes
- Multi-écrans supportés
- Mode sombre pour salles de contrôle