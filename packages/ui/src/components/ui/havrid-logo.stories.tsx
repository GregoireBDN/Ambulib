import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { HavRidLogo } from './havrid-logo'

const meta: Meta<typeof HavRidLogo> = {
  title: "UI/HavRid Logo",
  component: HavRidLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Logo HavRid avec support de toutes les tailles. Composant accessible avec role="img" et aria-label intégré.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Taille du logo',
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
    size: 'md',
  },
}

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg', 'xl', '2xl', '3xl'] as const).map((size) => (
        <div key={size} className="flex items-center gap-4">
          <div className="w-16 text-sm font-mono text-muted-foreground">
            {size}:
          </div>
          <HavRidLogo size={size} />
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toutes les tailles disponibles : sm (64px), md (80px), lg (112px), xl (160px), 2xl (256px), 3xl (320px)',
      },
    },
  },
}

export const HeaderUsage: Story = {
  render: () => (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <HavRidLogo size="md" />
            <div className="hidden md:block">
              <nav className="flex space-x-8">
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Tableau de bord
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Interventions
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Flotte
                </a>
              </nav>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-md hover:bg-primary/90">
              Nouvelle intervention
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Exemple d\'utilisation dans un header d\'application avec navigation.',
      },
    },
  },
}

export const AuthenticationUsage: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <HavRidLogo size="lg" />
            </div>
            <h2 className="text-2xl font-bold text-neutral-900">
              Connexion Ambulancier
            </h2>
            <p className="text-neutral-600 mt-2">
              Accédez à votre interface de gestion des interventions
            </p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Identifiant
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Votre numéro ADELI"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Mot de passe
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Exemple d\'utilisation sur une page d\'authentification avec le logo centré.',
      },
    },
  },
}

export const FooterUsage: Story = {
  render: () => (
    <footer className="bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <HavRidLogo size="lg" className="mb-4" />
            <p className="text-neutral-400 text-sm leading-relaxed">
              HavRid est votre partenaire de confiance pour tous vos besoins de
              transport médical. Service d'ambulance professionnel disponible 24h/24.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Transport d'urgence</li>
              <li>Transport programmé</li>
              <li>Transport inter-établissements</li>
              <li>Assistance médicale</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>Urgences: 15</li>
              <li>Planning: 01 XX XX XX XX</li>
              <li>Email: contact@havrid.fr</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center text-sm text-neutral-400">
          <p>&copy; 2024 HavRid. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Exemple d\'utilisation dans un footer avec informations d\'entreprise.',
      },
    },
  },
}

export const LoadingState: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <HavRidLogo size="xl" className="mb-6" />
        </div>
        <h2 className="text-xl font-medium text-neutral-900 mb-2">
          Chargement...
        </h2>
        <p className="text-neutral-600">
          Initialisation de l'interface ambulancier
        </p>
        <div className="mt-4 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Exemple d\'utilisation dans un état de chargement avec animation.',
      },
    },
  },
}

export const ResponsiveUsage: Story = {
  render: () => (
    <div className="bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Logo responsive : sm sur mobile, md sur tablette, lg sur desktop */}
            <HavRidLogo 
              size="sm"
              className="md:hidden" // Petit logo sur mobile
            />
            <HavRidLogo 
              size="md" 
              className="hidden md:block lg:hidden" // Logo moyen sur tablette
            />
            <HavRidLogo 
              size="lg" 
              className="hidden lg:block" // Grand logo sur desktop
            />
          </div>
          <div className="text-sm text-neutral-600">
            Logo responsive : SM (mobile) → MD (tablette) → LG (desktop)
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Exemple d\'utilisation responsive avec différentes tailles selon le breakpoint.',
      },
    },
  },
}

export const WithCustomStyling: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-primary-50 rounded-lg">
        <h3 className="font-medium mb-3">Logo avec fond coloré</h3>
        <HavRidLogo size="md" className="bg-white p-3 rounded-md shadow-sm" />
      </div>
      
      <div className="p-6 bg-neutral-900 rounded-lg">
        <h3 className="font-medium mb-3 text-white">Logo sur fond sombre</h3>
        <HavRidLogo size="md" className="bg-white p-3 rounded-md" />
      </div>
      
      <div className="p-6 border-2 border-dashed border-neutral-300 rounded-lg">
        <h3 className="font-medium mb-3">Logo avec bordure personnalisée</h3>
        <HavRidLogo size="md" className="border-2 border-primary-200 rounded-lg p-2" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemples de personnalisation avec des classes CSS supplémentaires.',
      },
    },
  },
}

export const GiantSizes: Story = {
  render: () => (
    <div className="space-y-12">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Tailles géantes pour grands écrans</h3>
        <p className="text-sm text-muted-foreground">
          Nouvelles tailles 2xl et 3xl pour signalétique, écrans 4K et environnements d'urgence haute visibilité
        </p>
      </div>
      
      {(['2xl', '3xl'] as const).map((size) => (
        <div key={size} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 text-lg font-mono font-bold text-primary">
              {size}:
            </div>
            <div className="text-sm text-muted-foreground">
              {size === '2xl' 
                ? '256px - Écrans 4K, signalétique numérique, présentations'
                : '320px - Signalétique murale, écrans géants, affichage à distance'
              }
            </div>
          </div>
          <div className="border-2 border-dashed border-border rounded-lg p-8 bg-muted/10">
            <HavRidLogo size={size} />
          </div>
        </div>
      ))}
      
      <div className="mt-8 p-4 bg-primary/5 rounded-lg">
        <h4 className="font-medium mb-2">💡 Recommandations d'usage</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li><strong>2xl (256px)</strong> : Idéal pour écrans ultra-wide, dashboards sur grands moniteurs, signalétique interactive</li>
          <li><strong>3xl (320px)</strong> : Pour environnements médicaux d'urgence, affichage mural, écrans tactiles géants (&gt;32")</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Démonstration des nouvelles tailles géantes 2xl et 3xl pour écrans larges et signalétique.',
      },
    },
  },
}