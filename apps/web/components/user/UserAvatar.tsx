"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Role } from "@/lib/type";

/**
 * UserAvatar - Avatar utilisateur accessible avec initiales
 * Optimisé pour les personnes âgées et handicapées
 * 
 * Fonctionnalités d'accessibilité :
 * - Taille minimum 44x44px (WCAG)
 * - Contraste élevé pour les initiales
 * - Alt text descriptif
 * - Focus visible
 */

export interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Prénom de l'utilisateur */
  firstName: string;
  /** Nom de l'utilisateur */
  lastName: string;
  /** Rôle de l'utilisateur pour la couleur */
  role: Role;
  /** Taille de l'avatar */
  size?: "default" | "large" | "xl";
  /** URL de l'image de profil (optionnel) */
  imageUrl?: string;
  /** Indicateur de statut en ligne */
  isOnline?: boolean;
}

const UserAvatar = React.forwardRef<HTMLDivElement, UserAvatarProps>(
  ({
    firstName,
    lastName,
    role,
    size = "default",
    imageUrl,
    isOnline = true,
    className,
    ...props
  }, ref) => {
    
    // Génération des initiales
    const getInitials = (first: string, last: string): string => {
      return `${first.charAt(0).toUpperCase()}${last.charAt(0).toUpperCase()}`;
    };

    // Couleurs selon le rôle
    const getRoleColors = (userRole: Role) => {
      switch (userRole) {
        case Role.USER:
          return "bg-blue-500 text-white"; // Clients - Bleu principal
        case Role.DRIVER:
          return "bg-green-500 text-white"; // Chauffeurs - Vert
        case Role.ADMIN:
          return "bg-purple-500 text-white"; // Admins - Violet
        case Role.SUPER_ADMIN:
          return "bg-red-500 text-white"; // Super Admin - Rouge
        default:
          return "bg-gray-500 text-white";
      }
    };

    // Tailles
    const sizeClasses = {
      default: "h-11 w-11 text-sm", // 44px
      large: "h-14 w-14 text-base",  // 56px
      xl: "h-16 w-16 text-lg",       // 64px
    };

    const statusSizes = {
      default: "h-3 w-3",
      large: "h-3.5 w-3.5", 
      xl: "h-4 w-4",
    };

    const initials = getInitials(firstName, lastName);
    const colorClasses = getRoleColors(role);
    
    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        {...props}
      >
        {/* Avatar principal */}
        <div
          className={cn(
            // Taille et forme
            sizeClasses[size as keyof typeof sizeClasses],
            "rounded-full flex items-center justify-center",
            // Couleurs selon le rôle
            colorClasses,
            // Accessibilité
            "font-semibold ring-2 ring-white shadow-lg",
            // Focus si interactif
            "focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2"
          )}
          role="img"
          aria-label={`Avatar de ${firstName} ${lastName}, ${role}`}
          tabIndex={0}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`Photo de profil de ${firstName} ${lastName}`}
              className="h-full w-full rounded-full object-cover"
              width={sizeValue}
              height={sizeValue}
            />
          ) : (
            <span aria-hidden="true">
              {initials}
            </span>
          )}
        </div>

        {/* Indicateur de statut */}
        {isOnline && (
          <div
            className={cn(
              // Position
              "absolute -bottom-0 -right-0",
              // Taille selon l'avatar
              statusSizes[size as keyof typeof statusSizes],
              // Style
              "rounded-full bg-green-400 ring-2 ring-white"
            )}
            role="status"
            aria-label="En ligne"
          />
        )}
      </div>
    );
  }
);

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;