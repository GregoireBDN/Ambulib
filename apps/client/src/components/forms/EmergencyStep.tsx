import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button } from "@repo/ui"
import { Phone, UserCheck, Shield, FileText } from 'lucide-react'
import { FormData } from '@/types/inscription'

interface EmergencyStepProps {
  formData: FormData
  errors: Record<string, string>
  onFieldChange: (field: keyof FormData, value: any) => void
  onEmergencyContactChange: (field: keyof FormData['emergencyContact'], value: string) => void
}

export default function EmergencyStep({
  formData,
  errors,
  onFieldChange,
  onEmergencyContactChange
}: EmergencyStepProps) {
  const relationOptions = [
    'Conjoint(e)',
    'Enfant',
    'Parent',
    'Frère/Sœur',
    'Ami(e) proche',
    'Voisin(e)',
    'Autre'
  ]

  return (
    <Card data-step="4">
      <CardHeader>
        <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
          <UserCheck className="w-6 h-6 text-green-600" />
          Contact d'urgence et finalisation
        </CardTitle>
        <p className="text-center text-muted-foreground text-base">
          Dernière étape : désignez un contact d'urgence et finalisez votre inscription
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Message d'information urgence */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-orange-800 text-sm font-medium">
                Pourquoi un contact d'urgence ?
              </p>
              <p className="text-orange-700 text-sm mt-1">
                En cas d'urgence médicale ou de problème pendant un transport, nous devons pouvoir 
                contacter rapidement une personne de confiance. Cette personne sera prévenue uniquement 
                si votre état de santé l'exige.
              </p>
            </div>
          </div>
        </div>

        {/* Contact d'urgence */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Contact d'urgence
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="emergencyFirstName" className="text-base font-medium">
                Prénom *
              </Label>
              <Input
                id="emergencyFirstName"
                value={formData.emergencyContact.firstName}
                onChange={(e) => onEmergencyContactChange('firstName', e.target.value)}
                placeholder="Prénom du contact"
                required
                aria-invalid={!!errors['emergencyContact.firstName']}
                aria-describedby={errors['emergencyContact.firstName'] ? "emergencyFirstName-error" : undefined}
                className={`h-14 text-lg ${errors['emergencyContact.firstName'] ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors['emergencyContact.firstName'] && (
                <p id="emergencyFirstName-error" className="text-red-600 text-sm" role="alert">
                  {errors['emergencyContact.firstName']}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="emergencyLastName" className="text-base font-medium">
                Nom *
              </Label>
              <Input
                id="emergencyLastName"
                value={formData.emergencyContact.lastName}
                onChange={(e) => onEmergencyContactChange('lastName', e.target.value)}
                placeholder="Nom du contact"
                required
                aria-invalid={!!errors['emergencyContact.lastName']}
                aria-describedby={errors['emergencyContact.lastName'] ? "emergencyLastName-error" : undefined}
                className={`h-14 text-lg ${errors['emergencyContact.lastName'] ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors['emergencyContact.lastName'] && (
                <p id="emergencyLastName-error" className="text-red-600 text-sm" role="alert">
                  {errors['emergencyContact.lastName']}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="emergencyPhone" className="text-base font-medium">
                Téléphone *
              </Label>
              <Input
                id="emergencyPhone"
                type="tel"
                value={formData.emergencyContact.phone}
                onChange={(e) => onEmergencyContactChange('phone', e.target.value)}
                placeholder="01 23 45 67 89"
                required
                aria-invalid={!!errors['emergencyContact.phone']}
                aria-describedby={errors['emergencyContact.phone'] ? "emergencyPhone-error" : "emergencyPhone-help"}
                className={`h-14 text-lg ${errors['emergencyContact.phone'] ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors['emergencyContact.phone'] && (
                <p id="emergencyPhone-error" className="text-red-600 text-sm" role="alert">
                  {errors['emergencyContact.phone']}
                </p>
              )}
              <p id="emergencyPhone-help" className="text-xs text-muted-foreground">
                Numéro joignable 24h/24 de préférence
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="emergencyRelation" className="text-base font-medium">
                Lien de parenté *
              </Label>
              <select
                id="emergencyRelation"
                value={formData.emergencyContact.relation}
                onChange={(e) => onEmergencyContactChange('relation', e.target.value)}
                required
                aria-invalid={!!errors['emergencyContact.relation']}
                aria-describedby={errors['emergencyContact.relation'] ? "emergencyRelation-error" : undefined}
                className={`h-14 text-lg w-full px-3 border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent ${errors['emergencyContact.relation'] ? 'border-red-500 focus:ring-red-500' : ''}`}
              >
                <option value="">Sélectionnez le lien</option>
                {relationOptions.map((relation) => (
                  <option key={relation} value={relation}>
                    {relation}
                  </option>
                ))}
              </select>
              {errors['emergencyContact.relation'] && (
                <p id="emergencyRelation-error" className="text-red-600 text-sm" role="alert">
                  {errors['emergencyContact.relation']}
                </p>
              )}
            </div>
          </div>

          {/* Vérification des informations */}
          {formData.emergencyContact.firstName && formData.emergencyContact.lastName && formData.emergencyContact.phone && formData.emergencyContact.relation && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800 text-sm font-medium mb-2">
                ✓ Contact d'urgence enregistré :
              </p>
              <p className="text-blue-700 text-sm">
                <strong>{formData.emergencyContact.firstName} {formData.emergencyContact.lastName}</strong>
                {' '}({formData.emergencyContact.relation})
                <br />
                Téléphone : {formData.emergencyContact.phone}
              </p>
            </div>
          )}
        </div>

        {/* Conditions d'utilisation */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Conditions d'utilisation
          </h3>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-40 overflow-y-auto">
            <div className="text-sm text-gray-700 space-y-2">
              <h4 className="font-semibold">Résumé des conditions principales :</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Vos données personnelles sont protégées selon le RGPD</li>
                <li>Les informations médicales restent confidentielles</li>
                <li>Vous pouvez modifier ou supprimer votre compte à tout moment</li>
                <li>L'utilisation du service est soumise aux tarifs en vigueur</li>
                <li>Notre équipe respecte le secret médical</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={(e) => onFieldChange('acceptTerms', e.target.checked)}
              required
              aria-invalid={!!errors.acceptTerms}
              aria-describedby={errors.acceptTerms ? "acceptTerms-error" : undefined}
              className="mt-1.5 h-5 w-5 text-primary border-2 border-gray-300 rounded focus:ring-2 focus:ring-primary"
            />
            <Label htmlFor="acceptTerms" className="text-base leading-6">
              J'accepte les{" "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-primary underline text-base"
                onClick={() => {/* TODO: Open terms modal */}}
              >
                conditions d'utilisation
              </Button>{" "}
              et la{" "}
              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-primary underline text-base"
                onClick={() => {/* TODO: Open privacy modal */}}
              >
                politique de confidentialité
              </Button>{" "}
              de HavRid *
            </Label>
          </div>
          {errors.acceptTerms && (
            <p id="acceptTerms-error" className="text-red-600 text-sm" role="alert">
              {errors.acceptTerms}
            </p>
          )}
        </div>

        {/* Récapitulatif et finalisation */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Récapitulatif de votre inscription
          </h3>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
            <h4 className="text-green-800 font-semibold">Votre compte HavRid sera créé avec :</h4>
            <div className="grid gap-3 text-sm text-green-700">
              <div className="flex justify-between">
                <span>Nom complet :</span>
                <span className="font-medium">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span>Email de connexion :</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span>Téléphone :</span>
                <span className="font-medium">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Adresse :</span>
                <span className="font-medium">{formData.address.street}, {formData.address.postalCode} {formData.address.city}</span>
              </div>
              <div className="flex justify-between">
                <span>Contact d'urgence :</span>
                <span className="font-medium">
                  {formData.emergencyContact.firstName} {formData.emergencyContact.lastName}
                  {formData.emergencyContact.relation && ` (${formData.emergencyContact.relation})`}
                </span>
              </div>
            </div>
          </div>

          {/* Message de bienvenue */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-6 text-center">
            <h4 className="text-primary text-lg font-semibold mb-2">
              🎉 Bienvenue dans la famille HavRid !
            </h4>
            <p className="text-foreground text-base">
              Vous êtes sur le point de créer votre compte sécurisé. Après validation, 
              vous pourrez réserver vos trajets en ambulance en toute simplicité.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}