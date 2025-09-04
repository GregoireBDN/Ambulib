import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SkipNavigation } from './skip-navigation'

const meta: Meta<typeof SkipNavigation> = {
  title: "UI/SkipNavigation",
  component: SkipNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Navigation rapide WCAG 2.1 conforme. Visible uniquement au focus clavier, permet aux utilisateurs de lecteurs d\'écran de naviguer rapidement vers les sections principales.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    targets: {
      control: 'object',
      description: 'Liste des cibles de navigation avec href et label',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Composant de démonstration avec layout complet
const DemoLayout: React.FC<{ skipNav?: React.ReactElement }> = ({ skipNav }) => (
  <div className="min-h-screen bg-background">
    {skipNav}
    
    <header className="bg-primary text-primary-foreground p-4">
      <nav id="navigation">
        <h2 className="text-lg font-semibold mb-2">Navigation principale</h2>
        <ul className="flex gap-4">
          <li><a href="#" className="underline">Accueil</a></li>
          <li><a href="#" className="underline">Services</a></li>
          <li><a href="#" className="underline">Contact</a></li>
        </ul>
      </nav>
    </header>

    <main id="main-content" className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Contenu principal</h1>
      <p className="text-muted-foreground mb-4">
        Ce contenu principal peut être atteint directement via les liens d'évitement.
        Appuyez sur Tab dès le chargement de la page pour voir les liens d'évitement apparaître.
      </p>
      
      <div className="bg-muted p-4 rounded-lg mb-6">
        <h2 className="font-semibold mb-2">Comment tester :</h2>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Utilisez Tab pour naviguer au clavier</li>
          <li>Les liens d'évitement apparaissent en premier</li>
          <li>Utilisez Entrée pour activer un lien</li>
          <li>La page défile vers la section ciblée</li>
        </ol>
      </div>

      <div className="space-y-4">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
    </main>

    <aside id="sidebar" className="bg-muted/50 p-6 mx-6 rounded-lg mb-6">
      <h2 className="text-lg font-semibold mb-2">Informations complémentaires</h2>
      <p className="text-muted-foreground">
        Cette section peut également être atteinte via les liens d'évitement.
      </p>
    </aside>

    <footer id="footer" className="bg-muted text-center p-4">
      <p className="text-muted-foreground">© 2024 HavRid - Pied de page accessible</p>
    </footer>
  </div>
)

export const Default: Story = {
  render: () => (
    <DemoLayout 
      skipNav={<SkipNavigation />}
    />
  ),
}

export const CustomTargets: Story = {
  args: {
    targets: [
      { href: '#main-content', label: 'Aller au contenu' },
      { href: '#navigation', label: 'Aller au menu' },
      { href: '#sidebar', label: 'Aller aux infos' },
      { href: '#footer', label: 'Aller au footer' },
    ],
  },
  render: (args) => (
    <DemoLayout 
      skipNav={<SkipNavigation {...args} />}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Navigation avec cibles personnalisées.',
      },
    },
  },
}

export const MedicalInterface: Story = {
  args: {
    targets: [
      { href: '#urgent-actions', label: 'Accès rapide urgences' },
      { href: '#main-content', label: 'Aller au contenu principal' },
      { href: '#patient-info', label: 'Informations patient' },
      { href: '#help', label: 'Aide et support' },
    ],
  },
  render: (args) => (
    <div className="min-h-screen bg-background">
      <SkipNavigation {...args} />
      
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">🚑 HavRid - Interface Médicale</h1>
      </header>

      <div id="urgent-actions" className="bg-destructive/10 border-l-4 border-destructive p-4 m-4">
        <h2 className="text-lg font-semibold text-destructive mb-2">Actions d'urgence</h2>
        <button className="bg-destructive text-destructive-foreground px-4 py-2 rounded">
          🚨 Appel d'urgence
        </button>
      </div>

      <main id="main-content" className="p-6">
        <h2 className="text-2xl font-bold mb-4">Tableau de bord patient</h2>
        <p className="text-muted-foreground mb-4">
          Interface adaptée aux utilisateurs avec besoins d'accessibilité renforcée.
        </p>
      </main>

      <aside id="patient-info" className="bg-muted/50 p-6 mx-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Informations patient</h2>
        <p>Données médicales et historique des transports.</p>
      </aside>

      <section id="help" className="bg-primary/5 p-6 mx-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Aide et support</h2>
        <p>Assistance disponible 24h/24 pour toute question.</p>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemple d\'utilisation dans une interface médicale avec accès prioritaire aux urgences.',
      },
    },
  },
}

export const AccessibilityFocused: Story = {
  render: () => (
    <div className="p-6 space-y-4 max-w-2xl">
      <SkipNavigation />
      
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h2 className="font-semibold text-blue-900 mb-2">🔍 Instructions de test</h2>
        <div className="space-y-2 text-sm text-blue-800">
          <p><strong>Navigation clavier :</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><kbd className="px-1 py-0.5 bg-blue-200 rounded">Tab</kbd> - Naviguer vers l'élément suivant</li>
            <li><kbd className="px-1 py-0.5 bg-blue-200 rounded">Shift + Tab</kbd> - Naviguer vers l'élément précédent</li>
            <li><kbd className="px-1 py-0.5 bg-blue-200 rounded">Enter</kbd> - Activer le lien d'évitement</li>
          </ul>
        </div>
      </div>

      <main id="main-content" className="space-y-4">
        <h1 className="text-2xl font-bold">Test d'accessibilité</h1>
        <p>Les liens d'évitement sont essentiels pour l'accessibilité web.</p>
        <p>Ils permettent aux utilisateurs de lecteurs d'écran de naviguer efficacement sans parcourir tout le contenu.</p>
      </main>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemple minimaliste avec instructions de test pour vérifier l\'accessibilité.',
      },
    },
  },
}