export interface Address {
  street: string        // Adresse complète via autocomplete
  postalCode: string   // Auto-rempli par autocomplete
  city: string         // Auto-rempli par autocomplete
  complement?: string  // Informations supplémentaires (étage, digicode, etc.)
}

export interface EmergencyContact {
  firstName: string
  lastName: string
  phone: string
  relation: string
}

// Données non-sensibles (stockage local chiffré autorisé)
export interface BasicFormData {
  // Étape 1 : Identité basique
  firstName: string
  lastName: string
  birthDate: string
  phone: string
  address: Address

  // Étape 2 : Compte (non-médical)
  email: string
  password: string
  confirmPassword: string

  // Étape 4 : Finalisation
  acceptTerms: boolean
}

// Données sensibles médicales (stockage serveur uniquement)
export interface SensitiveFormData {
  // Étape 3 : Informations Médicales SENSIBLES
  socialSecurity?: string
  allergies?: string
  medications?: string
  mobility?: 'none' | 'wheelchair' | 'walker' | 'cane' | 'other'
  mobilityDetails?: string
  doctorName?: string
  doctorPhone?: string

  // Contact d'urgence (contient données médicales)
  emergencyContact: EmergencyContact
}

// Interface complète (union des deux)
export interface FormData extends BasicFormData, SensitiveFormData {}

export interface FormStep {
  id: string
  label: string
  description: string
  fields: (keyof FormData)[]
}

export interface FormStepperProps {
  currentStep: number
  totalSteps: number
  formData: FormData
  errors: Record<string, string>
  isLoading: boolean
  onStepChange: (step: number) => void
  onFieldChange: (field: keyof FormData, value: any) => void
  onSubmit: () => Promise<void>
}