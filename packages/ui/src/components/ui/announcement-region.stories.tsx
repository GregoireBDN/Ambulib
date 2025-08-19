import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AnnouncementRegion, useAnnouncement } from './announcement-region'
import { Button } from './button'

const meta: Meta<typeof AnnouncementRegion> = {
  title: 'Components/UI/AnnouncementRegion',
  component: AnnouncementRegion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Zone d\'annonces accessible pour lecteurs d\'écran avec support ARIA live regions. Essentiel pour l\'accessibilité des notifications.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: { type: 'select' },
      options: ['polite', 'assertive'],
      description: 'Niveau de priorité pour les lecteurs d\'écran',
    },
    variant: {
      control: { type: 'select' },
      options: ['info', 'success', 'warning', 'error', 'emergency'],
      description: 'Style visuel de l\'annonce',
    },
    visuallyHidden: {
      control: 'boolean',
      description: 'Masquer visuellement (lecteurs d\'écran uniquement)',
    },
    autoClear: {
      control: { type: 'number', min: 1000, max: 10000, step: 1000 },
      description: 'Auto-effacement après X millisecondes',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Votre demande de transport a été enregistrée avec succès.',
    variant: 'info',
    priority: 'polite',
  },
}

export const Success: Story = {
  args: {
    children: 'Réservation confirmée ! Un email de confirmation vous a été envoyé.',
    variant: 'success',
    priority: 'polite',
  },
}

export const Warning: Story = {
  args: {
    children: 'Attention : Il reste moins de 2 heures avant votre rendez-vous.',
    variant: 'warning',
    priority: 'polite',
  },
}

export const Error: Story = {
  args: {
    children: 'Erreur : Impossible de valider votre demande. Veuillez réessayer.',
    variant: 'error',
    priority: 'assertive',
  },
}

export const Emergency: Story = {
  args: {
    children: 'URGENCE : Votre demande d\'intervention d\'urgence a été transmise. Un ambulancier vous contactera dans les plus brefs délais.',
    variant: 'emergency',
    priority: 'assertive',
  },
  parameters: {
    docs: {
      description: {
        story: 'Annonce d\'urgence avec priorité assertive et style visuel d\'alerte.',
      },
    },
  },
}

export const VisuallyHidden: Story = {
  args: {
    children: 'Cette annonce n\'est visible que pour les lecteurs d\'écran.',
    visuallyHidden: true,
    priority: 'polite',
  },
  parameters: {
    docs: {
      description: {
        story: 'Annonce masquée visuellement mais accessible aux technologies d\'assistance.',
      },
    },
  },
}

export const AutoClear: Story = {
  args: {
    children: 'Ce message disparaîtra automatiquement dans 3 secondes.',
    variant: 'info',
    priority: 'polite',
    autoClear: 3000,
  },
  parameters: {
    docs: {
      description: {
        story: 'Annonce avec auto-effacement après 3 secondes.',
      },
    },
  },
}

// Story interactive avec le hook useAnnouncement

const AnnouncementDemo: React.FC = () => {
  const { announcement, announce, announceSuccess, announceError, announceEmergency, clear } = useAnnouncement()

  return (
    <div className="space-y-4 w-[400px]">
      <div className="flex flex-wrap gap-2">
        <Button 
          size="sm" 
          onClick={() => announce('Information générale')}
        >
          Info
        </Button>
        <Button 
          size="sm" 
          variant="secondary"
          onClick={() => announceSuccess('Opération réussie !')}
        >
          Succès
        </Button>
        <Button 
          size="sm" 
          variant="destructive"
          onClick={() => announceError('Une erreur est survenue')}
        >
          Erreur
        </Button>
        <Button 
          size="sm" 
          variant="emergency"
          onClick={() => announceEmergency('Alerte d\'urgence !')}
        >
          Urgence
        </Button>
        <Button 
          size="sm" 
          variant="outline"
          onClick={clear}
        >
          Effacer
        </Button>
      </div>
      
      {announcement && (
        <AnnouncementRegion
          variant={announcement.variant}
          priority={announcement.priority}
          onClear={clear}
        >
          {announcement.message}
        </AnnouncementRegion>
      )}
    </div>
  )
}

export const InteractiveDemo: Story = {
  render: () => <AnnouncementDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Démonstration interactive avec le hook useAnnouncement. Cliquez sur les boutons pour tester les différents types d\'annonces.',
      },
    },
  },
}