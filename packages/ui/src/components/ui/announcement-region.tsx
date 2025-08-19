"use client"

import * as React from "react"
import { cn } from "../../lib/utils"

export interface AnnouncementRegionProps {
  /** Content to announce to screen readers */
  children: React.ReactNode
  /** Politeness level for screen reader announcements */
  priority?: 'polite' | 'assertive'
  /** Visual styling for different announcement types */
  variant?: 'info' | 'success' | 'warning' | 'error' | 'emergency'
  /** Whether to show visual indicator alongside screen reader announcement */
  visuallyHidden?: boolean
  /** Auto-clear announcement after specified milliseconds */
  autoClear?: number
  /** Callback when announcement is cleared */
  onClear?: () => void
  className?: string
}

const AnnouncementRegion = React.forwardRef<HTMLDivElement, AnnouncementRegionProps>(
  ({ 
    children,
    priority = 'polite',
    variant = 'info',
    visuallyHidden = false,
    autoClear,
    onClear,
    className
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(Boolean(children))
    const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

    // Auto-clear functionality
    React.useEffect(() => {
      if (autoClear && children && isVisible) {
        timeoutRef.current = setTimeout(() => {
          setIsVisible(false)
          onClear?.()
        }, autoClear)
      }

      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
      }
    }, [children, isVisible, autoClear, onClear])

    // Update visibility when children change
    React.useEffect(() => {
      setIsVisible(Boolean(children))
    }, [children])

    // Visual styling based on variant
    const getVariantStyles = () => {
      switch (variant) {
        case 'emergency':
          return "bg-destructive/10 border-destructive/20 text-destructive"
        case 'error':
          return "bg-destructive/10 border-destructive/20 text-destructive"
        case 'warning':
          return "bg-yellow-500/10 border-yellow-500/20 text-yellow-800"
        case 'success':
          return "bg-primary/10 border-primary/20 text-primary"
        case 'info':
        default:
          return "bg-primary/10 border-primary/20 text-primary"
      }
    }

    // Icon for visual variant
    const getVariantIcon = () => {
      switch (variant) {
        case 'emergency':
          return (
            <svg 
              className="w-6 h-6 text-destructive flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          )
        case 'error':
          return (
            <svg 
              className="w-6 h-6 text-destructive flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          )
        case 'warning':
          return (
            <svg 
              className="w-6 h-6 text-yellow-600 flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833.192 2.5 1.732 2.5z" 
              />
            </svg>
          )
        case 'success':
          return (
            <svg 
              className="w-6 h-6 text-primary flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          )
        case 'info':
        default:
          return (
            <svg 
              className="w-6 h-6 text-primary flex-shrink-0" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
          )
      }
    }

    if (!isVisible || !children) {
      return null
    }

    return (
      <div
        ref={ref}
        role="status"
        aria-live={priority}
        aria-atomic="true"
        className={cn(
          // Base styling for announcements
          visuallyHidden ? "sr-only" : "rounded-lg border-2 p-4 mb-4",
          // Visual variant styling (only if not visually hidden)
          !visuallyHidden && getVariantStyles(),
          // Animation for smooth appearance
          !visuallyHidden && "animate-in slide-in-from-top-2 duration-300",
          className
        )}
      >
        {visuallyHidden ? (
          // Screen reader only content
          children
        ) : (
          // Visual content with icon and text
          <div className="flex items-start gap-3">
            {getVariantIcon()}
            <div className="flex-1">
              <div className={cn(
                "text-base font-medium leading-relaxed",
                // Larger text for seniors
                variant === 'emergency' && "text-lg font-bold"
              )}>
                {children}
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
)
AnnouncementRegion.displayName = "AnnouncementRegion"

/**
 * Hook for managing announcement state and automatic clearing
 */
export const useAnnouncement = (_autoClearDelay = 5000) => {
  const [announcement, setAnnouncement] = React.useState<{
    message: React.ReactNode
    variant?: AnnouncementRegionProps['variant']
    priority?: AnnouncementRegionProps['priority']
  } | null>(null)

  const announce = React.useCallback((
    message: React.ReactNode,
    variant: AnnouncementRegionProps['variant'] = 'info',
    priority: AnnouncementRegionProps['priority'] = 'polite'
  ) => {
    setAnnouncement({ message, variant, priority })
  }, [])

  const clear = React.useCallback(() => {
    setAnnouncement(null)
  }, [])

  // Emergency announcement shortcut
  const announceEmergency = React.useCallback((message: React.ReactNode) => {
    announce(message, 'emergency', 'assertive')
  }, [announce])

  // Success announcement shortcut
  const announceSuccess = React.useCallback((message: React.ReactNode) => {
    announce(message, 'success', 'polite')
  }, [announce])

  // Error announcement shortcut
  const announceError = React.useCallback((message: React.ReactNode) => {
    announce(message, 'error', 'assertive')
  }, [announce])

  return {
    announcement,
    announce,
    announceEmergency,
    announceSuccess, 
    announceError,
    clear
  }
}

export { AnnouncementRegion }