import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@repo/ui"
import { Heart, AlertTriangle, Stethoscope } from 'lucide-react'
import { FormData } from '@/types/inscription'

interface MedicalStepProps {
  formData: FormData
  errors: Record<string, string>
  onFieldChange: (field: keyof FormData, value: any) => void
}

export default function MedicalStep({
  formData,
  errors,
  onFieldChange
}: MedicalStepProps) {
  const mobilityOptions = [
    { value: 'none', label: 'Aucune aide nécessaire', icon: '🚶' },
    { value: 'cane', label: 'Canne ou bâton', icon: '🦯' },
    { value: 'walker', label: 'Déambulateur', icon: '🚶‍♀️' },
    { value: 'wheelchair', label: 'Fauteuil roulant', icon: '♿' },
    { value: 'other', label: 'Autre (précisez ci-dessous)', icon: '⚕️' }
  ]

  return (
    <Card data-step="3">
      <CardHeader>
        <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          Informations médicales
        </CardTitle>
        <p className="text-center text-muted-foreground text-base">
          Ces informations nous aident à vous accompagner dans les meilleures conditions
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Message d'information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Stethoscope className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 text-sm font-medium">
                Informations confidentielles et optionnelles
              </p>
              <p className="text-blue-700 text-sm mt-1">
                Toutes les informations de cette section sont facultatives mais nous aident à mieux vous servir. 
                Elles restent strictement confidentielles et ne sont partagées qu'avec l'équipe médicale si nécessaire.
              </p>
            </div>
          </div>
        </div>

        {/* Informations administratives */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Informations administratives
          </h3>
          
          <div className="space-y-3">
            <Label htmlFor="socialSecurity" className="text-base font-medium">
              Numéro de sécurité sociale
            </Label>
            <Input
              id="socialSecurity"
              value={formData.socialSecurity || ''}
              onChange={(e) => onFieldChange('socialSecurity', e.target.value)}
              placeholder="1 23 45 67 890 123 45"
              maxLength={15}
              aria-invalid={!!errors.socialSecurity}
              aria-describedby={errors.socialSecurity ? "socialSecurity-error" : "socialSecurity-help"}
              className={`h-14 text-lg ${errors.socialSecurity ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {errors.socialSecurity && (
              <p id="socialSecurity-error" className="text-red-600 text-sm" role="alert">
                {errors.socialSecurity}
              </p>
            )}
            <p id="socialSecurity-help" className="text-xs text-muted-foreground">
              Facilite les remboursements de vos trajets médicaux
            </p>
          </div>
        </div>

        {/* Informations de santé critiques */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-500" />
            Informations de santé importantes
          </h3>

          <div className="space-y-3">
            <Label htmlFor="allergies" className="text-base font-medium">
              Allergies connues
            </Label>
            <textarea
              id="allergies"
              value={formData.allergies || ''}
              onChange={(e) => onFieldChange('allergies', e.target.value)}
              placeholder="Ex: Pénicilline, Latex, Arachides..."
              rows={3}
              maxLength={500}
              aria-invalid={!!errors.allergies}
              aria-describedby={errors.allergies ? "allergies-error" : "allergies-help"}
              className={`w-full p-3 text-lg border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors.allergies ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {errors.allergies && (
              <p id="allergies-error" className="text-red-600 text-sm" role="alert">
                {errors.allergies}
              </p>
            )}
            <p id="allergies-help" className="text-xs text-muted-foreground">
              Indiquez toutes vos allergies connues pour votre sécurité
            </p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="medications" className="text-base font-medium">
              Médicaments actuels
            </Label>
            <textarea
              id="medications"
              value={formData.medications || ''}
              onChange={(e) => onFieldChange('medications', e.target.value)}
              placeholder="Ex: Doliprane 1000mg matin et soir, Kardégic 75mg le matin..."
              rows={4}
              maxLength={500}
              aria-invalid={!!errors.medications}
              aria-describedby={errors.medications ? "medications-error" : "medications-help"}
              className={`w-full p-3 text-lg border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors.medications ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {errors.medications && (
              <p id="medications-error" className="text-red-600 text-sm" role="alert">
                {errors.medications}
              </p>
            )}
            <p id="medications-help" className="text-xs text-muted-foreground">
              Listez vos traitements avec dosages et fréquences si possible
            </p>
          </div>
        </div>

        {/* Mobilité */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Mobilité et accessibilité
          </h3>

          <div className="space-y-4">
            <Label className="text-base font-medium">
              Aide à la mobilité
            </Label>
            <div className="grid gap-3 md:grid-cols-2">
              {mobilityOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                    formData.mobility === option.value 
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/20' 
                      : 'border-input'
                  }`}
                >
                  <input
                    type="radio"
                    name="mobility"
                    value={option.value}
                    checked={formData.mobility === option.value}
                    onChange={(e) => onFieldChange('mobility', e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-2xl" aria-hidden="true">{option.icon}</span>
                  <span className="text-base font-medium">{option.label}</span>
                </label>
              ))}
            </div>

            {formData.mobility === 'other' && (
              <div className="space-y-3 mt-4">
                <Label htmlFor="mobilityDetails" className="text-base font-medium">
                  Précisez votre situation
                </Label>
                <Input
                  id="mobilityDetails"
                  value={formData.mobilityDetails || ''}
                  onChange={(e) => onFieldChange('mobilityDetails', e.target.value)}
                  placeholder="Décrivez vos besoins spécifiques..."
                  maxLength={200}
                  aria-invalid={!!errors.mobilityDetails}
                  className={`h-14 text-lg ${errors.mobilityDetails ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors.mobilityDetails && (
                  <p className="text-red-600 text-sm" role="alert">
                    {errors.mobilityDetails}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Médecin traitant */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Médecin traitant
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="doctorName" className="text-base font-medium">
                Nom du médecin traitant
              </Label>
              <Input
                id="doctorName"
                value={formData.doctorName || ''}
                onChange={(e) => onFieldChange('doctorName', e.target.value)}
                placeholder="Dr. Martin Dupont"
                maxLength={100}
                aria-invalid={!!errors.doctorName}
                aria-describedby="doctorName-help"
                className={`h-14 text-lg ${errors.doctorName ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.doctorName && (
                <p className="text-red-600 text-sm" role="alert">
                  {errors.doctorName}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="doctorPhone" className="text-base font-medium">
                Téléphone du médecin
              </Label>
              <Input
                id="doctorPhone"
                type="tel"
                value={formData.doctorPhone || ''}
                onChange={(e) => onFieldChange('doctorPhone', e.target.value)}
                placeholder="01 23 45 67 89"
                aria-invalid={!!errors.doctorPhone}
                className={`h-14 text-lg ${errors.doctorPhone ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.doctorPhone && (
                <p className="text-red-600 text-sm" role="alert">
                  {errors.doctorPhone}
                </p>
              )}
            </div>
          </div>
          <p id="doctorName-help" className="text-xs text-muted-foreground">
            Nous permet de coordonner avec votre équipe médicale si nécessaire
          </p>
        </div>

        {/* Message de confidentialité */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">✓</span>
            </div>
            <div>
              <p className="text-green-800 text-sm font-medium">
                Vos informations médicales sont protégées
              </p>
              <p className="text-green-700 text-sm mt-1">
                Conformément au secret médical, ces données ne sont accessibles qu'aux professionnels 
                de santé autorisés et uniquement dans le cadre de votre prise en charge.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}