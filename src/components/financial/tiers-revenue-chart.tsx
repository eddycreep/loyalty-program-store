"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Trophy } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const description = "An interactive pie chart showing membership distribution and revenue by tier";

const membersData = [
  { loyaltyType: "Gold", count: 500, fill: "#ff2257", revenue: 15000 },
  { loyaltyType: "Diamond", count: 300, fill: "#00d384", revenue: 25000 },
  { loyaltyType: "Platinum", count: 200, fill: "#ffa726", revenue: 35000 },
];

const chartConfig = {
  total: {
    label: "Total Members",
    color: "#ff2257",
  },
  active: {
    label: "Active Members",
    color: "#00d384",
  },
  gold: {
    label: "Gold Members",
    color: "#ffa726",
  },
  diamond: {
    label: "Diamond Members",
    color: "#1ec3ff",
  },
  platinum: {
    label: "Platinum Members",
    color: "#D4D4D4",
  },
} satisfies ChartConfig;

function getChartConfigKey(loyaltyType: string): keyof typeof chartConfig {
  const key = loyaltyType.toLowerCase().split(' ')[0];
  return key as keyof typeof chartConfig;
}

export function TiersRevenueChart() {
  const id = "pie-members-chart";
  const [activeCategory, setActiveCategory] = React.useState(membersData[0].loyaltyType);

  const activeIndex = React.useMemo(
    () => membersData.findIndex((item) => item.loyaltyType === activeCategory),
    [activeCategory]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <h5 className="text-black font-bold text-md">Loyalty Members Tier Revenue</h5>
          <p className="text-gray-400 text-sm">Total Revenue per Tier</p>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {membersData.map(({ loyaltyType }) => (
              <SelectItem key={loyaltyType} value={loyaltyType} className="rounded-lg [&_span]:flex">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: chartConfig[getChartConfigKey(loyaltyType)]?.color }}
                  />
                  {loyaltyType}
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
          className="mx-auto aspect-square w-[300px] h-[275px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={membersData}
              dataKey="count"
              nameKey="memberType"
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
                          className="text-black text-3xl font-bold"
                        >
                          {membersData[activeIndex].count.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Members
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
          <span className="text-black font-bold text-md">Membership Categories</span>
          <Trophy className="h-4 w-4" color="black" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the distribution of loyalty members
        </div>
        <div className="text-black text-lg font-bold">
          Total Revenue for {activeCategory}: R{membersData[activeIndex].revenue.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}