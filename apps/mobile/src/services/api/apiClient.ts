import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { AuthService } from "../auth/authService";
import Constants from "expo-constants";

export class ApiClient {
  private static instance: ApiClient;
  private api: AxiosInstance;
  private authService: AuthService | null = null;

  private constructor() {
    const baseURL =
      Constants.expoConfig?.extra?.apiUrl || "http://localhost:8000";
    console.log("🔧 ApiClient - baseURL configurée:", baseURL);

    this.api = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public setAuthService(authService: AuthService): void {
    this.authService = authService;
    this.setupInterceptors();
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private setupInterceptors(): void {
    // Intercepteur pour ajouter le token d'authentification
    this.api.interceptors.request.use(
      async (config) => {
        console.log("🔧 ApiClient - Requête envoyée:", {
          method: config.method,
          url: config.url,
          baseURL: config.baseURL,
          fullURL: `${config.baseURL}${config.url}`,
        });

        if (this.authService) {
          const token = await this.authService.getAccessToken();
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        console.log("❌ ApiClient - Erreur de requête:", error.message);
        return Promise.reject(error);
      }
    );

    // Intercepteur pour gérer le refresh automatique des tokens
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          this.authService
        ) {
          originalRequest._retry = true;

          try {
            const newToken = await this.authService.refreshToken();
            if (newToken) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            // Le refresh a échoué, déconnexion forcée
            await this.authService.logout();
            throw refreshError;
          }
        }

        return Promise.reject(error);
      }
    );
  }

  public getApi(): AxiosInstance {
    return this.api;
  }

  // Méthodes pour les appels API spécifiques
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }
}
