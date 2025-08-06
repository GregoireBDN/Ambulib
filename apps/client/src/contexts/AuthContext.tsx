"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { AuthProvider as AuthProviderBase, useAuth as useAuthBase, initializeApiClient, type AuthContextValue } from "@repo/auth/client"

const AuthContext = createContext<any>(null)

interface AuthProviderProps {
  children: React.ReactNode
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
      {children}
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
  
  return useAuthBase()
}

export type { User } from "@repo/auth"