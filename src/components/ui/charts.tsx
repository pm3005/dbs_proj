import * as React from "react";
import {
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  Area,
  Bar,
  Line,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { ChartContainer, ChartTooltipContent } from "./chart";

interface ChartProps {
  data: any[];
  index: string;
  categories?: string[];
  colors?: string[];
  valueFormatter?: (value: number) => string;
  yAxisWidth?: number;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showLegend?: boolean;
  showGridLines?: boolean;
  showTooltip?: boolean;
  className?: string;
  height?: number | string;
}

interface PieChartProps {
  data: any[];
  index: string;
  category: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  className?: string;
  height?: number | string;
}

// Default theme colors
const defaultColors = ["#00A896", "#D4E157", "#00c2ad", "#dfe776", "#008e7f", "#c9d830"];

// Bar Chart Component
export function BarChart({
  data,
  index,
  categories = [],
  colors = defaultColors,
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 56,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  className,
  height = 300,
}: ChartProps) {
  // Create config for chart container
  const config = categories.reduce((acc, category, i) => {
    acc[category] = {
      label: category,
      color: colors[i % colors.length]
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={config} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsBarChart data={data}>
          {showGridLines && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />}
          {showXAxis && <XAxis dataKey={index} stroke="#888888" />}
          {showYAxis && <YAxis width={yAxisWidth} stroke="#888888" />}
          {showTooltip && <Tooltip content={<ChartTooltipContent />} />}
          {showLegend && <Legend />}
          
          {categories.map((category, i) => (
            <Bar 
              key={category} 
              dataKey={category} 
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// Line Chart Component
export function LineChart({
  data,
  index,
  categories = [],
  colors = defaultColors,
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 56,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  className,
  height = 300,
}: ChartProps) {
  const config = categories.reduce((acc, category, i) => {
    acc[category] = {
      label: category,
      color: colors[i % colors.length]
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={config} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsLineChart data={data}>
          {showGridLines && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />}
          {showXAxis && <XAxis dataKey={index} stroke="#888888" />}
          {showYAxis && <YAxis width={yAxisWidth} stroke="#888888" />}
          {showTooltip && <Tooltip content={<ChartTooltipContent />} />}
          {showLegend && <Legend />}
          
          {categories.map((category, i) => (
            <Line 
              key={category} 
              type="monotone" 
              dataKey={category} 
              stroke={colors[i % colors.length]}
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// Pie Chart Component
export function PieChart({
  data,
  index,
  category,
  colors = defaultColors,
  valueFormatter = (value: number) => value.toString(),
  className,
  height = 300,
}: PieChartProps) {
  const config = data.reduce((acc, item, i) => {
    acc[item[index]] = {
      label: item[index],
      color: colors[i % colors.length]
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={config} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsPieChart>
          <Tooltip content={<ChartTooltipContent />} />
          <Legend />
          <Pie
            data={data}
            dataKey={category}
            nameKey={index}
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={60}
            paddingAngle={1}
            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={colors[index % colors.length]} 
                stroke="transparent"
              />
            ))}
          </Pie>
        </RechartsPieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}

// Area Chart Component
export function AreaChart({
  data,
  index,
  categories = [],
  colors = defaultColors,
  valueFormatter = (value: number) => value.toString(),
  yAxisWidth = 56,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  className,
  height = 300,
}: ChartProps) {
  const config = categories.reduce((acc, category, i) => {
    acc[category] = {
      label: category,
      color: colors[i % colors.length]
    };
    return acc;
  }, {} as Record<string, { label: string; color: string }>);

  return (
    <ChartContainer config={config} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        <RechartsAreaChart data={data}>
          {showGridLines && <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333333" />}
          {showXAxis && <XAxis dataKey={index} stroke="#888888" />}
          {showYAxis && <YAxis width={yAxisWidth} stroke="#888888" />}
          {showTooltip && <Tooltip content={<ChartTooltipContent />} />}
          {showLegend && <Legend />}
          
          {categories.map((category, i) => (
            <Area 
              key={category} 
              type="monotone" 
              dataKey={category} 
              stroke={colors[i % colors.length]}
              fill={`${colors[i % colors.length]}33`}
              strokeWidth={2}
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
