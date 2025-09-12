// Client HTTP pour communiquer avec l'API NestJS Ambulib

import {
  AuthResponse,
  SignupDto,
  SigninDto,
  CompleteProfileDto,
  ApiErrorResponse,
} from '../types'
import {
  AuthError,
  NetworkError,
  createErrorFromApiResponse,
} from '../utils/errors'
import { API_ROUTES } from '../utils/constants'

export interface AuthApiClientConfig {
  baseUrl: string
  timeout?: number
  defaultHeaders?: Record<string, string>
}

export class AuthApiClient {
  private readonly baseUrl: string
  private readonly timeout: number
  private readonly defaultHeaders: Record<string, string>

  constructor(config: AuthApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '') // Remove trailing slash
    this.timeout = config.timeout || 10000 // 10s par défaut
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...config.defaultHeaders,
    }
  }

  /**
   * Méthode privée pour faire les appels HTTP avec gestion d'erreur
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.timeout)

      const response = await fetch(url, {
        headers: {
          ...this.defaultHeaders,
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        let errorData: ApiErrorResponse | undefined
        try {
          errorData = await response.json()
        } catch {
          // Si on ne peut pas parser la réponse JSON, utilise le status text
        }

        throw createErrorFromApiResponse(response, errorData)
      }

      return await response.json()
    } catch (error) {
      if (error instanceof AuthError) {
        throw error
      }

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new NetworkError('Impossible de contacter le serveur. Vérifiez votre connexion.')
      }

      if (error instanceof Error && error.name === 'AbortError') {
        throw new NetworkError('La requête a pris trop de temps. Veuillez réessayer.')
      }

      throw new AuthError(
        error instanceof Error ? error.message : 'Erreur inconnue lors de la requête'
      )
    }
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  async signUp(userData: SignupDto): Promise<AuthResponse> {
    return this.request<AuthResponse>(API_ROUTES.SIGNUP, {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  /**
   * Connexion utilisateur
   */
  async signIn(credentials: SigninDto): Promise<AuthResponse> {
    return this.request<AuthResponse>(API_ROUTES.SIGNIN, {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  /**
   * Rafraîchir les tokens d'authentification
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return this.request<AuthResponse>(API_ROUTES.REFRESH, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${refreshToken}`,
      },
    })
  }

  /**
   * Déconnexion utilisateur
   */
  async signOut(accessToken: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(API_ROUTES.SIGNOUT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    })
  }

  /**
   * Compléter le profil utilisateur
   */
  async completeProfile(
    accessToken: string,
    profileData: CompleteProfileDto
  ): Promise<AuthResponse> {
    return this.request<AuthResponse>(API_ROUTES.COMPLETE_PROFILE, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
    })
  }

  /**
   * Obtenir l'URL de connexion Google OAuth
   */
  getGoogleLoginUrl(redirectTo?: string): string {
    const url = new URL(`${this.baseUrl}${API_ROUTES.GOOGLE_LOGIN}`)
    if (redirectTo) {
      url.searchParams.set('redirect_to', redirectTo)
    }
    return url.toString()
  }

  /**
   * Valider les tokens JWT côté client (basique)
   */
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Math.floor(Date.now() / 1000)
      return payload.exp < now
    } catch {
      return true // Si on ne peut pas parser, considérer comme expiré
    }
  }

  /**
   * Extraire le payload d'un JWT (sans vérification de signature)
   */
  decodeToken(token: string): Record<string, unknown> | null {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch {
      return null
    }
  }

  /**
   * Méthode utilitaire pour faire des appels authentifiés
   */
  async authenticatedRequest<T>(
    endpoint: string,
    accessToken: string,
    options: RequestInit = {}
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers,
      },
    })
  }
}

// Instance par défaut (peut être override par les apps)
export let defaultApiClient: AuthApiClient | null = null

/**
 * Initialiser le client API par défaut
 */
export function initializeApiClient(config: AuthApiClientConfig): AuthApiClient {
  defaultApiClient = new AuthApiClient(config)
  return defaultApiClient
}

/**
 * Obtenir l'instance du client API
 */
export function getApiClient(): AuthApiClient {
  if (!defaultApiClient) {
    throw new AuthError(
      'Client API non initialisé. Appelez initializeApiClient() d\'abord.'
    )
  }
  return defaultApiClient
}