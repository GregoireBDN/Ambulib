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