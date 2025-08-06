import * as React from "react"
import { cn } from "../../lib/utils"
import { AuthCard } from "./AuthCard"
import { AuthFormField } from "./AuthFormField"
import { PasswordInput } from "./PasswordInput"
import { AuthButton, SocialAuthButton } from "./AuthButton"
import { AuthErrorAlert } from "./AuthErrorAlert"
import { InlineLoadingSpinner } from "./AuthLoadingSpinner"

interface SignInFormData {
  email: string
  password: string
}

interface SignInFormErrors {
  email?: string[]
  password?: string[]
  general?: string[]
}

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => Promise<void> | void
  onSocialSignIn?: (provider: string) => Promise<void> | void
  onForgotPassword?: () => void
  onSignUp?: () => void
  loading?: boolean
  errors?: SignInFormErrors
  showSocialLogin?: boolean
  className?: string
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  onSocialSignIn,
  onForgotPassword,
  onSignUp,
  loading = false,
  errors = {},
  showSocialLogin = true,
  className
}) => {
  const [formData, setFormData] = React.useState<SignInFormData>({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(formData)
  }

  const handleInputChange = (field: keyof SignInFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSocialLogin = (provider: string) => async () => {
    if (onSocialSignIn) {
      await onSocialSignIn(provider)
    }
  }

  return (
    <div className={cn("w-full max-w-md", className)}>
      <AuthCard
        title="Connexion"
        description="Connectez-vous à votre compte Ambulib"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Erreurs générales */}
          {errors.general && (
            <AuthErrorAlert error={errors.general} />
          )}

          {/* Champ Email */}
          <AuthFormField
            label="Adresse email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
            placeholder="votre@email.com"
            required
            autoComplete="email"
            autoFocus
            description="L'adresse email utilisée lors de votre inscription"
          />

          {/* Champ Mot de passe */}
          <PasswordInput
            label="Mot de passe"
            value={formData.password}
            onChange={handleInputChange("password")}
            error={errors.password}
            placeholder="Votre mot de passe"
            required
            autoComplete="current-password"
            description="Saisissez votre mot de passe"
          />

          {/* Bouton Mot de passe oublié */}
          {onForgotPassword && (
            <div className="text-center">
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-sm text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                disabled={loading}
              >
                Mot de passe oublié ?
              </button>
            </div>
          )}

          {/* Bouton de connexion */}
          <AuthButton
            type="submit"
            loading={loading}
            loadingText="Connexion en cours..."
            disabled={!formData.email || !formData.password}
          >
            Se connecter
          </AuthButton>

          {/* Séparateur */}
          {showSocialLogin && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou continuer avec
                </span>
              </div>
            </div>
          )}

          {/* Connexion sociale */}
          {showSocialLogin && onSocialSignIn && (
            <div className="space-y-3">
              <SocialAuthButton
                provider="Google"
                onClick={handleSocialLogin("google")}
                disabled={loading}
                icon={
                  <svg viewBox="0 0 24 24" className="w-5 h-5">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                }
              />
            </div>
          )}

          {/* Lien vers inscription */}
          {onSignUp && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Vous n'avez pas encore de compte ?
              </p>
              <button
                type="button"
                onClick={onSignUp}
                className="text-sm font-medium text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                disabled={loading}
              >
                Créer un compte
              </button>
            </div>
          )}

          {/* Indicateur de chargement global */}
          {loading && (
            <div className="mt-4">
              <InlineLoadingSpinner message="Connexion en cours..." />
            </div>
          )}
        </form>
      </AuthCard>
    </div>
  )
}

export { SignInForm }
export type { SignInFormProps, SignInFormData, SignInFormErrors }