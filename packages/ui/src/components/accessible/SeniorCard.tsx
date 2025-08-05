import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { cn } from "../../lib/utils"

export interface SeniorCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  children: React.ReactNode
}

const SeniorCard = React.forwardRef<HTMLDivElement, SeniorCardProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        className={cn(
          // Taille et espacement plus généreux
          "p-2",
          // Bordures plus visibles
          "border-2",
          // Ombres plus marquées pour la profondeur
          "shadow-lg",
          // Focus très visible
          "focus-within:ring-4 focus-within:ring-offset-4 focus-within:ring-primary",
          className
        )}
        {...props}
      >
        <CardHeader className="pb-4">
          <CardTitle className={cn(
            // Texte plus grand
            "text-2xl font-bold",
            // Espacement des lettres
            "tracking-wide"
          )}>
            {title}
          </CardTitle>
          {description && (
            <CardDescription className={cn(
              // Texte plus lisible
              "text-base text-foreground/80",
              // Hauteur de ligne plus généreuse
              "leading-relaxed"
            )}>
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className={cn(
          // Espacement généreux
          "pt-0 space-y-4",
          // Texte plus lisible
          "text-base leading-relaxed"
        )}>
          {children}
        </CardContent>
      </Card>
    )
  }
)
SeniorCard.displayName = "SeniorCard"

export { SeniorCard }