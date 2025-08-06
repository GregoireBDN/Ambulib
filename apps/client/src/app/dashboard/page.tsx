"use client"

import { 
  LargeButton, 
  AccessibleInput, 
  EmergencyButton, 
  SeniorCard,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@repo/ui"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import ProtectedRoute from "@/components/ProtectedRoute"

function DashboardContent() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/")
    } catch (error) {
      console.error("Sign-out error:", error)
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
    <div className="min-h-screen bg-background">
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
            <EmergencyButton onClick={handleEmergency}>
              🚨 APPEL D'URGENCE
            </EmergencyButton>
          </div>

          {/* Services principaux */}
          <div className="grid gap-6 md:grid-cols-2">
            <SeniorCard 
              title="Réserver une ambulance"
              description="Planifiez votre transport médical en quelques étapes simples"
            >
              <div className="space-y-4">
                <p className="text-base">
                  Réservez votre transport pour vos rendez-vous médicaux.
                </p>
                <LargeButton className="w-full" onClick={handleBooking}>
                  Nouvelle réservation
                </LargeButton>
              </div>
            </SeniorCard>

            <SeniorCard 
              title="Mes informations médicales"
              description="Consultez et mettez à jour vos informations médicales"
            >
              <div className="space-y-4">
                <p className="text-base">
                  Accédez à votre dossier médical et vos prescriptions.
                </p>
                <LargeButton variant="secondary" className="w-full" onClick={handleMedicalInfo}>
                  Voir mon dossier
                </LargeButton>
              </div>
            </SeniorCard>

            <SeniorCard 
              title="Mes trajets"
              description="Suivez vos trajets passés et à venir"
            >
              <div className="space-y-4">
                <p className="text-base">
                  Consultez l'historique de vos transports et les prochains rendez-vous.
                </p>
                <LargeButton variant="outline" className="w-full" onClick={handleTrips}>
                  Voir mes trajets
                </LargeButton>
              </div>
            </SeniorCard>

            <SeniorCard 
              title="Aide et contact"
              description="Besoin d'assistance ? Nous sommes là pour vous aider"
            >
              <div className="space-y-4">
                <p className="text-base">
                  Contactez notre équipe disponible 24h/24 et 7j/7.
                </p>
                <LargeButton variant="secondary" className="w-full" onClick={handleContact}>
                  Nous contacter
                </LargeButton>
              </div>
            </SeniorCard>
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
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}