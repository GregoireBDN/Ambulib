"use client"

import * as React from "react"
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts"

interface LineChartProps {
  data: Array<Record<string, any>>
  xAxisKey: string
  lines: Array<{
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

const LineChart = React.forwardRef<HTMLDivElement, LineChartProps>(
  ({ 
    data, 
    xAxisKey, 
    lines, 
    showGrid = true, 
    showLegend = true,
    height = 300 
  }, ref) => {
    return (
      <div ref={ref} style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsLineChart data={data}>
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
            {lines.map((line, index) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color || colors[index % colors.length]}
                strokeWidth={2}
                name={line.name || line.key}
                dot={{ strokeWidth: 2, r: 4 }}
              />
            ))}
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    )
  }
)
LineChart.displayName = "LineChart"

export { LineChart }