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

const chartData = [
  { month: "January", smith: 95, jones: 82, williams: 78 },
  { month: "February", smith: 88, jones: 90, williams: 85 },
  { month: "March", smith: 92, jones: 85, williams: 89 },
  { month: "April", smith: 86, jones: 93, williams: 82 },
  { month: "May", smith: 90, jones: 88, williams: 91 },
  { month: "June", smith: 94, jones: 86, williams: 88 },
]

const chartConfig = {
  smith: {
    label: "Sarah Smith",
    color: "#a5b4fc",
  },
  jones: {
    label: "Mike Jones",
    color: "#00d384",
  },
  williams: {
    label: "Emma Williams",
    color: "#1ec3ff",
  },
} satisfies ChartConfig

export function TopRatedStaff() {
    

      // State for active category, initially set to "smith"
  const [activeCategory, setActiveCategory] = React.useState("smith")

  // Map categories from chartConfig keys for the dropdown
  const categories = React.useMemo(() => Object.keys(chartConfig), [])



  return (
    <Card className="w-[400px] h-[380px]">
      <CardHeader>
        <div className="flex justify-between">
          <div className="">
            <h5 className="font-bold">Top Rated Staff</h5>
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
              dataKey="williams"
              type="natural"
              fill="var(--color-williams)"
              fillOpacity={0.1}
              stroke="var(--color-williams)"
              stackId="a"
            />
            <Area
              dataKey="jones"
              type="natural"
              fill="var(--color-jones)"
              fillOpacity={0.4}
              stroke="var(--color-jones)"
              stackId="a"
            />
            <Area
              dataKey="smith"
              type="natural"
              fill="var(--color-smith)"
              fillOpacity={0.4}
              stroke="var(--color-smith)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
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