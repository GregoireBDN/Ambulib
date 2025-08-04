"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ClientIcon - Wrapper pour éviter les erreurs d'hydratation avec Lucide React
 * Utilise next/dynamic avec ssr: false pour éviter complètement le rendu côté serveur
 * Version Next.js pour l'app web - plus robuste que la version du package UI
 */

interface ClientIconProps {
  /** L'icône Lucide à afficher */
  icon: LucideIcon;
  /** Classes CSS pour l'icône */
  className?: string;
  /** Propriétés aria */
  "aria-hidden"?: boolean;
  /** Fallback à afficher pendant l'hydratation */
  fallback?: React.ReactNode;
}

// Composant interne pour l'icône rendue dynamiquement
const DynamicIconRenderer = ({ 
  icon: Icon, 
  className, 
  "aria-hidden": ariaHidden = true 
}: { 
  icon: LucideIcon; 
  className?: string; 
  "aria-hidden"?: boolean; 
}) => {
  return <Icon className={className} aria-hidden={ariaHidden} />;
};

const ClientIcon = ({ 
  icon, 
  className, 
  "aria-hidden": ariaHidden = true,
  fallback = null 
}: ClientIconProps) => {
  // Utilisation de next/dynamic pour éviter le SSR complètement
  const DynamicIcon = React.useMemo(() => 
    dynamic(
      () => Promise.resolve(() => <DynamicIconRenderer icon={icon} className={className} aria-hidden={ariaHidden} />),
      { 
        ssr: false,
        loading: () => fallback ? <>{fallback}</> : <span className={cn("inline-block w-4 h-4", className)} aria-hidden={ariaHidden} />
      }
    ), 
    [icon, className, ariaHidden, fallback]
  );

  return <DynamicIcon />;
};

export { ClientIcon };