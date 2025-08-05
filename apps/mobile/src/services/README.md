# Architecture des Services - HaVRID Mobile

## Vue d'ensemble

Cette architecture implémente une authentification sécurisée avec gestion des tokens JWT, authentification biométrique et stockage sécurisé des données sensibles.

## Structure des Services

### 1. ApiClient (`apiClient.ts`)

- **Singleton** pour gérer les appels API
- **Intercepteurs automatiques** pour ajouter les tokens d'authentification
- **Refresh automatique** des tokens expirés
- **Gestion des erreurs** centralisée

### 2. AuthService (`authService.ts`)

- **Authentification par email/mot de passe**
- **Authentification biométrique** (Touch ID / Face ID)
- **Gestion des tokens** (access + refresh)
- **Stockage sécurisé** avec Expo SecureStore
- **Validation de session**

### 3. Hook useAuth (`hooks/useAuth.ts`)

- **État d'authentification** centralisé
- **Actions d'authentification** (login, signup, logout)
- **Gestion de la biométrie**
- **Synchronisation** avec le stockage local

### 4. Contexte AuthContext (`contexts/AuthContext.tsx`)

- **Provider React** pour partager l'état d'authentification
- **Accessible** dans toute l'application
- **Gestion du cycle de vie** des composants

## Sécurité

### Stockage Sécurisé

- **Expo SecureStore** au lieu d'AsyncStorage
- **Chiffrement** automatique des données sensibles
- **Isolation** des données par application

### Authentification Biométrique

- **Touch ID** (iOS) et **Face ID** (iOS)
- **Empreintes digitales** (Android)
- **Fallback** vers mot de passe
- **Activation/désactivation** configurable

### Gestion des Tokens

- **Access Token** : courte durée de vie
- **Refresh Token** : longue durée de vie
- **Renouvellement automatique** en arrière-plan
- **Invalidation** lors de la déconnexion

## Utilisation

### Dans un composant

```typescript
import { useAuthContext } from '../contexts/AuthContext';

function MyComponent() {
  const {
    user,
    isAuthenticated,
    login,
    logout,
    authenticateWithBiometrics
  } = useAuthContext();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password' });
    } catch (error) {
      console.error('Erreur de connexion:', error);
    }
  };

  return (
    // Votre JSX
  );
}
```

### Navigation conditionnelle

```typescript
// Dans AppNavigator.tsx
const { isAuthenticated, isLoading } = useAuthContext();

if (isLoading) {
  return <LoadingScreen />;
}

return (
  <Stack.Navigator>
    {isAuthenticated ? (
      // Routes protégées
    ) : (
      // Routes publiques
    )}
  </Stack.Navigator>
);
```

## Configuration

### Variables d'environnement

Créez un fichier `.env` dans le dossier `apps/mobile/` :

```env
EXPO_PUBLIC_API_URL=http://localhost:3001
EXPO_PUBLIC_ENV=development
```

### Dépendances requises

```json
{
  "axios": "^1.6.0",
  "expo-local-authentication": "~13.8.0",
  "expo-secure-store": "~12.8.1"
}
```

## Flux d'authentification

1. **Démarrage** : Vérification de l'état d'authentification
2. **Connexion** : Authentification + stockage des tokens
3. **Navigation** : Redirection vers l'écran approprié
4. **Utilisation** : Tokens automatiquement inclus dans les requêtes
5. **Expiration** : Refresh automatique en arrière-plan
6. **Déconnexion** : Nettoyage des tokens + redirection

## Bonnes pratiques

- ✅ Utiliser `useAuthContext()` dans les composants
- ✅ Gérer les erreurs avec try/catch
- ✅ Afficher des indicateurs de chargement
- ✅ Valider les données avant envoi
- ❌ Ne pas stocker de tokens dans AsyncStorage
- ❌ Ne pas exposer les tokens dans les logs
- ❌ Ne pas ignorer les erreurs d'authentification
