import { useCallback, useEffect, useState } from 'react'
import { BasicFormData, SensitiveFormData, FormData } from '@/types/inscription'
import { useSecureStorage } from './useSecureStorage'

const STORAGE_KEYS = {
  BASIC_DATA: 'inscription-basic',
  CURRENT_STEP: 'inscription-step'
} as const

/**
 * Hook pour gestion sécurisée des données de formulaire
 * Conforme RGPD/CNIL : séparation données basiques/sensibles
 */
export const useSecureFormStorage = () => {
  const { setSecureItem, getSecureItem, removeSecureItem, EXPIRATION_CONFIG } = useSecureStorage()
  
  const [isLoading, setIsLoading] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [currentDraftId, setCurrentDraftId] = useState<string | null>(null)

  // Sauvegarder les données basiques dans localStorage chiffré
  const saveBasicData = useCallback(async (
    basicData: Partial<BasicFormData>,
    currentStep: number
  ): Promise<boolean> => {
    try {
      const success = await setSecureItem(
        STORAGE_KEYS.BASIC_DATA,
        basicData,
        {
          encrypt: true,
          expirationMs: EXPIRATION_CONFIG.BASIC_DATA, // 1 heure
          storageType: 'localStorage'
        }
      )

      if (success) {
        await setSecureItem(
          STORAGE_KEYS.CURRENT_STEP,
          currentStep,
          {
            encrypt: false, // Pas besoin de chiffrer le numéro d'étape
            expirationMs: EXPIRATION_CONFIG.BASIC_DATA,
            storageType: 'localStorage'
          }
        )
        setLastSaved(new Date())
      }

      return success
    } catch (error) {
      console.error('Erreur sauvegarde données basiques:', error)
      return false
    }
  }, [setSecureItem, EXPIRATION_CONFIG])

  // Sauvegarder les données sensibles côté serveur
  const saveSensitiveData = useCallback(async (
    sensitiveData: Partial<SensitiveFormData>
  ): Promise<{ success: boolean; draftId?: string; expiresAt?: Date }> => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/form-draft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Inclure les cookies de session
        body: JSON.stringify({
          sensitiveData
        })
      })

      const result = await response.json()
      
      if (result.success && result.draftId) {
        setCurrentDraftId(result.draftId)
        setLastSaved(new Date())
      }

      return result
    } catch (error) {
      console.error('Erreur sauvegarde données sensibles:', error)
      return { success: false }
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Charger les données basiques depuis localStorage
  const loadBasicData = useCallback(async (): Promise<{
    basicData: Partial<BasicFormData> | null;
    currentStep: number;
  }> => {
    try {
      const [basicData, currentStep] = await Promise.all([
        getSecureItem<Partial<BasicFormData>>(STORAGE_KEYS.BASIC_DATA),
        getSecureItem<number>(STORAGE_KEYS.CURRENT_STEP)
      ])

      return {
        basicData: basicData || null,
        currentStep: currentStep || 1
      }
    } catch (error) {
      console.error('Erreur chargement données basiques:', error)
      return {
        basicData: null,
        currentStep: 1
      }
    }
  }, [getSecureItem])

  // Charger les données sensibles depuis le serveur
  const loadSensitiveData = useCallback(async (
    draftId: string
  ): Promise<Partial<SensitiveFormData> | null> => {
    if (!draftId) return null

    setIsLoading(true)
    
    try {
      const response = await fetch(`/api/form-draft/${draftId}`, {
        credentials: 'include'
      })

      if (!response.ok) {
        return null
      }

      const result = await response.json()
      return result.success ? result.data : null
    } catch (error) {
      console.error('Erreur chargement données sensibles:', error)
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Sauvegarder toutes les données (hybride)
  const saveAllData = useCallback(async (
    formData: Partial<FormData>,
    currentStep: number
  ): Promise<boolean> => {
    try {
      // Séparer les données en basiques et sensibles
      const {
        // Données sensibles
        socialSecurity,
        allergies,
        medications,
        mobility,
        mobilityDetails,
        doctorName,
        doctorPhone,
        emergencyContact,
        ...basicData
      } = formData

      const sensitiveData: Partial<SensitiveFormData> = {
        socialSecurity,
        allergies,
        medications,
        mobility,
        mobilityDetails,
        doctorName,
        doctorPhone,
        emergencyContact: emergencyContact!
      }

      // Sauvegarder en parallèle
      const [basicSuccess, sensitiveResult] = await Promise.all([
        saveBasicData(basicData as Partial<BasicFormData>, currentStep),
        Object.values(sensitiveData).some(val => val !== undefined && val !== '')
          ? saveSensitiveData(sensitiveData)
          : Promise.resolve({ success: true })
      ])

      return basicSuccess && sensitiveResult.success
    } catch (error) {
      console.error('Erreur sauvegarde hybride:', error)
      return false
    }
  }, [saveBasicData, saveSensitiveData])

  // Charger toutes les données (hybride)
  const loadAllData = useCallback(async (): Promise<{
    formData: Partial<FormData>;
    currentStep: number;
  }> => {
    try {
      const { basicData, currentStep } = await loadBasicData()
      
      let sensitiveData: Partial<SensitiveFormData> | null = null
      
      // Si on a un draftId en cours, charger les données sensibles
      if (currentDraftId) {
        sensitiveData = await loadSensitiveData(currentDraftId)
      }

      // Reconstituer FormData complète
      const formData: Partial<FormData> = {
        ...basicData,
        ...sensitiveData
      }

      return { formData, currentStep }
    } catch (error) {
      console.error('Erreur chargement hybride:', error)
      return {
        formData: {},
        currentStep: 1
      }
    }
  }, [loadBasicData, loadSensitiveData, currentDraftId])

  // Nettoyer toutes les données
  const clearAllData = useCallback(async (): Promise<boolean> => {
    try {
      // Nettoyer localStorage
      removeSecureItem(STORAGE_KEYS.BASIC_DATA)
      removeSecureItem(STORAGE_KEYS.CURRENT_STEP)

      // Supprimer le brouillon serveur si existe
      if (currentDraftId) {
        await fetch(`/api/form-draft/${currentDraftId}`, {
          method: 'DELETE',
          credentials: 'include'
        })
        setCurrentDraftId(null)
      }

      setLastSaved(null)
      return true
    } catch (error) {
      console.error('Erreur nettoyage données:', error)
      return false
    }
  }, [removeSecureItem, currentDraftId])

  // Vérifier l'expiration et alerter l'utilisateur
  const checkExpiration = useCallback((): {
    basicExpired: boolean;
    basicTimeLeft: number | null;
    sensitiveWarning: boolean;
  } => {
    // Ici on pourrait implémenter la vérification d'expiration
    // Pour l'instant, retourner des valeurs par défaut
    return {
      basicExpired: false,
      basicTimeLeft: null,
      sensitiveWarning: false
    }
  }, [])

  // Auto-nettoyer au montage du composant
  useEffect(() => {
    const interval = setInterval(() => {
      // Nettoyer les données expirées automatiquement
      checkExpiration()
    }, 5 * 60 * 1000) // Vérifier toutes les 5 minutes

    return () => clearInterval(interval)
  }, [checkExpiration])

  return {
    // Sauvegarde
    saveBasicData,
    saveSensitiveData,
    saveAllData,
    
    // Chargement
    loadBasicData,
    loadSensitiveData,
    loadAllData,
    
    // Nettoyage
    clearAllData,
    
    // État
    isLoading,
    lastSaved,
    currentDraftId,
    
    // Monitoring
    checkExpiration
  }
}