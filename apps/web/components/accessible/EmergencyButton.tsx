"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Phone, AlertTriangle } from "lucide-react";
import { ClientIcon } from "./ClientIcon";

/**
 * EmergencyButton - Bouton d'urgence ultra-accessible
 * Optimisé pour les situations critiques et les personnes âgées/handicapées
 * 
 * Fonctionnalités spéciales :
 * - Très grande taille (minimum 80px)
 * - Contraste maximum
 * - Animation d'attention discrète
 * - Double confirmation
 * - Focus ultra-visible
 * - Support vocal/lecteur d'écran
 */

export interface EmergencyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  /** Action à exécuter après confirmation */
  onEmergencyAction: () => void;
  /** Texte personnalisé (défaut: "URGENCE") */
  emergencyText?: string;
  /** Message de confirmation personnalisé */
  confirmationMessage?: string;
  /** Désactiver la double confirmation (non recommandé) */
  skipConfirmation?: boolean;
  /** Variante du bouton d'urgence */
  variant?: "call" | "medical" | "general";
  /** Taille du bouton */
  size?: "large" | "xl" | "giant";
}

const EmergencyButton = React.forwardRef<HTMLButtonElement, EmergencyButtonProps>(
  ({
    className,
    onEmergencyAction,
    emergencyText = "URGENCE",
    confirmationMessage = "Êtes-vous sûr de vouloir déclencher l'urgence ?",
    skipConfirmation = false,
    variant = "general",
    size = "large",
    disabled,
    ...props
  }, ref) => {
    const [isConfirming, setIsConfirming] = React.useState(false);
    const [confirmationTimer, setConfirmationTimer] = React.useState<NodeJS.Timeout | null>(null);

    // Auto-annulation de la confirmation après 5 secondes
    React.useEffect(() => {
      if (isConfirming) {
        const timer = setTimeout(() => {
          setIsConfirming(false);
        }, 5000);
        setConfirmationTimer(timer);
        
        return () => {
          if (timer) clearTimeout(timer);
        };
      } else {
        if (confirmationTimer) {
          clearTimeout(confirmationTimer);
          setConfirmationTimer(null);
        }
      }
    }, [isConfirming, confirmationTimer]);

    const handleClick = () => {
      if (skipConfirmation) {
        onEmergencyAction();
        return;
      }

      if (!isConfirming) {
        setIsConfirming(true);
      } else {
        setIsConfirming(false);
        onEmergencyAction();
      }
    };

    const handleCancel = () => {
      setIsConfirming(false);
    };

    // Styles par variante
    const variantStyles = {
      call: {
        bg: "bg-red-600 hover:bg-red-700 active:bg-red-800",
        border: "border-red-700",
        icon: Phone,
        ariaLabel: "Appeler les secours d'urgence",
      },
      medical: {
        bg: "bg-red-700 hover:bg-red-800 active:bg-red-900", 
        border: "border-red-800",
        icon: AlertTriangle,
        ariaLabel: "Urgence médicale",
      },
      general: {
        bg: "bg-red-600 hover:bg-red-700 active:bg-red-800",
        border: "border-red-700", 
        icon: AlertTriangle,
        ariaLabel: "Bouton d'urgence général",
      },
    };

    const sizeStyles = {
      large: "h-20 w-20 text-lg min-w-[120px]",
      xl: "h-24 w-24 text-xl min-w-[160px]", 
      giant: "h-32 w-32 text-2xl min-w-[200px]",
    };

    const currentVariant = variantStyles[variant];
    const Icon = currentVariant.icon;

    if (isConfirming) {
      return (
        <div className="flex flex-col items-center gap-4">
          {/* Message de confirmation */}
          <div 
            className="p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg text-center max-w-md"
            role="alert"
            aria-live="assertive"
          >
            <ClientIcon icon={AlertTriangle} className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
            <p className="text-lg font-semibold text-yellow-800 mb-3">
              {confirmationMessage}
            </p>
            <p className="text-sm text-yellow-700">
              Confirmation automatiquement annulée dans 5 secondes
            </p>
          </div>

          {/* Boutons de confirmation */}
          <div className="flex gap-4">
            <button
              ref={ref}
              onClick={handleClick}
              className={cn(
                "inline-flex items-center justify-center gap-3",
                "px-8 py-4 rounded-lg font-bold text-lg",
                "bg-red-600 hover:bg-red-700 text-white",
                "border-3 border-red-700",
                "focus:outline-none focus:ring-4 focus:ring-red-500/50",
                "focus:ring-offset-2 transition-all duration-200",
                "shadow-lg hover:shadow-xl",
                "animate-pulse",
                className
              )}
              aria-label="Confirmer l'urgence"
              autoFocus
              {...props}
            >
              <ClientIcon icon={Icon} className="h-6 w-6" />
              CONFIRMER
            </button>

            <button
              onClick={handleCancel}
              className={cn(
                "inline-flex items-center justify-center gap-2",
                "px-6 py-4 rounded-lg font-semibold text-lg",
                "bg-gray-200 hover:bg-gray-300 text-gray-800",
                "border-2 border-gray-400",
                "focus:outline-none focus:ring-4 focus:ring-gray-500/50",
                "focus:ring-offset-2 transition-all duration-200"
              )}
              aria-label="Annuler l'urgence"
            >
              ANNULER
            </button>
          </div>
        </div>
      );
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          // Base styles avec accessibilité maximale
          "inline-flex items-center justify-center gap-4",
          "rounded-xl font-black tracking-wide",
          "shadow-2xl transition-all duration-200",
          // Couleurs ultra-contrastées
          currentVariant.bg,
          "text-white border-4",
          currentVariant.border,
          // Focus ultra-visible
          "focus:outline-none focus:ring-6 focus:ring-red-500/60",
          "focus:ring-offset-4 focus:ring-offset-white",
          // Animation d'attention subtile
          "hover:scale-105 active:scale-95",
          "hover:shadow-3xl",
          // Taille selon la prop
          sizeStyles[size],
          // Animation pulse discrète pour attirer l'attention
          !disabled && "animate-pulse-slow",
          // État disabled
          disabled && "opacity-60 cursor-not-allowed grayscale",
          className
        )}
        aria-label={currentVariant.ariaLabel}
        aria-describedby={`${emergencyText.toLowerCase()}-help`}
        {...props}
      >
        <ClientIcon icon={Icon} className="h-8 w-8 shrink-0" />
        <span className="font-black">{emergencyText}</span>
      </button>
    );
  }
);

EmergencyButton.displayName = "EmergencyButton";

export { EmergencyButton };