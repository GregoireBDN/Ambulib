"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@/lib/auth"

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  error: string | null
}

const AuthContext = createContext<AuthContextValue | null>(null)

interface AuthProviderProps {
  children: React.ReactNode
}

// AuthProvider simplifié utilisant les Server Actions et les cookies httpOnly
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Récupérer la session depuis le cookie côté client
    // Note: En production, utilisez plutôt un endpoint API pour récupérer la session
    async function loadSession() {
      try {
        setIsLoading(true)
        setError(null)

        // Appel à un endpoint API pour récupérer la session
        const response = await fetch('/api/auth/session', {
          credentials: 'include',
        })

        if (response.ok) {
          const sessionData = await response.json()
          // sessionData.user sera null si pas de session active
          setUser(sessionData.user || null)
        } else {
          throw new Error('Erreur lors de la récupération de la session')
        }
      } catch (err) {
        console.error('Erreur lors du chargement de la session:', err)
        setError('Impossible de charger la session utilisateur')
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    loadSession()
  }, [])

  // Les Server Actions gèrent automatiquement la mise à jour 
  // de la session après login/logout via redirect, donc pas besoin
  // de rafraîchissement manuel qui causerait des requêtes répétitives

  const value: AuthContextValue = {
    user,
    isLoading,
    error
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  
  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }
  
  return context
}

export type { User }