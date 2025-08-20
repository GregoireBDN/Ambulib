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
import { useAuth } from "@/contexts/AuthContext"

export default function InscriptionPage() {
  const router = useRouter()
  const { signUp, isLoading } = useAuth()
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthDate: "",
    socialSecurity: ""
  })
  const [error, setError] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError("Nom et prénom sont requis")
      return false
    }
    
    if (!formData.email || !formData.email.includes('@')) {
      setError("Email valide requis")
      return false
    }
    
    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return false
    }

    // Validation du caractère spécial
    const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
    if (!specialCharRegex.test(formData.password)) {
      setError("Le mot de passe doit contenir au moins un caractère spécial (!@#$%^&*...)")
      return false
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return false
    }
    
    if (!acceptTerms) {
      setError("Vous devez accepter les conditions d'utilisation")
      return false
    }
    
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) {
      return
    }

    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        socialSecurity: formData.socialSecurity
      })
      // Le middleware se chargera de la redirection automatiquement
      window.location.href = "/dashboard"
    } catch {
      setError("Erreur lors de la création du compte. Vérifiez vos informations.")
    }
  }

  const handleSignIn = () => {
    router.push("/auth/connexion")
  }

  return (
    <PublicLayout>
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="space-y-8">
          {/* Logo centré */}
          <div className="text-center">
            <HavRidLogo size="lg" className="mx-auto mb-6" />
          </div>

          {/* Carte d'inscription */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                Créer votre compte HavRid
              </CardTitle>
              <p className="text-center text-muted-foreground">
                Accès sécurisé à votre espace de transport médical
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div 
                    id="signup-error"
                    role="alert"
                    className="bg-red-50 border border-red-200 rounded-md p-3"
                  >
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Informations personnelles */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Informations personnelles
                  </h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Prénom *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Votre prénom"
                        required
                        aria-describedby={error ? "signup-error" : undefined}
                        className="h-12 text-base"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nom *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Votre nom"
                        required
                        aria-describedby={error ? "signup-error" : undefined}
                        className="h-12 text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Adresse email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="votre.email@exemple.fr"
                      required
                      aria-describedby={error ? "signup-error" : undefined}
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Numéro de téléphone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="01 23 45 67 89"
                      className="h-12 text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Date de naissance</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                {/* Informations médicales */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Informations médicales (optionnel)
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="socialSecurity">Numéro de sécurité sociale</Label>
                    <Input
                      id="socialSecurity"
                      value={formData.socialSecurity}
                      onChange={(e) => handleInputChange('socialSecurity', e.target.value)}
                      placeholder="1 23 45 67 890 123 45"
                      className="h-12 text-base"
                    />
                    <p className="text-xs text-muted-foreground">
                      Information facultative pour un meilleur suivi médical
                    </p>
                  </div>
                </div>

                {/* Sécurité */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Sécurité
                  </h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Mot de passe *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="8+ caractères avec au moins 1 symbole (!@#$%...)"
                      required
                      aria-describedby={error ? "signup-error" : undefined}
                      className="h-12 text-base"
                    />
                    <p className="text-xs text-muted-foreground">
                      Minimum 8 caractères avec au moins un caractère spécial (!@#$%^&*...)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmer le mot de passe *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      placeholder="Répétez votre mot de passe"
                      required
                      aria-describedby={error ? "signup-error" : undefined}
                      className="h-12 text-base"
                    />
                  </div>
                </div>

                {/* Conditions d'utilisation */}
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-primary"
                  />
                  <Label htmlFor="terms" className="text-sm leading-5">
                    J'accepte les{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => {/* TODO: Open terms modal */}}
                    >
                      conditions d'utilisation
                    </button>{" "}
                    et la{" "}
                    <button
                      type="button"
                      className="text-primary hover:underline"
                      onClick={() => {/* TODO: Open privacy modal */}}
                    >
                      politique de confidentialité
                    </button>
                  </Label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "Création du compte..." : "Créer mon compte"}
                </Button>
              </form>

              <div className="text-center border-t pt-6">
                <p className="text-muted-foreground text-sm mb-3">
                  Vous avez déjà un compte ?
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleSignIn}
                  className="w-full h-12 text-base"
                >
                  Se connecter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support d'urgence */}
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">
              Besoin d'aide pendant l'inscription ?
            </p>
            <p className="text-sm">
              📞 <strong>Support 24h/7j : 01 23 45 67 89</strong>
            </p>
          </div>
        </div>
      </main>
    </PublicLayout>
  )
}