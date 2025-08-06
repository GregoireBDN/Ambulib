'use client'

import React, { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react'
import { AuthApiClient, getApiClient } from './api-client'
import { type AuthResponse, type User, type SignupDto, type SigninDto } from '../types'
import { AuthError, getErrorMessage } from '../utils/errors'

// Types pour le contexte d'authentification
interface AuthState {
  user: User | null
  isLoading: boolean
  isInitialized: boolean
  error: string | null
}

interface AuthActions {
  signUp: (userData: SignupDto) => Promise<AuthResponse>
  signIn: (credentials: SigninDto) => Promise<AuthResponse>
  signOut: () => Promise<void>
  refreshToken: () => Promise<AuthResponse | null>
  clearError: () => void
  updateProfile: (updates: Partial<User>) => Promise<void>
}

export interface AuthContextValue extends AuthState, AuthActions {}

// Actions du reducer
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_INITIALIZED'; payload: boolean }
  | { type: 'CLEAR_ERROR' }

// Reducer pour la gestion d'état
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_USER':
      return { 
        ...state, 
        user: action.payload, 
        isLoading: false,
        error: null 
      }
    case 'SET_ERROR':
      return { 
        ...state, 
        error: action.payload, 
        isLoading: false 
      }
    case 'SET_INITIALIZED':
      return { ...state, isInitialized: action.payload }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    default:
      return state
  }
}

// État initial
const initialState: AuthState = {
  user: null,
  isLoading: true,
  isInitialized: false,
  error: null,
}

// Création du contexte
const AuthContext = createContext<AuthContextValue | null>(null)

// Provider Props
interface AuthProviderProps {
  children: ReactNode
  config?: {
    enableAutoRefresh?: boolean
    refreshInterval?: number
    storageKey?: string
  }
}

// Clés de stockage pour les tokens
const ACCESS_TOKEN_KEY = 'ambulib_access_token'
const REFRESH_TOKEN_KEY = 'ambulib_refresh_token'
const USER_KEY = 'ambulib_user'

export function AuthProvider({ 
  children, 
  config = {} 
}: AuthProviderProps) {
  const {
    enableAutoRefresh = true,
    refreshInterval = 15 * 60 * 1000, // 15 minutes
    storageKey = 'ambulib_auth'
  } = config

  const [state, dispatch] = useReducer(authReducer, initialState)
  const apiClient = getApiClient()

  // Utilitaires de stockage sécurisé
  const storeTokens = useCallback((authResponse: AuthResponse) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_KEY, authResponse.accessToken)
      localStorage.setItem(REFRESH_TOKEN_KEY, authResponse.refreshToken)
      localStorage.setItem(USER_KEY, JSON.stringify({
        id: authResponse.id,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        email: authResponse.email || '',
        role: authResponse.role,
        companyId: authResponse.companyId,
        isProfileComplete: authResponse.isProfileComplete
      }))
    }
  }, [])

  const clearTokens = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_KEY)
      localStorage.removeItem(REFRESH_TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }
  }, [])

  const getStoredTokens = useCallback(() => {
    if (typeof window === 'undefined') return null
    
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY)
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    const userStr = localStorage.getItem(USER_KEY)
    
    if (!accessToken || !refreshToken || !userStr) return null
    
    try {
      const user = JSON.parse(userStr) as User
      return { accessToken, refreshToken, user }
    } catch {
      return null
    }
  }, [])

  // Actions d'authentification
  const signUp = useCallback(async (userData: SignupDto): Promise<AuthResponse> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })
    
    try {
      const response = await apiClient.signUp(userData)
      
      storeTokens(response)
      dispatch({ type: 'SET_USER', payload: {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email || '',
        role: response.role,
        companyId: response.companyId,
        isProfileComplete: response.isProfileComplete
      }})
      
      return response
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [apiClient, storeTokens])

  const signIn = useCallback(async (credentials: SigninDto): Promise<AuthResponse> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'CLEAR_ERROR' })
    
    try {
      const response = await apiClient.signIn(credentials)
      
      storeTokens(response)
      dispatch({ type: 'SET_USER', payload: {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email || '',
        role: response.role,
        companyId: response.companyId,
        isProfileComplete: response.isProfileComplete
      }})
      
      return response
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [apiClient, storeTokens])

  const signOut = useCallback(async (): Promise<void> => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      const stored = getStoredTokens()
      if (stored?.refreshToken) {
        await apiClient.signOut(stored.refreshToken)
      }
    } catch (error) {
      // On continue même si la déconnexion serveur échoue
      console.warn('Erreur lors de la déconnexion serveur:', error)
    } finally {
      clearTokens()
      dispatch({ type: 'SET_USER', payload: null })
    }
  }, [apiClient, getStoredTokens, clearTokens])

  const refreshToken = useCallback(async (): Promise<AuthResponse | null> => {
    const stored = getStoredTokens()
    if (!stored?.refreshToken) return null
    
    try {
      const response = await apiClient.refreshToken(stored.refreshToken)
      
      storeTokens(response)
      dispatch({ type: 'SET_USER', payload: {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email || '',
        role: response.role,
        companyId: response.companyId,
        isProfileComplete: response.isProfileComplete
      }})
      
      return response
    } catch (error) {
      // Token de rafraîchissement invalide, on déconnecte l'utilisateur
      clearTokens()
      dispatch({ type: 'SET_USER', payload: null })
      return null
    }
  }, [apiClient, getStoredTokens, storeTokens, clearTokens])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const updateProfile = useCallback(async (updates: Partial<User>): Promise<void> => {
    if (!state.user) throw new AuthError('Utilisateur non connecté', 'UNAUTHORIZED', 401)
    
    dispatch({ type: 'SET_LOADING', payload: true })
    
    try {
      // Mettre à jour localement
      const updatedUser = { ...state.user, ...updates }
      dispatch({ type: 'SET_USER', payload: updatedUser })
      
      // Sauvegarder en local
      if (typeof window !== 'undefined') {
        localStorage.setItem(USER_KEY, JSON.stringify(updatedUser))
      }
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      dispatch({ type: 'SET_ERROR', payload: errorMessage })
      throw error
    }
  }, [state.user])

  // Initialisation de l'authentification au chargement
  useEffect(() => {
    const initializeAuth = async () => {
      const stored = getStoredTokens()
      
      if (stored) {
        // Vérifier si le token est encore valide
        const tokenData = stored.accessToken.split('.')[1]
        if (tokenData) {
          try {
            const payload = JSON.parse(atob(tokenData))
            const now = Math.floor(Date.now() / 1000)
            
            if (payload.exp > now) {
              // Token encore valide
              dispatch({ type: 'SET_USER', payload: stored.user })
            } else {
              // Token expiré, essayer de rafraîchir
              await refreshToken()
            }
          } catch {
            // Token malformé
            clearTokens()
          }
        }
      }
      
      dispatch({ type: 'SET_INITIALIZED', payload: true })
    }

    initializeAuth()
  }, [getStoredTokens, refreshToken, clearTokens])

  // Auto-refresh des tokens
  useEffect(() => {
    if (!enableAutoRefresh || !state.user) return

    const interval = setInterval(() => {
      refreshToken().catch(console.error)
    }, refreshInterval)

    return () => clearInterval(interval)
  }, [enableAutoRefresh, refreshInterval, state.user, refreshToken])

  const contextValue: AuthContextValue = {
    ...state,
    signUp,
    signIn,
    signOut,
    refreshToken,
    clearError,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

// Hook pour utiliser le contexte d'authentification
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  
  return context
}

// Hook pour vérifier si l'utilisateur est connecté
export function useIsAuthenticated(): boolean {
  const { user, isInitialized } = useAuth()
  return isInitialized && user !== null
}

// Hook pour vérifier les permissions
export function usePermissions() {
  const { user } = useAuth()
  
  const hasRole = useCallback((role: string | string[]): boolean => {
    if (!user) return false
    
    const roles = Array.isArray(role) ? role : [role]
    return roles.includes(user.role)
  }, [user])
  
  const hasCompanyAccess = useCallback((companyId?: number): boolean => {
    if (!user) return false
    if (!companyId) return true
    
    return user.companyId === companyId
  }, [user])
  
  return {
    hasRole,
    hasCompanyAccess,
    isClient: user?.role === 'CLIENT',
    isAdmin: user?.role === 'ADMIN',
    isFleetManager: user?.role === 'FLEET_MANAGER',
    isDriver: user?.role === 'AMBULANCE_DRIVER'
  }
}