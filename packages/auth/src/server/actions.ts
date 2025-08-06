'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { AuthApiClient } from '../client/api-client'
import { validateFormData, signupSchema, signinSchema } from '../utils/validation'
import { type SignupDto, type SigninDto, type AuthResponse } from '../types'
import { getErrorMessage } from '../utils/errors'

// Configuration pour les cookies de session
const COOKIE_CONFIG = {
  ACCESS_TOKEN: 'ambulib_access_token',
  REFRESH_TOKEN: 'ambulib_refresh_token',
  USER_DATA: 'ambulib_user',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  maxAge: 24 * 60 * 60 * 1000, // 24 heures
}

// Initialiser le client API pour les server actions
function getApiClient(): AuthApiClient {
  const baseUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333'
  return new AuthApiClient({ baseUrl })
}

// Utilitaire pour stocker les tokens dans des cookies httpOnly
async function storeAuthCookies(authResponse: AuthResponse) {
  const cookieStore = await cookies()
  
  cookieStore.set(COOKIE_CONFIG.ACCESS_TOKEN, authResponse.accessToken, {
    httpOnly: COOKIE_CONFIG.httpOnly,
    secure: COOKIE_CONFIG.secure,
    sameSite: COOKIE_CONFIG.sameSite,
    maxAge: COOKIE_CONFIG.maxAge,
    path: '/'
  })
  
  cookieStore.set(COOKIE_CONFIG.REFRESH_TOKEN, authResponse.refreshToken, {
    httpOnly: COOKIE_CONFIG.httpOnly,
    secure: COOKIE_CONFIG.secure,
    sameSite: COOKIE_CONFIG.sameSite,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours pour le refresh token
    path: '/'
  })
  
  // Données utilisateur non sensibles pour l'usage côté client
  const userData = {
    id: authResponse.id,
    firstName: authResponse.firstName,
    lastName: authResponse.lastName,
    email: authResponse.email,
    role: authResponse.role,
    companyId: authResponse.companyId,
    isProfileComplete: authResponse.isProfileComplete
  }
  
  cookieStore.set(COOKIE_CONFIG.USER_DATA, JSON.stringify(userData), {
    httpOnly: false, // Accessible côté client pour l'affichage
    secure: COOKIE_CONFIG.secure,
    sameSite: COOKIE_CONFIG.sameSite,
    maxAge: COOKIE_CONFIG.maxAge,
    path: '/'
  })
}

// Utilitaire pour supprimer les cookies d'authentification
async function clearAuthCookies() {
  const cookieStore = await cookies()
  
  cookieStore.delete(COOKIE_CONFIG.ACCESS_TOKEN)
  cookieStore.delete(COOKIE_CONFIG.REFRESH_TOKEN)
  cookieStore.delete(COOKIE_CONFIG.USER_DATA)
}

// Server Action pour l'inscription
export async function signUpAction(formData: FormData) {
  try {
    // Extraire les données du formulaire
    const userData: SignupDto = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      age: formData.get('age') as string | undefined,
      phoneNumber: formData.get('phoneNumber') as string | undefined,
      postalCode: formData.get('postalCode') as string | undefined,
    }
    
    // Validation côté serveur
    const validation = validateFormData(signupSchema, userData)
    if (!validation.success) {
      return {
        success: false,
        errors: validation.errors
      }
    }
    
    // Inscription via l'API
    const apiClient = getApiClient()
    const authResponse = await apiClient.signUp(validation.data)
    
    // Stocker les tokens dans des cookies sécurisés
    await storeAuthCookies(authResponse)
    
    return {
      success: true,
      user: {
        id: authResponse.id,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        email: authResponse.email,
        role: authResponse.role,
        companyId: authResponse.companyId,
        isProfileComplete: authResponse.isProfileComplete
      }
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error)
    }
  }
}

// Server Action pour la connexion
export async function signInAction(formData: FormData) {
  try {
    // Extraire les données du formulaire
    const credentials: SigninDto = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    }
    
    // Validation côté serveur
    const validation = validateFormData(signinSchema, credentials)
    if (!validation.success) {
      return {
        success: false,
        errors: validation.errors
      }
    }
    
    // Connexion via l'API
    const apiClient = getApiClient()
    const authResponse = await apiClient.signIn(validation.data)
    
    // Stocker les tokens dans des cookies sécurisés
    await storeAuthCookies(authResponse)
    
    return {
      success: true,
      user: {
        id: authResponse.id,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        email: authResponse.email,
        role: authResponse.role,
        companyId: authResponse.companyId,
        isProfileComplete: authResponse.isProfileComplete
      }
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error)
    }
  }
}

// Server Action pour la déconnexion
export async function signOutAction() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get(COOKIE_CONFIG.REFRESH_TOKEN)?.value
    
    if (refreshToken) {
      const apiClient = getApiClient()
      await apiClient.signOut(refreshToken)
    }
  } catch (error) {
    // On continue même si la déconnexion serveur échoue
    console.warn('Erreur lors de la déconnexion serveur:', error)
  } finally {
    // Toujours supprimer les cookies locaux
    await clearAuthCookies()
  }
}

// Server Action pour rafraîchir le token
export async function refreshTokenAction() {
  try {
    const cookieStore = await cookies()
    const refreshToken = cookieStore.get(COOKIE_CONFIG.REFRESH_TOKEN)?.value
    
    if (!refreshToken) {
      await clearAuthCookies()
      return { success: false, error: 'Aucun token de rafraîchissement' }
    }
    
    const apiClient = getApiClient()
    const authResponse = await apiClient.refreshToken(refreshToken)
    
    // Stocker les nouveaux tokens
    await storeAuthCookies(authResponse)
    
    return {
      success: true,
      user: {
        id: authResponse.id,
        firstName: authResponse.firstName,
        lastName: authResponse.lastName,
        email: authResponse.email,
        role: authResponse.role,
        companyId: authResponse.companyId,
        isProfileComplete: authResponse.isProfileComplete
      }
    }
  } catch (error) {
    await clearAuthCookies()
    return {
      success: false,
      error: getErrorMessage(error)
    }
  }
}

// Server Action pour rediriger après authentification
export async function redirectAfterAuth(role: string, redirectPath?: string) {
  // Redirection personnalisée si fournie
  if (redirectPath) {
    redirect(redirectPath)
  }
  
  // Redirection par défaut basée sur le rôle
  switch (role) {
    case 'CLIENT':
      redirect('/dashboard')
    case 'FLEET_MANAGER':
      redirect('/fleet/dashboard')
    case 'AMBULANCE_DRIVER':
      redirect('/driver/dashboard')
    case 'ADMIN':
      redirect('/admin/dashboard')
    default:
      redirect('/dashboard')
  }
}

// Utilitaire pour récupérer l'utilisateur depuis les cookies (côté serveur)
export async function getServerUser() {
  try {
    const cookieStore = await cookies()
    const userData = cookieStore.get(COOKIE_CONFIG.USER_DATA)?.value
    
    if (!userData) return null
    
    return JSON.parse(userData)
  } catch {
    return null
  }
}

// Utilitaire pour vérifier l'authentification côté serveur
export async function requireAuth() {
  const user = await getServerUser()
  
  if (!user) {
    redirect('/auth/signin')
  }
  
  return user
}

// Utilitaire pour vérifier un rôle spécifique côté serveur
export async function requireRole(requiredRole: string | string[]) {
  const user = await requireAuth()
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  
  if (!roles.includes(user.role)) {
    throw new Error('Accès non autorisé')
  }
  
  return user
}

// Types pour les réponses des server actions
export interface ServerActionResponse<T = any> {
  success: boolean
  data?: T
  user?: {
    id: number
    firstName: string
    lastName: string
    email?: string
    role: string
    companyId?: number
    isProfileComplete: boolean
  }
  errors?: Record<string, string[]>
  error?: string
}