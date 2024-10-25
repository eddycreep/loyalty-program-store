"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { TrendingUp, Trophy } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const description = "An interactive pie chart"

const rewardsData = [
    { reward: "10% off Chips", redemptions: 450, fill: "#ff2257" },
    { reward: "Free Soda", redemptions: 320, fill: "#00d384" },
    { reward: "5% off Total Cart", redemptions: 380, fill: "#1ec3ff" },
    { reward: "Buy 1 Get 1 Free", redemptions: 280, fill: "#FFC400" },
    { reward: "Survey Complete Bonus", redemptions: 200, fill: "#ff6600" },
    { reward: "Review Complete Bonus", redemptions: 150, fill: "#855cec" },
]

const chartConfig = {
    chips: {
      label: "10% off Chips",
      color: "#ff2257",
    },
    soda: {
      label: "Free Soda",
      color: "#00d384",
    },
    cart: {
      label: "5% off Total Cart",
      color: "#1ec3ff",
    },
    bogo: {
      label: "Buy 1 Get 1",
      color: "#FFC400",
    },
    survey: {
      label: "Survey Complete Bonus",
      color: "#ff6600",
    },
    review: {
      label: "Review Complete Bonus",
      color: "#855cec",
    },
} satisfies ChartConfig


export function CommonRedeemedRewardsChart() {
    const id = "pie-common-redeemed-rewards";
    const [activeCategory, setActiveCategory] = React.useState(rewardsData[0].reward);
  
    const activeIndex = React.useMemo(
      () => rewardsData.findIndex((item) => item.reward === activeCategory),
      [activeCategory]
    );
    const categories = React.useMemo(() => rewardsData.map((item) => item.reward), []);
  
    return (
      <Card data-chart={id} className="flex flex-col">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <h5>Common Rewards</h5>
            <CardDescription>Most redeemed rewards by customers</CardDescription>
          </div>
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
                {rewardsData.map(({ reward, redemptions, fill }) => (
                    <SelectItem
                    key={reward}
                    value={reward}
                    className="rounded-lg [&_span]:flex"
                    >
                    <div className="flex items-center gap-2 text-xs">
                        <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                            backgroundColor: fill,
                        }}
                        />
                        {`${reward} (${redemptions} redemptions)`}
                    </div>
                    </SelectItem>
                ))}
                </SelectContent>
            </Select>
        </CardHeader>
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-[300px] h-[275px]" // Adjusted size to match CommonSurveysCompletedChart
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={rewardsData}
                dataKey="redemptions"
                nameKey="reward"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {rewardsData[activeIndex].redemptions.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Redemptions
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2 text-sm">
            <div className="flex items-center justify-center gap-2 font-medium">
                Common Specials <Trophy className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
                Showing the most common specials redeemed
            </div>
        </CardFooter>
      </Card>
    );
  }  