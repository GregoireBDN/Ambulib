/**
 * Client API côté serveur - Compatible avec Server Actions
 * Ne doit pas importer de code React ou createContext
 */

import { type AuthResponse, type SignupDto, type SigninDto } from '../types'
import { AuthError, createErrorFromApiResponse } from '../utils/errors'

/**
 * Configuration du client API serveur
 */
export interface ServerApiConfig {
  baseUrl: string
  timeout?: number
  defaultHeaders?: Record<string, string>
}

/**
 * Client API pour utilisation côté serveur uniquement
 * Compatible avec Server Actions et environnements Node.js
 */
export class ServerAuthApiClient {
  private baseUrl: string
  private timeout: number
  private defaultHeaders: Record<string, string>

  constructor(config: ServerApiConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '')
    this.timeout = config.timeout || 10000
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.defaultHeaders
    }
  }

  /**
   * Méthode privée pour faire les appels HTTP avec gestion d'erreur
   */
  private async request(endpoint: string, options: RequestInit = {}): Promise<unknown> {
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url, {
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        },
        signal: controller.signal,
        ...options
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorData
        try {
          errorData = await response.json()
        } catch {
          // Ignorer les erreurs de parsing JSON
        }
        throw createErrorFromApiResponse(response, errorData)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new AuthError('Impossible de contacter le serveur. Vérifiez votre connexion.', 'NETWORK_ERROR', 0)
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new AuthError('La requête a pris trop de temps. Veuillez réessayer.', 'TIMEOUT', 0)
      }

      throw new AuthError(
        error instanceof Error ? error.message : 'Erreur inconnue lors de la requête',
        'API_ERROR'
      )
    }
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  async signUp(userData: SignupDto): Promise<AuthResponse> {
    return this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    })
  }

  /**
   * Connexion utilisateur
   */
  async signIn(credentials: SigninDto): Promise<AuthResponse> {
    return this.request('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials)
    })
  }

  /**
   * Rafraîchir les tokens d'authentification
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.request('/auth/refresh', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    })
  }

  /**
   * Déconnexion utilisateur
   */
  async signOut(accessToken: string): Promise<void> {
    return this.request('/auth/signout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
  }

  /**
   * Compléter le profil utilisateur
   */
  async completeProfile(accessToken: string, profileData: Record<string, unknown>): Promise<AuthResponse> {
    return this.request('/auth/complete-profile', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      body: JSON.stringify(profileData)
    })
  }

  /**
   * Obtenir l'URL de connexion Google OAuth
   */
  getGoogleLoginUrl(redirectTo?: string): string {
    const url = new URL(`${this.baseUrl}/auth/google/login`)
    if (redirectTo) {
      url.searchParams.set('redirect_to', redirectTo)
    }
    return url.toString()
  }

  /**
   * Valider les tokens JWT côté serveur (basique)
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
      const now = Math.floor(Date.now() / 1000)
      return payload.exp < now
    } catch {
      return true
    }
  }

  /**
   * Extraire le payload d'un JWT (sans vérification de signature)
   */
  decodeToken(token: string): Record<string, unknown> | null {
    try {
      return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    } catch {
      return null
    }
  }
}

/**
 * Instance globale du client API serveur
 */
let serverApiClient: ServerAuthApiClient | null = null

/**
 * Initialiser le client API serveur
 */
export function initializeServerApiClient(config: ServerApiConfig): ServerAuthApiClient {
  serverApiClient = new ServerAuthApiClient(config)
  return serverApiClient
}

/**
 * Obtenir l'instance du client API serveur
 */
export function getServerApiClient(): ServerAuthApiClient {
  if (!serverApiClient) {
    throw new AuthError(
      'Client API serveur non initialisé. Appelez initializeServerApiClient() d\'abord.',
      'API_CLIENT_NOT_INITIALIZED'
    )
  }
  return serverApiClient
}