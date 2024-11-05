"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Trophy } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const description = "An interactive pie chart showing top-rated stores with customer ratings and rating counts.";

const storeData = [
  { store: "PLUS DC Stellenbosch", store_id: "SOO1", rating: 4.7, customerCount: 250, region: "Stellenbosch", fill: "#ff2257" },
  { store: "PLUS DC Albertin", store_id: "SOO2", rating: 4.5, customerCount: 180, region: "Albertin", fill: "#00d384" },
  { store: "PLUS DC Bellville", store_id: "SOO3", rating: 4.6, customerCount: 220, region: "Bellville", fill: "#ffa726" },
  { store: "PLUS DC Nelspruit", store_id: "SOO4", rating: 4.2, customerCount: 140, region: "Nelspruit", fill: "#1ec3ff" },
  { store: "PLUS DC Durbanville", store_id: "SOO5", rating: 4.4, customerCount: 170, region: "Durbanville", fill: "#D4D4D4" },
];

const chartConfig = {
  Percentage: {
    label: "Percentage",
    color: "#ff2257",
  },
  Amount: {
    label: "Amount",
    color: "#00d384",
  },
} satisfies ChartConfig;

export function TopRatedStoresChart() {
  const id = "pie-stores-chart";
  const [activeStore, setActiveStore] = React.useState(storeData[0].store);

  const activeIndex = React.useMemo(
    () => storeData.findIndex((item) => item.store === activeStore),
    [activeStore]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <h5>Top Rated Stores</h5>
          <CardDescription>Customer Ratings, Counts, and Region</CardDescription>
        </div>
        <Select value={activeStore} onValueChange={setActiveStore}>
          <SelectTrigger
            className="ml-auto h-7 w-[150px] rounded-lg pl-2.5"
            aria-label="Select a store"
          >
            <SelectValue placeholder="Select store" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {storeData.map(({ store }) => (
              <SelectItem key={store} value={store} className="rounded-lg [&_span]:flex">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: storeData.find(s => s.store === store)?.fill }}
                  />
                  {store}
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
              dataKey="customerCount"
              nameKey="store"
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
                          {storeData[activeIndex].rating.toFixed(1)} / 5
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 20}
                          className="fill-muted-foreground text-sm"
                        >
                          {storeData[activeIndex].customerCount.toLocaleString()} ratings
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 40}
                          className="fill-muted-foreground text-sm"
                        >
                          Region: {storeData[activeIndex].region}
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
          Store Ratings <Trophy className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing average rating, total number of customer ratings, and region for each store
        </div>
      </CardFooter>
    </Card>
  );
}