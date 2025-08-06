"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { AuthProvider as AuthProviderBase, useAuth as useAuthBase, initializeApiClient, type AuthContextValue } from "@repo/auth/client"
import { setAuthCookies, clearAuthCookies, getAuthCookies } from "@/lib/cookies"

const AuthContext = createContext<any>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

// Custom Auth Context that wraps the base provider with cookie handling
const AuthContextEnhanced = createContext<AuthContextValue | null>(null)

function AuthProviderWithCookies({ children }: { children: React.ReactNode }) {
  const auth = useAuthBase()
  
  // Override signIn to save tokens to cookies
  const signIn: AuthContextValue['signIn'] = async (credentials) => {
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
  }
  
  // Override signUp to save tokens to cookies
  const signUp: AuthContextValue['signUp'] = async (userData) => {
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
  }
  
  // Override signOut to clear cookies
  const signOut: AuthContextValue['signOut'] = async () => {
    await auth.signOut()
    clearAuthCookies()
  }
  
  return (
    <AuthContextEnhanced.Provider
      value={{
        ...auth,
        signIn,
        signUp,
        signOut,
      }}
    >
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
  
  // Use the enhanced context that includes cookie handling
  const context = useContext(AuthContextEnhanced)
  if (!context) {
    return useAuthBase() // Fallback to base provider
  }
  
  return context
}

export type { User } from "@repo/auth"