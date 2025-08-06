import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "../../lib/utils"
import { Input } from "../ui/input"
import { Button } from "../ui/button"

interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  description?: string
  error?: string | string[]
  showToggle?: boolean
  className?: string
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, description, error, showToggle = true, className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const fieldId = id || `password-${label.toLowerCase().replace(/\s+/g, '-')}`
    const descriptionId = description ? `${fieldId}-description` : undefined
    const errorId = error ? `${fieldId}-error` : undefined
    const toggleId = `${fieldId}-toggle`
    
    // Gérer les erreurs multiples (array) ou simple (string)
    const errorMessages = Array.isArray(error) ? error : error ? [error] : []
    const hasError = errorMessages.length > 0

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

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
        
        <div className="relative">
          <Input
            ref={ref}
            id={fieldId}
            type={showPassword ? "text" : "password"}
            className={cn(
              "h-12 text-base pr-12", // Espace pour le bouton toggle
              hasError && "border-destructive focus-visible:ring-destructive"
            )}
            aria-describedby={cn(
              descriptionId,
              errorId
            ).trim() || undefined}
            aria-invalid={hasError}
            {...props}
          />
          
          {showToggle && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              id={toggleId}
              className="absolute right-0 top-0 h-12 w-12 px-3 py-2 hover:bg-transparent"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              aria-pressed={showPassword}
              tabIndex={0}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-muted-foreground" />
              ) : (
                <Eye className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          )}
        </div>
        
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
        
        {/* Aide pour les exigences du mot de passe */}
        {!hasError && (props.placeholder?.includes('8 caractères') || label.toLowerCase().includes('mot de passe')) && (
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Le mot de passe doit contenir :</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Au moins 8 caractères</li>
              <li>Une majuscule et une minuscule</li>
              <li>Un chiffre</li>
              <li>Un caractère spécial</li>
            </ul>
          </div>
        )}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"

export { PasswordInput }
export type { PasswordInputProps }