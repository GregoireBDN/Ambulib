"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface SkipNavigationProps {
  targets?: Array<{
    href: string
    label: string
  }>
  className?: string
}

const SkipNavigation = React.forwardRef<HTMLDivElement, SkipNavigationProps>(
  ({ targets, className }, ref) => {
    const defaultTargets = [
      { href: "#main-content", label: "Aller au contenu principal" },
      { href: "#navigation", label: "Aller à la navigation" },
      { href: "#footer", label: "Aller au pied de page" }
    ]

    const skipTargets = targets || defaultTargets

    return (
      <div
        ref={ref}
        className={cn(
          // Positionnement hors écran par défaut
          "absolute -top-40 left-0 z-50",
          // Apparition visible lors du focus
          "focus-within:top-0",
          className
        )}
      >
        <nav aria-label="Liens d'évitement">
          <ul className="flex gap-2 p-4 bg-background border border-border rounded-b-lg shadow-lg">
            {skipTargets.map((target, index) => (
              <li key={index}>
                <a
                  href={target.href}
                  className={cn(
                    // Style de bouton accessible
                    "inline-flex items-center px-4 py-2 text-sm font-medium rounded-md",
                    // Couleurs contrastées
                    "bg-primary text-primary-foreground",
                    "hover:bg-primary/90",
                    // Focus ultra-visible
                    "focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-4",
                    // Taille tactile minimum
                    "min-h-[44px] min-w-[44px]",
                    // Transition fluide
                    "transition-colors duration-200"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    const targetElement = document.querySelector(target.href)
                    if (targetElement) {
                      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      // Focus sur l'élément cible s'il est focusable
                      if (targetElement instanceof HTMLElement) {
                        targetElement.focus()
                      }
                    }
                  }}
                >
                  {target.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    )
  }
)
SkipNavigation.displayName = "SkipNavigation"

export { SkipNavigation }