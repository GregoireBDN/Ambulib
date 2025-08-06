# CLAUDE.md - Admin Application

## Vue d'ensemble

Application web Next.js pour les administrateurs - Interface de gestion administrative d'Ambulib.

### Utilisateurs cibles
**Administrateurs système** responsables de:
- Gestion globale des utilisateurs et permissions
- Administration des véhicules et ressources
- Configuration système et paramètres
- Supervision et rapports analytiques

## Stack technique

- **Framework**: Next.js 15 avec App Router
- **Styling**: Tailwind CSS 4.x
- **Composants UI**: Package partagé `@repo/ui` avec shadcn/ui
- **TypeScript**: Configuration stricte
- **Accessibilité**: Standards WCAG 2.1 Level AA

## Fonctionnalités principales

### 1. Gestion des utilisateurs
- CRUD complet des profils utilisateur
- Attribution et modification des rôles
- Gestion des permissions granulaires
- Historique des connexions et actions

### 2. Administration des véhicules
- Inventaire complet de la flotte
- Gestion de la maintenance et inspections
- Configuration des équipements médicaux
- Suivi des coûts et amortissements

### 3. Configuration système
- Paramètres globaux de l'application
- Configuration des notifications
- Gestion des templates et communications
- Intégrations avec services externes

### 4. Rapports et analytics
- Tableaux de bord exécutifs
- Statistiques d'utilisation détaillées
- Rapports de conformité réglementaire
- Exports et archivage des données

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
  Table,
  // Composants admin spécialisés
  DataTable,
  UserManager,
  SystemSettings
} from "@repo/ui"
```

## Architecture des vues

### Dashboard administrateur
- Vue d'ensemble système
- Métriques clés de performance
- Alertes système critiques
- Raccourcis vers fonctions principales

### Gestion utilisateurs
- Liste et recherche utilisateurs
- Formulaires de création/édition
- Gestion des rôles et permissions
- Logs d'audit des actions

### Administration flotte
- Base de données véhicules
- Planning de maintenance
- Configuration des équipements
- Rapports de coûts

### Configuration système
- Paramètres généraux
- Templates de communication
- Intégrations APIs
- Sauvegardes et restauration

## Sécurité et permissions

### Contrôle d'accès
- Authentification renforcée (MFA possible)
- Sessions sécurisées avec timeouts
- Audit trail complet des actions
- Séparation des environnements

### Rôles et permissions
- **ADMIN**: Accès complet à toutes les fonctions
- Permissions granulaires par module
- Délégation de certaines tâches
- Révocation d'accès d'urgence

### Protection des données
- Chiffrement des données sensibles
- Respect RGPD et réglementations
- Anonymisation pour les rapports
- Politiques de rétention des données

## Interface utilisateur

### Principles de design
- Interface professionnelle et puissante
- Organisation logique des fonctions
- Workflows guidés pour tâches complexes
- Design system cohérent

### Composants spécialisés
- **AdminTable**: Tables avec fonctions avancées
- **RoleManager**: Gestion visuelle des permissions
- **SystemMonitor**: Monitoring temps réel
- **AuditViewer**: Visualisation des logs d'audit

## Intégrations

### Services backend
- API REST complète avec pagination
- WebSockets pour notifications temps réel
- Système de cache distribué
- Queues pour tâches lourdes

### Services externes
- Systèmes de facturation
- APIs gouvernementales
- Services de géolocalisation
- Plateformes de communication

## Commandes de développement

```bash
# Développement
pnpm turbo dev --filter=admin     # Démarrer l'app admin

# Build et qualité
pnpm turbo build --filter=admin   # Build de production
pnpm turbo lint --filter=admin    # Linting
pnpm turbo check-types --filter=admin # Vérification TypeScript

# Tests spécifiques
pnpm turbo test --filter=admin    # Tests unitaires
```

## Points d'attention

### Performance
- Pagination intelligente des gros datasets
- Cache des requêtes fréquentes
- Lazy loading des composants lourds
- Optimisation des requêtes complexes

### Fiabilité
- Validations côté client et serveur
- Gestion d'erreur robuste
- Transactions atomiques pour opérations critiques
- Backup automatique des configurations

### Conformité
- Logs d'audit détaillés et inaltérables
- Respect des normes de sécurité
- Documentation des procédures
- Tests de conformité automatisés

### UX spécifique admin
- Shortcuts clavier pour power users
- Vues personnalisables et sauvegardables
- Export en multiple formats
- Mode maintenance et notifications système