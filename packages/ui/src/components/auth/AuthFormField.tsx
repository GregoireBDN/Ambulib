import * as React from "react"
import { cn } from "../../lib/utils"
import { Input } from "../ui/input"

interface AuthFormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  error?: string | string[]
  className?: string
}

const AuthFormField = React.forwardRef<HTMLInputElement, AuthFormFieldProps>(
  ({ label, description, error, className, id, ...props }, ref) => {
    const fieldId = id || `field-${label.toLowerCase().replace(/\s+/g, '-')}`
    const descriptionId = description ? `${fieldId}-description` : undefined
    const errorId = error ? `${fieldId}-error` : undefined
    
    // Gérer les erreurs multiples (array) ou simple (string)
    const errorMessages = Array.isArray(error) ? error : error ? [error] : []
    const hasError = errorMessages.length > 0

    return (
      <div className={cn("space-y-2", className)}>
        <label
          htmlFor={fieldId}
          className="block text-base font-medium text-foreground leading-relaxed"
        >
          {label}
          {props.required && (
            <span className="text-destructive ml-1" aria-label="champ obligatoire">
              *
            </span>
          )}
        </label>
        
        {description && (
          <p
            id={descriptionId}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {description}
          </p>
        )}
        
        <Input
          ref={ref}
          id={fieldId}
          className={cn(
            "h-12 text-base", // Taille généreuse pour seniors
            hasError && "border-destructive focus-visible:ring-destructive"
          )}
          aria-describedby={cn(
            descriptionId,
            errorId
          ).trim() || undefined}
          aria-invalid={hasError}
          {...props}
        />
        
        {hasError && (
          <div
            id={errorId}
            className="space-y-1"
            role="alert"
            aria-live="polite"
          >
            {errorMessages.map((message, index) => (
              <p
                key={index}
                className="text-sm text-destructive font-medium leading-relaxed"
              >
                {message}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }
)

AuthFormField.displayName = "AuthFormField"

export { AuthFormField }
export type { AuthFormFieldProps }