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
  title: 'Examples/Admin Interface',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Interfaces d\'administration système pour la gestion globale de la plateforme HavRid. Gestion des utilisateurs, rapports, configuration système.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const AdminDashboard: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">Administration HavRid</h1>
              <p className="text-lg text-muted-foreground">
                Tableau de bord système - {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="w-12 h-12 bg-primary-100">
                <AvatarFallback className="text-lg">👨‍💼</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <p className="font-semibold">Admin Principal</p>
                <p className="text-sm text-muted-foreground">Système</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary-600">1,247</div>
              <div className="text-sm text-muted-foreground">Utilisateurs Actifs</div>
              <div className="text-xs text-success-600 mt-1">↗ +5.2%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-success-600">16</div>
              <div className="text-sm text-muted-foreground">Ambulances</div>
              <div className="text-xs text-neutral-500 mt-1">12 actives</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning-600">342</div>
              <div className="text-sm text-muted-foreground">Transports/Jour</div>
              <div className="text-xs text-warning-600 mt-1">↗ +12%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-error-600">23</div>
              <div className="text-sm text-muted-foreground">Urgences/Jour</div>
              <div className="text-xs text-error-600 mt-1">↗ +8%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-neutral-600">99.2%</div>
              <div className="text-sm text-muted-foreground">Disponibilité</div>
              <div className="text-xs text-success-600 mt-1">Excellent</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🖥️ État du Système
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">API Principal</span>
                    <Badge className="bg-success-600 text-white">Opérationnel</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Temps de réponse: 45ms</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Base de Données</span>
                    <Badge className="bg-success-600 text-white">Opérationnel</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Utilisation: 78%</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">GPS Tracking</span>
                    <Badge className="bg-success-600 text-white">Opérationnel</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">16/16 véhicules</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Notifications</span>
                    <Badge className="bg-warning-600 text-white">Dégradé</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Délai SMS: 2-3s</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                📊 Voir Métriques Détaillées
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📈 Activité Récente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">👨‍⚕️</span>
                    <span className="text-sm">Nouveau médecin inscrit</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Il y a 5min</span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚑</span>
                    <span className="text-sm">AMB-005 maintenance programmée</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Il y a 12min</span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-lg bg-error-50">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">⚠️</span>
                    <span className="text-sm">Pic d'urgences détecté</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Il y a 18min</span>
                </div>
                <div className="flex items-center justify-between p-2 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📊</span>
                    <span className="text-sm">Rapport mensuel généré</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Il y a 1h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>⚡ Actions Rapides d'Administration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <span className="text-2xl">👥</span>
                <span className="text-sm">Utilisateurs</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <span className="text-2xl">🚑</span>
                <span className="text-sm">Véhicules</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <span className="text-2xl">📊</span>
                <span className="text-sm">Rapports</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <span className="text-2xl">⚙️</span>
                <span className="text-sm">Configuration</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <span className="text-2xl">🔒</span>
                <span className="text-sm">Sécurité</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <span className="text-2xl">🔧</span>
                <span className="text-sm">Maintenance</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}

export const UserManagement: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gestion des Utilisateurs</h1>
          <div className="flex gap-3">
            <Button variant="outline">📥 Import CSV</Button>
            <Button>+ Nouvel Utilisateur</Button>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary-600">892</div>
              <div className="text-sm text-muted-foreground">Patients</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success-600">45</div>
              <div className="text-sm text-muted-foreground">Personnel Médical</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning-600">12</div>
              <div className="text-sm text-muted-foreground">Gestionnaires</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-neutral-600">3</div>
              <div className="text-sm text-muted-foreground">Administrateurs</div>
            </CardContent>
          </Card>
        </div>

        {/* User Table */}
        <Card>
          <CardHeader>
            <CardTitle>📋 Liste des Utilisateurs</CardTitle>
            <CardDescription>
              Gestion complète des comptes utilisateurs et permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <Input placeholder="Rechercher un utilisateur..." className="max-w-md" />
              <select className="px-3 py-2 border border-input rounded-md bg-background">
                <option value="">Tous les rôles</option>
                <option value="patient">Patients</option>
                <option value="medical">Personnel médical</option>
                <option value="manager">Gestionnaires</option>
                <option value="admin">Administrateurs</option>
              </select>
              <select className="px-3 py-2 border border-input rounded-md bg-background">
                <option value="">Tous les statuts</option>
                <option value="active">Actifs</option>
                <option value="inactive">Inactifs</option>
                <option value="suspended">Suspendus</option>
              </select>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Utilisateur</TableHead>
                  <TableHead>Rôle</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Dernière Connexion</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-primary-100">
                        <AvatarFallback>MD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Dr. Marie Dupont</p>
                        <p className="text-sm text-muted-foreground">marie.dupont@havrid.fr</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success-600 text-white">Médecin</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success-100 text-success-700">Actif</Badge>
                  </TableCell>
                  <TableCell>Aujourd'hui 14:30</TableCell>
                  <TableCell>15/03/2023</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">✏️</Button>
                      <Button size="sm" variant="outline">🔒</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-primary-100">
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Jean Durand</p>
                        <p className="text-sm text-muted-foreground">jean.durand@gmail.com</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">Patient</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success-100 text-success-700">Actif</Badge>
                  </TableCell>
                  <TableCell>Hier 09:15</TableCell>
                  <TableCell>22/08/2024</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">✏️</Button>
                      <Button size="sm" variant="outline">📋</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-warning-100">
                        <AvatarFallback>PL</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Paul Leroy</p>
                        <p className="text-sm text-muted-foreground">paul.leroy@havrid.fr</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-warning-600 text-white">Gestionnaire</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-error-100 text-error-700">Suspendu</Badge>
                  </TableCell>
                  <TableCell>Il y a 3 jours</TableCell>
                  <TableCell>10/01/2024</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">✏️</Button>
                      <Button size="sm" className="bg-success-600">Réactiver</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="w-8 h-8 bg-error-100">
                        <AvatarFallback>AM</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Anne Martin</p>
                        <p className="text-sm text-muted-foreground">anne.martin@havrid.fr</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-error-600 text-white">Admin</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-success-100 text-success-700">Actif</Badge>
                  </TableCell>
                  <TableCell>Il y a 2h</TableCell>
                  <TableCell>01/01/2023</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">✏️</Button>
                      <Button size="sm" variant="outline">🔑</Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Affichage de 1 à 10 sur 1,247 utilisateurs
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Précédent</Button>
                <Button variant="outline" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Suivant</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}

export const SystemReports: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Rapports et Analyses</h1>
          <div className="flex gap-3">
            <Button variant="outline">📅 Période Personnalisée</Button>
            <Button>📊 Nouveau Rapport</Button>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">📈</span>
                Activité Opérationnelle
              </CardTitle>
              <CardDescription>
                Transports, urgences, temps de réponse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Transports ce mois</span>
                  <span className="font-bold">10,342</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Urgences traitées</span>
                  <span className="font-bold">1,287</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Temps moyen</span>
                  <span className="font-bold">4min 32s</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Voir le rapport complet
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🚑</span>
                Performance Véhicules
              </CardTitle>
              <CardDescription>
                Utilisation, maintenance, disponibilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Taux d'utilisation</span>
                  <span className="font-bold">87.3%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Véhicules opérationnels</span>
                  <span className="font-bold">15/16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Coût maintenance/mois</span>
                  <span className="font-bold">12,450€</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Analyser la flotte
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">💰</span>
                Analyse Financière
              </CardTitle>
              <CardDescription>
                Revenus, coûts, rentabilité
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Revenus ce mois</span>
                  <span className="font-bold text-success-600">€ 245,680</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Coûts opérationnels</span>
                  <span className="font-bold text-error-600">€ 189,320</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Marge nette</span>
                  <span className="font-bold">22.9%</span>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4">
                Rapport financier
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle>📄 Rapports Récents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du Rapport</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Généré par</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Analyse Mensuelle Octobre 2024</TableCell>
                  <TableCell><Badge variant="outline">Opérationnel</Badge></TableCell>
                  <TableCell>01/10 - 31/10/2024</TableCell>
                  <TableCell>Système Automatique</TableCell>
                  <TableCell>01/11/2024</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">📥 Télécharger</Button>
                      <Button size="sm" variant="outline">👁️ Aperçu</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Performance Flotte Q3</TableCell>
                  <TableCell><Badge variant="outline">Véhicules</Badge></TableCell>
                  <TableCell>01/07 - 30/09/2024</TableCell>
                  <TableCell>Anne Martin</TableCell>
                  <TableCell>15/10/2024</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">📥 Télécharger</Button>
                      <Button size="sm" variant="outline">👁️ Aperçu</Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Rapport Conformité RGPD</TableCell>
                  <TableCell><Badge variant="outline">Sécurité</Badge></TableCell>
                  <TableCell>Septembre 2024</TableCell>
                  <TableCell>Paul Leroy</TableCell>
                  <TableCell>05/10/2024</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">📥 Télécharger</Button>
                      <Button size="sm" variant="outline">👁️ Aperçu</Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>📊 Évolution des Interventions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-neutral-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📈</div>
                  <p className="text-lg font-medium">Graphique d'Évolution</p>
                  <p className="text-sm text-muted-foreground">
                    Transports et urgences par mois
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>🥧 Répartition par Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-neutral-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-lg font-medium">Graphique Circulaire</p>
                  <p className="text-sm text-muted-foreground">
                    Types d'interventions par catégorie
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
}