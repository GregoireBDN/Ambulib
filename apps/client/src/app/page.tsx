"use client"

import { 
  LargeButton, 
  AccessibleInput, 
  EmergencyButton, 
  SeniorCard,
  // Composants shadcn/ui de base
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input
} from "@repo/ui"
import { useAuth } from "@/contexts/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user && !isLoading) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  const handleSignIn = () => {
    router.push("/auth/connexion")
  }

  const handleSignUp = () => {
    router.push("/auth/inscription")
  }

  const handleEmergency = () => {
    // For emergency, allow non-authenticated access
    router.push("/auth/connexion?redirect=emergency")
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* En-tête avec contraste élevé et authentification */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Ambulib Client
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Votre service d'ambulance accessible et sécurisé
          </p>
          
          {/* Boutons d'authentification */}
          <div className="flex justify-center gap-4 mt-6">
            <LargeButton onClick={handleSignIn}>
              Se connecter
            </LargeButton>
            <LargeButton variant="outline" onClick={handleSignUp}>
              Créer un compte
            </LargeButton>
          </div>
        </div>

        {/* Bouton d'urgence bien visible */}
        <div className="flex justify-center">
          <EmergencyButton onClick={handleEmergency}>
            🚨 URGENCE
          </EmergencyButton>
        </div>

        {/* Services principaux - Aperçu pour utilisateurs non connectés */}
        <div className="grid gap-6 md:grid-cols-2">
          <SeniorCard 
            title="Réserver une ambulance"
            description="Planifiez votre transport médical en quelques étapes simples"
          >
            <div className="space-y-4">
              <p className="text-base">
                Connectez-vous pour accéder à votre espace de réservation personnalisé.
              </p>
              <LargeButton className="w-full" onClick={handleSignIn}>
                Se connecter pour réserver
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
              <LargeButton variant="secondary" className="w-full" onClick={handleSignIn}>
                Se connecter pour consulter
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
              <LargeButton variant="outline" className="w-full" onClick={handleSignIn}>
                Se connecter pour voir
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
              <LargeButton variant="secondary" className="w-full" onClick={handleSignIn}>
                Accéder au support
              </LargeButton>
            </div>
          </SeniorCard>
        </div>

        {/* Test composants shadcn/ui de base */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Test des composants shadcn/ui</CardTitle>
            <CardDescription>
              Vérification que les composants de base fonctionnent correctement
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Input placeholder="Entrez votre recherche..." className="flex-1" />
              <Button>Rechercher</Button>
              <Button variant="secondary">Annuler</Button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Petit</Button>
              <Button size="default">Normal</Button>
              <Button size="lg" variant="destructive">Grand</Button>
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
  )
}