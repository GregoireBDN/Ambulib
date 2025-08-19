import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        senior: "p-2 border-2 shadow-lg focus-within:ring-4 focus-within:ring-offset-4 focus-within:ring-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  senior?: boolean
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, senior, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        senior && "font-bold tracking-wide",
        className
      )}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  senior?: boolean
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, senior, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-muted-foreground",
        senior && "text-base text-foreground/80 leading-relaxed",
        className
      )}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  senior?: boolean
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, senior, ...props }, ref) => (
    <div 
      ref={ref} 
      className={cn(
        "p-6 pt-0",
        senior && "pt-0 space-y-4 text-base leading-relaxed",
        className
      )} 
      {...props} 
    />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants, type CardProps }