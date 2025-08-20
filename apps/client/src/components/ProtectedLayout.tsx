"use client"

import { Suspense } from "react"
import dynamic from "next/dynamic"
import ProtectedRoute from "./ProtectedRoute"

interface ProtectedLayoutProps {
  children: React.ReactNode
}

// Dynamic import du AuthProvider sans SSR pour les pages protégées
const DynamicAuthProvider = dynamic(
  () => import("@/contexts/AuthContext").then(mod => ({ default: mod.AuthProvider })), 
  { ssr: false }
)

function ProtectedLoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4" role="status" aria-live="polite">
        <div 
          className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"
          aria-hidden="true"
        ></div>
        <p className="text-muted-foreground">Connexion au service sécurisé...</p>
        <span className="sr-only">Chargement en cours</span>
      </div>
    </div>
  )
}

/**
 * Layout pour les pages protégées qui nécessitent une authentification
 * Fournit le contexte auth complet avec initialisation API et protection
 * C'est ici que l'API client est initialisé pour les pages nécessitant des données
 */
export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Aller au contenu principal
      </a>
      
      <Suspense fallback={<ProtectedLoadingFallback />}>
        <DynamicAuthProvider>
          <ProtectedRoute>
            <main id="main-content" role="main">
              {children}
            </main>
          </ProtectedRoute>
        </DynamicAuthProvider>
      </Suspense>
    </div>
  )
}