import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { FormStepProgress } from './form-step-progress'

const meta: Meta<typeof FormStepProgress> = {
  title: "UI/FormStepProgress",
  component: FormStepProgress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Indicateur de progression accessible pour formulaires multi-étapes. Conforme WCAG 2.1 avec support lecteurs d\'écran.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Étape actuelle (1-indexé)',
    },
    totalSteps: {
      control: { type: 'number', min: 2, max: 10 },
      description: 'Nombre total d\'étapes',
    },
    stepLabels: {
      control: 'object',
      description: 'Labels personnalisés pour chaque étape',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
  },
}

export const WithLabels: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    stepLabels: ['Informations', 'Adresses', 'Horaires', 'Confirmation'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Progression avec labels personnalisés pour chaque étape.',
      },
    },
  },
}

export const MedicalBooking: Story = {
  args: {
    currentStep: 3,
    totalSteps: 5,
    stepLabels: [
      'Informations patient',
      'Détails médicaux',
      'Adresses de prise en charge',
      'Date et horaire',
      'Confirmation de réservation'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple d\'utilisation pour une réservation d\'ambulance.',
      },
    },
  },
}

export const FirstStep: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
    stepLabels: ['Début', 'Milieu', 'Fin'],
  },
  parameters: {
    docs: {
      description: {
        story: 'État initial - première étape.',
      },
    },
  },
}

export const LastStep: Story = {
  args: {
    currentStep: 3,
    totalSteps: 3,
    stepLabels: ['Début', 'Milieu', 'Fin'],
  },
  parameters: {
    docs: {
      description: {
        story: 'État final - dernière étape terminée.',
      },
    },
  },
}

export const LongProcess: Story = {
  args: {
    currentStep: 4,
    totalSteps: 7,
    stepLabels: [
      'Inscription',
      'Profil médical',
      'Documents',
      'Vérification',
      'Paiement',
      'Validation',
      'Activation'
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Processus long avec 7 étapes - adapté pour les écrans larges.',
      },
    },
  },
}