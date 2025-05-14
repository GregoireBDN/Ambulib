import React from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";

export default function Input(props: TextInputProps) {
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholderTextColor="#A0AEC0"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#f9fafb",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginBottom: 8,
  },
});
