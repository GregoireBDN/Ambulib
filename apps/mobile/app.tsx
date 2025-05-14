import React from "react";
import { View } from "react-native";
import SignInPage from "./screens/auth/signin/signin";
import SignUpPage from "./screens/auth/signup/signup";

export default function App() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SignUpPage />
    </View>
  );
}
