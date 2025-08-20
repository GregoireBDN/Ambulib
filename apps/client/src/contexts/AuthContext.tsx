"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { User } from "@/lib/auth"
import { parseSessionCookie, createCookieListener } from "@/lib/session-utils"

interface SignUpData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  birthDate?: string
  socialSecurity?: string
}

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (data: SignUpData) => Promise<void>
  signOut: () => Promise<void>
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
    // Lecture DIRECTE du cookie - synchronisation instantanée avec middleware
    // Plus d'appels API = plus de race conditions !
    let isMounted = true
    
    function loadSessionFromCookie() {
      if (!isMounted) return
      
      try {
        setIsLoading(true)
        setError(null)

        // Lecture directe du cookie (même logique que middleware)
        const sessionData = parseSessionCookie()
        setUser(sessionData?.user || null)
        
        console.log('📍 Session chargée depuis cookie:', sessionData?.user?.email || 'aucune session')
      } catch (err) {
        console.error('Erreur lors de la lecture du cookie:', err)
        setUser(null)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    // Chargement initial instantané
    loadSessionFromCookie()

    // Écouter les changements de cookies pour synchronisation temps réel
    const unsubscribe = createCookieListener((session) => {
      if (isMounted) {
        setUser(session?.user || null)
        console.log('🔄 Session mise à jour depuis cookie:', session?.user?.email || 'session expirée')
      }
    })

    // Cleanup function
    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  // Les Server Actions gèrent automatiquement la mise à jour 
  // de la session après login/logout via redirect, donc pas besoin
  // de rafraîchissement manuel qui causerait des requêtes répétitives

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true)
      setError(null)

      console.log('🔑 Tentative de connexion pour:', email)
      
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      console.log('📡 Réponse API status:', response.status, response.statusText)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }))
        console.error('❌ Erreur API:', errorData)
        setError(errorData.error || 'Identifiants incorrects')
        throw new Error(errorData.error || 'Erreur lors de la connexion')
      }

      const userData = await response.json()
      console.log('✅ Connexion réussie pour:', userData.user?.email)
      setUser(userData.user)
      
      // Laisser le middleware gérer la redirection après la mise à jour de l'état
      // Pas de redirection programmatique ici pour éviter les conflits
    } catch (err) {
      console.error('🚨 Erreur lors de la connexion:', err)
      if (!error) {
        setError('Erreur de connexion. Vérifiez vos identifiants.')
      }
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (data: SignUpData) => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'inscription')
      }

      const userData = await response.json()
      setUser(userData.user)
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err)
      setError('Erreur lors de la création du compte')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setIsLoading(true)
      setError(null)

      await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
      })

      setUser(null)
    } catch (err) {
      console.error('Erreur lors de la déconnexion:', err)
      setError('Erreur lors de la déconnexion')
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextValue = {
    user,
    isLoading,
    error,
    signIn,
    signUp,
    signOut
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