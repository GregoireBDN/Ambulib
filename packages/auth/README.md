# @repo/auth

Package d'authentification partagé pour Ambulib - Système de services d'ambulance.

## Vue d'ensemble

Ce package fournit une solution d'authentification unifiée pour toutes les applications du monorepo Ambulib, en s'interfaçant avec l'API NestJS existante.

## Fonctionnalités

- 🔐 **Authentification JWT** avec refresh tokens
- 🌐 **OAuth Google** intégré
- 👥 **Gestion des rôles** (CLIENT, ADMIN, FLEET_MANAGER, AMBULANCE_DRIVER)
- 🏢 **Multi-tenant** avec isolation par entreprise
- ✅ **Validation** avec Zod et messages d'erreur accessibles
- 📱 **Support multi-plateforme** (Next.js + React Native)
- ♿ **Accessibilité WCAG 2.1 AA** intégrée

## Installation

```bash
# Déjà installé dans le monorepo via workspace:*
pnpm add @repo/auth
```

## Usage de base

### Initialisation du client API

```typescript
import { initializeApiClient } from '@repo/auth/client'

// Dans votre app Next.js ou React Native
const apiClient = initializeApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'
})
```

### Types disponibles

```typescript
import {
  User,
  AuthResponse,
  Role,
  Permission,
  SignupDto,
  SigninDto
} from '@repo/auth'
```

### Client API

```typescript
import { AuthApiClient, getApiClient } from '@repo/auth/client'

// Utilisation
const client = getApiClient()

// Inscription
const response = await client.signUp({
  firstName: 'Jean',
  lastName: 'Dupont', 
  email: 'jean@example.com',
  password: 'MotDePasse123!'
})

// Connexion
const authResponse = await client.signIn({
  email: 'jean@example.com',
  password: 'MotDePasse123!'
})
```

### Validation de formulaires

```typescript
import { signupSchema, validateFormData } from '@repo/auth'

const formData = { /* ... */ }
const result = validateFormData(signupSchema, formData)

if (result.success) {
  console.log('Données valides:', result.data)
} else {
  console.log('Erreurs:', result.errors)
}
```

### Gestion des erreurs

```typescript
import { AuthError, getErrorMessage } from '@repo/auth'

try {
  await client.signIn(credentials)
} catch (error) {
  if (error instanceof AuthError) {
    console.log('Code erreur:', error.code)
    console.log('Status:', error.statusCode)
  }
  
  // Message user-friendly
  const message = getErrorMessage(error)
  console.log('Message:', message)
}
```

## Architecture modulaire

### Core (`@repo/auth`)
- Types synchronisés avec l'API NestJS
- Client HTTP avec gestion d'erreurs
- Utilitaires de validation
- Constants et configuration

### Client (`@repo/auth/client`) 
- Hooks React (`useAuth`, `useSignUpForm`, `useSignInForm`, `useAuthGuard`, etc.)
- Context d'authentification (`AuthProvider`)
- Gestion d'état côté client avec auto-refresh

### Server (`@repo/auth/server`)
- Middleware Next.js (protection des routes par rôle et entreprise)
- Server Actions (inscription, connexion, déconnexion, tokens)
- Sessions sécurisées (cookies httpOnly)

### Mobile (`@repo/auth/mobile`)
- Stockage sécurisé React Native (Expo SecureStore + Keychain)
- Authentification biométrique (TouchID, FaceID, empreintes)

## Configuration par application

### Client (Seniors/WCAG 2.1 AA)
```typescript
// Timeout générereux pour seniors
const CLIENT_CONFIG = {
  baseUrl: process.env.API_URL,
  timeout: 15000, // 15s
  defaultHeaders: {
    'X-App-Type': 'client'
  }
}
```

### Fleet (Opérationnel)
```typescript
// Configuration optimisée pour les professionnels
const FLEET_CONFIG = {
  baseUrl: process.env.API_URL,
  timeout: 8000, // 8s
  defaultHeaders: {
    'X-App-Type': 'fleet'
  }
}
```

### Admin (Sécurisé)
```typescript
// Configuration sécurisée
const ADMIN_CONFIG = {
  baseUrl: process.env.API_URL,
  timeout: 5000, // 5s
  defaultHeaders: {
    'X-App-Type': 'admin',
    'X-Security-Level': 'high'
  }
}
```

## Endpoints API utilisés

Ce package s'interface avec les endpoints de l'API NestJS :

- `POST /auth/signup` - Inscription
- `POST /auth/signin` - Connexion  
- `POST /auth/refresh` - Rafraîchir tokens
- `POST /auth/signout` - Déconnexion
- `GET /auth/google/login` - OAuth Google
- `PATCH /auth/complete-profile` - Compléter profil

## Développement

```bash
# Build
pnpm build

# Mode watch  
pnpm dev

# Tests
pnpm test

# Lint
pnpm lint

# Vérification TypeScript
pnpm check-types
```

## Roadmap

- [x] Hooks React (`useAuth`, `usePermissions`, `useSignUpForm`, `useSignInForm`)
- [x] Context d'authentification React (`AuthProvider`)
- [x] Middleware Next.js avec protection des routes (par app)
- [x] Server Actions Next.js (inscription, connexion, déconnexion)
- [x] Sessions sécurisées (cookies httpOnly)
- [x] Support React Native complet (stockage sécurisé + biométrie)
- [x] Authentification biométrique (Expo + React Native Biometrics)
- [ ] Tests d'intégration pour tous les modules
- [ ] Documentation complète des API
- [ ] Exemples d'usage par application

## Sécurité

- ✅ Tokens JWT avec expiration
- ✅ Refresh tokens rotatifs
- ✅ Validation côté client et serveur
- ✅ Messages d'erreur sécurisés
- ✅ Timeout des requêtes
- ✅ Headers de sécurité

## Accessibilité

- ✅ Messages d'erreur en français clair
- ✅ Validation temps réel avec feedback
- ✅ Support lecteurs d'écran
- ✅ Timeout généreux pour seniors
- ✅ Contraste et lisibilité optimisés

## License

Privé - Usage interne Ambulib uniquement