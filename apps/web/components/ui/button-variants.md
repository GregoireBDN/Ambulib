# Variantes de Boutons - Ambulib

Ce document décrit les variantes de boutons disponibles dans l'application Ambulib.

## Variantes de Couleurs

### Variantes Solides

```tsx
// Bouton principal (bleu)
<Button variant="primary">Action principale</Button>

// Bouton de succès (vert)
<Button variant="success">Confirmer</Button>

// Bouton d'avertissement (jaune)
<Button variant="warning">Attention</Button>

// Bouton violet
<Button variant="purple">Action spéciale</Button>
```

### Variantes Outline

```tsx
// Outline bleu
<Button variant="outline-primary">Action secondaire</Button>

// Outline vert
<Button variant="outline-success">Voir détails</Button>

// Outline jaune
<Button variant="outline-warning">Modifier</Button>

// Outline violet
<Button variant="outline-purple">Paramètres</Button>
```

### Variantes Spéciales

```tsx
// Bouton de connexion sociale
<Button variant="social" size="lg">
  Continuer avec Google
</Button>
```

## Variantes Contextuelles

### Actions Rapides (Dashboard)

```tsx
// Actions principales
<Button variant="action-primary" size="action">
  Réserver maintenant
</Button>

// Actions de succès
<Button variant="action-success" size="action">
  Confirmer
</Button>

// Actions spéciales
<Button variant="action-purple" size="action">
  Paramètres
</Button>
```

### Call-to-Action (Landing Page)

```tsx
// CTA principal (fond clair)
<Button variant="cta-primary" size="cta">
  Commencer maintenant
</Button>

// CTA secondaire (fond clair)
<Button variant="cta-secondary" size="cta">
  En savoir plus
</Button>

// CTA d'avertissement
<Button variant="cta-warning" size="cta">
  Réserver maintenant
</Button>

// CTA blanc (pour fonds colorés)
<Button variant="cta-white" size="cta">
  Commencer maintenant
</Button>

// CTA outline blanc (pour fonds colorés)
<Button variant="cta-outline-white" size="cta">
  Se connecter
</Button>
```

## Tailles Disponibles

```tsx
// Tailles standard
<Button size="sm">Petit</Button>
<Button size="default">Normal</Button>
<Button size="lg">Grand</Button>
<Button size="xl">Très grand</Button>

// Tailles spécifiques Ambulib
<Button size="action">Action</Button>
<Button size="cta">Call-to-Action</Button>
<Button size="icon">Icône</Button>
```

## Exemples d'Utilisation

### Dashboard - Actions Rapides

```tsx
// Pour les cartes d'action rapide
<Button variant="action-primary" size="action" className="w-full">
  Accéder au dashboard
  <ArrowRight className="ml-2 h-4 w-4" />
</Button>
```

### Landing Page - Call-to-Action

```tsx
// CTA principal dans la section héro (fond clair)
<Button variant="cta-warning" size="cta">
  Réserver une ambulance
</Button>

// CTA secondaire (fond clair)
<Button variant="cta-secondary" size="cta">
  En savoir plus
</Button>

// CTA sur fond coloré (section CTA)
<Button variant="cta-white" size="cta">
  Commencer maintenant
</Button>

// CTA outline sur fond coloré
<Button variant="cta-outline-white" size="cta">
  Se connecter
</Button>
```

### Authentification

```tsx
// Bouton de connexion sociale
<Button variant="social" size="lg" className="w-full">
  Continuer avec Google
</Button>

// Utilisation avec le composant SocialSignInButton
<SocialSignInButton provider="google" icon={<GoogleIcon />}>
  Continuer avec Google
</SocialSignInButton>
```

### Formulaires

```tsx
// Bouton de soumission principal
<Button variant="primary" size="lg" className="w-full">
  Se connecter
</Button>

// Bouton de soumission de succès
<Button variant="success" size="lg" className="w-full">
  Créer mon compte
</Button>
```

### Actions Secondaires

```tsx
// Boutons outline pour les actions secondaires
<Button variant="outline-primary">
  Annuler
</Button>

<Button variant="outline-success">
  Voir les détails
</Button>
```

## Bonnes Pratiques

1. **Cohérence** : Utilisez les mêmes variantes pour les mêmes types d'actions
2. **Hiérarchie** : Utilisez `primary` pour les actions principales, `outline-*` pour les secondaires
3. **Contexte** : Adaptez la variante au contexte (dashboard vs landing page)
4. **Contraste** : Choisissez des variantes visibles sur le fond utilisé
5. **Accessibilité** : Les couleurs respectent les contrastes d'accessibilité

## Mapping des Couleurs

- **Bleu (primary)** : Actions principales, navigation
- **Vert (success)** : Confirmations, actions positives
- **Jaune (warning)** : CTAs importants, actions d'urgence
- **Violet (purple)** : Paramètres, actions spéciales
- **Blanc** : CTAs sur fonds colorés
- **Gris (social)** : Connexions sociales

## Variantes par Contexte

### Fond Clair (Landing Page)

- `cta-primary` - CTA principal bleu
- `cta-secondary` - CTA secondaire blanc avec bordure
- `cta-warning` - CTA d'urgence jaune

### Fond Coloré (Section CTA)

- `cta-white` - CTA blanc sur fond bleu
- `cta-outline-white` - CTA outline blanc sur fond bleu

### Authentification

- `social` - Boutons de connexion sociale (Google, Facebook, etc.)
