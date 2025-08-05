import * as React from "react"
import { Button, ButtonProps } from "../ui/button"
import { cn } from "../../lib/utils"

export interface LargeButtonProps extends ButtonProps {
  children: React.ReactNode
}

const LargeButton = React.forwardRef<HTMLButtonElement, LargeButtonProps>(
  ({ className, children, size, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        size="lg"
        className={cn(
          // Taille minimale pour l'accessibilité (44x44px)
          "min-h-[44px] min-w-[44px] px-6 py-4",
          // Texte plus large pour la lisibilité
          "text-lg font-semibold",
          // Espacement des lettres pour une meilleure lisibilité
          "tracking-wide",
          // Focus très visible
          "focus-visible:ring-4 focus-visible:ring-offset-4",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    )
  }
)
LargeButton.displayName = "LargeButton"

export { LargeButton }