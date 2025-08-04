import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui";
import { CheckCircle, ArrowRight, User, Building } from "lucide-react";
import Link from "next/link";

const AudiencesSection = (): React.JSX.Element => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Une plateforme pour tous
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Que vous soyez un particulier en besoin de transport médical ou une
            entreprise d&apos;ambulance, Ambulib vous simplifie la vie.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Pour les particuliers */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-600">
                Vous avez besoin d&apos;une ambulance ?
              </CardTitle>
              <CardDescription className="text-lg">
                Trouvez rapidement le transport médical le plus proche et le
                plus adapté à vos besoins.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Réservation en quelques clics
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Réservez votre ambulance en ligne, 24h/24 et 7j/7
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Suivi en temps réel
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Suivez votre ambulance et connaissez l&apos;heure
                      d&apos;arrivée exacte
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Transparence des prix
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Connaissez le prix exact avant la réservation
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Service personnalisé
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Choisissez le type d&apos;ambulance adapté à vos besoins
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="primary"
                size="action"
                className="w-full"
                asChild
              >
                <Link href="/auth/signup">
                  Créer un compte
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Pour les entreprises */}
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Building className="h-10 w-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl text-green-600">
                Vous êtes une entreprise d&apos;ambulance ?
              </CardTitle>
              <CardDescription className="text-lg">
                Optimisez votre activité et développez votre clientèle avec
                notre plateforme.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Gestion simplifiée
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Centralisez toutes vos réservations et votre flotte
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Nouveaux clients
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Accédez à une clientèle plus large via notre plateforme
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Optimisation des trajets
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Réduisez vos coûts avec notre algorithme intelligent
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Facturation automatisée
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Gérez vos factures et paiements en toute simplicité
                    </p>
                  </div>
                </div>
              </div>
              <Button
                variant="success"
                size="action"
                className="w-full"
                asChild
              >
                <Link href="/auth/signup">
                  Rejoindre la plateforme
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AudiencesSection;
