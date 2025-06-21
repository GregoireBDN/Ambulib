# Composants d'Authentification - Ambulib

Ce dossier contient les composants spécifiques à l'authentification d'Ambulib.

## Composants Disponibles

### SignInButton

Bouton de connexion/déconnexion dans la navigation principale.

```tsx
import { SignInButton } from "@/components/auth";

// Utilisation automatique dans le header
<SignInButton />;
```

### GoogleSignInButton

Bouton de connexion avec Google utilisant le design system d'Ambulib.

```tsx
import { GoogleSignInButton } from "@/components/auth";

<GoogleSignInButton />;
```

### SocialSignInButton

Composant générique pour les boutons de connexion sociale.

```tsx
import { SocialSignInButton } from "@/components/auth";

<SocialSignInButton provider="google" icon={<GoogleIcon />}>
  Continuer avec Google
</SocialSignInButton>;
```

### AuthSeparator

Séparateur visuel pour les pages d'authentification.

```tsx
import { AuthSeparator } from "@/components/auth";

<AuthSeparator />;
```

## Design System

### Couleurs Cohérentes

- **Couleur primaire** : Bleu (`blue-600`) pour tous les éléments d'authentification
- **Couleur de succès** : Vert (`green-600`) pour les confirmations
- **Couleur d'erreur** : Rouge (`red-600`) pour les messages d'erreur
- **Couleur neutre** : Gris (`gray-600`) pour les textes secondaires

### Variantes de Boutons

- **`primary`** - Boutons de soumission principaux
- **`social`** - Boutons de connexion sociale
- **`outline-primary`** - Boutons secondaires

### Icônes et Couleurs de Fond

- **SignInForm** : Icône bleue sur fond bleu clair (`bg-blue-100`, `text-blue-600`)
- **SignUpForm** : Icône bleue sur fond bleu clair (`bg-blue-100`, `text-blue-600`)
- **GoogleSignInButton** : Icône Google colorée sur fond blanc

## Structure des Pages

### Page de Connexion (`/auth/signin`)

```tsx
<div className="flex flex-col items-center justify-center space-y-6">
  <SignInForm />
  <AuthSeparator />
  <GoogleSignInButton />
</div>
```

### Page d'Inscription (`/auth/signup`)

```tsx
<div className="flex flex-col items-center justify-center space-y-6">
  <SignUpForm />
  <AuthSeparator />
  <GoogleSignInButton />
</div>
```

## Bonnes Pratiques

1. **Cohérence des couleurs** : Utilisez toujours la couleur primaire (bleu) pour les éléments d'authentification
2. **Espacement uniforme** : Utilisez `space-y-6` pour l'espacement entre les composants
3. **Largeur maximale** : Limitez la largeur des formulaires à `max-w-md`
4. **Séparateurs visuels** : Utilisez `AuthSeparator` pour séparer les méthodes d'authentification
5. **Messages d'erreur** : Utilisez des couleurs rouges cohérentes pour les erreurs

## Extensibilité

### Ajout de Nouveaux Fournisseurs

```tsx
// Pour Facebook
<SocialSignInButton provider="facebook" icon={<FacebookIcon />}>
  Continuer avec Facebook
</SocialSignInButton>

// Pour GitHub
<SocialSignInButton provider="github" icon={<GitHubIcon />}>
  Continuer avec GitHub
</SocialSignInButton>
```

### Personnalisation des Séparateurs

```tsx
// Séparateur personnalisé
<AuthSeparator text="ou utiliser une autre méthode" />
```

## Accessibilité

- Tous les boutons ont des états de focus visibles
- Les icônes ont des descriptions textuelles (`sr-only`)
- Les couleurs respectent les contrastes WCAG
- Les formulaires sont navigables au clavier
