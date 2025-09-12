import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { StatsCard, StatsGrid } from './StatsCard'

const meta: Meta<typeof StatsCard> = {
  title: "Business/StatsCard",
  component: StatsCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant de carte statistique pour afficher des métriques importantes dans les dashboards HavRid. Supporte différents variants, tendances et états de chargement.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    stat: {
      description: 'Données de la statistique à afficher',
      control: 'object',
    },
    loading: {
      control: 'boolean',
      description: 'État de chargement',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback appelé lors du clic sur la carte',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Stories pour StatsCard

export const Default: Story = {
  args: {
    stat: {
      title: "Trajets effectués",
      value: 45,
      subtitle: "+12 ce mois",
      trend: "up",
      variant: "default",
      icon: "🚑"
    },
  },
}

export const Loading: Story = {
  args: {
    stat: {
      title: "Trajets effectués",
      value: 45
    },
    loading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'État de chargement avec animation skeleton',
      },
    },
  },
}

export const Success: Story = {
  args: {
    stat: {
      title: "Profil médical",
      value: "100%",
      subtitle: "Complet",
      trend: "up",
      variant: "success",
      icon: "✅",
      change: "+20%"
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant succès pour les métriques positives',
      },
    },
  },
}

export const Warning: Story = {
  args: {
    stat: {
      title: "Documents manquants",
      value: 3,
      subtitle: "À compléter",
      trend: "neutral",
      variant: "warning",
      icon: "⚠️",
      description: "Carte d'identité, prescription médicale"
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant avertissement pour attirer l\'attention',
      },
    },
  },
}

export const Destructive: Story = {
  args: {
    stat: {
      title: "Trajets annulés",
      value: 2,
      subtitle: "Cette semaine",
      trend: "down",
      variant: "destructive",
      icon: "❌",
      change: "+1"
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Variant destructif pour les métriques critiques',
      },
    },
  },
}

// Stories contextuelles médicales

export const MedicalAppointments: Story = {
  args: {
    stat: {
      title: "Rendez-vous à venir",
      value: 8,
      subtitle: "Prochain demain",
      trend: "up",
      variant: "default",
      icon: "📅",
      change: "+2",
      description: "2 contrôles, 4 spécialistes, 2 urgences"
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple pour le suivi des rendez-vous médicaux',
      },
    },
  },
}

export const EmergencyResponse: Story = {
  args: {
    stat: {
      title: "Temps de réponse moyen",
      value: "8 min",
      subtitle: "Sous la limite",
      trend: "up",
      variant: "success",
      icon: "🚨",
      change: "-2 min"
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Suivi des performances d\'intervention d\'urgence',
      },
    },
  },
}

export const PatientSatisfaction: Story = {
  args: {
    stat: {
      title: "Satisfaction patient",
      value: "4.8/5",
      subtitle: "Excellent",
      trend: "up",
      variant: "success",
      icon: "⭐",
      change: "+0.2",
      description: "Basé sur 156 avis ce mois"
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Mesure de satisfaction des patients transportés',
      },
    },
  },
}

export const FleetUtilization: Story = {
  args: {
    stat: {
      title: "Utilisation flotte",
      value: "78%",
      subtitle: "Bon niveau",
      trend: "neutral",
      variant: "default",
      icon: "🚑",
      change: "+5%",
      description: "12/15 ambulances actives"
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Taux d\'utilisation de la flotte d\'ambulances',
      },
    },
  },
}

// Stories pour StatsGrid

const medicalStats = [
  {
    title: "Trajets effectués",
    value: 156,
    subtitle: "+23 ce mois",
    trend: "up" as const,
    variant: "default" as const,
    icon: "🚑",
    change: "+18%"
  },
  {
    title: "Profil médical",
    value: "85%",
    subtitle: "À compléter",
    trend: "neutral" as const,
    variant: "warning" as const,
    icon: "🏥",
    change: "+10%"
  },
  {
    title: "Satisfaction",
    value: "4.9/5",
    subtitle: "Excellent",
    trend: "up" as const,
    variant: "success" as const,
    icon: "⭐",
    change: "+0.1"
  },
  {
    title: "Temps réponse",
    value: "6 min",
    subtitle: "Optimal",
    trend: "up" as const,
    variant: "success" as const,
    icon: "⚡",
    change: "-1 min"
  }
]

export const StatsGridExample: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <StatsGrid stats={medicalStats} columns={4} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grille de statistiques pour dashboard médical complet',
      },
    },
  },
}

export const StatsGridLoading: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <StatsGrid stats={[]} loading={true} columns={4} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'État de chargement de la grille de statistiques',
      },
    },
  },
}

export const StatsGrid2Columns: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <StatsGrid stats={medicalStats.slice(0, 2)} columns={2} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Grille 2 colonnes pour interfaces plus compactes',
      },
    },
  },
}

export const Clickable: Story = {
  args: {
    stat: {
      title: "Voir les trajets",
      value: 45,
      subtitle: "Cliquez pour détails",
      trend: "up",
      variant: "default",
      icon: "👆"
    },
    onClick: () => alert('Statistique cliquée!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Carte statistique cliquable avec effet hover',
      },
    },
  },
}