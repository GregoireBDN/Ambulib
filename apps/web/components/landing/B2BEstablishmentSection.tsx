"use client";

import React from "react";
import { Building2, Users, Clock, CheckCircle, Phone, Mail } from "lucide-react";
import { LargeButton } from "@/components/accessible/LargeButton";
import { SeniorCard } from "@/components/accessible/SeniorCard";

/**
 * B2BEstablishmentSection - Section dédiée aux établissements de santé
 * Ciblage : Hôpitaux, cliniques, EHPAD, centres médicaux
 * 
 * Fonctionnalités :
 * - Services spécialisés B2B
 * - Formulaire de contact professionnel
 * - Preuves sociales adaptées
 * - Accessibilité préservée
 */

const B2BEstablishmentSection = () => {
  const [formData, setFormData] = React.useState({
    establishmentName: '',
    establishmentType: '',
    contactName: '',
    email: '',
    phone: '',
    monthlyVolume: '',
    specificNeeds: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulaire B2B établissement:', formData);
    // Ici, implémentation de l'envoi du formulaire
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-6">
            <Building2 className="h-6 w-6 text-blue-600" />
            <span className="text-blue-800 font-semibold">Établissements de santé</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Votre partenaire de confiance
            <span className="block text-blue-600">pour vos patients</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Solutions de transport médical spécialisées pour hôpitaux, cliniques, EHPAD et centres médicaux. 
            Transferts sécurisés et prise en charge professionnelle.
          </p>
        </div>

        {/* Services spécialisés */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <SeniorCard
            title="Transferts inter-hospitaliers"
            description="Transport sécurisé entre établissements"
            size="large"
            icon={Building2}
            priority="high"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Personnel médical qualifié</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Équipement médical complet</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Suivi temps réel</span>
              </div>
            </div>
          </SeniorCard>

          <SeniorCard
            title="Transport programmé"
            description="Planification des sorties patients"
            size="large"
            icon={Clock}
            priority="high"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Programmation flexible</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Retours à domicile</span>
              </div>
              <div className="flex items-center gap-2 text-green-700">
                <CheckCircle className="h-5 w-5" />
                <span>Gestion administrative</span>
              </div>
            </div>
          </SeniorCard>

          <SeniorCard
            title="Urgences 24h/24"
            description="Disponibilité permanente"
            size="large"
            icon={Phone}
            priority="high"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-red-700">
                <CheckCircle className="h-5 w-5" />
                <span>Réactivité immédiate</span>
              </div>
              <div className="flex items-center gap-2 text-red-700">
                <CheckCircle className="h-5 w-5" />
                <span>Équipe d&apos;astreinte</span>
              </div>
              <div className="flex items-center gap-2 text-red-700">
                <CheckCircle className="h-5 w-5" />
                <span>Ligne dédiée</span>
              </div>
            </div>
          </SeniorCard>

          <SeniorCard
            title="Solutions adaptées"
            description="Transport spécialisé patients"
            size="large"
            icon={Users}
            priority="high"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="h-5 w-5" />
                <span>Patients bariatriques</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="h-5 w-5" />
                <span>Pédiatrie spécialisée</span>
              </div>
              <div className="flex items-center gap-2 text-blue-700">
                <CheckCircle className="h-5 w-5" />
                <span>Soins intensifs</span>
              </div>
            </div>
          </SeniorCard>
        </div>

        {/* Section formulaire et contact */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulaire de contact B2B */}
          <SeniorCard
            title="Demandez votre devis personnalisé"
            description="Notre équipe commerciale vous recontacte sous 24h"
            size="large"
            icon={Mail}
            priority="high"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="establishmentName" className="block text-lg font-semibold text-gray-900 mb-2">
                    Nom de l&apos;établissement *
                  </label>
                  <input
                    type="text"
                    id="establishmentName"
                    name="establishmentName"
                    required
                    value={formData.establishmentName}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                    placeholder="CHU, Clinique, EHPAD..."
                  />
                </div>

                <div>
                  <label htmlFor="establishmentType" className="block text-lg font-semibold text-gray-900 mb-2">
                    Type d&apos;établissement *
                  </label>
                  <select
                    id="establishmentType"
                    name="establishmentType"
                    required
                    value={formData.establishmentType}
                    onChange={handleInputChange}
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="hopital">Hôpital public</option>
                    <option value="clinique">Clinique privée</option>
                    <option value="ehpad">EHPAD</option>
                    <option value="centre-medical">Centre médical</option>
                    <option value="laboratoire">Laboratoire</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
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
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                    placeholder="Prénom Nom"
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
                    className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
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
                  className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                  placeholder="contact@etablissement.fr"
                />
              </div>

              <div>
                <label htmlFor="monthlyVolume" className="block text-lg font-semibold text-gray-900 mb-2">
                  Volume mensuel estimé
                </label>
                <select
                  id="monthlyVolume"
                  name="monthlyVolume"
                  value={formData.monthlyVolume}
                  onChange={handleInputChange}
                  className="w-full h-12 px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all"
                >
                  <option value="">Sélectionnez...</option>
                  <option value="1-10">1 à 10 transports</option>
                  <option value="11-50">11 à 50 transports</option>
                  <option value="51-100">51 à 100 transports</option>
                  <option value="100+">Plus de 100 transports</option>
                </select>
              </div>

              <div>
                <label htmlFor="specificNeeds" className="block text-lg font-semibold text-gray-900 mb-2">
                  Besoins spécifiques
                </label>
                <textarea
                  id="specificNeeds"
                  name="specificNeeds"
                  rows={4}
                  value={formData.specificNeeds}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all resize-vertical"
                  placeholder="Décrivez vos besoins particuliers..."
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
                Envoyer ma demande de devis
              </LargeButton>
            </form>
          </SeniorCard>

          {/* Informations de contact et preuves sociales */}
          <div className="space-y-8">
            
            {/* Contact direct */}
            <SeniorCard
              title="Contact commercial direct"
              description="Notre équipe vous accompagne"
              size="large"
              icon={Phone}
              priority="high"
            >
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
                  <h4 className="text-xl font-bold text-blue-900 mb-3">
                    Équipe dédiée établissements
                  </h4>
                  <div className="space-y-3">
                    <a
                      href="tel:+33123456790"
                      className="flex items-center gap-3 text-blue-800 hover:text-blue-900 font-semibold text-lg"
                    >
                      <Phone className="h-6 w-6" />
                      01 23 45 67 90
                    </a>
                    <a
                      href="mailto:commercial@ambulib.fr"
                      className="flex items-center gap-3 text-blue-800 hover:text-blue-900 font-semibold text-lg"
                    >
                      <Mail className="h-6 w-6" />
                      commercial@ambulib.fr
                    </a>
                  </div>
                  <p className="text-blue-700 mt-4">
                    Disponible du lundi au vendredi, 8h-18h
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-xl border-2 border-green-200">
                  <h4 className="text-xl font-bold text-green-900 mb-3">
                    Réactivité garantie
                  </h4>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Réponse sous 2h en journée
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Devis personnalisé sous 24h
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Mise en service sous 48h
                    </li>
                  </ul>
                </div>
              </div>
            </SeniorCard>

            {/* Preuves sociales B2B */}
            <SeniorCard
              title="Nos références"
              description="La confiance de 50+ établissements"
              size="large"
              icon={Building2}
              priority="normal"
            >
              <div className="space-y-6">
                
                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">50+</div>
                    <div className="text-blue-800 font-medium">Établissements partenaires</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">98%</div>
                    <div className="text-green-800 font-medium">Satisfaction client</div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-3">
                  <h5 className="font-semibold text-gray-900">Certifications & Agréments</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Agrément ARS
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      ISO 9001
                    </span>
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                      Certification AMF
                    </span>
                  </div>
                </div>

                {/* Témoignage */}
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <p className="text-gray-700 italic mb-2">
                    &quot;Partenaire fiable depuis 3 ans, réactivité exemplaire pour nos transferts d&apos;urgence.&quot;
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    Dr. Martin, CHU de Lyon
                  </p>
                </div>
              </div>
            </SeniorCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2BEstablishmentSection;