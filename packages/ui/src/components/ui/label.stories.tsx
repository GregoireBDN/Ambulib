import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Label } from './label'
import { Input } from './input'
import { Badge } from './badge'

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Étiquette accessible pour formulaires et interfaces médicales, optimisée pour la clarté et l\'accessibilité.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
      description: 'ID de l\'élément associé au label',
    },
    className: {
      control: 'text',
      description: 'Classes CSS additionnelles',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Nom du patient',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label {...args} />
      <Input placeholder="Entrez le nom du patient" />
    </div>
  ),
}

export const MedicalFormLabels: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">🏥 Formulaire Médical</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="patient-name" className="text-foreground font-medium">
            Nom complet du patient *
          </Label>
          <Input 
            id="patient-name" 
            placeholder="Marie Dupont"
            aria-describedby="patient-name-desc"
          />
          <p id="patient-name-desc" className="text-xs text-muted-foreground">
            Nom et prénom tels qu'ils apparaissent sur la carte vitale
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="birth-date" className="text-foreground font-medium">
            Date de naissance *
          </Label>
          <Input 
            id="birth-date" 
            type="date"
            aria-describedby="birth-date-desc"
          />
          <p id="birth-date-desc" className="text-xs text-muted-foreground">
            Nécessaire pour vérifier l'identité et calculer l'âge
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="social-security" className="text-foreground font-medium flex items-center gap-2">
            Numéro de sécurité sociale *
            <Badge variant="outline" className="text-xs">
              Confidentiel
            </Badge>
          </Label>
          <Input 
            id="social-security" 
            placeholder="2 85 03 75 123 456 78"
            className="font-mono"
            aria-describedby="social-security-desc"
          />
          <p id="social-security-desc" className="text-xs text-muted-foreground">
            Format : 13 chiffres + 2 chiffres de clé de contrôle
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="allergies" className="text-error-700 font-medium flex items-center gap-2">
            🚨 Allergies connues
            <Badge className="bg-error-700 text-white text-xs">
              CRITIQUE
            </Badge>
          </Label>
          <Input 
            id="allergies" 
            placeholder="Pénicilline, Latex, Aspirine..."
            aria-describedby="allergies-desc"
          />
          <p id="allergies-desc" className="text-xs text-error-600">
            Information vitale pour la sécurité du patient - Soyez précis
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="medications" className="text-warning-700 font-medium">
            💊 Médicaments actuels
          </Label>
          <Input 
            id="medications" 
            placeholder="Doliprane 500mg 3x/jour, Kardégic 75mg..."
            aria-describedby="medications-desc"
          />
          <p id="medications-desc" className="text-xs text-warning-600">
            Incluez tous les traitements en cours, même occasionnels
          </p>
        </div>
      </div>
    </div>
  ),
}

export const EmergencyLabels: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-lg">
      <h3 className="text-lg font-semibold mb-4 text-error-700">🚨 Formulaire d'Urgence</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="emergency-location" className="text-error-700 font-semibold text-lg">
            📍 Localisation exacte *
          </Label>
          <Input 
            id="emergency-location" 
            placeholder="15 Avenue de la République, 75011 Paris - Apt 3A"
            className="border-error-300 focus:border-error-500 text-lg py-3"
            aria-describedby="emergency-location-desc"
          />
          <p id="emergency-location-desc" className="text-sm text-error-600">
            Soyez le plus précis possible : étage, code d'accès, point de repère
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergency-symptoms" className="text-error-700 font-semibold">
            🩺 Symptômes observés *
          </Label>
          <textarea 
            id="emergency-symptoms" 
            placeholder="Douleur thoracique, difficulté à respirer depuis 10 minutes..."
            className="w-full px-3 py-2 border border-error-300 rounded-md focus:border-error-500 min-h-[100px]"
            aria-describedby="emergency-symptoms-desc"
          />
          <p id="emergency-symptoms-desc" className="text-sm text-error-600">
            Décrivez précisément : localisation, intensité, durée des symptômes
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="emergency-contact" className="text-error-700 font-semibold">
            📞 Contact direct *
          </Label>
          <Input 
            id="emergency-contact" 
            type="tel"
            placeholder="06 12 34 56 78"
            className="border-error-300 focus:border-error-500 font-mono"
            aria-describedby="emergency-contact-desc"
          />
          <p id="emergency-contact-desc" className="text-sm text-error-600">
            L'équipe d'urgence vous contactera immédiatement à ce numéro
          </p>
        </div>
        
        <div className="p-4 bg-error-50 border-2 border-error-200 rounded-lg">
          <Label className="text-error-700 font-semibold block mb-2">
            ⏱️ État de conscience du patient
          </Label>
          <div className="space-y-2">
            <label className="flex items-center space-x-3">
              <input type="radio" name="consciousness" className="text-error-600" />
              <span className="text-error-700">✓ Conscient et répond aux questions</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="radio" name="consciousness" className="text-error-600" />
              <span className="text-error-700">⚠️ Conscient mais confus</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="radio" name="consciousness" className="text-error-600" />
              <span className="text-error-700">❌ Inconscient</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  ),
}

export const AmbulanceBookingLabels: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">🚑 Réservation Transport</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup-address" className="text-primary-700 font-medium">
            🏠 Adresse de départ *
          </Label>
          <Input 
            id="pickup-address" 
            placeholder="15 Avenue de la République..."
            aria-describedby="pickup-desc"
          />
          <p id="pickup-desc" className="text-xs text-primary-600">
            D'où l'ambulance doit venir vous chercher
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-primary-700 font-medium">
            🏥 Destination *
          </Label>
          <Input 
            id="destination" 
            placeholder="Hôpital Saint-Louis..."
            aria-describedby="destination-desc"
          />
          <p id="destination-desc" className="text-xs text-primary-600">
            Adresse complète de votre rendez-vous médical
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="appointment-date" className="text-primary-700 font-medium">
              📅 Date du RDV *
            </Label>
            <Input 
              id="appointment-date" 
              type="date"
              min={new Date().toISOString().split('T')[0]}
              aria-describedby="date-desc"
            />
            <p id="date-desc" className="text-xs text-primary-600">
              Jour de votre rendez-vous
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="appointment-time" className="text-primary-700 font-medium">
              ⏰ Heure du RDV *
            </Label>
            <Input 
              id="appointment-time" 
              type="time"
              defaultValue="14:00"
              aria-describedby="time-desc"
            />
            <p id="time-desc" className="text-xs text-primary-600">
              Heure précise du RDV
            </p>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="transport-reason" className="text-primary-700 font-medium">
            📋 Motif du transport *
          </Label>
          <select 
            id="transport-reason"
            className="w-full px-3 py-2 border border-input rounded-md bg-background"
            aria-describedby="reason-desc"
          >
            <option value="">Sélectionnez le motif</option>
            <option value="consultation">Consultation médicale</option>
            <option value="specialiste">Visite spécialiste</option>
            <option value="examens">Examens / Analyses</option>
            <option value="urgence">Transport d'urgence</option>
          </select>
          <p id="reason-desc" className="text-xs text-primary-600">
            Aide à préparer l'équipement nécessaire
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="special-needs" className="text-secondary-700 font-medium">
            ♿ Besoins particuliers
          </Label>
          <Input 
            id="special-needs" 
            placeholder="Fauteuil roulant, oxygène portable..."
            aria-describedby="needs-desc"
          />
          <p id="needs-desc" className="text-xs text-secondary-600">
            Équipement ou assistance spéciale nécessaire
          </p>
        </div>
      </div>
    </div>
  ),
}

export const SeniorFriendlyLabels: Story = {
  render: () => (
    <div className="space-y-8 w-full max-w-lg">
      <h3 className="text-2xl font-semibold mb-4">👴 Formulaire Simplifié pour Seniors</h3>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="senior-name" className="text-xl font-medium text-foreground">
            1. Votre nom complet
          </Label>
          <Input 
            id="senior-name" 
            placeholder="Marie Dupont"
            className="text-xl py-4"
            aria-describedby="senior-name-desc"
          />
          <p id="senior-name-desc" className="text-lg text-muted-foreground">
            Écrivez votre prénom et votre nom de famille
          </p>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="senior-phone" className="text-xl font-medium text-foreground">
            2. Votre numéro de téléphone
          </Label>
          <Input 
            id="senior-phone" 
            type="tel"
            placeholder="06 12 34 56 78"
            className="text-xl py-4 font-mono"
            aria-describedby="senior-phone-desc"
          />
          <p id="senior-phone-desc" className="text-lg text-muted-foreground">
            Pour que nous puissions vous appeler
          </p>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="senior-address" className="text-xl font-medium text-foreground">
            3. Votre adresse complète
          </Label>
          <Input 
            id="senior-address" 
            placeholder="15 Avenue de la République, Paris"
            className="text-xl py-4"
            aria-describedby="senior-address-desc"
          />
          <p id="senior-address-desc" className="text-lg text-muted-foreground">
            D'où l'ambulance doit venir vous chercher
          </p>
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="senior-appointment" className="text-xl font-medium text-foreground">
            4. Où devez-vous aller ?
          </Label>
          <select 
            id="senior-appointment"
            className="w-full px-4 py-4 text-xl border border-input rounded-md bg-background"
            aria-describedby="senior-appointment-desc"
          >
            <option value="">Choisissez dans cette liste</option>
            <option value="medecin">Chez mon médecin</option>
            <option value="hopital">À l'hôpital</option>
            <option value="specialiste">Chez un spécialiste</option>
            <option value="analyses">Faire des examens</option>
          </select>
          <p id="senior-appointment-desc" className="text-lg text-muted-foreground">
            Sélectionnez le type de rendez-vous que vous avez
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-3">
            <Label htmlFor="senior-date" className="text-xl font-medium text-foreground">
              5. Quel jour ?
            </Label>
            <Input 
              id="senior-date" 
              type="date"
              className="text-xl py-4"
              min={new Date().toISOString().split('T')[0]}
              aria-describedby="senior-date-desc"
            />
            <p id="senior-date-desc" className="text-lg text-muted-foreground">
              Choisissez la date de votre rendez-vous
            </p>
          </div>
          
          <div className="space-y-3">
            <Label htmlFor="senior-time" className="text-xl font-medium text-foreground">
              6. À quelle heure ?
            </Label>
            <Input 
              id="senior-time" 
              type="time"
              className="text-xl py-4"
              defaultValue="14:00"
              aria-describedby="senior-time-desc"
            />
            <p id="senior-time-desc" className="text-lg text-muted-foreground">
              L'heure de votre rendez-vous
            </p>
          </div>
        </div>
        
        <div className="p-6 bg-primary-50 border-2 border-primary-200 rounded-lg">
          <Label className="text-xl font-medium text-primary-700 block mb-3">
            💡 Information importante
          </Label>
          <p className="text-lg text-primary-700">
            L'ambulance arrivera <strong>15 minutes avant</strong> l'heure de votre rendez-vous.
            Ayez votre carte vitale et vos papiers prêts.
          </p>
        </div>
      </div>
    </div>
  ),
}

export const StatusAndPriorityLabels: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">🚦 Labels avec Statuts et Priorités</h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-success-700 font-semibold flex items-center gap-2">
            ✅ Patient Actif
            <Badge className="bg-success-600 text-white text-xs">
              STABLE
            </Badge>
          </Label>
          <p className="text-sm text-success-600">
            Dossier à jour, aucune contre-indication au transport
          </p>
        </div>
        
        <div className="space-y-2">
          <Label className="text-warning-700 font-semibold flex items-center gap-2">
            ⚠️ Attention Médicale
            <Badge className="bg-warning-600 text-white text-xs">
              SURVEILLANCE
            </Badge>
          </Label>
          <p className="text-sm text-warning-600">
            Patient nécessitant une surveillance particulière
          </p>
        </div>
        
        <div className="space-y-2">
          <Label className="text-error-700 font-semibold flex items-center gap-2">
            🚨 Priorité Urgence
            <Badge className="bg-error-600 text-white text-xs animate-pulse">
              CRITIQUE
            </Badge>
          </Label>
          <p className="text-sm text-error-600">
            Intervention immédiate requise - Code rouge activé
          </p>
        </div>
        
        <div className="space-y-2">
          <Label className="text-primary-700 font-semibold flex items-center gap-2">
            ℹ️ Information Standard
            <Badge className="bg-primary-600 text-white text-xs">
              NORMAL
            </Badge>
          </Label>
          <p className="text-sm text-primary-600">
            Transport programmé selon procédure standard
          </p>
        </div>
        
        <div className="space-y-2">
          <Label className="text-muted-foreground font-semibold flex items-center gap-2">
            ⏸️ Hors Service
            <Badge className="bg-neutral-500 text-white text-xs">
              INACTIVE
            </Badge>
          </Label>
          <p className="text-sm text-muted-foreground">
            Ambulance ou personnel temporairement indisponible
          </p>
        </div>
      </div>
    </div>
  ),
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-4 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4">♿ Labels Accessibles</h3>
      
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm mb-4 text-muted-foreground">
          Navigation clavier : Tab pour naviguer, les labels sont correctement associés à leurs champs.
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label 
              htmlFor="accessible-text" 
              className="font-medium focus-within:text-primary"
            >
              Champ avec label associé
            </Label>
            <Input 
              id="accessible-text"
              placeholder="Le label est lié à ce champ"
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-describedby="accessible-text-desc"
            />
            <p id="accessible-text-desc" className="text-xs text-muted-foreground">
              Description accessible aux lecteurs d'écran
            </p>
          </div>
          
          <div className="space-y-2">
            <Label 
              htmlFor="required-field" 
              className="font-medium text-foreground"
            >
              Champ requis * 
              <span className="sr-only">(requis)</span>
            </Label>
            <Input 
              id="required-field"
              required
              placeholder="Champ obligatoire"
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-describedby="required-field-desc"
            />
            <p id="required-field-desc" className="text-xs text-muted-foreground">
              L'astérisque indique que ce champ est obligatoire
            </p>
          </div>
          
          <fieldset className="space-y-3 p-3 border rounded-lg">
            <legend className="font-medium px-2">
              Groupe d'options accessibles
            </legend>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input 
                  type="radio" 
                  name="accessible-radio" 
                  value="option1"
                  className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <span>Option 1 avec focus visible</span>
              </label>
              <label className="flex items-center space-x-3">
                <input 
                  type="radio" 
                  name="accessible-radio" 
                  value="option2"
                  className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <span>Option 2 accessible</span>
              </label>
            </div>
          </fieldset>
          
          <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
            <p className="text-sm text-success-700">
              ✓ Tous les labels respectent WCAG 2.1 AA : 
              association correcte avec les champs, contraste suffisant, 
              navigation clavier complète.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
}