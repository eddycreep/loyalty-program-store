"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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
  ChartStyle,
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

export const description = "A radial chart with stacked sections"

const chartData = [{ month: "special", cart: 1260, product: 570 }]

const chartConfig = {
  cart: {
    label: "Cart",
    color: "#a5b4fc",
  },
  product: {
    label: "Product",
    color: "#00d384",
  },
} satisfies ChartConfig

export function FreeItemsRewardsChart() {
  const totalVisitors = chartData[0].cart + chartData[0].product

  // State for active category, initially set to "special"
  const [activeCategory, setActiveCategory] = React.useState("cart")

  // Map categories from chartConfig keys for the dropdown
  const categories = React.useMemo(() => Object.keys(chartConfig), [])


  return (
    <Card className="flex flex-col w-[350px] h-[350px]">
      <CardHeader>
        <div className="flex justify-between">
          <div className="">
            <h5 className="font-bold">Common Items Redeemed</h5>
            <p className="text-sm text-gray-400">Total specials redeemed by customerss</p>
          </div>
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
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
      {/* Limit height of CardContent to ensure footer visibility */}
      <CardContent className="flex-1 flex items-center justify-center pb-0 h-[150px]">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Redemptions
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="cart"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-cart)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="product"
              fill="var(--color-product)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total revenue made by special
        </div>
      </CardFooter>
    </Card>
  )
}
