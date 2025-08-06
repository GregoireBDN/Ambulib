# CLAUDE.md - Mobile Application

## Vue d'ensemble

Application mobile Expo React Native pour Ambulib - Interface mobile accessible pour tous les utilisateurs.

### Utilisateurs cibles
**Tous les rôles** avec adaptations spécifiques:
- **Clients/Patients**: Réservations et suivi en mobilité
- **Conducteurs d'ambulance**: Interface terrain et navigation
- **Fleet managers**: Supervision mobile et notifications
- **Personnel médical**: Accès rapide aux informations patient

## Stack technique

- **Framework**: Expo React Native avec TypeScript
- **Styling**: NativeWind (Tailwind CSS pour React Native)
- **Navigation**: React Navigation 6
- **State Management**: React Context + Hooks
- **Accessibilité**: Support natif iOS/Android + améliorations

## Architecture des composants

### Structure principale
```
apps/mobile/src/
├── components/
│   └── common/
│       └── Button.tsx          # Bouton accessible
├── screens/
│   ├── HomeScreen.tsx
│   └── public/
│       ├── signinScreen/
│       └── signupScreen/
├── navigation/
│   └── AppNavigator.tsx        # Configuration navigation
└── assets/
    └── img/                    # Assets et logos
```

### Composants accessibles mobiles

#### `Button.tsx` - Bouton accessible
- Taille de cible tactile minimum 44pt
- Support VoiceOver/TalkBack
- États visuels clairs (pressed, disabled, focused)
- Haptic feedback approprié

#### Composants spécialisés par rôle
- **EmergencyButton**: Bouton d'urgence géant (clients)
- **StatusToggle**: Bascule de statut (conducteurs)
- **QuickActions**: Actions rapides contextuelles
- **LocationPicker**: Sélecteur de localisation accessible

## Fonctionnalités par rôle

### Client/Patient
- Réservation d'ambulance simplifiée
- Suivi en temps réel du véhicule
- Communication avec le conducteur
- Historique des trajets

### Conducteur d'ambulance
- Réception et acceptation des missions
- Navigation GPS intégrée
- Communication avec la centrale
- Mise à jour des statuts

### Fleet Manager (mobile)
- Vue d'ensemble de la flotte
- Notifications d'urgence
- Réaffectation rapide des missions
- Supervision en déplacement

## Accessibilité mobile

### Standards respectés
- **iOS**: Conformité VoiceOver et Switch Control
- **Android**: Support TalkBack et Select to Speak
- **WCAG 2.1 Level AA** adapté au mobile
- **Personnalisation**: Support des paramètres système

### Spécificités seniors/handicapés
```tsx
// Exemple de configuration accessible
<Button
  accessibilityLabel="Appeler une ambulance d'urgence"
  accessibilityHint="Déclenche un appel d'urgence immédiat"
  accessibilityRole="button"
  style={{
    minHeight: 60,        // Taille tactile généreuse
    minWidth: 200,        // Largeur confortable
    fontSize: 18,         // Texte lisible
  }}
/>
```

### Adaptations spécifiques
- **Contraste élevé**: Support du mode système
- **Texte dynamique**: Respect des préférences de taille
- **Réduction de mouvement**: Animations conditionnelles
- **Navigation vocale**: Commands vocaux pour actions critiques

## Configuration NativeWind

### Tailwind pour React Native
```javascript
// tailwind.config.js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Couleurs et espacements accessibles
      colors: {
        'emergency-red': '#DC2626',
        'accessible-blue': '#2563EB',
      }
    },
  },
  plugins: [],
}
```

### Styles accessibles
- Classes utilitaires pour accessibilité
- Consistance avec l'interface web
- Adaptations tactiles automatiques
- Support des thèmes système

## Navigation et UX

### Structure de navigation
```tsx
// Exemple de navigation accessible
<Tab.Navigator
  screenOptions={{
    tabBarAccessibilityRole: "tabbar",
    tabBarStyle: {
      height: 70,  // Hauteur généreuse pour seniors
    }
  }}
>
  <Tab.Screen 
    name="Home"
    options={{
      tabBarLabel: "Accueil",
      tabBarAccessibilityLabel: "Accueil - Tableau de bord principal"
    }}
  />
</Tab.Navigator>
```

### Patterns UX mobiles
- **Gestes simples**: Tap, swipe basiques uniquement
- **Feedback haptique**: Confirmations importantes
- **États clairs**: Loading, success, error visibles
- **Navigation prévisible**: Pas de surprises UX

## Performance mobile

### Optimisations
- Bundle splitting par fonctionnalité
- Images optimisées et lazy loading
- Cache intelligent des données
- Offline-first pour fonctions critiques

### Compatibilité
- **iOS**: 13.0+ (support 5 ans en arrière)
- **Android**: API 23+ (Android 6.0+)
- **Performance**: Optimisé pour appareils anciens
- **Connectivité**: Fonctionne en 3G/4G limité

## Géolocalisation et cartes

### Services de localisation
```tsx
// Exemple d'usage géolocalisation accessible
const location = await Location.requestForegroundPermissionsAsync({
  accuracy: Location.Accuracy.High,
  announceForAccessibility: true, // Annonce VoiceOver
});
```

### Intégration cartes
- React Native Maps avec annotations accessibles
- Instructions vocales pour navigation
- Descriptions textuelles des itinéraires
- Zoom et contrôles tactiles adaptés

## Communication temps réel

### WebSockets mobiles
- Reconnexion automatique
- Gestion états réseau
- Notifications push intégrées
- Synchronisation background

### Notifications
- **Push notifications**: Urgences et mises à jour
- **In-app notifications**: Statuts et confirmations
- **Accessibility announcements**: VoiceOver automatique
- **Badge app**: Compteurs visuels

## Commandes de développement

```bash
# Développement
pnpm dev:mobile              # Démarrer Expo Dev Server
npx expo start               # Démarrer avec options
npx expo start --ios        # iOS Simulator
npx expo start --android    # Android Emulator

# Build et déploiement
npx expo build:ios          # Build iOS
npx expo build:android      # Build Android
npx eas build               # Build avec EAS

# Tests
pnpm test --filter=mobile   # Tests unitaires
```

## Points d'attention spécifiques

### Accessibilité mobile
- Tests obligatoires avec lecteurs d'écran natifs
- Validation navigation clavier externe (iOS)
- Support des contrôles d'accessibilité système
- Tests avec utilisateurs seniors réels

### Performance critique
- Démarrage application < 3 secondes
- Réponse tactile < 100ms
- Synchronisation données < 2 secondes
- Fonctionnement hors ligne pour urgences

### Conformité mobile
- Guidelines App Store et Play Store
- Permissions minimales nécessaires
- Respect vie privée et RGPD
- Sécurité des communications