import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Progress } from './progress'

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant de barre de progression basé sur shadcn/ui avec Radix UI. Utilisé pour afficher la completion de profils médicaux, progression de formulaires, etc.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Valeur de progression entre 0 et 100',
    },
    className: {
      control: 'text',
      description: 'Classes CSS supplémentaires',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    value: 50,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const Empty: Story = {
  args: {
    value: 0,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Barre de progression vide (0%)',
      },
    },
  },
}

export const Quarter: Story = {
  args: {
    value: 25,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Progression à 25% - profil médical partiellement rempli',
      },
    },
  },
}

export const Half: Story = {
  args: {
    value: 50,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Progression à 50% - profil médical à mi-parcours',
      },
    },
  },
}

export const ThreeQuarters: Story = {
  args: {
    value: 75,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Progression à 75% - profil médical presque complet',
      },
    },
  },
}

export const Complete: Story = {
  args: {
    value: 100,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Progression complète (100%) - profil médical terminé',
      },
    },
  },
}

// Exemples contextuels médicaux

export const MedicalProfileCompletion: Story = {
  args: {
    value: 65,
    className: '[&>div]:bg-blue-500',
  },
  decorators: [
    (Story) => (
      <div className="w-96 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Profil médical</span>
          <span className="text-muted-foreground">65/100</span>
        </div>
        <Story />
        <p className="text-xs text-muted-foreground">
          Informations manquantes : allergies, médecin traitant
        </p>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Exemple d\'utilisation pour l\'avancement d\'un profil médical avec contexte',
      },
    },
  },
}

export const EmergencyResponse: Story = {
  args: {
    value: 30,
    className: '[&>div]:bg-red-500 [&>div]:animate-pulse',
  },
  decorators: [
    (Story) => (
      <div className="w-96 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-red-600">🚨 Intervention en cours</span>
          <span className="text-red-600 font-mono">30%</span>
        </div>
        <Story />
        <p className="text-xs text-red-600">
          Ambulance en route - ETA 8 minutes
        </p>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Utilisation pour le suivi d\'intervention d\'urgence avec animation pulse',
      },
    },
  },
}

export const FormStepProgress: Story = {
  args: {
    value: 40,
    className: '[&>div]:bg-green-500',
  },
  decorators: [
    (Story) => (
      <div className="w-96 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Étape 2 sur 5</span>
          <span className="text-muted-foreground">40%</span>
        </div>
        <Story />
        <p className="text-xs text-muted-foreground">
          Informations personnelles → <strong>Informations médicales</strong> → Contact d'urgence
        </p>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Progression de formulaire multi-étapes pour inscription patient',
      },
    },
  },
}

// Variants colorés pour différents contextes

export const SuccessProgress: Story = {
  args: {
    value: 85,
    className: '[&>div]:bg-green-500',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Progression verte pour les états de succès (≥80%)',
      },
    },
  },
}

export const WarningProgress: Story = {
  args: {
    value: 55,
    className: '[&>div]:bg-amber-500',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Progression ambre pour les avertissements (50-79%)',
      },
    },
  },
}

export const DangerProgress: Story = {
  args: {
    value: 25,
    className: '[&>div]:bg-red-500',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Progression rouge pour les états critiques (<50%)',
      },
    },
  },
}

// Tailles différentes

export const SmallProgress: Story = {
  args: {
    value: 70,
    className: 'h-1',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Barre de progression fine (h-1) pour interfaces compactes',
      },
    },
  },
}

export const LargeProgress: Story = {
  args: {
    value: 45,
    className: 'h-4',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Barre de progression épaisse (h-4) pour meilleure visibilité seniors',
      },
    },
  },
}