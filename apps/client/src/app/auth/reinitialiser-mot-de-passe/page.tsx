"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
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
import { Eye, EyeOff } from 'lucide-react'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [token, setToken] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const [tokenError, setTokenError] = useState("")
  const [isCheckingToken, setIsCheckingToken] = useState(true)

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
      verifyToken(tokenParam)
    } else {
      setTokenError("Token manquant dans l'URL")
      setIsCheckingToken(false)
    }
  }, [searchParams])

  const verifyToken = async (tokenToVerify: string) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
      const response = await fetch(`${backendUrl}/auth/verify-reset-token/${tokenToVerify}`)
      const result = await response.json()

      if (!response.ok || !result.valid) {
        setTokenError("Ce lien de réinitialisation n'est plus valide ou a expiré")
      }
    } catch (error) {
      console.error("Erreur lors de la vérification du token:", error)
      setTokenError("Impossible de vérifier le lien de réinitialisation")
    } finally {
      setIsCheckingToken(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    let strength = 0
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }

    strength = Object.values(checks).filter(Boolean).length
    const isValid = Object.values(checks).every(Boolean)
    
    return {
      strength,
      checks,
      isValid,
      level: strength < 2 ? 'Très faible' : strength < 3 ? 'Faible' : strength < 4 ? 'Moyen' : !isValid ? 'Incomplet' : strength === 5 ? 'Excellent' : 'Fort',
      color: strength < 2 ? 'bg-red-600' : strength < 3 ? 'bg-red-500' : strength < 4 ? 'bg-yellow-500' : !isValid ? 'bg-orange-500' : 'bg-green-600'
    }
  }

  const passwordStrength = getPasswordStrength(newPassword)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validations côté client
    if (!passwordStrength.isValid) {
      setError("Le mot de passe ne respecte pas tous les critères de sécurité")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          newPassword
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 400) {
          setError('Token invalide ou expiré. Demandez un nouveau lien de réinitialisation.')
        } else {
          setError(result.message || 'Une erreur est survenue lors de la réinitialisation.')
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

  const handleGoToLogin = () => {
    router.push("/auth/connexion")
  }

  if (isCheckingToken) {
    return (
      <PublicLayout>
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="space-y-8">
            <div className="text-center">
              <HavRidLogo size="lg" />
            </div>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h2 className="text-xl font-semibold mb-2">Vérification du lien...</h2>
                <p className="text-muted-foreground">Patientez pendant que nous vérifions votre lien de réinitialisation.</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </PublicLayout>
    )
  }

  if (tokenError) {
    return (
      <PublicLayout>
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="space-y-8">
            <div className="text-center">
              <div 
                onClick={() => router.push("/")} 
                className="cursor-pointer inline-block mx-auto mb-6 transition-opacity hover:opacity-80"
              >
                <HavRidLogo size="lg" />
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center text-red-600">
                  Lien invalide
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">❌</div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <h3 className="text-red-800 font-semibold text-lg mb-3">
                      Problème avec le lien de réinitialisation
                    </h3>
                    <p className="text-red-700 mb-4">
                      {tokenError}
                    </p>
                    <div className="text-red-600 text-sm space-y-1">
                      <p>• Le lien a peut-être expiré (valide 1 heure)</p>
                      <p>• Le lien a déjà été utilisé</p>
                      <p>• L'URL est incomplète ou modifiée</p>
                    </div>
                  </div>

                  <div className="flex gap-3 justify-center mt-6">
                    <Button 
                      variant="outline" 
                      onClick={() => router.push("/auth/mot-de-passe-oublie")}
                      className="h-12 px-6 text-base"
                    >
                      Demander un nouveau lien
                    </Button>
                    <Button 
                      onClick={handleGoToLogin}
                      className="h-12 px-6 text-base"
                    >
                      Aller à la connexion
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </PublicLayout>
    )
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
                {isSuccess ? "Mot de passe réinitialisé !" : "Nouveau mot de passe"}
              </CardTitle>
              <p className="text-center text-muted-foreground">
                {isSuccess 
                  ? "Votre mot de passe a été mis à jour avec succès" 
                  : "Choisissez un nouveau mot de passe sécurisé pour votre compte"
                }
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {isSuccess ? (
                /* État de succès */
                <div className="text-center space-y-6">
                  <div className="text-6xl mb-4">✅</div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <h3 className="text-green-800 font-semibold text-lg mb-3">
                      Réinitialisation réussie
                    </h3>
                    <div className="text-green-700 space-y-2 text-sm">
                      <p>
                        Votre mot de passe a été mis à jour avec succès.
                      </p>
                      <p>
                        Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
                      </p>
                      <p className="text-xs text-green-600 mt-4">
                        Par sécurité, toutes vos sessions actives ont été fermées
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGoToLogin}
                    className="h-12 px-8 text-base bg-green-600 hover:bg-green-700"
                  >
                    Se connecter maintenant →
                  </Button>
                </div>
              ) : (
                /* Formulaire de réinitialisation */
                <>
                  <form onSubmit={handleSubmit} className="space-y-6">
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

                    {/* Critères de sécurité */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-blue-800 text-sm font-medium mb-2">
                        🔒 Critères de sécurité requis :
                      </p>
                      <ul className="text-blue-700 text-sm space-y-1">
                        <li className={passwordStrength.checks.length ? 'text-green-700' : ''}>
                          {passwordStrength.checks.length ? '✅' : '•'} Au moins 8 caractères
                        </li>
                        <li className={passwordStrength.checks.uppercase ? 'text-green-700' : ''}>
                          {passwordStrength.checks.uppercase ? '✅' : '•'} Au moins 1 lettre majuscule (A-Z)
                        </li>
                        <li className={passwordStrength.checks.lowercase ? 'text-green-700' : ''}>
                          {passwordStrength.checks.lowercase ? '✅' : '•'} Au moins 1 lettre minuscule (a-z)
                        </li>
                        <li className={passwordStrength.checks.numbers ? 'text-green-700' : ''}>
                          {passwordStrength.checks.numbers ? '✅' : '•'} Au moins 1 chiffre (0-9)
                        </li>
                        <li className={passwordStrength.checks.special ? 'text-green-700' : ''}>
                          {passwordStrength.checks.special ? '✅' : '•'} Au moins 1 caractère spécial (!@#$%...)
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">
                        Nouveau mot de passe *
                      </Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Votre nouveau mot de passe sécurisé"
                          required
                          className="h-12 text-base pr-12"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      
                      {/* Indicateur de force du mot de passe */}
                      {newPassword && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                                style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{passwordStrength.level}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Confirmer le nouveau mot de passe *
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Répétez votre nouveau mot de passe"
                          required
                          className="h-12 text-base pr-12"
                          disabled={isLoading}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </Button>
                      </div>
                      
                      {/* Indicateur de correspondance */}
                      {confirmPassword && newPassword && (
                        <div className="flex items-center gap-2 text-sm">
                          {newPassword === confirmPassword ? (
                            <span className="text-green-700">✅ Les mots de passe correspondent</span>
                          ) : (
                            <span className="text-red-600">❌ Les mots de passe ne correspondent pas</span>
                          )}
                        </div>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base"
                      disabled={isLoading || !passwordStrength.isValid || newPassword !== confirmPassword}
                    >
                      {isLoading ? "Réinitialisation..." : "Réinitialiser mon mot de passe"}
                    </Button>
                  </form>

                  <div className="text-center border-t pt-4">
                    <p className="text-muted-foreground text-sm mb-3">
                      Vous vous souvenez de votre mot de passe ?
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={handleGoToLogin}
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
              Besoin d'aide ou urgence médicale ?
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

export default function ReinitialiserMotDePassePage() {
  return (
    <Suspense fallback={
      <PublicLayout>
        <main className="container mx-auto px-4 py-8 max-w-2xl">
          <div className="space-y-8">
            <div className="text-center">
              <HavRidLogo size="lg" />
            </div>
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-4">⏳</div>
                <h2 className="text-xl font-semibold mb-2">Chargement...</h2>
                <p className="text-muted-foreground">Préparation de la page de réinitialisation.</p>
              </CardContent>
            </Card>
          </div>
        </main>
      </PublicLayout>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}