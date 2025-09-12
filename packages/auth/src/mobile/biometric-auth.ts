// Utilitaires d'authentification biométrique pour React Native
// Compatible avec Expo LocalAuthentication et React Native Biometrics

import { AuthSecureStorage } from './secure-storage'

// Types d'authentification biométrique supportés
export enum BiometricType {
  FINGERPRINT = 'fingerprint',
  FACE_ID = 'face_id',
  FACE_RECOGNITION = 'face_recognition',
  IRIS = 'iris'
}

// Statut de l'authentification biométrique
export interface BiometricStatus {
  isAvailable: boolean
  isEnrolled: boolean
  supportedTypes: BiometricType[]
  error?: string
}

// Résultat de l'authentification biométrique
export interface BiometricAuthResult {
  success: boolean
  error?: string
  cancelled?: boolean
}

// Interface unifiée pour l'authentification biométrique
export interface BiometricAuth {
  checkAvailability(): Promise<BiometricStatus>
  authenticate(options?: BiometricAuthOptions): Promise<BiometricAuthResult>
}

// Options pour l'authentification biométrique
export interface BiometricAuthOptions {
  promptMessage?: string
  cancelButtonText?: string
  fallbackButtonText?: string
  disableDeviceFallback?: boolean
}

// Classe principale pour gérer l'authentification biométrique
export class BiometricAuthManager {
  private biometricAuth: BiometricAuth
  private secureStorage: AuthSecureStorage

  constructor(biometricAuth: BiometricAuth, secureStorage: AuthSecureStorage) {
    this.biometricAuth = biometricAuth
    this.secureStorage = secureStorage
  }

  // Vérifier si l'authentification biométrique est disponible
  async checkBiometricAvailability(): Promise<BiometricStatus> {
    return await this.biometricAuth.checkAvailability()
  }

  // Configurer l'authentification biométrique pour l'utilisateur
  async enableBiometricAuth(options?: BiometricAuthOptions): Promise<boolean> {
    try {
      const status = await this.checkBiometricAvailability()
      if (!status.isAvailable || !status.isEnrolled) {
        throw new Error('L\'authentification biométrique n\'est pas disponible ou configurée')
      }

      const authResult = await this.biometricAuth.authenticate({
        promptMessage: 'Confirmez votre identité pour activer l\'authentification biométrique',
        cancelButtonText: 'Annuler',
        ...options
      })

      if (authResult.success) {
        await this.secureStorage.setBiometricEnabled(true)
        return true
      }

      return false
    } catch (error) {
      console.error('Erreur lors de l\'activation biométrique:', error)
      return false
    }
  }

  // Désactiver l'authentification biométrique
  async disableBiometricAuth(): Promise<void> {
    await this.secureStorage.setBiometricEnabled(false)
  }

  // Authentifier avec la biométrie pour accéder à l'application
  async authenticateWithBiometrics(options?: BiometricAuthOptions): Promise<BiometricAuthResult & { userData?: unknown }> {
    try {
      const isEnabled = await this.secureStorage.isBiometricEnabled()
      if (!isEnabled) {
        return { success: false, error: 'Authentification biométrique non activée' }
      }

      const authResult = await this.biometricAuth.authenticate({
        promptMessage: 'Utilisez votre empreinte digitale ou Face ID pour vous connecter',
        cancelButtonText: 'Utiliser le mot de passe',
        fallbackButtonText: 'Utiliser le mot de passe',
        ...options
      })

      if (authResult.success) {
        // Récupérer les données utilisateur après authentification réussie
        const storedData = await this.secureStorage.getStoredTokens()
        return {
          success: true,
          userData: storedData
        }
      }

      return authResult
    } catch (error) {
      return {
        success: false,
        error: `Erreur d'authentification biométrique: ${error}`
      }
    }
  }

  // Vérifier si l'authentification biométrique est activée pour l'utilisateur
  async isBiometricEnabled(): Promise<boolean> {
    return await this.secureStorage.isBiometricEnabled()
  }
}

// Types pour expo-local-authentication
interface LocalAuthInterface {
  hasHardwareAsync: () => Promise<boolean>
  isEnrolledAsync: () => Promise<boolean>
  supportedAuthenticationTypesAsync: () => Promise<number[]>
  authenticateAsync: (options: unknown) => Promise<{ success: boolean; error?: string }>
  AuthenticationType: {
    FINGERPRINT: number
    FACIAL_RECOGNITION: number
    IRIS: number
  }
}

// Implémentation pour Expo LocalAuthentication
export class ExpoLocalAuth implements BiometricAuth {
  private LocalAuthentication: LocalAuthInterface | null = null

  constructor() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      this.LocalAuthentication = require('expo-local-authentication')
    } catch {
      throw new Error('Expo LocalAuthentication n\'est pas disponible. Assurez-vous d\'installer expo-local-authentication.')
    }
  }

  async checkAvailability(): Promise<BiometricStatus> {
    try {
      const hasHardware = await this.LocalAuthentication!.hasHardwareAsync()
      const isEnrolled = await this.LocalAuthentication!.isEnrolledAsync()
      const supportedAuthenticationTypes = await this.LocalAuthentication!.supportedAuthenticationTypesAsync()

      const supportedTypes: BiometricType[] = []
      
      for (const type of supportedAuthenticationTypes) {
        switch (type) {
          case this.LocalAuthentication!.AuthenticationType.FINGERPRINT:
            supportedTypes.push(BiometricType.FINGERPRINT)
            break
          case this.LocalAuthentication!.AuthenticationType.FACIAL_RECOGNITION:
            supportedTypes.push(BiometricType.FACE_RECOGNITION)
            break
          case this.LocalAuthentication!.AuthenticationType.IRIS:
            supportedTypes.push(BiometricType.IRIS)
            break
        }
      }

      return {
        isAvailable: hasHardware,
        isEnrolled,
        supportedTypes
      }
    } catch (error) {
      return {
        isAvailable: false,
        isEnrolled: false,
        supportedTypes: [],
        error: `Erreur lors de la vérification: ${error}`
      }
    }
  }

  async authenticate(options: BiometricAuthOptions = {}): Promise<BiometricAuthResult> {
    try {
      const result = await this.LocalAuthentication!.authenticateAsync({
        promptMessage: options.promptMessage || 'Authentifiez-vous avec votre biométrie',
        cancelLabel: options.cancelButtonText || 'Annuler',
        fallbackLabel: options.fallbackButtonText || 'Utiliser le mot de passe',
        disableDeviceFallback: options.disableDeviceFallback || false,
      })

      if (result.success) {
        return { success: true }
      } else {
        return {
          success: false,
          cancelled: result.error === 'UserCancel',
          error: result.error
        }
      }
    } catch (error) {
      return {
        success: false,
        error: `Erreur d'authentification: ${error}`
      }
    }
  }
}

// Types pour react-native-biometrics
interface BiometricsInterface {
  isSensorAvailable: () => Promise<{ available: boolean; biometryType?: string }>
  simplePrompt: (options: unknown) => Promise<{ success: boolean; error?: string }>
}

// Implémentation pour React Native Biometrics (alternative)  
export class ReactNativeBiometrics implements BiometricAuth {
  private Biometrics: BiometricsInterface | null = null

  constructor() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { default: ReactNativeBiometrics } = require('react-native-biometrics')
      this.Biometrics = new ReactNativeBiometrics()
    } catch {
      throw new Error('React Native Biometrics n\'est pas disponible. Assurez-vous d\'installer react-native-biometrics.')
    }
  }

  async checkAvailability(): Promise<BiometricStatus> {
    try {
      const { available, biometryType } = await this.Biometrics!.isSensorAvailable()
      
      const supportedTypes: BiometricType[] = []
      if (biometryType) {
        switch (biometryType) {
          case 'TouchID':
          case 'Fingerprint':
            supportedTypes.push(BiometricType.FINGERPRINT)
            break
          case 'FaceID':
            supportedTypes.push(BiometricType.FACE_ID)
            break
        }
      }

      return {
        isAvailable: available,
        isEnrolled: available, // RN Biometrics ne distingue pas isEnrolled
        supportedTypes
      }
    } catch (error) {
      return {
        isAvailable: false,
        isEnrolled: false,
        supportedTypes: [],
        error: `Erreur lors de la vérification: ${error}`
      }
    }
  }

  async authenticate(options: BiometricAuthOptions = {}): Promise<BiometricAuthResult> {
    try {
      const { success, error } = await this.Biometrics!.simplePrompt({
        promptMessage: options.promptMessage || 'Authentifiez-vous avec votre biométrie',
        cancelButtonText: options.cancelButtonText || 'Annuler',
      })

      return {
        success,
        error: error || undefined,
        cancelled: error === 'User canceled'
      }
    } catch (error) {
      return {
        success: false,
        error: `Erreur d'authentification: ${error}`
      }
    }
  }
}

// Factory function pour créer le bon type d'authentification biométrique
export function createBiometricAuth(type: 'expo' | 'react-native-biometrics' = 'expo'): BiometricAuth {
  switch (type) {
    case 'expo':
      return new ExpoLocalAuth()
    case 'react-native-biometrics':
      return new ReactNativeBiometrics()
    default:
      throw new Error(`Type d'authentification biométrique non supporté: ${type}`)
  }
}

// Instance par défaut avec Expo LocalAuthentication
export function createBiometricAuthManager(
  secureStorage: AuthSecureStorage,
  biometricType: 'expo' | 'react-native-biometrics' = 'expo'
): BiometricAuthManager {
  const biometricAuth = createBiometricAuth(biometricType)
  return new BiometricAuthManager(biometricAuth, secureStorage)
}

// Messages d'erreur localisés pour l'accessibilité
export const BiometricErrorMessages = {
  NOT_AVAILABLE: 'L\'authentification biométrique n\'est pas disponible sur cet appareil.',
  NOT_ENROLLED: 'Aucune donnée biométrique n\'est enregistrée sur cet appareil. Veuillez configurer votre empreinte digitale ou Face ID dans les paramètres.',
  CANCELLED: 'Authentification annulée par l\'utilisateur.',
  FAILED: 'Échec de l\'authentification biométrique. Veuillez réessayer.',
  FALLBACK: 'Veuillez utiliser votre mot de passe pour vous connecter.',
  LOCKOUT: 'Trop de tentatives d\'authentification. Veuillez utiliser votre mot de passe.',
  SYSTEM_CANCEL: 'Authentification interrompue par le système.',
  USER_DISABLED: 'L\'utilisateur a désactivé l\'authentification biométrique.',
} as const