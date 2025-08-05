import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent, Input } from "@repo/ui"

export default function AdminHomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* En-tête */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Ambulib Admin
          </h1>
          <p className="text-xl text-muted-foreground">
            Administration et supervision du système
          </p>
        </div>

        {/* Métriques globales */}
        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs actifs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-muted-foreground">+12% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Missions complétées</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3,892</div>
              <p className="text-xs text-muted-foreground">+8% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€45,231</div>
              <p className="text-xs text-muted-foreground">+15% ce mois</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Satisfaction client</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">+0.2 ce mois</p>
            </CardContent>
          </Card>
        </div>

        {/* Modules d'administration */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
              <CardDescription>Administrer clients, conducteurs et gestionnaires</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Input placeholder="Rechercher un utilisateur..." />
              </div>
              <Button className="w-full">Gérer les utilisateurs</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Parc de véhicules</CardTitle>
              <CardDescription>Configuration et maintenance des ambulances</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Actifs: <span className="font-semibold">28</span></div>
                <div>Maintenance: <span className="font-semibold">3</span></div>
              </div>
              <Button variant="secondary" className="w-full">Gérer le parc</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rapports et analyses</CardTitle>
              <CardDescription>Statistiques détaillées et KPI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Générez des rapports personnalisés sur les performances.
              </p>
              <Button variant="outline" className="w-full">Voir les rapports</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Configuration système</CardTitle>
              <CardDescription>Paramètres globaux et sécurité</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">
                Configurez les paramètres de l'application et les permissions.
              </p>
              <Button variant="outline" className="w-full">Configurer</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Facturation</CardTitle>
              <CardDescription>Gestion des paiements et factures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>En attente: <span className="font-semibold">12</span></div>
                <div>Payées: <span className="font-semibold">156</span></div>
              </div>
              <Button variant="secondary" className="w-full">Gérer la facturation</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support client</CardTitle>
              <CardDescription>Tickets et demandes d'assistance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>Ouverts: <span className="font-semibold text-orange-600">8</span></div>
                <div>Résolus: <span className="font-semibold text-green-600">94</span></div>
              </div>
              <Button className="w-full">Centre de support</Button>
            </CardContent>
          </Card>
        </div>

        {/* Alertes système */}
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Alertes système</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-red-700">
              <li>• Serveur de sauvegarde: Maintenance programmée dimanche 2h-4h</li>
              <li>• Mise à jour sécuritaire disponible pour les applications mobiles</li>
              <li>• 3 véhicules approchent de leur limite kilométrique</li>
            </ul>
            <div className="mt-4">
              <Button variant="destructive" size="sm">Traiter les alertes</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}