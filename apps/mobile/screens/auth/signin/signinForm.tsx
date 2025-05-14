import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Échec de la connexion");
      }

      // Stocker le token
      // TODO: Implémenter le stockage du token

      // Succès de connexion
      Alert.alert("Succès", "Connexion réussie!");
    } catch (error: any) {
      Alert.alert("Erreur", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="w-full p-4 bg-white rounded-xl shadow-lg">
      <Text className="text-2xl font-bold mb-4 text-center text-blue-700">
        Connexion
      </Text>

      <View className="mb-6">
        <Text className="text-base mb-2 text-gray-700 font-semibold">
          Email
        </Text>
        <TextInput
          className="border border-gray-300 bg-gray-50 rounded-xl p-4 text-base focus:border-blue-500"
          placeholder="john@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#A0AEC0"
        />
      </View>

      <View className="mb-6">
        <Text className="text-base mb-2 text-gray-700 font-semibold">
          Mot de passe
        </Text>
        <View className="relative">
          <TextInput
            className="border border-gray-300 bg-gray-50 rounded-xl p-4 pr-12 text-base focus:border-blue-500"
            placeholder="Votre mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#A0AEC0"
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#666"
            />
          </Pressable>
        </View>
      </View>

      <TouchableOpacity
        className={`bg-blue-600 p-4 rounded-xl items-center mt-4 shadow-md active:bg-blue-700 ${isLoading ? "opacity-70" : ""}`}
        onPress={handleSignIn}
        disabled={isLoading}
      >
        <Text className="text-white text-lg font-bold tracking-wide">
          {isLoading ? "Connexion..." : "Se connecter"}
        </Text>
      </TouchableOpacity>

      <View className="mt-8 items-center">
        <TouchableOpacity
          onPress={() => Alert.alert("Info", "Fonctionnalité non implémentée")}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <Text className="text-blue-600 text-base underline font-medium">
            Mot de passe oublié ?
          </Text>
        </TouchableOpacity>

        <View className="flex-row mt-4 items-center">
          <Text className="text-base text-gray-600">Pas de compte ? </Text>
          <TouchableOpacity
            onPress={() => Alert.alert("Info", "Inscription non implémentée")}
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
          >
            <Text className="text-blue-600 text-base underline font-medium">
              S'inscrire
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignInForm;
