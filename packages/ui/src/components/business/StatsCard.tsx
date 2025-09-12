"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { cn } from "../../lib/utils"

export type StatTrend = "up" | "down" | "neutral"
export type StatVariant = "default" | "success" | "warning" | "destructive"

export interface StatData {
  title: string
  value: string | number
  subtitle?: string
  trend?: StatTrend
  variant?: StatVariant
  icon?: string
  change?: string
  description?: string
}

export interface StatsCardProps {
  stat: StatData
  loading?: boolean
  className?: string
  onClick?: () => void
}

const getTrendIcon = (trend: StatTrend) => {
  switch (trend) {
    case "up":
      return "↗️"
    case "down":
      return "↘️"
    case "neutral":
    default:
      return "→"
  }
}

const getVariantStyles = (variant: StatVariant) => {
  switch (variant) {
    case "success":
      return "border-green-200 bg-green-50 hover:bg-green-100"
    case "warning":
      return "border-amber-200 bg-amber-50 hover:bg-amber-100"
    case "destructive":
      return "border-red-200 bg-red-50 hover:bg-red-100"
    case "default":
    default:
      return "border-border bg-card hover:bg-accent/50"
  }
}

const getTrendColor = (trend: StatTrend, variant: StatVariant) => {
  if (variant === "destructive") return "text-red-600"
  if (variant === "warning") return "text-amber-600"
  if (variant === "success") return "text-green-600"
  
  switch (trend) {
    case "up":
      return "text-green-600"
    case "down":
      return "text-red-600"
    case "neutral":
    default:
      return "text-muted-foreground"
  }
}

export function StatsCard({ 
  stat, 
  loading = false, 
  className,
  onClick 
}: StatsCardProps) {
  const {
    title,
    value,
    subtitle,
    trend = "neutral",
    variant = "default",
    icon,
    change,
    description
  } = stat

  if (loading) {
    return (
      <Card className={cn("transition-all duration-200", className)}>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            {icon && <div className="h-6 w-6 bg-muted rounded animate-pulse" />}
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="h-8 bg-muted rounded w-16 animate-pulse" />
          <div className="h-4 bg-muted rounded w-32 animate-pulse" />
          {change && <div className="h-3 bg-muted rounded w-20 animate-pulse" />}
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        getVariantStyles(variant),
        onClick && "cursor-pointer hover:scale-105 active:scale-95",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {icon && (
            <span className="text-lg" aria-hidden="true">
              {icon}
            </span>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight">
            {value}
          </span>
          {change && (
            <Badge 
              variant="outline" 
              className={cn(
                "text-xs font-medium",
                getTrendColor(trend, variant)
              )}
            >
              <span className="mr-1" aria-hidden="true">
                {getTrendIcon(trend)}
              </span>
              {change}
            </Badge>
          )}
        </div>
        
        {subtitle && (
          <p className={cn(
            "text-sm",
            getTrendColor(trend, variant)
          )}>
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export interface StatsGridProps {
  stats: StatData[]
  loading?: boolean
  columns?: 1 | 2 | 3 | 4
  className?: string
  onStatClick?: (stat: StatData, index: number) => void
}

export function StatsGrid({ 
  stats, 
  loading = false, 
  columns = 4,
  className,
  onStatClick 
}: StatsGridProps) {
  const getGridClass = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 md:grid-cols-2"
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    }
  }

  return (
    <div className={cn(
      "grid gap-4",
      getGridClass(),
      className
    )}>
      {loading ? (
        Array.from({ length: columns }).map((_, index) => (
          <StatsCard 
            key={index}
            stat={{ title: "", value: "" }}
            loading={true}
          />
        ))
      ) : (
        stats.map((stat, index) => (
          <StatsCard
            key={`${stat.title}-${index}`}
            stat={stat}
            onClick={() => onStatClick?.(stat, index)}
          />
        ))
      )}
    </div>
  )
}