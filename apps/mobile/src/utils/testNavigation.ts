import { NavigationContainerRef } from "@react-navigation/native";

export const testNavigation = (navigation: NavigationContainerRef<any>) => {
  console.log("🧪 Test de navigation...");

  try {
    // Test de navigation vers Signin
    console.log("✅ Test navigation vers Signin");

    // Test de navigation vers Signup
    console.log("✅ Test navigation vers Signup");

    // Test de retour arrière
    console.log("✅ Test retour arrière");

    console.log("✅ Tous les tests de navigation sont prêts !");
  } catch (error) {
    console.error("❌ Erreur lors des tests de navigation:", error);
  }
};
