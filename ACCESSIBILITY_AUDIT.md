# Audit d'Accessibilité - Composants UI Existants

## 🎯 Cible : Personnes âgées et handicapées
Standards requis : WCAG 2.1 Level AA

## 📊 Analyse des Composants Existants

### ✅ Points Positifs
- **Button** : Focus visible (`focus-visible:ring-1`), support disabled
- **Input** : Focus visible, transition-colors pour feedback
- **Label** : Utilise Radix UI (bonne base accessible)
- **SubmitButton** : ARIA disabled pendant chargement

### ❌ Problèmes d'Accessibilité Identifiés

#### Button (critique)
- **Taille minimale** : `h-9` (36px) < 44px requis WCAG
- **Taille texte** : `text-sm` (14px) < 18px requis pour seniors
- **Contraste** : Variants non vérifiés pour ratio 4.5:1
- **Touch target** : Zones de clic trop petites

#### Input (critique)
- **Taille** : `h-9` (36px) < 44px requis
- **Texte** : `text-base` responsive mais `text-sm` sur md+ trop petit
- **Labels** : Pas d'association obligatoire avec aria-describedby
- **Erreurs** : Pas de support ARIA pour messages d'erreur

#### Card (modéré)
- **Sémantique** : Divs génériques, manque roles ARIA
- **Titres** : CardTitle utilise div au lieu de h1-h6
- **Navigation** : Pas de support focus pour cards interactives

#### Label (modéré)
- **Taille** : `text-sm` (14px) trop petit pour seniors
- **Contraste** : `peer-disabled:opacity-70` peut créer problèmes contraste

## 🎯 Actions Prioritaires

### 1. Créer Composants Accessibles de Base
- `LargeButton` : 44px+ minimum, texte 18px+
- `AccessibleInput` : Labels obligatoires, support erreurs ARIA
- `SeniorCard` : Sémantique correcte, focus management
- `ClearLabel` : Taille appropriée, contraste garanti

### 2. Standards à Appliquer
- **Tailles minimales** : 44x44px pour tous éléments interactifs
- **Police** : 18px minimum, 16px absolu minimum
- **Contraste** : 4.5:1 texte normal, 3:1 texte large
- **ARIA** : Labels, descriptions, états complets
- **Focus** : Visible, logique, keyboard-only navigation

### 3. Prochaines Étapes
1. Créer dossier `components/accessible/`
2. Implémenter composants de base améliorés
3. Tester avec lecteurs d'écran
4. Migrer formulaires vers nouvelles versions