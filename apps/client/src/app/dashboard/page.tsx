"use client"

import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  HavRidLogo
} from "@repo/ui"
import ProtectedLayout from "@/components/ProtectedLayout"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err)
    }
  }

  return (
    <ProtectedLayout>
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header avec logo et navigation */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <HavRidLogo size="md" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Votre espace HavRid
              </h1>
              <p className="text-muted-foreground">
                Bienvenue, {user?.firstName || 'Patient'}
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            Se déconnecter
          </Button>
        </div>

        {/* Grille principale du dashboard */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          
          {/* Réservations à venir */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🚑 Réservations à venir
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Aucune réservation prévue
              </p>
              <Button className="w-full">
                Nouvelle réservation
              </Button>
            </CardContent>
          </Card>

          {/* Historique des trajets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📋 Historique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Vos derniers trajets médicaux
              </p>
              <Button variant="outline" className="w-full">
                Voir l'historique
              </Button>
            </CardContent>
          </Card>

          {/* Informations médicales */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🏥 Dossier médical
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Informations de santé sécurisées
              </p>
              <Button variant="outline" className="w-full">
                Gérer le dossier
              </Button>
            </CardContent>
          </Card>

          {/* Support d'urgence */}
          <Card className="md:col-span-2 lg:col-span-3 bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                🚨 Support d'urgence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="text-red-700 mb-2">
                    Besoin d'un transport médical d'urgence ?
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700">
                    Appel d'urgence
                  </Button>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-700">
                    📞 <strong>Support HavRid 24h/7j : 01 23 45 67 89</strong>
                  </p>
                  <p className="text-red-700">
                    🏥 <strong>Urgence vitale : 15 (SAMU)</strong>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Informations du compte */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Informations du compte</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Profil</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Nom : {user?.firstName} {user?.lastName}</p>
                    <p>Email : {user?.email}</p>
                    <p>Téléphone : {user?.phone || 'Non renseigné'}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Actions</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Modifier le profil
                    </Button>
                    <Button variant="outline" size="sm">
                      Changer le mot de passe
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            Interface optimisée pour l'accessibilité - 
            Support disponible 24h/7j au 01 23 45 67 89
          </p>
        </div>

      </main>
    </ProtectedLayout>
  )
}