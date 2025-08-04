"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * LargeButton - Composant bouton optimisé pour l'accessibilité
 * Spécialement conçu pour les personnes âgées et handicapées
 * 
 * Fonctionnalités d'accessibilité :
 * - Taille minimum 44x44px (WCAG)
 * - Texte minimum 18px
 * - Contraste élevé garanti
 * - Support complet clavier et lecteurs d'écran
 * - Focus ultra-visible
 */

const largeButtonVariants = cva(
  // Classes de base avec accessibilité renforcée
  [
    "inline-flex items-center justify-center gap-3",
    "whitespace-nowrap rounded-lg font-semibold",
    "transition-all duration-200 ease-in-out",
    // Focus ultra-visible pour personnes âgées
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    // États disabled accessibles
    "disabled:pointer-events-none disabled:opacity-60 disabled:cursor-not-allowed",
    // Support tactile amélioré
    "touch-manipulation select-none",
    // Icônes optimisées
    "[&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // Variant principal - contraste élevé
        primary: [
          "bg-blue-700 text-white shadow-lg",
          "hover:bg-blue-800 hover:shadow-xl",
          "active:bg-blue-900 active:scale-[0.98]",
        ],
        // Variant secondaire - contraste maintenu
        secondary: [
          "bg-gray-200 text-gray-900 shadow-md border-2 border-gray-300",
          "hover:bg-gray-300 hover:border-gray-400 hover:shadow-lg",
          "active:bg-gray-400 active:scale-[0.98]",
        ],
        // Variant d'urgence - très visible
        emergency: [
          "bg-red-600 text-white shadow-lg border-2 border-red-700",
          "hover:bg-red-700 hover:border-red-800 hover:shadow-xl",
          "active:bg-red-800 active:scale-[0.98]",
          "animate-pulse-slow", // Animation subtile pour attirer l'attention
        ],
        // Variant succès - accessible
        success: [
          "bg-green-700 text-white shadow-lg",
          "hover:bg-green-800 hover:shadow-xl",
          "active:bg-green-900 active:scale-[0.98]",
        ],
        // Variant outline - contraste élevé
        outline: [
          "bg-white text-gray-900 shadow-md border-3 border-gray-400",
          "hover:bg-gray-50 hover:border-gray-600 hover:shadow-lg",
          "active:bg-gray-100 active:scale-[0.98]",
        ],
      },
      size: {
        // Taille standard - minimum 44px
        default: "h-12 px-6 py-3 text-lg min-w-[120px]",
        // Taille large - pour actions importantes
        large: "h-16 px-8 py-4 text-xl min-w-[160px]",
        // Taille extra-large - pour boutons d'urgence
        xl: "h-20 px-10 py-5 text-2xl min-w-[200px]",
        // Bouton icon - carré minimum 44px
        icon: "h-12 w-12 p-0",
        // Bouton icon large
        iconLarge: "h-16 w-16 p-0",
      },
      priority: {
        high: "font-bold tracking-wide",
        normal: "font-semibold",
        low: "font-medium",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      priority: "normal",
    },
  }
);

export interface LargeButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof largeButtonVariants> {
  asChild?: boolean;
  /** Description pour lecteurs d'écran */
  ariaLabel?: string;
  /** Indique si l'action est en cours */
  loading?: boolean;
  /** Texte affiché pendant le chargement */
  loadingText?: string;
}

const LargeButton = React.forwardRef<HTMLButtonElement, LargeButtonProps>(
  ({
    className,
    variant,
    size,
    priority,
    asChild = false,
    disabled,
    loading = false,
    loadingText = "Chargement...",
    ariaLabel,
    children,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(largeButtonVariants({ variant, size, priority }), className)}
        ref={ref}
        disabled={isDisabled}
        aria-label={ariaLabel}
        aria-disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>{loadingText}</span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  }
);

LargeButton.displayName = "LargeButton";

export { LargeButton, largeButtonVariants };