"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignInForm } from "@repo/ui"
import { useAuth } from "@/contexts/AuthContext"

export default function SignInPage() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const { signIn } = useAuth()
  const router = useRouter()

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true)
    setErrors({})
    
    try {
      await signIn({ email: data.email, password: data.password })
      router.push("/dashboard") // Redirect to protected area
    } catch (error: any) {
      setErrors({
        general: [error.message || "Une erreur est survenue lors de la connexion"]
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: string) => {
    setLoading(true)
    try {
      // TODO: Implement OAuth when backend is ready
      console.log("Social sign-in not yet implemented:", provider)
    } catch (error) {
      console.error("Social sign-in error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = () => {
    router.push("/auth/mot-de-passe-oublie")
  }

  const handleSignUp = () => {
    router.push("/auth/inscription")
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Connexion à Ambulib
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Accédez à vos services d'ambulance personnalisés
          </p>
        </div>

        <SignInForm
          onSubmit={handleSubmit}
          onSocialSignIn={handleSocialSignIn}
          onForgotPassword={handleForgotPassword}
          onSignUp={handleSignUp}
          loading={loading}
          errors={errors}
          showSocialLogin={false} // Disable until backend is ready
        />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <button
              onClick={handleSignUp}
              className="text-primary hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Créer un compte
            </button>
          </p>
        </div>

        <div className="mt-8 p-4 bg-muted rounded-lg">
          <p className="text-center text-sm text-muted-foreground">
            Interface optimisée pour l'accessibilité. 
            Utilisez Tab pour naviguer, Entrée pour valider.
          </p>
        </div>
      </div>
    </main>
  )
}