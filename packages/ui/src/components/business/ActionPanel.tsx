"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { cn } from "../../lib/utils"

export type ActionVariant = "default" | "primary" | "secondary" | "outline" | "destructive" | "emergency"
export type ActionSize = "sm" | "md" | "lg"

export interface ActionItem {
  id: string
  label: string
  description?: string
  icon?: string
  variant?: ActionVariant
  size?: ActionSize
  badge?: string
  disabled?: boolean
  loading?: boolean
  href?: string
  onClick?: () => void | Promise<void>
}

export interface ActionGroup {
  title?: string
  description?: string
  actions: ActionItem[]
}

export interface ActionPanelProps {
  title?: string
  description?: string
  actions?: ActionItem[]
  groups?: ActionGroup[]
  layout?: "grid" | "list" | "compact"
  columns?: 1 | 2 | 3 | 4
  showIcons?: boolean
  showDescriptions?: boolean
  className?: string
  onActionClick?: (action: ActionItem) => void
}

const getActionVariantClass = (variant: ActionVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary text-primary-foreground hover:bg-primary/90"
    case "secondary":
      return "bg-secondary text-secondary-foreground hover:bg-secondary/80"
    case "outline":
      return "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
    case "destructive":
      return "bg-destructive text-destructive-foreground hover:bg-destructive/90"
    case "emergency":
      return "bg-red-600 text-white hover:bg-red-700 shadow-lg animate-pulse"
    case "default":
    default:
      return "bg-primary text-primary-foreground hover:bg-primary/90"
  }
}

const getActionSizeClass = (size: ActionSize, layout: ActionPanelProps["layout"]) => {
  if (layout === "compact") {
    return "h-8 px-3 text-xs"
  }
  
  switch (size) {
    case "sm":
      return "h-8 px-3 text-sm"
    case "lg":
      return "h-12 px-6 text-base"
    case "md":
    default:
      return "h-10 px-4 text-sm"
  }
}

const getGridClass = (columns: number, layout: ActionPanelProps["layout"]) => {
  if (layout === "list") {
    return "grid-cols-1 gap-2"
  }
  
  if (layout === "compact") {
    return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2"
  }
  
  switch (columns) {
    case 1:
      return "grid-cols-1 gap-4"
    case 2:
      return "grid-cols-1 md:grid-cols-2 gap-4"
    case 3:
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    case 4:
    default:
      return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  }
}

function ActionButton({ 
  action, 
  layout, 
  showIcons = true, 
  showDescriptions = true,
  onClick 
}: { 
  action: ActionItem
  layout: ActionPanelProps["layout"]
  showIcons?: boolean
  showDescriptions?: boolean
  onClick?: () => void
}) {
  const handleClick = async () => {
    onClick?.()
    
    if (action.href) {
      window.location.href = action.href
      return
    }
    
    if (action.onClick) {
      await action.onClick()
    }
  }

  if (layout === "compact") {
    return (
      <Button
        size="sm"
        variant={action.variant === "emergency" ? "destructive" : "outline"}
        disabled={action.disabled || action.loading}
        onClick={handleClick}
        className={cn(
          "h-auto p-2 text-xs flex flex-col items-center gap-1",
          action.variant === "emergency" && "bg-red-600 text-white hover:bg-red-700 animate-pulse",
          action.disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {showIcons && action.icon && (
          <span className="text-sm" aria-hidden="true">{action.icon}</span>
        )}
        <span className="leading-tight text-center">{action.label}</span>
        {action.badge && (
          <Badge variant="secondary" className="text-xs px-1">
            {action.badge}
          </Badge>
        )}
      </Button>
    )
  }

  if (layout === "list") {
    return (
      <Button
        variant={action.variant === "emergency" ? "destructive" : "outline"}
        disabled={action.disabled || action.loading}
        onClick={handleClick}
        className={cn(
          "h-auto p-4 flex items-center justify-start gap-3 text-left",
          action.variant === "emergency" && "bg-red-600 text-white hover:bg-red-700 animate-pulse border-red-600",
          action.disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <div className="flex items-center gap-3 flex-1">
          {showIcons && action.icon && (
            <span className="text-xl shrink-0" aria-hidden="true">{action.icon}</span>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-medium">{action.label}</span>
              {action.badge && (
                <Badge variant="secondary" className="text-xs">
                  {action.badge}
                </Badge>
              )}
            </div>
            {showDescriptions && action.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {action.description}
              </p>
            )}
          </div>
        </div>
        {action.loading && (
          <div className="h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
        )}
      </Button>
    )
  }

  // Default grid layout
  return (
    <Button
      variant={action.variant === "emergency" ? "destructive" : action.variant || "outline"}
      size="lg"
      disabled={action.disabled || action.loading}
      onClick={handleClick}
      className={cn(
        "h-auto p-4 flex flex-col items-center gap-2 text-center",
        action.variant === "emergency" && "bg-red-600 text-white hover:bg-red-700 shadow-lg animate-pulse",
        action.disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      {showIcons && action.icon && (
        <span className="text-2xl" aria-hidden="true">{action.icon}</span>
      )}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm leading-tight">{action.label}</span>
          {action.badge && (
            <Badge variant="secondary" className="text-xs">
              {action.badge}
            </Badge>
          )}
        </div>
        {showDescriptions && action.description && (
          <p className="text-xs opacity-80 leading-tight">
            {action.description}
          </p>
        )}
      </div>
      {action.loading && (
        <div className="h-4 w-4 animate-spin border-2 border-current border-t-transparent rounded-full" />
      )}
    </Button>
  )
}

export function ActionPanel({
  title = "Actions rapides",
  description,
  actions = [],
  groups = [],
  layout = "grid",
  columns = 4,
  showIcons = true,
  showDescriptions = true,
  className,
  onActionClick
}: ActionPanelProps) {
  const handleActionClick = (action: ActionItem) => {
    onActionClick?.(action)
  }

  // If we have both actions and groups, combine them
  const allGroups: ActionGroup[] = React.useMemo(() => {
    const result: ActionGroup[] = []
    
    // Add direct actions as a default group
    if (actions.length > 0) {
      result.push({
        title: title,
        actions: actions
      })
    }
    
    // Add defined groups
    result.push(...groups)
    
    return result
  }, [actions, groups, title])

  if (allGroups.length === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center text-muted-foreground">
          <p>Aucune action disponible</p>
        </CardContent>
      </Card>
    )
  }

  // Single group - no need for group headers
  if (allGroups.length === 1 && !description) {
    const group = allGroups[0]
    return (
      <Card className={className}>
        {(title !== "Actions rapides" || group.title !== title) && (
          <CardHeader>
            <CardTitle>{group.title || title}</CardTitle>
            {group.description && (
              <p className="text-sm text-muted-foreground">{group.description}</p>
            )}
          </CardHeader>
        )}
        <CardContent>
          <div className={cn(
            "grid",
            getGridClass(columns, layout)
          )}>
            {group.actions.map((action) => (
              <ActionButton
                key={action.id}
                action={action}
                layout={layout}
                showIcons={showIcons}
                showDescriptions={showDescriptions}
                onClick={() => handleActionClick(action)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  // Multiple groups
  return (
    <div className={cn("space-y-6", className)}>
      {description && (
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      )}
      
      {allGroups.map((group, index) => (
        <Card key={index}>
          {group.title && (
            <CardHeader>
              <CardTitle>{group.title}</CardTitle>
              {group.description && (
                <p className="text-sm text-muted-foreground">{group.description}</p>
              )}
            </CardHeader>
          )}
          <CardContent>
            <div className={cn(
              "grid",
              getGridClass(columns, layout)
            )}>
              {group.actions.map((action) => (
                <ActionButton
                  key={action.id}
                  action={action}
                  layout={layout}
                  showIcons={showIcons}
                  showDescriptions={showDescriptions}
                  onClick={() => handleActionClick(action)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}