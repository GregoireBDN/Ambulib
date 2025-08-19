"use client"

import { 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@repo/ui"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { signOutAction } from "@/lib/auth-actions"
import ProtectedLayout from "@/components/ProtectedLayout"

function DashboardContent() {
  const { user } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      console.log('🚪 Déconnexion en cours...')
      await signOutAction()
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error)
    }
  }

  const handleEmergency = () => {
    // TODO: Implement emergency booking
    console.log("Emergency booking requested by:", user?.email)
  }

  const handleBooking = () => {
    router.push("/reservation")
  }

  const handleMedicalInfo = () => {
    router.push("/dossier-medical")
  }

  const handleTrips = () => {
    router.push("/mes-trajets")
  }

  const handleContact = () => {
    router.push("/contact")
  }

  return (
    <div className="min-h-screen">
      {/* Header avec informations utilisateur */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Tableau de bord Ambulib
              </h1>
              <p className="text-base text-muted-foreground">
                Bienvenue, {user?.firstName || user?.email}
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="focus-visible:ring-4 focus-visible:ring-offset-4"
              >
                Se déconnecter
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Bouton d'urgence bien visible */}
          <div className="flex justify-center">
            <Button variant="emergency" onClick={handleEmergency}>
              🚨 APPEL D'URGENCE
            </Button>
          </div>

          {/* Services principaux */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card 
              variant="senior" 
            >
              <CardHeader className="pb-4">
                <CardTitle senior>Réserver une ambulance</CardTitle>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Planifiez votre transport médical en quelques étapes simples
                </p>
              </CardHeader>
              <CardContent senior>
                <div className="space-y-4">
                  <p className="text-base">
                    Réservez votre transport pour vos rendez-vous médicaux.
                  </p>
                  <Button variant="senior" size="2xl" className="w-full" onClick={handleBooking}>
                    Nouvelle réservation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card 
              variant="senior" 
            >
              <CardHeader className="pb-4">
                <CardTitle senior>Mes informations médicales</CardTitle>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Consultez et mettez à jour vos informations médicales
                </p>
              </CardHeader>
              <CardContent senior>
                <div className="space-y-4">
                  <p className="text-base">
                    Accédez à votre dossier médical et vos prescriptions.
                  </p>
                  <Button variant="secondary" size="2xl" className="w-full" onClick={handleMedicalInfo}>
                    Voir mon dossier
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card 
              variant="senior" 
            >
              <CardHeader className="pb-4">
                <CardTitle senior>Mes trajets</CardTitle>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Suivez vos trajets passés et à venir
                </p>
              </CardHeader>
              <CardContent senior>
                <div className="space-y-4">
                  <p className="text-base">
                    Consultez l'historique de vos transports et les prochains rendez-vous.
                  </p>
                  <Button variant="outline" size="2xl" className="w-full" onClick={handleTrips}>
                    Voir mes trajets
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card 
              variant="senior" 
            >
              <CardHeader className="pb-4">
                <CardTitle senior>Aide et contact</CardTitle>
                <p className="text-base text-foreground/80 leading-relaxed">
                  Besoin d'assistance ? Nous sommes là pour vous aider
                </p>
              </CardHeader>
              <CardContent senior>
                <div className="space-y-4">
                  <p className="text-base">
                    Contactez notre équipe disponible 24h/24 et 7j/7.
                  </p>
                  <Button variant="secondary" size="2xl" className="w-full" onClick={handleContact}>
                    Nous contacter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations du compte */}
          <Card>
            <CardHeader>
              <CardTitle>Informations de votre compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground">Email</label>
                  <p className="text-base text-muted-foreground">{user?.email}</p>
                </div>
                {user?.firstName && (
                  <div>
                    <label className="text-sm font-medium text-foreground">Prénom</label>
                    <p className="text-base text-muted-foreground">{user.firstName}</p>
                  </div>
                )}
                {user?.lastName && (
                  <div>
                    <label className="text-sm font-medium text-foreground">Nom</label>
                    <p className="text-base text-muted-foreground">{user.lastName}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Information d'accessibilité */}
          <div className="mt-8 p-4 bg-muted rounded-lg">
            <p className="text-center text-sm text-muted-foreground">
              Cette interface est optimisée pour l'accessibilité. 
              Utilisez Tab pour naviguer, Entrée pour activer les boutons.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedLayout>
      <DashboardContent />
    </ProtectedLayout>
  )
}