import React from "react";
import SignInForm from "./signinForm";
import { View, Image } from "react-native";

const SignInPage = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center p-5">
      <Image
        source={require("../../../../../assets/img/logoAmbulib.png")}
        style={{ width: 400, height: 400, marginBottom: 24 }}
        resizeMode="contain"
      />
      <View className="w-full bg-white rounded-xl shadow-sm p-8">
        <SignInForm />
      </View>
    </View>
  );
};

export default SignInPage;
