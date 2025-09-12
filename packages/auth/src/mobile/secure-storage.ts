// Utilitaires de stockage sécurisé pour React Native
// Compatible avec Expo SecureStore et React Native Keychain

import { type AuthResponse, type User } from '../types'

// Interface unifiée pour le stockage sécurisé
export interface SecureStorage {
  setItem(key: string, value: string): Promise<void>
  getItem(key: string): Promise<string | null>
  removeItem(key: string): Promise<void>
  clear(): Promise<void>
}

// Clés de stockage
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'ambulib_mobile_access_token',
  REFRESH_TOKEN: 'ambulib_mobile_refresh_token',
  USER_DATA: 'ambulib_mobile_user_data',
  BIOMETRIC_ENABLED: 'ambulib_mobile_biometric_enabled',
  REMEMBER_USER: 'ambulib_mobile_remember_user'
} as const

// Classe pour gérer le stockage sécurisé des données d'authentification
export class AuthSecureStorage {
  constructor(private storage: SecureStorage) {}

  // Stocker la réponse d'authentification complète
  async storeAuthResponse(authResponse: AuthResponse, rememberUser = false): Promise<void> {
    try {
      await Promise.all([
        this.storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, authResponse.accessToken),
        this.storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, authResponse.refreshToken),
        this.storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
          id: authResponse.id,
          firstName: authResponse.firstName,
          lastName: authResponse.lastName,
          email: authResponse.email,
          role: authResponse.role,
          companyId: authResponse.companyId,
          isProfileComplete: authResponse.isProfileComplete
        })),
        this.storage.setItem(STORAGE_KEYS.REMEMBER_USER, rememberUser.toString())
      ])
    } catch (error) {
      throw new Error(`Erreur lors du stockage sécurisé: ${error}`)
    }
  }

  // Récupérer les tokens stockés
  async getStoredTokens(): Promise<{
    accessToken: string
    refreshToken: string
    user: User
    shouldRemember: boolean
  } | null> {
    try {
      const [accessToken, refreshToken, userData, rememberUser] = await Promise.all([
        this.storage.getItem(STORAGE_KEYS.ACCESS_TOKEN),
        this.storage.getItem(STORAGE_KEYS.REFRESH_TOKEN),
        this.storage.getItem(STORAGE_KEYS.USER_DATA),
        this.storage.getItem(STORAGE_KEYS.REMEMBER_USER)
      ])

      if (!accessToken || !refreshToken || !userData) {
        return null
      }

      return {
        accessToken,
        refreshToken,
        user: JSON.parse(userData) as User,
        shouldRemember: rememberUser === 'true'
      }
    } catch (error) {
      console.warn('Erreur lors de la récupération des tokens:', error)
      return null
    }
  }

  // Récupérer seulement les données utilisateur (pour l'affichage)
  async getStoredUser(): Promise<User | null> {
    try {
      const userData = await this.storage.getItem(STORAGE_KEYS.USER_DATA)
      return userData ? JSON.parse(userData) as User : null
    } catch (error) {
      console.warn('Erreur lors de la récupération des données utilisateur:', error)
      return null
    }
  }

  // Mettre à jour seulement les données utilisateur
  async updateStoredUser(user: Partial<User>): Promise<void> {
    try {
      const currentUser = await this.getStoredUser()
      if (!currentUser) throw new Error('Aucun utilisateur stocké')

      const updatedUser = { ...currentUser, ...user }
      await this.storage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(updatedUser))
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour utilisateur: ${error}`)
    }
  }

  // Vérifier si l'authentification biométrique est activée
  async isBiometricEnabled(): Promise<boolean> {
    try {
      const enabled = await this.storage.getItem(STORAGE_KEYS.BIOMETRIC_ENABLED)
      return enabled === 'true'
    } catch {
      return false
    }
  }

  // Activer/désactiver l'authentification biométrique
  async setBiometricEnabled(enabled: boolean): Promise<void> {
    try {
      await this.storage.setItem(STORAGE_KEYS.BIOMETRIC_ENABLED, enabled.toString())
    } catch (error) {
      throw new Error(`Erreur lors de la configuration biométrique: ${error}`)
    }
  }

  // Effacer toutes les données d'authentification
  async clearAll(): Promise<void> {
    try {
      await Promise.all([
        this.storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
        this.storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
        this.storage.removeItem(STORAGE_KEYS.USER_DATA),
        this.storage.removeItem(STORAGE_KEYS.REMEMBER_USER),
        this.storage.removeItem(STORAGE_KEYS.BIOMETRIC_ENABLED)
      ])
    } catch (error) {
      throw new Error(`Erreur lors de l'effacement: ${error}`)
    }
  }

  // Effacer seulement les tokens (garder les préférences utilisateur)
  async clearTokens(): Promise<void> {
    try {
      await Promise.all([
        this.storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
        this.storage.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
        this.storage.removeItem(STORAGE_KEYS.USER_DATA)
      ])
    } catch (error) {
      throw new Error(`Erreur lors de l'effacement des tokens: ${error}`)
    }
  }
}

// Types pour expo-secure-store
interface SecureStoreInterface {
  setItemAsync: (key: string, value: string, options?: unknown) => Promise<void>
  getItemAsync: (key: string, options?: unknown) => Promise<string | null>
  deleteItemAsync: (key: string, options?: unknown) => Promise<void>
}

// Implémentation pour Expo SecureStore
export class ExpoSecureStorage implements SecureStorage {
  private SecureStore: SecureStoreInterface | null = null

  constructor() {
    try {
      // Import dynamique pour éviter les erreurs lors du build web
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      this.SecureStore = require('expo-secure-store')
    } catch {
      throw new Error('Expo SecureStore n\'est pas disponible. Assurez-vous d\'installer expo-secure-store.')
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    await this.SecureStore!.setItemAsync(key, value, {
      keychainService: 'ambulib_auth',
      requireAuthentication: false, // Peut être configuré selon les besoins
    })
  }

  async getItem(key: string): Promise<string | null> {
    return await this.SecureStore!.getItemAsync(key, {
      keychainService: 'ambulib_auth',
    })
  }

  async removeItem(key: string): Promise<void> {
    await this.SecureStore!.deleteItemAsync(key, {
      keychainService: 'ambulib_auth',
    })
  }

  async clear(): Promise<void> {
    // Expo SecureStore n'a pas de méthode clear globale
    // On doit supprimer chaque clé individuellement
    const keys = Object.values(STORAGE_KEYS)
    await Promise.all(keys.map(key => this.removeItem(key)))
  }
}

// Types pour react-native-keychain
interface KeychainInterface {
  setInternetCredentials: (server: string, username: string, password: string, options?: unknown) => Promise<void>
  getInternetCredentials: (server: string) => Promise<{ password: string } | null>
  resetInternetCredentials: (server: string) => Promise<void>
  ACCESS_CONTROL: {
    BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE: unknown
  }
  ACCESSIBLE: {
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: unknown
  }
}

// Implémentation pour React Native Keychain (alternative)
export class KeychainSecureStorage implements SecureStorage {
  private Keychain: KeychainInterface | null = null

  constructor() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      this.Keychain = require('react-native-keychain')
    } catch {
      throw new Error('React Native Keychain n\'est pas disponible. Assurez-vous d\'installer react-native-keychain.')
    }
  }

  async setItem(key: string, value: string): Promise<void> {
    await this.Keychain!.setInternetCredentials(key, 'ambulib', value, {
      accessControl: this.Keychain!.ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
      accessible: this.Keychain!.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    })
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const credentials = await this.Keychain!.getInternetCredentials(key)
      return credentials ? credentials.password : null
    } catch {
      return null
    }
  }

  async removeItem(key: string): Promise<void> {
    await this.Keychain!.resetInternetCredentials(key)
  }

  async clear(): Promise<void> {
    const keys = Object.values(STORAGE_KEYS)
    await Promise.all(keys.map(key => this.removeItem(key)))
  }
}

// Factory function pour créer le bon type de stockage selon l'environnement
export function createSecureStorage(type: 'expo' | 'keychain' = 'expo'): SecureStorage {
  switch (type) {
    case 'expo':
      return new ExpoSecureStorage()
    case 'keychain':
      return new KeychainSecureStorage()
    default:
      throw new Error(`Type de stockage sécurisé non supporté: ${type}`)
  }
}

// Instance par défaut (Expo SecureStore)
export function createAuthSecureStorage(storageType: 'expo' | 'keychain' = 'expo'): AuthSecureStorage {
  const storage = createSecureStorage(storageType)
  return new AuthSecureStorage(storage)
}