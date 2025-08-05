import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { ApiClient } from "../api/apiClient";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isProfileComplete: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
}

class AuthService {
  private apiClient: ApiClient;
  private readonly ACCESS_TOKEN_KEY = "access_token";
  private readonly REFRESH_TOKEN_KEY = "refresh_token";
  private readonly USER_KEY = "user_data";
  private readonly BIOMETRIC_ENABLED_KEY = "biometric_enabled";

  constructor() {
    this.apiClient = ApiClient.getInstance();
    // Configurer l'ApiClient avec cette instance d'AuthService
    this.apiClient.setAuthService(this);
  }

  // Authentification par email/mot de passe
  async login(
    credentials: LoginCredentials
  ): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      console.log("🔐 Tentative de connexion avec:", {
        email: credentials.email,
      });

      const response = await this.apiClient.post<{
        id: number;
        firstName: string;
        lastName: string;
        role: string;
        isProfileComplete: boolean;
        accessToken: string;
        refreshToken: string;
      }>("/auth/signin", credentials);

      console.log("✅ Connexion réussie:", response);

      // Transformer la réponse de l'API au format attendu par l'app mobile
      const user: User = {
        id: response.id,
        email: credentials.email, // L'API ne retourne pas l'email, on l'utilise depuis credentials
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
        isProfileComplete: response.isProfileComplete,
      };

      const tokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: 3600, // Valeur par défaut, l'API ne retourne pas cette info
      };

      await this.storeTokens(tokens);
      await this.storeUser(user);

      return { user, tokens };
    } catch (error) {
      console.error("❌ Erreur de connexion:", error);
      throw this.handleAuthError(error);
    }
  }

  // Inscription
  async signup(
    signupData: SignupData
  ): Promise<{ user: User; tokens: AuthTokens }> {
    try {
      console.log("📝 Tentative d'inscription avec:", {
        email: signupData.email,
        firstName: signupData.firstName,
        lastName: signupData.lastName,
      });

      const response = await this.apiClient.post<{
        id: number;
        firstName: string;
        lastName: string;
        role: string;
        isProfileComplete: boolean;
        accessToken: string;
        refreshToken: string;
      }>("/auth/signup", signupData);

      console.log("✅ Inscription réussie:", response);

      // Transformer la réponse de l'API au format attendu par l'app mobile
      const user: User = {
        id: response.id,
        email: signupData.email, // L'API ne retourne pas l'email, on l'utilise depuis signupData
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
        isProfileComplete: response.isProfileComplete,
      };

      const tokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        expiresIn: 3600, // Valeur par défaut, l'API ne retourne pas cette info
      };

      await this.storeTokens(tokens);
      await this.storeUser(user);

      return { user, tokens };
    } catch (error) {
      console.error("❌ Erreur d'inscription:", error);
      throw this.handleAuthError(error);
    }
  }

  // Authentification biométrique
  async authenticateWithBiometrics(): Promise<{
    user: User;
    tokens: AuthTokens;
  }> {
    try {
      // Vérifier si la biométrie est disponible
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        throw new Error("Biométrie non disponible sur cet appareil");
      }

      // Authentifier avec la biométrie
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authentifiez-vous pour accéder à votre compte",
        fallbackLabel: "Utiliser le mot de passe",
        cancelLabel: "Annuler",
      });

      if (!result.success) {
        throw new Error("Authentification biométrique échouée");
      }

      // Récupérer les tokens stockés
      const tokens = await this.getStoredTokens();
      if (!tokens) {
        throw new Error("Aucune session trouvée");
      }

      // Vérifier la validité des tokens
      const user = await this.getCurrentUser();
      if (!user) {
        throw new Error("Session utilisateur invalide");
      }

      return { user, tokens };
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Activer l'authentification biométrique
  async enableBiometricAuth(): Promise<void> {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!hasHardware || !isEnrolled) {
        throw new Error("Biométrie non disponible");
      }

      // Tester l'authentification biométrique
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authentifiez-vous pour activer la biométrie",
        fallbackLabel: "Utiliser le mot de passe",
        cancelLabel: "Annuler",
      });

      if (result.success) {
        await SecureStore.setItemAsync(this.BIOMETRIC_ENABLED_KEY, "true");
      } else {
        throw new Error("Authentification biométrique échouée");
      }
    } catch (error) {
      throw this.handleAuthError(error);
    }
  }

  // Désactiver l'authentification biométrique
  async disableBiometricAuth(): Promise<void> {
    await SecureStore.deleteItemAsync(this.BIOMETRIC_ENABLED_KEY);
  }

  // Vérifier si la biométrie est activée
  async isBiometricEnabled(): Promise<boolean> {
    const enabled = await SecureStore.getItemAsync(this.BIOMETRIC_ENABLED_KEY);
    return enabled === "true";
  }

  // Vérifier si la biométrie est disponible
  async isBiometricAvailable(): Promise<boolean> {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    return hasHardware && isEnrolled;
  }

  // Refresh du token
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("Aucun refresh token disponible");
      }

      const response = await this.apiClient.post<{
        accessToken: string;
        expiresIn: number;
      }>("/auth/refresh", { refreshToken });

      const newTokens: AuthTokens = {
        accessToken: response.accessToken,
        refreshToken,
        expiresIn: response.expiresIn,
      };

      await this.storeTokens(newTokens);
      return response.accessToken;
    } catch (error) {
      await this.logout();
      return null;
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (refreshToken) {
        await this.apiClient.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      // Ignorer les erreurs lors de la déconnexion
    } finally {
      await this.clearStoredData();
    }
  }

  // Vérifier si l'utilisateur est connecté
  async isAuthenticated(): Promise<boolean> {
    try {
      const accessToken = await this.getAccessToken();
      const user = await this.getCurrentUser();
      return !!(accessToken && user);
    } catch (error) {
      return false;
    }
  }

  // Obtenir l'utilisateur actuel
  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await SecureStore.getItemAsync(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }

  // Obtenir le token d'accès
  async getAccessToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(this.ACCESS_TOKEN_KEY);
  }

  // Obtenir le refresh token
  private async getRefreshToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(this.REFRESH_TOKEN_KEY);
  }

  // Stocker les tokens
  private async storeTokens(tokens: AuthTokens): Promise<void> {
    await SecureStore.setItemAsync(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    await SecureStore.setItemAsync(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
  }

  // Stocker les données utilisateur
  private async storeUser(user: User): Promise<void> {
    await SecureStore.setItemAsync(this.USER_KEY, JSON.stringify(user));
  }

  // Obtenir les tokens stockés
  private async getStoredTokens(): Promise<AuthTokens | null> {
    const accessToken = await this.getAccessToken();
    const refreshToken = await this.getRefreshToken();

    if (accessToken && refreshToken) {
      return {
        accessToken,
        refreshToken,
        expiresIn: 0, // Sera mis à jour lors du refresh
      };
    }

    return null;
  }

  // Effacer toutes les données stockées
  private async clearStoredData(): Promise<void> {
    await SecureStore.deleteItemAsync(this.ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(this.REFRESH_TOKEN_KEY);
    await SecureStore.deleteItemAsync(this.USER_KEY);
  }

  // Gestion des erreurs d'authentification
  private handleAuthError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    }
    if (error.message) {
      return new Error(error.message);
    }
    return new Error("Une erreur inattendue s'est produite");
  }
}

export { AuthService };
