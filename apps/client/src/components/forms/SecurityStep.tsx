import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@repo/ui"
import { Eye, EyeOff, Shield } from 'lucide-react'
import { FormData } from '@/types/inscription'

interface SecurityStepProps {
  formData: FormData
  errors: Record<string, string>
  onFieldChange: (field: keyof FormData, value: unknown) => void
  onResetEmailVerification?: () => void
}

export default function SecurityStep({
  formData,
  errors,
  onFieldChange,
  onResetEmailVerification
}: SecurityStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showConfirmReset, setShowConfirmReset] = useState(false)

  const handleEmailChange = (value: string) => {
    if (formData.emailVerified) {
      // Si l'email est vérifié, ne pas permettre la modification directe
      return
    }
    onFieldChange('email', value)
  }

  const handleResetEmailVerification = () => {
    if (onResetEmailVerification) {
      onResetEmailVerification()
      setShowConfirmReset(false)
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
    
    // Toutes les conditions doivent être remplies pour être considéré comme "valide"
    const isValid = Object.values(checks).every(Boolean)
    
    return {
      strength,
      checks,
      isValid,
      level: strength < 2 ? 'Très faible' : strength < 3 ? 'Faible' : strength < 4 ? 'Moyen' : !isValid ? 'Incomplet' : strength === 5 ? 'Excellent' : 'Fort',
      color: strength < 2 ? 'bg-red-600' : strength < 3 ? 'bg-red-500' : strength < 4 ? 'bg-yellow-500' : !isValid ? 'bg-orange-500' : 'bg-green-600'
    }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <Card data-step="2">
      <CardHeader>
        <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
          <Shield className="w-6 h-6" />
          Sécurisation de votre compte
        </CardTitle>
        <p className="text-center text-muted-foreground text-base">
          Créez un compte sécurisé pour accéder à vos services d'ambulance
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Email */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Adresse email
          </h3>
          
          <div className="space-y-3">
            <Label htmlFor="email" className="text-base font-medium">
              Adresse email *
            </Label>
            
            {formData.emailVerified ? (
              /* Email vérifié - Mode lecture seule avec possibilité de déverrouiller */
              <>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    readOnly
                    className="h-14 text-lg bg-green-50 border-green-300 text-green-800 cursor-not-allowed"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600">
                    ✅
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-green-800 text-sm font-medium mb-2">
                    ✅ Email vérifié et protégé
                  </p>
                  <p className="text-green-700 text-xs mb-3">
                    Votre adresse email a été vérifiée avec succès. Elle est maintenant protégée contre les modifications accidentelles.
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowConfirmReset(true)}
                    className="text-xs h-8 border-green-300 text-green-700 hover:bg-green-100"
                  >
                    Modifier l'email (nécessite une nouvelle vérification)
                  </Button>
                </div>
                
                {/* Dialogue de confirmation */}
                {showConfirmReset && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-amber-500 text-xl">⚠️</div>
                      <div className="flex-1">
                        <h4 className="text-amber-800 font-semibold text-sm mb-2">
                          Confirmation requise
                        </h4>
                        <p className="text-amber-700 text-sm mb-3">
                          En modifiant votre email, vous devrez effectuer une nouvelle vérification. 
                          Êtes-vous sûr de vouloir continuer ?
                        </p>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setShowConfirmReset(false)}
                            className="text-xs h-8"
                          >
                            Annuler
                          </Button>
                          <Button
                            type="button"
                            size="sm"
                            onClick={handleResetEmailVerification}
                            className="text-xs h-8 bg-amber-600 hover:bg-amber-700"
                          >
                            Confirmer la modification
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ) : (
              /* Email non vérifié - Mode normal */
              <>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  placeholder="votre.email@exemple.fr"
                  required
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : "email-help"}
                  className={`h-14 text-lg ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-600 text-sm" role="alert">
                    {errors.email}
                  </p>
                )}
                <p id="email-help" className="text-xs text-muted-foreground">
                  Utilisée pour la connexion et les communications importantes
                </p>
              </>
            )}
          </div>
        </div>

        {/* Mot de passe */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Mot de passe sécurisé
          </h3>
          
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

          <div className="space-y-3">
            <Label htmlFor="password" className="text-base font-medium">
              Mot de passe *
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => onFieldChange('password', e.target.value)}
                placeholder="Votre mot de passe sécurisé"
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? "password-error" : "password-strength"}
                className={`h-14 text-lg pr-12 ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            
            {/* Indicateur de force du mot de passe */}
            {formData.password && (
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
            
            {errors.password && (
              <p id="password-error" className="text-red-600 text-sm" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Label htmlFor="confirmPassword" className="text-base font-medium">
              Confirmer le mot de passe *
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) => onFieldChange('confirmPassword', e.target.value)}
                placeholder="Répétez votre mot de passe"
                required
                aria-invalid={!!errors.confirmPassword}
                aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
                className={`h-14 text-lg pr-12 ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 p-0"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Masquer la confirmation" : "Afficher la confirmation"}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {errors.confirmPassword && (
              <p id="confirmPassword-error" className="text-red-600 text-sm" role="alert">
                {errors.confirmPassword}
              </p>
            )}
            
            {/* Indicateur de correspondance */}
            {formData.confirmPassword && formData.password && (
              <div className="flex items-center gap-2 text-sm">
                {formData.password === formData.confirmPassword ? (
                  <span className="text-green-700">✅ Les mots de passe correspondent</span>
                ) : (
                  <span className="text-red-600">❌ Les mots de passe ne correspondent pas</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Conseils de sécurité */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="text-yellow-800 text-sm font-semibold mb-2">
            💡 Conseils pour un mot de passe sécurisé
          </h4>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li>• Utilisez une phrase avec des mots qui vous sont familiers</li>
            <li>• Remplacez certaines lettres par des chiffres ou symboles</li>
            <li>• Évitez les informations personnelles (date de naissance, nom...)</li>
            <li>• Ne partagez jamais votre mot de passe</li>
          </ul>
        </div>

        {/* Message de prévention pour la rétention du mot de passe */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <h4 className="text-orange-800 text-sm font-semibold mb-2">
            🔐 Important : Retenez bien votre mot de passe
          </h4>
          <div className="text-orange-700 text-sm space-y-2">
            <p>
              <strong>Notez votre mot de passe dans un endroit sûr</strong> ou assurez-vous de bien le retenir.
            </p>
            <p>
              Vous en aurez besoin pour accéder à votre compte et gérer vos réservations d'ambulance.
            </p>
            <p className="text-xs italic">
              En cas d'oubli, vous pourrez réinitialiser votre mot de passe via votre adresse email.
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}