import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table'

const meta: Meta = {
  title: 'Examples/Fleet Management',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interfaces professionnelles pour les gestionnaires de flotte d\'ambulances. Tableaux de bord temps réel, gestion des véhicules et suivi des interventions.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const FleetDashboard: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Gestion de Flotte</h1>
            <p className="text-lg text-muted-foreground">
              Tableau de bord - {new Date().toLocaleDateString('fr-FR')}
            </p>
          </div>
          <div className="flex gap-4">
            <Button className="bg-primary-600">
              + Nouvelle Intervention
            </Button>
            <Button variant="outline">
              📊 Rapports
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success-600">12</div>
              <div className="text-sm text-muted-foreground">Ambulances Disponibles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning-600">3</div>
              <div className="text-sm text-muted-foreground">En Intervention</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-error-600">1</div>
              <div className="text-sm text-muted-foreground">Urgences Actives</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary-600">8</div>
              <div className="text-sm text-muted-foreground">Transports Programmés</div>
            </CardContent>
          </Card>
        </div>

        {/* Fleet Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">État de la Flotte en Temps Réel</CardTitle>
            <CardDescription>
              Statut et localisation de toutes les ambulances
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Équipage</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Patient/Mission</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚑</span>
                      AMB-001
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success-600 text-white">Disponible</Badge>
                  </TableCell>
                  <TableCell>Dr. Martin, Inf. Dubois</TableCell>
                  <TableCell>Base Centrale</TableCell>
                  <TableCell className="text-muted-foreground">-</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Assigner</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚑</span>
                      AMB-002
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-warning-600 text-white">En Route</Badge>
                  </TableCell>
                  <TableCell>Dr. Leroy, Inf. Petit</TableCell>
                  <TableCell>République → Hôpital</TableCell>
                  <TableCell>Marie Dupont (Transport programmé)</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Suivre</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚑</span>
                      AMB-003
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-error-600 text-white animate-pulse">URGENCE</Badge>
                  </TableCell>
                  <TableCell>Dr. Moreau, Inf. Bernard</TableCell>
                  <TableCell>15 rue Voltaire</TableCell>
                  <TableCell>Jean Durand (Malaise cardiaque)</TableCell>
                  <TableCell>
                    <Button size="sm" className="bg-error-600">Priorité</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">🚑</span>
                      AMB-004
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Maintenance</Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">-</TableCell>
                  <TableCell>Garage Central</TableCell>
                  <TableCell>Révision mensuelle</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" disabled>Indisponible</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Active Interventions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-error-200">
            <CardHeader>
              <CardTitle className="text-xl text-error-700 flex items-center gap-2">
                🚨 Interventions d'Urgence
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border border-error-200 rounded-lg p-4 bg-error-50">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">Malaise cardiaque</h3>
                  <Badge className="bg-error-600 text-white">PRIORITÉ 1</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  15 rue Voltaire, 75011 Paris - Apt 3B
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">AMB-003 assignée</span>
                  <span className="text-sm font-mono">14:23 - Arrivée estimée 2 min</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                📅 Transports Programmés Aujourd'hui
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { time: '15:30', patient: 'Marie Dupont', destination: 'Cardio - St Louis', ambulance: 'AMB-002' },
                { time: '16:15', patient: 'Paul Martin', destination: 'Labo Central', ambulance: 'AMB-001' },
                { time: '17:00', patient: 'Anne Lemaire', destination: 'Cabinet Dermato', ambulance: 'AMB-005' },
              ].map((transport, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{transport.patient}</p>
                      <p className="text-sm text-muted-foreground">{transport.destination}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">{transport.time}</p>
                      <p className="text-xs text-primary-600">{transport.ambulance}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
}

export const DispatchInterface: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Emergency Header */}
        <div className="bg-error-700 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-3xl animate-pulse">🚨</span>
              <div>
                <h1 className="text-2xl font-bold">Centre de Dispatch - Mode Urgence</h1>
                <p className="text-error-100">1 intervention critique en cours</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-mono font-bold">14:25:32</p>
              <p className="text-error-100">Temps réel</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🗺️ Carte Temps Réel
                  <Badge className="bg-success-600 text-white">GPS Actif</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="h-full">
                <div className="bg-neutral-200 h-full rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <div className="text-6xl">🗺️</div>
                    <p className="text-lg font-medium">Carte Interactive GPS</p>
                    <p className="text-sm text-muted-foreground">
                      Positions en temps réel des 16 ambulances
                    </p>
                    <div className="flex gap-4 justify-center mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-success-600 rounded-full"></div>
                        <span className="text-sm">Disponible</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-warning-600 rounded-full"></div>
                        <span className="text-sm">En mission</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-error-600 rounded-full animate-pulse"></div>
                        <span className="text-sm">Urgence</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-4">
            <Card className="border-error-200 bg-error-50">
              <CardHeader>
                <CardTitle className="text-error-700">🚨 Intervention Active</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <Label className="font-semibold">Patient:</Label>
                    <p>Jean Durand, 72 ans</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Type:</Label>
                    <p className="text-error-600">Malaise cardiaque</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Adresse:</Label>
                    <p>15 rue Voltaire</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Étage:</Label>
                    <p>3ème, Apt B</p>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <Label className="font-semibold">AMB-003 assignée</Label>
                  <div className="flex justify-between text-sm">
                    <span>ETA: 2 min</span>
                    <span className="font-mono">14:27</span>
                  </div>
                </div>
                <Button className="w-full bg-error-600 hover:bg-error-700">
                  📞 Contacter l'Équipe
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>📋 File d'Attente</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between p-2 border rounded">
                    <span>Transport Marie D.</span>
                    <span className="text-primary-600">15:30</span>
                  </div>
                  <div className="flex justify-between p-2 border rounded">
                    <span>Transport Paul M.</span>
                    <span className="text-primary-600">16:15</span>
                  </div>
                  <div className="flex justify-between p-2 border rounded border-warning-200 bg-warning-50">
                    <span>Appel entrant</span>
                    <Badge className="bg-warning-600 text-white text-xs">En attente</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>⚡ Actions Rapides</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full text-sm">
                  📞 Nouvel Appel d'Urgence
                </Button>
                <Button variant="outline" className="w-full text-sm">
                  🚑 Réassigner Ambulance
                </Button>
                <Button variant="outline" className="w-full text-sm">
                  📊 Générer Rapport
                </Button>
                <Button variant="outline" className="w-full text-sm">
                  ⚠️ Alerte Générale
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Communications */}
        <Card>
          <CardHeader>
            <CardTitle>📻 Communications Radio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="font-semibold">AMB-003 (Urgence)</Label>
                <div className="bg-neutral-100 p-3 rounded text-sm">
                  <p className="text-xs text-muted-foreground">14:25</p>
                  <p>"Arrivée sur site dans 1 minute, patient conscient"</p>
                </div>
                <Button size="sm" className="w-full">
                  📻 Répondre
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">AMB-002 (Transport)</Label>
                <div className="bg-neutral-100 p-3 rounded text-sm">
                  <p className="text-xs text-muted-foreground">14:22</p>
                  <p>"Prise en charge effectuée, direction hôpital"</p>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  ✓ Acquitté
                </Button>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">AMB-001 (Disponible)</Label>
                <div className="bg-neutral-100 p-3 rounded text-sm">
                  <p className="text-xs text-muted-foreground">14:20</p>
                  <p>"Retour base, prêt pour nouvelle mission"</p>
                </div>
                <Button size="sm" variant="secondary" className="w-full">
                  💬 Message
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}

export const VehicleManagement: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion des Véhicules</h1>
          <div className="flex gap-3">
            <Button variant="outline">📋 Planifier Maintenance</Button>
            <Button>+ Nouveau Véhicule</Button>
          </div>
        </div>

        {/* Vehicle Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { 
              id: 'AMB-001', 
              status: 'Disponible', 
              statusColor: 'success', 
              km: '42,350', 
              lastMaintenance: '15/10/2024',
              nextMaintenance: '15/01/2025',
              crew: 'Dr. Martin, Inf. Dubois',
              equipment: ['Défibrillateur', 'Oxygène', 'Brancard']
            },
            { 
              id: 'AMB-002', 
              status: 'En Mission', 
              statusColor: 'warning', 
              km: '38,920', 
              lastMaintenance: '10/10/2024',
              nextMaintenance: '10/01/2025',
              crew: 'Dr. Leroy, Inf. Petit',
              equipment: ['Défibrillateur', 'Oxygène', 'Brancard', 'Perfusion']
            },
            { 
              id: 'AMB-003', 
              status: 'Urgence', 
              statusColor: 'error', 
              km: '51,200', 
              lastMaintenance: '20/10/2024',
              nextMaintenance: '20/01/2025',
              crew: 'Dr. Moreau, Inf. Bernard',
              equipment: ['Défibrillateur', 'Oxygène', 'Brancard', 'Scope']
            },
            { 
              id: 'AMB-004', 
              status: 'Maintenance', 
              statusColor: 'secondary', 
              km: '47,800', 
              lastMaintenance: 'En cours',
              nextMaintenance: '25/11/2024',
              crew: '-',
              equipment: ['En révision']
            },
          ].map((vehicle) => (
            <Card key={vehicle.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">🚑</span>
                    {vehicle.id}
                  </CardTitle>
                  <Badge 
                    className={
                      vehicle.statusColor === 'success' ? 'bg-success-600 text-white' :
                      vehicle.statusColor === 'warning' ? 'bg-warning-600 text-white' :
                      vehicle.statusColor === 'error' ? 'bg-error-600 text-white animate-pulse' :
                      'bg-neutral-500 text-white'
                    }
                  >
                    {vehicle.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="font-semibold">Kilométrage</Label>
                    <p className="font-mono">{vehicle.km} km</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Équipage</Label>
                    <p className="text-xs">{vehicle.crew}</p>
                  </div>
                </div>

                <div>
                  <Label className="font-semibold text-sm">Maintenance</Label>
                  <div className="text-xs text-muted-foreground">
                    <p>Dernière: {vehicle.lastMaintenance}</p>
                    <p>Prochaine: {vehicle.nextMaintenance}</p>
                  </div>
                </div>

                <div>
                  <Label className="font-semibold text-sm">Équipements</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {vehicle.equipment.map((item, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    📋 Détails
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    🔧 Maintenance
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Maintenance Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>📅 Calendrier de Maintenance</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Véhicule</TableHead>
                  <TableHead>Type de Maintenance</TableHead>
                  <TableHead>Date Programmée</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Estimation</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>AMB-004</TableCell>
                  <TableCell>Révision complète</TableCell>
                  <TableCell>20/11/2024</TableCell>
                  <TableCell><Badge className="bg-warning-600 text-white">En cours</Badge></TableCell>
                  <TableCell>2-3 jours</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Suivre</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>AMB-001</TableCell>
                  <TableCell>Contrôle technique</TableCell>
                  <TableCell>15/01/2025</TableCell>
                  <TableCell><Badge variant="secondary">Programmée</Badge></TableCell>
                  <TableCell>1 jour</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Modifier</Button>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>AMB-002</TableCell>
                  <TableCell>Révision 50k km</TableCell>
                  <TableCell>10/01/2025</TableCell>
                  <TableCell><Badge variant="secondary">Programmée</Badge></TableCell>
                  <TableCell>3-4 jours</TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline">Modifier</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}