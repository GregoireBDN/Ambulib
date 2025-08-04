"use client";

import React from "react";
import { Truck, Settings, BarChart3, Zap, CheckCircle, Phone, Mail, Code, Clock } from "lucide-react";
import { LargeButton } from "@/components/accessible/LargeButton";
import { SeniorCard } from "@/components/accessible/SeniorCard";

/**
 * FleetManagerSection - Section dédiée aux gestionnaires de flotte médicalisée
 * Ciblage : Entreprises type Keolis, Transdev, Carius, réseaux ambulanciers
 * 
 * Fonctionnalités :
 * - Solutions de sous-traitance et partenariat
 * - Intégration technique et API
 * - Formulaire B2B spécialisé
 * - Preuves sociales sectorielles
 */

const FleetManagerSection = (): React.JSX.Element => {
  const [formData, setFormData] = React.useState({
    companyName: '',
    fleetSize: '',
    geographicZones: '',
    contactName: '',
    email: '',
    phone: '',
    partnershipType: '',
    technicalNeeds: '',
    currentVolume: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire B2B gestionnaire:', formData);
    // Ici, implémentation de l'envoi du formulaire
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-slate-100 px-6 py-3 rounded-full mb-6">
            <Truck className="h-6 w-6 text-slate-600" />
            <span className="text-slate-800 font-semibold">Gestionnaires de flotte</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Solutions de partenariat
            <span className="block text-slate-600">pour gestionnaires</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Renforcez vos capacités avec notre réseau. Solutions de sous-traitance, 
            couverture géographique et intégration technique pour les professionnels du transport sanitaire.
          </p>
        </div>

        {/* Solutions de partenariat */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <SeniorCard
            title="Sous-traitance ponctuelle"
            description="Renfort lors de pics d'activité"
            size="large"
            icon={Zap}
            priority="high"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-orange-700">
                <CheckCircle className="h-5 w-5" />
                <span>Débordements & urgences</span>
              </div>
              <div className="flex items-center gap-2 text-orange-700">
                <CheckCircle className="h-5 w-5" />
                <span>Congés & formations</span>
              </div>
              <div className="flex items-center gap-2 text-orange-700">
                <CheckCircle className="h-5 w-5" />
                <span>Maintenance véhicules</span>
              </div>
            </div>
          </SeniorCard>

          <SeniorCard
            title="Couverture géographique"
            description="Extension de zones d'activité"
            size="large"
            icon={BarChart3}
            priority="high"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="h-5 w-5" />
                <span>Zones non couvertes</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="h-5 w-5" />
                <span>Expansion territoriale</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="h-5 w-5" />
                <span>Maillage complémentaire</span>
              </div>
            </div>
          </SeniorCard>

          <SeniorCard
            title="Services spécialisés"
            description="Transport technique avancé"
            size="large"
            icon={Settings}
            priority="high"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-purple-700">
                <CheckCircle className="h-5 w-5" />
                <span>Transport bariatrique</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <CheckCircle className="h-5 w-5" />
                <span>Néonatal & pédiatrie</span>
              </div>
              <div className="flex items-center gap-2 text-purple-700">
                <CheckCircle className="h-5 w-5" />
                <span>SMUR & réanimation</span>
              </div>
            </div>
          </SeniorCard>

          <SeniorCard
            title="Intégration technique"
            description="Solutions API et connectivité"
            size="large"
            icon={Code}
            priority="high"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>API REST complète</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Webhook temps réel</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Reporting automatisé</span>
              </div>
            </div>
          </SeniorCard>
        </div>

        {/* Section technique détaillée */}
        <div className="mb-16">
          <SeniorCard
            title="Capacités techniques et opérationnelles"
            description="Infrastructure et performance de notre réseau"
            size="large"
            icon={Settings}
            priority="high"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Performance opérationnelle */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Clock className="h-6 w-6 text-blue-600" />
                  Performance
                </h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">99.2%</div>
                    <div className="text-blue-800">Taux de disponibilité</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">&lt; 15min</div>
                    <div className="text-green-800">Délai d&apos;intervention</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">24/7</div>
                    <div className="text-purple-800">Support technique</div>
                  </div>
                </div>
              </div>

              {/* Capacité technique */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Code className="h-6 w-6 text-green-600" />
                  Technique
                </h4>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>API REST v2.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Webhooks temps réel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>SSO / SAML 2.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Géolocalisation GPS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Reporting BI intégré</span>
                  </div>
                </div>
              </div>

              {/* Couverture réseau */}
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Truck className="h-6 w-6 text-orange-600" />
                  Réseau
                </h4>
                <div className="space-y-3">
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">85</div>
                    <div className="text-orange-800">Départements couverts</div>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">200+</div>
                    <div className="text-red-800">Véhicules disponibles</div>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-lg borders">
                    <div className="text-2xl font-bold text-slate-600">15</div>
                    <div className="text-slate-800">Partenaires actifs</div>
                  </div>
                </div>
              </div>
            </div>
          </SeniorCard>
        </div>

        {/* Section formulaire et contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulaire de partenariat */}
          <SeniorCard
            title="Demande de partenariat"
            description="Notre équipe technique vous recontacte sous 24h"
            size="large"
            icon={Mail}
            priority="high"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-lg font-semibold text-gray-900 mb-2">
                    Nom de l&apos;entreprise *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all"
                    placeholder="Keolis, Transdev, Carius..."
                  />
                </div>

                <div>
                  <label htmlFor="fleetSize" className="block text-lg font-semibold text-gray-900 mb-2">
                    Taille de flotte *
                  </label>
                  <select
                    id="fleetSize"
                    name="fleetSize"
                    required
                    value={formData.fleetSize}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="1-10">1 à 10 véhicules</option>
                    <option value="11-50">11 à 50 véhicules</option>
                    <option value="51-200">51 à 200 véhicules</option>
                    <option value="200+">Plus de 200 véhicules</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="geographicZones" className="block text-lg font-semibold text-gray-900 mb-2">
                  Zones géographiques d&apos;activité *
                </label>
                <input
                  type="text"
                  id="geographicZones"
                  name="geographicZones"
                  required
                  value={formData.geographicZones}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all"
                  placeholder="Île-de-France, Auvergne-Rhône-Alpes..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-lg font-semibold text-gray-900 mb-2">
                    Nom du contact *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all"
                    placeholder="Directeur technique / DG"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-lg font-semibold text-gray-900 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all"
                    placeholder="01 23 45 67 89"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-2">
                  Email professionnel *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all"
                  placeholder="directeur@gestionnaire.fr"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="partnershipType" className="block text-lg font-semibold text-gray-900 mb-2">
                    Type de collaboration
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    value={formData.partnershipType}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="sous-traitance">Sous-traitance ponctuelle</option>
                    <option value="partenariat">Partenariat géographique</option>
                    <option value="integration">Intégration technique</option>
                    <option value="specialise">Services spécialisés</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="currentVolume" className="block text-lg font-semibold text-gray-900 mb-2">
                    Volume mensuel actuel
                  </label>
                  <select
                    id="currentVolume"
                    name="currentVolume"
                    value={formData.currentVolume}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="100-500">100 à 500 transports</option>
                    <option value="500-2000">500 à 2000 transports</option>
                    <option value="2000-5000">2000 à 5000 transports</option>
                    <option value="5000+">Plus de 5000 transports</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="technicalNeeds" className="block text-lg font-semibold text-gray-900 mb-2">
                  Besoins techniques spécifiques
                </label>
                <textarea
                  id="technicalNeeds"
                  name="technicalNeeds"
                  rows={4}
                  value={formData.technicalNeeds}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-slate-500 focus:ring-4 focus:ring-slate-500/20 transition-all resize-vertical"
                  placeholder="API, intégration système, reporting spécifique..."
                />
              </div>

              <LargeButton
                type="submit"
                variant="primary"
                size="large"
                className="w-full"
                priority="high"
              >
                <Mail className="h-6 w-6" />
                Envoyer ma demande de partenariat
              </LargeButton>
            </form>
          </SeniorCard>

          {/* Contact technique et commercial */}
          <div className="space-y-8">
            
            {/* Contact technique */}
            <SeniorCard
              title="Support technique & intégration"
              description="Équipe spécialisée gestionnaires"
              size="large"
              icon={Code}
              priority="high"
            >
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border-2 border-slate-200">
                  <h4 className="text-xl font-bold text-slate-900 mb-3">
                    Équipe technique dédiée
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="tel:+33123456791"
                      className="flex items-center gap-3 text-slate-800 hover:text-slate-900 font-semibold text-lg"
                    >
                      <Phone className="h-6 w-6" />
                      01 23 45 67 91
                    </a>
                    <a
                      href="mailto:partenaires@ambulib.fr"
                      className="flex items-center gap-3 text-slate-800 hover:text-slate-900 font-semibold text-lg"
                    >
                      <Mail className="h-6 w-6" />
                      partenaires@ambulib.fr
                    </a>
                  </div>
                  <p className="text-slate-700 mt-4">
                    Support technique 24h/24 pour les partenaires
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h4 className="text-xl font-bold text-green-900 mb-3">
                    Documentation & API
                  </h4>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Documentation API complète
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Environnement de test
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Formation technique incluse
                    </li>
                  </ul>
                  <LargeButton
                    variant="outline"
                    size="default"
                    className="mt-4 w-full"
                  >
                    <Code className="h-5 w-5" />
                    Accéder à la documentation
                  </LargeButton>
                </div>
              </div>
            </SeniorCard>

            {/* Références partenaires */}
            <SeniorCard
              title="Nos partenaires actuels"
              description="Gestionnaires qui nous font confiance"
              size="large"
              icon={Truck}
              priority="normal"
            >
              <div className="space-y-6">
                
                {/* Statistiques partenaires */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-slate-50 rounded-lg">
                    <div className="text-3xl font-bold text-slate-600">15</div>
                    <div className="text-slate-800 font-medium">Partenaires actifs</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">99.9%</div>
                    <div className="text-blue-800 font-medium">Uptime API</div>
                  </div>
                </div>

                {/* Types de partenaires */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-900">Types de partenaires</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-sm font-medium">
                      Réseaux nationaux
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Ambulanciers indépendants
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Groupements régionaux
                    </span>
                  </div>
                </div>

                {/* Témoignage secteur */}
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-slate-500">
                  <p className="text-gray-700 italic mb-2">
                    &quot;Intégration API parfaite, support réactif. Partenaire technique fiable depuis 2 ans.&quot;
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    Directeur IT, Réseau Ambulances Sud-Est
                  </p>
                </div>

                {/* Capacités réseau */}
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h5 className="font-semibold text-orange-900 mb-2">Capacités réseau partagées</h5>
                  <div className="text-sm text-orange-800 space-y-1">
                    <div>• 200+ véhicules disponibles via réseau</div>
                    <div>• Couverture 85 départements français</div>
                    <div>• Mutualisation des spécialisations techniques</div>
                  </div>
                </div>
              </div>
            </SeniorCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FleetManagerSection;