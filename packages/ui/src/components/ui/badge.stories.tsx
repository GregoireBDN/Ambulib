import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge, badgeVariants } from './badge'
import { Card, CardContent, CardHeader, CardTitle } from './card'

const meta: Meta<typeof Badge> = {
  title: 'Components/UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant badge pour afficher les statuts, priorités et catégories dans l\'interface médicale.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline'],
      description: 'Style visuel du badge',
    },
    children: {
      control: 'text',
      description: 'Contenu du badge',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}

export const PatientStatus: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">👤 Statuts Patients</h3>
      
      <div className="flex flex-wrap gap-3">
        <Badge className="bg-success-100 text-success-700 border-success-200">
          ✓ Actif
        </Badge>
        <Badge className="bg-warning-100 text-warning-700 border-warning-200">
          ⏳ En attente
        </Badge>
        <Badge className="bg-error-100 text-error-700 border-error-200">
          🚨 Urgent
        </Badge>
        <Badge className="bg-primary-100 text-primary-700 border-primary-200">
          📋 Nouveau dossier
        </Badge>
        <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
          ⏸️ Suspendu
        </Badge>
      </div>
    </div>
  ),
}

export const MedicalPriorities: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🏥 Priorités Médicales</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>Arrêt cardiaque - Marie Dupont</span>
          <Badge className="bg-error-700 text-white font-semibold">
            🚨 PRIORITÉ 1
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>Fracture ouverte - Jean Martin</span>
          <Badge className="bg-error-500 text-white">
            ⚠️ PRIORITÉ 2
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>Consultation routine - Anne Dubois</span>
          <Badge className="bg-warning-600 text-white">
            📋 PRIORITÉ 3
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>Transport programmé - Paul Leroy</span>
          <Badge className="bg-neutral-500 text-white">
            📅 PROGRAMMÉ
          </Badge>
        </div>
      </div>
    </div>
  ),
}

export const AmbulanceStatus: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🚑 État des Ambulances</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">AMB-001</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">État :</span>
                <Badge className="bg-success-600 text-white">
                  🟢 Disponible
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Équipe :</span>
                <Badge variant="outline" className="text-xs">
                  Dr. Martin + Inf. Dubois
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Zone :</span>
                <Badge className="bg-primary-100 text-primary-700">
                  Paris 11e
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">AMB-002</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">État :</span>
                <Badge className="bg-warning-600 text-white">
                  🟡 En mission
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Destination :</span>
                <Badge variant="outline" className="text-xs">
                  Hôpital Bichat
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">ETA :</span>
                <Badge className="bg-primary-600 text-white">
                  ⏱️ 12 min
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">AMB-003</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">État :</span>
                <Badge className="bg-error-700 text-white font-semibold">
                  🔴 URGENCE
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Code :</span>
                <Badge className="bg-error-600 text-white">
                  Code Rouge
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">ETA :</span>
                <Badge className="bg-error-500 text-white">
                  ⚡ 4 min
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">AMB-004</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">État :</span>
                <Badge className="bg-neutral-400 text-white">
                  ⚙️ Maintenance
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Retour :</span>
                <Badge variant="outline" className="text-xs">
                  16h30 estimé
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Garage :</span>
                <Badge className="bg-neutral-100 text-neutral-700">
                  République
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}

export const MedicalAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">⚠️ Alertes Médicales</h3>
      
      <div className="space-y-3">
        <div className="p-4 border-l-4 border-error-500 bg-error-50">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-error-900">Allergie Critique Détectée</p>
              <p className="text-sm text-error-700">Patient allergique à la Pénicilline</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-error-700 text-white">
                🚨 CRITIQUE
              </Badge>
              <Badge variant="outline" className="border-error-300 text-error-700">
                Allergie
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-l-4 border-warning-500 bg-warning-50">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-warning-900">Médicament en Interaction</p>
              <p className="text-sm text-warning-700">Kardégic + Aspirine non recommandé</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-warning-600 text-white">
                ⚠️ ATTENTION
              </Badge>
              <Badge variant="outline" className="border-warning-300 text-warning-700">
                Interaction
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="p-4 border-l-4 border-primary-500 bg-primary-50">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-primary-900">Information Importante</p>
              <p className="text-sm text-primary-700">Patient sous anticoagulant</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-primary-600 text-white">
                ℹ️ INFO
              </Badge>
              <Badge variant="outline" className="border-primary-300 text-primary-700">
                Traitement
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const ServiceCategories: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🏥 Catégories de Services</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl mb-2">🚨</div>
          <p className="font-medium mb-2">Urgences</p>
          <Badge className="bg-error-600 text-white">
            Priorité Max
          </Badge>
        </div>
        
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl mb-2">🏥</div>
          <p className="font-medium mb-2">Hospitalisation</p>
          <Badge className="bg-primary-600 text-white">
            Programmé
          </Badge>
        </div>
        
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl mb-2">🩺</div>
          <p className="font-medium mb-2">Consultations</p>
          <Badge className="bg-success-600 text-white">
            Standard
          </Badge>
        </div>
        
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl mb-2">💊</div>
          <p className="font-medium mb-2">Pharmacie</p>
          <Badge className="bg-warning-600 text-white">
            Express
          </Badge>
        </div>
        
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl mb-2">🏠</div>
          <p className="font-medium mb-2">Domicile</p>
          <Badge className="bg-neutral-600 text-white">
            Retour
          </Badge>
        </div>
        
        <div className="p-4 border rounded-lg text-center">
          <div className="text-2xl mb-2">🧑‍⚕️</div>
          <p className="font-medium mb-2">Spécialiste</p>
          <Badge className="bg-primary-500 text-white">
            RDV
          </Badge>
        </div>
      </div>
    </div>
  ),
}

export const TimeBasedBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">⏰ Badges Temporels</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>Transport Marie Dupont</span>
          <div className="flex gap-2">
            <Badge className="bg-success-100 text-success-700 border-success-200">
              Aujourd'hui
            </Badge>
            <Badge className="bg-primary-600 text-white">
              14h30
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>Consultation Jean Martin</span>
          <div className="flex gap-2">
            <Badge className="bg-warning-100 text-warning-700 border-warning-200">
              Demain
            </Badge>
            <Badge className="bg-warning-600 text-white">
              09h15
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>Urgence Anne Bernard</span>
          <div className="flex gap-2">
            <Badge className="bg-error-100 text-error-700 border-error-200">
              Maintenant
            </Badge>
            <Badge className="bg-error-700 text-white animate-pulse">
              🚨 IMMÉDIAT
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <span>RDV Paul Leroy</span>
          <div className="flex gap-2">
            <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
              Lundi 28/10
            </Badge>
            <Badge className="bg-neutral-500 text-white">
              10h00
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const CountBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🔢 Badges de Comptage</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">🚨</div>
            <p className="font-medium">Urgences</p>
            <Badge className="bg-error-600 text-white font-bold text-lg px-3 py-1 mt-2">
              3
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">⏳</div>
            <p className="font-medium">En attente</p>
            <Badge className="bg-warning-600 text-white font-bold text-lg px-3 py-1 mt-2">
              12
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">🚑</div>
            <p className="font-medium">Ambulances</p>
            <Badge className="bg-success-600 text-white font-bold text-lg px-3 py-1 mt-2">
              8/12
            </Badge>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl mb-2">✅</div>
            <p className="font-medium">Terminés</p>
            <Badge className="bg-neutral-600 text-white font-bold text-lg px-3 py-1 mt-2">
              47
            </Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}

export const SeniorInterface: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">👴 Interface Senior - Badges Lisibles</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-6 border-2 rounded-lg bg-neutral-50">
          <div>
            <p className="text-xl font-medium">Votre prochain rendez-vous</p>
            <p className="text-lg text-muted-foreground">Cardiologie - Dr. Martin</p>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className="bg-primary-600 text-white text-lg px-4 py-2">
              Demain 14h30
            </Badge>
            <Badge className="bg-success-100 text-success-700 border-success-200 text-base px-3 py-1">
              ✓ Confirmé
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-6 border-2 border-warning-200 rounded-lg bg-warning-50">
          <div>
            <p className="text-xl font-medium">Médicaments à prendre</p>
            <p className="text-lg text-muted-foreground">N'oubliez pas votre traitement</p>
          </div>
          <Badge className="bg-warning-600 text-white text-lg px-4 py-2">
            ⏰ Dans 2h
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-6 border-2 border-success-200 rounded-lg bg-success-50">
          <div>
            <p className="text-xl font-medium">Ambulance en route</p>
            <p className="text-lg text-muted-foreground">Pierre Leroy vous accompagne</p>
          </div>
          <Badge className="bg-success-600 text-white text-lg px-4 py-2">
            🚑 Arrivée 5 min
          </Badge>
        </div>
      </div>
    </div>
  ),
}