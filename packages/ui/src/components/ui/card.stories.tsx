import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { Button } from './button'

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant carte flexible avec header, contenu et footer. Base du système de design shadcn/ui avec variant senior pour l\'accessibilité.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'senior'],
      description: 'Variant de la carte - senior pour l\'accessibilité renforcée',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Titre de la carte</CardTitle>
        <CardDescription>Description de la carte avec détails complémentaires.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Contenu principal de la carte avec informations détaillées.</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Annuler</Button>
        <Button>Valider</Button>
      </CardFooter>
    </Card>
  ),
}

export const SimpleCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>Simple</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Une carte simple avec juste un titre et du contenu.</p>
      </CardContent>
    </Card>
  ),
}

export const WithoutFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Information</CardTitle>
        <CardDescription>Carte d'information sans actions.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Cette carte contient seulement des informations à lire, sans actions utilisateur.</p>
      </CardContent>
    </Card>
  ),
}

export const Medical: Story = {
  render: () => (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Prochaine consultation</CardTitle>
        <CardDescription>Rendez-vous médical programmé</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p><strong>Date :</strong> Demain 14h30</p>
          <p><strong>Médecin :</strong> Dr. Martin</p>
          <p><strong>Lieu :</strong> Cabinet médical - 123 rue de la Santé</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Confirmer ma présence</Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemple d\'utilisation dans le contexte médical de HavRid.',
      },
    },
  },
}

// Nouveau variant d'accessibilité

export const Senior: Story = {
  render: () => (
    <Card variant="senior" className="w-[450px]">
      <CardHeader className="pb-4">
        <CardTitle senior>Réserver une ambulance</CardTitle>
        <CardDescription senior>
          Planifiez votre transport médical en toute simplicité
        </CardDescription>
      </CardHeader>
      <CardContent senior>
        <div className="space-y-4">
          <p className="text-base">
            Service disponible 24h/24 et 7j/7 pour tous vos déplacements médicaux.
          </p>
          <div className="space-y-2 text-base">
            <p>• Transport sécurisé et confortable</p>
            <p>• Personnel médical qualifié</p>
            <p>• Ponctualité garantie</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="senior" size="2xl" className="w-full">
          Nouvelle réservation
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Card variant senior avec espacement généreux, bordures visibles et contenu optimisé pour les seniors. Utilise les propriétés `senior` sur CardTitle et CardContent.',
      },
    },
  },
}

export const SeniorEmergency: Story = {
  render: () => (
    <Card variant="senior" className="w-[400px]">
      <CardHeader className="pb-4">
        <CardTitle senior>Urgence médicale</CardTitle>
        <CardDescription senior>
          Accès prioritaire pour les situations d'urgence
        </CardDescription>
      </CardHeader>
      <CardContent senior>
        <div className="space-y-4">
          <p className="text-base font-medium text-destructive">
            Besoin d'un transport médical immédiat ?
          </p>
          <p className="text-base">
            Cliquez sur le bouton ci-dessous pour un accès prioritaire.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="emergency" className="w-full">
          🚨 APPEL D'URGENCE
        </Button>
      </CardFooter>
    </Card>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Exemple combinant Card senior et Button emergency pour une interface d\'urgence optimisée.',
      },
    },
  },
}