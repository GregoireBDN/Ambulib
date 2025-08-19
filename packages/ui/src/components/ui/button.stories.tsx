import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Components/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Bouton de base du système de design, basé sur shadcn/ui avec variants personnalisables.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link', 'emergency', 'senior'],
      description: 'Variant visuel du bouton - emergency et senior pour l\'accessibilité',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'xl', '2xl', 'icon'],
      description: 'Taille du bouton - xl et 2xl pour l\'accessibilité seniors',
    },
    asChild: {
      control: 'boolean',
      description: 'Render en tant qu\'élément enfant',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Destructive',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost',
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
    children: 'Link',
  },
}

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large',
  },
}

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small',
  },
}

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '→',
  },
}

// Nouveaux variants d'accessibilité

export const Emergency: Story = {
  args: {
    variant: 'emergency',
    children: '🚨 APPEL D\'URGENCE',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bouton d\'urgence haute visibilité avec animation pulse. Optimisé pour les situations critiques avec contraste élevé et taille généreuse.',
      },
    },
  },
}

export const Senior: Story = {
  args: {
    variant: 'senior',
    children: 'Bouton Senior',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bouton optimisé pour les seniors avec taille tactile généreuse et contraste élevé.',
      },
    },
  },
}

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Large',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bouton taille XL (48px de hauteur) pour une meilleure accessibilité.',
      },
    },
  },
}

export const DoubleExtraLarge: Story = {
  args: {
    size: '2xl',
    children: 'Double XL',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bouton taille 2XL (60px minimum) respectant les standards WCAG Level AAA.',
      },
    },
  },
}

// Exemples d'utilisation combinée

export const EmergencyFullSize: Story = {
  args: {
    variant: 'emergency',
    size: '2xl',
    children: '🚨 URGENCE MÉDICALE',
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple d\'utilisation complète : variant emergency + taille 2xl pour maximum d\'accessibilité.',
      },
    },
  },
}

export const SeniorLarge: Story = {
  args: {
    variant: 'senior',
    size: 'xl',
    children: 'Réserver ma course',
  },
  parameters: {
    docs: {
      description: {
        story: 'Bouton senior avec taille XL, idéal pour les interfaces patient.',
      },
    },
  },
}