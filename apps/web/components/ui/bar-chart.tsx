"use client"

import * as React from "react"
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface BarChartProps {
  data: Array<Record<string, any>>
  xAxisKey: string
  bars: Array<{
    key: string
    color?: string
    name?: string
  }>
  showGrid?: boolean
  showLegend?: boolean
  height?: number
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

const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>(
  ({ 
    data, 
    xAxisKey, 
    bars, 
    showGrid = true, 
    showLegend = true,
    height = 300 
  }, ref) => {
    return (
      <div ref={ref} style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsBarChart data={data}>
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
            {bars.map((bar, index) => (
              <Bar
                key={bar.key}
                dataKey={bar.key}
                fill={bar.color || colors[index % colors.length]}
                name={bar.name || bar.key}
                radius={[2, 2, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
BarChart.displayName = "BarChart"

export { BarChart }