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

// Interface complète des données du formulaire d'inscription
export interface FormData {
  // Étape 1 : Identité
  firstName: string
  lastName: string
  birthDate: string
  phone: string
  address: Address

  // Étape 2 : Compte
  email: string
  password: string
  confirmPassword: string
  
  // Étape 2.5 : Vérification email (nouveau)
  emailVerified?: boolean
  verificationCode?: string

  // Étape 3 : Informations médicales
  socialSecurity?: string
  allergies?: string
  medications?: string
  mobility?: 'none' | 'wheelchair' | 'walker' | 'cane' | 'other'
  mobilityDetails?: string
  doctorName?: string
  doctorPhone?: string

  // Étape 4 : Contact d'urgence et finalisation
  emergencyContact: EmergencyContact
  acceptTerms: boolean
}

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
  onFieldChange: (field: keyof FormData, value: unknown) => void
  onSubmit: () => Promise<void>
}