import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export type ButtonVariant = "primary" | "secondary" | "alert" | "ghost";
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
  leftIcon?: React.ReactNode;
  backgroundColor?: string; // override
  textColor?: string; // override
  borderColor?: string; // override
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
  leftIcon,
  backgroundColor,
  textColor,
  borderColor,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      minHeight: 48,
    };

    // Tailles
    const sizeStyles: Record<ButtonSize, ViewStyle> = {
      small: { paddingHorizontal: 12, paddingVertical: 6, minHeight: 36 },
      medium: { paddingHorizontal: 16, paddingVertical: 12, minHeight: 48 },
      large: { paddingHorizontal: 20, paddingVertical: 18, minHeight: 56 },
    };

    // Variantes
    const variantStyles: Record<ButtonVariant, ViewStyle> = {
      primary: {
        backgroundColor: "#2563eb",
        borderWidth: 0,
      },
      secondary: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#2563eb",
      },
      alert: {
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#FF3B30",
      },
      ghost: {
        backgroundColor: "#F6F8FA",
        borderWidth: 0,
      },
    };

    // Overrides
    if (backgroundColor)
      variantStyles[variant].backgroundColor = backgroundColor;
    if (borderColor) variantStyles[variant].borderColor = borderColor;

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
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: "bold",
      textAlign: "center",
      fontSize: size === "small" ? 15 : 18,
    };

    // Couleurs de texte selon la variante
    const textColorStyles: Record<ButtonVariant, TextStyle> = {
      primary: { color: "#fff" },
      secondary: { color: "#2563eb" },
      alert: { color: "#FF3B30" },
      ghost: { color: "#222" },
    };

    // Overrides
    if (textColor) textColorStyles[variant].color = textColor;

    return {
      ...baseTextStyle,
      ...textColorStyles[variant],
      ...textStyle, // priorité à la prop textStyle
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
      {loading && (
        <ActivityIndicator
          size="small"
          color={
            textColor
              ? textColor
              : variant === "primary"
                ? "#fff"
                : variant === "alert"
                  ? "#FF3B30"
                  : variant === "secondary"
                    ? "#2563eb"
                    : "#222"
          }
          style={{ marginRight: 8 }}
        />
      )}
      <Text style={getTextStyle()}>{loading ? "Chargement..." : title}</Text>
    </TouchableOpacity>
  );
}

// Boutons préconfigurés
export const PrimaryButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="primary" />
);
export const SecondaryButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="secondary" />
);
export const AlertButton = (
  props: Omit<ButtonProps, "variant" | "leftIcon"> & {
    leftIcon?: React.ReactNode;
  }
) => <Button {...props} variant="alert" leftIcon={props.leftIcon} />;
export const GhostButton = (props: Omit<ButtonProps, "variant">) => (
  <Button {...props} variant="ghost" />
);
