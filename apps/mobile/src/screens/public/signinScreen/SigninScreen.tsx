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
} from "react-native";
import { PrimaryButton, GhostButton } from "../../../components/common/Button";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export function SigninScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Remplacez par votre logique de navigation
    // navigation.navigate("Home");
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
              <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Connexion</Text>
              <View style={{ width: 24 }} />
            </View>
            <Text style={styles.subtitle}>Bon retour sur HaVRID</Text>
          </LinearGradient>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
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
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Mot de passe</Text>
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
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <TouchableOpacity
                  style={styles.iconTouchable}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Ionicons
                    name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
                    size={26}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>

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

            <PrimaryButton
              title="Se connecter"
              onPress={handleSignin}
              loading={isLoading}
              fullWidth
              style={styles.signinButton}
            />

            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>ou</Text>
              <View style={styles.separatorLine} />
            </View>

            <GhostButton
              title="Touch ID / Face ID"
              onPress={() => {}}
              fullWidth
              leftIcon={
                <Ionicons name="finger-print" size={20} color="#2563eb" />
              }
              style={{ borderColor: "#E0E0E0", backgroundColor: "#F6F8FA" }}
              textStyle={{ color: "#222" }}
            />

            <View style={styles.footerLinks}>
              <Text style={styles.footerText}>
                Pas encore de compte ?{" "}
                <Text
                  style={styles.linkText}
                  onPress={() => {
                    /* navigation to signup */
                  }}
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
  inputGroup: {
    marginBottom: 20,
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
