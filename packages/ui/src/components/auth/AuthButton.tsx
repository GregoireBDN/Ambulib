import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button, buttonVariants, type ButtonProps } from "../ui/button"

interface AuthButtonProps extends ButtonProps {
  loading?: boolean
  loadingText?: string
  fullWidth?: boolean
}

const AuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ 
    children, 
    loading = false, 
    loadingText = "Chargement...", 
    fullWidth = true,
    className,
    disabled,
    ...props 
  }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn(
          "h-12 text-base font-medium", // Taille généreuse pour seniors
          "transition-all duration-200",
          "focus-visible:ring-4 focus-visible:ring-offset-4", // Focus ultra-visible
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <Loader2 
              className="h-5 w-5 animate-spin" 
              aria-hidden="true"
            />
            <span>{loadingText}</span>
          </div>
        ) : (
          children
        )}
      </Button>
    )
  }
)

AuthButton.displayName = "AuthButton"

// Variante pour les boutons de connexion sociale (Google, etc.)
interface SocialAuthButtonProps extends AuthButtonProps {
  provider: string
  icon?: React.ReactNode
}

const SocialAuthButton = React.forwardRef<HTMLButtonElement, SocialAuthButtonProps>(
  ({ provider, icon, children, className, ...props }, ref) => {
    return (
      <AuthButton
        ref={ref}
        variant="outline"
        className={cn(
          "border-2 hover:border-primary/50",
          "bg-background hover:bg-accent/50",
          className
        )}
        {...props}
      >
        <div className="flex items-center justify-center space-x-2">
          {icon && (
            <span className="w-5 h-5 flex items-center justify-center" aria-hidden="true">
              {icon}
            </span>
          )}
          <span>
            {children || `Se connecter avec ${provider}`}
          </span>
        </div>
      </AuthButton>
    )
  }
)

SocialAuthButton.displayName = "SocialAuthButton"

export { AuthButton, SocialAuthButton }
export type { AuthButtonProps, SocialAuthButtonProps }