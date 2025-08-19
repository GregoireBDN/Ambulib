import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Input> = {
  title: 'Components/UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Champ de saisie avec variants d\'accessibilité médicale et patterns de validation intégrés.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'medical'],
      description: 'Variant du champ - medical pour l\'accessibilité renforcée',
    },
    medical: {
      control: { type: 'select' },
      options: ['none', 'vital-signs', 'medication', 'symptoms', 'general'],
      description: 'Contexte médical pour styling spécialisé',
    },
    urgency: {
      control: { type: 'select' },
      options: ['routine', 'urgent', 'emergency'],
      description: 'Niveau d\'urgence pour priorité visuelle',
    },
    validationPattern: {
      control: { type: 'select' },
      options: [undefined, 'phone', 'postal-code', 'medical-id', 'date-birth'],
      description: 'Pattern de validation automatique',
    },
    label: {
      control: 'text',
      description: 'Label du champ (active le mode field wrapper)',
    },
    description: {
      control: 'text',
      description: 'Description d\'aide',
    },
    error: {
      control: 'text',
      description: 'Message d\'erreur',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Type de champ de saisie',
    },
    placeholder: {
      control: 'text',
      description: 'Texte d\'aide affiché dans le champ vide',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le champ',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Saisir votre texte...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input type="email" id="email" placeholder="votre.email@exemple.com" />
    </div>
  ),
}

export const Password: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="password">Mot de passe</Label>
      <Input type="password" id="password" placeholder="••••••••" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    placeholder: 'Champ désactivé',
    disabled: true,
  },
}

export const Number: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="age">Âge</Label>
      <Input type="number" id="age" placeholder="25" min="0" max="120" />
    </div>
  ),
}

export const Phone: Story = {
  render: () => (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="phone">Téléphone</Label>
      <Input type="tel" id="phone" placeholder="01 23 45 67 89" />
    </div>
  ),
}

// Nouveaux variants avec label intégré

export const WithIntegratedLabel: Story = {
  args: {
    label: 'Nom complet',
    placeholder: 'Entrez votre nom et prénom',
    description: 'Nom tel qu\'il apparaît sur votre pièce d\'identité',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input avec label intégré et description d\'aide.',
      },
    },
  },
}

export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'nom@exemple.com',
    error: 'Veuillez entrer une adresse email valide',
    defaultValue: 'email-invalide',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input avec message d\'erreur accessible.',
      },
    },
  },
}

export const Required: Story = {
  args: {
    label: 'Téléphone',
    placeholder: '01 23 45 67 89',
    required: true,
    description: 'Numéro où nous pouvons vous joindre',
  },
}

// Variants médicaux

export const Medical: Story = {
  args: {
    variant: 'medical',
    medical: 'general',
    label: 'Informations médicales',
    placeholder: 'Décrivez vos antécédents...',
    description: 'Informations importantes pour votre transport',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input médical avec variant haute accessibilité (taille généreuse, contraste élevé).',
      },
    },
  },
}

export const MedicalMedication: Story = {
  args: {
    variant: 'medical',
    medical: 'medication',
    label: 'Médicaments actuels',
    placeholder: 'Ex: Doliprane 500mg, Kardégic 75mg',
    description: 'Listez tous vos traitements en cours avec dosage',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input spécialisé pour la saisie de médicaments.',
      },
    },
  },
}

export const MedicalEmergency: Story = {
  args: {
    variant: 'medical',
    medical: 'symptoms',
    urgency: 'emergency',
    label: 'Symptômes d\'urgence',
    placeholder: 'Décrivez vos symptômes actuels...',
    description: 'Informations critiques pour l\'intervention',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input d\'urgence pour symptômes critiques.',
      },
    },
  },
}

// Patterns de validation

export const PhonePattern: Story = {
  args: {
    label: 'Numéro de téléphone',
    validationPattern: 'phone',
    description: 'Format automatique : 01 23 45 67 89',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input avec pattern de validation téléphone et masque automatique.',
      },
    },
  },
}

export const PostalCodePattern: Story = {
  args: {
    label: 'Code postal',
    validationPattern: 'postal-code',
    description: '5 chiffres',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input avec validation code postal français.',
      },
    },
  },
}

export const MedicalIdPattern: Story = {
  args: {
    variant: 'medical',
    label: 'Numéro de sécurité sociale',
    validationPattern: 'medical-id',
    description: '15 chiffres de votre numéro de sécurité sociale',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input pour numéro de sécurité sociale avec validation.',
      },
    },
  },
}

export const DateBirthPattern: Story = {
  args: {
    label: 'Date de naissance',
    validationPattern: 'date-birth',
    description: 'Sélectionnez votre date de naissance',
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Input date avec limites automatiques (max 120 ans).',
      },
    },
  },
}

export const AccessibilityShowcase: Story = {
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Démonstration d'accessibilité</h3>
        <p className="text-sm text-muted-foreground">
          Tous les inputs incluent le support complet des lecteurs d'écran et navigation clavier.
        </p>
      </div>
      
      <Input
        label="Input standard"
        placeholder="Navigation Tab"
        description="Focus ring visible au clavier"
      />
      
      <Input
        variant="medical"
        label="Input médical"
        placeholder="Taille tactile 60px minimum"
        description="Optimisé pour les seniors"
      />
      
      <Input
        variant="medical"
        urgency="emergency"
        label="Input d'urgence"
        placeholder="Contraste élevé"
        description="Priorité visuelle maximale"
        error="Exemple de message d'erreur accessible"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Démonstration complète des fonctionnalités d\'accessibilité.',
      },
    },
  },
}