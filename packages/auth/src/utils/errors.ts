// Classes d'erreurs standardisées pour l'authentification

export class AuthError extends Error {
  public readonly code: string
  public readonly statusCode?: number

  constructor(message: string, code: string = 'AUTH_ERROR', statusCode?: number) {
    super(message)
    this.name = 'AuthError'
    this.code = code
    this.statusCode = statusCode
  }
}

export class NetworkError extends AuthError {
  constructor(message: string = 'Erreur de réseau. Veuillez vérifier votre connexion.') {
    super(message, 'NETWORK_ERROR', 0)
    this.name = 'NetworkError'
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message: string = 'Accès non autorisé. Veuillez vous reconnecter.') {
    super(message, 'UNAUTHORIZED', 401)
    this.name = 'UnauthorizedError'
  }
}

export class ForbiddenError extends AuthError {
  constructor(message: string = 'Vous n\'avez pas les permissions nécessaires pour cette action.') {
    super(message, 'FORBIDDEN', 403)
    this.name = 'ForbiddenError'
  }
}

export class ValidationError extends AuthError {
  public readonly fieldErrors: Record<string, string[]>

  constructor(
    message: string = 'Les données saisies ne sont pas valides.',
    fieldErrors: Record<string, string[]> = {}
  ) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
    this.fieldErrors = fieldErrors
  }
}

export class TokenExpiredError extends AuthError {
  constructor(message: string = 'Votre session a expiré. Veuillez vous reconnecter.') {
    super(message, 'TOKEN_EXPIRED', 401)
    this.name = 'TokenExpiredError'
  }
}

export class RefreshTokenError extends AuthError {
  constructor(message: string = 'Impossible de rafraîchir la session. Veuillez vous reconnecter.') {
    super(message, 'REFRESH_TOKEN_ERROR', 401)
    this.name = 'RefreshTokenError'
  }
}

// Messages d'erreur standardisés et accessibles (WCAG)
export const ERROR_MESSAGES = {
  // Erreurs de connexion
  INVALID_CREDENTIALS: 'Adresse email ou mot de passe incorrect. Veuillez vérifier vos informations.',
  USER_NOT_FOUND: 'Aucun compte n\'est associé à cette adresse email.',
  ACCOUNT_LOCKED: 'Votre compte est temporairement verrouillé. Contactez le support.',
  
  // Erreurs d\'inscription
  USER_EXISTS: 'Un compte existe déjà avec cette adresse email.',
  WEAK_PASSWORD: 'Le mot de passe doit contenir au moins 8 caractères, une lettre, un chiffre et un caractère spécial.',
  INVALID_EMAIL: 'Veuillez saisir une adresse email valide.',
  
  // Erreurs de session
  SESSION_EXPIRED: 'Votre session a expiré. Veuillez vous reconnecter.',
  SESSION_INVALID: 'Session invalide. Veuillez vous reconnecter.',
  
  // Erreurs de permissions
  INSUFFICIENT_PERMISSIONS: 'Vous n\'avez pas les permissions nécessaires pour cette action.',
  ROLE_REQUIRED: 'Un rôle spécifique est requis pour accéder à cette fonctionnalité.',
  
  // Erreurs réseau
  NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion internet.',
  SERVER_ERROR: 'Erreur du serveur. Veuillez réessayer dans quelques instants.',
  TIMEOUT: 'La requête a pris trop de temps. Veuillez réessayer.',
  
  // Erreurs OAuth
  OAUTH_CANCELLED: 'Connexion annulée. Vous pouvez réessayer quand vous le souhaitez.',
  OAUTH_ERROR: 'Erreur lors de la connexion avec le service externe. Veuillez réessayer.',
  
  // Erreurs génériques
  UNKNOWN_ERROR: 'Une erreur inattendue s\'est produite. Veuillez réessayer.',
  MAINTENANCE: 'Service temporairement indisponible pour maintenance.'
} as const

// Fonction pour obtenir un message d'erreur user-friendly
export function getErrorMessage(error: unknown): string {
  if (error instanceof AuthError) {
    return error.message
  }
  
  if (error instanceof Error) {
    // Mapper les erreurs communes
    if (error.message.includes('fetch')) {
      return ERROR_MESSAGES.NETWORK_ERROR
    }
    if (error.message.includes('timeout')) {
      return ERROR_MESSAGES.TIMEOUT
    }
    return error.message
  }
  
  if (typeof error === 'string') {
    return error
  }
  
  return ERROR_MESSAGES.UNKNOWN_ERROR
}

// Fonction pour créer une erreur depuis une réponse API
export function createErrorFromApiResponse(
  response: { status: number; statusText: string }, 
  data?: { message?: string | string[]; error?: string }
): AuthError {
  const status = response.status
  let message = Array.isArray(data?.message) ? data.message.join(', ') : data?.message || response.statusText
  
  switch (status) {
    case 401:
      return new UnauthorizedError(message)
    case 403:
      return new ForbiddenError(message)
    case 400:
      return new ValidationError(message)
    case 422:
      return new ValidationError(message)
    default:
      return new AuthError(message, 'API_ERROR', status)
  }
}