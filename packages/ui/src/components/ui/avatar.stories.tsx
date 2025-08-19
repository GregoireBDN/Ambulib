import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Badge } from './badge'

const meta: Meta<typeof Avatar> = {
  title: 'Components/UI/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant avatar pour afficher les photos de profil des patients, personnel médical et conducteurs.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Classes CSS additionnelles',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="Photo de profil" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="/broken-image.jpg" alt="Photo de profil" />
      <AvatarFallback>MD</AvatarFallback>
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center space-x-4">
      <Avatar className="h-6 w-6">
        <AvatarFallback className="text-xs">XS</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-8 w-8">
        <AvatarFallback className="text-xs">SM</AvatarFallback>
      </Avatar>
      
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-12 w-12">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      
      <Avatar className="h-16 w-16">
        <AvatarFallback className="text-lg">XL</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const PatientProfiles: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">👥 Profils Patients</h3>
      
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Marie Dupont" />
          <AvatarFallback className="bg-primary-100 text-primary-700">MD</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Marie Dupont</p>
          <p className="text-sm text-muted-foreground">78 ans • Cardiologie</p>
        </div>
        <Badge variant="secondary" className="bg-success-100 text-success-700">
          Actif
        </Badge>
      </div>
      
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Jean Martin" />
          <AvatarFallback className="bg-secondary-100 text-secondary-700">JM</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Jean Martin</p>
          <p className="text-sm text-muted-foreground">65 ans • Orthopédie</p>
        </div>
        <Badge variant="outline" className="border-warning-300 text-warning-700">
          En attente
        </Badge>
      </div>
      
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-neutral-100 text-neutral-700">AB</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">Anne Bernard</p>
          <p className="text-sm text-muted-foreground">82 ans • Neurologie</p>
        </div>
        <Badge className="bg-error-100 text-error-700 border-error-200">
          Urgence
        </Badge>
      </div>
    </div>
  ),
}

export const MedicalTeam: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🏥 Équipe Médicale</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
          <Avatar className="h-14 w-14">
            <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Dr. Claire Martin" />
            <AvatarFallback className="bg-primary-100 text-primary-700">CM</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Dr. Claire Martin</p>
            <p className="text-sm text-primary-600">Médecin Urgentiste</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
              <span className="text-xs text-success-600">Disponible</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
          <Avatar className="h-14 w-14">
            <AvatarImage src="https://i.pravatar.cc/150?img=4" alt="Inf. Sophie Dubois" />
            <AvatarFallback className="bg-secondary-100 text-secondary-700">SD</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Sophie Dubois</p>
            <p className="text-sm text-secondary-600">Infirmière</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-warning-500 rounded-full mr-2"></div>
              <span className="text-xs text-warning-600">En mission</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
          <Avatar className="h-14 w-14">
            <AvatarFallback className="bg-accent-100 text-accent-700">PL</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Pierre Leroy</p>
            <p className="text-sm text-accent-600">Conducteur Ambulancier</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-success-500 rounded-full mr-2"></div>
              <span className="text-xs text-success-600">En route</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 p-3 border rounded-lg">
          <Avatar className="h-14 w-14">
            <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Marie Moreau" />
            <AvatarFallback className="bg-muted text-muted-foreground">MM</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">Marie Moreau</p>
            <p className="text-sm text-muted-foreground">Secrétaire Médicale</p>
            <div className="flex items-center mt-1">
              <div className="w-2 h-2 bg-error-500 rounded-full mr-2"></div>
              <span className="text-xs text-error-600">Hors service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AmbulanceCrews: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🚑 Équipages Ambulances</h3>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 border-2 border-success-200 bg-success-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="https://i.pravatar.cc/150?img=6" alt="Dr. Jean Durand" />
                <AvatarFallback className="bg-primary-600 text-white">JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="https://i.pravatar.cc/150?img=7" alt="Inf. Lisa Chen" />
                <AvatarFallback className="bg-secondary-600 text-white">LC</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-medium">AMB-001</p>
              <p className="text-sm text-muted-foreground">Dr. Durand • Inf. Chen</p>
            </div>
          </div>
          <Badge className="bg-success-600 text-white">
            🟢 Disponible
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-4 border-2 border-warning-200 bg-warning-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarFallback className="bg-primary-600 text-white">AL</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="https://i.pravatar.cc/150?img=8" alt="Inf. Marc Petit" />
                <AvatarFallback className="bg-secondary-600 text-white">MP</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-medium">AMB-002</p>
              <p className="text-sm text-muted-foreground">Dr. Leroy • Inf. Petit</p>
            </div>
          </div>
          <Badge className="bg-warning-600 text-white">
            🟡 En mission
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-4 border-2 border-error-200 bg-error-50 rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-2">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="https://i.pravatar.cc/150?img=9" alt="Dr. Sarah Kim" />
                <AvatarFallback className="bg-primary-600 text-white">SK</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarFallback className="bg-secondary-600 text-white">TB</AvatarFallback>
              </Avatar>
            </div>
            <div>
              <p className="font-medium">AMB-003</p>
              <p className="text-sm text-muted-foreground">Dr. Kim • Inf. Bernard</p>
            </div>
          </div>
          <Badge className="bg-error-600 text-white">
            🔴 Urgence
          </Badge>
        </div>
      </div>
    </div>
  ),
}

export const SeniorFriendly: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">👴 Interface Senior</h3>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-4 border rounded-lg bg-neutral-50">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Votre profil" />
            <AvatarFallback className="bg-primary-100 text-primary-700 text-lg">MD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl font-medium">Marie Dupont</p>
            <p className="text-lg text-muted-foreground">Votre profil patient</p>
            <p className="text-sm text-primary-600 mt-1">Dernière visite : 15/10/2024</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-3 p-3 border rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-primary-100 text-primary-700">CM</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-lg">Dr. Claire Martin</p>
              <p className="text-muted-foreground">Votre cardiologue</p>
            </div>
            <Badge className="bg-success-100 text-success-700">
              Disponible
            </Badge>
          </div>
          
          <div className="flex items-center space-x-3 p-3 border rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-secondary-100 text-secondary-700">PL</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-lg">Pierre Leroy</p>
              <p className="text-muted-foreground">Votre ambulancier</p>
            </div>
            <Badge className="bg-warning-100 text-warning-700">
              En route
            </Badge>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const GroupAvatars: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium mb-3">Équipe soignante</h4>
        <div className="flex -space-x-2">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src="https://i.pravatar.cc/150?img=1" alt="Dr. Martin" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src="https://i.pravatar.cc/150?img=2" alt="Inf. Dubois" />
            <AvatarFallback>ID</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="Amb. Leroy" />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <Avatar className="h-12 w-12 border-2 border-white bg-muted">
            <AvatarFallback className="text-sm">+2</AvatarFallback>
          </Avatar>
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-3">Patients en attente</h4>
        <div className="flex -space-x-1">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-blue-100">MD</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-green-100">JM</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-purple-100">AB</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-yellow-100">PC</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-pink-100">SL</AvatarFallback>
          </Avatar>
          <Avatar className="h-8 w-8 bg-muted">
            <AvatarFallback className="text-xs">+8</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  ),
}