"use client"

import * as React from "react"
import { PatternFormat } from "react-number-format"
import { cn } from "../../lib/utils"
import type { InputProps } from "./input"

interface SocialSecurityInputProps extends Omit<InputProps, 'onChange' | 'type' | 'value'> {
  onChange?: (value: string, isValid: boolean, details?: { maskedValue?: string }) => void
  maskDisplay?: boolean // Option pour masquer partiellement le numéro
  value?: string
}

const SocialSecurityInput = React.forwardRef<HTMLInputElement, SocialSecurityInputProps>(
  ({ 
    className,
    onChange,
    maskDisplay = false,
    value = '',
    error: _error,
    ...props 
  }, ref) => {
    // Filter out props that might conflict with PatternFormat
    const { defaultValue, ...filteredProps } = props
    const [isValid, setIsValid] = React.useState<boolean | null>(null)
    const [validationMessage, setValidationMessage] = React.useState<string>('')

    // Validation du numéro de sécurité sociale français (NIR)
    const validateNIR = React.useCallback((nir: string) => {
      if (!nir.trim()) {
        setIsValid(null)
        setValidationMessage('')
        return false
      }

      // Extraire seulement les chiffres
      const digits = nir.replace(/\D/g, '')
      
      if (digits.length === 0) {
        setIsValid(null)
        setValidationMessage('')
        return false
      }

      if (digits.length < 15) {
        setIsValid(false)
        setValidationMessage(`${digits.length}/15 chiffres saisis`)
        return false
      }

      if (digits.length > 15) {
        setIsValid(false)
        setValidationMessage('Trop de chiffres (15 maximum)')
        return false
      }

      // Validation de base du format NIR
      const nirNumber = digits.substring(0, 13)
      const controlKey = parseInt(digits.substring(13, 15))

      // Validation de la clé de contrôle
      try {
        const nirNum = BigInt(nirNumber)
        const calculatedKey = BigInt(97) - (nirNum % BigInt(97))
        
        if (Number(calculatedKey) === controlKey) {
          setIsValid(true)
          
          // Analyse des composants du NIR
          const sex = digits[0]
          const year = digits.substring(1, 3)
          const month = digits.substring(3, 5)
          const dept = digits.substring(5, 7)
          
          let details = []
          
          // Sexe
          if (sex === '1') details.push('Homme')
          else if (sex === '2') details.push('Femme')
          else details.push('Sexe invalide')
          
          // Mois
          const monthNum = parseInt(month)
          if (monthNum >= 1 && monthNum <= 12) {
            const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
            details.push(`${monthNames[monthNum - 1]} ${year}`)
          } else {
            details.push('Mois invalide')
          }
          
          // Département approximatif
          const deptNum = parseInt(dept)
          if (deptNum >= 1 && deptNum <= 95) {
            details.push(`Dép. ${dept}`)
          } else if (dept === '2A' || dept === '2B') {
            details.push('Corse')
          } else {
            details.push('Outre-mer/Étranger')
          }
          
          setValidationMessage(`✓ NIR valide - ${details.join(', ')}`)
          return true
        } else {
          setIsValid(false)
          setValidationMessage(`Clé de contrôle incorrecte (attendue: ${calculatedKey.toString().padStart(2, '0')})`)
          return false
        }
      } catch {
        setIsValid(false)
        setValidationMessage('Erreur de calcul de la clé')
        return false
      }
    }, [])

    // Gérer les changements de valeur
    const handleValueChange = React.useCallback((values: { formattedValue: string; value: string }) => {
      const { formattedValue, value: rawValue } = values
      
      // Valider le numéro
      const isValid = validateNIR(rawValue)
      
      // Créer une version masquée si demandée
      const maskedValue = maskDisplay && rawValue.length === 15 
        ? `${rawValue[0]} ** ** ** *** *** ${rawValue.substring(13)}` 
        : formattedValue

      // Appeler le callback onChange
      onChange?.(rawValue, isValid, { maskedValue })
    }, [validateNIR, onChange, maskDisplay])

    // Déterminer le style de validation
    const getValidationStyling = () => {
      if (isValid === null) return ''
      if (isValid) return 'border-green-500 focus-visible:ring-green-500'
      return 'border-red-500 focus-visible:ring-red-500'
    }

    // Obtenir le texte d'aide
    const getHelpText = () => {
      if (_error) return _error
      if (validationMessage && isValid !== true) return validationMessage
      if (validationMessage && isValid === true) return validationMessage
      return 'Format français 15 chiffres : 1 23 45 67 890 123 45'
    }

    return (
      <div className="space-y-1">
        <PatternFormat
          format="# ## ## ## ### ### ##"
          mask="_"
          allowEmptyFormatting={false}
          value={value}
          onValueChange={handleValueChange}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            'font-mono tracking-wider',
            getValidationStyling(),
            className
          )}
          aria-invalid={_error || isValid === false ? 'true' : 'false'}
          getInputRef={ref}
          {...filteredProps}
        />
        {(_error || validationMessage) && (
          <p className={cn(
            "text-sm",
            _error || isValid === false ? "text-destructive" : "text-muted-foreground"
          )}>
            {getHelpText()}
          </p>
        )}
      </div>
    )
  }
)

SocialSecurityInput.displayName = "SocialSecurityInput"

export { SocialSecurityInput, type SocialSecurityInputProps }