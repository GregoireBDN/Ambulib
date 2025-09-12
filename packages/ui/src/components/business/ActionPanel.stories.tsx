import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ActionPanel } from './ActionPanel'

const meta: Meta<typeof ActionPanel> = {
  title: "Business/ActionPanel",
  component: ActionPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Panel d\'actions rapides pour dashboards HavRid. Supporte différents layouts, variants et groupes d\'actions. Optimisé pour l\'accessibilité et l\'usage médical.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    layout: {
      control: { type: 'select' },
      options: ['grid', 'list', 'compact'],
      description: 'Layout d\'affichage des actions',
    },
    columns: {
      control: { type: 'select' },
      options: [1, 2, 3, 4],
      description: 'Nombre de colonnes pour le layout grid',
    },
    showIcons: {
      control: 'boolean',
      description: 'Afficher les icônes des actions',
    },
    showDescriptions: {
      control: 'boolean',
      description: 'Afficher les descriptions des actions',
    },
    onActionClick: {
      action: 'action-clicked',
      description: 'Callback appelé lors du clic sur une action',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Actions d'exemple pour patient
const patientActions = [
  {
    id: 'new-booking',
    label: 'Nouveau trajet',
    description: 'Planifier un transport médical',
    icon: '🚑',
    variant: 'primary' as const,
  },
  {
    id: 'emergency',
    label: 'Urgence médicale',
    description: 'Appel d\'urgence immédiat',
    icon: '🚨',
    variant: 'emergency' as const,
  },
  {
    id: 'medical-profile',
    label: 'Mon profil médical',
    description: 'Gérer mes informations de santé',
    icon: '🏥',
    variant: 'outline' as const,
  },
  {
    id: 'support',
    label: 'Support',
    description: 'Assistance et aide',
    icon: '💬',
    variant: 'outline' as const,
  },
]

// Actions d'exemple pour ambulancier
const driverActions = [
  {
    id: 'accept-ride',
    label: 'Accepter course',
    description: 'Confirmer prise en charge',
    icon: '✅',
    variant: 'primary' as const,
  },
  {
    id: 'navigation',
    label: 'Navigation',
    description: 'Ouvrir GPS',
    icon: '🗺️',
    variant: 'outline' as const,
  },
  {
    id: 'patient-contact',
    label: 'Contacter patient',
    description: 'Appel téléphonique',
    icon: '📞',
    variant: 'outline' as const,
  },
  {
    id: 'report-issue',
    label: 'Signaler problème',
    description: 'Incident ou retard',
    icon: '⚠️',
    variant: 'destructive' as const,
  },
]

// Actions groupées
const groupedActions = [
  {
    title: 'Transport',
    description: 'Actions liées aux trajets',
    actions: [
      {
        id: 'book-ambulance',
        label: 'Réserver ambulance',
        description: 'Transport médicalisé',
        icon: '🚑',
        variant: 'primary' as const,
      },
      {
        id: 'book-taxi',
        label: 'Taxi médical',
        description: 'Transport simple',
        icon: '🚖',
        variant: 'secondary' as const,
      },
    ]
  },
  {
    title: 'Urgence',
    description: 'Actions d\'urgence',
    actions: [
      {
        id: 'call-samu',
        label: 'Appeler SAMU',
        description: 'Urgence vitale - 15',
        icon: '🆘',
        variant: 'emergency' as const,
      },
      {
        id: 'emergency-transport',
        label: 'Transport urgent',
        description: 'Demande prioritaire',
        icon: '🚨',
        variant: 'destructive' as const,
      },
    ]
  }
]

export const Default: Story = {
  args: {
    actions: patientActions,
    layout: 'grid',
    columns: 2,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export const PatientDashboard: Story = {
  args: {
    title: 'Actions rapides',
    actions: patientActions,
    layout: 'grid',
    columns: 4,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-4xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Panel d\'actions pour interface patient avec 4 colonnes',
      },
    },
  },
}

export const ListLayout: Story = {
  args: {
    actions: patientActions,
    layout: 'list',
    showDescriptions: true,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Layout liste avec descriptions complètes',
      },
    },
  },
}

export const CompactLayout: Story = {
  args: {
    actions: patientActions.slice(0, 6),
    layout: 'compact',
    showDescriptions: false,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-lg">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Layout compact pour espaces restreints',
      },
    },
  },
}

export const EmergencyActions: Story = {
  args: {
    title: '🚨 Actions d\'urgence',
    actions: [
      {
        id: 'call-15',
        label: 'SAMU - 15',
        description: 'Urgence vitale',
        icon: '🆘',
        variant: 'emergency' as const,
      },
      {
        id: 'emergency-transport',
        label: 'Transport urgent',
        description: 'Demande prioritaire',
        icon: '🚨',
        variant: 'destructive' as const,
      },
    ],
    layout: 'list',
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Actions d\'urgence avec variants spéciaux',
      },
    },
  },
}

export const DriverInterface: Story = {
  args: {
    title: 'Actions ambulancier',
    actions: driverActions,
    layout: 'grid',
    columns: 2,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Interface ambulancier avec actions spécifiques',
      },
    },
  },
}

export const WithBadges: Story = {
  args: {
    actions: [
      {
        id: 'messages',
        label: 'Messages',
        description: 'Notifications importantes',
        icon: '💬',
        variant: 'outline' as const,
        badge: '3',
      },
      {
        id: 'pending-bookings',
        label: 'Réservations',
        description: 'En attente de confirmation',
        icon: '📅',
        variant: 'outline' as const,
        badge: 'Nouveau',
      },
      {
        id: 'documents',
        label: 'Documents',
        description: 'À télécharger',
        icon: '📄',
        variant: 'outline' as const,
        badge: '!',
      },
    ],
    layout: 'grid',
    columns: 3,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Actions avec badges pour notifications',
      },
    },
  },
}

export const DisabledActions: Story = {
  args: {
    actions: [
      {
        id: 'available',
        label: 'Action disponible',
        description: 'Cette action est utilisable',
        icon: '✅',
        variant: 'primary' as const,
      },
      {
        id: 'disabled',
        label: 'Action désactivée',
        description: 'Profil incomplet requis',
        icon: '❌',
        variant: 'outline' as const,
        disabled: true,
      },
      {
        id: 'loading',
        label: 'Chargement...',
        description: 'Traitement en cours',
        icon: '⏳',
        variant: 'outline' as const,
        loading: true,
      },
    ],
    layout: 'grid',
    columns: 3,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'États désactivé et chargement des actions',
      },
    },
  },
}

export const GroupedActions: Story = {
  args: {
    groups: groupedActions,
    layout: 'grid',
    columns: 2,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Actions organisées en groupes avec titres',
      },
    },
  },
}

export const NoIcons: Story = {
  args: {
    actions: patientActions,
    layout: 'list',
    showIcons: false,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Interface sans icônes pour plus de sobriété',
      },
    },
  },
}

export const SingleColumn: Story = {
  args: {
    actions: patientActions.slice(0, 3),
    layout: 'grid',
    columns: 1,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Layout une colonne pour interfaces mobiles',
      },
    },
  },
}

export const AdminActions: Story = {
  args: {
    title: 'Administration',
    description: 'Gestion système et utilisateurs',
    actions: [
      {
        id: 'user-management',
        label: 'Gestion utilisateurs',
        description: 'Patients, ambulanciers, admins',
        icon: '👥',
        variant: 'primary' as const,
      },
      {
        id: 'fleet-management',
        label: 'Gestion flotte',
        description: 'Ambulances et planification',
        icon: '🚑',
        variant: 'primary' as const,
      },
      {
        id: 'reports',
        label: 'Rapports',
        description: 'Statistiques et analyses',
        icon: '📊',
        variant: 'outline' as const,
      },
      {
        id: 'system-settings',
        label: 'Paramètres système',
        description: 'Configuration générale',
        icon: '⚙️',
        variant: 'outline' as const,
      },
    ],
    layout: 'grid',
    columns: 2,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Panel administrateur avec description globale',
      },
    },
  },
}