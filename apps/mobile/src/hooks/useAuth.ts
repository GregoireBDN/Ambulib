import { useState, useEffect, useCallback, useMemo } from "react";
import {
  AuthService,
  User,
  LoginCredentials,
  SignupData,
} from "../services/auth/authService";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isBiometricAvailable: boolean;
  isBiometricEnabled: boolean;
  hasBiometricCredentials: boolean;
}

interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithBiometricPrompt: (credentials: LoginCredentials, enableBiometric: boolean) => Promise<void>;
  signup: (signupData: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  authenticateWithBiometrics: () => Promise<void>;
  enableBiometricAuth: () => Promise<void>;
  disableBiometricAuth: () => Promise<void>;
  checkAuthStatus: () => Promise<void>;
}

export const useAuth = (): AuthState & AuthActions => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    isBiometricAvailable: false,
    isBiometricEnabled: false,
    hasBiometricCredentials: false,
  });

  // Utiliser useMemo pour éviter de recréer l'instance à chaque render
  const authService = useMemo(() => new AuthService(), []);

  const checkAuthStatus = useCallback(async () => {
    try {
      const [isAuthenticated, user, isBiometricAvailable, isBiometricEnabled, hasBiometricCredentials] =
        await Promise.all([
          authService.isAuthenticated(),
          authService.getCurrentUser(),
          authService.isBiometricAvailable(),
          authService.isBiometricEnabled(),
          authService.hasBiometricCredentials(),
        ]);

      setAuthState((prev) => ({
        ...prev,
        isAuthenticated,
        user,
        isBiometricAvailable,
        isBiometricEnabled,
        hasBiometricCredentials,
        isLoading: false,
      }));
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      }));
    }
  }, [authService]);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      try {
        const { user } = await authService.login(credentials);
        setAuthState((prev) => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [authService]
  );

  const loginWithBiometricPrompt = useCallback(
    async (credentials: LoginCredentials, enableBiometric: boolean) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      try {
        const { user } = await authService.loginWithBiometricPrompt(credentials, enableBiometric);
        setAuthState((prev) => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
          hasBiometricCredentials: enableBiometric ? true : prev.hasBiometricCredentials,
        }));
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [authService]
  );

  const signup = useCallback(
    async (signupData: SignupData) => {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      try {
        const { user } = await authService.signup(signupData);
        setAuthState((prev) => ({
          ...prev,
          user,
          isAuthenticated: true,
          isLoading: false,
        }));
      } catch (error) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        throw error;
      }
    },
    [authService]
  );

  const logout = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
      setAuthState((prev) => ({
        ...prev,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      }));
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [authService]);

  const authenticateWithBiometrics = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));
    try {
      const { user } = await authService.authenticateWithBiometrics();
      setAuthState((prev) => ({
        ...prev,
        user,
        isAuthenticated: true,
        isLoading: false,
      }));
    } catch (error) {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      throw error;
    }
  }, [authService]);

  const enableBiometricAuth = useCallback(async () => {
    try {
      await authService.enableBiometricAuth();
      setAuthState((prev) => ({
        ...prev,
        isBiometricEnabled: true,
      }));
    } catch (error) {
      throw error;
    }
  }, [authService]);

  const disableBiometricAuth = useCallback(async () => {
    try {
      await authService.disableBiometricAuth();
      setAuthState((prev) => ({
        ...prev,
        isBiometricEnabled: false,
      }));
    } catch (error) {
      throw error;
    }
  }, [authService]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return {
    ...authState,
    login,
    loginWithBiometricPrompt,
    signup,
    logout,
    authenticateWithBiometrics,
    enableBiometricAuth,
    disableBiometricAuth,
    checkAuthStatus,
  };
};
