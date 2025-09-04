import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from './navigation-menu'
import { Badge } from './badge'
import { cn } from '../../lib/utils'

const meta: Meta<typeof NavigationMenu> = {
  title: "UI/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Menu de navigation principal accessible pour l\'interface médicale, avec sous-menus et indicateurs visuels.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Composant helper pour les liens de navigation
const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & {
    title: string
    description?: string
    icon?: string
    badge?: string
    badgeVariant?: 'success' | 'warning' | 'error' | 'primary'
  }
>(({ className, title, children, description, icon, badge, badgeVariant = 'primary', ...props }, ref) => {
  const getBadgeColor = (variant: string) => {
    switch (variant) {
      case 'success':
        return 'bg-success-600 text-white'
      case 'warning':
        return 'bg-warning-600 text-white'
      case 'error':
        return 'bg-error-600 text-white'
      default:
        return 'bg-primary-600 text-white'
    }
  }

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-3">
            {icon && <span className="text-xl">{icon}</span>}
            <div className="flex-1">
              <div className="text-sm font-medium leading-none flex items-center gap-2">
                {title}
                {badge && (
                  <Badge className={cn('text-xs', getBadgeColor(badgeVariant))}>
                    {badge}
                  </Badge>
                )}
              </div>
              {(description || children) && (
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                  {description || children}
                </p>
              )}
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            🏠 Accueil
          </NavigationMenuLink>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger>👥 Patients</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="text-3xl mb-2">👤</div>
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Gestion des Patients
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Accès complet aux dossiers médicaux et à la gestion des patients
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/patients/list" title="Liste des Patients" icon="📋">
                Voir tous les patients enregistrés
              </ListItem>
              <ListItem href="/patients/new" title="Nouveau Patient" icon="➕">
                Créer un nouveau dossier patient
              </ListItem>
              <ListItem href="/patients/search" title="Rechercher" icon="🔍">
                Recherche avancée dans les dossiers
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/ambulances" className={navigationMenuTriggerStyle()}>
            🚑 Ambulances
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/reports" className={navigationMenuTriggerStyle()}>
            📊 Rapports
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}

export const MedicalInterface: Story = {
  render: () => (
    <div className="w-full">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
              🏠 Tableau de Bord
            </NavigationMenuLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2">
              👥 Patients
              <Badge className="bg-primary-100 text-primary-700 text-xs">
                248
              </Badge>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[500px] lg:grid-cols-2">
                <ListItem 
                  href="/patients/active" 
                  title="Patients Actifs" 
                  icon="✅"
                  badge="187"
                  badgeVariant="success"
                >
                  Patients avec dossier actif et transport possible
                </ListItem>
                <ListItem 
                  href="/patients/priority" 
                  title="Priorité Médicale" 
                  icon="🚨"
                  badge="12"
                  badgeVariant="error"
                >
                  Patients nécessitant une surveillance particulière
                </ListItem>
                <ListItem 
                  href="/patients/new-today" 
                  title="Nouveaux Aujourd'hui" 
                  icon="📋"
                  badge="5"
                  badgeVariant="primary"
                >
                  Dossiers créés dans les dernières 24h
                </ListItem>
                <ListItem 
                  href="/patients/pending" 
                  title="En Attente" 
                  icon="⏳"
                  badge="44"
                  badgeVariant="warning"
                >
                  Patients en attente de transport ou validation
                </ListItem>
                <ListItem 
                  href="/patients/medical-alerts" 
                  title="Alertes Médicales" 
                  icon="⚠️"
                  badge="8"
                  badgeVariant="error"
                >
                  Patients avec allergies ou conditions critiques
                </ListItem>
                <ListItem 
                  href="/patients/search" 
                  title="Recherche Avancée" 
                  icon="🔍"
                >
                  Rechercher par nom, pathologie, médecin traitant
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2">
              🚑 Flotte
              <Badge className="bg-success-100 text-success-700 text-xs">
                8/12
              </Badge>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[600px] lg:grid-cols-3">
                <ListItem 
                  href="/fleet/available" 
                  title="Disponibles" 
                  icon="🟢"
                  badge="8"
                  badgeVariant="success"
                >
                  Ambulances prêtes pour intervention
                </ListItem>
                <ListItem 
                  href="/fleet/active" 
                  title="En Mission" 
                  icon="🟡"
                  badge="3"
                  badgeVariant="warning"
                >
                  Transport ou intervention en cours
                </ListItem>
                <ListItem 
                  href="/fleet/maintenance" 
                  title="Maintenance" 
                  icon="⚙️"
                  badge="1"
                >
                  Véhicules en révision technique
                </ListItem>
                <ListItem 
                  href="/fleet/emergency" 
                  title="Urgences Actives" 
                  icon="🚨"
                  badge="2"
                  badgeVariant="error"
                >
                  Interventions d'urgence en cours
                </ListItem>
                <ListItem 
                  href="/fleet/schedule" 
                  title="Planning" 
                  icon="📅"
                >
                  Affectations et missions programmées
                </ListItem>
                <ListItem 
                  href="/fleet/gps" 
                  title="Suivi GPS" 
                  icon="📍"
                >
                  Localisation temps réel de la flotte
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>🏥 Médical</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[600px] gap-3 p-6 lg:grid-cols-2">
                <ListItem 
                  href="/medical/prescriptions" 
                  title="Ordonnances Transport" 
                  icon="📋"
                  badge="Nouveau"
                  badgeVariant="primary"
                >
                  Prescriptions médicales de transport
                </ListItem>
                <ListItem 
                  href="/medical/protocols" 
                  title="Protocoles d'Urgence" 
                  icon="📚"
                >
                  Procédures médicales d'intervention
                </ListItem>
                <ListItem 
                  href="/medical/equipment" 
                  title="Matériel Médical" 
                  icon="🩺"
                >
                  Inventaire et maintenance équipements
                </ListItem>
                <ListItem 
                  href="/medical/medications" 
                  title="Pharmacie d'Urgence" 
                  icon="💊"
                >
                  Stock médicaments et dates de péremption
                </ListItem>
                <ListItem 
                  href="/medical/training" 
                  title="Formation Continue" 
                  icon="🎓"
                >
                  Programmes de formation du personnel
                </ListItem>
                <ListItem 
                  href="/medical/compliance" 
                  title="Conformité RGPD" 
                  icon="🔒"
                >
                  Protection données patients
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink href="/reports" className={navigationMenuTriggerStyle()}>
              📊 Rapports
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
}

export const EmergencyNavigation: Story = {
  render: () => (
    <div className="w-full">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-error-50 text-error-700 hover:bg-error-100 border border-error-200">
              🚨 Centre d'Urgences
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[500px] lg:grid-cols-1">
                <li className="mb-4">
                  <div className="bg-error-50 border-2 border-error-200 rounded-lg p-4">
                    <h4 className="font-semibold text-error-700 mb-2">🚨 Actions d'Urgence</h4>
                    <p className="text-sm text-error-600">
                      Interventions immédiates disponibles 24h/24
                    </p>
                  </div>
                </li>
                
                <ListItem 
                  href="/emergency/cardiac" 
                  title="Code Rouge - Arrêt Cardiaque" 
                  icon="❤️‍🩹"
                  badge="CRITIQUE"
                  badgeVariant="error"
                >
                  Intervention immédiate - Défibrillateur
                </ListItem>
                <ListItem 
                  href="/emergency/trauma" 
                  title="Code Orange - Traumatisme" 
                  icon="🩸"
                  badge="URGENT"
                  badgeVariant="warning"
                >
                  Accidents graves, hémorragies importantes
                </ListItem>
                <ListItem 
                  href="/emergency/respiratory" 
                  title="Code Bleu - Détresse Respiratoire" 
                  icon="🫁"
                  badge="PRIORITÉ"
                  badgeVariant="primary"
                >
                  Problèmes respiratoires, étouffement
                </ListItem>
                <ListItem 
                  href="/emergency/stroke" 
                  title="AVC Suspect" 
                  icon="🧠"
                  badge="TEMPS CRITIQUE"
                  badgeVariant="error"
                >
                  Transport immédiat vers neurologie
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="flex items-center gap-2">
              🚑 Dispatch
              <Badge className="bg-warning-600 text-white text-xs animate-pulse">
                LIVE
              </Badge>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px]">
                <ListItem 
                  href="/dispatch/active" 
                  title="Missions Actives" 
                  icon="📡"
                  badge="5"
                  badgeVariant="warning"
                >
                  Suivi temps réel des interventions
                </ListItem>
                <ListItem 
                  href="/dispatch/queue" 
                  title="File d'Attente" 
                  icon="⏳"
                  badge="12"
                >
                  Demandes en attente d'affectation
                </ListItem>
                <ListItem 
                  href="/dispatch/routing" 
                  title="Optimisation Trajets" 
                  icon="🗺️"
                >
                  Calcul des routes les plus rapides
                </ListItem>
                <ListItem 
                  href="/dispatch/communication" 
                  title="Radio Centrale" 
                  icon="📻"
                >
                  Communication avec les équipages
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/hospitals" 
              className={cn(navigationMenuTriggerStyle(), "flex items-center gap-2")}
            >
              🏥 Hôpitaux Partenaires
              <Badge className="bg-success-100 text-success-700 text-xs">
                12 connectés
              </Badge>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  ),
}

export const SeniorInterface: Story = {
  render: () => (
    <div className="w-full">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/" 
              className={cn(navigationMenuTriggerStyle(), "text-xl px-6 py-4")}
            >
              🏠 Mon Accueil
            </NavigationMenuLink>
          </NavigationMenuItem>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl px-6 py-4">
              📅 Mes Rendez-vous
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-4 p-8 md:w-[500px]">
                <li className="mb-4">
                  <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
                    <h4 className="text-xl font-semibold text-primary-700 mb-2">📅 Vos Rendez-vous</h4>
                    <p className="text-lg text-primary-600">
                      Gérez facilement vos consultations médicales
                    </p>
                  </div>
                </li>
                
                <ListItem 
                  href="/appointments/next" 
                  title="Prochain Rendez-vous" 
                  icon="⏰"
                  badge="Demain 14h30"
                  badgeVariant="success"
                >
                  <span className="text-lg">Dr. Martin - Cardiologie</span>
                </ListItem>
                <ListItem 
                  href="/appointments/all" 
                  title="Tous mes Rendez-vous" 
                  icon="📋"
                >
                  <span className="text-lg">Voir la liste complète</span>
                </ListItem>
                <ListItem 
                  href="/appointments/new" 
                  title="Prendre Rendez-vous" 
                  icon="➕"
                >
                  <span className="text-lg">Programmer une nouvelle consultation</span>
                </ListItem>
                <ListItem 
                  href="/appointments/history" 
                  title="Mes Anciens Rendez-vous" 
                  icon="📚"
                >
                  <span className="text-lg">Historique de vos consultations</span>
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-xl px-6 py-4">
              🚑 Transport
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-4 p-8 md:w-[600px] lg:grid-cols-2">
                <ListItem 
                  href="/transport/book" 
                  title="Réserver une Ambulance" 
                  icon="📞"
                  badge="Simple"
                  badgeVariant="success"
                >
                  <span className="text-lg">Pour aller chez le médecin</span>
                </ListItem>
                <ListItem 
                  href="/transport/emergency" 
                  title="Urgence Médicale" 
                  icon="🚨"
                  badge="24h/24"
                  badgeVariant="error"
                >
                  <span className="text-lg">Si vous vous sentez mal</span>
                </ListItem>
                <ListItem 
                  href="/transport/status" 
                  title="Où est mon Ambulance ?" 
                  icon="📍"
                >
                  <span className="text-lg">Suivre l'arrivée de votre transport</span>
                </ListItem>
                <ListItem 
                  href="/transport/help" 
                  title="Aide et Contact" 
                  icon="💬"
                >
                  <span className="text-lg">Parler avec notre équipe</span>
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink 
              href="/profile" 
              className={cn(navigationMenuTriggerStyle(), "text-xl px-6 py-4")}
            >
              👤 Mon Profil
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="mt-8 p-6 bg-neutral-50 border rounded-lg max-w-md">
        <p className="text-lg text-center">
          💡 <strong>Besoin d'aide ?</strong>
        </p>
        <p className="text-base text-center mt-2">
          Appelez-nous au <strong className="text-xl font-mono">01 23 45 67 89</strong>
        </p>
        <p className="text-sm text-center text-muted-foreground mt-1">
          Nous sommes là 24h/24 pour vous aider
        </p>
      </div>
    </div>
  ),
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold mb-4">♿ Navigation Accessible</h3>
      
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm mb-4 text-muted-foreground">
          Navigation clavier : Tab/Shift+Tab pour naviguer, Enter pour ouvrir, Échap pour fermer, flèches pour naviguer dans les sous-menus.
        </p>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/" 
                className={navigationMenuTriggerStyle()}
              >
                Accueil
              </NavigationMenuLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                Menu Accessible
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-6 md:w-[400px]">
                  <ListItem 
                    href="/accessible-1" 
                    title="Navigation Clavier"
                    icon="⌨️"
                  >
                    Support complet du clavier pour tous les utilisateurs
                  </ListItem>
                  <ListItem 
                    href="/accessible-2" 
                    title="Lecteurs d'Écran"
                    icon="🔊"
                  >
                    ARIA labels et rôles définis pour l'accessibilité
                  </ListItem>
                  <ListItem 
                    href="/accessible-3" 
                    title="Contraste Élevé"
                    icon="🌗"
                  >
                    Respect des standards WCAG 2.1 AA
                  </ListItem>
                  <ListItem 
                    href="/accessible-4" 
                    title="Focus Visible"
                    icon="🎯"
                  >
                    Indicateurs visuels clairs pour la navigation
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuLink 
                href="/help" 
                className={navigationMenuTriggerStyle()}
              >
                Aide
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      
      <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
        <p className="text-sm text-success-700">
          ✓ Ce menu de navigation est entièrement accessible :
          navigation clavier, support des lecteurs d'écran, focus management,
          contraste conforme, et temps de réponse adaptés.
        </p>
      </div>
    </div>
  ),
}