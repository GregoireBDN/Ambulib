import { useState, useEffect, useCallback } from 'react'
import { FormData } from '@/types/inscription'
import { validateStep } from '@/lib/validation/inscription'
import { useSecureFormStorage } from './useSecureFormStorage'

// DEPRECATED: Ancien système non-sécurisé
// const STORAGE_KEY = 'havrid-inscription-draft'

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
  
  // Hook de stockage sécurisé
  const secureStorage = useSecureFormStorage()

  // Charger les données sécurisées au montage
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        // Nettoyer d'abord l'ancien système non-sécurisé
        const oldData = localStorage.getItem('havrid-inscription-draft')
        if (oldData) {
          console.warn('Migration: suppression ancien stockage non-sécurisé')
          localStorage.removeItem('havrid-inscription-draft')
        }

        // Charger avec le nouveau système sécurisé
        const { formData: loadedData, currentStep: loadedStep } = await secureStorage.loadAllData()
        
        if (loadedData && Object.keys(loadedData).length > 0) {
          setFormData(prev => ({ ...prev, ...loadedData }))
          setCurrentStep(loadedStep)
        }
      } catch (error) {
        console.error('Erreur chargement données sécurisées:', error)
      }
    }

    loadStoredData()
  }, [secureStorage])

  // Sauvegarder automatiquement les données (système sécurisé)
  const saveToStorage = useCallback(async (data: FormData, step: number) => {
    try {
      // Utiliser le nouveau système de stockage hybride sécurisé
      await secureStorage.saveAllData(data, step)
    } catch (error: any) {
      console.error('Erreur sauvegarde sécurisée:', error)
    }
  }, [secureStorage])

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

  // Nettoyer le stockage sécurisé
  const clearStorage = useCallback(async () => {
    try {
      await secureStorage.clearAllData()
      console.log('Toutes les données sécurisées ont été supprimées')
    } catch (error) {
      console.error('Erreur nettoyage stockage sécurisé:', error)
    }
  }, [secureStorage])

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
    isLoading: isLoading || secureStorage.isLoading,
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
    clearStorage,
    
    // Nouvelles propriétés du stockage sécurisé
    lastSaved: secureStorage.lastSaved,
    checkExpiration: secureStorage.checkExpiration
  }
}