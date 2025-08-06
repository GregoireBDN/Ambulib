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

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        {/* En-tête avec contraste élevé */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Ambulib Client
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Votre service d'ambulance accessible et sécurisé
          </p>
        </div>

        {/* Bouton d'urgence bien visible */}
        <div className="flex justify-center">
          <EmergencyButton>
            🚨 URGENCE
          </EmergencyButton>
        </div>

        {/* Services principaux */}
        <div className="grid gap-6 md:grid-cols-2">
          <SeniorCard 
            title="Réserver une ambulance"
            description="Planifiez votre transport médical en quelques étapes simples"
          >
            <div className="space-y-4">
              <AccessibleInput
                label="Votre nom complet"
                description="Entrez votre nom et prénom"
                placeholder="Ex: Marie Dupont"
              />
              <LargeButton className="w-full">
                Commencer la réservation
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
              <LargeButton variant="secondary" className="w-full">
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
              <LargeButton variant="outline" className="w-full">
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
              <LargeButton variant="secondary" className="w-full">
                Nous contacter
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