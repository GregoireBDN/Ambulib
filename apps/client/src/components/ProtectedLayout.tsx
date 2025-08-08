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
      <div className="text-center space-y-4">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="text-muted-foreground">Connexion au service sécurisé...</p>
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
      <Suspense fallback={<ProtectedLoadingFallback />}>
        <DynamicAuthProvider>
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </DynamicAuthProvider>
      </Suspense>
    </div>
  )
}