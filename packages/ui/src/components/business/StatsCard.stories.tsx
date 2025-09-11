import type { Meta, StoryObj } from '@storybook/react'
import { StatsCard, StatsGrid } from './StatsCard'
import type { StatData } from './StatsCard'

const meta: Meta<typeof StatsCard> = {
  title: 'Business/StatsCard',
  component: StatsCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Composant de statistiques médicales optimisé pour les tableaux de bord HavRid. Supporte les couleurs OKLCH, les icônes contextuelles et les formatters spécialisés.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    stat: {
      description: 'Données de la statistique à afficher',
    },
    loading: {
      description: 'Affiche un skeleton de chargement',
      control: 'boolean',
    },
    onClick: {
      description: 'Callback appelé au clic sur la card',
      action: 'clicked',
    },
  },
}

export default meta
type Story = StoryObj<typeof StatsCard>

// Données d'exemple pour les stories médicales
const interventionsData: StatData = {
  title: "Interventions aujourd'hui",
  value: 12,
  valueType: 'number',
  status: 'success',
  icon: 'ambulance',
  trend: {
    direction: 'up',
    value: '+3',
    period: 'vs hier'
  },
  contextualInfo: 'Objectif: 15 interventions/jour'
}

const responseTimeData: StatData = {
  title: 'Temps de réponse moyen',
  value: 8.5,
  valueType: 'duration',
  status: 'warning',
  icon: 'clock',
  trend: {
    direction: 'down',
    value: '-2 min',
    period: 'cette semaine'
  },
  contextualInfo: 'Objectif: < 8 minutes',
  threshold: {
    warning: 8,
    critical: 12
  }
}

const revenueData: StatData = {
  title: 'Revenus du jour',
  value: 2450,
  valueType: 'currency',
  status: 'info',
  icon: 'euro',
  trend: {
    direction: 'up',
    value: '12%',
    period: 'vs semaine dernière'
  }
}

const availableAmbulancesData: StatData = {
  title: 'Ambulances disponibles',
  value: 3,
  valueType: 'number',
  status: 'critical',
  icon: 'ambulance',
  contextualInfo: 'Sur 8 véhicules total',
  description: 'Alerte: Capacité faible',
  action: {
    label: 'Voir planning',
    onClick: () => alert('Redirection vers le planning')
  },
  threshold: {
    warning: 4,
    critical: 2
  }
}

// Stories individuelles
export const InterventionsSuccess: Story = {
  args: {
    stat: interventionsData,
  },
}

export const ResponseTimeWarning: Story = {
  args: {
    stat: responseTimeData,
  },
}

export const RevenueCurrency: Story = {
  args: {
    stat: revenueData,
  },
}

export const AmbulancesCritical: Story = {
  args: {
    stat: availableAmbulancesData,
  },
}

// État de chargement
export const Loading: Story = {
  args: {
    stat: interventionsData,
    loading: true,
  },
}

// Tous les statuts
export const AllStatuses: StoryObj<typeof StatsGrid> = {
  render: () => (
    <StatsGrid
      stats={[
        {
          title: 'Status Normal',
          value: 42,
          status: 'normal',
          icon: 'activity',
        },
        {
          title: 'Status Success',
          value: 98,
          valueType: 'percentage',
          status: 'success',
          icon: 'activity',
        },
        {
          title: 'Status Warning',
          value: 15,
          valueType: 'duration',
          status: 'warning',
          icon: 'clock',
        },
        {
          title: 'Status Critical',
          value: 2,
          valueType: 'number',
          status: 'critical',
          icon: 'alert',
        },
        {
          title: 'Status Info',
          value: 1250,
          valueType: 'currency',
          status: 'info',
          icon: 'euro',
        },
      ]}
      columns={3}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Démonstration des 5 statuts disponibles avec les couleurs OKLCH.',
      },
    },
  },
}

// Types de valeurs
export const ValueTypes: StoryObj<typeof StatsGrid> = {
  render: () => (
    <StatsGrid
      stats={[
        {
          title: 'Nombre',
          value: 1234,
          valueType: 'number',
          icon: 'users',
        },
        {
          title: 'Devise',
          value: 2450.50,
          valueType: 'currency',
          icon: 'euro',
        },
        {
          title: 'Pourcentage',
          value: 87.5,
          valueType: 'percentage',
          icon: 'activity',
        },
        {
          title: 'Durée',
          value: 12.5,
          valueType: 'duration',
          icon: 'clock',
        },
        {
          title: 'Distance',
          value: 156.8,
          valueType: 'distance',
          icon: 'map',
        },
        {
          title: 'Texte custom',
          value: 'Excellent',
          icon: 'activity',
        },
      ]}
      columns={3}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Démonstration des différents types de formatage de valeurs.',
      },
    },
  },
}

// Dashboard complet HavRid
export const HavRidDashboard: StoryObj<typeof StatsGrid> = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Tableau de bord ambulancier</h2>
        <StatsGrid
          stats={[
            interventionsData,
            responseTimeData,
            revenueData,
            availableAmbulancesData,
            {
              title: 'Patients transportés',
              value: 28,
              valueType: 'number',
              status: 'success',
              icon: 'users',
              trend: {
                direction: 'stable',
                value: '0',
                period: 'vs hier'
              }
            },
            {
              title: 'Distance parcourue',
              value: 186,
              valueType: 'distance',
              status: 'normal',
              icon: 'map',
              trend: {
                direction: 'up',
                value: '+15 km',
                period: 'aujourd\'hui'
              }
            },
            {
              title: 'Taux de satisfaction',
              value: 94.2,
              valueType: 'percentage',
              status: 'success',
              icon: 'activity',
              trend: {
                direction: 'up',
                value: '+2.1%',
                period: 'ce mois'
              }
            },
            {
              title: 'Alertes actives',
              value: 1,
              status: 'warning',
              icon: 'alert',
              contextualInfo: 'Véhicule en maintenance',
              action: {
                label: 'Voir alertes',
                onClick: () => alert('Vue des alertes')
              }
            }
          ]}
          columns={4}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemple complet d\'un dashboard HavRid avec métriques médicales réalistes.',
      },
    },
  },
}

// Test responsive
export const ResponsiveGrid: StoryObj<typeof StatsGrid> = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Redimensionnez la fenêtre pour voir l'adaptation responsive
      </p>
      <StatsGrid
        stats={[interventionsData, responseTimeData, revenueData, availableAmbulancesData]}
        columns={4}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Test de l\'adaptation responsive sur différentes tailles d\'écran.',
      },
    },
  },
}