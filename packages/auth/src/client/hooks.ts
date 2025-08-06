'use client'

import { useCallback, useEffect, useState } from 'react'
import { useAuth, usePermissions } from './auth-context'
import { type SignupDto, type SigninDto, type User } from '../types'
import { validateFormData, signupSchema, signinSchema } from '../utils/validation'

// Hook pour gérer les formulaires d'inscription
export function useSignUpForm() {
  const { signUp, isLoading, error, clearError } = useAuth()
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  const validateAndSignUp = useCallback(async (formData: SignupDto) => {
    clearError()
    setValidationErrors({})

    // Validation côté client
    const validation = validateFormData(signupSchema, formData)
    if (!validation.success) {
      setValidationErrors(validation.errors)
      return { success: false, errors: validation.errors }
    }

    try {
      const response = await signUp(validation.data)
      return { success: true, data: response }
    } catch (authError) {
      return { success: false, authError }
    }
  }, [signUp, clearError])

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({})
  }, [])

  return {
    validateAndSignUp,
    isLoading,
    error,
    validationErrors,
    clearError,
    clearValidationErrors
  }
}

// Hook pour gérer les formulaires de connexion
export function useSignInForm() {
  const { signIn, isLoading, error, clearError } = useAuth()
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  const validateAndSignIn = useCallback(async (formData: SigninDto) => {
    clearError()
    setValidationErrors({})

    // Validation côté client
    const validation = validateFormData(signinSchema, formData)
    if (!validation.success) {
      setValidationErrors(validation.errors)
      return { success: false, errors: validation.errors }
    }

    try {
      const response = await signIn(validation.data)
      return { success: true, data: response }
    } catch (authError) {
      return { success: false, authError }
    }
  }, [signIn, clearError])

  const clearValidationErrors = useCallback(() => {
    setValidationErrors({})
  }, [])

  return {
    validateAndSignIn,
    isLoading,
    error,
    validationErrors,
    clearError,
    clearValidationErrors
  }
}

// Hook pour la protection des routes avec redirection
export function useAuthGuard(options: {
  redirectTo?: string
  requireRole?: string | string[]
  requireCompany?: number
} = {}) {
  const { user, isInitialized, isLoading } = useAuth()
  const { hasRole, hasCompanyAccess } = usePermissions()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    if (!isInitialized || isLoading) return

    // Pas d'utilisateur connecté
    if (!user) {
      setShouldRedirect(true)
      return
    }

    // Vérification des rôles si requis
    if (options.requireRole && !hasRole(options.requireRole)) {
      setShouldRedirect(true)
      return
    }

    // Vérification de l'entreprise si requis
    if (options.requireCompany && !hasCompanyAccess(options.requireCompany)) {
      setShouldRedirect(true)
      return
    }

    setShouldRedirect(false)
  }, [user, isInitialized, isLoading, options.requireRole, options.requireCompany, hasRole, hasCompanyAccess])

  return {
    isAuthenticated: !!user,
    isAuthorized: !shouldRedirect,
    shouldRedirect,
    isLoading: isLoading || !isInitialized,
    redirectTo: options.redirectTo || '/auth/signin'
  }
}

// Hook pour vérifier le statut du profil utilisateur
export function useProfileStatus() {
  const { user } = useAuth()

  const isProfileComplete = user?.isProfileComplete ?? false
  const needsProfileCompletion = user && !user.isProfileComplete

  return {
    isProfileComplete,
    needsProfileCompletion,
    user
  }
}

// Hook pour gérer la déconnexion avec confirmation
export function useSignOut() {
  const { signOut, isLoading } = useAuth()
  const [isConfirming, setIsConfirming] = useState(false)

  const requestSignOut = useCallback(() => {
    setIsConfirming(true)
  }, [])

  const confirmSignOut = useCallback(async () => {
    await signOut()
    setIsConfirming(false)
  }, [signOut])

  const cancelSignOut = useCallback(() => {
    setIsConfirming(false)
  }, [])

  return {
    signOut: requestSignOut,
    confirmSignOut,
    cancelSignOut,
    isConfirming,
    isLoading
  }
}

// Hook pour la gestion automatique des erreurs d'authentification
export function useAuthErrorHandler() {
  const { error, clearError } = useAuth()
  const [displayError, setDisplayError] = useState<string | null>(null)

  useEffect(() => {
    if (error) {
      setDisplayError(error)
      
      // Auto-clear après 5 secondes pour les erreurs non critiques
      const timer = setTimeout(() => {
        clearError()
        setDisplayError(null)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error, clearError])

  const dismissError = useCallback(() => {
    clearError()
    setDisplayError(null)
  }, [clearError])

  return {
    error: displayError,
    dismissError,
    hasError: !!displayError
  }
}

// Hook pour surveiller l'état de la session
export function useSessionMonitor() {
  const { user, refreshToken } = useAuth()
  const [sessionExpiring, setSessionExpiring] = useState(false)
  const [sessionExpired, setSessionExpired] = useState(false)

  useEffect(() => {
    if (!user) {
      setSessionExpiring(false)
      setSessionExpired(false)
      return
    }

    // Surveillance des tokens avec localStorage
    const checkSession = () => {
      if (typeof window === 'undefined') return

      const accessToken = localStorage.getItem('ambulib_access_token')
      if (!accessToken) {
        setSessionExpired(true)
        return
      }

      try {
        const payload = JSON.parse(atob(accessToken.split('.')[1]))
        const now = Math.floor(Date.now() / 1000)
        const timeUntilExpiry = payload.exp - now

        // Session expire dans moins de 2 minutes
        if (timeUntilExpiry < 120 && timeUntilExpiry > 0) {
          setSessionExpiring(true)
        } else if (timeUntilExpiry <= 0) {
          setSessionExpired(true)
        }
      } catch {
        setSessionExpired(true)
      }
    }

    // Vérifier immédiatement puis toutes les minutes
    checkSession()
    const interval = setInterval(checkSession, 60000)

    return () => clearInterval(interval)
  }, [user])

  const extendSession = useCallback(async () => {
    try {
      await refreshToken()
      setSessionExpiring(false)
      setSessionExpired(false)
    } catch {
      setSessionExpired(true)
    }
  }, [refreshToken])

  return {
    sessionExpiring,
    sessionExpired,
    extendSession
  }
}

// Hook pour la gestion du mode hors ligne
export function useOfflineAuth() {
  const { user } = useAuth()
  const [isOnline, setIsOnline] = useState(true)
  const [offlineUser, setOfflineUser] = useState<User | null>(null)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  useEffect(() => {
    if (!isOnline && user) {
      // Sauvegarder les données utilisateur pour usage hors ligne
      setOfflineUser(user)
    } else if (isOnline) {
      // Réinitialiser le mode hors ligne
      setOfflineUser(null)
    }
  }, [isOnline, user])

  return {
    isOnline,
    currentUser: isOnline ? user : offlineUser,
    isOfflineMode: !isOnline && !!offlineUser
  }
}