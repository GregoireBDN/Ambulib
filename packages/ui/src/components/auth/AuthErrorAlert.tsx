import * as React from "react"
import { AlertCircle, X } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "../ui/button"

interface AuthErrorAlertProps {
  error: string | string[] | null
  onDismiss?: () => void
  className?: string
  variant?: "error" | "warning" | "info"
}

const AuthErrorAlert: React.FC<AuthErrorAlertProps> = ({
  error,
  onDismiss,
  className,
  variant = "error"
}) => {
  if (!error) return null

  // Gérer les erreurs multiples (array) ou simple (string)
  const errorMessages = Array.isArray(error) ? error : [error]
  
  const variantStyles = {
    error: "bg-destructive/10 border-destructive/20 text-destructive",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800"
  }

  return (
    <div
      className={cn(
        "relative rounded-lg border-2 p-4",
        "animate-in fade-in-50 slide-in-from-top-1 duration-300",
        variantStyles[variant],
        className
      )}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start space-x-3">
        <AlertCircle 
          className="h-5 w-5 mt-0.5 flex-shrink-0" 
          aria-hidden="true"
        />
        
        <div className="flex-1 space-y-1">
          {errorMessages.map((message, index) => (
            <p 
              key={index}
              className="text-sm font-medium leading-relaxed"
            >
              {message}
            </p>
          ))}
        </div>
        
        {onDismiss && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className={cn(
              "h-6 w-6 p-0 -mt-1 -mr-1",
              "hover:bg-transparent focus:bg-transparent",
              "text-current hover:text-current/80"
            )}
            aria-label="Fermer l'alerte"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      {/* Aide contextuelle pour certaines erreurs */}
      {errorMessages.some(msg => msg.toLowerCase().includes('mot de passe')) && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <p className="text-xs font-normal opacity-80">
            💡 Astuce : Votre mot de passe doit contenir au moins 8 caractères avec majuscules, minuscules, chiffres et caractères spéciaux.
          </p>
        </div>
      )}
      
      {errorMessages.some(msg => msg.toLowerCase().includes('email')) && (
        <div className="mt-3 pt-3 border-t border-current/20">
          <p className="text-xs font-normal opacity-80">
            💡 Astuce : Vérifiez que votre adresse email est correctement saisie (exemple@domaine.com).
          </p>
        </div>
      )}
    </div>
  )
}

export { AuthErrorAlert }
export type { AuthErrorAlertProps }