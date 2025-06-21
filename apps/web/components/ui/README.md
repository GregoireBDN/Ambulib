# Composants UI - Ambulib

Ce dossier contient les composants UI réutilisables d'Ambulib.

## Boutons

Le composant `Button` a été étendu avec des variantes spécifiques à Ambulib pour assurer la cohérence visuelle dans toute l'application.

### Variantes Disponibles

#### Variantes de Couleurs Solides

- `primary` - Bleu (actions principales)
- `success` - Vert (confirmations, actions positives)
- `warning` - Jaune (CTAs importants, actions d'urgence)
- `purple` - Violet (paramètres, actions spéciales)

#### Variantes Outline

- `outline-primary` - Bordure bleue
- `outline-success` - Bordure verte
- `outline-warning` - Bordure jaune
- `outline-purple` - Bordure violette

#### Variantes Contextuelles

- `action-primary` - Actions rapides (bleu)
- `action-success` - Actions rapides (vert)
- `action-purple` - Actions rapides (violet)
- `cta-primary` - Call-to-Action principal (bleu)
- `cta-secondary` - Call-to-Action secondaire (blanc avec bordure)
- `cta-warning` - Call-to-Action d'urgence (jaune)
- `cta-white` - Call-to-Action blanc (pour fonds colorés)
- `cta-outline-white` - Call-to-Action outline blanc (pour fonds colorés)
- `social` - Connexion sociale (Google, Facebook, etc.)

### Tailles Disponibles

- `sm` - Petit
- `default` - Normal
- `lg` - Grand
- `xl` - Très grand
- `action` - Pour les actions rapides
- `cta` - Pour les call-to-action
- `icon` - Pour les boutons avec icône

### Exemples d'Utilisation

```tsx
// Bouton principal
<Button variant="primary">Action principale</Button>

// Bouton de succès
<Button variant="success">Confirmer</Button>

// Bouton outline
<Button variant="outline-primary">Action secondaire</Button>

// Action rapide dans le dashboard
<Button variant="action-primary" size="action">
  Réserver maintenant
</Button>

// Call-to-Action dans la landing page (fond clair)
<Button variant="cta-warning" size="cta">
  Commencer maintenant
</Button>

// Call-to-Action sur fond coloré
<Button variant="cta-white" size="cta">
  Commencer maintenant
</Button>

// Call-to-Action outline sur fond coloré
<Button variant="cta-outline-white" size="cta">
  Se connecter
</Button>

// Bouton de connexion sociale
<Button variant="social" size="lg">
  Continuer avec Google
</Button>
```

## SubmitButton

Composant spécialisé pour les formulaires qui gère automatiquement l'état de chargement.

```tsx
<SubmitButton variant="primary" size="lg">
  Se connecter
</SubmitButton>
```

## SocialSignInButton

Composant générique pour les boutons de connexion sociale.

```tsx
<SocialSignInButton provider="google" icon={<GoogleIcon />}>
  Continuer avec Google
</SocialSignInButton>
```

## Bonnes Pratiques

1. **Cohérence** : Utilisez toujours les variantes prédéfinies
2. **Contexte** : Adaptez la variante au contexte d'utilisation
3. **Hiérarchie** : Utilisez `primary` pour les actions principales
4. **Contraste** : Choisissez des variantes visibles sur le fond utilisé
5. **Accessibilité** : Les couleurs respectent les contrastes WCAG

## Migration

Si vous avez des boutons avec des classes CSS personnalisées, remplacez-les par les variantes appropriées :

```tsx
// Avant
<Button className="bg-blue-600 hover:bg-blue-700 text-white">
  Action
</Button>

// Après
<Button variant="primary">
  Action
</Button>
```

## Variantes par Contexte

### Fond Clair

- `cta-primary`, `cta-secondary`, `cta-warning`

### Fond Coloré

- `cta-white`, `cta-outline-white`

### Authentification

- `social` - Boutons de connexion sociale
