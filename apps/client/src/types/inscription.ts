export interface Address {
  street: string
  postalCode: string
  city: string
}

export interface EmergencyContact {
  firstName: string
  lastName: string
  phone: string
  relation: string
}

export interface FormData {
  // Étape 1 : Identité & Contact
  firstName: string
  lastName: string
  birthDate: string
  phone: string
  address: Address

  // Étape 2 : Compte & Sécurité
  email: string
  password: string
  confirmPassword: string

  // Étape 3 : Informations Médicales
  socialSecurity?: string
  allergies?: string
  medications?: string
  mobility?: 'none' | 'wheelchair' | 'walker' | 'cane' | 'other'
  mobilityDetails?: string
  doctorName?: string
  doctorPhone?: string

  // Étape 4 : Contact d'Urgence & Finalisation
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
  onFieldChange: (field: keyof FormData, value: any) => void
  onSubmit: () => Promise<void>
}