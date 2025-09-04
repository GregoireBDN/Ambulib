import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { PhoneInput } from './phone-input'
import { Label } from './label'

const meta: Meta<typeof PhoneInput> = {
  title: "UI/PhoneInput",
  component: PhoneInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant spécialisé pour la saisie de numéros de téléphone français avec validation temps réel et formatage automatique via libphonenumber-js.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultCountry: {
      control: { type: 'select' },
      options: ['FR'],
      description: 'Pays par défaut pour la validation (seule la France est supportée)',
    },
    onChange: {
      action: 'changed',
      description: 'Callback appelé avec (value, isValid, parsedNumber) à chaque changement',
    },
    value: {
      control: 'text',
      description: 'Valeur contrôlée du champ',
    },
    error: {
      control: 'text',
      description: 'Message d\'erreur à afficher',
    },
    placeholder: {
      control: 'text',
      description: 'Texte d\'aide affiché dans le champ vide',
    },
    disabled: {
      control: 'boolean',
      description: 'Désactive le champ',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '06 12 34 56 78',
  },
}

export const WithValue: Story = {
  args: {
    value: '0612345678',
    placeholder: '06 12 34 56 78',
  },
  parameters: {
    docs: {
      description: {
        story: 'PhoneInput avec une valeur initiale. Le formatage se fait automatiquement.',
      },
    },
  },
}


export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = React.useState('')
    const [isValid, setIsValid] = React.useState<boolean | null>(null)

    return (
      <div className="w-full max-w-sm space-y-2">
        <Label htmlFor="phone-demo">Numéro de téléphone *</Label>
        <PhoneInput
          id="phone-demo"
          value={value}
          onChange={(newValue, valid) => {
            setValue(newValue)
            setIsValid(valid)
          }}
          placeholder="06 12 34 56 78"
        />
        <p className="text-xs text-muted-foreground">
          {isValid === null ? 'Entrez votre numéro' : 
           isValid ? '✓ Numéro valide' : 
           'Numéro invalide'}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'PhoneInput avec label et feedback de validation temps réel.',
      },
    },
  },
}

export const WithError: Story = {
  args: {
    value: '061234',
    error: 'Ce numéro est trop court (10 chiffres requis)',
    placeholder: '06 12 34 56 78',
  },
  parameters: {
    docs: {
      description: {
        story: 'PhoneInput avec message d\'erreur visible.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    value: '06 12 34 56 78',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'PhoneInput désactivé avec numéro pré-rempli.',
      },
    },
  },
}

export const ValidationDemo: Story = {
  render: () => {
    const [phone, setPhone] = React.useState('')
    const [isValid, setIsValid] = React.useState<boolean | null>(null)
    const [parsedNumber, setParsedNumber] = React.useState<{
      getType: () => string;
      formatNational: () => string;
      formatInternational: () => string;
    } | null>(null)

    return (
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="validation-demo">Testez la validation</Label>
          <PhoneInput
            id="validation-demo"
            value={phone}
            onChange={(value, valid, parsed) => {
              setPhone(value)
              setIsValid(valid)
              setParsedNumber(parsed as { getType: () => string; formatNational: () => string; formatInternational: () => string; } | null)
            }}
            placeholder="Tapez un numéro..."
          />
        </div>
        
        <div className="text-sm space-y-1">
          <p>
            <span className="font-medium">État:</span>{' '}
            <span className={
              isValid === null ? 'text-muted-foreground' :
              isValid ? 'text-green-600' : 'text-red-600'
            }>
              {isValid === null ? 'En attente' : 
               isValid ? '✓ Valide' : '✗ Invalide'}
            </span>
          </p>
          
          {parsedNumber && (
            <>
              <p><span className="font-medium">Type:</span> {parsedNumber.getType() || 'Inconnu'}</p>
              <p><span className="font-medium">Format national:</span> {parsedNumber.formatNational()}</p>
              <p><span className="font-medium">Format international:</span> {parsedNumber.formatInternational()}</p>
            </>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p><strong>Formats valides:</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>06 12 34 56 78 (mobile)</li>
            <li>01 42 34 56 78 (fixe)</li>
            <li>+33 6 12 34 56 78 (international)</li>
          </ul>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Démonstration complète de la validation avec feedback détaillé.',
      },
    },
  },
}

export const MedicalForm: Story = {
  render: () => {
    const [patientPhone, setPatientPhone] = React.useState('')
    const [emergencyPhone, setEmergencyPhone] = React.useState('')
    const [doctorPhone, setDoctorPhone] = React.useState('')

    return (
      <div className="w-full max-w-lg space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Informations de contact</h3>
          <p className="text-sm text-muted-foreground">
            Numéros de téléphone pour votre dossier médical
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient-phone">Votre numéro *</Label>
            <PhoneInput
              id="patient-phone"
              value={patientPhone}
              onChange={(value) => setPatientPhone(value)}
              placeholder="06 12 34 56 78"
            />
            <p className="text-xs text-muted-foreground">
              Numéro principal pour vous contacter
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="emergency-phone">Contact d'urgence *</Label>
            <PhoneInput
              id="emergency-phone"
              value={emergencyPhone}
              onChange={(value) => setEmergencyPhone(value)}
              placeholder="01 23 45 67 89"
            />
            <p className="text-xs text-muted-foreground">
              Personne à prévenir en cas d'urgence
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="doctor-phone">Médecin traitant</Label>
            <PhoneInput
              id="doctor-phone"
              value={doctorPhone}
              onChange={(value) => setDoctorPhone(value)}
              placeholder="01 23 45 67 89"
            />
            <p className="text-xs text-muted-foreground">
              Numéro de votre médecin traitant (optionnel)
            </p>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple d\'usage dans un formulaire médical avec plusieurs champs téléphone.',
      },
    },
  },
}

export const AccessibilityDemo: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Accessibilité</h3>
        <p className="text-sm text-muted-foreground">
          Support complet navigation clavier et lecteurs d'écran
        </p>
      </div>
      
      <PhoneInput
        value="06 12 34 56 78"
        placeholder="Navigation avec Tab"
        aria-label="Numéro de téléphone du patient"
        aria-describedby="phone-help"
      />
      
      <p id="phone-help" className="text-xs text-muted-foreground">
        Utilisez Tab pour naviguer, les flèches pour vous déplacer dans le texte. 
        Le formatage se fait automatiquement pendant la saisie.
      </p>
      
      <div className="text-xs text-muted-foreground">
        <p><strong>Tests d'accessibilité:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>✓ Navigation clavier (Tab, Shift+Tab)</li>
          <li>✓ Focus ring visible</li>
          <li>✓ Attributs ARIA appropriés</li>
          <li>✓ Support lecteurs d'écran</li>
          <li>✓ Validation temps réel accessible</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Démonstration des fonctionnalités d\'accessibilité intégrées.',
      },
    },
  },
}