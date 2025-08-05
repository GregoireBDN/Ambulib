import * as React from "react"
import { Button, ButtonProps } from "../ui/button"
import { cn } from "../../lib/utils"

export interface EmergencyButtonProps extends ButtonProps {
  children: React.ReactNode
}

const EmergencyButton = React.forwardRef<HTMLButtonElement, EmergencyButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="destructive"
        size="lg"
        className={cn(
          // Taille très grande pour l'urgence
          "min-h-[60px] min-w-[200px] px-8 py-6",
          // Texte très visible
          "text-xl font-bold",
          // Couleurs haute visibilité
          "bg-red-600 hover:bg-red-700 text-white",
          // Focus ultra-visible
          "focus-visible:ring-4 focus-visible:ring-red-300 focus-visible:ring-offset-4",
          // Animation discrète pour attirer l'attention
          "animate-pulse hover:animate-none",
          className
        )}
        role="button"
        aria-label={`Bouton d'urgence: ${typeof children === 'string' ? children : 'Action d\'urgence'}`}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
EmergencyButton.displayName = "EmergencyButton"

export { EmergencyButton }