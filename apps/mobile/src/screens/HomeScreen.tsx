import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function HomeScreen({ navigation }: any) {
  const handleSignout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Signin" }],
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Écran d'accueil</Text>
      <Text style={styles.welcome}>Bienvenue dans Ambulib !</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Details")}
      >
        <Text style={styles.buttonText}>Aller aux détails</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.signoutButton]}
        onPress={handleSignout}
      >
        <Text style={[styles.buttonText, styles.signoutButtonText]}>
          Se déconnecter
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  welcome: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
    minWidth: 200,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  signoutButton: {
    backgroundColor: "#FF3B30",
  },
  signoutButtonText: {
    color: "white",
  },
});
