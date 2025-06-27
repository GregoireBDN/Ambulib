import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export function HomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBg}>
              <MaterialIcons name="local-shipping" size={44} color="#2A67E2" />
            </View>
            <Text style={styles.appName}>HAVRID</Text>
            <Text style={styles.appSubtitle}>
              Transport sanitaire simplifié
            </Text>
          </View>
        </View>
        <View style={styles.accessContainer}>
          <Text style={styles.accessTitle}>Accédez à votre espace</Text>
          <Text style={styles.accessSubtitle}>
            Gérez vos transports sanitaires{"\n"}en toute simplicité
          </Text>
        </View>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.primaryButtonText}>Se connecter</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.secondaryButtonText}>Créer un compte</Text>
        </TouchableOpacity>
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
        <TouchableOpacity style={styles.urgenceButton}>
          <Ionicons
            name="call"
            size={22}
            color="#FF3B30"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.urgenceButtonText}>Urgence : 15</Text>
        </TouchableOpacity>
        <View style={styles.supportFooter}>
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
    padding: 0,
    backgroundColor: "#FFFFFF",
    flexGrow: 1,
    justifyContent: "flex-start",
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#2A67E2",
    paddingTop: 48,
    paddingBottom: 32,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoBg: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
    letterSpacing: 1,
  },
  appSubtitle: {
    color: "#E0E0E0",
    fontSize: 16,
    marginBottom: 0,
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
    backgroundColor: "#2A67E2",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 12,
    shadowColor: "#2A67E2",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: "#2A67E2",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginHorizontal: 24,
    marginBottom: 32,
    backgroundColor: "#fff",
  },
  secondaryButtonText: {
    color: "#2A67E2",
    fontSize: 18,
    fontWeight: "bold",
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
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF3B30",
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 24,
    marginBottom: 16,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  urgenceButtonText: {
    color: "#FF3B30",
    fontSize: 18,
    fontWeight: "bold",
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
