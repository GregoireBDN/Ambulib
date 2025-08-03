"use client"

import * as React from "react"
import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface AreaChartProps {
  data: Array<Record<string, any>>
  xAxisKey: string
  areas: Array<{
    key: string
    color?: string
    name?: string
    stackId?: string
  }>
  showGrid?: boolean
  showLegend?: boolean
  height?: number
  stacked?: boolean
}

const colors = [
  "#3b82f6", // blue-500
  "#10b981", // emerald-500  
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#06b6d4", // cyan-500
  "#f97316", // orange-500
  "#84cc16", // lime-500
]

const AreaChart = React.forwardRef<HTMLDivElement, AreaChartProps>(
  ({ 
    data, 
    xAxisKey, 
    areas, 
    showGrid = true, 
    showLegend = true,
    height = 300,
    stacked = false
  }, ref) => {
    return (
      <div ref={ref} style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsAreaChart data={data}>
            {showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis 
              dataKey={xAxisKey}
              className="text-xs"
            />
            <YAxis className="text-xs" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                fontSize: '12px'
              }}
            />
            {showLegend && <Legend />}
            {areas.map((area, index) => (
              <Area
                key={area.key}
                type="monotone"
                dataKey={area.key}
                stackId={stacked ? (area.stackId || "1") : undefined}
                stroke={area.color || colors[index % colors.length]}
                fill={area.color || colors[index % colors.length]}
                fillOpacity={0.6}
                name={area.name || area.key}
              />
            ))}
          </RechartsAreaChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
AreaChart.displayName = "AreaChart"

export { AreaChart }