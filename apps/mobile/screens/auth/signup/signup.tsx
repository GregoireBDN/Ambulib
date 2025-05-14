import React from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
} from "react-native";
import SignUpForm from "./signupForm";

const { width } = Dimensions.get("window");

const LOGO_WIDTH = width < 500 ? width * 0.7 : Math.min(width * 0.6, 400);
const LOGO_HEIGHT = width < 500 ? width * 0.5 : Math.min(width * 0.4, 230);
const FORM_PADDING = width < 500 ? 24 : 32;

const SignUpPage = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../../../../../assets/img/logoAmbulib.png")}
        style={{
          width: LOGO_WIDTH,
          height: LOGO_HEIGHT,
          marginBottom: 0,
          marginTop: width < 500 ? 0 : -70,
        }}
        resizeMode="contain"
      />
      <Text style={styles.title}>AMBULIB</Text>
      <View style={[styles.formContainer, { padding: FORM_PADDING }]}>
        <SignUpForm />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: width > 600 ? 52 : 36,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: -40,
    letterSpacing: 2,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
});

export default SignUpPage;
