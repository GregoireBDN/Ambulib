"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  title?: string
  description?: string
}

const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  ({ className, children, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full p-4 bg-white rounded-lg border border-gray-200 shadow-sm",
          className
        )}
        {...props}
      >
        {(title || description) && (
          <div className="mb-4">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
        )}
        <div className="h-80 w-full">
          {children}
        </div>
      </div>
    )
  }
)
ChartContainer.displayName = "ChartContainer"

export { ChartContainer }