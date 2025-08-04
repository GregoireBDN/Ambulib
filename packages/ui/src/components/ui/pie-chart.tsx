"use client"

import * as React from "react"
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts"

interface PieChartProps {
  data: Array<{
    name: string
    value: number
    color?: string
  }>
  showLegend?: boolean
  showLabels?: boolean
  height?: number
  innerRadius?: number
  outerRadius?: number
}

const defaultColors = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500  
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#06b6d4", // cyan-500
  "#f97316", // orange-500
  "#84cc16", // lime-500
]

const PieChart = React.forwardRef<HTMLDivElement, PieChartProps>(
  ({ 
    data, 
    showLegend = true, 
    showLabels = true,
    height = 300,
    innerRadius = 0,
    outerRadius = 80
  }, ref) => {
    const renderLabel = (entry: any) => {
      if (!showLabels) return null
      return `${entry.name}: ${entry.value}`
    }

    return (
      <div ref={ref} style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderLabel}
              outerRadius={outerRadius}
              innerRadius={innerRadius}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color || defaultColors[index % defaultColors.length]} 
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            {showLegend && <Legend />}
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
PieChart.displayName = "PieChart"

export { PieChart }