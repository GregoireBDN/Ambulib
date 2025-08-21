import { useState, useEffect, useCallback } from 'react'
import { FormData } from '@/types/inscription'
import { validateStep } from '@/lib/validation/inscription'

const STORAGE_KEY = 'havrid-inscription-draft'

const initialFormData: FormData = {
  // Étape 1
  firstName: '',
  lastName: '',
  birthDate: '',
  phone: '',
  address: {
    street: '',
    postalCode: '',
    city: ''
  },
  
  // Étape 2
  email: '',
  password: '',
  confirmPassword: '',
  
  // Étape 3
  socialSecurity: '',
  allergies: '',
  medications: '',
  mobility: 'none',
  mobilityDetails: '',
  doctorName: '',
  doctorPhone: '',
  
  // Étape 4
  emergencyContact: {
    firstName: '',
    lastName: '',
    phone: '',
    relation: ''
  },
  acceptTerms: false
}

export const useFormStepper = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState<string>('')

  // Charger les données du localStorage au montage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setFormData({ ...initialFormData, ...parsed.formData })
        setCurrentStep(parsed.currentStep || 1)
      } catch (error: any) {
        console.warn('Impossible de charger le brouillon:', error)
      }
    }
  }, [])

  // Sauvegarder automatiquement les données
  const saveToStorage = useCallback((data: FormData, step: number) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        formData: data,
        currentStep: step,
        timestamp: Date.now()
      }))
    } catch (error: any) {
      console.warn('Impossible de sauvegarder le brouillon:', error)
    }
  }, [])

  // Mettre à jour un champ du formulaire
  const updateField = useCallback((field: keyof FormData, value: any) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value }
      
      // Sauvegarder automatiquement après une courte pause
      setTimeout(() => saveToStorage(newData, currentStep), 500)
      
      return newData
    })
    
    // Effacer l'erreur du champ modifié
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }, [currentStep, errors, saveToStorage])

  // Mettre à jour un champ d'adresse
  const updateAddressField = useCallback((field: keyof FormData['address'], value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        address: { ...prev.address, [field]: value }
      }
      
      setTimeout(() => saveToStorage(newData, currentStep), 500)
      return newData
    })
    
    if (errors[`address.${field}`]) {
      setErrors(prev => ({ ...prev, [`address.${field}`]: '' }))
    }
  }, [currentStep, errors, saveToStorage])

  // Mettre à jour un champ de contact d'urgence
  const updateEmergencyContactField = useCallback((field: keyof FormData['emergencyContact'], value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        emergencyContact: { ...prev.emergencyContact, [field]: value }
      }
      
      setTimeout(() => saveToStorage(newData, currentStep), 500)
      return newData
    })
    
    if (errors[`emergencyContact.${field}`]) {
      setErrors(prev => ({ ...prev, [`emergencyContact.${field}`]: '' }))
    }
  }, [currentStep, errors, saveToStorage])

  // Valider l'étape courante
  const validateCurrentStep = useCallback((): boolean => {
    const result = validateStep(currentStep, formData)
    
    if (!result.success) {
      const stepErrors: Record<string, string> = {}
      
      result.error.errors.forEach(error => {
        stepErrors[error.path.join('.')] = error.message
      })
      
      setErrors(stepErrors)
      return false
    }
    
    setErrors({})
    return true
  }, [currentStep, formData])

  // Vérifier la disponibilité de l'email
  const checkEmailAvailability = useCallback(async (email: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/check-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        console.error('Erreur lors de la vérification email:', response.status)
        return true // En cas d'erreur, on laisse passer pour éviter de bloquer l'utilisateur
      }

      const result = await response.json()
      return result.available
    } catch (error) {
      console.error('Erreur réseau lors de la vérification email:', error)
      return true // En cas d'erreur réseau, on laisse passer
    }
  }, [])

  // Passer à l'étape suivante avec vérification email
  const nextStep = useCallback(async () => {
    if (!validateCurrentStep()) {
      return
    }

    // Vérification spéciale pour l'étape 2 (sécurité) - vérifier l'email avant de passer à l'étape 3
    if (currentStep === 2 && formData.email) {
      setIsLoading(true)
      
      try {
        const isEmailAvailable = await checkEmailAvailability(formData.email)
        
        if (!isEmailAvailable) {
          setErrors(prev => ({
            ...prev,
            email: 'Cette adresse email est déjà utilisée. Veuillez en choisir une autre.'
          }))
          setSubmitError('Cette adresse email est déjà utilisée. Veuillez en choisir une autre ou vous connecter si vous avez déjà un compte.')
          setIsLoading(false)
          return
        }
        
        // Email disponible, nettoyer les erreurs
        setErrors(prev => ({ ...prev, email: '' }))
        setSubmitError('')
      } catch (error) {
        console.error('Erreur lors de la vérification email:', error)
        // En cas d'erreur, on laisse passer pour éviter de bloquer l'utilisateur
      } finally {
        setIsLoading(false)
      }
    }

    if (currentStep < 4) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      saveToStorage(formData, newStep)
      
      // Nettoyer les erreurs de soumission
      setSubmitError('')
      
      // Focus sur le premier champ de la nouvelle étape après un délai
      setTimeout(() => {
        const firstInput = document.querySelector(`[data-step="${newStep}"] input, [data-step="${newStep}"] select, [data-step="${newStep}"] textarea`) as HTMLElement
        firstInput?.focus()
      }, 100)
    }
  }, [currentStep, formData, validateCurrentStep, saveToStorage, checkEmailAvailability])

  // Revenir à l'étape précédente
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      saveToStorage(formData, newStep)
      
      // Nettoyer les erreurs de soumission
      setSubmitError('')
    }
  }, [currentStep, formData, saveToStorage])

  // Aller à une étape spécifique
  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= 4) {
      setCurrentStep(step)
      saveToStorage(formData, step)
    }
  }, [formData, saveToStorage])

  // Valider tout le formulaire
  const validateForm = useCallback((): boolean => {
    const errors: Record<string, string> = {}
    let hasErrors = false

    for (let step = 1; step <= 4; step++) {
      const result = validateStep(step, formData)
      if (!result.success) {
        result.error.errors.forEach(error => {
          errors[error.path.join('.')] = error.message
          hasErrors = true
        })
      }
    }

    if (hasErrors) {
      setErrors(errors)
      return false
    }

    return true
  }, [formData])

  // Nettoyer le localStorage
  const clearStorage = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  // Obtenir les labels des étapes
  const stepLabels = [
    'Vos informations',
    'Votre compte', 
    'Informations médicales',
    'Contact d\'urgence'
  ]

  // Fonction pour définir une erreur de soumission
  const setError = useCallback((error: string) => {
    setSubmitError(error)
  }, [])

  // Fonction pour nettoyer les erreurs
  const clearErrors = useCallback(() => {
    setErrors({})
    setSubmitError('')
  }, [])

  return {
    currentStep,
    setCurrentStep,
    formData,
    errors,
    isLoading,
    stepLabels,
    submitError,
    setIsLoading,
    setError,
    clearErrors,
    updateField,
    updateAddressField,
    updateEmergencyContactField,
    nextStep,
    prevStep,
    goToStep,
    validateCurrentStep,
    validateForm,
    clearStorage
  }
}