import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  SafeAreaView,
  Alert,
} from "react-native";
import { PrimaryButton, GhostButton } from "../../../components/common/Button";
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const { signup, isLoading } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
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

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Prénom *</Text>
              <Controller
                control={control}
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.textInputWrapper}>
                    <Ionicons
                      name="person-outline"
                      size={22}
                      color="#888"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Votre prénom"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                    />
                  </View>
                )}
              />
              {errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nom *</Text>
              <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.textInputWrapper}>
                    <Ionicons
                      name="person-outline"
                      size={22}
                      color="#888"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Votre nom"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      autoCapitalize="words"
                    />
                  </View>
                )}
              />
              {errors.lastName && (
                <Text style={styles.errorText}>{errors.lastName.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email *</Text>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.textInputWrapper}>
                    <Ionicons
                      name="mail-outline"
                      size={22}
                      color="#888"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="votre.email@exemple.fr"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Téléphone *</Text>
              <Controller
                control={control}
                name="phone"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.textInputWrapper}>
                    <Ionicons
                      name="call-outline"
                      size={22}
                      color="#888"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="06 12 34 56 78"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={(text) => onChange(formatPhoneNumber(text))}
                      onBlur={onBlur}
                      keyboardType="phone-pad"
                    />
                  </View>
                )}
              />
              {errors.phone && (
                <Text style={styles.errorText}>{errors.phone.message}</Text>
              )}
            </View>
          </View>

          {/* Section Sécurité sociale */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sécurité sociale</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                Numéro de sécurité sociale *
              </Text>
              <Controller
                control={control}
                name="socialSecurityNumber"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.textInputWrapper}>
                    <Ionicons
                      name="card-outline"
                      size={22}
                      color="#888"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="1 23 45 67 890 123 45"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={(text) =>
                        onChange(formatSocialSecurityNumber(text))
                      }
                      onBlur={onBlur}
                      keyboardType="numeric"
                    />
                  </View>
                )}
              />
              {errors.socialSecurityNumber && (
                <Text style={styles.errorText}>
                  {errors.socialSecurityNumber.message}
                </Text>
              )}
            </View>
          </View>

          {/* Section Mot de passe */}
          <View style={styles.section}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mot de passe *</Text>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.textInputWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={22}
                      color="#888"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!isPasswordVisible}
                    />
                    <TouchableOpacity
                      style={styles.iconTouchable}
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      <Ionicons
                        name={
                          isPasswordVisible ? "eye-off-outline" : "eye-outline"
                        }
                        size={26}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirmer le mot de passe *</Text>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, onBlur, value } }) => (
                  <View style={styles.textInputWrapper}>
                    <Ionicons
                      name="lock-closed-outline"
                      size={22}
                      color="#888"
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="••••••••"
                      placeholderTextColor="#A9A9A9"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={!isConfirmPasswordVisible}
                    />
                    <TouchableOpacity
                      style={styles.iconTouchable}
                      onPress={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                    >
                      <Ionicons
                        name={
                          isConfirmPasswordVisible
                            ? "eye-off-outline"
                            : "eye-outline"
                        }
                        size={26}
                        color="#888"
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
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
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
  },
  icon: {
    paddingLeft: 12,
  },
  iconTouchable: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingHorizontal: 10,
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
