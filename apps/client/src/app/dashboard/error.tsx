"use client"

import { useEffect } from "react"
import { Button, Card, CardContent, CardHeader, CardTitle, HavRidLogo } from "@repo/ui"

interface DashboardErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  useEffect(() => {
    // Log l'erreur pour monitoring (Sentry, LogRocket, etc.)
    console.error("Dashboard error:", error)
  }, [error])

  const isNetworkError = error.message.includes('fetch') || error.message.includes('network')
  const isAuthError = error.message.includes('unauthorized') || error.message.includes('403')

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <HavRidLogo size="md" className="mx-auto opacity-75" />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              {isNetworkError ? "🌐" : isAuthError ? "🔒" : "⚠️"}
              {isNetworkError 
                ? "Problème de connexion" 
                : isAuthError 
                  ? "Session expirée"
                  : "Erreur inattendue"
              }
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground text-sm">
              {isNetworkError 
                ? "Impossible de charger vos données. Vérifiez votre connexion internet."
                : isAuthError
                  ? "Votre session a expiré. Veuillez vous reconnecter."
                  : "Une erreur s'est produite lors du chargement de votre espace personnel."
              }
            </p>

            {/* Détails techniques (masqué par défaut) */}
            <details className="text-xs text-muted-foreground border rounded p-3">
              <summary className="cursor-pointer font-medium mb-2">
                Détails techniques
              </summary>
              <code className="bg-muted p-2 rounded block text-xs">
                {error.message}
                {error.digest && (
                  <div className="mt-1 opacity-75">
                    ID: {error.digest}
                  </div>
                )}
              </code>
            </details>

            <div className="flex flex-col gap-3 pt-4">
              <Button 
                onClick={reset}
                className="w-full"
              >
                🔄 Réessayer
              </Button>
              
              {isAuthError && (
                <Button 
                  variant="outline" 
                  onClick={() => window.location.href = '/auth/connexion'}
                  className="w-full"
                >
                  🔑 Se reconnecter
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.location.href = '/'}
                className="w-full"
              >
                🏠 Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Support disponible 24h/7j</p>
          <p className="font-mono">01 23 45 67 89</p>
        </div>
      </div>
    </div>
  )
}