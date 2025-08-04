"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

/**
 * AccessibleInput - Composant input optimisé pour l'accessibilité
 * Spécialement conçu pour les personnes âgées et handicapées
 * 
 * Fonctionnalités d'accessibilité :
 * - Taille minimum 44px (WCAG)
 * - Labels obligatoires et visibles
 * - Support complet ARIA
 * - Messages d'erreur accessibles
 * - Aide contextuelle
 * - Contraste élevé
 */

export interface AccessibleInputProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  /** Label obligatoire pour l'accessibilité */
  label: string;
  /** ID unique requis pour l'association label-input */
  id: string;
  /** Message d'erreur à afficher */
  error?: string;
  /** Message d'aide contextuelle */
  helpText?: string;
  /** Indique si le champ est requis */
  required?: boolean;
  /** Taille du composant */
  size?: "default" | "large" | "xl";
  /** Type spécial pour mots de passe avec bouton toggle */
  showPasswordToggle?: boolean;
}

const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({
    className,
    type,
    label,
    id,
    error,
    helpText,
    required = false,
    size = "default",
    showPasswordToggle = false,
    disabled,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    
    const inputType = showPasswordToggle ? (showPassword ? "text" : "password") : type;
    const hasError = Boolean(error);
    const helpTextId = helpText ? `${id}-help` : undefined;
    const errorId = error ? `${id}-error` : undefined;
    
    // Combinaison des IDs pour aria-describedby
    const describedBy = [helpTextId, errorId].filter(Boolean).join(" ") || undefined;

    const sizeClasses = {
      default: "h-12 px-4 py-3 text-lg",
      large: "h-14 px-5 py-4 text-xl",
      xl: "h-16 px-6 py-5 text-2xl",
    };

    const labelSizeClasses = {
      default: "text-base",
      large: "text-lg", 
      xl: "text-xl",
    };

    return (
      <div className="space-y-2">
        {/* Label - toujours visible et associé */}
        <label
          htmlFor={id}
          className={cn(
            "block font-semibold text-gray-900 leading-relaxed",
            labelSizeClasses[size],
            required && "after:content-['*'] after:ml-1 after:text-red-600",
            disabled && "text-gray-500"
          )}
        >
          {label}
        </label>

        {/* Conteneur input avec états visuels */}
        <div className="relative">
          <input
            ref={ref}
            type={inputType}
            id={id}
            className={cn(
              // Classes de base avec taille accessible
              "block w-full rounded-lg transition-all duration-200",
              sizeClasses[size],
              // Bordures et focus ultra-visibles
              "border-2 border-gray-300 bg-white",
              "focus:border-blue-600 focus:ring-4 focus:ring-blue-500/25",
              "focus:outline-none focus:ring-offset-2",
              // États d'erreur avec contraste élevé
              hasError && "border-red-500 focus:border-red-600 focus:ring-red-500/25",
              // État disabled accessible
              disabled && "bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed",
              // Placeholder contrasté
              "placeholder:text-gray-500 placeholder:font-medium",
              // Espacement pour icône/bouton
              showPasswordToggle && "pr-14",
              className
            )}
            disabled={disabled}
            required={required}
            aria-required={required}
            aria-invalid={hasError}
            aria-describedby={describedBy}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />

          {/* Bouton toggle mot de passe */}
          {showPasswordToggle && (
            <button
              type="button"
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "h-10 w-10 rounded-md",
                "flex items-center justify-center",
                "text-gray-600 hover:text-gray-800 hover:bg-gray-100",
                "focus:outline-none focus:ring-2 focus:ring-blue-500",
                "transition-colors duration-200"
              )}
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              tabIndex={disabled ? -1 : 0}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Eye className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          )}

          {/* Icône d'état */}
          {(hasError || (!hasError && isFocused && props.value)) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              {hasError ? (
                <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
              ) : (
                <CheckCircle className="h-5 w-5 text-green-500" aria-hidden="true" />
              )}
            </div>
          )}
        </div>

        {/* Message d'aide */}
        {helpText && (
          <p
            id={helpTextId}
            className={cn(
              "text-sm text-gray-600 leading-relaxed",
              size === "large" && "text-base",
              size === "xl" && "text-lg"
            )}
          >
            {helpText}
          </p>
        )}

        {/* Message d'erreur */}
        {error && (
          <div
            id={errorId}
            role="alert"
            aria-live="polite"
            className={cn(
              "flex items-start gap-2 p-3 rounded-lg bg-red-50 border border-red-200",
              size === "large" && "text-base",
              size === "xl" && "text-lg"
            )}
          >
            <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-red-700 font-medium">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

AccessibleInput.displayName = "AccessibleInput";

export { AccessibleInput };