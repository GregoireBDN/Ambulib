import * as React from "react"
import { Input, InputProps } from "../ui/input"
import { cn } from "../../lib/utils"

export interface AccessibleInputProps extends InputProps {
  label: string
  description?: string
  error?: string
}

const AccessibleInput = React.forwardRef<HTMLInputElement, AccessibleInputProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const inputId = id || `input-${React.useId()}`
    const descriptionId = description ? `${inputId}-description` : undefined
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className="space-y-2">
        <label
          htmlFor={inputId}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        {description && (
          <p id={descriptionId} className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
        <Input
          ref={ref}
          id={inputId}
          className={cn(
            // Taille plus grande pour l'accessibilité
            "h-12 text-base",
            // Focus très visible
            "focus-visible:ring-4",
            // Bordure d'erreur
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          aria-describedby={cn(descriptionId, errorId)}
          aria-invalid={error ? "true" : undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="text-sm text-destructive" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)
AccessibleInput.displayName = "AccessibleInput"

export { AccessibleInput }