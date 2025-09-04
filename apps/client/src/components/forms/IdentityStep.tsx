import { Card, CardContent, CardHeader, CardTitle, Input, PhoneInput, Label, AddressCombobox } from "@repo/ui"
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
              <PhoneInput
                id="phone"
                value={formData.phone}
                onChange={(value, isValid) => onFieldChange('phone', value)}
                placeholder="06 12 34 56 78"
                required
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : "phone-help"}
                className={`h-14 text-lg ${errors.phone ? 'border-red-500 focus:border-red-500' : ''}`}
                error={errors.phone}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-600 text-sm" role="alert">
                  {errors.phone}
                </p>
              )}
              <p id="phone-help" className="text-xs text-muted-foreground">
                Validation automatique française - mobile et fixe acceptés
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
            {/* Autocomplete adresse unique */}
            <div className="space-y-3">
              <Label htmlFor="address-full" className="text-base font-medium">
                Votre adresse *
              </Label>
              <AddressCombobox
                value={formData.address.street}
                initialAddressData={
                  formData.address.street ? {
                    id: formData.address.street,
                    label: `${formData.address.street}${formData.address.postalCode && formData.address.city ? `, ${formData.address.postalCode} ${formData.address.city}` : ''}`,
                    street: formData.address.street,
                    postalCode: formData.address.postalCode || '',
                    city: formData.address.city || '',
                    coordinates: [0, 0],
                    type: "housenumber" as const,
                    score: 1,
                    context: formData.address.street
                  } : null
                }
                placeholder="Tapez votre adresse : 123 rue de la République, Paris..."
                onAddressSelect={(address) => {
                  if (address) {
                    // Extraire les informations de l'adresse
                    let street = address.street || address.label || '';
                    let postalCode = address.postalCode || '';
                    let city = address.city || '';
                    
                    // Si postalCode ou city sont manquants, essayer de parser depuis label
                    if ((!postalCode || !city) && address.label) {
                      // Parser le label pour extraire code postal et ville
                      // Format attendu: "Adresse, Code postal Ville"
                      const labelParts = address.label.split(',');
                      if (labelParts.length >= 2) {
                        const lastPart = labelParts[labelParts.length - 1].trim();
                        const postalCityMatch = lastPart.match(/(\d{5})\s+(.+)/);
                        
                        if (postalCityMatch) {
                          if (!postalCode) postalCode = postalCityMatch[1];
                          if (!city) city = postalCityMatch[2];
                        }
                      }
                    }
                    
                    // Sauvegarder les données
                    onAddressChange('street', street)
                    onAddressChange('postalCode', postalCode)
                    onAddressChange('city', city)
                  } else {
                    // Réinitialiser l'adresse si désélectionnée
                    onAddressChange('street', '')
                    onAddressChange('postalCode', '')
                    onAddressChange('city', '')
                  }
                }}
                error={errors['address.street']}
                required
                className={errors['address.street'] ? 'border-red-500' : ''}
                searchLimit={5}
                debounceDelay={300}
                id="address-full"
              />
              {errors['address.street'] && (
                <p id="address-error" className="text-red-600 text-sm" role="alert">
                  {errors['address.street']}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                💡 Tapez quelques lettres et sélectionnez votre adresse dans la liste
              </p>
            </div>


            {/* Complément d'adresse optionnel */}
            <div className="space-y-3">
              <Label htmlFor="complement" className="text-base font-medium">
                Complément d'adresse (optionnel)
              </Label>
              <Input
                id="complement"
                value={formData.address.complement || ''}
                onChange={(e) => onAddressChange('complement', e.target.value)}
                placeholder="Appartement, étage, bâtiment, digicode..."
                className="h-14 text-lg"
                aria-describedby="complement-help"
              />
              <p id="complement-help" className="text-xs text-muted-foreground">
                Informations supplémentaires pour faciliter l'accès des ambulanciers
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}