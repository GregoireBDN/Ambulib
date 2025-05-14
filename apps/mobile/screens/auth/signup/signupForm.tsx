import React, { useState } from "react";
import { View, Text, Alert, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../../components/ui/input";
import Button from "../../../components/ui/Button";
import FormContainer from "../../../components/ui/formContainer";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de l'inscription");
      }

      Alert.alert("Succès", "Inscription réussie !");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormContainer>
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginBottom: 16,
          color: "#2563eb",
          textAlign: "center",
        }}
      >
        Inscription
      </Text>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: "600", marginBottom: 6 }}>Email</Text>
        <Input
          placeholder="john@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: "600", marginBottom: 6 }}>Mot de passe</Text>
        <View style={{ position: "relative" }}>
          <Input
            placeholder="Votre mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: 16, top: 18 }}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color="#666"
            />
          </Pressable>
        </View>
      </View>

      <View style={{ marginBottom: 16 }}>
        <Text style={{ fontWeight: "600", marginBottom: 6 }}>
          Confirmer le mot de passe
        </Text>
        <Input
          placeholder="Confirmez votre mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showPassword}
        />
      </View>

      <Button onPress={handleSignUp} loading={isLoading}>
        {isLoading ? "Inscription..." : "S'inscrire"}
      </Button>
    </FormContainer>
  );
};

export default SignUpForm;
