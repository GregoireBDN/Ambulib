# Structure des Composants - Ambulib

Cette documentation décrit l'architecture modulaire des composants d'Ambulib.

## Structure Générale

```
components/
├── auth/           # Composants d'authentification
├── dashboard/      # Composants du dashboard (utilisateurs connectés)
├── landing/        # Composants de la landing page (utilisateurs non connectés)
├── ui/             # Composants UI réutilisables
└── README.md       # Cette documentation
```

## Landing Page (`/components/landing/`)

Composants pour les utilisateurs non connectés.

### Composants Principaux

- **`LandingPage.tsx`** - Composant principal qui orchestre tous les sections
- **`HeroSection.tsx`** - Section héro avec titre principal et CTA
- **`AudiencesSection.tsx`** - Section présentant les différents publics cibles
- **`FeaturesSection.tsx`** - Section des fonctionnalités principales
- **`StatsSection.tsx`** - Section des statistiques et chiffres clés
- **`TestimonialsSection.tsx`** - Section des témoignages utilisateurs
- **`CTASection.tsx`** - Section d'appel à l'action finale

### Utilisation

```tsx
import { LandingPage } from "@/components/landing";

// Dans votre composant
return <LandingPage />;
```

## Dashboard (`/components/dashboard/`)

Composants pour les utilisateurs connectés, organisés par rôle.

### Composants Principaux

- **`Dashboard.tsx`** - Composant principal qui orchestre le dashboard
- **`DashboardHeader.tsx`** - Header avec message de bienvenue personnalisé
- **`QuickActionsSection.tsx`** - Cartes d'action rapide selon le rôle
- **`HelpSection.tsx`** - Section d'aide et support

### Rôles Supportés

1. **ADMIN** - Gestion de la plateforme

   - Tableau de bord
   - Gestion des utilisateurs
   - Paramètres

2. **DRIVER** - Gestion des ambulances

   - Gérer la flotte
   - Réservations
   - Paramètres

3. **USER** - Utilisation du service
   - Réserver une ambulance
   - Mes réservations
   - Mon profil

### Utilisation

```tsx
import { Dashboard } from "@/components/dashboard";

// Dans votre composant
return <Dashboard userRole={userRole} />;
```

## Avantages de cette Architecture

### 1. **Maintenabilité**

- Chaque composant a une responsabilité unique
- Modifications isolées sans impact sur les autres sections
- Code plus facile à déboguer

### 2. **Réutilisabilité**

- Composants modulaires réutilisables dans d'autres pages
- Logique métier séparée de la présentation

### 3. **Lisibilité**

- Structure claire et organisée
- Noms de composants explicites
- Séparation logique des préoccupations

### 4. **Flexibilité**

- Ajout facile de nouvelles sections
- Personnalisation par rôle simplifiée
- Configuration centralisée

### 5. **Performance**

- Chargement conditionnel des composants
- Optimisation possible par section
- Bundle splitting facilité

## Bonnes Pratiques

1. **Imports organisés** - Utilisez les fichiers d'index pour les imports
2. **Props typées** - Toujours typer les interfaces des props
3. **Composants purs** - Évitez les effets de bord dans les composants de présentation
4. **Nommage cohérent** - Suivez la convention PascalCase pour les composants
5. **Documentation** - Commentez les logiques complexes

## Évolution Future

Cette architecture permet facilement :

- L'ajout de nouveaux rôles utilisateur
- L'extension des fonctionnalités par section
- L'intégration de nouvelles pages
- L'optimisation des performances par section
