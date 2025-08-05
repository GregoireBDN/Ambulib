import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "@repo/ui"

export default function FleetHomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Ambulib Fleet
          </h1>
          <p className="text-xl text-muted-foreground">
            Gestion de flotte et opérations ambulancières
          </p>
        </div>

        {/* Dashboard des véhicules */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Véhicules disponibles</CardTitle>
              <CardDescription>Ambulances prêtes à partir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">8</div>
              <p className="text-sm text-muted-foreground">sur 12 total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>En mission</CardTitle>
              <CardDescription>Véhicules actuellement en service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">3</div>
              <p className="text-sm text-muted-foreground">missions actives</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Maintenance</CardTitle>
              <CardDescription>Véhicules hors service</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">1</div>
              <p className="text-sm text-muted-foreground">révision programmée</p>
            </CardContent>
          </Card>
        </div>

        {/* Actions principales */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Planning des missions</CardTitle>
              <CardDescription>Gérez les affectations et les horaires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Consultez et modifiez le planning des équipes et des véhicules.
              </p>
              <Button className="w-full">Voir le planning</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trajets en temps réel</CardTitle>
              <CardDescription>Suivez les ambulances en mission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Localisez vos véhicules et suivez l'avancement des missions.
              </p>
              <Button variant="secondary" className="w-full">Carte en direct</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rapports d'activité</CardTitle>
              <CardDescription>Statistiques et analyses de performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Consultez les métriques de votre flotte et générez des rapports.
              </p>
              <Button variant="outline" className="w-full">Voir les rapports</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gestion des conducteurs</CardTitle>
              <CardDescription>Équipes et formations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Gérez les équipes, les certifications et les formations.
              </p>
              <Button variant="outline" className="w-full">Gérer les équipes</Button>
            </CardContent>
          </Card>
        </div>

        {/* Notifications importantes */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">Alertes système</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-orange-700">
              <li>• Véhicule AMB-003: Maintenance programmée demain 14h</li>
              <li>• Formation secourisme: 3 conducteurs à certifier</li>
              <li>• Pic d'activité prévu ce weekend</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}