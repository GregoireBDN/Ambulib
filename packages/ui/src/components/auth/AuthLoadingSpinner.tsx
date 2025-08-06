import * as React from "react"
import { Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

interface AuthLoadingSpinnerProps {
  message?: string
  size?: "sm" | "md" | "lg"
  className?: string
  overlay?: boolean
}

const AuthLoadingSpinner: React.FC<AuthLoadingSpinnerProps> = ({
  message = "Chargement en cours...",
  size = "md",
  className,
  overlay = false
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  }
  
  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg"
  }

  const spinner = (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-3 p-6",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <Loader2 
        className={cn(
          "animate-spin text-primary",
          sizeClasses[size]
        )}
        aria-hidden="true"
      />
      <p className={cn(
        "text-center text-muted-foreground font-medium leading-relaxed",
        textSizeClasses[size]
      )}>
        {message}
      </p>
    </div>
  )

  if (overlay) {
    return (
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        aria-modal="true"
      >
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-background border rounded-lg shadow-lg">
            {spinner}
          </div>
        </div>
      </div>
    )
  }

  return spinner
}

// Version compacte pour l'usage inline
interface InlineLoadingSpinnerProps {
  message?: string
  className?: string
}

const InlineLoadingSpinner: React.FC<InlineLoadingSpinnerProps> = ({
  message = "Chargement...",
  className
}) => {
  return (
    <div
      className={cn("flex items-center space-x-2", className)}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <Loader2 
        className="h-4 w-4 animate-spin text-primary" 
        aria-hidden="true"
      />
      <span className="text-sm text-muted-foreground font-medium">
        {message}
      </span>
    </div>
  )
}

export { AuthLoadingSpinner, InlineLoadingSpinner }
export type { AuthLoadingSpinnerProps, InlineLoadingSpinnerProps }