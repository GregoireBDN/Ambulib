"use client"

import { useAuth } from "@/contexts/AuthContext"

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export default function ProtectedRoute({ 
  children, 
  fallback
}: ProtectedRouteProps) {
  const { isLoading } = useAuth()

  // Loading ultra-rapide car lecture cookie = synchrone
  if (isLoading) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4" role="status" aria-live="polite">
            <div 
              className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"
              aria-hidden="true"
            ></div>
            <p className="text-muted-foreground">Initialisation...</p>
            <span className="sr-only">Chargement en cours</span>
          </div>
        </div>
      )
    )
  }

  // Middleware gère les redirections automatiquement
  // On fait confiance au middleware et on affiche le contenu
  return <>{children}</>
}