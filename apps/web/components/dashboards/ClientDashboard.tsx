"use client";

import React from "react";
import { Role } from "@/lib/type";
import { Phone, Calendar, User, FileText, Clock, MapPin } from "lucide-react";
import { SeniorCard } from "@/components/accessible/SeniorCard";
import { LargeButton } from "@/components/accessible/LargeButton";
import { EmergencyButton } from "@/components/accessible/EmergencyButton";
import { ClientIcon } from "@/components/accessible/ClientIcon";

/**
 * ClientDashboard - Dashboard ultra-simplifié pour les clients
 * Spécialement conçu pour les personnes âgées et handicapées
 * 
 * Fonctionnalités :
 * - Interface épurée avec actions essentielles
 * - Bouton d'urgence très visible
 * - Grandes cartes avec informations claires
 * - Navigation intuitive
 * - Statuts visuels évidents
 */

interface ClientDashboardProps {
  userRole: Role.USER;
  userName?: string;
}

// Données simulées - à remplacer par de vraies données
const mockData = {
  nextBooking: {
    date: "15 janvier 2025",
    time: "14:30",
    destination: "Hôpital Saint-Louis",
    type: "Rendez-vous médical"
  },
  recentBookings: [
    {
      id: "1",
      date: "10 janvier 2025",
      destination: "Centre de kinésithérapie",
      status: "completed"
    },
    {
      id: "2", 
      date: "8 janvier 2025",
      destination: "Clinique du Parc",
      status: "completed"
    }
  ],
  emergencyContacts: [
    { name: "Marie Dupont (Fille)", phone: "06 12 34 56 78" },
    { name: "Médecin traitant", phone: "01 23 45 67 89" }
  ]
};

const ClientDashboard = ({ userName = "Utilisateur" }: ClientDashboardProps) => {
  const handleEmergencyCall = () => {
    // Logique d'appel d'urgence
    window.location.href = "tel:15"; // SAMU
  };

  const handleNewBooking = () => {
    // Navigation vers formulaire de réservation
    console.log("Nouvelle réservation");
  };

  const handleViewBookings = () => {
    // Navigation vers historique
    console.log("Voir mes réservations");
  };

  const handleManageProfile = () => {
    // Navigation vers profil
    console.log("Gérer mon profil");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec bouton d'urgence */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Bonjour {userName}
            </h1>
            <p className="text-xl text-gray-600">
              Gérez vos transports en toute simplicité
            </p>
          </div>
          
          {/* Bouton d'urgence toujours visible */}
          <div className="flex flex-col items-center gap-2">
            <EmergencyButton
              variant="call"
              size="xl"
              onEmergencyAction={handleEmergencyCall}
              emergencyText="URGENCE"
              confirmationMessage="Appeler le 15 (SAMU) immédiatement ?"
            />
            <p className="text-sm text-gray-600 text-center max-w-32">
              En cas d&apos;urgence médicale
            </p>
          </div>
        </div>

        {/* Grille des cartes principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Prochain rendez-vous */}
          <SeniorCard
            title="Votre prochain transport"
            priority="high"
            size="large"
            icon={Calendar}
            interactive
            onAction={handleViewBookings}
            actionLabel="Voir les détails du prochain transport"
          >
            {mockData.nextBooking ? (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <ClientIcon icon={Clock} className="h-6 w-6 text-blue-600" />
                    <span className="text-xl font-semibold text-blue-900">
                      {mockData.nextBooking.date} à {mockData.nextBooking.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mb-2">
                    <ClientIcon icon={MapPin} className="h-5 w-5 text-blue-600" />
                    <span className="text-lg text-blue-800">
                      {mockData.nextBooking.destination}
                    </span>
                  </div>
                  <p className="text-blue-700 ml-8">
                    {mockData.nextBooking.type}
                  </p>
                </div>
                <p className="text-center text-gray-600">
                  Cliquez pour voir tous les détails
                </p>
              </div>
            ) : (
              <div className="text-center py-8">
                <ClientIcon icon={Calendar} className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-xl text-gray-500 mb-4">
                  Aucun transport prévu
                </p>
                <LargeButton
                  variant="primary"
                  size="large"
                  onClick={handleNewBooking}
                >
                  Réserver maintenant
                </LargeButton>
              </div>
            )}
          </SeniorCard>

          {/* Actions rapides */}
          <SeniorCard
            title="Actions rapides"
            description="Vos actions les plus fréquentes"
            size="large"
            icon={Phone}
          >
            <div className="space-y-4">
              <LargeButton
                variant="primary"
                size="large"
                className="w-full justify-start"
                onClick={handleNewBooking}
              >
                <ClientIcon icon={Calendar} className="h-6 w-6" />
                Réserver un transport
              </LargeButton>
              
              <LargeButton
                variant="secondary"
                size="large"
                className="w-full justify-start"
                onClick={handleViewBookings}
              >
                <ClientIcon icon={FileText} className="h-6 w-6" />
                Voir mes réservations
              </LargeButton>
              
              <LargeButton
                variant="outline"
                size="large" 
                className="w-full justify-start"
                onClick={handleManageProfile}
              >
                <ClientIcon icon={User} className="h-6 w-6" />
                Mon profil
              </LargeButton>
            </div>
          </SeniorCard>
        </div>

        {/* Informations importantes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Historique récent */}
          <SeniorCard
            title="Vos derniers transports"
            size="large"
            icon={Clock}
            interactive
            onAction={handleViewBookings}
            actionLabel="Voir l'historique complet"
          >
            <div className="space-y-3">
              {mockData.recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{booking.date}</p>
                    <p className="text-gray-600">{booking.destination}</p>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Terminé
                  </div>
                </div>
              ))}
              <p className="text-center text-gray-500 mt-4">
                Cliquez pour voir plus d&apos;historique
              </p>
            </div>
          </SeniorCard>

          {/* Contacts d'urgence */}
          <SeniorCard
            title="Vos contacts d'urgence"
            description="Personnes à contacter si nécessaire"
            size="large"
            icon={Phone}
          >
            <div className="space-y-4">
              {mockData.emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">{contact.name}</p>
                    <p className="text-blue-700">{contact.phone}</p>
                  </div>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    aria-label={`Appeler ${contact.name}`}
                  >
                    <ClientIcon icon={Phone} className="h-6 w-6" />
                  </a>
                </div>
              ))}
            </div>
          </SeniorCard>
        </div>

        {/* Aide et support */}
        <div className="mt-12 text-center">
          <SeniorCard
            title="Besoin d'aide ?"
            description="Notre équipe est là pour vous accompagner"
            size="large"
            priority="normal"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="tel:+33123456789"
                className="flex items-center justify-center gap-3 p-4 bg-green-50 hover:bg-green-100 rounded-lg border-2 border-green-200 transition-colors focus:outline-none focus:ring-4 focus:ring-green-500/50"
              >
                <ClientIcon icon={Phone} className="h-6 w-6 text-green-600" />
                <span className="text-lg font-semibold text-green-800">
                  01 23 45 67 89
                </span>
              </a>
              
              <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
                <ClientIcon icon={Clock} className="h-6 w-6 text-blue-600" />
                <span className="text-lg text-blue-800">
                  7j/7 - 24h/24
                </span>
              </div>
            </div>
          </SeniorCard>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;