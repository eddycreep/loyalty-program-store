"use client"

import * as React from "react"
import { Popcorn } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export const description = "A stacked area chart with expand stacking"

const chartData = [
  { month: "January", cocacola: 4.8, lays: 4.5, notebooks: 4.2 },
  { month: "February", cocacola: 4.9, lays: 4.6, notebooks: 4.3 },
  { month: "March", cocacola: 4.7, lays: 4.8, notebooks: 4.4 },
  { month: "April", cocacola: 4.8, lays: 4.7, notebooks: 4.6 },
  { month: "May", cocacola: 4.9, lays: 4.6, notebooks: 4.7 },
  { month: "June", cocacola: 4.8, lays: 4.7, notebooks: 4.5 },
]

const chartConfig = {
  cocacola: {
    label: "Coca-Cola 2L",
    color: "#a5b4fc", // Red color
  },
  lays: {
    label: "Lay's Classic",
    color: "#00d384", // Yellow color
  },
  notebooks: {
    label: "School Notebooks",
    color: "#1ec3ff", // Blue color
  },
} satisfies ChartConfig

export function TopRatedProducts() {
    

      // State for active category, initially set to "special"
  const [activeCategory, setActiveCategory] = React.useState("special")

  // Map categories from chartConfig keys for the dropdown
  const categories = React.useMemo(() => Object.keys(chartConfig), [])



  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="">
            <h5 className="font-bold">Top Rated Products</h5>
            <p className="text-sm text-gray-400">Top Rated Products within the program</p>
          </div>
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger
              className="ml-auto h-7 w-[200px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {categories.map((key) => {
                // Ensure category key matches chartConfig keys
                const configKey = key.toLowerCase();
                const config = chartConfig[configKey as keyof typeof chartConfig]

                if (!config) {
                  return null
                }

                return (
                  <SelectItem
                    key={key}
                    value={configKey} // Update: Pass configKey to match `activeCategory`
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: config.color,
                        }}
                      />
                      {config.label}
                    </div>
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
            }}
            stackOffset="expand"
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="cocacola"
              type="natural"
              fill={chartConfig.cocacola.color}
              fillOpacity={0.4}
              stroke={chartConfig.cocacola.color}
              stackId="a"
            />
            <Area
              dataKey="lays"
              type="natural"
              fill={chartConfig.lays.color}
              fillOpacity={0.4}
              stroke={chartConfig.lays.color}
              stackId="a"
            />
            <Area
              dataKey="notebooks"
              type="natural"
              fill={chartConfig.notebooks.color}
              fillOpacity={0.4}
              stroke={chartConfig.notebooks.color}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-center gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Showing the Top 3 Highest Rated Products <Popcorn className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}