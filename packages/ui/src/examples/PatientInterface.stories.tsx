import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

const meta: Meta = {
  title: 'Examples/Patient Interface',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Exemples d\'interfaces optimisées pour les patients seniors et personnes à mobilité réduite. Focus sur la simplicité, l\'accessibilité et la lisibilité.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const PatientDashboard: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16 bg-primary-100">
                <AvatarFallback className="text-2xl">👴</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-primary-700">Bonjour Marie</h1>
                <p className="text-lg text-muted-foreground">Comment allez-vous aujourd'hui ?</p>
              </div>
            </div>
            <Button size="lg" className="bg-error-600 hover:bg-error-700 text-xl px-8 py-4">
              🚨 URGENCE
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">🚑</span>
              </div>
              <h2 className="text-2xl font-bold text-primary-700">Réserver un Transport</h2>
              <p className="text-lg text-muted-foreground">
                Pour vos rendez-vous médicaux et sorties importantes
              </p>
              <Button size="lg" className="w-full text-xl py-4">
                Nouvelle Réservation
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-8 text-center space-y-4">
              <div className="w-20 h-20 bg-success-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl">📅</span>
              </div>
              <h2 className="text-2xl font-bold text-success-700">Mes Rendez-vous</h2>
              <p className="text-lg text-muted-foreground">
                Consultez vos prochains transports programmés
              </p>
              <Button size="lg" variant="outline" className="w-full text-xl py-4">
                Voir le Planning
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Next Appointment */}
        <Card className="border-primary-200 bg-primary-50">
          <CardHeader>
            <CardTitle className="text-2xl text-primary-700 flex items-center gap-3">
              <span className="text-3xl">🕐</span>
              Prochain Transport
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <Label className="text-lg font-semibold">Date et Heure</Label>
                  <p className="text-xl text-primary-700">Demain, 14h30</p>
                </div>
                <div>
                  <Label className="text-lg font-semibold">Destination</Label>
                  <p className="text-lg">Hôpital Saint-Louis</p>
                  <p className="text-base text-muted-foreground">1 Avenue Claude Vellefaux, Paris</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-lg font-semibold">Type de Rendez-vous</Label>
                  <p className="text-lg">Consultation Cardiologie</p>
                </div>
                <div>
                  <Label className="text-lg font-semibold">Statut</Label>
                  <Badge className="bg-success-600 text-white text-lg px-4 py-1">
                    Confirmé
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button size="lg" className="text-lg px-6">
                Modifier le Transport
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-6">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-neutral-700">Historique Récent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: '15 Nov 2024', destination: 'Cabinet Dr. Martin', status: 'Terminé' },
                { date: '10 Nov 2024', destination: 'Laboratoire Central', status: 'Terminé' },
                { date: '08 Nov 2024', destination: 'Hôpital Saint-Louis', status: 'Terminé' },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center">
                      <span className="text-xl">🏥</span>
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{item.destination}</p>
                      <p className="text-base text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-base">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}

export const BookingForm: Story = {
  render: () => (
    <div className="min-h-screen bg-neutral-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl text-primary-700">
              🚑 Réserver un Transport
            </CardTitle>
            <CardDescription className="text-xl">
              Remplissez ce formulaire simple pour réserver votre ambulance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="grid gap-6">
              <div className="space-y-3">
                <Label className="text-xl font-semibold">1. Pour qui réservez-vous ?</Label>
                <Input
                  placeholder="Votre nom complet"
                  className="text-xl py-4"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-xl font-semibold">2. Votre adresse de départ</Label>
                <Input
                  placeholder="15 Avenue de la République, Paris"
                  className="text-xl py-4"
                />
                <p className="text-base text-muted-foreground">
                  D'où l'ambulance doit venir vous chercher
                </p>
              </div>

              <div className="space-y-3">
                <Label className="text-xl font-semibold">3. Où allez-vous ?</Label>
                <Input
                  placeholder="Hôpital Saint-Louis, Paris"
                  className="text-xl py-4"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-xl font-semibold">4. Quel jour ?</Label>
                  <Input
                    type="date"
                    className="text-xl py-4"
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-xl font-semibold">5. À quelle heure ?</Label>
                  <Input
                    type="time"
                    className="text-xl py-4"
                    defaultValue="14:00"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xl font-semibold">6. Pourquoi avez-vous besoin de l'ambulance ?</Label>
                <select className="w-full px-4 py-4 text-xl border border-input rounded-md bg-background">
                  <option value="">Choisissez dans la liste</option>
                  <option value="medecin">Aller chez mon médecin</option>
                  <option value="hopital">Aller à l'hôpital</option>
                  <option value="analyses">Faire des analyses</option>
                  <option value="specialiste">Voir un spécialiste</option>
                </select>
              </div>

              <div className="space-y-3">
                <Label className="text-xl font-semibold">7. Votre numéro de téléphone</Label>
                <Input
                  type="tel"
                  placeholder="06 12 34 56 78"
                  className="text-xl py-4 font-mono"
                />
                <p className="text-base text-muted-foreground">
                  Pour que l'ambulance puisse vous contacter
                </p>
              </div>
            </div>

            <div className="bg-primary-50 border-2 border-primary-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-primary-700 mb-3">
                💡 Nous nous occupons de tout !
              </h3>
              <p className="text-lg text-primary-600">
                L'ambulance viendra vous chercher à l'heure convenue et vous ramènera chez vous après votre rendez-vous.
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" size="lg" className="flex-1 text-xl py-4">
                Annuler
              </Button>
              <Button size="lg" className="flex-1 text-xl py-4">
                ✓ Réserver mon Transport
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}

export const EmergencyInterface: Story = {
  render: () => (
    <div className="min-h-screen bg-error-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="border-error-200">
          <CardHeader className="text-center bg-error-100">
            <CardTitle className="text-4xl text-error-700 animate-pulse">
              🚨 URGENCE MÉDICALE
            </CardTitle>
            <CardDescription className="text-2xl text-error-600">
              Appelez immédiatement une ambulance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="text-center space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-error-600 hover:bg-error-700 text-3xl py-8 animate-pulse"
              >
                📞 APPELER MAINTENANT
              </Button>
              <p className="text-xl text-error-600">
                Numéro gratuit 24h/24 : <strong>15</strong>
              </p>
            </div>

            <div className="border-t-2 border-error-200 pt-6">
              <h3 className="text-2xl font-bold text-error-700 mb-4">
                Informations importantes à communiquer :
              </h3>
              <div className="space-y-4 text-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="font-semibold">Votre adresse exacte</p>
                    <p className="text-muted-foreground">Étage, code d'accès, etc.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">👤</span>
                  <div>
                    <p className="font-semibold">Nom et âge du patient</p>
                    <p className="text-muted-foreground">Pour préparer l'intervention</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💊</span>
                  <div>
                    <p className="font-semibold">Symptômes observés</p>
                    <p className="text-muted-foreground">Douleur, localisation, depuis quand</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-warning-50 border-2 border-warning-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-warning-700 mb-3">
                ⏱️ En attendant l'ambulance :
              </h3>
              <ul className="space-y-2 text-lg text-warning-700">
                <li>• Restez calme et près du patient</li>
                <li>• Ne donnez rien à boire ou à manger</li>
                <li>• Préparez les papiers d'identité</li>
                <li>• Laissez la porte ouverte si possible</li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-xl font-bold text-error-600">
                Temps d'arrivée estimé : 4-6 minutes
              </p>
              <p className="text-lg text-muted-foreground">
                Une ambulance est en route vers votre position
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
}