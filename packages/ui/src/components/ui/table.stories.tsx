import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table'
import { Badge } from './badge'
import { Button } from './button'

const meta: Meta<typeof Table> = {
  title: 'Components/UI/Table',
  component: Table,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tableau accessible pour l\'affichage de données structurées, optimisé pour les informations médicales et administratives.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Table>
        <TableCaption>Liste des patients récents</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Âge</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Marie Dupont</TableCell>
            <TableCell>78 ans</TableCell>
            <TableCell>Cardiologie</TableCell>
            <TableCell>
              <Badge className="bg-success-100 text-success-700">Actif</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">Voir</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Jean Martin</TableCell>
            <TableCell>65 ans</TableCell>
            <TableCell>Orthopédie</TableCell>
            <TableCell>
              <Badge className="bg-warning-100 text-warning-700">En attente</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">Voir</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Anne Bernard</TableCell>
            <TableCell>82 ans</TableCell>
            <TableCell>Neurologie</TableCell>
            <TableCell>
              <Badge className="bg-error-100 text-error-700">Urgent</Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">Voir</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const PatientsList: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">👥 Gestion des Patients</h3>
        <Badge className="bg-primary-100 text-primary-700">248 patients</Badge>
      </div>
      
      <Table>
        <TableCaption>Liste complète des patients avec statuts médicaux</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Informations</TableHead>
            <TableHead>Médecin Traitant</TableHead>
            <TableHead>Dernière Visite</TableHead>
            <TableHead>Statut Médical</TableHead>
            <TableHead>Alertes</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="font-medium">Marie Dupont</div>
              <div className="text-sm text-muted-foreground">N° 2 85 03 75 123 456 78</div>
            </TableCell>
            <TableCell>
              <div>78 ans • Femme</div>
              <div className="text-sm text-muted-foreground">15 Av. République, 75011</div>
              <div className="text-sm text-muted-foreground">06 12 34 56 78</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Dr. Claire Martin</div>
              <div className="text-sm text-muted-foreground">Cardiologie</div>
            </TableCell>
            <TableCell>
              <div>15/10/2024</div>
              <div className="text-sm text-muted-foreground">Consultation cardiologie</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-success-100 text-success-700 border-success-200">
                ✓ Stable
              </Badge>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <Badge className="bg-error-100 text-error-700 border-error-200 text-xs">
                  🚨 Allergie Pénicilline
                </Badge>
                <Badge className="bg-warning-100 text-warning-700 border-warning-200 text-xs">
                  💊 Anticoagulant
                </Badge>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button variant="outline" size="sm">📋 Dossier</Button>
                <Button variant="outline" size="sm">🚑 Transport</Button>
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell>
              <div className="font-medium">Jean Martin</div>
              <div className="text-sm text-muted-foreground">N° 1 65 07 92 456 789 12</div>
            </TableCell>
            <TableCell>
              <div>65 ans • Homme</div>
              <div className="text-sm text-muted-foreground">28 Rue des Lilas, 75019</div>
              <div className="text-sm text-muted-foreground">06 98 76 54 32</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Dr. Sophie Leroy</div>
              <div className="text-sm text-muted-foreground">Orthopédie</div>
            </TableCell>
            <TableCell>
              <div>12/10/2024</div>
              <div className="text-sm text-muted-foreground">Fracture poignet - Suivi</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-warning-100 text-warning-700 border-warning-200">
                ⏳ Surveillance
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className="bg-primary-100 text-primary-700 border-primary-200 text-xs">
                ℹ️ Plâtre jusqu'au 25/10
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button variant="outline" size="sm">📋 Dossier</Button>
                <Button variant="outline" size="sm">🚑 Transport</Button>
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow className="bg-error-50">
            <TableCell>
              <div className="font-medium text-error-700">Anne Bernard</div>
              <div className="text-sm text-error-600">N° 2 82 01 75 987 654 32</div>
            </TableCell>
            <TableCell>
              <div>82 ans • Femme</div>
              <div className="text-sm text-muted-foreground">45 Bd Saint-Germain, 75005</div>
              <div className="text-sm text-muted-foreground">01 45 67 89 12</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Dr. Pierre Dubois</div>
              <div className="text-sm text-muted-foreground">Neurologie</div>
            </TableCell>
            <TableCell>
              <div className="text-error-700 font-medium">Aujourd'hui</div>
              <div className="text-sm text-error-600">Malaise - Urgences</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-error-600 text-white animate-pulse">
                🚨 URGENCE
              </Badge>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <Badge className="bg-error-700 text-white text-xs">
                  🧠 AVC Suspect
                </Badge>
                <Badge className="bg-warning-600 text-white text-xs">
                  ⏱️ Temps critique
                </Badge>
              </div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button className="bg-error-600 hover:bg-error-700 text-white" size="sm">
                  🚨 Urgence
                </Button>
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell>
              <div className="font-medium">Paul Leroy</div>
              <div className="text-sm text-muted-foreground">N° 1 68 03 94 123 876 54</div>
            </TableCell>
            <TableCell>
              <div>56 ans • Homme</div>
              <div className="text-sm text-muted-foreground">12 Place Vendôme, 75001</div>
              <div className="text-sm text-muted-foreground">06 11 22 33 44</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Dr. Marie Petit</div>
              <div className="text-sm text-muted-foreground">Médecine générale</div>
            </TableCell>
            <TableCell>
              <div>01/09/2024</div>
              <div className="text-sm text-muted-foreground">Bilan de santé</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-success-100 text-success-700 border-success-200">
                ✓ Excellent
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200 text-xs">
                Aucune alerte
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button variant="outline" size="sm">📋 Dossier</Button>
                <Button variant="outline" size="sm">🚑 Transport</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const AmbulanceFleet: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">🚑 État de la Flotte</h3>
        <div className="flex gap-2">
          <Badge className="bg-success-100 text-success-700">8 Disponibles</Badge>
          <Badge className="bg-warning-100 text-warning-700">3 En mission</Badge>
          <Badge className="bg-error-100 text-error-700">1 Urgence</Badge>
        </div>
      </div>
      
      <Table>
        <TableCaption>Suivi temps réel des ambulances et équipages</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Véhicule</TableHead>
            <TableHead>Équipage</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Mission Actuelle</TableHead>
            <TableHead>Localisation</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-success-50">
            <TableCell>
              <div className="font-medium">🚑 AMB-001</div>
              <div className="text-sm text-muted-foreground">Mercedes Sprinter</div>
              <div className="text-sm text-muted-foreground">Immat: AB-123-CD</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Dr. Claire Martin</div>
              <div className="text-sm text-muted-foreground">+ Inf. Sophie Dubois</div>
              <div className="text-sm text-muted-foreground">+ Cond. Pierre Leroy</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-success-600 text-white">
                🟢 Disponible
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-muted-foreground">En attente</div>
              <div className="text-sm text-muted-foreground">Prêt pour intervention</div>
            </TableCell>
            <TableCell>
              <div>Station République</div>
              <div className="text-sm text-muted-foreground">Paris 11e</div>
            </TableCell>
            <TableCell>
              <div className="text-muted-foreground">-</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button variant="outline" size="sm">🎯 Assigner</Button>
                <Button variant="outline" size="sm">📞 Contact</Button>
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow className="bg-warning-50">
            <TableCell>
              <div className="font-medium">🚑 AMB-002</div>
              <div className="text-sm text-muted-foreground">Renault Master</div>
              <div className="text-sm text-muted-foreground">Immat: EF-456-GH</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Dr. Jean Dupont</div>
              <div className="text-sm text-muted-foreground">+ Inf. Marc Petit</div>
              <div className="text-sm text-muted-foreground">+ Cond. Lisa Chen</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-warning-600 text-white">
                🟡 En mission
              </Badge>
            </TableCell>
            <TableCell>
              <div className="font-medium">Transport Jean Martin</div>
              <div className="text-sm text-muted-foreground">Vers Hôpital Bichat</div>
              <div className="text-sm text-warning-600">Consultation orthopédie</div>
            </TableCell>
            <TableCell>
              <div>En route</div>
              <div className="text-sm text-muted-foreground">A86 - Sortie 7</div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-warning-700">12 min</div>
              <div className="text-sm text-muted-foreground">Arrivée destination</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button variant="outline" size="sm">📍 Suivre</Button>
                <Button variant="outline" size="sm">📞 Radio</Button>
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow className="bg-error-50 border-2 border-error-200">
            <TableCell>
              <div className="font-medium text-error-700">🚑 AMB-003</div>
              <div className="text-sm text-error-600">Ford Transit</div>
              <div className="text-sm text-error-600">Immat: IJ-789-KL</div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-error-700">Dr. Sarah Kim</div>
              <div className="text-sm text-error-600">+ Inf. Thomas Bernard</div>
              <div className="text-sm text-error-600">+ Cond. Alex Moreau</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-error-600 text-white animate-pulse">
                🔴 URGENCE
              </Badge>
            </TableCell>
            <TableCell>
              <div className="font-medium text-error-700">CODE ROUGE</div>
              <div className="text-sm text-error-600">Arrêt cardiaque</div>
              <div className="text-sm text-error-600">45 Bd Saint-Germain</div>
            </TableCell>
            <TableCell>
              <div className="text-error-700 font-medium">En intervention</div>
              <div className="text-sm text-error-600">Paris 5e</div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-error-700">4 min</div>
              <div className="text-sm text-error-600">Vers Urgences</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button className="bg-error-600 hover:bg-error-700 text-white" size="sm">
                  🚨 Urgence
                </Button>
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell>
              <div className="font-medium">🚑 AMB-004</div>
              <div className="text-sm text-muted-foreground">Peugeot Boxer</div>
              <div className="text-sm text-muted-foreground">Immat: MN-012-OP</div>
            </TableCell>
            <TableCell>
              <div className="text-muted-foreground">Équipe Réserve</div>
              <div className="text-sm text-muted-foreground">En attente d'affectation</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-neutral-500 text-white">
                ⚙️ Maintenance
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-muted-foreground">Révision technique</div>
              <div className="text-sm text-muted-foreground">Contrôle matériel médical</div>
            </TableCell>
            <TableCell>
              <div>Garage Central</div>
              <div className="text-sm text-muted-foreground">Maintenance préventive</div>
            </TableCell>
            <TableCell>
              <div className="text-muted-foreground">16h30</div>
              <div className="text-sm text-muted-foreground">Retour service</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex gap-1 justify-end">
                <Button variant="outline" size="sm" disabled>⚙️ Maintenance</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const MedicalSchedule: Story = {
  render: () => (
    <div className="w-full max-w-5xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">📅 Planning des Transports - 18 Octobre 2024</h3>
        <Badge className="bg-primary-100 text-primary-700">24 transports prévus</Badge>
      </div>
      
      <Table>
        <TableCaption>Planning journalier des transports médicalisés</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Horaire</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Type de Transport</TableHead>
            <TableHead>Trajet</TableHead>
            <TableHead>Ambulance</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <div className="font-medium">08:30</div>
              <div className="text-sm text-muted-foreground">Départ prévu</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Marie Dupont</div>
              <div className="text-sm text-muted-foreground">78 ans • Cardiologie</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-primary-100 text-primary-700 border-primary-200">
                🏥 Consultation
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>📍 15 Av. République → Hôpital Saint-Louis</div>
                <div className="text-muted-foreground">Dr. Martin - Service Cardiologie</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">AMB-001</div>
              <div className="text-sm text-muted-foreground">Dr. Martin + Équipe</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-success-100 text-success-700 border-success-200">
                ✓ Confirmé
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">📝 Modifier</Button>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell>
              <div className="font-medium">09:15</div>
              <div className="text-sm text-muted-foreground">Transport urgent</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Jean Martin</div>
              <div className="text-sm text-muted-foreground">65 ans • Orthopédie</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-warning-100 text-warning-700 border-warning-200">
                ⚡ Urgent
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>📍 28 Rue des Lilas → Hôpital Bichat</div>
                <div className="text-muted-foreground">Contrôle fracture - Dr. Leroy</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">AMB-002</div>
              <div className="text-sm text-muted-foreground">Dr. Dupont + Équipe</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-warning-100 text-warning-700 border-warning-200">
                ⏳ En préparation
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">🚑 Préparer</Button>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell>
              <div className="font-medium">10:45</div>
              <div className="text-sm text-muted-foreground">Retour domicile</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Paul Leroy</div>
              <div className="text-sm text-muted-foreground">56 ans • Post-opératoire</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-secondary-100 text-secondary-700 border-secondary-200">
                🏠 Retour
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>📍 Hôpital Pitié → 12 Place Vendôme</div>
                <div className="text-muted-foreground">Post-opération chirurgie</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">AMB-004</div>
              <div className="text-sm text-muted-foreground">Équipe Réserve</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-success-100 text-success-700 border-success-200">
                ✓ Programmé
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">📋 Détails</Button>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell>
              <div className="font-medium">14:20</div>
              <div className="text-sm text-muted-foreground">Examens médicaux</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">Sophie Moreau</div>
              <div className="text-sm text-muted-foreground">72 ans • IRM</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-accent-100 text-accent-700 border-accent-200">
                🧪 Examens
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-sm">
                <div>📍 5 Rue de la Paix → Centre IRM Monceau</div>
                <div className="text-muted-foreground">IRM cérébrale de contrôle</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">AMB-001</div>
              <div className="text-sm text-muted-foreground">Retour de mission précédente</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-primary-100 text-primary-700 border-primary-200">
                📋 Planifié
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm">⏰ Rappel</Button>
            </TableCell>
          </TableRow>
          
          <TableRow className="bg-neutral-50">
            <TableCell>
              <div className="font-medium text-muted-foreground">16:00</div>
              <div className="text-sm text-muted-foreground">Annulé</div>
            </TableCell>
            <TableCell>
              <div className="font-medium text-muted-foreground">Emma Durand</div>
              <div className="text-sm text-muted-foreground">45 ans • Consultation</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
                ❌ Annulé
              </Badge>
            </TableCell>
            <TableCell>
              <div className="text-sm text-muted-foreground">
                <div>Transport annulé par le patient</div>
                <div>Motif: RDV médical reporté</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="text-muted-foreground">-</div>
            </TableCell>
            <TableCell>
              <Badge className="bg-neutral-100 text-neutral-700 border-neutral-200">
                Annulé 14h30
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" disabled>Annulé</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
}

export const SeniorFriendlySchedule: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <h3 className="text-2xl font-semibold">📅 Vos Prochains Rendez-vous</h3>
      <p className="text-lg text-muted-foreground">Liste simple de vos transports programmés</p>
      
      <Table>
        <TableCaption className="text-base">
          Vos rendez-vous avec transport en ambulance
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg">📅 Quand ?</TableHead>
            <TableHead className="text-lg">👨‍⚕️ Chez qui ?</TableHead>
            <TableHead className="text-lg">🚑 Votre ambulance</TableHead>
            <TableHead className="text-lg">📞 Contact</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-2 border-primary-200 bg-primary-50">
            <TableCell className="py-6">
              <div className="text-xl font-semibold text-primary-700">Demain</div>
              <div className="text-lg">Vendredi 19 Octobre</div>
              <div className="text-lg font-medium text-primary-700">14h30</div>
            </TableCell>
            <TableCell className="py-6">
              <div className="text-xl font-medium">Dr. Claire Martin</div>
              <div className="text-lg text-muted-foreground">Votre cardiologue</div>
              <div className="text-base text-muted-foreground">Hôpital Saint-Louis</div>
              <Badge className="bg-success-100 text-success-700 mt-2 text-base px-3 py-1">
                ✓ Confirmé
              </Badge>
            </TableCell>
            <TableCell className="py-6">
              <div className="text-lg font-medium">Pierre Leroy</div>
              <div className="text-base text-muted-foreground">Votre conducteur habituel</div>
              <div className="text-base text-muted-foreground">Ambulance AMB-001</div>
              <div className="mt-2">
                <Badge className="bg-primary-100 text-primary-700 text-base px-3 py-1">
                  🚑 Arrivée prévue: 14h15
                </Badge>
              </div>
            </TableCell>
            <TableCell className="py-6">
              <div className="space-y-2">
                <Button size="lg" className="w-full text-lg py-3">
                  📞 Appeler Pierre
                </Button>
                <div className="text-center font-mono text-lg">
                  06 12 34 56 78
                </div>
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="py-6">
              <div className="text-xl font-semibold">Mardi 22 Octobre</div>
              <div className="text-lg font-medium">10h00</div>
            </TableCell>
            <TableCell className="py-6">
              <div className="text-xl font-medium">Laboratoire Cerba</div>
              <div className="text-lg text-muted-foreground">Prise de sang</div>
              <div className="text-base text-muted-foreground">Analyses prescrites</div>
              <Badge className="bg-warning-100 text-warning-700 mt-2 text-base px-3 py-1">
                ⏳ À confirmer
              </Badge>
            </TableCell>
            <TableCell className="py-6">
              <div className="text-lg text-muted-foreground">Ambulance à définir</div>
              <div className="text-base text-muted-foreground">Nous vous préviendrons 24h avant</div>
            </TableCell>
            <TableCell className="py-6">
              <Button variant="outline" size="lg" className="w-full text-lg py-3">
                📞 Nous appeler
              </Button>
              <div className="text-center font-mono text-lg mt-2">
                01 23 45 67 89
              </div>
            </TableCell>
          </TableRow>
          
          <TableRow>
            <TableCell className="py-6">
              <div className="text-xl font-semibold">Vendredi 25 Octobre</div>
              <div className="text-lg font-medium">16h30</div>
            </TableCell>
            <TableCell className="py-6">
              <div className="text-xl font-medium">Dr. Sophie Leroy</div>
              <div className="text-lg text-muted-foreground">Contrôle orthopédie</div>
              <div className="text-base text-muted-foreground">Hôpital Bichat</div>
              <Badge className="bg-neutral-100 text-neutral-700 mt-2 text-base px-3 py-1">
                📋 Programmé
              </Badge>
            </TableCell>
            <TableCell className="py-6">
              <div className="text-lg text-muted-foreground">Équipe habituelle</div>
              <div className="text-base text-muted-foreground">Confirmation dans 7 jours</div>
            </TableCell>
            <TableCell className="py-6">
              <Button variant="outline" size="lg" className="w-full text-lg py-3">
                ℹ️ Plus d'infos
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      <div className="p-6 bg-neutral-50 border-2 rounded-lg">
        <p className="text-xl text-center font-medium mb-2">❓ Besoin d'aide ?</p>
        <p className="text-lg text-center">
          Appelez-nous au <span className="font-mono text-xl font-bold">01 23 45 67 89</span>
        </p>
        <p className="text-base text-center text-muted-foreground mt-1">
          Nous sommes là pour vous aider 24h/24
        </p>
      </div>
    </div>
  ),
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-4">
      <h3 className="text-lg font-semibold mb-4">♿ Tableau Accessible</h3>
      
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm mb-4 text-muted-foreground">
          Navigation clavier : Tab pour naviguer entre les cellules et boutons, Enter pour activer.
        </p>
        
        <Table>
          <TableCaption>
            Exemple de tableau respectant les standards d'accessibilité WCAG 2.1 AA
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead scope="col">Patient</TableHead>
              <TableHead scope="col">Service Médical</TableHead>
              <TableHead scope="col">Statut</TableHead>
              <TableHead scope="col" className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="font-medium">Marie Dupont</div>
                <div className="text-sm text-muted-foreground" aria-label="Âge: 78 ans">78 ans</div>
              </TableCell>
              <TableCell>
                <span aria-label="Service de cardiologie">Cardiologie</span>
              </TableCell>
              <TableCell>
                <Badge 
                  className="bg-success-100 text-success-700"
                  aria-label="Statut: Patient actif et stable"
                >
                  ✓ Actif
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Voir le dossier complet de Marie Dupont"
                >
                  📋 Dossier
                </Button>
              </TableCell>
            </TableRow>
            
            <TableRow>
              <TableCell>
                <div className="font-medium">Jean Martin</div>
                <div className="text-sm text-muted-foreground" aria-label="Âge: 65 ans">65 ans</div>
              </TableCell>
              <TableCell>
                <span aria-label="Service d'orthopédie">Orthopédie</span>
              </TableCell>
              <TableCell>
                <Badge 
                  className="bg-warning-100 text-warning-700"
                  aria-label="Statut: Patient en attente de transport"
                >
                  ⏳ En attente
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Voir le dossier complet de Jean Martin"
                >
                  📋 Dossier
                </Button>
              </TableCell>
            </TableRow>
            
            <TableRow className="bg-error-50" aria-label="Patient prioritaire">
              <TableCell>
                <div className="font-medium">Anne Bernard</div>
                <div className="text-sm text-muted-foreground" aria-label="Âge: 82 ans">82 ans</div>
              </TableCell>
              <TableCell>
                <span aria-label="Service de neurologie">Neurologie</span>
              </TableCell>
              <TableCell>
                <Badge 
                  className="bg-error-600 text-white animate-pulse"
                  aria-label="Statut urgent: Patient nécessitant une intervention immédiate"
                >
                  🚨 URGENT
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button 
                  className="bg-error-600 hover:bg-error-700 text-white focus:ring-2 focus:ring-error-500 focus:ring-offset-2"
                  size="sm"
                  aria-label="Traiter l'urgence pour Anne Bernard"
                >
                  🚨 Urgence
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        
        <div className="mt-4 p-3 bg-success-50 border border-success-200 rounded-lg">
          <p className="text-sm text-success-700">
            ✓ Fonctionnalités d'accessibilité : En-têtes de colonnes (scope="col"), 
            labels ARIA descriptifs, contraste conforme, navigation clavier complète, 
            focus visible sur tous les éléments interactifs.
          </p>
        </div>
      </div>
    </div>
  ),
}