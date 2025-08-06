"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SignUpForm } from "@repo/ui"
import { useAuth } from "@/contexts/AuthContext"

interface SignUpData {
  firstName: string
  lastName: string
  email: string
  password: string
  age?: string | number
  zipCode?: string
  phone?: string
}

export default function SignUpPage() {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})
  const { signUp } = useAuth()
  const router = useRouter()

  const handleSubmit = async (data: SignUpData) => {
    setLoading(true)
    setErrors({})
    
    try {
      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        age: data.age?.toString(),
        postalCode: data.zipCode,
        phoneNumber: data.phone
      })
      router.push("/dashboard") // Redirect to protected area after successful signup
    } catch (error: any) {
      // Handle validation errors
      if (error.validation) {
        setErrors(error.validation)
      } else {
        setErrors({
          general: [error.message || "Une erreur est survenue lors de l'inscription"]
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignUp = async (provider: string) => {
    setLoading(true)
    try {
      // TODO: Implement OAuth when backend is ready
      console.log("Social sign-up not yet implemented:", provider)
    } catch (error) {
      console.error("Social sign-up error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = () => {
    router.push("/auth/connexion")
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Créer votre compte Ambulib
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Rejoignez-nous pour accéder à nos services d'ambulance
          </p>
        </div>

        <SignUpForm
          onSubmit={handleSubmit}
          onSocialSignUp={handleSocialSignUp}
          onSignIn={handleSignIn}
          loading={loading}
          errors={errors}
          showSocialLogin={false} // Disable until backend is ready
        />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Vous avez déjà un compte ?{" "}
            <button
              onClick={handleSignIn}
              className="text-primary hover:underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Se connecter
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