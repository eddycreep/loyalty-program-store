"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "A line chart with a label"

const chartData = [
  { month: "January", instagram: 402, facebook: 330, twitter: 100, linkedin: 5},
  { month: "February", instagram: 255, facebook: 392, twitter: 187, linkedin: 12},
  { month: "March", instagram: 127, facebook: 216, twitter: 85, linkedin: 45},
  { month: "April", instagram: 450, facebook: 210, twitter: 88, linkedin: 435},
  { month: "May", instagram: 320, facebook: 210, twitter: 88, linkedin: 225},
  { month: "June", instagram: 220, facebook: 220, twitter: 148, linkedin: 125},
  { month: "July", instagram: 120, facebook: 210, twitter: 88, linkedin: 45},
]

//Instagram, Facebook, Twitter, linkedin

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

//New Customers that have signed up with the loyalty program
export function NewCustomersLineChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 20,
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            
            {/* Instagram Line */}
            <Line
              dataKey="instagram"
              type="natural"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={{
                fill: "var(--color-desktop)",
              }}
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Line>

            {/* Facebook Line */}
            <Line
              dataKey="facebook"
              type="natural"
              stroke="#8884d8" // Set a distinct color for Facebook
              strokeWidth={2}
              dot={{
                fill: "#8884d8",
              }}
              activeDot={{
                r: 6,
              }}
            />

            {/* Twitter Line */}
            <Line
              dataKey="twitter"
              type="natural"
              stroke="#82ca9d" // Set a distinct color for Twitter
              strokeWidth={2}
              dot={{
                fill: "#82ca9d",
              }}
              activeDot={{
                r: 6,
              }}
            />

            {/* LinkedIn Line */}
            <Line
              dataKey="linkedin"
              type="natural"
              stroke="#ee82ee" // Set a distinct color for LinkedIn
              strokeWidth={2}
              dot={{
                fill: "#ff7300",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
