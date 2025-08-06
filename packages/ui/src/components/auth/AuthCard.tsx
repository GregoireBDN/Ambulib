import * as React from "react"
import { cn } from "../../lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

interface AuthCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  children: React.ReactNode
  showLogo?: boolean
  className?: string
}

const AuthCard = React.forwardRef<HTMLDivElement, AuthCardProps>(
  ({ title, description, children, showLogo = true, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("w-full max-w-md mx-auto", className)}
        {...props}
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="space-y-4 text-center">
            {showLogo && (
              <div className="flex justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">A</span>
                </div>
              </div>
            )}
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold tracking-tight">
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="text-base leading-relaxed">
                  {description}
                </CardDescription>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {children}
          </CardContent>
        </Card>
        
        {/* Information d'accessibilité */}
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Utilisez Tab pour naviguer, Entrée pour valider
          </p>
        </div>
      </div>
    )
  }
)

AuthCard.displayName = "AuthCard"

export { AuthCard }
export type { AuthCardProps }