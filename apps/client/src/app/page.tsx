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

  // Show loading state briefly if needed
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
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-foreground">
              Ambulib
            </h1>
            <p className="text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Votre service de transport médical accessible, sécurisé et adapté à vos besoins
            </p>
          </div>
          
          {/* Message de bienvenue avec bénéfices */}
          <div className="bg-muted/50 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Pourquoi choisir Ambulib ?
            </h2>
            <div className="grid gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <p className="text-base">Interface simple et accessible pour les seniors</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <p className="text-base">Réservation en ligne 24h/24 et 7j/7</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <p className="text-base">Personnel qualifié et équipement médical certifié</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                <p className="text-base">Suivi en temps réel de vos rendez-vous</p>
              </div>
            </div>
          </div>
          
          {/* Boutons d'authentification */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <LargeButton onClick={handleSignUp} className="text-lg px-8 py-4 min-h-[60px]">
              Créer mon compte gratuit
            </LargeButton>
            <LargeButton variant="outline" onClick={handleSignIn} className="text-lg px-8 py-4 min-h-[60px]">
              J'ai déjà un compte
            </LargeButton>
          </div>
        </div>

        {/* Bouton d'urgence avec explication */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 text-center space-y-4">
          <h2 className="text-xl font-bold text-red-800">
            Situation d'urgence médicale ?
          </h2>
          <p className="text-base text-red-700 max-w-2xl mx-auto">
            Si vous avez besoin d'un transport médical d'urgence, 
            cliquez sur le bouton ci-dessous pour un accès prioritaire
          </p>
          <div className="flex justify-center">
            <EmergencyButton onClick={handleEmergency}>
              🚨 APPEL D'URGENCE
            </EmergencyButton>
          </div>
          <p className="text-sm text-red-600">
            Pour les urgences vitales, appelez immédiatement le 15 (SAMU)
          </p>
        </div>

        {/* Nos services - Aperçu détaillé */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Nos services de transport médical
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Découvrez tous les services disponibles une fois connecté à votre compte
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <SeniorCard 
              title="Réservation d'ambulance"
              description="Transport médical sécurisé vers vos rendez-vous"
            >
              <div className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Réservation en ligne simplifiée</p>
                  <p>• Choix de la date et de l'heure</p>
                  <p>• Confirmation instantanée</p>
                  <p>• Personnel médical qualifié</p>
                </div>
                <LargeButton className="w-full" onClick={handleSignUp}>
                  Créer un compte pour réserver
                </LargeButton>
              </div>
            </SeniorCard>

            <SeniorCard 
              title="Suivi médical personnalisé"
              description="Accès sécurisé à vos informations de santé"
            >
              <div className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Dossier médical sécurisé</p>
                  <p>• Historique des prescriptions</p>
                  <p>• Notes médicales importantes</p>
                  <p>• Partage avec les professionnels</p>
                </div>
                <LargeButton variant="secondary" className="w-full" onClick={handleSignUp}>
                  Créer un compte pour accéder
                </LargeButton>
              </div>
            </SeniorCard>

            <SeniorCard 
              title="Historique et planification"
              description="Gardez une trace de tous vos trajets"
            >
              <div className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Historique complet des trajets</p>
                  <p>• Prochains rendez-vous</p>
                  <p>• Rappels automatiques</p>
                  <p>• Exportation des données</p>
                </div>
                <LargeButton variant="outline" className="w-full" onClick={handleSignUp}>
                  Créer un compte pour suivre
                </LargeButton>
              </div>
            </SeniorCard>

            <SeniorCard 
              title="Support 24h/24"
              description="Une équipe dédiée à votre service"
            >
              <div className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• Assistance téléphonique 24h/24</p>
                  <p>• Chat en ligne disponible</p>
                  <p>• Aide pour les urgences</p>
                  <p>• Support technique personnalisé</p>
                </div>
                <LargeButton variant="secondary" className="w-full" onClick={handleSignUp}>
                  Créer un compte pour contacter
                </LargeButton>
              </div>
            </SeniorCard>
          </div>
        </div>

        {/* Témoignages clients */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Ce que disent nos clients
            </h2>
            <p className="text-lg text-muted-foreground">
              La confiance de nos utilisateurs est notre priorité
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-2xl text-primary">"</div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Interface très simple à utiliser. Mes rendez-vous médicaux sont maintenant 
                    beaucoup plus faciles à organiser. Le personnel est toujours ponctuel et professionnel.
                  </p>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Marie D., 72 ans</p>
                    <p className="text-sm text-muted-foreground">Cliente depuis 2 ans</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-2xl text-primary">"</div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    Excellent service ! L'application est adaptée aux seniors et le support client 
                    est remarquable. Je recommande vivement Ambulib.
                  </p>
                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">Pierre M., 68 ans</p>
                    <p className="text-sm text-muted-foreground">Client depuis 1 an</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appel à l'action final */}
          <div className="bg-primary/5 rounded-lg p-8 text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">
              Prêt à commencer ?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Rejoignez des milliers de clients satisfaits et simplifiez vos déplacements médicaux dès aujourd'hui.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <LargeButton onClick={handleSignUp} className="text-lg px-8 py-4">
                Créer mon compte maintenant
              </LargeButton>
              <LargeButton variant="outline" onClick={handleSignIn} className="text-lg px-8 py-4">
                J'ai déjà un compte
              </LargeButton>
            </div>
          </div>
        </div>

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