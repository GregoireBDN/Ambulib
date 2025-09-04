import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './drawer'
import { Button } from './button'
import { Input } from './input'
import { Label } from './label'
import { Badge } from './badge'

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Tiroir modal accessible qui glisse depuis le bas, optimisé pour les interfaces mobiles et les interactions rapides.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Ouvrir le tiroir</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Titre du tiroir</DrawerTitle>
          <DrawerDescription>
            Ce tiroir contient des informations ou des actions rapides. Glissez vers le bas ou appuyez sur Échap pour fermer.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <p>Contenu du tiroir...</p>
        </div>
        <DrawerFooter>
          <Button>Confirmer</Button>
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const QuickPatientInfo: Story = {
  args: {},
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-primary-600">
          📋 Infos Rapides - Marie Dupont
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-primary-700 flex items-center gap-2">
            👤 Marie Dupont - Infos Essentielles
          </DrawerTitle>
          <DrawerDescription>
            Informations importantes accessibles rapidement pour l'équipe médicale
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="p-3 bg-error-50 border border-error-200 rounded-lg">
              <h4 className="font-medium text-error-700 mb-2 flex items-center gap-1">
                🚨 Alertes Critiques
              </h4>
              <ul className="text-sm text-error-700 space-y-1">
                <li>• Allergique à la Pénicilline (réaction sévère)</li>
                <li>• Sous anticoagulant (Kardégic)</li>
                <li>• Historique arrêt cardiaque (2023)</li>
              </ul>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl mb-1">🎂</div>
                <p className="font-medium">78 ans</p>
                <p className="text-xs text-muted-foreground">15/03/1946</p>
              </div>
              
              <div className="text-center p-3 border rounded-lg">
                <div className="text-2xl mb-1">🩸</div>
                <p className="font-medium">Groupe O+</p>
                <p className="text-xs text-muted-foreground">Rhésus positif</p>
              </div>
            </div>
            
            <div className="p-3 border rounded-lg">
              <h4 className="font-medium mb-2">📞 Contacts d'Urgence</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Jean Dupont (fils):</span>
                  <span className="font-mono">06 98 76 54 32</span>
                </div>
                <div className="flex justify-between">
                  <span>Dr. Martin (cardio):</span>
                  <span className="font-mono">01 23 45 67 89</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 justify-center">
              <Badge className="bg-success-100 text-success-700">
                ✓ Dossier à jour
              </Badge>
              <Badge className="bg-primary-100 text-primary-700">
                Patient VIP
              </Badge>
            </div>
          </div>
        </div>
        
        <DrawerFooter>
          <div className="flex gap-2">
            <Button className="flex-1 bg-primary-600">
              📋 Voir Dossier Complet
            </Button>
            <Button variant="outline" className="flex-1">
              📞 Appeler Contact
            </Button>
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Fermer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const EmergencyActions: Story = {
  args: {},
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-error-600 hover:bg-error-700 text-white">
          🚨 Actions d'Urgence
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-error-700 flex items-center gap-2">
            🚨 Centre de Commande d'Urgence
          </DrawerTitle>
          <DrawerDescription>
            Actions d'intervention immédiate - Sélectionnez le type d'urgence
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <Button 
              size="lg" 
              className="bg-error-700 hover:bg-error-800 text-white h-16 justify-start gap-4"
            >
              <div className="text-3xl">🚨</div>
              <div className="text-left">
                <div className="font-semibold">ARRÊT CARDIAQUE</div>
                <div className="text-sm opacity-90">Code Rouge - Intervention immédiate</div>
              </div>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-error-300 h-16 justify-start gap-4 hover:bg-error-50"
            >
              <div className="text-3xl">🩸</div>
              <div className="text-left">
                <div className="font-semibold">HÉMORRAGIE SÉVÈRE</div>
                <div className="text-sm text-muted-foreground">Code Orange - Priorité haute</div>
              </div>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-warning-300 h-16 justify-start gap-4 hover:bg-warning-50"
            >
              <div className="text-3xl">🫁</div>
              <div className="text-left">
                <div className="font-semibold">DÉTRESSE RESPIRATOIRE</div>
                <div className="text-sm text-muted-foreground">Code Jaune - Surveillance</div>
              </div>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-300 h-16 justify-start gap-4 hover:bg-primary-50"
            >
              <div className="text-3xl">🧠</div>
              <div className="text-left">
                <div className="font-semibold">AVC SUSPECT</div>
                <div className="text-sm text-muted-foreground">Transport d'urgence - Neuro</div>
              </div>
            </Button>
          </div>
          
          <div className="p-3 bg-neutral-100 rounded-lg">
            <p className="text-sm text-center">
              <strong>Temps de mobilisation :</strong> 4-6 minutes
            </p>
            <p className="text-xs text-center text-muted-foreground mt-1">
              Ambulance la plus proche : AMB-003 (2.1 km)
            </p>
          </div>
        </div>
        
        <DrawerFooter>
          <div className="text-center text-sm text-error-600 mb-4">
            ⚠️ Ces actions déclenchent une intervention immédiate
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Annuler</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const VehicleStatus: Story = {
  args: {},
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50">
          <div className="text-2xl">🚑</div>
          <div>
            <p className="font-medium">AMB-002</p>
            <p className="text-sm text-muted-foreground">Voir détails</p>
          </div>
          <Badge className="bg-warning-600 text-white">
            🟡 En mission
          </Badge>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-warning-700 flex items-center gap-2">
            🚑 AMB-002 - Statut Détaillé
          </DrawerTitle>
          <DrawerDescription>
            Informations temps réel sur l'ambulance et sa mission en cours
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-warning-50 border border-warning-200 rounded-lg">
              <div className="text-3xl mb-2">⏱️</div>
              <p className="font-semibold">12 min</p>
              <p className="text-xs text-warning-600">ETA destination</p>
            </div>
            
            <div className="text-center p-4 bg-primary-50 border border-primary-200 rounded-lg">
              <div className="text-3xl mb-2">📍</div>
              <p className="font-semibold">3.2 km</p>
              <p className="text-xs text-primary-600">Distance restante</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium">👨‍⚕️ Équipe:</span>
              <div className="text-right">
                <p className="font-medium">Dr. Leroy + Inf. Petit</p>
                <Badge className="bg-success-100 text-success-700 mt-1">
                  Équipe complète
                </Badge>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium">👤 Patient:</span>
              <div className="text-right">
                <p className="font-medium">Jean Martin (65 ans)</p>
                <p className="text-sm text-muted-foreground">Consultation orthopédie</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-lg">
              <span className="font-medium">🏥 Destination:</span>
              <div className="text-right">
                <p className="font-medium">Hôpital Bichat</p>
                <p className="text-sm text-muted-foreground">46 Rue Henri Huchard</p>
              </div>
            </div>
            
            <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="font-medium text-success-700">🔋 Véhicule:</span>
                <Badge className="bg-success-600 text-white">
                  Tous systèmes OK
                </Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs text-success-700">
                <div className="text-center">
                  <div>⛽ Carburant</div>
                  <div className="font-mono">85%</div>
                </div>
                <div className="text-center">
                  <div>💨 O₂</div>
                  <div className="font-mono">Full</div>
                </div>
                <div className="text-center">
                  <div>⚡ Batterie</div>
                  <div className="font-mono">98%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <DrawerFooter>
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1">
              📞 Contacter Équipe
            </Button>
            <Button variant="outline" className="flex-1">
              📍 Suivre Position
            </Button>
          </div>
          <DrawerClose asChild>
            <Button variant="outline">Fermer</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const QuickBooking: Story = {
  args: {},
  render: () => {
    const [open, setOpen] = React.useState(false)
    
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button size="lg" className="bg-primary-600 text-lg px-8 py-4">
            🚑 Réservation Rapide
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>🚑 Réservation Express</DrawerTitle>
            <DrawerDescription>
              Réservez votre transport en quelques étapes simples
            </DrawerDescription>
          </DrawerHeader>
          
          <form className="p-4 space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="pickup">Adresse de départ *</Label>
                <Input 
                  id="pickup" 
                  placeholder="15 Avenue de la République, Paris..." 
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="destination">Destination *</Label>
                <Input 
                  id="destination" 
                  placeholder="Hôpital Saint-Louis..." 
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input 
                    id="date" 
                    type="date" 
                    className="mt-1"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Heure</Label>
                  <Input 
                    id="time" 
                    type="time" 
                    className="mt-1"
                    defaultValue="14:00"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="reason">Motif du transport</Label>
                <select 
                  id="reason" 
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="">Sélectionnez un motif</option>
                  <option value="consultation">Consultation médicale</option>
                  <option value="urgence">Urgence</option>
                  <option value="hospitalisation">Hospitalisation</option>
                  <option value="retour">Retour à domicile</option>
                </select>
              </div>
            </div>
            
            <div className="p-3 bg-primary-50 border border-primary-200 rounded-lg">
              <p className="text-sm text-primary-700 text-center">
                💡 L'ambulance vous contactera 15 minutes avant l'arrivée
              </p>
            </div>
          </form>
          
          <DrawerFooter>
            <Button 
              className="bg-primary-600"
              onClick={() => {
                // Logique de réservation
                setOpen(false)
              }}
            >
              ✓ Confirmer la Réservation
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Annuler</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  },
}

export const SeniorInterface: Story = {
  args: {},
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button size="lg" className="text-xl px-8 py-6">
          ℹ️ Aide et Informations
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-xl">📱 Comment Utiliser cette Application</DrawerTitle>
          <DrawerDescription className="text-base">
            Guide simple pour utiliser HavRid en toute sécurité
          </DrawerDescription>
        </DrawerHeader>
        
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="text-4xl">📞</div>
              <div>
                <h4 className="text-lg font-medium mb-2">1. Pour appeler une ambulance</h4>
                <p className="text-base leading-relaxed">
                  Appuyez sur le gros bouton rouge "URGENCE" si vous vous sentez très mal.
                  Une ambulance arrivera rapidement chez vous.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="text-4xl">🚑</div>
              <div>
                <h4 className="text-lg font-medium mb-2">2. Pour un rendez-vous médical</h4>
                <p className="text-base leading-relaxed">
                  Appuyez sur "Transport" pour réserver votre ambulance à l'avance.
                  On vous aidera à aller chez votre médecin.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 border rounded-lg">
              <div className="text-4xl">💊</div>
              <div>
                <h4 className="text-lg font-medium mb-2">3. Pour vos médicaments</h4>
                <p className="text-base leading-relaxed">
                  N'oubliez pas de nous dire quels médicaments vous prenez.
                  C'est très important pour votre sécurité.
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-primary-50 border-2 border-primary-200 rounded-lg">
              <h4 className="text-lg font-medium text-primary-700 mb-2">📞 Besoin d'aide ?</h4>
              <p className="text-base text-primary-700">
                Appelez-nous au <strong className="font-mono text-xl">01 23 45 67 89</strong>
              </p>
              <p className="text-sm text-primary-600 mt-1">
                Nous sommes là 24h/24 pour vous aider
              </p>
            </div>
          </div>
        </div>
        
        <DrawerFooter>
          <DrawerClose asChild>
            <Button size="lg" className="text-lg py-3">
              ✓ J'ai Compris
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}

export const AccessibilityFeatures: Story = {
  args: {},
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-4">♿ Fonctionnalités d'Accessibilité</h3>
      
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm mb-4 text-muted-foreground">
          Navigation tactile : glissez vers le bas pour fermer le tiroir, ou utilisez les boutons.
        </p>
        
        <Drawer>
          <DrawerTrigger asChild>
            <Button 
              variant="outline" 
              className="focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Test d'Accessibilité
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>♿ Test d'Accessibilité</DrawerTitle>
              <DrawerDescription>
                Ce tiroir respecte les standards WCAG 2.1 AA pour l'accessibilité.
              </DrawerDescription>
            </DrawerHeader>
            
            <div className="p-4 space-y-3">
              <div className="p-3 border rounded-lg">
                <h4 className="font-medium mb-2">✓ Fonctionnalités incluses :</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Navigation clavier complète (Tab, Enter, Échap)</li>
                  <li>Support des lecteurs d'écran (ARIA)</li>
                  <li>Contraste minimum 4.5:1</li>
                  <li>Gestes tactiles intuitifs</li>
                  <li>Taille des cibles tactiles ≥ 44px</li>
                </ul>
              </div>
              
              <div className="p-3 bg-success-50 border border-success-200 rounded-lg">
                <p className="text-sm text-success-700">
                  Ce composant est entièrement accessible et utilisable par tous,
                  y compris les personnes en situation de handicap.
                </p>
              </div>
            </div>
            
            <DrawerFooter>
              <DrawerClose asChild>
                <Button className="focus:ring-2 focus:ring-primary focus:ring-offset-2">
                  Fermer (accessible)
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  ),
}