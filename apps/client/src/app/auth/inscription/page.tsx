"use client"

import { useActionState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { signUpAction } from "@/lib/auth-actions"
import { Button } from "@repo/ui"
import { Suspense } from "react"

function SignUpContent() {
  const [state, formAction, isPending] = useActionState(signUpAction, null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSignIn = () => {
    router.push("/auth/connexion")
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
              Rejoignez des milliers de patients satisfaits
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Créez votre compte pour accéder à nos services de transport médical accessibles et personnalisés
            </p>
          </div>
          
          {/* Avantages de l'inscription */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 max-w-2xl mx-auto">
            <div className="p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <svg className="w-6 h-6 text-secondary mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-xs font-medium text-secondary">Réservation facile</p>
              <p className="text-xs text-muted-foreground">En quelques clics</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
              <svg className="w-6 h-6 text-accent mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs font-medium text-accent">Données sécurisées</p>
              <p className="text-xs text-muted-foreground">Confidentialité garantie</p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <svg className="w-6 h-6 text-primary mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-xs font-medium text-primary">Support 24h/24</p>
              <p className="text-xs text-muted-foreground">Assistance continue</p>
            </div>
          </div>
        </div>

        {/* Formulaire d'inscription avec Server Action */}
        <div className="w-full max-w-md">
          <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
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

              {/* Prénom */}
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                  Prénom *
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Votre prénom"
                  required
                  autoComplete="given-name"
                  autoFocus
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {state?.fieldErrors?.firstName && (
                  <p className="text-sm text-destructive">{state.fieldErrors.firstName}</p>
                )}
              </div>

              {/* Nom */}
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                  Nom de famille *
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Votre nom de famille"
                  required
                  autoComplete="family-name"
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {state?.fieldErrors?.lastName && (
                  <p className="text-sm text-destructive">{state.fieldErrors.lastName}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Adresse email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  required
                  autoComplete="email"
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Utilisée pour la connexion et les notifications importantes
                </p>
                {state?.fieldErrors?.email && (
                  <p className="text-sm text-destructive">{state.fieldErrors.email}</p>
                )}
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Mot de passe *
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Créez un mot de passe sécurisé"
                  required
                  autoComplete="new-password"
                  className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <p className="text-xs text-muted-foreground">
                  Au moins 8 caractères avec majuscules, chiffres et symboles
                </p>
                {state?.fieldErrors?.password && (
                  <p className="text-sm text-destructive">{state.fieldErrors.password}</p>
                )}
              </div>

              {/* Champs optionnels */}
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Informations optionnelles (nous aident à personnaliser nos services)
                </p>

                {/* Âge */}
                <div className="space-y-2 mb-4">
                  <label htmlFor="age" className="text-sm font-medium text-foreground">
                    Âge
                  </label>
                  <input
                    id="age"
                    name="age"
                    type="number"
                    min="1"
                    max="120"
                    placeholder="Votre âge"
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* Code postal */}
                <div className="space-y-2 mb-4">
                  <label htmlFor="postalCode" className="text-sm font-medium text-foreground">
                    Code postal
                  </label>
                  <input
                    id="postalCode"
                    name="postalCode"
                    type="text"
                    pattern="[0-9]{5}"
                    placeholder="75001"
                    autoComplete="postal-code"
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* Téléphone */}
                <div className="space-y-2">
                  <label htmlFor="phoneNumber" className="text-sm font-medium text-foreground">
                    Numéro de téléphone
                  </label>
                  <input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    placeholder="01 23 45 67 89"
                    autoComplete="tel"
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Bouton d'inscription */}
              <Button
                type="submit"
                className="w-full text-lg py-6"
                disabled={isPending}
              >
                {isPending ? "Création du compte..." : "Créer mon compte"}
              </Button>
              
              {/* Lien vers connexion */}
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">
                  Vous êtes déjà membre d'Ambulib ?
                </p>
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="text-sm font-medium text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  disabled={isPending}
                >
                  Accéder à votre espace
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="text-center space-y-3">
          <div className="p-4 bg-accent/5 rounded-lg border border-accent/20">
            <p className="text-sm text-muted-foreground mb-2">
              Vous êtes déjà membre d'Ambulib ?
            </p>
            <button
              onClick={handleSignIn}
              className="text-primary hover:text-primary/80 font-medium focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring focus-visible:ring-offset-3 underline text-base"
            >
              Accéder à votre espace
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Connexion sécurisée à votre compte existant
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <div className="p-4 bg-muted/50 rounded-lg border border-border/50">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <p className="text-sm font-medium text-foreground">Inscription rapide</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Seuls le nom, email et mot de passe sont requis. Les autres informations sont optionnelles
              et nous aident à mieux personnaliser nos services.
            </p>
          </div>
          
          <div className="p-4 bg-secondary/5 rounded-lg border border-secondary/20">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 2.676-1.336 6.176-6.031 6-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-sm font-medium text-foreground">Engagement qualité</p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Personnel formé aux besoins des seniors, véhicules adaptés et équipements médicaux certifiés.
              Votre sécurité est notre priorité.
            </p>
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Des questions ? Notre équipe est là pour vous au{" "}
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

function SignUpFallback() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">
            Créer un compte Ambulib
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed">
            Chargement...
          </p>
        </div>
      </div>
    </main>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpFallback />}>
      <SignUpContent />
    </Suspense>
  )
}