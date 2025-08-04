"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, X, User, Settings, Bell, Home } from "lucide-react";
import { Role } from "@/lib/type";
import { LargeButton } from "@/components/accessible/LargeButton";
import { EmergencyButton } from "@/components/accessible/EmergencyButton";
import { UserMenuDropdown } from "@/components/user";

/**
 * AccessibleAppBar - Barre de navigation ultra-accessible
 * Optimisée pour les personnes âgées et handicapées selon WCAG 2.1 Level AA
 * 
 * Fonctionnalités d'accessibilité :
 * - Skip links pour navigation clavier
 * - ARIA landmarks et labels descriptifs
 * - Tailles minimales 44x44px (WCAG)
 * - Contraste élevé garanti (4.5:1+)
 * - Navigation adaptive selon les rôles
 * - Support complet lecteurs d'écran
 * - Focus management ultra-visible
 * - Menu mobile accessible
 */

interface Session {
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
    isProfileComplete: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

interface AccessibleAppBarProps {
  session?: Session | null;
}

const AccessibleAppBar = ({ session }: AccessibleAppBarProps): React.JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [announcements, setAnnouncements] = React.useState<string>("");
  const [isClient, setIsClient] = React.useState(false);
  const router = useRouter();

  // Éviter l'erreur d'hydratation
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  // Gestion du menu mobile avec gestion des focus
  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Annoncer le changement d'état pour les lecteurs d'écran
    setAnnouncements(isMobileMenuOpen ? "Menu fermé" : "Menu ouvert");
  };

  // Fermeture du menu avec Escape
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setAnnouncements("Menu fermé");
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMobileMenuOpen]);

  // Navigation adaptée selon le rôle
  const getNavigationItems = () => {
    if (!session?.user) {
      return [
        { href: "/", label: "Accueil", icon: Home, description: "Retour à la page d'accueil" },
      ];
    }

    const baseItems = [
      { href: "/dashboard", label: "Tableau de bord", icon: Home, description: "Accéder à votre espace personnel" }
    ];

    switch (session.user.role) {
      case Role.USER:
        return [
          ...baseItems,
          { href: "/reservations", label: "Mes réservations", icon: Bell, description: "Gérer vos réservations de transport" },
          { href: "/profile", label: "Mon profil", icon: User, description: "Modifier vos informations personnelles" },
        ];
      
      case Role.DRIVER:
        return [
          ...baseItems,
          { href: "/courses", label: "Mes courses", icon: Bell, description: "Voir vos courses assignées" },
          { href: "/planning", label: "Planning", icon: Settings, description: "Consulter votre planning" },
          { href: "/profile", label: "Profil", icon: User, description: "Modifier vos informations" },
        ];
      
      case Role.ADMIN:
        return [
          ...baseItems,
          { href: "/admin/users", label: "Utilisateurs", icon: User, description: "Gérer les utilisateurs du système" },
          { href: "/admin/settings", label: "Configuration", icon: Settings, description: "Paramètres du système" },
          { href: "/analytics", label: "Statistiques", icon: Bell, description: "Consulter les données analytiques" },
        ];
      
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();

  const handleSignOut = async (): Promise<void> => {
    try {
      const response = await fetch("/api/auth/signout", { 
        method: "POST",
        credentials: "include" 
      });
      
      if (response.ok) {
        setAnnouncements("Déconnexion réussie. Redirection en cours...");
        // Petit délai pour que l'annonce soit lue par les lecteurs d'écran
        setTimeout(() => {
          router.push("/");
        }, 500);
      } else {
        throw new Error("Échec de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      setAnnouncements("Erreur lors de la déconnexion. Veuillez réessayer.");
    }
  };

  return (
    <>
      {/* Skip Links - Navigation rapide pour utilisateurs clavier */}
      <div className="sr-only focus-within:not-sr-only">
        <Link
          href="#main-content"
          className="fixed top-4 left-4 z-[100] bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2"
        >
          Aller au contenu principal
        </Link>
        <Link
          href="#main-navigation"
          className="fixed top-4 left-40 z-[100] bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2"
        >
          Aller à la navigation
        </Link>
      </div>

      {/* Zone d'annonces pour lecteurs d'écran */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {announcements}
      </div>

      {/* Header principal */}
      <header
        role="banner"
        className="sticky top-0 z-50 w-full bg-white border-b-2 border-blue-200 shadow-lg backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo optimisé */}
            <div className="flex items-center">
              <Link
                href="/"
                className="flex items-center space-x-3 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 rounded-lg p-2"
                aria-label="Ambulib - Retour à l'accueil"
              >
                <Image
                  src="/logo-ambulib.svg"
                  alt="Logo Ambulib"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
                <span className="text-3xl font-bold text-blue-900">
                  Ambulib
                </span>
              </Link>
            </div>

            {/* Navigation principale - Desktop */}
            <nav
              id="main-navigation"
              role="navigation"
              aria-label="Navigation principale"
              className="hidden lg:flex items-center space-x-2"
            >
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-lg font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 min-h-[44px]"
                    aria-describedby={`nav-${item.href.replace('/', '')}`}
                  >
                    {isClient && <Icon className="h-5 w-5" aria-hidden="true" />}
                    {item.label}
                    <span id={`nav-${item.href.replace('/', '')}`} className="sr-only">
                      {item.description}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Actions utilisateur */}
            <div className="flex items-center space-x-3">
              
              {/* Bouton d'urgence - toujours visible pour les clients */}
              {session?.user.role === Role.USER && (
                <EmergencyButton
                  onEmergencyAction={() => window.location.href = "tel:15"}
                  size="large"
                  className="hidden sm:flex"
                  aria-label="Appeler les secours d'urgence - Numéro 15"
                />
              )}

              {/* Menu utilisateur ou bouton de connexion */}
              {session?.user ? (
                <UserMenuDropdown
                  user={session.user}
                  onSignOut={handleSignOut}
                  className="hidden lg:block"
                />
              ) : (
                <Link href="/auth/signin" className="hidden lg:block">
                  <LargeButton
                    variant="primary"
                    size="default"
                    ariaLabel="Se connecter à votre compte Ambulib"
                  >
                    {isClient && <User className="h-5 w-5" aria-hidden="true" />}
                    Connexion
                  </LargeButton>
                </Link>
              )}

              {/* Bouton menu mobile */}
              <button
                type="button"
                className="lg:hidden inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 min-h-[44px] min-w-[44px]"
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                onClick={toggleMobileMenu}
              >
                {isClient && (
                  isMobileMenuOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden bg-white border-t-2 border-blue-200 shadow-lg"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation mobile"
          >
            <nav
              role="navigation"
              aria-label="Navigation mobile"
              className="px-4 py-6 space-y-3"
            >
              {/* Bouton d'urgence en haut du menu mobile pour les clients */}
              {session?.user.role === Role.USER && (
                <div className="pb-4 border-b border-gray-200">
                  <EmergencyButton
                    onEmergencyAction={() => window.location.href = "tel:15"}
                    size="large"
                    className="w-full"
                    aria-label="Appeler les secours d'urgence - Numéro 15"
                  />
                </div>
              )}

              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-4 rounded-lg text-lg font-medium text-gray-700 hover:text-blue-900 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 transition-all duration-200 min-h-[44px]"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-describedby={`mobile-nav-${item.href.replace('/', '')}`}
                  >
                    {isClient && <Icon className="h-6 w-6" aria-hidden="true" />}
                    {item.label}
                    <span id={`mobile-nav-${item.href.replace('/', '')}`} className="sr-only">
                      {item.description}
                    </span>
                  </Link>
                );
              })}

              {/* Actions utilisateur mobile */}
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {session?.user ? (
                  <UserMenuDropdown
                    user={session.user}
                    onSignOut={async () => {
                      setIsMobileMenuOpen(false);
                      await handleSignOut();
                    }}
                    className="w-full"
                  />
                ) : (
                  <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
                    <LargeButton
                      variant="primary"
                      size="default"
                      className="w-full"
                      ariaLabel="Se connecter à votre compte Ambulib"
                    >
                      {isClient && <User className="h-5 w-5" aria-hidden="true" />}
                      Connexion
                    </LargeButton>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default AccessibleAppBar;