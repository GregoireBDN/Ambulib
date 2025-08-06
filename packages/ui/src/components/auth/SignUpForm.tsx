import * as React from "react"
import { cn } from "../../lib/utils"
import { AuthCard } from "./AuthCard"
import { AuthFormField } from "./AuthFormField"
import { PasswordInput } from "./PasswordInput"
import { AuthButton, SocialAuthButton } from "./AuthButton"
import { AuthErrorAlert } from "./AuthErrorAlert"
import { InlineLoadingSpinner } from "./AuthLoadingSpinner"

interface SignUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  age?: string
  phoneNumber?: string
  postalCode?: string
}

interface SignUpFormErrors {
  firstName?: string[]
  lastName?: string[]
  email?: string[]
  password?: string[]
  age?: string[]
  phoneNumber?: string[]
  postalCode?: string[]
  general?: string[]
}

interface SignUpFormProps {
  onSubmit: (data: SignUpFormData) => Promise<void> | void
  onSocialSignUp?: (provider: string) => Promise<void> | void
  onSignIn?: () => void
  loading?: boolean
  errors?: SignUpFormErrors
  showSocialLogin?: boolean
  showOptionalFields?: boolean
  className?: string
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  onSocialSignUp,
  onSignIn,
  loading = false,
  errors = {},
  showSocialLogin = true,
  showOptionalFields = true,
  className
}) => {
  const [formData, setFormData] = React.useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    phoneNumber: "",
    postalCode: ""
  })

  const [showOptional, setShowOptional] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Nettoyer les champs optionnels vides
    const cleanData: SignUpFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      ...(formData.age && { age: formData.age }),
      ...(formData.phoneNumber && { phoneNumber: formData.phoneNumber }),
      ...(formData.postalCode && { postalCode: formData.postalCode })
    }
    
    await onSubmit(cleanData)
  }

  const handleInputChange = (field: keyof SignUpFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }))
  }

  const handleSocialSignUp = (provider: string) => async () => {
    if (onSocialSignUp) {
      await onSocialSignUp(provider)
    }
  }

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.password

  return (
    <div className={cn("w-full max-w-md", className)}>
      <AuthCard
        title="Créer un compte"
        description="Rejoignez Ambulib pour accéder à nos services"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Erreurs générales */}
          {errors.general && (
            <AuthErrorAlert error={errors.general} />
          )}

          {/* Connexion sociale en premier pour éviter de remplir le formulaire */}
          {showSocialLogin && onSocialSignUp && (
            <>
              <div className="space-y-3">
                <SocialAuthButton
                  provider="Google"
                  onClick={handleSocialSignUp("google")}
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
                >
                  S'inscrire avec Google
                </SocialAuthButton>
              </div>

              {/* Séparateur */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou créer un compte avec email
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Champs obligatoires */}
          <div className="grid grid-cols-2 gap-4">
            <AuthFormField
              label="Prénom"
              value={formData.firstName}
              onChange={handleInputChange("firstName")}
              error={errors.firstName}
              placeholder="Jean"
              required
              autoComplete="given-name"
              autoFocus
            />

            <AuthFormField
              label="Nom"
              value={formData.lastName}
              onChange={handleInputChange("lastName")}
              error={errors.lastName}
              placeholder="Dupont"
              required
              autoComplete="family-name"
            />
          </div>

          <AuthFormField
            label="Adresse email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
            placeholder="jean.dupont@email.com"
            required
            autoComplete="email"
            description="Cette adresse sera utilisée pour vous connecter"
          />

          <PasswordInput
            label="Mot de passe"
            value={formData.password}
            onChange={handleInputChange("password")}
            error={errors.password}
            placeholder="Minimum 8 caractères"
            required
            autoComplete="new-password"
            description="Choisissez un mot de passe sécurisé"
          />

          {/* Champs optionnels */}
          {showOptionalFields && (
            <>
              <div className="space-y-4">
                <button
                  type="button"
                  onClick={() => setShowOptional(!showOptional)}
                  className="text-sm text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  disabled={loading}
                >
                  {showOptional ? "Masquer" : "Afficher"} les informations optionnelles
                </button>

                {showOptional && (
                  <div className="space-y-4 p-4 bg-muted/20 rounded-lg border border-border/50">
                    <p className="text-xs text-muted-foreground">
                      Ces informations nous aident à mieux vous servir, mais ne sont pas obligatoires.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <AuthFormField
                        label="Âge"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange("age")}
                        error={errors.age}
                        placeholder="65"
                        min="0"
                        max="150"
                      />

                      <AuthFormField
                        label="Code postal"
                        value={formData.postalCode}
                        onChange={handleInputChange("postalCode")}
                        error={errors.postalCode}
                        placeholder="75001"
                        maxLength={5}
                        autoComplete="postal-code"
                      />
                    </div>

                    <AuthFormField
                      label="Téléphone"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleInputChange("phoneNumber")}
                      error={errors.phoneNumber}
                      placeholder="+33123456789"
                      autoComplete="tel"
                      description="Numéro de téléphone pour vous contacter en cas d'urgence"
                    />
                  </div>
                )}
              </div>
            </>
          )}

          {/* Bouton d'inscription */}
          <AuthButton
            type="submit"
            loading={loading}
            loadingText="Création du compte..."
            disabled={!isFormValid}
          >
            Créer mon compte
          </AuthButton>

          {/* Lien vers connexion */}
          {onSignIn && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Vous avez déjà un compte ?
              </p>
              <button
                type="button"
                onClick={onSignIn}
                className="text-sm font-medium text-primary hover:text-primary/80 underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                disabled={loading}
              >
                Se connecter
              </button>
            </div>
          )}

          {/* Indicateur de chargement global */}
          {loading && (
            <div className="mt-4">
              <InlineLoadingSpinner message="Création de votre compte..." />
            </div>
          )}
        </form>
      </AuthCard>
    </div>
  )
}

export { SignUpForm }
export type { SignUpFormProps, SignUpFormData, SignUpFormErrors }