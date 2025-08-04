import Image from "next/image";
import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";
import B2BEstablishmentSection from "@/components/landing/B2BEstablishmentSection";
import { LargeButton } from "@/components/accessible/LargeButton";

/**
 * Page dédiée aux établissements de santé
 * Hôpitaux, cliniques, EHPAD, centres médicaux
 */

export default async function EtablissementsPage(): Promise<React.JSX.Element> {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
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

        {/* Hero simple pour établissements */}
        <div className="relative pt-24 pb-12">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-6">
              <Building2 className="h-6 w-6 text-blue-600" />
              <span className="text-blue-800 font-semibold">Établissements de santé</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Partenaire de confiance
              <span className="block text-blue-600">pour vos patients</span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Solutions de transport médical spécialisées pour hôpitaux, cliniques, EHPAD et centres médicaux. 
              Transferts sécurisés et prise en charge professionnelle.
            </p>

            {/* Badges de confiance */}
            <div className="flex flex-wrap gap-3 justify-center">
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 shadow-sm">
                <span className="text-sm font-semibold text-blue-900">50+ établissements partenaires</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-sm">
                <span className="text-sm font-semibold text-green-900">Agrément ARS</span>
              </div>
              <div className="bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-red-200 shadow-sm">
                <span className="text-sm font-semibold text-red-900">Disponible 24h/24</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section principale B2B */}
      <B2BEstablishmentSection />

      {/* Footer simple */}
      <footer className="bg-gray-800 text-white py-12">
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
            Transport médical professionnel pour établissements de santé
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="tel:+33123456790" 
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              Équipe commerciale : 01 23 45 67 90
            </a>
            <span className="text-gray-500">•</span>
            <a 
              href="mailto:commercial@ambulib.fr" 
              className="text-blue-400 hover:text-blue-300 font-semibold"
            >
              commercial@ambulib.fr
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}