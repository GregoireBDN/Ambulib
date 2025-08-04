"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Role } from "@/lib/type";

export interface SessionUser {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  isProfileComplete: boolean;
}

export interface Session {
  user: SessionUser;
  accessToken: string;
  refreshToken: string;
}

export interface UseSessionReturn {
  session: Session | null;
  loading: boolean;
  error: string | null;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

/**
 * Hook personnalisé pour gérer la session utilisateur côté client
 * Optimisé pour l'accessibilité avec gestion des annonces vocales
 */
export const useSession = (): UseSessionReturn => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Récupération initiale de la session
  useEffect(() => {
    const fetchSession = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("/api/auth/session", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const sessionData = await response.json();
          setSession(sessionData);
        } else if (response.status === 401) {
          // Session expirée ou inexistante
          setSession(null);
        } else {
          throw new Error("Erreur lors de la récupération de la session");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setSession(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Fonction de déconnexion
  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setSession(null);
        
        // Annonce vocale pour les lecteurs d'écran
        const announcement = document.createElement("div");
        announcement.setAttribute("aria-live", "polite");
        announcement.setAttribute("aria-atomic", "true");
        announcement.className = "sr-only";
        announcement.textContent = "Déconnexion réussie. Redirection vers la page d'accueil.";
        document.body.appendChild(announcement);
        
        setTimeout(() => {
          document.body.removeChild(announcement);
        }, 3000);

        router.push("/");
      } else {
        throw new Error("Erreur lors de la déconnexion");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la déconnexion");
      
      // Annonce d'erreur pour les lecteurs d'écran
      const errorAnnouncement = document.createElement("div");
      errorAnnouncement.setAttribute("aria-live", "assertive");
      errorAnnouncement.setAttribute("aria-atomic", "true");
      errorAnnouncement.className = "sr-only";
      errorAnnouncement.textContent = "Erreur lors de la déconnexion. Veuillez réessayer.";
      document.body.appendChild(errorAnnouncement);
      
      setTimeout(() => {
        document.body.removeChild(errorAnnouncement);
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  // Fonction de rafraîchissement de la session
  const refreshSession = async (): Promise<void> => {
    try {
      setError(null);
      
      const response = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        const sessionData = await response.json();
        setSession(sessionData);
      } else {
        // Token de rafraîchissement expiré, déconnexion nécessaire
        setSession(null);
        router.push("/auth/signin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du rafraîchissement");
      setSession(null);
    }
  };

  return {
    session,
    loading,
    error,
    signOut,
    refreshSession,
  };
};