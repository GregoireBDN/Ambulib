import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuShortcut,
} from './dropdown-menu'
import { Button } from './button'
import { Badge } from './badge'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/UI/DropdownMenu',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Menu déroulant accessible pour les actions contextuelles et la navigation dans l\'interface médicale.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Ouvrir le menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Mon Compte</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profil</DropdownMenuItem>
        <DropdownMenuItem>Paramètres</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Déconnexion</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}

export const PatientActions: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">👤 Actions Patient</h3>
      
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-700 font-medium">MD</span>
          </div>
          <div>
            <p className="font-medium">Marie Dupont</p>
            <p className="text-sm text-muted-foreground">78 ans • Cardiologie</p>
          </div>
          <Badge className="bg-success-100 text-success-700">Actif</Badge>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Actions ⋮
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions Patient</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              📋 Voir Dossier Complet
            </DropdownMenuItem>
            <DropdownMenuItem>
              📞 Contacter Patient
            </DropdownMenuItem>
            <DropdownMenuItem>
              🚑 Programmer Transport
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>🏥 Transfert vers...</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Urgences</DropdownMenuItem>
                <DropdownMenuItem>Cardiologie</DropdownMenuItem>
                <DropdownMenuItem>Médecine générale</DropdownMenuItem>
                <DropdownMenuItem>Soins intensifs</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-warning-600">
              ⚠️ Signaler un Problème
            </DropdownMenuItem>
            <DropdownMenuItem className="text-error-600">
              ❌ Annuler RDV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
}

export const AmbulanceManagement: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">🚑 Gestion des Ambulances</h3>
      
      <div className="grid grid-cols-1 gap-3">
        <div className="flex items-center justify-between p-4 border-2 border-success-200 bg-success-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚑</div>
            <div>
              <p className="font-medium">AMB-001</p>
              <p className="text-sm text-muted-foreground">Dr. Martin + Inf. Dubois</p>
            </div>
            <Badge className="bg-success-600 text-white">🟢 Disponible</Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Gérer ⋮
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>AMB-001 - Disponible</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                🎯 Assigner Mission
              </DropdownMenuItem>
              <DropdownMenuItem>
                📍 Voir Position
              </DropdownMenuItem>
              <DropdownMenuItem>
                📞 Contacter Équipe
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>🛠️ Maintenance</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Maintenance préventive</DropdownMenuItem>
                  <DropdownMenuItem>Contrôle technique</DropdownMenuItem>
                  <DropdownMenuItem>Révision matériel médical</DropdownMenuItem>
                  <DropdownMenuItem className="text-error-600">Hors service</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              
              <DropdownMenuItem>
                📊 Rapport d'Activité
              </DropdownMenuItem>
              <DropdownMenuItem>
                ⚙️ Paramètres Véhicule
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center justify-between p-4 border-2 border-warning-200 bg-warning-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚑</div>
            <div>
              <p className="font-medium">AMB-002</p>
              <p className="text-sm text-muted-foreground">Dr. Leroy + Inf. Petit</p>
            </div>
            <Badge className="bg-warning-600 text-white">🟡 En mission</Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Suivre ⋮
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>AMB-002 - En Mission</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                📍 Suivi GPS Temps Réel
              </DropdownMenuItem>
              <DropdownMenuItem>
                📞 Radio - Contact Direct
              </DropdownMenuItem>
              <DropdownMenuItem>
                ⏱️ ETA Destination
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                👤 Infos Patient Transporté
              </DropdownMenuItem>
              <DropdownMenuItem>
                🏥 Détails Destination
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error-600">
                🚨 Signal d'Urgence
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="flex items-center justify-between p-4 border-2 border-error-200 bg-error-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🚑</div>
            <div>
              <p className="font-medium">AMB-003</p>
              <p className="text-sm text-muted-foreground">Dr. Kim + Inf. Bernard</p>
            </div>
            <Badge className="bg-error-600 text-white animate-pulse">🔴 URGENCE</Badge>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="border-error-300">
                Urgence ⋮
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-error-700">AMB-003 - CODE ROUGE</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-error-700">
                🚨 Priorité Absolue Active
              </DropdownMenuItem>
              <DropdownMenuItem>
                📍 Position Temps Réel
              </DropdownMenuItem>
              <DropdownMenuItem>
                📻 Communication d'Urgence
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                🏥 Pré-alerte Hôpital
              </DropdownMenuItem>
              <DropdownMenuItem>
                👨‍⚕️ Mobiliser Équipe Trauma
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error-600">
                📞 Contacter Médecin Régulateur
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  ),
}

export const UserPreferences: Story = {
  render: () => {
    const [notifications, setNotifications] = React.useState(true)
    const [sound, setSound] = React.useState(false)
    const [theme, setTheme] = React.useState('light')
    
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">⚙️ Préférences Utilisateur</h3>
        
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-700 font-medium">👨‍⚕️</span>
            </div>
            <div>
              <p className="font-medium">Dr. Claire Martin</p>
              <p className="text-sm text-muted-foreground">Médecin Urgentiste</p>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                ⚙️ Préférences
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Paramètres</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuCheckboxItem
                checked={notifications}
                onCheckedChange={setNotifications}
              >
                🔔 Notifications push
                <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
              </DropdownMenuCheckboxItem>
              
              <DropdownMenuCheckboxItem
                checked={sound}
                onCheckedChange={setSound}
              >
                🔊 Sons d'alerte
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuCheckboxItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuLabel>Thème d'affichage</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                <DropdownMenuRadioItem value="light">
                  ☀️ Clair
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="dark">
                  🌙 Sombre
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="system">
                  💻 Système
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                👤 Mon Profil
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              
              <DropdownMenuItem>
                📊 Tableau de Bord
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-error-600">
                🚪 Déconnexion
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    )
  },
}

export const QuickActions: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">⚡ Actions Rapides</h3>
      
      <div className="flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-error-600 hover:bg-error-700 text-white">
              🚨 Urgences
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-error-700">Actions d'Urgence</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="text-error-700">
              🚨 Code Rouge - Arrêt Cardiaque
            </DropdownMenuItem>
            <DropdownMenuItem className="text-warning-700">
              🟡 Code Orange - Traumatisme
            </DropdownMenuItem>
            <DropdownMenuItem className="text-primary-700">
              🔵 Code Bleu - Détresse Respiratoire
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              📞 Contacter SAMU 15
            </DropdownMenuItem>
            <DropdownMenuItem>
              🚒 Alerter Pompiers 18
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-primary-600" variant="default">
              🚑 Transports
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Services de Transport</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              🏥 Consultation Médicale
            </DropdownMenuItem>
            <DropdownMenuItem>
              🩺 Visite Spécialiste
            </DropdownMenuItem>
            <DropdownMenuItem>
              🧪 Analyses / Examens
            </DropdownMenuItem>
            <DropdownMenuItem>
              💊 Pharmacie d'Urgence
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              🏠 Retour à Domicile
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              📊 Rapports
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Rapports & Statistiques</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem>
              📈 Activité Quotidienne
            </DropdownMenuItem>
            <DropdownMenuItem>
              📅 Rapport Hebdomadaire
            </DropdownMenuItem>
            <DropdownMenuItem>
              📊 Statistiques Mensuelles
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              🚑 Performance Flotte
            </DropdownMenuItem>
            <DropdownMenuItem>
              ⏱️ Temps d'Intervention
            </DropdownMenuItem>
            <DropdownMenuItem>
              👥 Satisfaction Patients
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  ),
}

export const SeniorFriendly: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">👴 Interface Senior - Menus Simplifiés</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-6 border-2 rounded-lg bg-neutral-50">
          <div>
            <p className="text-xl font-medium">Marie Dupont</p>
            <p className="text-lg text-muted-foreground">Vos options</p>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="lg" className="text-lg px-6 py-4">
                📋 Mon Menu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <DropdownMenuLabel className="text-lg">Que voulez-vous faire ?</DropdownMenuLabel>
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-base py-3">
                🚑 Réserver une Ambulance
              </DropdownMenuItem>
              
              <DropdownMenuItem className="text-base py-3">
                📅 Voir mes Rendez-vous
              </DropdownMenuItem>
              
              <DropdownMenuItem className="text-base py-3">
                💊 Mes Médicaments
              </DropdownMenuItem>
              
              <DropdownMenuItem className="text-base py-3">
                📞 Contacter HavRid
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-base py-3 text-error-600">
                🚨 URGENCE - J'ai besoin d'aide
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-base text-center text-primary-700">
            💡 <strong>Conseil :</strong> Cliquez sur "Mon Menu" pour voir toutes vos options.
            Si vous avez des difficultés, appelez le 01 23 45 67 89.
          </p>
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
          Navigation clavier : Tab pour naviguer, Enter pour ouvrir, Échap pour fermer, flèches pour naviguer dans le menu.
        </p>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Test d'Accessibilité
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>♿ Fonctionnalités Accessibles</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="focus:bg-primary/10">
              Navigation clavier complète
            </DropdownMenuItem>
            
            <DropdownMenuItem className="focus:bg-primary/10">
              Support lecteurs d'écran
            </DropdownMenuItem>
            
            <DropdownMenuItem className="focus:bg-primary/10">
              Contraste élevé respecté
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuCheckboxItem>
              Rôles ARIA définis
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuCheckboxItem>
              États keyboard focus visibles
            </DropdownMenuCheckboxItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Fermer avec Échap
              <DropdownMenuShortcut>Esc</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
          <p className="text-sm text-success-700">
            ✓ Ce menu déroulant respecte toutes les directives WCAG 2.1 AA
            et est entièrement accessible aux utilisateurs de technologies d'assistance.
          </p>
        </div>
      </div>
    </div>
  ),
}