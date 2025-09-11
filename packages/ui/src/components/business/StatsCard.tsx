"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Ambulance,
  Hospital,
  Clock,
  Users,
  Euro,
  Activity,
  MapPin,
  AlertTriangle
} from "lucide-react"

export type StatStatus = "normal" | "success" | "warning" | "critical" | "info"
export type StatValueType = "number" | "currency" | "percentage" | "duration" | "distance"
export type StatTrendDirection = "up" | "down" | "stable"
export type MedicalIconType = "ambulance" | "hospital" | "clock" | "users" | "euro" | "activity" | "map" | "alert"

export interface StatTrend {
  direction: StatTrendDirection
  value?: string
  period?: string
}

export interface StatThreshold {
  warning: number
  critical: number
}

export interface StatAction {
  label: string
  onClick: () => void
}

export interface StatData {
  title: string
  value: string | number
  valueType?: StatValueType
  status?: StatStatus
  trend?: StatTrend
  icon?: MedicalIconType | React.ReactNode
  contextualInfo?: string
  description?: string
  action?: StatAction
  threshold?: StatThreshold
}

export interface StatsCardProps {
  stat: StatData
  loading?: boolean
  className?: string
  onClick?: () => void
}

const medicalIcons = {
  ambulance: Ambulance,
  hospital: Hospital,
  clock: Clock,
  users: Users,
  euro: Euro,
  activity: Activity,
  map: MapPin,
  alert: AlertTriangle
} as const

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus
} as const

const formatValue = (value: string | number, valueType?: StatValueType): string => {
  if (typeof value === 'string') return value
  
  switch (valueType) {
    case 'currency':
      return new Intl.NumberFormat('fr-FR', { 
        style: 'currency', 
        currency: 'EUR',
        maximumFractionDigits: 0
      }).format(value)
    case 'percentage':
      return `${value}%`
    case 'duration':
      return `${value} min`
    case 'distance':
      return `${value} km`
    case 'number':
      return new Intl.NumberFormat('fr-FR').format(value)
    default:
      return value.toString()
  }
}

const getStatusStyles = (status: StatStatus) => {
  switch (status) {
    case "success":
      return "bg-success-50 border-success-500/20 text-success-700 hover:bg-success-100"
    case "warning":
      return "bg-warning-50 border-warning-600/20 text-warning-700 hover:bg-warning-100"
    case "critical":
      return "bg-error-50 border-error-500/20 text-error-700 hover:bg-error-100"
    case "info":
      return "bg-primary-50 border-primary-500/20 text-primary-700 hover:bg-primary-100"
    case "normal":
    default:
      return "bg-card border-border text-card-foreground hover:bg-accent/50"
  }
}

const getTrendColor = (direction: StatTrendDirection) => {
  switch (direction) {
    case "up":
      return "text-success-600"
    case "down":
      return "text-error-600"
    case "stable":
    default:
      return "text-muted-foreground"
  }
}

const getStatusFromThreshold = (value: number, threshold?: StatThreshold): StatStatus => {
  if (!threshold) return "normal"
  
  if (value >= threshold.critical) return "critical"
  if (value >= threshold.warning) return "warning"
  return "success"
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
    valueType,
    status,
    trend,
    icon,
    contextualInfo,
    description,
    action,
    threshold
  } = stat

  // Determine status from threshold if provided
  const finalStatus = React.useMemo(() => {
    if (status) return status
    if (threshold && typeof value === 'number') {
      return getStatusFromThreshold(value, threshold)
    }
    return "normal"
  }, [status, value, threshold])

  // Format the display value
  const displayValue = formatValue(value, valueType)

  // Render icon
  const renderIcon = () => {
    if (!icon) return null
    
    if (React.isValidElement(icon)) {
      return icon
    }
    
    if (typeof icon === 'string' && icon in medicalIcons) {
      const IconComponent = medicalIcons[icon as MedicalIconType]
      return <IconComponent className="h-4 w-4" />
    }
    
    return null
  }

  // Render trend indicator
  const renderTrend = () => {
    if (!trend) return null
    
    const TrendIcon = trendIcons[trend.direction]
    
    return (
      <Badge 
        variant="outline" 
        className={cn(
          "text-xs font-medium gap-1",
          getTrendColor(trend.direction)
        )}
      >
        <TrendIcon className="h-3 w-3" aria-hidden="true" />
        {trend.value && <span>{trend.value}</span>}
        {trend.period && (
          <span className="text-muted-foreground">{trend.period}</span>
        )}
        <span className="sr-only">
          Tendance {trend.direction === 'up' ? 'à la hausse' : 
                   trend.direction === 'down' ? 'à la baisse' : 'stable'}
        </span>
      </Badge>
    )
  }

  if (loading) {
    return (
      <Card className={cn("transition-all duration-200", className)}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="h-4 bg-muted rounded w-24 animate-pulse" />
            <div className="h-4 w-4 bg-muted rounded animate-pulse" />
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="h-8 bg-muted rounded w-20 animate-pulse" />
          <div className="flex items-center gap-2">
            <div className="h-5 bg-muted rounded w-16 animate-pulse" />
            <div className="h-4 bg-muted rounded w-12 animate-pulse" />
          </div>
          <div className="h-3 bg-muted rounded w-28 animate-pulse" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card 
      className={cn(
        "transition-all duration-200 hover:shadow-md",
        getStatusStyles(finalStatus),
        onClick && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground truncate">
            {title}
          </CardTitle>
          {renderIcon()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Main value display */}
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-2xl font-bold tracking-tight">
            {displayValue}
          </span>
          {renderTrend()}
        </div>
        
        {/* Contextual information */}
        {contextualInfo && (
          <p className="text-sm text-muted-foreground">
            {contextualInfo}
          </p>
        )}
        
        {/* Description */}
        {description && (
          <p className="text-xs text-muted-foreground">
            {description}
          </p>
        )}

        {/* Action button */}
        {action && (
          <div className="pt-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                action.onClick()
              }}
              className="h-7 px-2 text-xs"
            >
              {action.label}
            </Button>
          </div>
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
        return "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
    }
  }

  return (
    <div className={cn(
      "grid gap-4 md:gap-6",
      getGridClass(),
      className
    )}>
      {loading ? (
        Array.from({ length: columns }).map((_, index) => (
          <StatsCard 
            key={`loading-${index}`}
            stat={{ title: "", value: "" }}
            loading={true}
          />
        ))
      ) : (
        stats.map((stat, index) => (
          <StatsCard
            key={`${stat.title}-${index}`}
            stat={stat}
            onClick={onStatClick ? () => onStatClick(stat, index) : undefined}
          />
        ))
      )}
    </div>
  )
}