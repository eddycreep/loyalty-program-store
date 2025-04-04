"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Trophy } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const description = "An interactive pie chart showing stores with the highest customer redemptions by count.";

// Update store data with provided store names and dummy redemption count and revenue values
const storeData = [
  { storeName: "BOKSBURG", count: 500, fill: "#ff2257", revenue: 20000 },
  { storeName: "LANSERIA", count: 400, fill: "#00d384", revenue: 15000 },
  { storeName: "MIDRAND", count: 300, fill: "#ffa726", revenue: 13000 },
  { storeName: "SOWETO", count: 250, fill: "#1ec3ff", revenue: 11000 },
  { storeName: "BURGERSFORT", count: 200, fill: "#D4D4D4", revenue: 10000 },
];

const chartConfig = {
  High: {
    label: "High",
    color: "#ff2257",
  },
  Medium: {
    label: "Medium",
    color: "#00d384",
  },
} satisfies ChartConfig;

export function TopStoreRedemptionsChart() {
  const id = "pie-store-redemptions-chart";
  const [activeStore, setActiveStore] = React.useState(storeData[0].storeName);

  const activeIndex = React.useMemo(
    () => storeData.findIndex((item) => item.storeName === activeStore),
    [activeStore]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <h5 className="text-black font-bold text-md">Top Stores</h5>
          <p className="text-gray-400 text-sm">Total Customer Redemptions by Store</p>
        </div>
        <Select value={activeStore} onValueChange={setActiveStore}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a store"
          >
            <SelectValue placeholder="Select store" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {storeData.map(({ storeName }) => (
              <SelectItem key={storeName} value={storeName} className="rounded-lg [&_span]:flex">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: chartConfig[activeStore ? "High" : "Medium"].color }}
                  />
                  {storeName}
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
              data={storeData}
              dataKey="count"
              nameKey="storeName"
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
                          {storeData[activeIndex].count.toLocaleString()}
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
          <span className="text-black font-bold text-md">Top Stores</span>
          <Trophy className="h-4 w-4" color="black" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing redemption counts for top stores
        </div>
        <div className="text-black text-lg font-bold">
          Total Revenue for {activeStore}: R{storeData[activeIndex].revenue.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}