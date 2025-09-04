import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbList, 
  BreadcrumbPage, 
  BreadcrumbSeparator 
} from './breadcrumb'
import { Badge } from './badge'

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Fil d\'ariane accessible pour la navigation dans l\'interface médicale et administrative.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/patients">Patients</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Marie Dupont</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
}

export const PatientNavigation: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">👤 Navigation Patient</h3>
      
      <div className="space-y-3">
        <div className="p-4 border rounded-lg bg-neutral-50">
          <p className="text-sm text-muted-foreground mb-2">Dossier médical complet</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">🏠 Tableau de bord</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/patients">👥 Patients</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/patients/marie-dupont">📋 Marie Dupont</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>🏥 Dossier Médical</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-4 border rounded-lg bg-primary-50">
          <p className="text-sm text-primary-600 mb-2">Historique des transports</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">🏠 Accueil</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/transports">🚑 Transports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/transports/history">📅 Historique</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>15 Oct 2024 - Cardiologie</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  ),
}

export const FleetManagement: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🚑 Navigation Flotte</h3>
      
      <div className="space-y-3">
        <div className="p-4 border rounded-lg bg-success-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-success-600">Ambulance disponible</p>
            <Badge className="bg-success-600 text-white">AMB-001</Badge>
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet">🚑 Flotte</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet/ambulances">🚗 Ambulances</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet/ambulances/amb-001">AMB-001</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>⚙️ Configuration</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-4 border rounded-lg bg-warning-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-warning-600">Mission en cours</p>
            <Badge className="bg-warning-600 text-white">En route</Badge>
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet">🚑 Flotte</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet/missions">📋 Missions</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet/missions/active">⏳ Actives</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Mission #M2024-1015</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-4 border rounded-lg bg-error-50">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-error-600 font-medium">Urgence critique</p>
            <Badge className="bg-error-700 text-white animate-pulse">🚨 URGENCE</Badge>
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet">🚑 Flotte</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet/emergencies">🚨 Urgences</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/fleet/emergencies/code-rouge">🔴 Code Rouge</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Arrêt Cardiaque - 15 Av. République</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  ),
}

export const AdminInterface: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">⚙️ Navigation Administration</h3>
      
      <div className="space-y-3">
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Gestion des utilisateurs</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">⚙️ Administration</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/users">👥 Utilisateurs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/users/medical-team">👨‍⚕️ Personnel Médical</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Créer un Compte</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Configuration système</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">⚙️ Administration</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/system">💻 Système</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/system/settings">⚙️ Paramètres</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Notifications SMS</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-4 border rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Rapports et statistiques</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin">⚙️ Administration</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/reports">📊 Rapports</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/reports/monthly">📅 Mensuel</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Octobre 2024</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  ),
}

export const MedicalWorkflow: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🏥 Parcours Médical</h3>
      
      <div className="space-y-3">
        <div className="p-4 border rounded-lg bg-primary-50">
          <p className="text-sm text-primary-600 mb-2">Processus de consultation</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical">🏥 Médical</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical/consultations">👨‍⚕️ Consultations</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical/consultations/cardiology">❤️ Cardiologie</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dr. Martin - Consultation</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-4 border rounded-lg bg-secondary-50">
          <p className="text-sm text-secondary-600 mb-2">Prescriptions médicales</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical">🏥 Médical</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical/prescriptions">📋 Ordonnances</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical/prescriptions/transport">🚑 Transport</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Nouvelle Ordonnance</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-4 border rounded-lg bg-accent-50">
          <p className="text-sm text-accent-600 mb-2">Suivi thérapeutique</p>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical">🏥 Médical</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical/treatments">💊 Traitements</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical/treatments/chronic">🔄 Chroniques</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Hypertension - Suivi</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  ),
}

export const SeniorFriendly: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">👴 Navigation Senior - Interface Simplifiée</h3>
      
      <div className="space-y-4">
        <div className="p-6 border-2 rounded-lg bg-neutral-50">
          <p className="text-lg mb-3">Où êtes-vous dans votre parcours :</p>
          <Breadcrumb>
            <BreadcrumbList className="text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink href="/home" className="text-lg px-2 py-1">
                  🏠 Mon Accueil
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xl" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/rendez-vous" className="text-lg px-2 py-1">
                  📅 Mes Rendez-vous
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xl" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg px-2 py-1 font-medium">
                  Prochain RDV: Dr. Martin
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-6 border-2 border-primary-200 rounded-lg bg-primary-50">
          <p className="text-lg mb-3 text-primary-700">Réserver votre ambulance :</p>
          <Breadcrumb>
            <BreadcrumbList className="text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink href="/home" className="text-lg px-2 py-1">
                  🏠 Mon Accueil
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xl" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/transport" className="text-lg px-2 py-1">
                  🚑 Transport
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xl" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg px-2 py-1 font-medium">
                  Nouvelle Réservation
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        
        <div className="p-6 border-2 border-success-200 rounded-lg bg-success-50">
          <p className="text-lg mb-3 text-success-700">Vos informations médicales :</p>
          <Breadcrumb>
            <BreadcrumbList className="text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink href="/home" className="text-lg px-2 py-1">
                  🏠 Mon Accueil
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xl" />
              <BreadcrumbItem>
                <BreadcrumbLink href="/medical" className="text-lg px-2 py-1">
                  📋 Mon Dossier
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-xl" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg px-2 py-1 font-medium">
                  Mes Médicaments
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
    </div>
  ),
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">♿ Fonctionnalités d'Accessibilité</h3>
      
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm mb-4 text-muted-foreground">
          Navigation clavier : utilisez Tab pour naviguer entre les liens, Enter pour les activer.
        </p>
        
        <div className="space-y-3">
          <div>
            <h4 className="font-medium mb-2">Navigation avec liens accessibles</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="/dashboard" 
                    className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Tableau de bord
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="/patients" 
                    className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Patients
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground">
                    Page actuelle (non cliquable)
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Contraste élevé pour la lisibilité</h4>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink 
                    href="/high-contrast" 
                    className="text-foreground hover:text-primary underline decoration-2"
                  >
                    Mode contraste élevé
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-foreground" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-foreground font-medium">
                    Paramètres d'affichage
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>
    </div>
  ),
}