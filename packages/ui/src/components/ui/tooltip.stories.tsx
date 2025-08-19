import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip'
import { Button } from './button'
import { Badge } from './badge'
import { Input } from './input'
import { Label } from './label'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant tooltip accessible pour l\'aide contextuelle et les informations supplémentaires dans l\'interface médicale.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Survolez-moi</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Ceci est un tooltip par défaut</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
}

export const MedicalHelp: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-6">
        <h3 className="text-lg font-semibold mb-4">🏥 Aide Contextuelle Médicale</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Label htmlFor="secu">Numéro de sécurité sociale *</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                  ℹ️
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs">
                  <p className="font-medium mb-1">Format : 1 23 45 67 890 123 45</p>
                  <p className="text-xs">
                    13 chiffres + 2 chiffres de clé.<br />
                    Commence par 1 (homme) ou 2 (femme).
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            <Input id="secu" placeholder="1 23 45 67 890 123 45" className="font-mono" />
          </div>
          
          <div className="flex items-center gap-3">
            <Label htmlFor="medication">Médicaments actuels</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full">
                  💊
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm">
                  <p className="font-medium mb-2">Comment bien renseigner vos médicaments :</p>
                  <ul className="text-xs space-y-1">
                    <li>• Nom exact + dosage (ex: Doliprane 500mg)</li>
                    <li>• Fréquence (ex: 3 fois par jour)</li>
                    <li>• Moment de prise (matin, soir, repas)</li>
                    <li>• Indiquez TOUS vos traitements</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
            <Input id="medication" placeholder="Ex: Doliprane 500mg 3x/jour" />
          </div>
          
          <div className="flex items-center gap-3">
            <Label htmlFor="allergies">Allergies connues</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 rounded-full text-error-600">
                  ⚠️
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm bg-error-50 border-error-200">
                  <p className="font-medium text-error-700 mb-2">⚠️ Information critique !</p>
                  <p className="text-xs text-error-700">
                    Ces informations sont essentielles pour la sécurité des soins.
                    Indiquez toute allergie médicamenteuse, alimentaire ou autre
                    (latex, iode, anesthésiques...).
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            <Input id="allergies" placeholder="Ex: Pénicilline, Latex, Aspirine" />
          </div>
        </div>
      </div>
    </TooltipProvider>
  ),
}

export const StatusExplanations: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">🚑 Statuts des Ambulances</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>AMB-001 - Dr. Martin</span>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-success-600 text-white cursor-help">
                    🟢 Disponible
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    <p className="font-medium mb-1">🟢 Ambulance Disponible</p>
                    <p className="text-xs">
                      L'équipe est prête à intervenir immédiatement.
                      Temps de mobilisation : 2-3 minutes maximum.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>AMB-002 - Dr. Dubois</span>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-warning-600 text-white cursor-help">
                    🟡 En Mission
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    <p className="font-medium mb-1">🟡 Ambulance En Mission</p>
                    <p className="text-xs">
                      Transport en cours vers l'Hôpital Bichat.
                      Retour estimé : 45 minutes.
                      Disponible pour urgences uniquement.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>AMB-003 - Dr. Leroy</span>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-error-700 text-white cursor-help animate-pulse">
                    🔴 Urgence
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs bg-error-50 border-error-200">
                    <p className="font-medium text-error-700 mb-1">🔴 Intervention d'Urgence</p>
                    <p className="text-xs text-error-700">
                      Code Rouge activé - Situation vitale.
                      Priorité absolue, toutes autres missions suspendues.
                      ETA destination : 4 minutes.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded-lg">
            <span>AMB-004 - Équipe Ré</span>
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge className="bg-neutral-500 text-white cursor-help">
                    ⚙️ Maintenance
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <div className="max-w-xs">
                    <p className="font-medium mb-1">⚙️ Maintenance Programmée</p>
                    <p className="text-xs">
                      Révision technique obligatoire en cours.
                      Retour en service prévu : 16h30.
                      Vérifications sécurité et matériel médical.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  ),
}

export const MedicalTerms: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">📖 Termes Médicaux Expliqués</h3>
        
        <div className="space-y-3 text-sm leading-relaxed">
          <p>
            Le patient présente une{' '}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help text-primary-600 font-medium">
                  fibrillation auriculaire
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm">
                  <p className="font-medium mb-1">Fibrillation Auriculaire</p>
                  <p className="text-xs">
                    Trouble du rythme cardiaque où les oreillettes battent de façon irrégulière
                    et rapide. Peut provoquer palpitations, essoufflement et fatigue.
                    Traitement souvent par anticoagulants.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            {' '}paroxystique avec prescription d'
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help text-primary-600 font-medium">
                  anticoagulants
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm">
                  <p className="font-medium mb-1">Anticoagulants</p>
                  <p className="text-xs">
                    Médicaments qui "fluidifient" le sang pour éviter la formation de caillots.
                    Exemples : Kardégic, Xarelto, Previscan.
                    <span className="text-warning-600 font-medium"> Attention aux saignements !</span>
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            . Un suivi en{' '}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help text-primary-600 font-medium">
                  cardiologie interventionnelle
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm">
                  <p className="font-medium mb-1">Cardiologie Interventionnelle</p>
                  <p className="text-xs">
                    Spécialité qui traite les maladies cardiaques par des techniques
                    mini-invasives : angioplastie, pose de stents, ablation...
                    Alternative à la chirurgie cardiaque ouverte.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            {' '}est programmé.
          </p>
          
          <p>
            Risque d'{' '}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help text-error-600 font-medium">
                  anaphylaxie
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm bg-error-50 border-error-200">
                  <p className="font-medium text-error-700 mb-1">⚠️ Anaphylaxie</p>
                  <p className="text-xs text-error-700">
                    Réaction allergique sévère et rapide pouvant engager le pronostic vital.
                    Symptômes : difficulté respiratoire, chute de tension, urticaire généralisé.
                    <strong> Urgence médicale absolue !</strong>
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            {' '}à la pénicilline documenté. Éviter tous les{' '}
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="underline decoration-dotted cursor-help text-warning-600 font-medium">
                  bêta-lactamines
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm">
                  <p className="font-medium mb-1">Bêta-lactamines</p>
                  <p className="text-xs">
                    Famille d'antibiotiques incluant pénicillines, amoxicilline, 
                    céphalosporines. Allergie croisée possible.
                    Alternatives : macrolides, fluoroquinolones.
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            .
          </p>
        </div>
      </div>
    </TooltipProvider>
  ),
}

export const EmergencyActions: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">🚨 Actions d'Urgence</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="lg" 
                className="bg-error-600 hover:bg-error-700 text-white h-20 w-full"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🚨</div>
                  <div>URGENCE</div>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">
                <p className="font-medium mb-2">🚨 Déclencher une Urgence</p>
                <ul className="text-xs space-y-1">
                  <li>• Envoi immédiat d'une ambulance</li>
                  <li>• Alerte automatique SAMU/pompiers</li>
                  <li>• Géolocalisation transmise</li>
                  <li>• Temps d'arrivée : 6-8 minutes</li>
                </ul>
                <p className="text-xs mt-2 text-error-600">
                  <strong>Utiliser uniquement en cas de danger vital !</strong>
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary-300 h-20 w-full"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">🚑</div>
                  <div>TRANSPORT</div>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">
                <p className="font-medium mb-2">🚑 Demander un Transport</p>
                <ul className="text-xs space-y-1">
                  <li>• Transport médicalisé programmé</li>
                  <li>• Équipe soignante qualifiée</li>
                  <li>• Matériel médical embarqué</li>
                  <li>• Prise en charge sécurité sociale</li>
                </ul>
                <p className="text-xs mt-2 text-primary-600">
                  Pour consultations et hospitalisations
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-success-300 h-20 w-full"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">👨‍⚕️</div>
                  <div>MÉDECIN</div>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">
                <p className="font-medium mb-2">👨‍⚕️ Contacter un Médecin</p>
                <ul className="text-xs space-y-1">
                  <li>• Conseil médical par téléphone</li>
                  <li>• Évaluation de l'urgence</li>
                  <li>• Orientation vers le bon service</li>
                  <li>• Disponible 24h/24</li>
                </ul>
                <p className="text-xs mt-2 text-success-600">
                  Pour questions et conseils médicaux
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-warning-300 h-20 w-full"
              >
                <div className="text-center">
                  <div className="text-2xl mb-1">💊</div>
                  <div>PHARMACIE</div>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="max-w-xs">
                <p className="font-medium mb-2">💊 Transport Pharmacie</p>
                <ul className="text-xs space-y-1">
                  <li>• Récupération médicaments urgents</li>
                  <li>• Livraison à domicile possible</li>
                  <li>• Pharmacies de garde localisées</li>
                  <li>• Service 24h pour urgences</li>
                </ul>
                <p className="text-xs mt-2 text-warning-600">
                  Pour approvisionnement médicamenteux
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  ),
}

export const SeniorFriendly: Story = {
  render: () => (
    <TooltipProvider>
      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">👴 Interface Senior - Aide Simplifiée</h3>
        
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-neutral-50">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" className="text-xl px-8 py-6">
                  📞 Appeler
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-xs text-base">
                  <p className="font-medium mb-2">📞 Contacter HavRid</p>
                  <p>
                    Appelez directement notre centrale.
                    Un opérateur vous aidera immédiatement.
                  </p>
                  <p className="font-mono text-lg mt-2 text-center">
                    01 23 45 67 89
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
            
            <div>
              <p className="text-lg font-medium">Besoin d'aide ?</p>
              <p className="text-base text-muted-foreground">
                Cliquez sur le bouton pour nous appeler
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-primary-50">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="lg" className="text-xl px-8 py-6 bg-primary-600">
                  🚑 Transport
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm text-base">
                  <p className="font-medium mb-2">🚑 Réserver votre Transport</p>
                  <p className="mb-3">
                    Notre équipe s'occupe de tout pour vous accompagner 
                    à votre rendez-vous médical en toute sécurité.
                  </p>
                  <ul className="space-y-1 text-sm">
                    <li>✓ Personnel formé aux seniors</li>
                    <li>✓ Aide pour monter/descendre</li>
                    <li>✓ Accompagnement jusqu'à la salle d'attente</li>
                    <li>✓ Retour à domicile inclus</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
            
            <div>
              <p className="text-lg font-medium">Aller chez le médecin ?</p>
              <p className="text-base text-muted-foreground">
                Nous vous accompagnons en toute sécurité
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 p-4 border-2 border-error-200 rounded-lg bg-error-50">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="lg" 
                  className="text-xl px-8 py-6 bg-error-600 hover:bg-error-700"
                >
                  🚨 Urgence
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="max-w-sm text-base bg-error-50 border-error-200">
                  <p className="font-medium mb-2 text-error-700">🚨 En cas d'Urgence</p>
                  <p className="mb-3 text-error-700">
                    <strong>Utilisez ce bouton uniquement si vous vous sentez très mal
                    et avez besoin d'aide immédiatement.</strong>
                  </p>
                  <div className="space-y-2 text-sm text-error-700">
                    <p>✓ Une ambulance arrivera rapidement</p>
                    <p>✓ Un médecin vous prendra en charge</p>
                    <p>✓ Nous prévenons votre famille</p>
                    <p>✓ Transport vers l'hôpital le plus proche</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
            
            <div>
              <p className="text-lg font-semibold text-error-700">Urgence Médicale</p>
              <p className="text-base text-error-600">
                Uniquement si vous vous sentez très mal
              </p>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  ),
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <TooltipProvider delayDuration={100}>
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-4">♿ Fonctionnalités d'Accessibilité</h3>
        
        <div className="p-4 border rounded-lg bg-muted/50">
          <p className="text-sm mb-4 text-muted-foreground">
            Testez la navigation clavier : utilisez Tab pour naviguer, Enter pour activer les tooltips.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Navigation clavier
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Ce tooltip peut être activé avec la touche <kbd>Enter</kbd> et fermé avec <kbd>Échap</kbd>.
                  Accessible aux lecteurs d'écran.
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="focus:ring-2 focus:ring-success focus:ring-offset-2">
                  Contraste élevé
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Tous les tooltips respectent les standards WCAG 2.1 AA 
                  avec un contraste minimum de 4.5:1 pour la lisibilité.
                </p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className="focus:ring-2 focus:ring-warning focus:ring-offset-2">
                  Délai personnalisé
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs text-sm">
                  Le délai d'affichage est réduit à 100ms pour cette démo,
                  mais peut être personnalisé selon les besoins des utilisateurs seniors.
                </p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
    </TooltipProvider>
  ),
}