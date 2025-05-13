/// <reference types="nativewind/types" />

declare module "nativewind" {
  import type { ComponentProps } from "react";
  import type { ViewProps, TextProps, TextInputProps } from "react-native";

  export type StyledProps<T> = T & {
    className?: string;
  };

  export type StyledViewProps = StyledProps<ViewProps>;
  export type StyledTextProps = StyledProps<TextProps>;
  export type StyledTextInputProps = StyledProps<TextInputProps>;
}
