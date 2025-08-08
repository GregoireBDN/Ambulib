/**
 * Module serveur pour l'authentification
 * Compatible avec Server Actions et environnements Node.js
 * Ne contient pas de code React ou createContext
 */

// Export du client API serveur
export {
  ServerAuthApiClient,
  initializeServerApiClient,
  getServerApiClient,
  type ServerApiConfig
} from './api-client-server'

// Export des types nécessaires côté serveur
export type {
  AuthResponse,
  SigninDto,
  SignupDto,
  User,
  Role,
  AuthProviderType,
  TokenPair,
  SessionData,
  CompleteProfileDto,
  ApiErrorResponse,
  RefreshTokenDto
} from '../types'

// Export des utilitaires d'erreur
export {
  AuthError,
  NetworkError,
  UnauthorizedError,
  ForbiddenError,
  ValidationError,
  getErrorMessage,
  createErrorFromApiResponse,
  ERROR_MESSAGES
} from '../utils/errors'

// Export des constantes utiles côté serveur
export {
  API_ROUTES,
  SESSION_CONFIG,
  APP_TIMEOUTS
} from '../utils/constants'

// Export des modules existants
export * from './actions'
export * from './middleware'