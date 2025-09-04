"use client"

import * as React from "react"
import { AsYouType, parsePhoneNumber } from "libphonenumber-js"
import { cn } from "../../lib/utils"
import { Input, type InputProps } from "./input"

interface PhoneInputProps extends Omit<InputProps, 'onChange' | 'type'> {
  onChange?: (value: string, isValid: boolean, parsedNumber?: unknown) => void
  defaultCountry?: 'FR'
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ 
    className,
    onChange,
    defaultCountry = 'FR',
    value = '',
    error,
    ...props 
  }, ref) => {
    const [isValid, setIsValid] = React.useState<boolean | null>(null)
    const [validationMessage, setValidationMessage] = React.useState<string>('')
    
    // AsYouType instance - recreated for each format operation as per docs
    const asYouTypeRef = React.useRef<AsYouType>(new AsYouType(defaultCountry))

    // Validate French phone number
    const validatePhoneNumber = React.useCallback((input: string) => {
      if (!input.trim()) {
        setIsValid(null)
        setValidationMessage('')
        return null
      }

      try {
        // Parse the phone number
        const phoneNumber = parsePhoneNumber(input, defaultCountry)
        
        if (phoneNumber) {
          const valid = phoneNumber.isValid()
          setIsValid(valid)
          
          if (!valid) {
            if (phoneNumber.isPossible()) {
              setValidationMessage('Ce numéro n\'est pas valide pour la France')
            } else {
              const digits = input.replace(/\D/g, '')
              if (digits.length < 10) {
                setValidationMessage('Ce numéro est trop court (10 chiffres requis)')
              } else if (digits.length > 10) {
                setValidationMessage('Ce numéro est trop long (10 chiffres maximum)')
              } else {
                setValidationMessage('Format de numéro incorrect')
              }
            }
          } else {
            setValidationMessage('')
            // Déterminer le type de numéro (mobile/fixe)
            const type = phoneNumber.getType()
            if (type === 'MOBILE') {
              setValidationMessage('Mobile')
            } else if (type === 'FIXED_LINE') {
              setValidationMessage('Fixe')
            }
          }
          
          return phoneNumber
        } else {
          setIsValid(false)
          setValidationMessage('Format de numéro non reconnu')
          return null
        }
      } catch {
        setIsValid(false)
        setValidationMessage('Numéro invalide')
        return null
      }
    }, [defaultCountry])

    // Handle input change using AsYouType best practices
    const handleChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      
      // Create new AsYouType instance for fresh formatting (as per official docs)
      asYouTypeRef.current = new AsYouType(defaultCountry)
      
      // Use AsYouType.input() method directly - handles all formatting
      const formattedValue = asYouTypeRef.current.input(inputValue)
      
      // Get clean number for validation
      const rawNumber = asYouTypeRef.current.getChars()
      
      // Update input value directly (controlled by AsYouType)
      e.target.value = formattedValue
      
      // Validate the clean number
      const parsedNumber = validatePhoneNumber(rawNumber || inputValue)
      
      // Call onChange with raw number
      onChange?.(rawNumber || inputValue, isValid === true, parsedNumber)
    }, [defaultCountry, validatePhoneNumber, onChange, isValid])

    // Format initial value and validate
    const getFormattedValue = React.useCallback((inputValue: string) => {
      if (!inputValue.trim()) return ''
      
      // Create fresh AsYouType instance
      const formatter = new AsYouType(defaultCountry)
      return formatter.input(inputValue)
    }, [defaultCountry])

    // Initial validation and formatting when value changes
    React.useEffect(() => {
      if (value) {
        validatePhoneNumber(value.toString())
      } else {
        setIsValid(null)
        setValidationMessage('')
      }
    }, [value, validatePhoneNumber])

    // Determine validation state styling
    const getValidationStyling = () => {
      if (isValid === null) return ''
      if (isValid) return 'border-green-500 focus-visible:ring-green-500'
      return 'border-red-500 focus-visible:ring-red-500'
    }


    return (
      <Input
        ref={ref}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
        defaultValue={getFormattedValue(value?.toString() || '')}
        onChange={handleChange}
        className={cn(
          'font-mono tracking-wider',
          getValidationStyling(),
          className
        )}
        error={error || (isValid === false ? validationMessage : undefined)}
        aria-invalid={error || isValid === false ? 'true' : 'false'}
        {...props}
      />
    )
  }
)

PhoneInput.displayName = "PhoneInput"

export { PhoneInput, type PhoneInputProps }