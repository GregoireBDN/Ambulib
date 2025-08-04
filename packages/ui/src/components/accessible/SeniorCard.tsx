"use client";

import * as React from "react";
import { cn } from "@repo/ui/lib/utils";
import { ChevronRight, Info } from "lucide-react";

/**
 * SeniorCard - Composant carte optimisé pour l'accessibilité
 * Spécialement conçu pour les personnes âgées et handicapées
 * 
 * Fonctionnalités d'accessibilité :
 * - Sémantique HTML correcte
 * - Focus management pour cartes interactives
 * - Contraste élevé
 * - Espacement généreux
 * - Support lecteurs d'écran
 * - Navigation clavier
 */

export interface SeniorCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Titre principal de la carte */
  title: string;
  /** Description/contenu de la carte */
  description?: string;
  /** Indique si la carte est cliquable/interactive */
  interactive?: boolean;
  /** Action à exécuter lors du clic (rend la carte interactive) */
  onAction?: () => void;
  /** URL de destination (alternative à onAction) */
  href?: string;
  /** Priorité visuelle de la carte */
  priority?: "low" | "normal" | "high" | "urgent";
  /** Taille de la carte */
  size?: "default" | "large" | "xl";
  /** Contenu personnalisé dans le header */
  headerContent?: React.ReactNode;
  /** Contenu personnalisé dans le footer */
  footerContent?: React.ReactNode;
  /** Icône à afficher */
  icon?: React.ComponentType<{ className?: string }>;
  /** Label ARIA pour l'action (requis si interactive) */
  actionLabel?: string;
  /** Indique si la carte représente un état d'erreur */
  hasError?: boolean;
  /** Indique si la carte représente un état de succès */
  hasSuccess?: boolean;
}

const SeniorCard = React.forwardRef<HTMLElement, SeniorCardProps>(
  ({
    className,
    title,
    description,
    interactive = false,
    onAction,
    href,
    priority = "normal",
    size = "default",
    headerContent,
    footerContent,
    icon: Icon,
    actionLabel,
    hasError = false,
    hasSuccess = false,
    children,
    ...props
  }, ref) => {
    const isClickable = Boolean(onAction || href);
    const isInteractive = interactive || isClickable;

    // Détermination de l'élément HTML approprié
    const Component = href ? "a" : isInteractive ? "button" : "article";

    // Styles de priorité
    const priorityStyles = {
      low: "border-gray-200 bg-gray-50",
      normal: "border-gray-300 bg-white",
      high: "border-blue-300 bg-blue-50",
      urgent: "border-red-300 bg-red-50 ring-2 ring-red-200",
    };

    // Styles de taille
    const sizeStyles = {
      default: "p-6",
      large: "p-8", 
      xl: "p-10",
    };

    const titleSizeStyles = {
      default: "text-xl",
      large: "text-2xl",
      xl: "text-3xl",
    };

    const descriptionSizeStyles = {
      default: "text-base",
      large: "text-lg",
      xl: "text-xl",
    };

    // Gestion des états visuels
    let borderColor = priorityStyles[priority];
    if (hasError) {
      borderColor = "border-red-400 bg-red-50";
    } else if (hasSuccess) {
      borderColor = "border-green-400 bg-green-50";
    }

    const handleClick = () => {
      if (onAction) onAction();
    };

    const cardProps = {
      ref: ref as any,
      className: cn(
        // Styles de base
        "block w-full rounded-xl border-2 shadow-lg transition-all duration-200",
        sizeStyles[size],
        borderColor,
        // Styles interactifs
        isInteractive && [
          "cursor-pointer",
          "hover:shadow-xl hover:scale-[1.02]",
          "focus:outline-none focus:ring-4 focus:ring-blue-500/50",
          "focus:ring-offset-2 focus:border-blue-500",
          "active:scale-[0.98]",
        ],
        className
      ),
      onClick: isClickable ? handleClick : undefined,
      href: href,
      "aria-label": actionLabel,
      role: isInteractive && !href ? "button" : undefined,
      tabIndex: isInteractive ? 0 : undefined,
      ...props,
    };

    return (
      <Component {...cardProps}>
        {/* Header avec titre et icône */}
        <header className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4 flex-1">
            {Icon && (
              <div className={cn(
                "shrink-0 rounded-lg p-2",
                hasError && "bg-red-100 text-red-600",
                hasSuccess && "bg-green-100 text-green-600",
                !hasError && !hasSuccess && "bg-blue-100 text-blue-600"
              )}>
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h3 className={cn(
                "font-bold text-gray-900 leading-tight",
                titleSizeStyles[size]
              )}>
                {title}
              </h3>
            </div>
          </div>

          {/* Contenu header personnalisé */}
          {headerContent && (
            <div className="shrink-0 ml-4">
              {headerContent}
            </div>
          )}

          {/* Indicateur d'interactivité */}
          {isInteractive && (
            <ChevronRight 
              className="h-6 w-6 text-gray-400 shrink-0 ml-2" 
              aria-hidden="true" 
            />
          )}
        </header>

        {/* Description */}
        {description && (
          <p className={cn(
            "text-gray-700 leading-relaxed mb-4",
            descriptionSizeStyles[size]
          )}>
            {description}
          </p>
        )}

        {/* Contenu principal */}
        {children && (
          <div className="space-y-4 mb-4">
            {children}
          </div>
        )}

        {/* Footer */}
        {footerContent && (
          <footer className="mt-6 pt-4 border-t border-gray-200">
            {footerContent}
          </footer>
        )}

        {/* Messages d'état */}
        {hasError && (
          <div className="mt-4 p-3 bg-red-100 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-red-600" aria-hidden="true" />
              <span className="text-red-800 font-medium">
                Une erreur est survenue
              </span>
            </div>
          </div>
        )}

        {hasSuccess && (
          <div className="mt-4 p-3 bg-green-100 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5 text-green-600" aria-hidden="true" />
              <span className="text-green-800 font-medium">
                Opération réussie
              </span>
            </div>
          </div>
        )}
      </Component>
    );
  }
);

SeniorCard.displayName = "SeniorCard";

export { SeniorCard };