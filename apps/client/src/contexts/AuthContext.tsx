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
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize the API client once when the app starts
    if (typeof window !== 'undefined') {
      initializeApiClient({
        baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
        timeout: 10000
      })
      setIsInitialized(true)
    }
  }, [])

  // Don't render AuthProvider until client-side initialization is complete
  if (typeof window === 'undefined' || !isInitialized) {
    return <div>{children}</div>
  }

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
      isLoading: true,
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
  
  // Try to use the enhanced context first
  const enhancedContext = useContext(AuthContextEnhanced)
  if (enhancedContext) {
    return enhancedContext
  }
  
  // If enhanced context is not available, provide a loading state
  // This handles the case where the provider is not yet initialized
  return {
    user: null,
    isLoading: true,
    error: null,
    isInitialized: false,
    signUp: async () => { throw new Error('Auth not initialized yet') },
    signIn: async () => { throw new Error('Auth not initialized yet') },
    signOut: async () => { throw new Error('Auth not initialized yet') },
    refreshToken: async () => null,
    clearError: () => {},
    updateProfile: async () => { throw new Error('Auth not initialized yet') }
  }
}

export type { User } from "@repo/auth"