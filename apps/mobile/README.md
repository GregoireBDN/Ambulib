# HaVRID Mobile App

Application mobile React Native avec authentification sécurisée et biométrie.

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- pnpm
- Expo CLI
- iOS Simulator ou Android Emulator

### Installation

```bash
cd apps/mobile
pnpm install
```

### Configuration

1. Créez un fichier `.env` dans le dossier `apps/mobile/` :

```env
EXPO_PUBLIC_API_URL=http://localhost:3001
```

2. Assurez-vous que votre API backend est en cours d'exécution sur le port 3001.

### Lancement

```bash
pnpm start
```

Puis scannez le QR code avec l'app Expo Go ou appuyez sur `i` pour iOS ou `a` pour Android.

## 🏗️ Architecture

### Structure des dossiers

```
src/
├── components/          # Composants réutilisables
├── contexts/           # Contextes React (AuthContext)
├── hooks/              # Hooks personnalisés (useAuth)
├── navigation/         # Configuration de navigation
├── screens/            # Écrans de l'application
├── services/           # Services métier
│   ├── api/           # Client API
│   └── auth/          # Service d'authentification
├── types/              # Types TypeScript
└── utils/              # Utilitaires
```

### Fonctionnalités principales

#### 🔐 Authentification sécurisée

- **Stockage sécurisé** : Expo SecureStore (Keychain/Keystore)
- **Tokens JWT** : Access token + Refresh token
- **Refresh automatique** : Gestion transparente de l'expiration
- **Gestion d'erreurs** : Messages d'erreur localisés

#### 👆 Authentification biométrique

- **Touch ID** (iOS)
- **Face ID** (iOS)
- **Empreintes digitales** (Android)
- **Activation/désactivation** configurable
- **Fallback** vers mot de passe

#### 🌐 Client API intelligent

- **Intercepteurs automatiques** : Ajout des tokens
- **Refresh automatique** : Gestion de l'expiration
- **Gestion d'erreurs** : Centralisée
- **Singleton pattern** : Une seule instance

## 🧪 Tests

### Test du service d'authentification

L'application inclut des tests automatiques qui s'exécutent au démarrage :

```typescript
// Vérification de la biométrie
const isBiometricAvailable = await authService.isBiometricAvailable();

// Vérification de l'état d'authentification
const isAuthenticated = await authService.isAuthenticated();

// Récupération de l'utilisateur actuel
const user = await authService.getCurrentUser();
```

### Test manuel

1. Lancez l'application
2. Vérifiez les logs dans la console Expo
3. Testez la connexion avec des identifiants valides
4. Testez l'authentification biométrique (si disponible)

## 🔧 Configuration

### Variables d'environnement

```env
EXPO_PUBLIC_API_URL=http://localhost:3001
```

### Configuration Expo

Le fichier `app.config.js` contient :

- Configuration iOS/Android
- Plugins (expo-local-authentication)
- Variables d'environnement

## 📱 Fonctionnalités

### Écrans disponibles

- **HomeScreen** : Page d'accueil avec navigation conditionnelle
- **SigninScreen** : Connexion avec email/mot de passe + biométrie
- **SignupScreen** : Inscription avec validation complète
- **LoadingScreen** : Écran de chargement pendant l'authentification

### Navigation

- **Routes publiques** : Signin, Signup (quand non authentifié)
- **Routes protégées** : Home (quand authentifié)
- **Navigation conditionnelle** : Basée sur l'état d'authentification

## 🛡️ Sécurité

### Stockage sécurisé

- **Expo SecureStore** au lieu d'AsyncStorage
- **Chiffrement automatique** (AES-256)
- **Isolation par application**
- **Keychain** (iOS) / **Keystore** (Android)

### Gestion des tokens

- **Access Token** : Courte durée de vie (15min)
- **Refresh Token** : Longue durée de vie (7 jours)
- **Invalidation** lors de la déconnexion
- **Refresh automatique** en arrière-plan

### Authentification biométrique

- **Vérification matérielle** : Hardware disponible
- **Vérification d'enrôlement** : Biométrie configurée
- **Fallback sécurisé** : Mot de passe en cas d'échec
- **Messages localisés** : Interface en français

## 🐛 Dépannage

### Erreurs courantes

#### "Maximum call stack size exceeded"

- **Cause** : Dépendance circulaire entre services
- **Solution** : Vérifiez les imports et la configuration des services

#### "Biométrie non disponible"

- **Cause** : Hardware non supporté ou non configuré
- **Solution** : Testez sur un appareil physique avec biométrie

#### "Erreur de connexion API"

- **Cause** : Backend non démarré ou URL incorrecte
- **Solution** : Vérifiez que l'API est en cours d'exécution sur le bon port

### Logs de débogage

Les logs de test s'affichent dans la console Expo :

```
🧪 Test du service d'authentification...
✅ Biométrie disponible: true
✅ État d'authentification: false
✅ Utilisateur actuel: null
✅ Tous les tests sont passés !
```

## 📚 Ressources

- [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
- [Expo Local Authentication](https://docs.expo.dev/versions/latest/sdk/local-authentication/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)
