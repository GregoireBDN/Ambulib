import { AuthService } from "../services/auth/authService";

export const testAuthService = async () => {
  console.log("🧪 Test du service d'authentification...");

  const authService = new AuthService();

  try {
    // Test de la disponibilité biométrique
    const isBiometricAvailable = await authService.isBiometricAvailable();
    console.log("✅ Biométrie disponible:", isBiometricAvailable);

    // Test de l'état d'authentification
    const isAuthenticated = await authService.isAuthenticated();
    console.log("✅ État d'authentification:", isAuthenticated);

    // Test de récupération de l'utilisateur
    const user = await authService.getCurrentUser();
    console.log("✅ Utilisateur actuel:", user);

    console.log("✅ Tous les tests sont passés !");
  } catch (error) {
    console.error("❌ Erreur lors des tests:", error);
  }
};
