import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { PrimaryButton } from "../../../components/common/Button";
import { FormTextInput } from "../../../components/common/FormTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { LinearGradient } from "expo-linear-gradient";
import { useAuthContext } from "../../../contexts/AuthContext";

// Schéma de validation Yup
const signupSchema = yup.object({
  firstName: yup.string().required("Le prénom est requis"),
  lastName: yup.string().required("Le nom est requis"),
  email: yup.string().email("Email invalide").required("L'email est requis"),
  phone: yup
    .string()
    .matches(
      /^0[1-9]\s\d{2}\s\d{2}\s\d{2}\s\d{2}$/,
      "Numéro de téléphone invalide"
    )
    .required("Le téléphone est requis"),
  socialSecurityNumber: yup
    .string()
    .matches(
      /^\d{1}\s\d{2}\s\d{2}\s\d{2}\s\d{3}\s\d{3}\s\d{2}$/,
      "Format invalide"
    )
    .required("Le numéro de sécurité sociale est requis"),
  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .required("Le mot de passe est requis"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Les mots de passe ne correspondent pas")
    .required("La confirmation du mot de passe est requise"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Vous devez accepter les conditions")
    .required(),
});

type SignupFormData = yup.InferType<typeof signupSchema>;

export function SignupScreen({ navigation }: any) {
  const { signup, isLoading } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      socialSecurityNumber: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phoneNumber: data.phone,
        password: data.password,
      });

      // Navigation vers l'écran principal après inscription réussie
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert(
        "Erreur d'inscription",
        error instanceof Error ? error.message : "Une erreur s'est produite"
      );
    }
  };

  const formatPhoneNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`;
    }
    return text;
  };

  const formatSocialSecurityNumber = (text: string) => {
    const cleaned = text.replace(/\D/g, "");
    const match = cleaned.match(
      /^(\d{1})(\d{2})(\d{2})(\d{2})(\d{3})(\d{3})(\d{2})$/
    );
    if (match) {
      return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]} ${match[6]} ${match[7]}`;
    }
    return text;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={["#2563EB", "#4A90E2"]}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.headerContent}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Créer un compte</Text>
            <View style={{ width: 24 }} />
          </View>
          <Text style={styles.subtitle}>Rejoignez HaVRID</Text>
        </LinearGradient>

        <View style={styles.formContainer}>
          {/* Section Informations personnelles */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>

            <FormTextInput
              name="firstName"
              control={control}
              label="Prénom *"
              placeholder="Votre prénom"
              leftIcon="person-outline"
              autoCapitalize="words"
              error={errors.firstName?.message}
            />

            <FormTextInput
              name="lastName"
              control={control}
              label="Nom *"
              placeholder="Votre nom"
              leftIcon="person-outline"
              autoCapitalize="words"
              error={errors.lastName?.message}
            />

            <FormTextInput
              name="email"
              control={control}
              label="Email *"
              placeholder="votre.email@exemple.fr"
              leftIcon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email?.message}
            />

            <FormTextInput
              name="phone"
              control={control}
              label="Téléphone *"
              placeholder="06 12 34 56 78"
              leftIcon="call-outline"
              keyboardType="phone-pad"
              formatValue={formatPhoneNumber}
              error={errors.phone?.message}
            />
          </View>

          {/* Section Sécurité sociale */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sécurité sociale</Text>

            <FormTextInput
              name="socialSecurityNumber"
              control={control}
              label="Numéro de sécurité sociale *"
              placeholder="1 23 45 67 890 123 45"
              leftIcon="card-outline"
              keyboardType="numeric"
              formatValue={formatSocialSecurityNumber}
              error={errors.socialSecurityNumber?.message}
            />
          </View>

          {/* Section Mot de passe */}
          <View style={styles.section}>
            <FormTextInput
              name="password"
              control={control}
              label="Mot de passe *"
              placeholder="••••••••"
              leftIcon="lock-closed-outline"
              isPassword={true}
              error={errors.password?.message}
            />

            <FormTextInput
              name="confirmPassword"
              control={control}
              label="Confirmer le mot de passe *"
              placeholder="••••••••"
              leftIcon="lock-closed-outline"
              isPassword={true}
              error={errors.confirmPassword?.message}
            />
          </View>

          {/* Conditions d'utilisation */}
          <View style={styles.termsContainer}>
            <Controller
              control={control}
              name="acceptTerms"
              render={({ field: { onChange, value } }) => (
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={[styles.checkbox, value && styles.checkboxChecked]}
                    onPress={() => onChange(!value)}
                  >
                    {value && (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.termsText}>
                    J'accepte les{" "}
                    <Text style={styles.linkText}>
                      conditions d'utilisation
                    </Text>{" "}
                    et la{" "}
                    <Text style={styles.linkText}>
                      politique de confidentialité
                    </Text>
                  </Text>
                </View>
              )}
            />
            {errors.acceptTerms && (
              <Text style={styles.errorText}>{errors.acceptTerms.message}</Text>
            )}
          </View>

          <PrimaryButton
            title="Créer mon compte"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            fullWidth
            style={styles.signupButton}
          />

          <View style={styles.footerLinks}>
            <Text style={styles.footerText}>
              Déjà un compte ?{" "}
              <Text
                style={styles.linkText}
                onPress={() => navigation.navigate("Signin")}
              >
                Se connecter
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
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
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
  section: {
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 14,
    marginTop: 4,
    marginLeft: 4,
  },
  termsContainer: {
    marginBottom: 16,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#007AFF",
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#007AFF",
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  signupButton: {
    backgroundColor: "#2A67E2",
  },
  footerLinks: {
    alignItems: "center",
    marginTop: 16,
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
    padding: 20,
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
});
