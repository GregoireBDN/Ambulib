import React from "react";
import { View } from "react-native";
import SignInPage from "./screens/auth/signin/signin";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <SignInPage />
    </View>
  );
}
