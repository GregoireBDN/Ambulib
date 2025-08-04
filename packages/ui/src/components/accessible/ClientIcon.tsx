"use client";

import { LucideIcon } from "lucide-react";

/**
 * ClientIcon - Wrapper simple pour les icônes
 * Note: Dans un package UI partagé, on utilise suppressHydrationWarning
 * Pour une solution plus robuste, utiliser la version dans apps/web
 */

interface ClientIconProps {
  icon: LucideIcon;
  className?: string;
  "aria-hidden"?: boolean;
}

const ClientIcon = ({
  icon: Icon,
  className,
  "aria-hidden": ariaHidden = true,
}: ClientIconProps) => {
  return (
    <span suppressHydrationWarning>
      <Icon className={className} aria-hidden={ariaHidden} />
    </span>
  );
};

export { ClientIcon };