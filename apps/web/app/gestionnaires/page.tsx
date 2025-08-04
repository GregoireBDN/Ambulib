import Image from "next/image";
import Link from "next/link";
import { Truck, ArrowLeft } from "lucide-react";
import FleetManagerSection from "@/components/landing/FleetManagerSection";
import { LargeButton } from "@/components/accessible/LargeButton";

/**
 * Page dédiée aux gestionnaires de flotte médicalisée
 * Entreprises type Keolis, Transdev, Carius, réseaux ambulanciers
 */

export default async function GestionnairesPage(): Promise<React.JSX.Element> {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-slate-100">
      {/* Header avec navigation retour */}
      <div className="relative">
        <div className="absolute top-6 left-6 z-10">
          <Image
            src="/logo-ambulib.svg"
            alt="Ambulib - Transport médical de confiance"
            width={180}
            height={54}
            priority
          />
        </div>

        <div className="absolute top-6 right-6 z-10">
          <Link href="/">
            <LargeButton
              variant="outline"
              size="default"
              ariaLabel="Retour à l'accueil"
            >
              <ArrowLeft className="h-5 w-5" />
              Accueil
            </LargeButton>
          </Link>
        </div>

        {/* Hero simple pour gestionnaires */}
        <div className="relative pt-24 pb-12">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-full mb-6">
              <Truck className="h-6 w-6 text-slate-600" />
              <span className="text-slate-800 font-semibold">Gestionnaires de flotte</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Solutions de partenariat
              <span className="block text-slate-600">pour gestionnaires</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Renforcez vos capacités avec notre réseau. Solutions de sous-traitance, 
              couverture géographique et intégration technique pour les professionnels du transport sanitaire.
            </p>

            {/* Badges de confiance techniques */}
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <span className="text-sm font-semibold text-slate-900">15 partenaires actifs</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 shadow-sm">
                <span className="text-sm font-semibold text-blue-900">API 99.9% uptime</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-sm">
                <span className="text-sm font-semibold text-green-900">Support 24h/24</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section principale gestionnaires */}
      <FleetManagerSection />

      {/* Section technique additionnelle */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Documentation technique</h2>
            <p className="text-slate-300 text-lg">
              Ressources pour développeurs et équipes techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">API REST v2.0</h3>
              <p className="text-slate-300 mb-4">
                Documentation complète de notre API avec exemples de code
              </p>
              <LargeButton variant="outline" size="default" className="w-full">
                Consulter la doc API
              </LargeButton>
            </div>

            <div className="bg-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Webhooks & Events</h3>
              <p className="text-slate-300 mb-4">
                Notifications temps réel pour intégration système
              </p>
              <LargeButton variant="outline" size="default" className="w-full">
                Guide webhooks
              </LargeButton>
            </div>

            <div className="bg-slate-700 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3">Environnement de test</h3>
              <p className="text-slate-300 mb-4">
                Sandbox complet pour tester vos intégrations
              </p>
              <LargeButton variant="outline" size="default" className="w-full">
                Accéder au sandbox
              </LargeButton>
            </div>
          </div>
        </div>
      </section>

      {/* Footer technique */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <Image
              src="/logo-ambulib.svg"
              alt="Ambulib"
              width={160}
              height={48}
              className="mx-auto filter brightness-0 invert"
            />
          </div>
          <p className="text-gray-300 mb-4">
            Solutions techniques pour gestionnaires de flotte médicalisée
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Support technique</h4>
              <a 
                href="tel:+33123456791" 
                className="text-gray-300 hover:text-white"
              >
                01 23 45 67 91
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Partenariats</h4>
              <a 
                href="mailto:partenaires@ambulib.fr" 
                className="text-gray-300 hover:text-white"
              >
                partenaires@ambulib.fr
              </a>
            </div>
            <div>
              <h4 className="font-semibold text-blue-400 mb-2">Documentation</h4>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white"
              >
                docs.ambulib.fr
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}