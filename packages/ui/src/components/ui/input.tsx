import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        medical: "h-16 rounded-lg border-2 px-4 py-3 text-lg font-medium leading-relaxed focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4 min-h-[60px] min-w-[200px]",
      },
      medical: {
        none: "",
        "vital-signs": "border-primary/30 focus-visible:ring-primary",
        medication: "border-primary/30 focus-visible:ring-primary",
        symptoms: "border-accent/30 focus-visible:ring-accent",
        general: "border-input",
      },
      urgency: {
        routine: "",
        urgent: "border-destructive/50 focus-visible:ring-destructive",
        emergency: "border-destructive focus-visible:ring-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
      medical: "none",
      urgency: "routine",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  description?: string
  error?: string
  validationPattern?: 'phone' | 'postal-code' | 'medical-id' | 'date-birth'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    type, 
    variant, 
    medical, 
    urgency, 
    label, 
    description, 
    error, 
    validationPattern, 
    id,
    onChange,
    ...props 
  }, ref) => {
    const generatedId = React.useId()
    const inputId = id || `input-${generatedId}`
    const descriptionId = description ? `${inputId}-description` : undefined
    const errorId = error ? `${inputId}-error` : undefined


    // Pattern-based validation attributes
    const getValidationAttributes = () => {
      const baseAttrs: React.InputHTMLAttributes<HTMLInputElement> = {}

      switch (validationPattern) {
        case 'phone':
          return {
            ...baseAttrs,
            type: 'tel',
            pattern: '[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}',
            placeholder: props.placeholder || '01 23 45 67 89',
            inputMode: 'tel' as const
          }
        case 'postal-code':
          return {
            ...baseAttrs,
            type: 'text',
            pattern: '[0-9]{5}',
            placeholder: props.placeholder || '75000',
            inputMode: 'numeric' as const,
            maxLength: 5
          }
        case 'medical-id':
          return {
            ...baseAttrs,
            type: 'text',
            pattern: '[0-9]{15}',
            placeholder: props.placeholder || '123456789012345',
            inputMode: 'numeric' as const,
            maxLength: 15
          }
        case 'date-birth':
          return {
            ...baseAttrs,
            type: 'date',
            max: new Date().toISOString().split('T')[0],
            min: new Date(new Date().getFullYear() - 120, 0, 1).toISOString().split('T')[0]
          }
        default:
          return baseAttrs
      }
    }

    const validationAttrs = getValidationAttributes()
    const finalType = validationAttrs.type || type

    // If label is provided, render as a field group
    if (label) {
      const getContextStyles = () => {
        const baseStyles = "space-y-3"
        
        switch (urgency) {
          case 'emergency':
            return cn(baseStyles, "border-l-4 border-destructive pl-4 bg-destructive/5")
          case 'urgent':
            return cn(baseStyles, "border-l-4 border-destructive pl-4 bg-destructive/5")
          default:
            return baseStyles
        }
      }

      return (
        <div className={getContextStyles()}>
          {/* Label */}
          <label 
            htmlFor={inputId}
            className={cn(
              "text-base font-semibold leading-relaxed block mb-2",
              urgency === 'emergency' && "text-destructive",
              urgency === 'urgent' && "text-destructive"
            )}
          >
            {label}
            {props.required && (
              <span className="ml-2 text-destructive font-bold" aria-label="obligatoire">
                *
              </span>
            )}
            {urgency && urgency !== 'routine' && (
              <span className={cn(
                "ml-2 px-2 py-1 text-xs font-bold rounded-full uppercase",
                urgency === 'emergency' && "bg-destructive text-destructive-foreground",
                urgency === 'urgent' && "bg-destructive text-destructive-foreground"
              )}>
                {urgency === 'emergency' ? 'URGENCE' : 'URGENT'}
              </span>
            )}
          </label>

          {/* Description */}
          {description && (
            <p 
              id={descriptionId} 
              className="text-sm text-muted-foreground leading-relaxed mb-2"
            >
              {description}
            </p>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={finalType}
            className={cn(
              inputVariants({ 
                variant: variant || (medical && medical !== 'none' ? 'medical' : 'default'), 
                medical, 
                urgency 
              }),
              error && "border-destructive bg-destructive/5 focus-visible:ring-destructive",
              className
            )}
            aria-describedby={cn(descriptionId, errorId)}
            aria-invalid={error ? "true" : "false"}
            aria-required={props.required ? "true" : "false"}
            {...validationAttrs}
            {...props}
            onChange={onChange}
          />

          {/* Error message */}
          {error && (
            <div 
              id={errorId} 
              className="mt-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg"
              role="alert"
              aria-live="polite"
            >
              <p className="text-sm text-destructive font-medium flex items-start gap-2">
                <svg 
                  className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>
      )
    }

    // Simple input without label wrapper
    return (
      <input
        ref={ref}
        id={inputId}
        type={finalType}
        className={cn(
          inputVariants({ variant, medical, urgency }),
          error && "border-destructive bg-destructive/5 focus-visible:ring-destructive",
          className
        )}
        aria-invalid={error ? "true" : "false"}
        {...validationAttrs}
        {...props}
        onChange={onChange}
      />
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }