# Guide de Tests d'Accessibilité - Ambulib

## Objectif
Garantir une accessibilité WCAG 2.1 Level AA pour notre cible : personnes âgées et handicapées

## Outils de Test Automatisés

### 1. Installation des dépendances
```bash
# Tests automatisés
pnpm add -D @axe-core/react axe-core
pnpm add -D jest-axe @testing-library/jest-dom

# Tests visuels
pnpm add -D @storybook/addon-a11y
```

### 2. Configuration Jest (apps/web/jest.config.js)
```javascript
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  // ... autres configs
};
```

### 3. Setup Jest (apps/web/jest.setup.js)
```javascript
import 'jest-axe/extend-expect';
import '@testing-library/jest-dom';
```

## Tests Automatisés par Composant

### Tests LargeButton
```typescript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { LargeButton } from '@/components/accessible/LargeButton';

expect.extend(toHaveNoViolations);

describe('LargeButton Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <LargeButton variant="primary">Test Button</LargeButton>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have minimum touch target size', () => {
    const { getByRole } = render(
      <LargeButton>Test</LargeButton>
    );
    const button = getByRole('button');
    const styles = window.getComputedStyle(button);
    const height = parseInt(styles.height);
    expect(height).toBeGreaterThanOrEqual(44); // WCAG requirement
  });
});
```

### Tests AccessibleInput
```typescript
describe('AccessibleInput Accessibility', () => {
  it('should have proper ARIA attributes', () => {
    const { getByLabelText, getByRole } = render(
      <AccessibleInput
        id="test-input"
        label="Test Label"
        error="Test error"
        helpText="Test help"
        required
      />
    );
    
    const input = getByLabelText('Test Label *');
    expect(input).toHaveAttribute('aria-required', 'true');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby');
  });
});
```

## Checklist Tests Manuels

### Contraste des Couleurs
- [ ] Texte normal : ratio minimum 4.5:1
- [ ] Texte large (18pt+) : ratio minimum 3:1
- [ ] Éléments UI : ratio minimum 3:1
- [ ] États focus : contraste suffisant

**Outil**: Colour Contrast Analyser, WebAIM Contrast Checker

### Navigation Clavier
- [ ] Tous les éléments interactifs accessibles au Tab
- [ ] Ordre de tabulation logique
- [ ] Focus visible (outline, ring)
- [ ] Pas de piège clavier
- [ ] Raccourcis clavier documentés

**Test**: Navigation complète sans souris

### Lecteurs d'Écran
- [ ] NVDA : Navigation et lecture correctes
- [ ] JAWS : Compatibilité complète
- [ ] VoiceOver : Support macOS/iOS
- [ ] Narrator : Support Windows

**Scénarios tests**:
1. Connexion complète
2. Réservation transport
3. Navigation dashboard
4. Utilisation bouton urgence

### Zoom et Agrandissement
- [ ] Zoom 200% : contenu utilisable
- [ ] Zoom 400% : pas de perte d'information
- [ ] Responsive design maintenu
- [ ] Texte non tronqué

### Tailles et Espacement
- [ ] Boutons minimum 44x44px
- [ ] Police minimum 18px (16px acceptable)
- [ ] Espacement suffisant entre éléments
- [ ] Zones de clic généreuses

## Tests Spécifiques Personnes Âgées

### Facilité d'Utilisation
- [ ] Actions en 3 clics maximum
- [ ] Confirmations pour actions importantes
- [ ] Annulation facile des actions
- [ ] Aide contextuelle disponible

### Lisibilité
- [ ] Polices sans-serif, bien lisibles
- [ ] Contrastes élevés
- [ ] Pas d'italique dans les textes longs
- [ ] Tailles de police appropriées

### Compréhension
- [ ] Langage simple et clair
- [ ] Instructions étape par étape
- [ ] Pas de jargon technique
- [ ] Messages d'erreur explicites

## Tests d'Intégration

### Formulaires Multi-Étapes
```typescript
describe('MultiStepSignUpForm Integration', () => {
  it('should save progress automatically', () => {
    // Test sauvegarde localStorage
  });

  it('should maintain focus on step navigation', () => {
    // Test focus management
  });

  it('should announce step changes to screen readers', () => {
    // Test ARIA live regions
  });
});
```

### Graphiques Accessibles
```typescript
describe('AccessibleChart', () => {
  it('should provide text alternative', () => {
    // Test description textuelle
  });

  it('should allow keyboard navigation of data', () => {
    // Test navigation clavier des données
  });
});
```

## Métriques d'Accessibilité

### Automatisées (CI/CD)
- Score Lighthouse Accessibility > 95
- 0 violation axe-core
- Couverture tests a11y > 80%

### Manuelles (Mensuelles)
- Temps de complétion tâches seniors
- Taux d'erreur utilisateur
- Satisfaction questionnaires
- Feedback support client

## Commandes de Test

```bash
# Tests d'accessibilité automatisés
pnpm test:a11y

# Audit Lighthouse complet
pnpm audit:lighthouse

# Tests e2e avec accessibilité
pnpm test:e2e:a11y

# Rapport complet d'accessibilité
pnpm report:accessibility
```

## Critères de Réussite

### Obligatoires (Bloquants)
- [ ] 0 violation WCAG 2.1 AA critique
- [ ] Navigation clavier 100% fonctionnelle
- [ ] Lecteurs d'écran compatibles
- [ ] Contraste couleurs conforme

### Recommandés (Améliorations)
- [ ] Score Lighthouse A11y > 98
- [ ] Temps de tâche < médiane marché
- [ ] Feedback utilisateurs positif > 90%
- [ ] Support téléphonique < 10% des utilisations

## Tests Utilisateurs Réels

### Profils Testeurs
1. **Senior 65-75 ans** : Bon niveau tech
2. **Senior 75+ ans** : Niveau tech limité
3. **Malvoyant** : Utilisateur lecteur d'écran
4. **Mobilité réduite** : Navigation clavier uniquement
5. **Troubles cognitifs** : Difficultés mémoire/attention

### Scénarios Tests
1. Création compte et première réservation
2. Modification rendez-vous existant
3. Utilisation bouton urgence
4. Navigation dashboard complet
5. Contact support téléphonique

### Métriques Mesurées
- Temps de complétion par tâche
- Nombre d'erreurs par utilisateur
- Taux d'abandon par étape
- Score satisfaction (1-10)
- Préférence téléphone vs web