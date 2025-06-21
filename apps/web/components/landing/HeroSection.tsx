import { Button } from "@/components/ui/button";
import { ArrowRight, Truck } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-700 opacity-90"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              La <span className="text-yellow-400">connexion</span> entre{" "}
              <span className="text-yellow-400">ambulances</span> et{" "}
              <span className="text-yellow-400">patients</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-blue-100">
              Ambulib révolutionne le transport médical en connectant
              directement les entreprises d&apos;ambulance avec les personnes
              qui en ont besoin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="cta-warning" size="cta" asChild>
                <Link href="/auth/signup">
                  Commencer maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="cta-outline-white" size="cta" asChild>
                <Link href="/auth/signin">Se connecter</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white">Disponible maintenant</span>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-3">
                    <Truck className="h-6 w-6 text-blue-600" />
                    <span className="font-semibold text-gray-900">
                      Ambulance disponible
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Temps d&apos;arrivée estimé: 8 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
