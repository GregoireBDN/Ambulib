// Constantes partagées pour l'authentification

// Routes de l'API NestJS
export const API_ROUTES = {
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
  SIGNOUT: '/auth/signout',
  REFRESH: '/auth/refresh',
  GOOGLE_LOGIN: '/auth/google/login',
  GOOGLE_CALLBACK: '/auth/google/callback',
  COMPLETE_PROFILE: '/auth/complete-profile',
} as const

// Routes frontend par défaut
export const FRONTEND_ROUTES = {
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  SIGNOUT: '/auth/signout',
  COMPLETE_PROFILE: '/auth/complete-profile',
  DASHBOARD: '/dashboard',
  HOME: '/',
} as const

// Configuration des sessions
export const SESSION_CONFIG = {
  COOKIE_NAME: 'ambulib-session',
  MAX_AGE: 7 * 24 * 60 * 60 * 1000, // 7 jours en millisecondes
  REFRESH_THRESHOLD: 15 * 60 * 1000, // Rafraîchir 15 min avant expiration
  REMEMBER_ME_DURATION: 30 * 24 * 60 * 60 * 1000, // 30 jours si "Se souvenir de moi"
} as const

// Configuration des timeouts par application
export const APP_TIMEOUTS = {
  CLIENT: 4 * 60 * 60 * 1000, // 4 heures pour les seniors
  FLEET: 2 * 60 * 60 * 1000, // 2 heures pour les opérationnels
  ADMIN: 30 * 60 * 1000, // 30 minutes pour les admins
  MOBILE: 7 * 24 * 60 * 60 * 1000, // 7 jours pour mobile
} as const

// Configuration OAuth
export const OAUTH_CONFIG = {
  GOOGLE_SCOPES: ['openid', 'profile', 'email'],
  REDIRECT_PARAM: 'redirect_to',
} as const

// Messages de validation
export const VALIDATION_MESSAGES = {
  REQUIRED: 'Ce champ est obligatoire',
  EMAIL_INVALID: 'Veuillez saisir une adresse email valide',
  PASSWORD_MIN_LENGTH: 'Le mot de passe doit contenir au moins 8 caractères',
  PASSWORD_WEAK: 'Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial',
  PHONE_INVALID: 'Veuillez saisir un numéro de téléphone valide',
  POSTAL_CODE_INVALID: 'Le code postal doit contenir 5 chiffres',
  AGE_INVALID: 'L\'âge doit être un nombre valide entre 0 et 150',
  NAME_TOO_SHORT: 'Ce champ doit contenir au moins 2 caractères',
  NAME_TOO_LONG: 'Ce champ ne peut pas dépasser 50 caractères',
} as const

// Configuration pour l'accessibilité (WCAG 2.1 AA)
export const ACCESSIBILITY_CONFIG = {
  FOCUS_TIMEOUT: 100, // ms pour les transitions de focus
  ERROR_ANNOUNCEMENT_DELAY: 500, // ms avant annonce erreur aux lecteurs d'écran
  SUCCESS_ANNOUNCEMENT_DELAY: 1000, // ms avant annonce succès
  MIN_TOUCH_TARGET: 44, // px minimum pour les zones tactiles
  COLOR_CONTRAST_RATIO: 4.5, // ratio minimum pour WCAG AA
} as const

// Événements personnalisés pour la communication entre composants
export const AUTH_EVENTS = {
  SIGNIN_SUCCESS: 'auth:signin:success',
  SIGNIN_ERROR: 'auth:signin:error',
  SIGNOUT: 'auth:signout',
  TOKEN_REFRESH: 'auth:token:refresh',
  SESSION_EXPIRED: 'auth:session:expired',
  PROFILE_UPDATED: 'auth:profile:updated',
} as const

// Configuration des logs
export const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3,
} as const

export type LogLevel = keyof typeof LOG_LEVELS