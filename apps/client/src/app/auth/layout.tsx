import type { Metadata } from "next"
import { HavRidLogo } from "@repo/ui"
import AuthBackground from "@/components/auth/AuthBackground"

export const metadata: Metadata = {
  title: {
    template: "%s | Authentification - Ambulib",
    default: "Authentification - Ambulib"
  },
  description: "Connexion sécurisée à votre espace patient Ambulib",
}

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Skip link pour accessibilité */}
      <a 
        href="#auth-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-md"
      >
        Aller au formulaire d'authentification
      </a>

      {/* Background pattern optionnel */}
      <AuthBackground>
        <div />
      </AuthBackground>
      
      <main className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          
          {/* Header avec logo */}
          <div className="text-center space-y-4">
            <HavRidLogo size="lg" className="mx-auto" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Services d'ambulance Ambulib
              </h1>
              <p className="text-muted-foreground text-sm">
                Interface sécurisée pour patients et proches
              </p>
            </div>
          </div>

          {/* Zone de contenu auth */}
          <div id="auth-content" className="space-y-6">
            {children}
          </div>

          {/* Footer */}
          <footer className="text-center text-xs text-muted-foreground space-y-2">
            <p>Interface optimisée pour l'accessibilité</p>
            <p>Support disponible 24h/7j au 01 23 45 67 89</p>
          </footer>
        </div>
      </main>
    </div>
  )
}