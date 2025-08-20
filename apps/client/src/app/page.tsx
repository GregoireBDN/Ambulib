"use client";

import {
  // Composants shadcn/ui de base
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  HavRidLogo,
} from "@repo/ui";
import PublicLayout from "@/components/PublicLayout";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const handleSignIn = () => {
    router.push("/auth/connexion");
  };

  const handleSignUp = () => {
    router.push("/auth/inscription");
  };

  return (
    <PublicLayout>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="space-y-6">
              <HavRidLogo size="xl" className="mx-auto" />
              <h1 className="text-4xl font-bold tracking-tight text-foreground">
                Transport médical sécurisé
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Service de transport médical professionnel adapté aux besoins
                des seniors et personnes à mobilité réduite
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                onClick={handleSignUp}
                className="text-lg px-8 py-4 min-h-[60px]"
              >
                Créer mon compte
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleSignIn}
                className="text-lg px-8 py-4 min-h-[60px]"
              >
                Se connecter
              </Button>
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Nos services de transport médical
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Transport planifié</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Réservation d'ambulance pour vos rendez-vous médicaux avec
                    personnel qualifié.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Transport d'urgence</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Service d'urgence disponible 24h/7j avec équipement médical
                    certifié.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">
                    Accompagnement médical
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Transport avec accompagnement professionnel pour soins
                    spécialisés.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Section Confiance */}
          <div className="bg-muted/30 rounded-lg p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                Pourquoi nous faire confiance ?
              </h2>
              <div className="grid gap-6 md:grid-cols-3 text-center">
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Personnel qualifié
                  </h3>
                  <p className="text-muted-foreground">
                    Équipe médicale certifiée et formée aux urgences
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Disponibilité 24h/7j
                  </h3>
                  <p className="text-muted-foreground">
                    Service client et support technique en continu
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    Équipement certifié
                  </h3>
                  <p className="text-muted-foreground">
                    Véhicules et matériel médical aux normes réglementaires
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer avec informations contact */}
          <div className="border-t pt-8 mt-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Contact & Support
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    📞 Support 24h/7j : <strong>01 23 45 67 89</strong>
                  </p>
                  <p>✉️ Email : contact@havrid.fr</p>
                  <p>
                    🏥 Service médical d'urgence : <strong>15 (SAMU)</strong>
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-4">
                  Informations légales
                </h3>
                <div className="space-y-2 text-muted-foreground text-sm">
                  <p>Service de transport médical agréé</p>
                  <p>Conformité RGPD - Données sécurisées</p>
                  <p>Interface optimisée pour l'accessibilité</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PublicLayout>
  );
}
