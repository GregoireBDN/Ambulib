import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "success"
  | "warning"
  | "outline";
export type ButtonSize = "small" | "medium" | "large";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    };

    // Tailles
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      small: { paddingHorizontal: 12, paddingVertical: 6, minHeight: 32 },
      medium: { paddingHorizontal: 16, paddingVertical: 10, minHeight: 40 },
      large: { paddingHorizontal: 20, paddingVertical: 14, minHeight: 48 },
    };

    // Variantes
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: { backgroundColor: "#007AFF" },
      secondary: { backgroundColor: "#8E8E93" },
      danger: { backgroundColor: "#FF3B30" },
      success: { backgroundColor: "#34C759" },
      warning: { backgroundColor: "#FF9500" },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#007AFF",
      },
    };

    // État désactivé
    const disabledStyle: ViewStyle =
      disabled || loading
        ? {
            opacity: 0.6,
          }
        : {};

    // Largeur complète
    const widthStyle: ViewStyle = fullWidth ? { width: "100%" } : {};

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...disabledStyle,
      ...widthStyle,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: "600",
      textAlign: "center",
    };

    // Tailles de texte
    const textSizeStyles: Record<ButtonSize, TextStyle> = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    // Couleurs de texte selon la variante
    const textColorStyles: Record<ButtonVariant, TextStyle> = {
      primary: { color: "#FFFFFF" },
      secondary: { color: "#FFFFFF" },
      danger: { color: "#FFFFFF" },
      success: { color: "#FFFFFF" },
      warning: { color: "#FFFFFF" },
      outline: { color: "#007AFF" },
    };

    return {
      ...baseTextStyle,
      ...textSizeStyles[size],
      ...textColorStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "outline" ? "#007AFF" : "#FFFFFF"}
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={[getTextStyle(), textStyle]}>
        {loading ? "Chargement..." : title}
      </Text>
    </TouchableOpacity>
  );
}

// Composants pré-configurés pour des actions spécifiques
export const ConfirmButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="success" />
);

export const DeleteButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="danger" />
);

export const CancelButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="secondary" />
);

export const WarningButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="warning" />
);

export const OutlineButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="outline" />
);
