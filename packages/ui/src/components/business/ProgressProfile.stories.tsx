import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ProgressProfile } from './ProgressProfile'

const meta: Meta<typeof ProgressProfile> = {
  title: "Business/ProgressProfile",
  component: ProgressProfile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant pour afficher et gérer la progression du profil médical patient. Inclut barre de progression, liste des champs manquants et actions de completion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    completion: {
      control: { type: 'range', min: 0, max: 100, step: 5 },
      description: 'Pourcentage de completion du profil (0-100)',
    },
    showFields: {
      control: 'boolean',
      description: 'Afficher la liste des champs détaillés',
    },
    showActions: {
      control: 'boolean',  
      description: 'Afficher les boutons d\'action',
    },
    onComplete: {
      action: 'complete-profile',
      description: 'Callback pour compléter le profil',
    },
    onViewProfile: {
      action: 'view-profile',
      description: 'Callback pour voir le profil',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Données d'exemple pour les champs de profil
const sampleProfileFields = [
  {
    id: 'firstName',
    label: 'Prénom',
    required: true,
    completed: true,
    category: 'personal' as const,
  },
  {
    id: 'lastName', 
    label: 'Nom de famille',
    required: true,
    completed: true,
    category: 'personal' as const,
  },
  {
    id: 'birthDate',
    label: 'Date de naissance',
    required: true,
    completed: true,
    category: 'personal' as const,
  },
  {
    id: 'address',
    label: 'Adresse',
    required: true,
    completed: false,
    category: 'personal' as const,
  },
  {
    id: 'allergies',
    label: 'Allergies',
    required: true,
    completed: false,
    category: 'medical' as const,
  },
  {
    id: 'medications',
    label: 'Traitements actuels',
    required: true,
    completed: true,
    category: 'medical' as const,
  },
  {
    id: 'doctor',
    label: 'Médecin traitant',
    required: false,
    completed: false,
    category: 'medical' as const,
  },
  {
    id: 'emergencyContact',
    label: 'Contact d\'urgence',
    required: true,
    completed: true,
    category: 'emergency' as const,
  },
  {
    id: 'mobility',
    label: 'Aide à la mobilité',
    required: false,
    completed: false,
    category: 'preferences' as const,
  },
]

export const Default: Story = {
  args: {
    completion: 65,
    totalFields: 9,
    completedFields: 6,
    missingFields: ['Adresse', 'Allergies', 'Médecin traitant'],
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export const Complete: Story = {
  args: {
    completion: 100,
    totalFields: 9,
    completedFields: 9,
    missingFields: [],
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
        story: 'Profil médical complètement renseigné (100%)',
      },
    },
  },
}

export const Incomplete: Story = {
  args: {
    completion: 25,
    totalFields: 9,
    completedFields: 2,
    missingFields: ['Adresse', 'Date de naissance', 'Allergies', 'Traitements', 'Contact d\'urgence', 'Médecin traitant', 'Aide mobilité'],
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
        story: 'Profil médical incomplet nécessitant attention (25%)',
      },
    },
  },
}

export const AlmostComplete: Story = {
  args: {
    completion: 85,
    totalFields: 9,
    completedFields: 8,
    missingFields: ['Médecin traitant'],
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
        story: 'Profil presque complet (85%) - statut avertissement',
      },
    },
  },
}

export const WithDetailedFields: Story = {
  args: {
    completion: 67,
    profileFields: sampleProfileFields,
    showFields: true,
    showActions: true,
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
        story: 'Affichage détaillé des champs par catégorie avec statut individuel',
      },
    },
  },
}

export const CompactView: Story = {
  args: {
    completion: 45,
    totalFields: 9,
    completedFields: 4,
    missingFields: ['Adresse', 'Allergies', 'Contact d\'urgence', 'Médecin traitant', 'Aide mobilité'],
    showFields: false,
    showActions: true,
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
        story: 'Vue compacte sans détail des champs individuels',
      },
    },
  },
}

export const NoActions: Story = {
  args: {
    completion: 75,
    totalFields: 9,
    completedFields: 7,
    missingFields: ['Allergies', 'Médecin traitant'],
    showActions: false,
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
        story: 'Affichage readonly sans boutons d\'action',
      },
    },
  },
}

export const CustomTitle: Story = {
  args: {
    title: "Profil patient - Marie Dupont",
    completion: 80,
    totalFields: 12,
    completedFields: 10,
    missingFields: ['Assurance complémentaire', 'Aide à domicile'],
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
        story: 'Titre personnalisé pour contexte spécifique patient',
      },
    },
  },
}

// Exemples d'utilisation contextuelle

export const PatientDashboard: Story = {
  args: {
    title: "Mon profil médical",
    completion: 60,
    totalFields: 8,
    completedFields: 5,
    missingFields: ['Allergies', 'Médecin traitant', 'Contact d\'urgence secondaire'],
    showFields: false,
    showActions: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Utilisation dans dashboard patient avec actions de completion',
      },
    },
  },
}

export const AdminView: Story = {
  args: {
    title: "Profil patient - ID: 1234",
    completion: 90,
    profileFields: sampleProfileFields.slice(0, 6),
    showFields: true,
    showActions: false,
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
        story: 'Vue administrateur avec détails complets mais sans actions',
      },
    },
  },
}

export const EmergencyContact: Story = {
  args: {
    title: "Informations d'urgence",
    completion: 40,
    profileFields: sampleProfileFields.filter(f => 
      f.category === 'emergency' || f.category === 'medical'
    ),
    showFields: true,
    showActions: true,
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
        story: 'Focus sur les informations critiques pour urgences',
      },
    },
  },
}