"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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

export default function MotDePasseOubliePage() {
  const router = useRouter()
  
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 429) {
          setError('Trop de tentatives. Veuillez attendre 15 minutes avant de faire une nouvelle demande.')
        } else {
          setError(result.message || 'Une erreur est survenue lors de l\'envoi de l\'email.')
        }
        return
      }

      setIsSuccess(true)
    } catch (error) {
      console.error("Erreur réseau:", error)
      setError("Problème de connexion. Vérifiez votre connexion internet et réessayez.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackToLogin = () => {
    router.push("/auth/connexion")
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

          {/* Carte de réinitialisation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {isSuccess ? "Email envoyé !" : "Mot de passe oublié"}
              </CardTitle>
              <p className="text-center text-muted-foreground">
                {isSuccess 
                  ? "Vérifiez votre boîte email pour la suite" 
                  : "Saisissez votre email pour recevoir un lien de réinitialisation"
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {isSuccess ? (
                /* État de succès */
                <div className="text-center space-y-6">
                  <div className="text-6xl mb-4">📧</div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-green-800 font-semibold text-lg mb-3">
                      Email de réinitialisation envoyé
                    </h3>
                    <div className="text-green-700 space-y-2 text-sm">
                      <p>
                        <strong>Si cette adresse email est associée à un compte</strong>, 
                        vous recevrez un lien de réinitialisation à :
                      </p>
                      <p className="font-mono bg-green-100 px-3 py-2 rounded border">
                        {email}
                      </p>
                      <p className="text-xs text-green-600 mt-4">
                        Le lien sera valide pendant 1 heure
                      </p>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-blue-800 font-medium text-sm mb-2">
                      💡 Conseils utiles
                    </h4>
                    <ul className="text-blue-700 text-xs space-y-1 text-left">
                      <li>• Vérifiez votre dossier spam/courrier indésirable</li>
                      <li>• L'email peut prendre quelques minutes à arriver</li>
                      <li>• Si vous ne recevez rien, l'email n'est peut-être pas enregistré</li>
                      <li>• Vous pouvez refaire une demande dans 15 minutes</li>
                    </ul>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <Button 
                      variant="outline" 
                      onClick={handleBackToLogin}
                      className="h-12 px-6 text-base"
                    >
                      ← Retour à la connexion
                    </Button>
                    <Button 
                      onClick={() => {
                        setIsSuccess(false)
                        setEmail("")
                        setError("")
                      }}
                      className="h-12 px-6 text-base"
                    >
                      Renvoyer un email
                    </Button>
                  </div>
                </div>
              ) : (
                /* Formulaire de demande */
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div 
                        role="alert"
                        className="bg-red-50 border border-red-200 rounded-lg p-4"
                      >
                        <div className="flex items-start gap-3">
                          <div className="text-red-500 text-xl flex-shrink-0">⚠️</div>
                          <div>
                            <h3 className="text-red-800 font-semibold text-base mb-1">
                              Erreur
                            </h3>
                            <p className="text-red-700 text-base">
                              {error}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Adresse email de votre compte
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre.email@exemple.fr"
                        required
                        className="h-12 text-base"
                        disabled={isLoading}
                      />
                      <p className="text-xs text-muted-foreground">
                        Nous vous enverrons un lien sécurisé pour créer un nouveau mot de passe
                      </p>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base"
                      disabled={isLoading || !email.trim()}
                    >
                      {isLoading ? "Envoi en cours..." : "Envoyer le lien de réinitialisation"}
                    </Button>
                  </form>

                  <div className="text-center border-t pt-4">
                    <p className="text-muted-foreground text-sm mb-3">
                      Vous vous souvenez de votre mot de passe ?
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleBackToLogin}
                      className="h-12 px-6 text-base"
                    >
                      ← Retour à la connexion
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Support d'urgence */}
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Problème d'accès à votre compte ou urgence médicale ?
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