"use client"

import { useRouter } from "next/navigation"
import { 
  Button,
  HavRidLogo,
  FormStepProgress
} from "@repo/ui"
import PublicLayout from "@/components/PublicLayout"
import { useAuth } from "@/contexts/AuthContext"
import { useFormStepper } from "@/hooks/useFormStepper"
import IdentityStep from "@/components/forms/IdentityStep"
import SecurityStep from "@/components/forms/SecurityStep"
import MedicalStep from "@/components/forms/MedicalStep"
import EmergencyStep from "@/components/forms/EmergencyStep"

export default function InscriptionPage() {
  const router = useRouter()
  const { signUp } = useAuth()
  
  const {
    currentStep,
    setCurrentStep,
    formData,
    errors,
    isLoading,
    stepLabels,
    submitError,
    setIsLoading,
    setError,
    clearErrors,
    updateField,
    updateAddressField,
    updateEmergencyContactField,
    nextStep,
    prevStep,
    validateForm,
    clearStorage
  } = useFormStepper()

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    clearErrors() // Nettoyer les erreurs précédentes
    
    try {
      await signUp({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        birthDate: formData.birthDate,
        socialSecurity: formData.socialSecurity || undefined,
        // Nouvelles données enrichies
        address: `${formData.address.street}, ${formData.address.postalCode} ${formData.address.city}`,
        allergies: formData.allergies || undefined,
        medications: formData.medications || undefined,
        mobility: formData.mobility !== 'none' ? formData.mobility : undefined,
        mobilityDetails: formData.mobilityDetails || undefined,
        doctorName: formData.doctorName || undefined,
        doctorPhone: formData.doctorPhone || undefined,
        emergencyContactName: `${formData.emergencyContact.firstName} ${formData.emergencyContact.lastName}`,
        emergencyContactPhone: formData.emergencyContact.phone,
        emergencyContactRelation: formData.emergencyContact.relation
      })
      
      // Nettoyer le localStorage après succès
      clearStorage()
      
      // Redirection automatique
      window.location.href = "/dashboard"
    } catch (error: any) {
      console.error("Erreur inscription:", error)
      
      // Gestion spécifique des erreurs
      if (error?.message?.includes('User already exists') || 
          error?.message?.includes('already exists') ||
          error?.message?.includes('déjà utilisé') ||
          error?.response?.data?.message?.includes('exists')) {
        setError("Cette adresse email est déjà utilisée. Veuillez en choisir une autre ou vous connecter.")
        // Retourner à l'étape 2 (sécurité) pour permettre de changer l'email
        if (currentStep === 4) {
          setTimeout(() => {
            const newStep = 2
            setCurrentStep(newStep)
            // Faire défiler la page vers le haut et focus sur le champ email
            window.scrollTo({ top: 0, behavior: 'smooth' })
            setTimeout(() => {
              const emailInput = document.getElementById('email')
              emailInput?.focus()
            }, 100)
          }, 100)
        }
      } else if (error?.message?.includes('validation') || 
                 error?.message?.includes('invalid')) {
        setError("Certaines informations ne sont pas valides. Veuillez vérifier vos données.")
      } else if (error?.message?.includes('network') || 
                 error?.message?.includes('fetch')) {
        setError("Problème de connexion. Vérifiez votre connexion internet et réessayez.")
      } else {
        setError("Une erreur inattendue s'est produite. Veuillez réessayer ou contacter le support.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = () => {
    router.push("/auth/connexion")
  }

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <IdentityStep
            formData={formData}
            errors={errors}
            onFieldChange={updateField}
            onAddressChange={updateAddressField}
          />
        )
      case 2:
        return (
          <SecurityStep
            formData={formData}
            errors={errors}
            onFieldChange={updateField}
          />
        )
      case 3:
        return (
          <MedicalStep
            formData={formData}
            errors={errors}
            onFieldChange={updateField}
          />
        )
      case 4:
        return (
          <EmergencyStep
            formData={formData}
            errors={errors}
            onFieldChange={updateField}
            onEmergencyContactChange={updateEmergencyContactField}
          />
        )
      default:
        return null
    }
  }

  return (
    <PublicLayout>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Logo centré */}
          <div className="text-center">
            <div 
              onClick={() => router.push("/")} 
              className="cursor-pointer inline-block mx-auto mb-6 transition-opacity hover:opacity-80"
            >
              <HavRidLogo size="lg" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Créer votre compte HavRid
            </h1>
            <p className="text-lg text-muted-foreground">
              Accès sécurisé à vos services d'ambulance personnalisés
            </p>
          </div>

          {/* Progress indicator */}
          <div className="max-w-2xl mx-auto">
            <FormStepProgress
              currentStep={currentStep}
              totalSteps={4}
              stepLabels={stepLabels}
              className="mb-8"
            />
          </div>

          {/* Navigation du haut */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 text-lg"
                    disabled={isLoading}
                  >
                    ← Précédent
                  </Button>
                )}
              </div>
              
              <div className="flex gap-3 sm:ml-auto">
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="h-14 px-8 text-lg min-w-[140px]"
                    disabled={isLoading}
                  >
                    Suivant →
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="h-14 px-8 text-lg min-w-[180px] bg-green-600 hover:bg-green-700"
                    disabled={isLoading || !formData.acceptTerms}
                  >
                    {isLoading ? "Création..." : "🎉 Créer mon compte"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Formulaire par étapes */}
          <div className="max-w-3xl mx-auto">
            {renderCurrentStep()}
          </div>

          {/* Erreur de soumission */}
          {submitError && (
            <div className="max-w-3xl mx-auto">
              <div 
                role="alert"
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-start gap-3">
                  <div className="text-red-500 text-xl flex-shrink-0">⚠️</div>
                  <div>
                    <h3 className="text-red-800 font-semibold text-base mb-1">
                      Erreur lors de l'inscription
                    </h3>
                    <p className="text-red-700 text-base">
                      {submitError}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    className="h-14 px-8 text-lg"
                    disabled={isLoading}
                  >
                    ← Précédent
                  </Button>
                )}
              </div>
              
              <div className="flex gap-3 sm:ml-auto">
                {currentStep < 4 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="h-14 px-8 text-lg min-w-[140px]"
                    disabled={isLoading}
                  >
                    Suivant →
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={handleSubmit}
                    className="h-14 px-8 text-lg min-w-[180px] bg-green-600 hover:bg-green-700"
                    disabled={isLoading || !formData.acceptTerms}
                  >
                    {isLoading ? "Création..." : "🎉 Créer mon compte"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Lien connexion */}
          <div className="text-center border-t pt-8 max-w-2xl mx-auto">
            <p className="text-muted-foreground text-base mb-4">
              Vous avez déjà un compte HavRid ?
            </p>
            <Button 
              variant="outline" 
              onClick={handleSignIn}
              className="h-12 px-6 text-base"
              disabled={isLoading}
            >
              Se connecter
            </Button>
          </div>

          {/* Support d'urgence */}
          <div className="text-center p-6 bg-muted/50 rounded-lg max-w-2xl mx-auto">
            <p className="text-base text-muted-foreground mb-2">
              Besoin d'aide pendant l'inscription ?
            </p>
            <p className="text-base">
              📞 <strong>Support 24h/7j : 01 23 45 67 89</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Notre équipe vous accompagne à chaque étape
            </p>
          </div>
        </div>
      </main>
    </PublicLayout>
  )
}