"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { AuthProvider as AuthProviderBase, useAuth as useAuthBase, initializeApiClient, type AuthContextValue } from "@repo/auth/client"
import { setAuthCookies, clearAuthCookies, getAuthCookies } from "@/lib/cookies"

interface AuthProviderProps {
  children: React.ReactNode
}

// Enhanced Auth Context that handles cookies
const AuthContextEnhanced = createContext<AuthContextValue | null>(null)

// Auth provider with cookie integration  
function AuthProviderWithCookies({ children }: { children: React.ReactNode }) {
  const auth = useAuthBase()
  
  // Enhanced signIn that saves to cookies
  const signIn = useCallback<AuthContextValue['signIn']>(async (credentials) => {
    const result = await auth.signIn(credentials)
    
    // Save tokens to cookies for middleware access
    setAuthCookies(result.accessToken, result.refreshToken, {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      role: result.role,
      companyId: result.companyId,
      isProfileComplete: result.isProfileComplete
    })
    
    return result
  }, [auth])
  
  // Enhanced signUp that saves to cookies
  const signUp = useCallback<AuthContextValue['signUp']>(async (userData) => {
    const result = await auth.signUp(userData)
    
    // Save tokens to cookies for middleware access
    setAuthCookies(result.accessToken, result.refreshToken, {
      id: result.id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      role: result.role,
      companyId: result.companyId,
      isProfileComplete: result.isProfileComplete
    })
    
    return result
  }, [auth])
  
  // Enhanced signOut that clears cookies
  const signOut = useCallback<AuthContextValue['signOut']>(async () => {
    await auth.signOut()
    clearAuthCookies()
  }, [auth])
  
  const enhancedAuth: AuthContextValue = {
    ...auth,
    signIn,
    signUp,
    signOut,
  }
  
  return (
    <AuthContextEnhanced.Provider value={enhancedAuth}>
      {children}
    </AuthContextEnhanced.Provider>
  )
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Mark as client-side to avoid hydration mismatch
    setIsClient(true)
    
    // Initialize the API client once when the app starts
    const initializeAPI = async () => {
      try {
        console.log('Initializing API client...')
        initializeApiClient({
          baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
          timeout: 10000
        })
        console.log('API client initialized successfully')
      } catch (error) {
        console.error('Failed to initialize API client:', error)
        // Continue anyway - the app should still work
      }
    }
    
    initializeAPI()
  }, [])

  // Show consistent loading only during SSR and initial hydration
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    )
  }

  // Once client-side, always render the auth providers
  return (
    <AuthProviderBase>
      <AuthProviderWithCookies>
        {children}
      </AuthProviderWithCookies>
    </AuthProviderBase>
  )
}

export function useAuth(): AuthContextValue {
  // Provide safe defaults during SSR
  if (typeof window === 'undefined') {
    return {
      user: null,
      isLoading: false, // Don't block during SSR
      error: null,
      isInitialized: false,
      signUp: async () => { throw new Error('SSR: Auth not available') },
      signIn: async () => { throw new Error('SSR: Auth not available') },
      signOut: async () => { throw new Error('SSR: Auth not available') },
      refreshToken: async () => null,
      clearError: () => {},
      updateProfile: async () => { throw new Error('SSR: Auth not available') }
    }
  }
  
  // Try to use the enhanced context 
  const enhancedContext = useContext(AuthContextEnhanced)
  if (enhancedContext) {
    return enhancedContext
  }
  
  // If no context is available, this means we're outside the provider
  // Return a safe default state instead of staying in loading forever
  return {
    user: null,
    isLoading: false, // Don't stay loading forever!
    error: null,
    isInitialized: true,
    signUp: async () => { throw new Error('AuthProvider not found') },
    signIn: async () => { throw new Error('AuthProvider not found') },
    signOut: async () => { throw new Error('AuthProvider not found') },
    refreshToken: async () => null,
    clearError: () => {},
    updateProfile: async () => { throw new Error('AuthProvider not found') }
  }
}

export type { User } from "@repo/auth"