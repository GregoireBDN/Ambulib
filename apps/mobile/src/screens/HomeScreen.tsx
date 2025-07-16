import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import {
  PrimaryButton,
  SecondaryButton,
  AlertButton,
  GhostButton,
} from "../components/common/Button";

export function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/img/HavridHomePage.png")}
              style={styles.logoImage}
              resizeMode="contain"
            />
            <Text style={styles.appSubtitle}>
              Transport sanitaire simplifié
            </Text>
          </View>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.accessContainer}>
            <Text style={styles.accessTitle}>Accédez à votre espace</Text>
            <Text style={styles.accessSubtitle}>
              Gérez vos transports sanitaires{"\n"}en toute simplicité
            </Text>
          </View>
          <PrimaryButton
            title="Se connecter"
            onPress={() => navigation.navigate("Signin")}
            fullWidth
            size="medium"
            style={styles.primaryButton}
          />
          <SecondaryButton
            title="Créer un compte"
            onPress={() => navigation.navigate("Signup")}
            fullWidth
            size="medium"
            style={styles.secondaryButton}
          />
          <View style={styles.featuresSection}>
            <View style={styles.featuresHeaderContainer}>
              <View style={styles.featuresLine} />
              <Text style={styles.featuresHeader}>Fonctionnalités</Text>
              <View style={styles.featuresLine} />
            </View>
            <View style={styles.featureItem}>
              <Ionicons
                name="search"
                size={28}
                color="#2A67E2"
                style={styles.featureIcon}
              />
              <View>
                <Text style={styles.featureTitle}>Transport garanti</Text>
                <Text style={styles.featureDesc}>
                  Trouvez votre transporteur sans effort
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Ionicons
                name="calendar-outline"
                size={28}
                color="#2A67E2"
                style={styles.featureIcon}
              />
              <View>
                <Text style={styles.featureTitle}>Réservation simplifiée</Text>
                <Text style={styles.featureDesc}>
                  Planifiez vos transports en quelques clics
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <Ionicons
                name="location-outline"
                size={28}
                color="#2A67E2"
                style={styles.featureIcon}
              />
              <View>
                <Text style={styles.featureTitle}>Suivi en temps réel</Text>
                <Text style={styles.featureDesc}>
                  Suivez votre transport à tout moment
                </Text>
              </View>
            </View>
            <View style={styles.featureItem}>
              <FontAwesome5
                name="shield-alt"
                size={26}
                color="#2A67E2"
                style={styles.featureIcon}
              />
              <View>
                <Text style={styles.featureTitle}>Sécurisé et pratique</Text>
                <Text style={styles.featureDesc}>
                  Sauvegarde de vos documents essentiels et respect des normes
                  sanitaires
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.supportFooter}>
          <AlertButton
            title="Urgence : 15"
            onPress={() => {}}
            fullWidth
            size="medium"
            leftIcon={<Ionicons name="call" size={22} color="#FF3B30" />}
            style={{ ...styles.urgenceButton, paddingHorizontal: 24 }}
            textColor="#FF3B30"
          />
          <Text style={styles.supportText}>Support : 01 23 45 67 89</Text>
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
  scrollContent: {
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  mainContent: {
    paddingHorizontal: 24,
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#1a365d", // Fond bleu foncé comme sur l'image
    paddingTop: 48,
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoImage: {
    width: 200,
    height: 140,
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    letterSpacing: 1,
  },
  appSubtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 0,
    textAlign: "center",
  },
  accessContainer: {
    alignItems: "center",
    marginTop: 32,
    marginBottom: 16,
  },
  accessTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 8,
    textAlign: "center",
  },
  accessSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  primaryButton: {
    marginBottom: 12,
  },
  secondaryButton: {
    marginBottom: 32,
    backgroundColor: "#fff",
  },
  featuresSection: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  featuresHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  featuresHeader: {
    fontSize: 16,
    color: "#888",
    fontWeight: "600",
    marginHorizontal: 12,
  },
  featuresLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 18,
  },
  featureIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  featureDesc: {
    color: "#6B7280",
    fontSize: 14,
  },
  urgenceButton: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  supportFooter: {
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    marginTop: 8,
  },
  supportText: {
    color: "#666",
    fontSize: 15,
  },
});
