import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { SocialSecurityInput } from './social-security-input'
import { Label } from './label'

const meta: Meta<typeof SocialSecurityInput> = {
  title: "UI/SocialSecurityInput",
  component: SocialSecurityInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Composant spécialisé pour la saisie de numéros de sécurité sociale français (NIR) avec validation de la clé de contrôle et analyse des composants (sexe, année, mois, département).',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: {
      action: 'changed',
      description: 'Callback appelé avec (value, isValid, details) à chaque changement',
    },
    maskDisplay: {
      control: 'boolean',
      description: 'Masquer partiellement le numéro (1 ** ** ** *** *** 45)',
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
    placeholder: '1 23 45 67 890 123 45',
  },
}

export const WithValue: Story = {
  args: {
    value: '285037511600542',
    placeholder: '1 23 45 67 890 123 45',
  },
  parameters: {
    docs: {
      description: {
        story: 'SocialSecurityInput avec une valeur initiale. Le formatage et la validation se font automatiquement.',
      },
    },
  },
}

export const WithMasking: Story = {
  args: {
    value: '285037511600542',
    maskDisplay: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Option de masquage partiel pour la confidentialité (1 ** ** ** *** *** 45).',
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
        <Label htmlFor="nir-demo">Numéro de sécurité sociale</Label>
        <SocialSecurityInput
          id="nir-demo"
          value={value}
          onChange={(newValue, valid) => {
            setValue(newValue)
            setIsValid(valid)
          }}
          placeholder="1 23 45 67 890 123 45"
        />
        <p className="text-xs text-muted-foreground">
          {isValid === null ? 'Facultatif - 15 chiffres' : 
           isValid ? '✓ NIR valide' : 
           'NIR invalide ou incomplet'}
        </p>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'SocialSecurityInput avec label et feedback de validation temps réel.',
      },
    },
  },
}

export const WithError: Story = {
  args: {
    value: '12345678901234',
    error: 'Clé de contrôle incorrecte (attendue: 83)',
    placeholder: '1 23 45 67 890 123 45',
  },
  parameters: {
    docs: {
      description: {
        story: 'SocialSecurityInput avec message d\'erreur de validation.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    value: '2 85 03 75 116 005 42',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'SocialSecurityInput désactivé avec NIR pré-rempli.',
      },
    },
  },
}

export const ValidationDemo: Story = {
  render: () => {
    const [nir, setNir] = React.useState('')
    const [isValid, setIsValid] = React.useState<boolean | null>(null)
    const [details, setDetails] = React.useState<{ maskedValue?: string } | null>(null)

    // Exemples de NIR valides pour test
    const validExamples = [
      { nir: '285037511600542', description: 'Femme née 85/03 dans le 75 (Paris)' },
      { nir: '191057507200385', description: 'Homme né 91/05 dans le 75 (Paris)' },
      { nir: '267054304300118', description: 'Femme née 67/05 dans le 43 (Haute-Loire)' },
    ]

    return (
      <div className="w-full max-w-lg space-y-4">
        <div className="space-y-2">
          <Label htmlFor="validation-demo">Testez la validation NIR</Label>
          <SocialSecurityInput
            id="validation-demo"
            value={nir}
            onChange={(value, valid, detailsObj) => {
              setNir(value)
              setIsValid(valid)
              setDetails(detailsObj || null)
            }}
            placeholder="Tapez un numéro de sécurité sociale..."
          />
        </div>
        
        <div className="text-sm space-y-2">
          <p>
            <span className="font-medium">État:</span>{' '}
            <span className={
              isValid === null ? 'text-muted-foreground' :
              isValid ? 'text-green-600' : 'text-red-600'
            }>
              {isValid === null ? 'En attente' : 
               isValid ? '✓ NIR valide' : '✗ NIR invalide'}
            </span>
          </p>
          
          {nir && (
            <div className="bg-gray-50 p-3 rounded text-xs font-mono">
              <p><span className="font-medium">Saisie:</span> {nir}</p>
              <p><span className="font-medium">Formaté:</span> {nir.replace(/(\d)(\d{2})(\d{2})(\d{2})(\d{3})(\d{3})(\d{2})/, '$1 $2 $3 $4 $5 $6 $7')}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Exemples valides à tester:</p>
          <div className="space-y-1">
            {validExamples.map((example, index) => (
              <button
                key={index}
                onClick={() => setNir(example.nir)}
                className="block w-full text-left p-2 bg-blue-50 hover:bg-blue-100 rounded text-xs"
              >
                <p className="font-mono">{example.nir}</p>
                <p className="text-muted-foreground">{example.description}</p>
              </button>
            ))}
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          <p><strong>Format NIR français:</strong></p>
          <p>1 chiffre (sexe) + 2 (année) + 2 (mois) + 2 (département) + 3 (commune) + 3 (ordre) + 2 (clé contrôle)</p>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Démonstration complète de la validation NIR avec exemples.',
      },
    },
  },
}

export const MedicalForm: Story = {
  render: () => {
    const [patientNir, setPatientNir] = React.useState('')
    const [spouseNir, setSpouseNir] = React.useState('')
    const [showMasked, setShowMasked] = React.useState(false)

    return (
      <div className="w-full max-w-lg space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Informations administratives</h3>
          <p className="text-sm text-muted-foreground">
            Numéros de sécurité sociale pour remboursements
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient-nir">Votre numéro de sécurité sociale</Label>
            <SocialSecurityInput
              id="patient-nir"
              value={patientNir}
              onChange={(value) => setPatientNir(value)}
              placeholder="1 23 45 67 890 123 45"
              maskDisplay={showMasked}
            />
            <p className="text-xs text-muted-foreground">
              Facilite les remboursements de vos trajets médicaux
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="spouse-nir">NIR du conjoint (si applicable)</Label>
            <SocialSecurityInput
              id="spouse-nir"
              value={spouseNir}
              onChange={(value) => setSpouseNir(value)}
              placeholder="2 23 45 67 890 123 45"
              maskDisplay={showMasked}
            />
            <p className="text-xs text-muted-foreground">
              Pour ayant-droits et couverture familiale
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="mask-nir"
              checked={showMasked}
              onChange={(e) => setShowMasked(e.target.checked)}
              className="h-4 w-4"
            />
            <Label htmlFor="mask-nir" className="text-sm">
              Masquer partiellement les numéros
            </Label>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <p className="text-green-800 text-sm font-medium">
                Données sécurisées
              </p>
              <p className="text-green-700 text-sm mt-1">
                Les numéros de sécurité sociale sont chiffrés et protégés conformément au RGPD.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Exemple d\'usage dans un formulaire médical avec options de confidentialité.',
      },
    },
  },
}

export const NIRAnalysis: Story = {
  render: () => {
    const [nir, setNir] = React.useState('285037511600542')
    const [analysis, setAnalysis] = React.useState<string>('')

    const analyzeNIR = (nirString: string) => {
      const digits = nirString.replace(/\D/g, '')
      if (digits.length !== 15) return 'NIR incomplet'

      const sex = digits[0]
      const year = digits.substring(1, 3)
      const month = digits.substring(3, 5)
      const dept = digits.substring(5, 7)
      const commune = digits.substring(7, 10)
      const order = digits.substring(10, 13)
      const key = digits.substring(13, 15)

      const sexLabel = sex === '1' ? 'Homme' : sex === '2' ? 'Femme' : 'Invalide'
      const monthNames = ['', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
      const monthLabel = parseInt(month) >= 1 && parseInt(month) <= 12 ? monthNames[parseInt(month)] : 'Invalide'
      
      let deptLabel = 'Inconnu'
      const deptNum = parseInt(dept)
      if (deptNum >= 1 && deptNum <= 95) {
        deptLabel = `Département ${dept}`
      } else if (dept === '2A') {
        deptLabel = 'Corse-du-Sud'
      } else if (dept === '2B') {
        deptLabel = 'Haute-Corse'
      } else if (deptNum >= 97 && deptNum <= 98) {
        deptLabel = 'Outre-mer'
      }

      return `${sexLabel} né(e) en ${monthLabel} 19${year}, ${deptLabel}, commune ${commune}, ordre ${order}, clé ${key}`
    }

    React.useEffect(() => {
      setAnalysis(analyzeNIR(nir))
    }, [nir])

    return (
      <div className="w-full max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nir-analysis">Analyse du NIR</Label>
          <SocialSecurityInput
            id="nir-analysis"
            value={nir}
            onChange={(value) => setNir(value)}
            placeholder="1 23 45 67 890 123 45"
          />
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-medium text-blue-900 mb-2">Analyse des composants:</h4>
          <p className="text-sm text-blue-800">{analysis}</p>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p><strong>Structure du NIR:</strong></p>
          <div className="font-mono bg-gray-100 p-2 rounded">
            <p>S AA MM DD CCC OOO CC</p>
            <p className="text-[10px] mt-1">
              S=Sexe, AA=Année, MM=Mois, DD=Dept, CCC=Commune, OOO=Ordre, CC=Clé
            </p>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Démonstration de l\'analyse des composants du NIR français.',
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
      
      <SocialSecurityInput
        value="285037511600542"
        placeholder="Navigation avec Tab"
        aria-label="Numéro de sécurité sociale du patient"
        aria-describedby="nir-help"
      />
      
      <p id="nir-help" className="text-xs text-muted-foreground">
        Utilisez Tab pour naviguer, les flèches pour vous déplacer dans le texte. 
        Le formatage et la validation se font automatiquement.
      </p>
      
      <div className="text-xs text-muted-foreground">
        <p><strong>Tests d'accessibilité:</strong></p>
        <ul className="list-disc list-inside space-y-1">
          <li>✓ Navigation clavier (Tab, Shift+Tab)</li>
          <li>✓ Focus ring visible</li>
          <li>✓ Police monospace pour lisibilité</li>
          <li>✓ Attributs ARIA appropriés</li>
          <li>✓ Validation temps réel accessible</li>
          <li>✓ Messages d'erreur descriptifs</li>
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