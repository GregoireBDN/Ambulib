"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
  Label,
  HavRidLogo
} from "@repo/ui"
import PublicLayout from "@/components/PublicLayout"
import { useAuth } from "@/contexts/AuthContext"

export default function ConnexionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, isLoading } = useAuth()
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const redirectPath = searchParams.get('redirect') || '/dashboard'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      await signIn(email, password)
      // Le middleware se chargera de la redirection automatiquement
      // On peut forcer un refresh de la page si nécessaire
      window.location.href = redirectPath
    } catch (error: unknown) {
      console.error("Erreur connexion:", error)
      
      // Helper pour extraire le message d'erreur
      const errorMessage = (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') ? error.message : String(error)
      
      // Gestion spécifique des erreurs
      if (errorMessage.includes('User not found') || 
          errorMessage.includes('not found')) {
        setError("Aucun compte trouvé avec cette adresse email. Vérifiez votre email ou créez un compte.")
      } else if (errorMessage.includes('invalid') || 
                 errorMessage.includes('password') ||
                 errorMessage.includes('credentials')) {
        setError("Mot de passe incorrect. Vérifiez votre mot de passe ou utilisez 'Mot de passe oublié'.")
      } else if (errorMessage.includes('network') || 
                 errorMessage.includes('fetch')) {
        setError("Problème de connexion. Vérifiez votre connexion internet et réessayez.")
      } else if (errorMessage.includes('blocked') ||
                 errorMessage.includes('suspended')) {
        setError("Votre compte a été suspendu. Contactez le support pour plus d'informations.")
      } else {
        setError("Identifiants incorrects. Vérifiez votre email et mot de passe.")
      }
      
      // Faire défiler la page vers le haut en cas d'erreur
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSignUp = () => {
    router.push("/auth/inscription")
  }

  return (
    <PublicLayout>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-8">
          {/* Logo centré */}
          <div className="text-center">
            <div 
              onClick={() => router.push("/")} 
              className="cursor-pointer inline-block mx-auto mb-6 transition-opacity hover:opacity-80"
            >
              <HavRidLogo size="lg" />
            </div>
          </div>

          {/* Carte de connexion */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Connexion à votre espace
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Accédez à vos réservations et informations médicales
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div 
                    id="login-error"
                    role="alert"
                    className="bg-red-50 border border-red-200 rounded-lg p-4 mb-2"
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-red-500 text-xl flex-shrink-0">⚠️</div>
                      <div>
                        <h3 className="text-red-800 font-semibold text-base mb-1">
                          Erreur de connexion
                        </h3>
                        <p className="text-red-700 text-base">
                          {error}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre.email@exemple.fr"
                    required
                    aria-describedby={error ? "login-error" : undefined}
                    className="h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                    aria-describedby={error ? "login-error" : undefined}
                    className="h-12 text-base"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                </Button>
              </form>

              <div className="text-center space-y-4">
                <button 
                  type="button"
                  className="text-primary hover:underline text-sm"
                  onClick={() => router.push("/auth/mot-de-passe-oublie")}
                >
                  Mot de passe oublié ?
                </button>

                <div className="border-t pt-4">
                  <p className="text-muted-foreground text-sm mb-3">
                    Vous n'avez pas encore de compte ?
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={handleSignUp}
                    className="w-full h-12 text-base"
                  >
                    Créer un compte
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support d'urgence */}
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Besoin d'aide ou urgence médicale ?
            </p>
            <p className="text-sm">
              📞 <strong>Support 24h/7j : 01 23 45 67 89</strong>
            </p>
            <p className="text-sm">
              🚨 <strong>Urgence vitale : 15 (SAMU)</strong>
            </p>
          </div>
        </div>
      </main>
    </PublicLayout>
  )
}