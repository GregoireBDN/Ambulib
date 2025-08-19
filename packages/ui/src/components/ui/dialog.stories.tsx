import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './dialog'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Badge } from './badge'

const meta: Meta<typeof Dialog> = {
  title: 'Components/UI/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant modal accessible pour confirmations, formulaires et informations détaillées dans le contexte médical.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Ouvrir la modal</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Titre de la modal</DialogTitle>
          <DialogDescription>
            Cette modal contient des informations importantes.
            Utilisez Échap pour fermer ou cliquez sur le bouton Fermer.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p>Contenu de la modal...</p>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline">
            Annuler
          </Button>
          <Button type="button">
            Confirmer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const ConfirmationUrgence: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-error-600 hover:bg-error-700 text-white">
          🚨 Déclarer Urgence
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-error-700 flex items-center gap-2">
            🚨 Confirmer l'Urgence Médicale
          </DialogTitle>
          <DialogDescription>
            Cette action va déclencher immédiatement l'envoi d'une ambulance et alerter les services d'urgence.
            <strong> Cette action ne peut pas être annulée.</strong>
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-3">
          <div className="p-4 bg-error-50 border border-error-200 rounded-lg">
            <h4 className="font-medium text-error-700 mb-2">Informations d'urgence :</h4>
            <ul className="text-sm text-error-700 space-y-1">
              <li>• Localisation : 15 Avenue de la République, 75011 Paris</li>
              <li>• Patient : Marie Dupont (78 ans)</li>
              <li>• Temps d'arrivée estimé : 6-8 minutes</li>
            </ul>
          </div>
          
          <div className="text-center">
            <Badge className="bg-error-700 text-white px-4 py-2">
              Ambulance la plus proche : AMB-003
            </Badge>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline">
            Annuler
          </Button>
          <Button className="bg-error-600 hover:bg-error-700 text-white font-semibold">
            🚨 Confirmer l'Urgence
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const DossierPatient: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          📋 Voir Dossier Complet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-primary-700">
            📋 Dossier Médical - Marie Dupont
          </DialogTitle>
          <DialogDescription>
            Informations complètes du patient - Confidentiel et protégé RGPD
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          {/* Informations personnelles */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-1">Informations Personnelles</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <Label className="font-medium">Date de naissance</Label>
                <p>15 mars 1946 (78 ans)</p>
              </div>
              <div>
                <Label className="font-medium">Numéro de sécurité sociale</Label>
                <p className="font-mono">2 85 03 75 123 456 78</p>
              </div>
              <div>
                <Label className="font-medium">Adresse</Label>
                <p>15 Avenue de la République<br />75011 Paris</p>
              </div>
              <div>
                <Label className="font-medium">Contact d'urgence</Label>
                <p>Jean Dupont (fils)<br />06 98 76 54 32</p>
              </div>
            </div>
          </div>
          
          {/* Alertes médicales */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-1">⚠️ Alertes Médicales Importantes</h3>
            <div className="space-y-2">
              <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
                <div className="flex items-center gap-2 font-medium text-error-700 mb-1">
                  🚨 <span>Allergies critiques</span>
                </div>
                <ul className="text-sm text-error-700 list-disc list-inside">
                  <li>Pénicilline (réaction anaphylactique)</li>
                  <li>Latex (urticaire sévère)</li>
                  <li>Aspirine (troubles digestifs)</li>
                </ul>
              </div>
              
              <div className="p-3 bg-warning-50 border border-warning-200 rounded-lg">
                <div className="flex items-center gap-2 font-medium text-warning-700 mb-1">
                  💊 <span>Traitements en cours</span>
                </div>
                <ul className="text-sm text-warning-700 list-disc list-inside">
                  <li>Doliprane 500mg - 3 fois par jour</li>
                  <li>Kardégic 75mg - 1 fois par jour (anticoagulant)</li>
                  <li>Atenolol 50mg - 1 fois le matin</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Historique */}
          <div>
            <h3 className="font-semibold text-lg mb-3 border-b pb-1">📅 Historique Récent</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center p-2 border rounded">
                <span>15/10/2024 - Consultation cardiologie</span>
                <Badge className="bg-success-100 text-success-700">Terminé</Badge>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>08/10/2024 - Transport analyses</span>
                <Badge className="bg-success-100 text-success-700">Terminé</Badge>
              </div>
              <div className="flex justify-between items-center p-2 border rounded">
                <span>01/10/2024 - Urgence malaise</span>
                <Badge className="bg-error-100 text-error-700">Résolu</Badge>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline">
            📞 Contacter Patient
          </Button>
          <Button variant="outline">
            ✏️ Modifier Dossier
          </Button>
          <Button className="bg-primary-600">
            🚑 Programmer Transport
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const FormulaireReservation: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary-600">
            🚑 Réserver une Ambulance
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>🚑 Nouvelle Réservation d'Ambulance</DialogTitle>
            <DialogDescription>
              Planifiez votre transport médicalisé en quelques étapes simples.
            </DialogDescription>
          </DialogHeader>
          
          <form className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date du transport *</Label>
                <Input 
                  id="date" 
                  type="date" 
                  className="mt-1"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="heure">Heure de départ *</Label>
                <Input 
                  id="heure" 
                  type="time" 
                  className="mt-1"
                  defaultValue="14:00"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="depart">Adresse de départ *</Label>
              <Input 
                id="depart" 
                placeholder="15 Avenue de la République, 75011 Paris"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Input 
                id="destination" 
                placeholder="Hôpital Saint-Louis, 1 Avenue Claude Vellefaux..."
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="motif">Motif du transport</Label>
              <select 
                id="motif" 
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
              >
                <option value="">Sélectionnez un motif</option>
                <option value="consultation">Consultation médicale</option>
                <option value="urgence">Urgence</option>
                <option value="hospitalisation">Hospitalisation</option>
                <option value="retour">Retour à domicile</option>
                <option value="autre">Autre</option>
              </select>
            </div>
            
            <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <h4 className="font-medium text-primary-700 mb-2">ℹ️ Informations importantes</h4>
              <ul className="text-sm text-primary-700 space-y-1">
                <li>• Prévoir 30 minutes avant l'heure de RDV</li>
                <li>• Munissez-vous de votre carte vitale</li>
                <li>• L'ambulance vous contactera 15 minutes avant</li>
              </ul>
            </div>
          </form>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button 
              className="bg-primary-600"
              onClick={() => {
                // Logique de réservation
                setOpen(false)
              }}
            >
              ✓ Confirmer la Réservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  },
}

export const ModalAnnulationRDV: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          ❌ Annuler le Rendez-vous
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-warning-700">
            ❌ Annuler le Rendez-vous
          </DialogTitle>
          <DialogDescription>
            Vous êtes sur le point d'annuler votre rendez-vous du <strong>mercredi 25 octobre à 14h30</strong>.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
          <div className="p-4 bg-warning-50 border border-warning-200 rounded-lg">
            <h4 className="font-medium text-warning-700 mb-2">⚠️ Conséquences de l'annulation</h4>
            <ul className="text-sm text-warning-700 space-y-1">
              <li>• Le patient sera automatiquement notifié par SMS</li>
              <li>• L'ambulance AMB-002 sera libérée</li>
              <li>• Possibilité de reprogrammer dans les 24h</li>
              <li>• Frais d'annulation : 0€ (délai respecté)</li>
            </ul>
          </div>
          
          <div>
            <Label htmlFor="motif-annulation">Motif d'annulation (optionnel)</Label>
            <select 
              id="motif-annulation" 
              className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
            >
              <option value="">Sélectionnez un motif</option>
              <option value="patient-malade">Patient souffrant</option>
              <option value="rdv-reporte">RDV médical reporté</option>
              <option value="urgence-familiale">Urgence familiale</option>
              <option value="probleme-transport">Problème de transport</option>
              <option value="autre">Autre raison</option>
            </select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline">
            Conserver le RDV
          </Button>
          <Button variant="destructive">
            Confirmer l'Annulation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

export const NotificationAmbulance: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    
    // Simuler une notification après 2 secondes
    React.useEffect(() => {
      const timer = setTimeout(() => setOpen(true), 2000)
      return () => clearTimeout(timer)
    }, [])
    
    return (
      <>
        <p className="text-muted-foreground">
          Une notification d'ambulance va apparaître dans 2 secondes...
        </p>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-success-700 flex items-center gap-2">
                🚑 Ambulance en Route !
              </DialogTitle>
              <DialogDescription>
                Votre ambulance arrive dans quelques minutes.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4 space-y-4">
              <div className="text-center p-6 bg-success-50 border border-success-200 rounded-lg">
                <div className="text-4xl mb-2">🚑</div>
                <p className="text-lg font-semibold text-success-700">AMB-002</p>
                <p className="text-2xl font-bold text-success-700 mb-2">6 minutes</p>
                <p className="text-sm text-success-600">Temps d'arrivée estimé</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium">Conducteur :</span>
                  <span>Pierre Leroy</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Équipe médicale :</span>
                  <span>Dr. Martin + Inf. Dubois</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Contact direct :</span>
                  <span className="font-mono">06 12 34 56 78</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Destination :</span>
                  <span>Hôpital Saint-Louis</span>
                </div>
              </div>
              
              <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
                <p className="text-sm text-primary-700">
                  💡 <strong>Conseil :</strong> Préparez vos documents (carte vitale, ordonnances) 
                  et restez proche de l'entrée de votre domicile.
                </p>
              </div>
            </div>
            
            <DialogFooter className="gap-2">
              <Button variant="outline" size="sm">
                📞 Appeler l'Ambulance
              </Button>
              <Button variant="outline" size="sm">
                📍 Suivre en Direct
              </Button>
              <Button onClick={() => setOpen(false)}>
                ✓ Compris
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    )
  },
}

export const ModalSeniorFriendly: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="text-lg px-8 py-4">
          ℹ️ Informations Important
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-primary-700">
            📱 Votre Ambulance Arrive Bientôt
          </DialogTitle>
          <DialogDescription className="text-base leading-relaxed">
            Nous vous informons que votre transport est confirmé et en cours.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-6">
          <div className="text-center">
            <div className="text-6xl mb-4">🚑</div>
            <p className="text-3xl font-bold text-success-700 mb-2">8 minutes</p>
            <p className="text-lg text-muted-foreground">Arrivée prévue</p>
          </div>
          
          <div className="space-y-4 text-lg">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👨‍⚕️</span>
              <div>
                <p className="font-semibold">Pierre Leroy</p>
                <p className="text-muted-foreground">Votre conducteur</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-2xl">🏥</span>
              <div>
                <p className="font-semibold">Hôpital Saint-Louis</p>
                <p className="text-muted-foreground">Votre destination</p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-primary-50 border-2 border-primary-200 rounded-lg">
            <p className="text-base text-primary-700 leading-relaxed">
              <strong>N'oubliez pas :</strong> Vos documents d'identité, 
              votre carte vitale et vos médicaments habituels.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button size="lg" className="w-full text-lg py-3">
            ✓ J'ai Compris
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}