"use client";

import React, { useActionState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, ArrowLeft } from "lucide-react";
import { signIn } from "@/lib/auth";
import { SeniorCard } from "@/components/accessible/SeniorCard";
import { AccessibleInput } from "@/components/accessible/AccessibleInput";
import { LargeButton } from "@/components/accessible/LargeButton";

/**
 * AccessibleSignInForm - Formulaire de connexion ultra-accessible
 * Optimisé pour les personnes âgées et handicapées
 * 
 * Fonctionnalités d'accessibilité :
 * - Navigation claire et intuitive
 * - Messages d'erreur descriptifs
 * - Champs de taille appropriée
 * - Focus management
 * - Support lecteurs d'écran
 */

const AccessibleSignInForm = () => {
  const [state, formAction] = useActionState(signIn, null);
  const router = useRouter();

  React.useEffect(() => {
    if (state?.success && state?.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  const handleSubmit = (formData: FormData) => {
    return formAction(formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Bouton retour */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-lg text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
          >
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Retour à l'accueil
          </Link>
        </div>

        {/* Carte principale du formulaire */}
        <SeniorCard
          title="Connexion à votre compte"
          description="Saisissez vos informations pour accéder à vos services Ambulib"
          size="large"
          icon={LogIn}
          priority="high"
        >
          <form action={handleSubmit} className="space-y-6">
            {/* Message d'erreur global */}
            {state?.message && (
              <div 
                role="alert"
                aria-live="polite"
                className="rounded-lg bg-red-50 border-2 border-red-200 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <LogIn className="h-5 w-5 text-red-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-red-800 mb-1">
                      Erreur de connexion
                    </h4>
                    <p className="text-red-700">{state.message}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Champ email */}
            <AccessibleInput
              id="signin-email"
              name="email"
              type="email"
              label="Adresse email"
              placeholder="exemple@email.com"
              defaultValue={state?.values?.email || ""}
              error={Array.isArray(state?.error?.email) ? state.error.email[0] : state?.error?.email}
              helpText="Votre adresse email utilisée lors de l'inscription"
              required
              size="large"
              autoComplete="email"
              autoFocus
            />

            {/* Champ mot de passe */}
            <AccessibleInput
              id="signin-password"
              name="password"
              type="password"
              label="Mot de passe"
              placeholder="Votre mot de passe"
              defaultValue={state?.values?.password || ""}
              error={Array.isArray(state?.error?.password) ? state.error.password[0] : state?.error?.password}
              helpText="Le mot de passe de votre compte Ambulib"
              required
              size="large"
              showPasswordToggle
              autoComplete="current-password"
            />

            {/* Lien mot de passe oublié */}
            <div className="text-center">
              <Link
                href="#"
                className="text-lg text-blue-600 hover:text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Bouton de connexion */}
            <LargeButton
              type="submit"
              variant="primary"
              size="large"
              priority="high"
              className="w-full"
              ariaLabel="Se connecter à votre compte Ambulib"
            >
              <LogIn className="h-6 w-6" aria-hidden="true" />
              Se connecter
            </LargeButton>

            {/* Séparateur */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200" />
              </div>
              <div className="relative flex justify-center text-lg">
                <span className="bg-white px-4 text-gray-600 font-medium">ou</span>
              </div>
            </div>

            {/* Lien vers inscription */}
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-700 mb-4">
                Vous n'avez pas encore de compte ?
              </p>
              <Link href="/auth/signup">
                <LargeButton
                  variant="secondary"
                  size="large"
                  asChild
                  ariaLabel="Créer un nouveau compte Ambulib"
                >
                  Créer un compte
                </LargeButton>
              </Link>
            </div>
          </form>
        </SeniorCard>

        {/* Aide et support */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Besoin d'aide avec votre connexion ?
          </p>
          <Link
            href="tel:+33123456789"
            className="inline-flex items-center gap-2 text-lg text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-3 py-2"
          >
            <span>📞</span>
            Appelez le 01 23 45 67 89
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessibleSignInForm;