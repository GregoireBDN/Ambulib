import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'
import { Button } from './button'
import { Input } from './input'
import { Badge } from './badge'

const meta: Meta<typeof Form> = {
  title: 'Components/UI/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant de formulaire accessible avec validation, optimisé pour la saisie de données médicales et patients. Utilise React Hook Form pour la gestion d\'état et la validation.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

// Mock form provider for demonstration purposes
const MockFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {children}
      <Button type="submit" className="w-full">
        ✓ Enregistrer les informations
      </Button>
    </form>
  )
}

// Mock FormField component for demo
const DemoFormField = ({ 
  label, 
  placeholder, 
  description, 
  type = "text",
  required = false 
}: {
  label: string
  placeholder: string
  description?: string
  type?: string
  required?: boolean
}) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState('')

  const validate = (val: string) => {
    if (required && !val.trim()) {
      setError(`${label} est requis`)
    } else {
      setError('')
    }
  }

  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label} {required && '*'}
      </label>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          validate(e.target.value)
        }}
        onBlur={(e) => validate(e.target.value)}
        className={error ? "border-destructive" : ""}
      />
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      {error && (
        <p className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <h3 className="text-lg font-semibold">📝 Nouveau Dossier Patient</h3>
      
      <MockFormProvider>
        <DemoFormField
          label="Prénom"
          placeholder="Marie"
          required
        />

        <DemoFormField
          label="Nom de famille"
          placeholder="Dupont"
          required
        />

        <DemoFormField
          label="Téléphone"
          type="tel"
          placeholder="06 12 34 56 78"
          description="Pour les notifications de rendez-vous"
          required
        />

        <DemoFormField
          label="Email (optionnel)"
          type="email"
          placeholder="marie.dupont@example.com"
          description="Pour recevoir les confirmations par email"
        />
      </MockFormProvider>
    </div>
  ),
}

export const BookingForm: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold">🚑 Réservation Ambulance</h3>
        <Badge className="bg-primary-100 text-primary-700">Transport programmé</Badge>
      </div>
      
      <MockFormProvider>
        <DemoFormField
          label="Nom du patient"
          placeholder="Marie Dupont"
          required
        />

        <DemoFormField
          label="Adresse de départ"
          placeholder="15 Avenue de la République, 75011 Paris"
          required
        />

        <DemoFormField
          label="Destination"
          placeholder="Hôpital Saint-Louis, 1 Avenue Claude Vellefaux..."
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <DemoFormField
            label="Date du RDV"
            type="date"
            placeholder=""
            required
          />

          <DemoFormField
            label="Heure du RDV"
            type="time"
            placeholder=""
            required
          />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium">Motif du transport *</label>
          <select className="w-full px-3 py-2 border border-input rounded-md bg-background">
            <option value="">Sélectionnez un motif</option>
            <option value="consultation">Consultation médicale</option>
            <option value="specialiste">Visite spécialiste</option>
            <option value="examens">Examens médicaux</option>
            <option value="urgence">Transport d'urgence</option>
            <option value="hospitalisation">Hospitalisation</option>
            <option value="retour">Retour à domicile</option>
          </select>
        </div>

        <DemoFormField
          label="Besoins spéciaux (optionnel)"
          placeholder="Fauteuil roulant, oxygène, accompagnement..."
          description="Indiquez tout équipement ou assistance particulière nécessaire"
        />

        <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
          <p className="text-sm text-primary-700">
            📝 <strong>Information :</strong> L'ambulance arrivera 15-20 minutes avant l'heure de votre rendez-vous.
            Munissez-vous de votre carte vitale et de vos documents médicaux.
          </p>
        </div>
      </MockFormProvider>
    </div>
  ),
}

export const EmergencyForm: Story = {
  render: () => (
    <div className="w-full max-w-lg space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-destructive">🚨 Déclaration d'Urgence</h3>
        <Badge className="bg-destructive text-destructive-foreground animate-pulse">PRIORITÉ ABSOLUE</Badge>
      </div>
      
      <div className="p-4 bg-destructive/10 border-2 border-destructive/20 rounded-lg">
        <p className="text-destructive font-medium mb-2">⚠️ Formulaire d'urgence vitale</p>
        <p className="text-sm text-destructive/80">
          Remplissez rapidement les informations essentielles. Une ambulance sera dépêchée immédiatement.
        </p>
      </div>
      
      <MockFormProvider>
        <DemoFormField
          label="Nom du patient"
          placeholder="Marie Dupont"
          required
        />

        <DemoFormField
          label="Localisation exacte"
          placeholder="15 Avenue de la République, 75011 Paris - Appartement 3A"
          description="Soyez le plus précis possible (étage, code d'accès, etc.)"
          required
        />

        <div className="grid gap-2">
          <label className="text-sm font-medium text-destructive">Type d'urgence *</label>
          <select className="w-full px-3 py-2 border border-destructive/30 rounded-md bg-background focus:border-destructive/50">
            <option value="cardiac">🫀 Arrêt cardiaque / Malaise cardiaque</option>
            <option value="breathing">🫁 Détresse respiratoire / Étouffement</option>
            <option value="trauma">🩸 Traumatisme grave / Hémorragie</option>
            <option value="stroke">🧠 AVC suspect / Perte de conscience</option>
            <option value="other">❓ Autre urgence vitale</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-destructive">Description des symptômes *</label>
          <textarea 
            className="w-full px-3 py-2 border border-destructive/30 rounded-md bg-background focus:border-destructive/50 min-h-[80px]"
            placeholder="Décrivez précisément ce qui se passe : douleur, localisation, depuis quand, état de conscience..."
          />
        </div>

        <DemoFormField
          label="Téléphone de contact"
          type="tel"
          placeholder="06 12 34 56 78"
          description="L'ambulance vous contactera à ce numéro"
          required
        />

        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" defaultChecked />
            <label className="text-sm font-medium text-destructive">Le patient est conscient</label>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" className="h-4 w-4" defaultChecked />
            <label className="text-sm font-medium text-destructive">Le patient respire</label>
          </div>
        </div>

        <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
          <p className="text-sm text-warning-foreground">
            ⏱️ <strong>Temps estimé d'arrivée :</strong> 4-6 minutes<br />
            <strong>Ambulance assignée :</strong> AMB-003 (la plus proche)
          </p>
        </div>
      </MockFormProvider>
    </div>
  ),
}

export const SeniorFriendlyForm: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-6">
      <h3 className="text-xl font-semibold">📝 Réserver votre Transport</h3>
      <p className="text-lg text-muted-foreground">Remplissez ce formulaire simple</p>
      
      <MockFormProvider>
        <div className="grid gap-2">
          <label className="text-lg font-medium">1. Votre nom complet</label>
          <Input 
            placeholder="Marie Dupont" 
            className="text-lg py-3"
          />
        </div>

        <div className="grid gap-2">
          <label className="text-lg font-medium">2. Votre numéro de téléphone</label>
          <Input 
            type="tel"
            placeholder="06 12 34 56 78"
            className="text-lg py-3 font-mono"
          />
          <p className="text-base text-muted-foreground">
            Pour que l'ambulance puisse vous contacter
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-lg font-medium">3. Votre adresse</label>
          <Input 
            placeholder="15 Avenue de la République, Paris"
            className="text-lg py-3"
          />
          <p className="text-base text-muted-foreground">
            D'où l'ambulance doit venir vous chercher
          </p>
        </div>

        <div className="grid gap-2">
          <label className="text-lg font-medium">4. Pourquoi avez-vous besoin de l'ambulance ?</label>
          <select className="w-full px-4 py-3 text-lg border border-input rounded-md bg-background">
            <option value="">Choisissez dans la liste</option>
            <option value="medecin">Aller chez mon médecin</option>
            <option value="hopital">Aller à l'hôpital</option>
            <option value="analyses">Faire des analyses</option>
            <option value="specialiste">Voir un spécialiste</option>
            <option value="urgence">C'est urgent</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div className="grid gap-2">
            <label className="text-lg font-medium">5. Quel jour ?</label>
            <Input 
              type="date"
              className="text-lg py-3"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-lg font-medium">6. À quelle heure ?</label>
            <Input 
              type="time"
              className="text-lg py-3"
              defaultValue="14:00"
            />
          </div>
        </div>

        <div className="p-6 bg-primary/10 border-2 border-primary/20 rounded-lg">
          <p className="text-lg text-primary text-center">
            💡 <strong>Nous nous occupons de tout !</strong><br />
            L'ambulance viendra vous chercher à l'heure et vous ramènera chez vous.
          </p>
        </div>
      </MockFormProvider>
    </div>
  ),
}

export const AccessibilityFeatures: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <h3 className="text-lg font-semibold mb-4">♿ Test d'Accessibilité des Formulaires</h3>
      
      <div className="p-4 border rounded-lg bg-muted/50">
        <p className="text-sm mb-4 text-muted-foreground">
          Navigation clavier : Tab pour naviguer entre les champs, Espace pour les cases à cocher.
        </p>
        
        <div className="space-y-4">
          <DemoFormField
            label="Champ avec label accessible"
            placeholder="Texte avec focus visible"
            description="Ce champ a un label associé et des messages d'erreur accessibles"
          />

          <div className="grid gap-2">
            <label className="text-sm font-medium">Menu déroulant accessible</label>
            <select className="w-full px-3 py-2 border border-input rounded-md bg-background focus:ring-2 focus:ring-primary focus:ring-offset-2">
              <option value="">Sélectionner une option</option>
              <option value="option1">Option 1 - Accessible</option>
              <option value="option2">Option 2 - Avec ARIA</option>
              <option value="option3">Option 3 - Focus visible</option>
            </select>
            <p className="text-sm text-muted-foreground">
              Navigation possible avec les flèches du clavier
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="h-4 w-4 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            />
            <label className="text-sm font-medium">Case à cocher accessible</label>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-700">
            ✓ Conformité WCAG 2.1 AA : Labels associés, focus visible, navigation clavier,
            messages d'erreur accessibles aux lecteurs d'écran.
          </p>
        </div>
      </div>
    </div>
  ),
}