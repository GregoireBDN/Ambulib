import { Card, CardContent, CardHeader, CardTitle, Input, Label } from "@repo/ui"
import { FormData } from '@/types/inscription'

interface IdentityStepProps {
  formData: FormData
  errors: Record<string, string>
  onFieldChange: (field: keyof FormData, value: any) => void
  onAddressChange: (field: keyof FormData['address'], value: string) => void
}

export default function IdentityStep({
  formData,
  errors,
  onFieldChange,
  onAddressChange
}: IdentityStepProps) {
  return (
    <Card data-step="1">
      <CardHeader>
        <CardTitle className="text-xl text-center">
          Vos informations personnelles
        </CardTitle>
        <p className="text-center text-muted-foreground text-base">
          Ces informations nous aident à vous identifier et à vous localiser en cas d'urgence
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Informations personnelles */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Informations personnelles
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="firstName" className="text-base font-medium">
                Prénom *
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => onFieldChange('firstName', e.target.value)}
                placeholder="Votre prénom"
                required
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? "firstName-error" : "firstName-help"}
                className={`h-14 text-lg ${errors.firstName ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-red-600 text-sm" role="alert">
                  {errors.firstName}
                </p>
              )}
              <p id="firstName-help" className="text-xs text-muted-foreground">
                Tel qu'indiqué sur votre pièce d'identité
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="lastName" className="text-base font-medium">
                Nom *
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => onFieldChange('lastName', e.target.value)}
                placeholder="Votre nom"
                required
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? "lastName-error" : "lastName-help"}
                className={`h-14 text-lg ${errors.lastName ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-red-600 text-sm" role="alert">
                  {errors.lastName}
                </p>
              )}
              <p id="lastName-help" className="text-xs text-muted-foreground">
                Nom de famille complet
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <Label htmlFor="birthDate" className="text-base font-medium">
                Date de naissance *
              </Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => onFieldChange('birthDate', e.target.value)}
                required
                aria-invalid={!!errors.birthDate}
                aria-describedby={errors.birthDate ? "birthDate-error" : "birthDate-help"}
                className={`h-14 text-lg ${errors.birthDate ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.birthDate && (
                <p id="birthDate-error" className="text-red-600 text-sm" role="alert">
                  {errors.birthDate}
                </p>
              )}
              <p id="birthDate-help" className="text-xs text-muted-foreground">
                Nécessaire pour adapter nos services à votre âge
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="phone" className="text-base font-medium">
                Numéro de téléphone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => onFieldChange('phone', e.target.value)}
                placeholder="01 23 45 67 89"
                required
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : "phone-help"}
                className={`h-14 text-lg ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-600 text-sm" role="alert">
                  {errors.phone}
                </p>
              )}
              <p id="phone-help" className="text-xs text-muted-foreground">
                Indispensable pour vous contacter en cas d'urgence
              </p>
            </div>
          </div>
        </div>

        {/* Adresse */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Votre adresse principale
          </h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 text-sm">
              💡 Cette adresse sera utilisée comme point de départ principal pour vos trajets en ambulance
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="street" className="text-base font-medium">
                Adresse complète *
              </Label>
              <Input
                id="street"
                value={formData.address.street}
                onChange={(e) => onAddressChange('street', e.target.value)}
                placeholder="123 rue de la République"
                required
                aria-invalid={!!errors['address.street']}
                aria-describedby={errors['address.street'] ? "street-error" : "street-help"}
                className={`h-14 text-lg ${errors['address.street'] ? 'border-red-500 focus:border-red-500' : ''}`}
              />
              {errors['address.street'] && (
                <p id="street-error" className="text-red-600 text-sm" role="alert">
                  {errors['address.street']}
                </p>
              )}
              <p id="street-help" className="text-xs text-muted-foreground">
                Numéro et nom de rue complets
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <Label htmlFor="postalCode" className="text-base font-medium">
                  Code postal *
                </Label>
                <Input
                  id="postalCode"
                  value={formData.address.postalCode}
                  onChange={(e) => onAddressChange('postalCode', e.target.value)}
                  placeholder="75001"
                  maxLength={5}
                  required
                  aria-invalid={!!errors['address.postalCode']}
                  aria-describedby={errors['address.postalCode'] ? "postalCode-error" : undefined}
                  className={`h-14 text-lg ${errors['address.postalCode'] ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors['address.postalCode'] && (
                  <p id="postalCode-error" className="text-red-600 text-sm" role="alert">
                    {errors['address.postalCode']}
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Label htmlFor="city" className="text-base font-medium">
                  Ville *
                </Label>
                <Input
                  id="city"
                  value={formData.address.city}
                  onChange={(e) => onAddressChange('city', e.target.value)}
                  placeholder="Paris"
                  required
                  aria-invalid={!!errors['address.city']}
                  aria-describedby={errors['address.city'] ? "city-error" : undefined}
                  className={`h-14 text-lg ${errors['address.city'] ? 'border-red-500 focus:border-red-500' : ''}`}
                />
                {errors['address.city'] && (
                  <p id="city-error" className="text-red-600 text-sm" role="alert">
                    {errors['address.city']}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Message d'encouragement */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 text-base font-medium">
            ✅ Excellent ! Vous avez complété la première étape
          </p>
          <p className="text-green-700 text-sm mt-1">
            Vos informations sont automatiquement sauvegardées
          </p>
        </div>
      </CardContent>
    </Card>
  )
}