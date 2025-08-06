# Plan d'implémentation - Authentification multi-applications avec API NestJS existante

## Analyse et recherche complétée ✅

### 🔍 **API NestJS existante analysée**
- **JWT + Refresh Tokens** avec Argon2
- **Endpoints disponibles**: `/auth/signup`, `/auth/signin`, `/auth/refresh`, `/auth/signout`, `/auth/google/*`, `/auth/complete-profile`
- **Système multi-tenant** avec `companyId`
- **Rôles**: `CLIENT`, `ADMIN`, `FLEET_MANAGER`, `AMBULANCE_DRIVER`
- **AuthResponse**: `{id, firstName, lastName, role, companyId, isProfileComplete, accessToken, refreshToken}`

### 🎯 **Applications et besoins spécifiques**
- **Client**: WCAG 2.1 AA prioritaire, interface seniors/handicapés
- **Fleet**: Interface opérationnelle, temps réel, gestion équipes
- **Admin**: Sécurité renforcée, MFA possible, audit trail
- **Mobile**: React Native, tous rôles, biométrie, offline

### 📚 **Bonnes pratiques Next.js identifiées**
- **Server Actions** pour logique auth sécurisée côté serveur
- **Middleware** pour protection automatique des routes
- **Sessions chiffrées** en cookies httpOnly (pas localStorage)
- **Context React** pour état global utilisateur
- **Data Access Layer** avec cache pour performance

## Plan d'implémentation

### 1. 🆕 Nouveau package `@repo/auth`

```
packages/auth/
├── src/
│   ├── types/                    # Types synchronisés avec l'API NestJS
│   │   ├── auth.types.ts        # User, AuthResponse, SessionData
│   │   ├── api.types.ts         # SignupDto, SigninDto, etc.
│   │   └── roles.types.ts       # Role, Permission mapping
│   ├── client/
│   │   ├── api-client.ts        # Client HTTP vers API NestJS
│   │   ├── auth-context.tsx     # Context React universel
│   │   ├── use-auth.ts          # Hook authentification principal
│   │   └── use-permissions.ts   # Hook vérification rôles
│   ├── server/                  # Spécifique Next.js
│   │   ├── session.ts           # encrypt/decrypt sessions
│   │   ├── middleware.ts        # Template middleware Next.js
│   │   ├── auth-actions.ts      # Server Actions templates
│   │   └── dal.ts               # Data Access Layer
│   ├── mobile/                  # Spécifique React Native
│   │   ├── secure-storage.ts    # AsyncStorage sécurisé
│   │   ├── biometric.ts         # Authentification biométrique
│   │   └── oauth.ts             # OAuth mobile (Google, Apple)
│   └── utils/
│       ├── validation.ts        # Schémas Zod partagés
│       ├── errors.ts            # Messages d'erreur standardisés
│       └── constants.ts         # Routes, permissions, etc.
```

### 2. 🔧 Extension du package `@repo/ui`

```
packages/ui/src/components/auth/
├── AuthForm.tsx                 # Formulaire auth universel
│   ├── variant: "accessible" | "professional" | "secure"
│   ├── mode: "signin" | "signup" | "profile"
│   └── Validation Zod intégrée
├── GoogleSignInButton.tsx       # Bouton OAuth accessible
├── ProtectedRoute.tsx           # HOC protection composants
├── AuthErrorAlert.tsx           # Alertes erreurs standardisées
├── ProfileForm.tsx              # Formulaire profil utilisateur
├── PasswordStrength.tsx         # Indicateur force mot de passe
└── AuthLoadingState.tsx         # États de chargement accessibles
```

### 3. 🎨 Implémentation par application

#### **Client App** - Interface accessible prioritaire
```tsx
// apps/client/src/app/auth/signin/page.tsx
import { AuthForm, GoogleSignInButton } from '@repo/ui'
import { useAuth } from '@repo/auth/client'

export default function SignInPage() {
  const { signIn, isLoading } = useAuth()
  
  return (
    <div className="max-w-md mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">Connexion</h1>
      
      <AuthForm
        variant="accessible"        // Grande taille, contraste élevé
        mode="signin"
        onSubmit={signIn}
        isLoading={isLoading}
        // Auto-utilise AccessibleInput, LargeButton
      />
      
      <GoogleSignInButton
        variant="accessible"
        size="large"
        redirectTo="/dashboard"
      />
    </div>
  )
}
```

#### **Fleet App** - Interface opérationnelle  
```tsx
// apps/fleet/src/app/auth/signin/page.tsx
import { AuthForm } from '@repo/ui'
import { useAuth, RoleGuard } from '@repo/auth/client'

export default function FleetSignInPage() {
  const { signIn } = useAuth()
  
  return (
    <RoleGuard allowedRoles={['FLEET_MANAGER', 'AMBULANCE_DRIVER']}>
      <AuthForm
        variant="professional"    // Interface compacte et efficace
        mode="signin"
        onSubmit={signIn}
        redirectTo="/fleet/dashboard"
      />
    </RoleGuard>
  )
}
```

#### **Admin App** - Interface sécurisée
```tsx
// apps/admin/src/app/auth/signin/page.tsx  
import { AuthForm } from '@repo/ui'
import { useAuth, RoleGuard } from '@repo/auth/client'

export default function AdminSignInPage() {
  const { signIn, requireMFA } = useAuth()
  
  return (
    <RoleGuard allowedRoles={['ADMIN', 'SUPER_ADMIN']}>
      <AuthForm
        variant="secure"          // Validation renforcée
        mode="signin"
        onSubmit={signIn}
        requireMFA={requireMFA}   // MFA optionnel pour admin
        redirectTo="/admin/dashboard"
      />
    </RoleGuard>
  )
}
```

### 4. 🛡️ Middleware de protection par app

#### Client - Protection simple
```typescript
// apps/client/middleware.ts
import { createAuthMiddleware } from '@repo/auth/server'

export default createAuthMiddleware({
  apiUrl: process.env.BACKEND_URL,
  protectedRoutes: ['/dashboard', '/profile', '/bookings'],
  publicRoutes: ['/', '/auth/signin', '/auth/signup'],
  allowedRoles: ['CLIENT'],
  redirectTo: '/auth/signin',
  // Sessions accessibles avec timeouts généreux pour seniors
  sessionTimeout: 4 * 60 * 60 * 1000 // 4 heures
})
```

#### Fleet - Protection opérationnelle
```typescript
// apps/fleet/middleware.ts  
import { createAuthMiddleware } from '@repo/auth/server'

export default createAuthMiddleware({
  apiUrl: process.env.BACKEND_URL,
  protectedRoutes: ['/fleet', '/missions', '/vehicles'],
  allowedRoles: ['FLEET_MANAGER', 'AMBULANCE_DRIVER'],
  redirectTo: '/auth/signin',
  // Features temps réel
  realTimeSync: true,
  sessionTimeout: 2 * 60 * 60 * 1000 // 2 heures
})
```

#### Admin - Protection renforcée  
```typescript
// apps/admin/middleware.ts
import { createAuthMiddleware } from '@repo/auth/server'

export default createAuthMiddleware({
  apiUrl: process.env.BACKEND_URL,
  protectedRoutes: ['/admin'],
  allowedRoles: ['ADMIN', 'SUPER_ADMIN'],
  redirectTo: '/auth/signin',
  // Sécurité maximale
  requireMFA: true,
  auditLog: true,
  sessionTimeout: 30 * 60 * 1000 // 30 minutes
})
```

### 5. 🔗 API Client vers NestJS existant

```typescript
// packages/auth/src/client/api-client.ts
export class AuthApiClient {
  constructor(private baseUrl: string) {}
  
  async signIn(credentials: SigninDto): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    
    if (!response.ok) {
      throw new AuthError('Identifiants invalides')
    }
    
    return response.json()
  }
  
  async signUp(userData: SignupDto): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    
    if (!response.ok) {
      const error = await response.json()
      throw new AuthError(error.message)
    }
    
    return response.json()
  }
  
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await fetch(`${this.baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${refreshToken}`
      }
    })
    
    if (!response.ok) {
      throw new AuthError('Session expirée')
    }
    
    return response.json()
  }
  
  async googleSignIn(code: string): Promise<AuthResponse> {
    // Utilise l'endpoint Google OAuth de l'API NestJS
    const response = await fetch(`${this.baseUrl}/auth/google/callback?code=${code}`)
    return response.json()
  }
}
```

### 6. 📱 Support React Native

```typescript
// packages/auth/src/mobile/secure-storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Keychain from 'react-native-keychain'

export class SecureTokenStorage {
  async storeTokens(accessToken: string, refreshToken: string) {
    // Utilise Keychain pour les tokens sensibles
    await Keychain.setInternetCredentials(
      'ambulib-tokens',
      'user', 
      JSON.stringify({ accessToken, refreshToken })
    )
  }
  
  async getTokens(): Promise<{accessToken: string, refreshToken: string} | null> {
    try {
      const credentials = await Keychain.getInternetCredentials('ambulib-tokens')
      if (credentials) {
        return JSON.parse(credentials.password)
      }
    } catch (error) {
      console.error('Erreur récupération tokens:', error)
    }
    return null
  }
}
```

### 7. 🏠 Landing pages personnalisées

#### Client - Landing accessible
```tsx
// apps/client/src/app/page.tsx
import { useAuth } from '@repo/auth/client'
import { EmergencyButton, LargeButton, SeniorCard } from '@repo/ui'

export default function ClientLandingPage() {
  const { user, signIn } = useAuth()
  
  if (user) {
    return <ClientDashboard user={user} />
  }
  
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header avec bouton connexion très visible */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Ambulib</h1>
        <LargeButton 
          onClick={() => signIn()}
          variant="secondary"
          size="large"
        >
          Se connecter
        </LargeButton>
      </header>
      
      {/* Bouton d'urgence proéminent */}
      <div className="flex justify-center mb-12">
        <EmergencyButton>
          🚨 URGENCE MÉDICALE
        </EmergencyButton>
      </div>
      
      {/* Services pour seniors */}
      <div className="grid gap-8 md:grid-cols-2">
        <SeniorCard
          title="Réservation d'ambulance"
          description="Service simple et sécurisé pour vos transports médicaux"
        >
          <LargeButton className="w-full mt-4">
            Découvrir le service
          </LargeButton>
        </SeniorCard>
        
        <SeniorCard
          title="Suivi médical"
          description="Accès facile à votre dossier et vos rendez-vous"
        >
          <LargeButton variant="secondary" className="w-full mt-4">
            En savoir plus
          </LargeButton>
        </SeniorCard>
      </div>
    </main>
  )
}
```

## Avantages de cette approche

### ✅ **Réutilisation maximale**
- Code auth partagé entre toutes les applications
- Types synchronisés avec l'API NestJS existante
- Composants UI cohérents et accessibles

### ✅ **Bonnes pratiques Next.js**
- Server Actions pour sécurité maximale
- Middleware pour protection automatique
- Sessions chiffrées en cookies httpOnly
- Pas de localStorage côté client

### ✅ **Utilisation de l'API existante**
- Aucune réinvention, utilise l'API NestJS telle quelle
- Maintien du système multi-tenant
- Conservation des rôles et permissions existants
- Support complet Google OAuth

### ✅ **Personnalisation par application**
- Client: Accessibilité WCAG 2.1 AA maximale
- Fleet: Interface opérationnelle optimisée
- Admin: Sécurité et audit renforcés  
- Mobile: UX native avec biométrie

### ✅ **Évolutivité**
- Ajout facile de nouvelles applications
- Extension simple des rôles et permissions
- Support multi-plateforme (web + mobile)
- Tests centralisés et robustes

## Ordre d'implémentation recommandé

1. **Package @repo/auth** - Types et client API
2. **Extension @repo/ui** - Composants auth accessibles
3. **App client** - Priorité seniors avec WCAG 2.1 AA
4. **App fleet** - Interface opérationnelle
5. **App admin** - Interface sécurisée  
6. **App mobile** - Adaptation React Native
7. **Tests d'intégration** - Validation complète