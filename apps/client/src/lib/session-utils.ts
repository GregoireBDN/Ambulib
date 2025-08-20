import { User } from './auth'

interface SessionCookie {
  user: User
  expires: string
}

/**
 * Parse le cookie de session côté client avec la MÊME logique que le middleware
 * Garantit une synchronisation parfaite entre server et client
 */
export function parseSessionCookie(): SessionCookie | null {
  // Vérifier si on est côté client
  if (typeof window === 'undefined') return null
  
  // Récupérer le cookie ambulib-session
  const sessionCookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('ambulib-session='))
    ?.split('=')[1]
    
  if (!sessionCookie) return null
  
  try {
    const sessionData = JSON.parse(decodeURIComponent(sessionCookie))
    
    // Vérifier l'expiration (même logique que middleware)
    if (new Date(sessionData.expires) <= new Date()) {
      return null
    }
    
    return sessionData
  } catch (error) {
    console.warn('Erreur lors du parsing du cookie de session:', error)
    return null
  }
}

/**
 * Écoute les changements de cookies pour synchronisation temps réel
 */
export function createCookieListener(callback: (session: SessionCookie | null) => void) {
  let lastSession = parseSessionCookie()
  
  const interval = setInterval(() => {
    const currentSession = parseSessionCookie()
    const hasChanged = JSON.stringify(lastSession) !== JSON.stringify(currentSession)
    
    if (hasChanged) {
      lastSession = currentSession
      callback(currentSession)
    }
  }, 1000) // Vérification légère toutes les secondes
  
  return () => clearInterval(interval)
}