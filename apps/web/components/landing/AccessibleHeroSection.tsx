"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Calendar, Shield, ArrowRight, Users, Building2, Truck } from "lucide-react";
import { LargeButton } from "@/components/accessible/LargeButton";
import { EmergencyButton } from "@/components/accessible/EmergencyButton";
import { ClientIcon } from "@/components/accessible/ClientIcon";
import B2BEstablishmentSection from "./B2BEstablishmentSection";
import FleetManagerSection from "./FleetManagerSection";

/**
 * AccessibleHeroSection - Section hero optimisée pour l'accessibilité
 * Spécialement conçue pour les personnes âgées et handicapées
 * 
 * Fonctionnalités d'accessibilité :
 * - Messages clairs et rassurants
 * - Boutons très visibles
 * - Actions principales mises en avant
 * - Support complet lecteurs d'écran
 * - Navigation simplifiée
 */

const AccessibleHeroSection = (): React.JSX.Element => {
  const [activeTarget, setActiveTarget] = React.useState<'particulier' | 'etablissement' | 'gestionnaire'>('particulier');

  const handleEmergencyCall = (): void => {
    window.location.href = "tel:15"; // SAMU
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100 overflow-hidden">


      {/* Contenu principal */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="text-center max-w-5xl mx-auto space-y-12">
          
          {/* Contenu textuel adaptatif */}
          <div className="space-y-8">
            {/* Navigation multi-cibles */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-2 shadow-lg border border-blue-200">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTarget('particulier')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeTarget === 'particulier'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                    aria-pressed={activeTarget === 'particulier'}
                  >
                    <ClientIcon icon={Users} className="h-4 w-4 inline mr-2" />
                    Particulier
                  </button>
                  <button
                    onClick={() => setActiveTarget('etablissement')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeTarget === 'etablissement'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                    aria-pressed={activeTarget === 'etablissement'}
                  >
                    <ClientIcon icon={Building2} className="h-4 w-4 inline mr-2" />
                    Établissement
                  </button>
                  <button
                    onClick={() => setActiveTarget('gestionnaire')}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                      activeTarget === 'gestionnaire'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-blue-600 hover:bg-blue-50'
                    }`}
                    aria-pressed={activeTarget === 'gestionnaire'}
                  >
                    <ClientIcon icon={Truck} className="h-4 w-4 inline mr-2" />
                    Gestionnaire
                  </button>
                </div>
              </div>
            </div>

            {/* Titre principal adaptatif */}
            <div className="space-y-4">
              {activeTarget === 'particulier' && (
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Transport médical
                    <span className="block text-blue-600">
                      en toute sécurité
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                    Ambulib vous accompagne pour vos rendez-vous médicaux avec bienveillance et professionnalisme. 
                    <span className="block mt-2 font-semibold text-blue-800">
                      Service adapté aux personnes âgées et handicapées
                    </span>
                  </p>
                </>
              )}

              {activeTarget === 'etablissement' && (
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Partenaire de confiance
                    <span className="block text-blue-600">
                      pour vos patients
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                    Solutions de transport médical pour hôpitaux, cliniques et établissements de santé. 
                    <span className="block mt-2 font-semibold text-blue-800">
                      Transferts inter-hospitaliers et transport programmé
                    </span>
                  </p>
                </>
              )}

              {activeTarget === 'gestionnaire' && (
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Solutions de
                    <span className="block text-blue-600">
                      sous-traitance
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed max-w-2xl">
                    Partenaire des gestionnaires de flotte médicalisée pour renforcer vos capacités. 
                    <span className="block mt-2 font-semibold text-blue-800">
                      Intégration API et solutions techniques avancées
                    </span>
                  </p>
                </>
              )}
            </div>

            {/* Points de confiance */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <ClientIcon icon={Shield} className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sécurisé</h3>
                <p className="text-gray-600">Personnel qualifié et véhicules adaptés</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-3">
                  <ClientIcon icon={Phone} className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Disponible</h3>
                <p className="text-gray-600">Assistance téléphonique permanente</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-3">
                  <ClientIcon icon={Calendar} className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Simple</h3>
                <p className="text-gray-600">Réservation facile par téléphone ou en ligne</p>
              </div>
            </div>

            {/* Boutons d'action adaptatifs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              {activeTarget === 'particulier' && (
                <>
                  <Link href="/auth/signup">
                    <LargeButton
                      variant="primary"
                      size="xl"
                      priority="high"
                      ariaLabel="Créer un compte pour réserver vos transports"
                      className="w-full sm:w-auto"
                    >
                      <ClientIcon icon={Calendar} className="h-6 w-6" />
                      Réserver un transport
                      <ClientIcon icon={ArrowRight} className="h-6 w-6" />
                    </LargeButton>
                  </Link>
                  <Link href="/auth/signin">
                    <LargeButton
                      variant="secondary"
                      size="xl"
                      ariaLabel="Se connecter à votre compte existant"
                      className="w-full sm:w-auto"
                    >
                      Se connecter
                    </LargeButton>
                  </Link>
                </>
              )}

              {activeTarget === 'etablissement' && (
                <>
                  <Link href="/etablissements">
                    <LargeButton
                      variant="primary"
                      size="xl"
                      priority="high"
                      ariaLabel="Demander un devis pour votre établissement"
                      className="w-full sm:w-auto"
                    >
                      <ClientIcon icon={Building2} className="h-6 w-6" />
                      Demander un devis
                      <ClientIcon icon={ArrowRight} className="h-6 w-6" />
                    </LargeButton>
                  </Link>
                  <a href="tel:+33123456790">
                    <LargeButton
                      variant="secondary"
                      size="xl"
                      ariaLabel="Appeler notre équipe commerciale"
                      className="w-full sm:w-auto"
                    >
                      <ClientIcon icon={Phone} className="h-6 w-6" />
                      Équipe commerciale
                    </LargeButton>
                  </a>
                </>
              )}

              {activeTarget === 'gestionnaire' && (
                <>
                  <Link href="/gestionnaires">
                    <LargeButton
                      variant="primary"
                      size="xl"
                      priority="high"
                      ariaLabel="Découvrir nos solutions de partenariat"
                      className="w-full sm:w-auto"
                    >
                      <ClientIcon icon={Truck} className="h-6 w-6" />
                      Partenariat
                      <ClientIcon icon={ArrowRight} className="h-6 w-6" />
                    </LargeButton>
                  </Link>
                  <a href="tel:+33123456791">
                    <LargeButton
                      variant="secondary"
                      size="xl"
                      ariaLabel="Contacter notre équipe technique"
                      className="w-full sm:w-auto"
                    >
                      <ClientIcon icon={Phone} className="h-6 w-6" />
                      Support technique
                    </LargeButton>
                  </a>
                </>
              )}
            </div>

            {/* Numéro de téléphone principal */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-200 max-w-2xl mx-auto">
              <div className="text-center">
                <p className="text-lg text-gray-700 mb-3">
                  Préférez téléphoner ? Appelez-nous directement :
                </p>
                <a
                  href="tel:+33123456789"
                  className="inline-flex items-center gap-3 text-3xl font-bold text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded-lg px-4 py-2 transition-colors"
                  aria-label="Appeler le 01 23 45 67 89 pour réserver"
                >
                  <ClientIcon icon={Phone} className="h-8 w-8" />
                  01 23 45 67 89
                </a>
                <p className="text-gray-600 mt-2">
                  Nos conseillers vous accompagnent dans votre réservation
                </p>
              </div>
            </div>
          </div>

          {/* Section visuelle centrée */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            
            {/* Ambulance moderne */}
            <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl p-8 shadow-2xl border border-blue-200">
              <div className="relative z-10">
                <Image
                  src="/ambulance-moderne.svg"
                  alt="Ambulance moderne équipée"
                  width={400}
                  height={200}
                  className="w-full h-auto animate-pulse"
                  style={{ animationDuration: '3s' }}
                />
              </div>
              
              {/* Overlay informatif */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent rounded-3xl"></div>
              
              {/* Informations flottantes */}
              <div className="relative z-20 mt-4 text-center">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Flotte moderne et équipée
                </h2>
                <div className="flex justify-center gap-2 text-sm text-blue-700 flex-wrap">
                  <span className="bg-white/80 px-3 py-1 rounded-full">Véhicules neufs</span>
                  <span className="bg-white/80 px-3 py-1 rounded-full">Personnel diplômé</span>
                  <span className="bg-white/80 px-3 py-1 rounded-full">Équipement médical</span>
                </div>
              </div>
            </div>

            {/* Zone d'urgence */}
            <div className="text-center space-y-6">
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-red-900 mb-4">
                  Urgence médicale ?
                </h3>
                <EmergencyButton
                  variant="call"
                  size="giant"
                  onEmergencyAction={handleEmergencyCall}
                  emergencyText="APPELER LE 15"
                  confirmationMessage="Appeler immédiatement les secours (15 - SAMU) ?"
                />
                <p className="mt-4 text-red-800 font-medium">
                  En cas d&apos;urgence vitale immédiate
                </p>
                <p className="text-red-600 text-sm mt-2">
                  Service gratuit disponible 24h/24
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections B2B conditionnelles */}
      {activeTarget === 'etablissement' && <B2BEstablishmentSection />}
      {activeTarget === 'gestionnaire' && <FleetManagerSection />}

      {/* Container pour la suite (uniquement pour particuliers) */}
      {activeTarget === 'particulier' && (
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section de réassurance pour les personnes âgées */}
          <div className="mt-20 text-center">
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-yellow-900 mb-4">
                Spécialement conçu pour vous
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Accompagnement personnalisé</h4>
                  <p className="text-yellow-700">Notre équipe prend le temps de vous expliquer chaque étape</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Accessibilité totale</h4>
                  <p className="text-yellow-700">Véhicules adaptés à tous types de handicaps et mobilité réduite</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Personnel qualifié</h4>
                  <p className="text-yellow-700">Ambulanciers diplômés, formés à l&apos;aide aux personnes âgées</p>
                </div>
                <div>
                  <h4 className="font-semibold text-yellow-800 mb-2">Prise en charge simplifiée</h4>
                  <p className="text-yellow-700">Nous gérons vos remboursements et formalités administratives</p>
                </div>
              </div>
            </div>
          </div>

        {/* Appel à l'action final */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 mb-6">
            Rejoignez plus de 5,000 personnes qui nous font confiance
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <LargeButton
                variant="primary"
                size="large"
                priority="high"
                className="w-full sm:w-auto"
              >
                Commencer maintenant
              </LargeButton>
            </Link>
            <span className="text-gray-500 text-lg">ou</span>
            <a
              href="tel:+33123456789"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1"
            >
              <ClientIcon icon={Phone} className="h-5 w-5" />
              Appelez le 01 23 45 67 89
            </a>
          </div>
        </div>
        </div>
      )}
    </section>
  );
};

export default AccessibleHeroSection;