# CLAUDE.md - HavRid Medical UI Design System

Package de composants UI de base et design system unifié pour HavRid - Optimisé pour l'accessibilité médicale avec shadcn/ui et système OKLCH scientifique.

## 🎯 Vue d'ensemble

**HavRid Medical UI** est le système de design central du monorepo, spécialement conçu pour les applications de services d'ambulance et soins médicaux. Il fournit 16 composants shadcn/ui accessibles, un système de couleurs OKLCH scientifique, et des patterns optimisés pour les personnes âgées et handicapées.

### Objectifs du Design System
- ✅ **Accessibilité WCAG 2.1 Level AA** : Contraste minimum 4.5:1, navigation clavier, lecteurs d'écran
- ✅ **Cohérence visuelle** : Tokens unifiés dans tout le monorepo HavRid  
- ✅ **Couleurs scientifiques** : Palette OKLCH optimisée pour le contexte médical
- ✅ **Components shadcn/ui** : 16 composants de base accessibles avec Radix UI
- ✅ **Base solide** : Foundation pour @repo/ui-accessible (composants seniors avancés)

### Stack technique

- **Framework**: React 19 avec TypeScript strict
- **Styling**: Tailwind CSS 4.x avec CSS-first + Variables OKLCH
- **Base Components**: 17 composants shadcn/ui + logo HavRid avec accessibilité Radix UI
- **Accessibilité**: Radix UI primitives + tests automatisés
- **Build**: Concurrent (TypeScript + CSS watch) + Storybook intégré
- **Documentation**: Storybook sur port 6006 + tests a11y automatiques

## 📊 Table des matières

- [🌈 Design Tokens & Foundations](#design-tokens--foundations)
- [🧩 Composants shadcn/ui + Logo (17)](#composants-shadcnui)
- [📜 Guidelines & Best Practices](#guidelines--best-practices)
- [🚀 Development & Build](#development--build)
- [🔧 Usage dans les Apps](#usage-dans-les-apps)

---

## 🌈 Design Tokens & Foundations

### Système de couleurs OKLCH scientifique

**OKLCH** = Espace colorimétrique perceptuel uniforme, optimal pour l'accessibilité médicale.
Chaque couleur est calibrée pour respecter WCAG 2.1 Level AA (contraste ≥ 4.5:1).

#### 🔵 Palette Primaire (Bleu Médical)
Couleur de confiance et sécurité, base du design system.

```css
/* Base : oklch(62.3% 0.214 259.815) */
--color-primary-500: oklch(62.3% 0.214 259.815);  /* Contraste 4.52:1 */
--color-primary-700: oklch(48.8% 0.243 264.376);  /* Contraste 5.83:1 - Recommandé */
--color-primary-900: oklch(37.9% 0.146 265.522);  /* Contraste 10.59:1 - Maximum */
```

#### 🟢 Palette Succès (Vert Médical)
Confirmation, santé, validation réussie.

```css
--color-success-500: oklch(64.8% 0.273 145.430);  /* Contraste 4.51:1 */
--color-success-700: oklch(47.2% 0.208 147.891);  /* Contraste 6.24:1 - Recommandé */
```

#### 🔴 Palette Erreur/Urgence (Rouge Médical)
Alerte, danger, erreurs critiques.

```css
--color-error-500: oklch(63.7% 0.237 25.331);     /* Contraste 4.68:1 */
--color-error-700: oklch(50.5% 0.213 27.518);     /* Contraste 6.89:1 - Recommandé */
--color-error-900: oklch(39.6% 0.141 25.723);     /* Contraste 12.45:1 - Maximum */
```

#### 🟡 Palette Avertissement (Ambre Médical)
Avertissements doux, attention requise.

```css
--color-warning-600: oklch(66.6% 0.179 58.318);   /* Contraste 4.74:1 */
--color-warning-700: oklch(55.5% 0.163 48.998);   /* Contraste 7.21:1 - Recommandé */
```

#### ⚫ Palette Neutre (Gris Accessible)
Texte, bordures, arrière-plans.

```css
--color-neutral-600: oklch(44.6% 0.03 256.802);   /* Texte secondaire */
--color-neutral-700: oklch(37.3% 0.034 259.733);  /* Contraste 7.04:1 */
--color-neutral-900: oklch(21% 0.034 264.665);    /* Contraste 15.36:1 - Texte principal */
```

### Architecture de tokens

```
packages/ui/src/
├── styles/
│   ├── theme.css              # 🌈 Tokens OKLCH + Variables CSS
│   ├── styles.css             # Point d'entrée global
│   └── globals.css            # Styles de base + compatibilité
├── components/
│   ├── ui/                     # 16 composants shadcn/ui
│   │   ├── button.tsx             🟦 6 variants + 4 sizes
│   │   ├── card.tsx               📋 Header, Content, Footer
│   │   ├── input.tsx              ⌨️ Validation + états
│   │   └── ...(+13 autres)
│   └── auth/                   # 8 composants authentification
│       ├── SignInForm.tsx         🔑 Formulaire connexion
│       ├── AuthCard.tsx           🃏 Wrapper authentification
│       └── ...(+6 autres)
└── tailwind.config.preset.js  # 🎨 Preset + utilitaires a11y
```

### Tokens d'accessibilité WCAG 2.1 AA

```css
/* Tailles tactiles minimum */
--size-touch: 44px;              /* Minimum WCAG 2.1 Level AA */

/* Focus indicators */
*:focus-visible {
  outline: 2px solid var(--color-ring);
  outline-offset: 2px;
}

/* Support contraste élevé */
@media (prefers-contrast: high) {
  :root {
    --border: 220 9% 46%;        /* Contraste renforcé */
    --ring: 217 33% 17%;         /* Focus plus visible */
  }
}

/* Réduction de mouvement */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🧩 Composants shadcn/ui + Logo

### Vue d'ensemble (17 composants)

Tous les composants sont basés sur **Radix UI** pour l'accessibilité native et utilisent **class-variance-authority** pour la gestion des variants. Le logo HavRid est inclus comme composant spécialisé avec support multi-tailles.

### 🟦 Button - Composant de base
**6 variants × 4 sizes = 24 configurations**

```tsx
import { Button } from "@repo/ui"

// Variants disponibles
<Button variant="default">Par défaut</Button>     // Bleu primaire
<Button variant="destructive">Supprimer</Button>  // Rouge erreur
<Button variant="outline">Contour</Button>       // Bordure simple
<Button variant="secondary">Secondaire</Button>   // Gris clair
<Button variant="ghost">Fantôme</Button>          // Transparent
<Button variant="link">Lien</Button>            // Style lien

// Tailles disponibles
<Button size="sm">Petit</Button>                 // 32px hauteur
<Button size="default">Normal</Button>           // 36px hauteur  
<Button size="lg">Large</Button>                // 40px hauteur
<Button size="icon">⚕</Button>                  // 36×36px carré
```

**API & Props:**
```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  asChild?: boolean  // Utilise Radix Slot pour composition
  disabled?: boolean
  onClick?: (event: MouseEvent) => void
  // + toutes les props HTML button standard
}
```

**Accessibilité intégrée:**
- ✅ Focus ring visible (2px solid + 2px offset)
- ✅ Support navigation clavier (Tab, Enter, Space)
- ✅ États disabled avec aria-disabled
- ✅ Taille tactile minimum 36×36px (> WCAG 44px avec padding)

### 📋 Card - Système de conteneurs
**Structure modulaire : Header + Content + Footer**

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@repo/ui"

// Structure complète recommandée
<Card>
  <CardHeader>
    <CardTitle>Informations patient</CardTitle>
    <CardDescription>Données médicales confidentielles</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Contenu principal de la carte...</p>
  </CardContent>
  <CardFooter>
    <Button>Action principale</Button>
  </CardFooter>
</Card>

// Usage médical typique
<Card className="border-primary/20">
  <CardHeader className="bg-primary/5">
    <CardTitle className="flex items-center gap-2">
      ⚕️ Dossier médical
    </CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    {/* Formulaires médicaux */}
  </CardContent>
</Card>
```

### ⌨️ Input - Champs de saisie médicaux
**États : normal, focus, error, disabled**

```tsx
import { Input, Label } from "@repo/ui"

// Pattern médical recommandé
<div className="space-y-2">
  <Label htmlFor="medication" className="text-sm font-medium">
    Médicaments actuels *
  </Label>
  <Input
    id="medication"
    type="text"
    placeholder="Ex: Doliprane 500mg, Kardégic 75mg"
    className="border-primary/30 focus:border-primary"
    aria-describedby="medication-hint"
    required
  />
  <p id="medication-hint" className="text-xs text-muted-foreground">
    Listez tous vos traitements en cours avec dosage
  </p>
</div>

// États d'erreur
<Input
  className="border-error focus:border-error aria-invalid:ring-error/20"
  aria-invalid={true}
  aria-describedby="error-message"
/>
```

### 📝 Form - Validation médicale
**Intégration React Hook Form + Zod**

```tsx
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui"

// Pattern médical avec validation
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
    <FormField
      control={form.control}
      name="age"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Âge du patient *</FormLabel>
          <FormControl>
            <Input
              type="number"
              min="0"
              max="120"
              placeholder="25"
              {...field}
            />
          </FormControl>
          <FormMessage />  {/* Erreurs automatiques */}
        </FormItem>
      )}
    />
  </form>
</Form>
```

### 💬 Dialog - Modales accessibles
**Focus trap + gestion ESC + overlay**

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@repo/ui"

// Modal de confirmation médicale
<Dialog>
  <DialogTrigger asChild>
    <Button variant="destructive">Annuler rendez-vous</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-md">
    <DialogHeader>
      <DialogTitle>Confirmer l'annulation</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <p>Le patient sera automatiquement notifié par SMS.</p>
      <div className="flex gap-3 justify-end">
        <Button variant="outline">Retour</Button>
        <Button variant="destructive">Confirmer</Button>
      </div>
    </div>
  </DialogContent>
</Dialog>
```

### 📧 Dropdown Menu - Menus contextuels
**Navigation clavier + indicateurs visuels**

```tsx
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@repo/ui"

// Menu actions patient
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Actions patient ▼</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuItem>
      📝 Voir dossier médical
    </DropdownMenuItem>
    <DropdownMenuItem>
      📞 Contacter patient
    </DropdownMenuItem>
    <DropdownMenuItem className="text-destructive">
      ⚙️ Modifier informations
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### 🏥 HavRid Logo - Logo d'entreprise
**6 tailles disponibles avec accessibilité intégrée**

```tsx
import { HavRidLogo } from "@repo/ui"

// Tailles disponibles (NOUVELLE ÉCHELLE)
<HavRidLogo size="sm" />      // 64px hauteur - Interfaces compactes lisibles
<HavRidLogo size="md" />      // 80px hauteur - Par défaut (headers standard)
<HavRidLogo size="lg" />      // 112px hauteur - Landing pages, sections importantes
<HavRidLogo size="xl" />      // 160px hauteur - Pages d'accueil, sections hero
<HavRidLogo size="2xl" />     // 256px hauteur - Écrans 4K, signalétique numérique
<HavRidLogo size="3xl" />     // 320px hauteur - Signalétique murale, écrans géants

// Usage avec classes personnalisées
<HavRidLogo size="md" className="bg-white p-3 rounded-md shadow-sm" />
```

**API & Props:**
```typescript
interface HavRidLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'  // Taille du logo
  className?: string                                 // Classes CSS supplémentaires
}
```

**Accessibilité intégrée:**
- ✅ `role="img"` automatique pour les lecteurs d'écran
- ✅ `aria-label="Logo HavRid - Services d'ambulance"` descriptif
- ✅ Support responsive avec classes Tailwind
- ✅ SVG vectoriel pour netteté sur tous écrans

**Contextes d'utilisation (NOUVELLE ÉCHELLE):**
- **Headers d'application** : `size="md"` (standard) ou `size="lg"` (importantes)
- **Pages d'authentification** : `size="lg"` ou `size="xl"` 
- **Footers** : `size="md"` avec informations d'entreprise
- **États de chargement** : `size="lg"` ou `size="xl"` avec animation
- **Interfaces compactes** : `size="sm"` pour navigation secondaire
- **Écrans 4K/ultra-wide** : `size="2xl"` pour dashboards grands écrans
- **Signalétique d'urgence** : `size="3xl"` pour affichage mural haute visibilité

> ⚠️ **BREAKING CHANGE v1.1 - Nouvelle échelle HavRidLogo** 
> 
> **TOUS LES LOGOS SONT MAINTENANT PLUS GRANDS** après cette mise à jour :
> - `sm` : 32px → **64px** (+100%) 
> - `md` : 48px → **80px** (+67%)
> - `lg` : 64px → **112px** (+75%)
> - `xl` : 80px → **160px** (+100%)
> - `2xl` : 112px → **256px** (+129%)
> - `3xl` : 160px → **320px** (+100%)
>
> **Nouvelles possibilités :** 
> - Tailles géantes `2xl` (256px) et `3xl` (320px) pour écrans 4K et signalétique
> - Échelle optimisée pour interfaces médicales avec meilleure visibilité
> 
> **Migration :** Aucun changement de code requis, mais vérifiez l'affichage sur vos interfaces après mise à jour.

**Autres composants shadcn/ui disponibles:**
- **Accordion** : FAQ, sections dépliables
- **Avatar** : Photos profil patients/personnel
- **Badge** : Statuts, priorités, catégories
- **Breadcrumb** : Navigation hiérarchique
- **Drawer** : Panels latéraux mobile
- **Navigation Menu** : Navigation principale
- **Table** : Listes patients, plannings
- **Tooltip** : Aide contextuelle

---

## 🔐 Composants Authentication

### Vue d'ensemble (8 composants)

Système d'authentification spécialisé pour le contexte médical HavRid, avec validation renforcée et UX accessible.

### 🃏 AuthCard - Wrapper authentification
**Container principal pour tous les flux auth**

```tsx
import { AuthCard } from "@repo/ui"

<AuthCard 
  title="Connexion Ambulancier"
  description="Accédez à votre interface de gestion des interventions"
  showLogo={true}
>
  {/* Contenu du formulaire d'authentification */}
</AuthCard>
```

**API:**
```typescript
interface AuthCardProps {
  title: string                    // Titre principal (ex: "Connexion Patient")
  description?: string             // Description contextuelle
  children: React.ReactNode        // Contenu du formulaire
  showLogo?: boolean              // Affichage logo HavRid (défaut: true)
  className?: string              // Classes personnalisées
}
```

### 🔑 SignInForm - Connexion sécurisée
**Formulaire complet avec validation temps réel**

```tsx
import { SignInForm } from "@repo/ui"

// Flux de connexion patient
<SignInForm
  onSubmit={async (data) => {
    await signIn(data.email, data.password)
  }}
  onError={(error) => {
    toast.error(error.message)
  }}
  providers={['google', 'microsoft']}  // OAuth médical
  userType="patient"                   // patient | ambulancier | admin
/>
```

### 🔐 PasswordInput - Saisie mot de passe
**Indicateur de sécurité + visibilité toggle**

```tsx
import { PasswordInput } from "@repo/ui"

<PasswordInput
  placeholder="Mot de passe sécurisé"
  showStrengthIndicator={true}     // Barre de force
  minLength={8}                   // Contraintes médicales
  requireSpecialChar={true}
  aria-label="Mot de passe professionnel"
/>
```

### ⚠️ AuthErrorAlert - Gestion d'erreurs
**Alertes contextuelles avec actions**

```tsx
import { AuthErrorAlert } from "@repo/ui"

<AuthErrorAlert
  type="invalid_credentials"
  message="Identifiants incorrects. Vérifiez vos informations."
  action={
    <Button variant="outline" size="sm">
      Mot de passe oublié ?
    </Button>
  }
/>
```

**Types d'erreurs gérés:**
- `invalid_credentials` : Identifiants incorrects
- `account_locked` : Compte temporairement bloqué
- `network_error` : Problème de connexion
- `server_error` : Erreur serveur temporaire
- `two_factor_required` : 2FA requis

### ⏳ AuthLoadingSpinner - États de chargement
**Feedback visuel pendant l'authentification**

```tsx
import { AuthLoadingSpinner, InlineLoadingSpinner } from "@repo/ui"

// Spinner principal (remplace tout le contenu)
<AuthLoadingSpinner message="Connexion en cours..." />

// Spinner inline (dans un bouton)
<Button disabled>
  <InlineLoadingSpinner className="mr-2" />
  Connexion...
</Button>
```

### ⚙️ AuthFormField - Champs spécialisés
**Validation médicale + assistance**

```tsx
import { AuthFormField } from "@repo/ui"

// Champ numéro ADELI (professionnel santé)
<AuthFormField
  type="adeli"
  label="Numéro ADELI"
  placeholder="12345678901"
  validation={adeliValidation}
  helpText="Numéro d'identification des professionnels de santé"
/>

// Champ numéro sécurité sociale
<AuthFormField
  type="social_security"
  label="Numéro de sécurité sociale"
  mask="1 23 45 67 890 123 45"  // Masque de saisie
  sensitive={true}               // Données sensibles
/>
```

### 🟦 AuthButton - Boutons contextuels
**Variants spécialisés pour l'authentification**

```tsx
import { AuthButton, SocialAuthButton } from "@repo/ui"

// Bouton principal
<AuthButton
  variant="primary"
  loading={isLoading}
  disabled={!isFormValid}
>
  Se connecter
</AuthButton>

// Authentification sociale (OAuth médical)
<SocialAuthButton
  provider="google"
  variant="healthcare"
  onClick={() => signInWithGoogle()}
>
  Connexion Google Santé
</SocialAuthButton>
```

**Flux d'authentification complet:**
```tsx
// Exemple d'implémentation complète
function PatientSignIn() {
  return (
    <AuthCard 
      title="Espace Patient" 
      description="Gérez vos trajets ambulance en toute sécurité"
    >
      <SignInForm
        userType="patient"
        onSubmit={handleSignIn}
        onError={handleError}
      >
        <AuthFormField type="email" required />
        <PasswordInput showStrengthIndicator />
        
        {error && (
          <AuthErrorAlert 
            type={error.type} 
            message={error.message} 
          />
        )}
        
        <AuthButton loading={isLoading}>
          {isLoading ? (
            <><InlineLoadingSpinner /> Connexion...</>
          ) : (
            "Se connecter"
          )}
        </AuthButton>
        
        <SocialAuthButton provider="google" />
      </SignInForm>
    </AuthCard>
  )
}
```

---

### Système d'exports optimisé
```typescript
// Export principal du package (25 composants)
export * from "./components/ui"      // 17 composants shadcn/ui + logo
export * from "./components/auth"    // 8 composants authentification
export { cn } from "./lib/utils"     // Utilitaires classe

// Exports individuels pour tree-shaking optimal
// shadcn/ui Components + Logo
export { Button, buttonVariants, type ButtonProps } from "./components/ui/button"
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "./components/ui/card"
export { Input } from "./components/ui/input"
export { Label } from "./components/ui/label"
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./components/ui/dialog"
export { HavRidLogo } from "./components/ui/havrid-logo"
// ... +11 autres composants shadcn/ui

// Auth Components
export { AuthCard, AuthFormField, PasswordInput, AuthButton, SocialAuthButton } from "./components/auth"
export { AuthErrorAlert, AuthLoadingSpinner, InlineLoadingSpinner } from "./components/auth"
export { SignInForm, SignUpForm } from "./components/auth"

// Note: Composants accessibles seniors déplacés vers @repo/ui-accessible
// import { EmergencyButton, SeniorCard } from "@repo/ui-accessible"
```

---

## 📜 Guidelines & Best Practices

### ✅ Accessibilité WCAG 2.1 AA

**Standards obligatoires :**
- **Contraste minimum** : 4.5:1 pour le texte normal, 3:1 pour le texte large
- **Taille tactile** : 44×44px minimum pour tous les éléments interactifs
- **Focus visible** : Ring de 2px + offset 2px sur tous les composants
- **Navigation clavier** : Support complet Tab, Shift+Tab, Enter, Escape, flèches
- **Lecteurs d'écran** : Attributes ARIA appropriés sur tous les composants

**Tests automatisés intégrés :**
```bash
# Storybook avec addon-a11y
pnpm storybook  # Port 6006 - Tests a11y automatiques

# Tests manuel recommandés
# macOS: VoiceOver (Cmd + F5)
# Windows: NVDA (gratuit)
# Extension navigateur: axe-core DevTools
```

### 🎨 Patterns de composition

**Pattern Modal médical :**
```tsx
// ✅ Bon - Structure accessible complète
function PatientInfoModal({ patient }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          📋 Dossier {patient.name}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Dossier médical - {patient.name}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Date de naissance</Label>
                  <p className="text-sm">{patient.birthDate}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Numéro sécurité sociale</Label>
                  <p className="text-sm font-mono">{patient.socialSecurity}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

**Pattern Formulaire médical :**
```tsx
// ✅ Bon - Validation + feedback accessibles
function MedicalForm() {
  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Groupement logique avec fieldset */}
        <fieldset className="space-y-4 border border-border rounded-lg p-4">
          <legend className="text-sm font-medium px-2">Informations médicales</legend>
          
          <FormField
            name="medications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Médicaments actuels *</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: Doliprane 500mg 3x/jour"
                    className="border-primary/30 focus:border-primary"
                  />
                </FormControl>
                <FormMessage />  {/* Erreur accessible automatique */}
              </FormItem>
            )}
          />
        </fieldset>
        
        <div className="flex gap-3 justify-end">
          <Button variant="outline" type="button">
            Annuler
          </Button>
          <Button type="submit" disabled={!form.formState.isValid}>
            {isLoading ? (
              <><InlineLoadingSpinner className="mr-2" />Enregistrement...</>
            ) : (
              "Enregistrer"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

### 📱 Responsive Design

**Breakpoints Tailwind CSS :**
```css
/* Mobile-first approach */
sm: 640px   /* Tablettes portrait */
md: 768px   /* Tablettes paysage */
lg: 1024px  /* Desktop */
xl: 1280px  /* Large desktop */
2xl: 1536px /* Ultra-wide */
```

**Patterns responsive pour le médical :**
```tsx
// ✅ Layout adaptatif pour interface ambulancier
<div className="
  grid 
  grid-cols-1         /* Mobile : 1 colonne */
  md:grid-cols-2      /* Tablette : 2 colonnes */
  xl:grid-cols-3      /* Desktop : 3 colonnes */
  gap-4 md:gap-6
">
  {/* Cards patients/interventions */}
</div>

// ✅ Navigation adaptative
<div className="
  flex flex-col       /* Mobile : vertical */
  md:flex-row         /* Desktop : horizontal */
  gap-2 md:gap-4
">
  <Button size="sm" className="md:size-default">
    Action mobile
  </Button>
</div>
```

### ⚡ Performance & Optimisation

**Tree-shaking optimal :**
```tsx
// ✅ Bon - Import spécifique
import { Button } from "@repo/ui/button"
import { Card, CardContent } from "@repo/ui/card"

// ❌ Éviter - Import global (bundle plus lourd)
import { Button, Card, CardContent } from "@repo/ui"
```

**Lazy loading pour modals lourdes :**
```tsx
// ✅ Bon - Modal chargée uniquement si nécessaire
const HeavyPatientModal = React.lazy(() => import('./HeavyPatientModal'))

function PatientCard() {
  const [showModal, setShowModal] = React.useState(false)
  
  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        Voir détails
      </Button>
      
      {showModal && (
        <Suspense fallback={<AuthLoadingSpinner />}>
          <HeavyPatientModal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </>
  )
}
```

### 🌙 Dark Mode (Futur)

**Variables CSS prêtes :**
```css
/* Structure préparée pour dark mode */
:root {
  --background: var(--color-white);
  --foreground: var(--color-neutral-900);
}

.dark {
  --background: var(--color-neutral-900);
  --foreground: var(--color-white);
}
```

### ⚙️ Guidelines de développement

**Do's ✅**
- Utiliser les couleurs OKLCH recommandées (primary-700, error-700, etc.)
- Tester la navigation clavier sur tous les nouveaux composants
- Inclure des labels explicites et des descriptions d'aide
- Respecter la hiérarchie sémantique HTML (h1 → h6)
- Utiliser les utilitaires `.sr-only` pour les informations lecteur d'écran

**Don'ts ❌**
- Ne jamais utiliser uniquement la couleur pour transmettre l'information
- Éviter les animations non-essentielles (respect `prefers-reduced-motion`)
- Ne pas oublier les états focus/hover/disabled
- Éviter les contrastes insuffisants (<4.5:1)
- Ne pas imbriquer les éléments interactifs (button dans button)

---

## 🚀 Development & Build

### Scripts de développement

```bash
# Développement avec watch mode
pnpm dev                    # TypeScript + CSS watch + Storybook
pnpm dev:styles            # CSS watch uniquement
pnpm storybook             # Storybook port 6006 uniquement

# Build de production
pnpm build                 # TypeScript + CSS build
pnpm build:styles          # CSS build uniquement

# Qualité
pnpm lint                  # ESLint avec règles accessibilité
pnpm check-types          # TypeScript strict check
pnpm test                  # Jest + Testing Library + a11y
```

### Configuration Tailwind CSS 4.x

```typescript
// tailwind.config.ts - CSS-first approach
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // Configuration automatique via theme.css
  // + preset JavaScript pour utilitaires a11y
} satisfies Config
```

**Preset partagé :**
```javascript
// tailwind.config.preset.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Couleurs OKLCH via variables CSS
        primary: {
          500: 'var(--color-primary-500)',
          700: 'var(--color-primary-700)', // Recommandé
        },
      },
    },
  },
  plugins: [
    // Utilitaires accessibilité
    function({ addUtilities }) {
      addUtilities({
        '.sr-only': { /* Screen reader only */ },
        '.touch-target': { minHeight: '44px', minWidth: '44px' },
      });
    },
  ],
};
```

### Tests d'accessibilité intégrés

```javascript
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  testEnvironment: 'jsdom',
};

// src/test-setup.ts
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)
```

**Exemple de test :**
```typescript
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'
import { Button } from './button'

test('Button is accessible', async () => {
  const { container } = render(<Button>Test</Button>)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Storybook Configuration

```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',        // Tests accessibilité automatiques
    '@storybook/addon-viewport',     // Tests responsive
  ],
  
  async viteFinal(config) {
    return {
      ...config,
      plugins: [
        ...(config.plugins || []),
        // Tailwind CSS v4 support
        (await import('@tailwindcss/vite')).default(),
      ],
    };
  },
};
```

---

## 🔧 Usage dans les Apps

### Installation automatique

```json
// Dans package.json de toutes les apps du monorepo
{
  "dependencies": {
    "@repo/ui": "workspace:*",           // Package principal UI
    "@repo/ui-accessible": "workspace:*" // Uniquement pour app client
  },
  "devDependencies": {
    "@repo/eslint-config": "workspace:*",
    "@repo/typescript-config": "workspace:*"
  }
}
```

### Configuration Tailwind (presets)

```javascript
// tailwind.config.ts (dans chaque app)
module.exports = {
  // Utilisation du preset partagé
  presets: [require("@repo/ui/tailwind.config.preset.js")],
  
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    // Inclure les composants UI dans le scan
    "../../packages/ui/src/**/*.{js,jsx,ts,tsx}",
  ],
  
  theme: {
    extend: {
      // Personnalisations spécifiques à l'app si nécessaires
      colors: {
        'app-specific': 'oklch(60% 0.2 180)',
      },
    },
  },
};
```

### Import des composants

```tsx
// Dans les applications HavRid
import {
  // 17 composants shadcn/ui + logo
  Accordion, Avatar, Badge, Breadcrumb, Button, Card, Dialog,
  Drawer, DropdownMenu, Form, Input, Label, NavigationMenu, 
  Table, Tooltip, HavRidLogo,
  
  // 8 composants authentification
  AuthCard, AuthFormField, PasswordInput, AuthButton,
  AuthErrorAlert, AuthLoadingSpinner, SignInForm, SignUpForm,
  
  // Utilitaires
  cn
} from "@repo/ui"

// Import séparé pour composants seniors (app client uniquement)
import {
  EmergencyButton, SeniorCard, AccessibleForm,
  MedicalInput, AnnouncementRegion
} from "@repo/ui-accessible"
```

### Import des styles (CSS-first)

```css
/* Dans app/globals.css de chaque application */
@import "tailwindcss";

/* Tokens de design centralisés - OBLIGATOIRE */
@import "@repo/ui/styles/theme.css";

/* Styles de base des composants */
@import "@repo/ui/styles/globals.css";

/* Point d'entrée principal */
@import "@repo/ui/styles.css";

/* App client uniquement - Styles accessibilité renforcée */
@import "@repo/ui-accessible/src/styles/globals.css";
```

### Exemples d'implémentation par app

#### 👥 App Client (Patients/Gardiens)
```tsx
// Utilisation mixte UI + UI-Accessible
import { Card, CardContent, Button } from "@repo/ui"
import { EmergencyButton, SeniorCard } from "@repo/ui-accessible"

function PatientDashboard() {
  return (
    <div className="space-y-6">
      {/* Bouton urgence haute visibilité */}
      <EmergencyButton className="mb-8">
        🚑 URGENCE - Appeler ambulance
      </EmergencyButton>
      
      {/* Cards standard pour informations */}
      <div className="grid md:grid-cols-2 gap-4">
        <SeniorCard 
          title="Prochaine course"
          icon="🕰️"
          accessible={true}
        >
          <p>Rendez-vous médical - Hôpital Saint-Louis</p>
          <p>Demain 14h30</p>
        </SeniorCard>
        
        <Card>
          <CardContent className="p-6">
            <h3>Historique des courses</h3>
            <Button variant="outline">Voir l'historique</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
```

#### 🚑 App Fleet (Gestionnaires)
```tsx
// Utilisation UI standard pour interfaces professionnelles
import { Button, Card, Badge, Table, HavRidLogo } from "@repo/ui"

function FleetDashboard() {
  return (
    <div className="space-y-6">
      {/* Interface professionnelle standard avec logo */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <HavRidLogo size="md" />
          <h1 className="text-2xl font-bold">Gestion de flotte</h1>
        </div>
        <Button>
          + Nouvelle intervention
        </Button>
      </div>
      
      <Card>
        <CardContent>
          <Table>
            {/* Liste des ambulances et statuts */}
            <TableRow>
              <TableCell>AMB-001</TableCell>
              <TableCell>
                <Badge variant="success">Disponible</Badge>
              </TableCell>
            </TableRow>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
```

#### ⚙️ App Admin (Administrateurs)
```tsx
// Interface admin avec composants auth et logo
import { AuthCard, SignInForm, Button, Dialog, HavRidLogo } from "@repo/ui"

function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <HavRidLogo size="lg" className="mx-auto mb-4" />
        </div>
        <AuthCard
          title="Administration HavRid"
          description="Accès réservé aux administrateurs système"
        >
          <SignInForm
            userType="admin"
            providers={['microsoft']} // OAuth entreprise
            onSubmit={handleAdminLogin}
          />
        </AuthCard>
      </div>
    </div>
  )
}
```

### Bonnes pratiques d'usage

**✅ Recommandations :**
1. **App Client** : Privilégier `@repo/ui-accessible` pour UX seniors optimisée
2. **Apps Pro** : Utiliser `@repo/ui` standard pour interfaces efficaces
3. **Authentification** : Toujours utiliser les composants auth du package
4. **Responsive** : Tester sur tous breakpoints (mobile → desktop)
5. **Accessibilité** : Valider avec lecteurs d'écran et navigation clavier

**❌ À éviter :**
1. Mélanger les styles Tailwind avec des CSS externes non-accessibles
2. Oublier d'importer `theme.css` (couleurs OKLCH manquantes)
3. Utiliser des couleurs non-OKLCH pour le contenu médical
4. Ignorer les states disabled/loading dans les formulaires auth

---

## 📚 Ressources & Documentation

### Liens utiles
- **Storybook UI** : http://localhost:6006 (composants + tests a11y)
- **Storybook Accessible** : http://localhost:6007 (composants seniors)
- **shadcn/ui Docs** : https://ui.shadcn.com/docs
- **Radix UI Primitives** : https://www.radix-ui.com/primitives
- **WCAG 2.1 Guidelines** : https://www.w3.org/WAI/WCAG21/quickref/
- **OKLCH Color Picker** : https://oklch.com

### Support et contribution

**Ajouter un nouveau composant :**
1. Créer le composant dans `src/components/ui/` ou `src/components/auth/`
2. Exporter dans `src/index.ts`
3. Créer les stories Storybook
4. Tester l'accessibilité (axe-core + manuel)
5. Documenter dans ce CLAUDE.md
6. Mettre à jour les apps consommatrices

**Guidelines de contribution :**
- Respecter les couleurs OKLCH scientifiques
- Suivre les standards WCAG 2.1 AA obligatoires  
- Tester sur lecteurs d'écran (VoiceOver, NVDA)
- Maintenir la compatibilité TypeScript strict
- Documenter les breaking changes

---

_Documentation du HavRid Medical UI Design System v1.0 - Optimisé pour l'accessibilité médicale_ 🎨⚕️


