"use client"

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { cn } from "../../lib/utils"

export interface ProfileField {
  id: string
  label: string
  required: boolean
  completed: boolean
  category?: "personal" | "medical" | "emergency" | "preferences"
}

export interface ProgressProfileProps {
  title?: string
  completion: number // 0-100
  totalFields?: number
  completedFields?: number
  missingFields?: string[]
  profileFields?: ProfileField[]
  showFields?: boolean
  showActions?: boolean
  className?: string
  onComplete?: () => void
  onViewProfile?: () => void
  onEditField?: (fieldId: string) => void
}

const getCompletionStatus = (completion: number) => {
  if (completion === 100) {
    return {
      status: "complete",
      message: "Profil complet",
      icon: "✅",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    }
  }
  
  if (completion >= 80) {
    return {
      status: "almost-complete",
      message: "Profil presque complet",
      icon: "⚠️",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200"
    }
  }
  
  if (completion >= 50) {
    return {
      status: "in-progress",
      message: "Profil à compléter",
      icon: "📝",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    }
  }
  
  return {
    status: "incomplete",
    message: "Profil incomplet",
    icon: "❌",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200"
  }
}

const getProgressColor = (completion: number) => {
  if (completion >= 80) return "[&>div]:bg-green-500"
  if (completion >= 50) return "[&>div]:bg-amber-500"
  return "[&>div]:bg-red-500"
}

const getCategoryIcon = (category: ProfileField["category"]) => {
  switch (category) {
    case "personal":
      return "👤"
    case "medical":
      return "🏥"
    case "emergency":
      return "🚨"
    case "preferences":
      return "⚙️"
    default:
      return "📝"
  }
}

const getCategoryLabel = (category: ProfileField["category"]) => {
  switch (category) {
    case "personal":
      return "Informations personnelles"
    case "medical":
      return "Informations médicales"
    case "emergency":
      return "Contacts d'urgence"
    case "preferences":
      return "Préférences"
    default:
      return "Autres"
  }
}

export function ProgressProfile({
  title = "Mon profil médical",
  completion,
  totalFields,
  completedFields,
  missingFields = [],
  profileFields = [],
  showFields = true,
  showActions = true,
  className,
  onComplete,
  onViewProfile,
  onEditField
}: ProgressProfileProps) {
  const status = getCompletionStatus(completion)

  // Group fields by category
  const fieldsByCategory = React.useMemo(() => {
    return profileFields.reduce((acc, field) => {
      const category = field.category || "other"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(field)
      return acc
    }, {} as Record<string, ProfileField[]>)
  }, [profileFields])

  return (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      status.bgColor,
      status.borderColor,
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <span className="text-lg" aria-hidden="true">👤</span>
            {title}
          </CardTitle>
          <Badge variant="outline" className={cn(status.color, status.bgColor)}>
            <span className="mr-1" aria-hidden="true">{status.icon}</span>
            {completion}%
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">{status.message}</span>
            <span className="text-muted-foreground">
              {completedFields !== undefined && totalFields !== undefined
                ? `${completedFields}/${totalFields}`
                : `${completion}/100`
              }
            </span>
          </div>
          
          <Progress 
            value={completion} 
            className={cn(
              "w-full h-2",
              "[&>div]:transition-all [&>div]:duration-300",
              getProgressColor(completion)
            )}
            aria-label={`Completion du profil: ${completion}%`}
          />
        </div>

        {/* Missing Fields */}
        {showFields && missingFields.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-muted-foreground">
              Informations manquantes :
            </h4>
            <div className="space-y-1">
              {missingFields.map((field, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <span className="text-amber-500" aria-hidden="true">•</span>
                  <span className="text-muted-foreground">{field}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Fields by Category */}
        {showFields && profileFields.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-muted-foreground">
              Détail des champs :
            </h4>
            {Object.entries(fieldsByCategory).map(([category, fields]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  <span aria-hidden="true">{getCategoryIcon(category as ProfileField["category"])}</span>
                  {getCategoryLabel(category as ProfileField["category"])}
                </div>
                <div className="pl-4 space-y-1">
                  {fields.map((field) => (
                    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                    <div 
                      key={field.id}
                      role={onEditField ? "button" : undefined}
                      tabIndex={onEditField ? 0 : undefined}
                      className={cn(
                        "flex items-center justify-between text-sm py-1",
                        onEditField && "cursor-pointer hover:bg-white/50 hover:rounded px-2 -mx-2"
                      )}
                      onClick={() => onEditField?.(field.id)}
                      onKeyDown={(e) => {
                        if (onEditField && (e.key === 'Enter' || e.key === ' ')) {
                          e.preventDefault()
                          onEditField(field.id)
                        }
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span 
                          className={field.completed ? "text-green-500" : "text-red-500"} 
                          aria-hidden="true"
                        >
                          {field.completed ? "✓" : "○"}
                        </span>
                        <span className={cn(
                          field.required && !field.completed && "font-medium",
                          !field.completed && "text-muted-foreground"
                        )}>
                          {field.label}
                          {field.required && !field.completed && " *"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2 pt-2">
            {onViewProfile && (
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={onViewProfile}
              >
                Voir le profil
              </Button>
            )}
            
            {completion < 100 && onComplete && (
              <Button
                size="sm"
                className="flex-1"
                onClick={onComplete}
              >
                Compléter
              </Button>
            )}
          </div>
        )}

        {/* Help Text */}
        {completion < 100 && (
          <div className="pt-2 text-xs text-muted-foreground">
            <p>
              Un profil médical complet nous permet de mieux répondre à vos besoins
              et d'assurer des trajets en ambulance optimaux.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}