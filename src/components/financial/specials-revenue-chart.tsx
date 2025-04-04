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
  { specialType: "Special", count: 500, fill: "#ff2257", revenue: 15000 },
  { specialType: "Combined Specials", count: 300, fill: "#00d384", revenue: 25000 },
];

const chartConfig = {
  special: {
    label: "Special",
    color: "#ff2257",
  },
  combined: {
    label: "Combined Specials",
    color: "#00d384",
  },
} satisfies ChartConfig;

function getChartConfigKey(specialType: string): keyof typeof chartConfig {
  const key = specialType.toLowerCase().split(' ')[0];
  return key as keyof typeof chartConfig;
}

export function SpecialsRevenueChart() {
  const id = "pie-members-chart";
  const [activeCategory, setActiveCategory] = React.useState(membersData[0].specialType);

  const activeIndex = React.useMemo(
    () => membersData.findIndex((item) => item.specialType === activeCategory),
    [activeCategory]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <h5 className="text-black font-bold text-md">Special Types Revenue</h5>
          <p className="text-gray-400 text-sm">Total Revenue per Special Type</p>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {membersData.map(({ specialType }) => (
              <SelectItem key={specialType} value={specialType} className="rounded-lg [&_span]:flex">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: chartConfig[getChartConfigKey(specialType)]?.color }}
                  />
                  {specialType}
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
              nameKey="specialType"
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
          <span className="text-black font-bold text-md">Special Types</span>
          <Trophy className="h-4 w-4" color="black" />
        </div>  
        <div className="leading-none text-muted-foreground">
          Showing the distribution of special types
        </div>
        <div className="text-black text-lg font-bold">
          Total Revenue for {activeCategory}: R{membersData[activeIndex].revenue.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}