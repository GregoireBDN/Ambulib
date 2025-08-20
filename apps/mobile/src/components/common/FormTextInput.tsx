import React, { forwardRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TextInputProps,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Control, useController, FieldError } from "react-hook-form";

type IconName = keyof typeof Ionicons.glyphMap;

interface FormTextInputProps extends Omit<TextInputProps, "value" | "onChangeText"> {
  name: string;
  control: Control<any>;
  label: string;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  error?: FieldError | string;
  isPassword?: boolean;
  formatValue?: (text: string) => string;
}

export const FormTextInput = forwardRef<TextInput, FormTextInputProps>(
  (
    {
      name,
      control,
      label,
      leftIcon,
      rightIcon,
      onRightIconPress,
      error,
      isPassword = false,
      formatValue,
      placeholder,
      keyboardType,
      autoCapitalize,
      ...textInputProps
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const {
      field: { onChange, onBlur, value },
      fieldState: { error: fieldError },
    } = useController({
      name,
      control,
      defaultValue: "",
    });

    const errorMessage = error || fieldError?.message;
    const hasError = !!errorMessage;

    const handleRightIconPress = () => {
      if (isPassword) {
        setIsPasswordVisible(!isPasswordVisible);
      } else if (onRightIconPress) {
        onRightIconPress();
      }
    };

    const getRightIcon = (): IconName | undefined => {
      if (isPassword) {
        return isPasswordVisible ? "eye-off-outline" : "eye-outline";
      }
      return rightIcon;
    };

    return (
      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{label}</Text>
        <View style={[styles.textInputWrapper, hasError && styles.textInputWrapperError]}>
          {leftIcon && (
            <Ionicons
              name={leftIcon}
              size={22}
              color="#888"
              style={styles.icon}
            />
          )}
          <TextInput
            ref={ref}
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#A9A9A9"
            value={value}
            onChangeText={(text) => {
              const formattedText = formatValue ? formatValue(text) : text;
              onChange(formattedText);
            }}
            onBlur={onBlur}
            secureTextEntry={isPassword && !isPasswordVisible}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            {...textInputProps}
          />
          {(getRightIcon() || onRightIconPress) && (
            <TouchableOpacity
              style={styles.iconTouchable}
              onPress={handleRightIconPress}
              accessibilityLabel={
                isPassword 
                  ? (isPasswordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe")
                  : "Icône interactive"
              }
              accessibilityRole="button"
            >
              <Ionicons
                name={getRightIcon() as IconName}
                size={26}
                color="#888"
              />
            </TouchableOpacity>
          )}
        </View>
        {hasError && (
          <Text style={styles.errorText} accessibilityLiveRegion="polite">
            {typeof errorMessage === "string" ? errorMessage : errorMessage?.message}
          </Text>
        )}
      </View>
    );
  }
);

FormTextInput.displayName = "FormTextInput";

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  textInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#F8F9FA",
  },
  textInputWrapperError: {
    borderColor: "#DC2626",
    backgroundColor: "#FEF2F2",
  },
  icon: {
    paddingLeft: 12,
  },
  iconTouchable: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  errorText: {
    fontSize: 14,
    color: "#DC2626",
    marginTop: 4,
    marginLeft: 4,
  },
});