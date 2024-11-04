"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
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

// Updated chart data with more dramatic fluctuations between stores
const chartData = [
  { month: "January", stellenbosch: 95, albertin: 65, bellville: 82 },
  { month: "February", stellenbosch: 72, albertin: 88, bellville: 65 },
  { month: "March", stellenbosch: 89, albertin: 63, bellville: 91 },
  { month: "April", stellenbosch: 68, albertin: 92, bellville: 73 },
  { month: "May", stellenbosch: 93, albertin: 71, bellville: 88 },
  { month: "June", stellenbosch: 75, albertin: 89, bellville: 67 },
]

// Reverted to original colors but updated for PLUS DC stores
const chartConfig = {
  stellenbosch: {
    label: "PLUS DC Stellenbosch",
    color: "#a5b4fc",  // Original 'desktop' color
  },
  albertin: {
    label: "PLUS DC Albertin",
    color: "#00d384",  // Original 'mobile' color
  },
  bellville: {
    label: "PLUS DC Bellville",
    color: "#1ec3ff",  // Original 'other' color
  },
} satisfies ChartConfig

export function TopRatedStores() {
    

      // Updated initial category
  const [activeCategory, setActiveCategory] = React.useState("stellenbosch")

  // Map categories from chartConfig keys for the dropdown
  const categories = React.useMemo(() => Object.keys(chartConfig), [])



  return (
    <Card className="w-[400px] h-[380px]">
      <CardHeader>
        <div className="flex justify-between">
          <div className="">
            <h5 className="font-bold">Top Rated Stores</h5>
            <p className="text-sm text-gray-400">Top Rated Products within the program</p>
          </div>
          {/* <Select value={activeCategory} onValueChange={setActiveCategory}>
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
          </Select> */}
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
              dataKey="bellville"
              type="natural"
              fill="var(--color-bellville)"
              fillOpacity={0.1}
              stroke="var(--color-bellville)"
              stackId="a"
            />
            <Area
              dataKey="albertin"
              type="natural"
              fill="var(--color-albertin)"
              fillOpacity={0.4}
              stroke="var(--color-albertin)"
              stackId="a"
            />
            <Area
              dataKey="stellenbosch"
              type="natural"
              fill="var(--color-stellenbosch)"
              fillOpacity={0.4}
              stroke="var(--color-stellenbosch)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Showing the Top 3 Highest Rated Stores <TrendingUp className="h-4 w-4" />
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