// Utilitaires d'authentification suivant les patterns Next.js 15
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { cache } from 'react'

// Types
export interface User {
  id: string
  firstName?: string
  lastName?: string
  email: string
  role: string
  companyId?: string
  isProfileComplete: boolean
  phone?: string
  birthDate?: string
  socialSecurity?: string
}

export interface Session {
  user: User
  expires: Date
}

// Configuration
const SESSION_COOKIE = 'ambulib-session'
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000 // 7 jours

// Utilitaires de session côté serveur
export async function createSession(user: User): Promise<void> {
  const expires = new Date(Date.now() + SESSION_DURATION)
  const session: Session = { user, expires }

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, JSON.stringify(session), {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get(SESSION_COOKIE)

  if (!sessionCookie?.value) {
    return null
  }

  try {
    const session = JSON.parse(sessionCookie.value) as Session
    
    // Vérifier si la session n'est pas expirée
    if (new Date(session.expires) < new Date()) {
      await destroySession()
      return null
    }

    return session
  } catch {
    await destroySession()
    return null
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

// Version cachée pour éviter les appels multiples
export const getCachedSession = cache(getSession)

// Fonction pour vérifier la session sans redirection (utile pour les API routes)
export async function verifySession(): Promise<User | null> {
  const session = await getCachedSession()
  return session?.user || null
}

// Utilitaires de protection
export async function verifyAuth(): Promise<Session> {
  const session = await getCachedSession()
  
  if (!session) {
    redirect('/auth/connexion')
  }

  return session
}

export async function verifyRole(allowedRoles: string[]): Promise<Session> {
  const session = await verifyAuth()
  
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/unauthorized')
  }

  return session
}

// Types pour les résultats d'authentification
interface AuthResult {
  success: boolean
  user?: User
  error?: string
}

// Méthodes d'authentification côté client/serveur
export async function signIn(email: string, password: string): Promise<AuthResult> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Identifiants incorrects'
      }
    }

    // Créer la session locale
    await createSession(data.user)

    return {
      success: true,
      user: data.user
    }
  } catch (error) {
    console.error('Erreur lors de la connexion:', error)
    return {
      success: false,
      error: 'Erreur de connexion au serveur'
    }
  }
}

export async function signUp(userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
  birthDate?: string
  socialSecurity?: string
}): Promise<AuthResult> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || 'Erreur lors de la création du compte'
      }
    }

    // Créer la session locale
    await createSession(data.user)

    return {
      success: true,
      user: data.user
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error)
    return {
      success: false,
      error: 'Erreur de connexion au serveur'
    }
  }
}

export async function signOut(): Promise<AuthResult> {
  try {
    // Détruire la session locale
    await destroySession()

    // Optionnel: informer le backend de la déconnexion
    try {
      await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/auth/logout`, {
        method: 'POST',
      })
    } catch (error) {
      // Ignorer les erreurs de déconnexion backend, la session locale est déjà détruite
      console.warn('Erreur lors de la déconnexion backend (ignorée):', error)
    }

    return {
      success: true
    }
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
    return {
      success: false,
      error: 'Erreur lors de la déconnexion'
    }
  }
}