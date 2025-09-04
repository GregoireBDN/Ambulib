import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from "react-native";
import { PrimaryButton, GhostButton } from "../../../components/common/Button";
import { FormTextInput } from "../../../components/common/FormTextInput";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthContext } from "../../../contexts/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Veuillez entrer un email valide")
    .required("L'email est requis"),
  password: yup
    .string()
    .min(6, "Le mot de passe doit contenir au moins 6 caractères")
    .required("Le mot de passe est requis"),
});

type FormData = {
  email: string;
  password: string;
};

export function SigninScreen({ navigation }: any) {
  const [rememberMe, setRememberMe] = useState(true);
  const [enableBiometric, setEnableBiometric] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const {
    login,
    loginWithBiometricPrompt,
    authenticateWithBiometrics,
    isBiometricAvailable,
    isBiometricEnabled,
    hasBiometricCredentials,
    isLoading,
  } = useAuthContext();

  const handleSignin = async (data: FormData) => {
    try {
      // Utiliser loginWithBiometricPrompt si l'option biométrie est cochée
      if (enableBiometric && isBiometricAvailable && !hasBiometricCredentials) {
        await loginWithBiometricPrompt(data, true);
      } else {
        await login(data);
      }
      // La navigation sera gérée par le contexte d'authentification
      navigation.navigate("Home");
    } catch (error) {
      // Handle server errors by setting field errors or showing alert
      if (error instanceof Error) {
        if (error.message.includes("email")) {
          setError("email", { message: error.message });
        } else if (error.message.includes("password")) {
          setError("password", { message: error.message });
        } else {
          Alert.alert("Erreur de connexion", error.message);
        }
      } else {
        Alert.alert("Erreur de connexion", "Une erreur s'est produite");
      }
    }
  };

  const handleBiometricAuth = async () => {
    try {
      await authenticateWithBiometrics();
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Erreur biométrique",
        error instanceof Error
          ? error.message
          : "Authentification biométrique échouée"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <LinearGradient
            colors={["#4A90E2", "#2563EB"]}
            style={styles.header}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <View style={styles.headerContent}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Connexion</Text>
              <View style={{ width: 24 }} />
            </View>
            <Text style={styles.subtitle}>Bon retour sur HaVRID</Text>
          </LinearGradient>

          <View style={styles.formContainer}>
            <FormTextInput
              name="email"
              control={control}
              label="Email"
              placeholder="votre.email@exemple.fr"
              leftIcon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email?.message}
            />

            <FormTextInput
              name="password"
              control={control}
              label="Mot de passe"
              placeholder="••••••••"
              leftIcon="lock-closed-outline"
              isPassword={true}
              error={errors.password?.message}
            />

            <View style={styles.optionsContainer}>
              <View style={styles.rememberMeContainer}>
                <Switch
                  value={rememberMe}
                  onValueChange={setRememberMe}
                  trackColor={{ false: "#767577", true: "#007AFF" }}
                  thumbColor={"#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                />
                <Text style={styles.rememberMeText}>Se souvenir de moi</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.forgotPasswordText}>
                  Mot de passe oublié ?
                </Text>
              </TouchableOpacity>
            </View>

            {isBiometricAvailable && !hasBiometricCredentials && !isBiometricEnabled && (
              <View style={styles.biometricContainer}>
                <View style={styles.rememberMeContainer}>
                  <Switch
                    value={enableBiometric}
                    onValueChange={setEnableBiometric}
                    trackColor={{ false: "#767577", true: "#007AFF" }}
                    thumbColor={"#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                  />
                  <Text style={styles.rememberMeText}>Activer Touch ID / Face ID</Text>
                </View>
              </View>
            )}

            <PrimaryButton
              title="Se connecter"
              onPress={handleSubmit(handleSignin)}
              loading={isLoading}
              fullWidth
              style={styles.signinButton}
            />

            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>ou</Text>
              <View style={styles.separatorLine} />
            </View>

            {isBiometricAvailable && (hasBiometricCredentials || isBiometricEnabled) && (
              <GhostButton
                title="Touch ID / Face ID"
                onPress={handleBiometricAuth}
                fullWidth
                leftIcon={
                  <Ionicons name="finger-print" size={20} color="#2563eb" />
                }
                style={{ borderColor: "#E0E0E0", backgroundColor: "#F6F8FA" }}
                textStyle={{ color: "#222" }}
              />
            )}

            <View style={styles.footerLinks}>
              <Text style={styles.footerText}>
                Pas encore de compte ?{" "}
                <Text
                  style={styles.linkText}
                  onPress={() => navigation.navigate("Signup")}
                >
                  Créer un compte
                </Text>
              </Text>
            </View>
          </View>
        </ScrollView>

        <View style={styles.supportFooter}>
          <Text style={styles.supportText}>Besoin d'aide ?</Text>
          <Text style={styles.supportText}>Support : 01 23 45 67 89</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 27,
    paddingBottom: 24,
    height: 120,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#FFFFFF",
    marginTop: 23,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rememberMeText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  biometricContainer: {
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "600",
  },
  signinButton: {
    backgroundColor: "#2A67E2",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  separatorText: {
    marginHorizontal: 16,
    color: "#888",
  },
  footerLinks: {
    alignItems: "center",
    marginTop: 32,
  },
  footerText: {
    fontSize: 16,
    color: "#666",
  },
  linkText: {
    color: "#007AFF",
    fontWeight: "600",
  },
  supportFooter: {
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    width: 393,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#F8F9FA",
  },
  supportText: {
    color: "#666",
  },
  formContainer: {
    padding: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});
