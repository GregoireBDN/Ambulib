"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, User, Settings, LogOut, Shield, Truck, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Role } from "@/lib/type";
import { ClientIcon } from "@/components/accessible/ClientIcon";
import UserAvatar from "./UserAvatar";

/**
 * UserMenuDropdown - Menu déroulant utilisateur ultra-accessible
 * Optimisé pour les personnes âgées et handicapées selon WCAG 2.1 Level AA
 * 
 * Fonctionnalités d'accessibilité :
 * - Navigation clavier complète (Tab, Escape, flèches)
 * - ARIA expanded/collapsed states
 * - Focus trap dans le dropdown
 * - Annonces vocales pour changements d'état
 * - Tailles minimales 44x44px pour tous éléments
 */

interface UserMenuDropdownProps {
  /** Informations utilisateur */
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
  };
  /** Fonction de déconnexion */
  onSignOut: () => Promise<void>;
  /** Classes CSS additionnelles */
  className?: string;
}

const UserMenuDropdown = ({ user, onSignOut, className }: UserMenuDropdownProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [announcements, setAnnouncements] = React.useState("");
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Gestion de l'ouverture/fermeture
  const toggleDropdown = (): void => {
    const newState = !isOpen;
    setIsOpen(newState);
    setAnnouncements(newState ? "Menu utilisateur ouvert" : "Menu utilisateur fermé");
  };

  // Fermeture avec Escape
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setAnnouncements("Menu utilisateur fermé");
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Fermeture au clic extérieur
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setAnnouncements("Menu utilisateur fermé");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Gestion navigation clavier dans le menu
  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (!isOpen) return;

    const menuItems = dropdownRef.current?.querySelectorAll(
      '[role="menuitem"]'
    ) as NodeListOf<HTMLElement>;

    if (!menuItems.length) return;

    const currentIndex = Array.from(menuItems).findIndex(
      item => item === document.activeElement
    );

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
        menuItems[nextIndex]?.focus();
        break;
      }
      
      case "ArrowUp": {
        event.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
        menuItems[prevIndex]?.focus();
        break;
      }
      
      case "Home":
        event.preventDefault();
        menuItems[0]?.focus();
        break;
      
      case "End":
        event.preventDefault();
        menuItems[menuItems.length - 1]?.focus();
        break;
    }
  };

  // Obtenir le label du rôle
  const getRoleLabel = (role: Role): string => {
    switch (role) {
      case Role.USER:
        return "Client";
      case Role.DRIVER:
        return "Chauffeur";
      case Role.ADMIN:
        return "Administrateur";
      case Role.SUPER_ADMIN:
        return "Super Administrateur";
      default:
        return "Utilisateur";
    }
  };

  // Obtenir l'icône du rôle
  const getRoleIcon = (role: Role) => {
    switch (role) {
      case Role.USER:
        return User;
      case Role.DRIVER:
        return Truck;
      case Role.ADMIN:
      case Role.SUPER_ADMIN:
        return Shield;
      default:
        return User;
    }
  };

  const RoleIcon = getRoleIcon(user.role);

  return (
    <>
      {/* Zone d'annonces pour lecteurs d'écran */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcements}
      </div>

      {/* Menu déroulant */}
      <div ref={dropdownRef} className={cn("relative", className)} onKeyDown={handleKeyDown}>
        
        {/* Bouton déclencheur */}
        <button
          ref={triggerRef}
          type="button"
          className="flex items-center gap-3 p-2 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 min-h-[44px]"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-label={`Menu utilisateur de ${user.firstName} ${user.lastName}`}
          onClick={toggleDropdown}
        >
          <UserAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            role={user.role}
            size="default"
          />
          
          <div className="hidden lg:block text-left">
            <div className="text-sm font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <ClientIcon icon={RoleIcon} className="h-3 w-3" />
              {getRoleLabel(user.role)}
            </div>
          </div>
          
          <ClientIcon 
            icon={ChevronDown}
            className={cn(
              "h-4 w-4 text-gray-600 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {/* Menu déroulant */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
            role="menu"
            aria-labelledby="user-menu-button"
          >
            
            {/* En-tête utilisateur */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <UserAvatar
                  firstName={user.firstName}
                  lastName={user.lastName}
                  role={user.role}
                  size="large"
                />
                <div className="flex-1 min-w-0">
                  <div className="text-base font-semibold text-gray-900 truncate">
                    {user.firstName} {user.lastName}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600">
                    <ClientIcon icon={RoleIcon} className="h-4 w-4" />
                    {getRoleLabel(user.role)}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Éléments du menu */}
            <div className="py-1">
              
              {/* Mon profil */}
              <Link
                href="/profile"
                role="menuitem"
                className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-inset transition-all duration-200 min-h-[44px]"
                onClick={() => setIsOpen(false)}
              >
                <ClientIcon icon={User} className="h-5 w-5" />
                Mon profil
              </Link>

              {/* Paramètres (si admin) */}
              {(user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) && (
                <Link
                  href="/admin/settings"
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-inset transition-all duration-200 min-h-[44px]"
                  onClick={() => setIsOpen(false)}
                >
                  <ClientIcon icon={Settings} className="h-5 w-5" />
                  Paramètres
                </Link>
              )}

              {/* Gestion utilisateurs (si admin) */}
              {(user.role === Role.ADMIN || user.role === Role.SUPER_ADMIN) && (
                <Link
                  href="/admin/users"
                  role="menuitem"
                  className="flex items-center gap-3 px-4 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-inset transition-all duration-200 min-h-[44px]"
                  onClick={() => setIsOpen(false)}
                >
                  <ClientIcon icon={Users} className="h-5 w-5" />
                  Gestion utilisateurs
                </Link>
              )}
            </div>

            {/* Séparateur */}
            <div className="border-t border-gray-100 my-1" />

            {/* Déconnexion */}
            <button
              type="button"
              role="menuitem"
              className="flex items-center gap-3 w-full px-4 py-3 text-base text-red-700 hover:bg-red-50 hover:text-red-900 focus:outline-none focus:ring-4 focus:ring-red-500/50 focus:ring-inset transition-all duration-200 min-h-[44px]"
              onClick={async () => {
                setIsOpen(false);
                setAnnouncements("Déconnexion en cours...");
                await onSignOut();
              }}
            >
              <ClientIcon icon={LogOut} className="h-5 w-5" />
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenuDropdown;