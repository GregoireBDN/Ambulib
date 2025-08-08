"use client"

import { useActionState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signInAction } from "@/lib/auth-actions"
import { Button } from "@repo/ui"
import { Suspense } from "react"

function SignInContent() {
  const [state, formAction, isPending] = useActionState(signInAction, null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleForgotPassword = () => {
    router.push("/auth/mot-de-passe-oublie")
  }

  const handleSignUp = () => {
    router.push("/auth/inscription")
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h1 className="text-3xl font-bold text-foreground">
              Ambulib
            </h1>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-primary">
              Bienvenue dans votre espace personnel
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Connectez-vous pour accéder à vos services de transport médical personnalisés et sécurisés
            </p>
          </div>
          
          {/* Indicateurs de confiance */}
          <div className="flex justify-center items-center gap-6 mt-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Agréé santé</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span>Données sécurisées</span>
            </div>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>Support 24h/24</span>
            </div>
          </div>
        </div>

        {/* Formulaire de connexion avec Server Action */}
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="mb-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 2.676-1.336 6.176-6.031 6-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="text-sm text-accent font-medium">Connexion sécurisée</p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Vos données médicales sont protégées par chiffrement
              </p>
            </div>
            
            <form action={formAction} className="space-y-6">
              {/* Ajouter le redirect parameter si présent */}
              {searchParams.get('redirect') && (
                <input 
                  type="hidden" 
                  name="redirect" 
                  value={searchParams.get('redirect')!} 
                />
              )}

              {/* Erreurs générales */}
              {state?.error && (
                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-sm text-destructive font-medium">{state.error}</p>
                </div>
              )}

              {/* Champ Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Adresse email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  autoComplete="email"
                  autoFocus
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Votre adresse email personnelle pour accéder à vos services
                </p>
                {state?.fieldErrors?.email && (
                  <p className="text-sm text-destructive">{state.fieldErrors.email}</p>
                )}
              </div>

              {/* Champ Mot de passe */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  required
                  autoComplete="current-password"
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Votre mot de passe personnel et sécurisé
                </p>
                {state?.fieldErrors?.password && (
                  <p className="text-sm text-destructive">{state.fieldErrors.password}</p>
                )}
              </div>

              {/* Bouton Mot de passe oublié */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  disabled={isPending}
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Bouton de connexion */}
              <Button
                type="submit"
                className="w-full text-lg py-6"
                disabled={isPending}
              >
                {isPending ? "Connexion en cours..." : "Se connecter"}
              </Button>

              {/* Support et aide */}
              <div className="mt-6 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-secondary font-medium">Besoin d'aide ?</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Notre équipe est disponible 24h/24 pour vous accompagner au 01 23 45 67 89
                </p>
              </div>
              
              {/* Lien vers inscription */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Première visite sur Ambulib ?
                </p>
                <button
                  type="button"
                  onClick={handleSignUp}
                  className="text-sm font-medium text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  disabled={isPending}
                >
                  Créer votre compte gratuit
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">
              Nouveau sur Ambulib ?
            </p>
            <button
              onClick={handleSignUp}
              className="text-primary hover:text-primary/80 font-medium focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-3 underline text-base"
            >
              Créer votre compte gratuit
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Inscription rapide et accès immédiat à nos services
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <p className="text-sm font-medium text-foreground">Interface accessible</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Navigation optimisée pour les seniors. Utilisez Tab pour naviguer, Entrée pour valider.
              Textes agrandis et contrastes renforcés pour votre confort.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Besoin d'aide ? Appelez notre support au{" "}
              <a href="tel:0123456789" className="text-primary font-medium hover:underline">
                01 23 45 67 89
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

function SignInFallback() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Connexion à Ambulib
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Chargement...
          </p>
        </div>
      </div>
    </main>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<SignInFallback />}>
      <SignInContent />
    </Suspense>
  )
}