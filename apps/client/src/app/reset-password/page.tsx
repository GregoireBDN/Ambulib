"use client"

import { useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function ResetPasswordRedirectContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    
    if (token) {
      // Rediriger vers la vraie page de réinitialisation avec le token
      router.replace(`/auth/reinitialiser-mot-de-passe?token=${token}`)
    } else {
      // Si pas de token, rediriger vers mot de passe oublié
      router.replace('/auth/mot-de-passe-oublie')
    }
  }, [router, searchParams])

  // Page de chargement pendant la redirection
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">🔄</div>
        <h1 className="text-xl font-semibold mb-2">Redirection...</h1>
        <p className="text-muted-foreground">
          Vous êtes en cours de redirection vers la page de réinitialisation.
        </p>
      </div>
    </div>
  )
}

export default function ResetPasswordRedirect() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <h1 className="text-xl font-semibold mb-2">Chargement...</h1>
          <p className="text-muted-foreground">
            Préparation de la redirection.
          </p>
        </div>
      </div>
    }>
      <ResetPasswordRedirectContent />
    </Suspense>
  )
}