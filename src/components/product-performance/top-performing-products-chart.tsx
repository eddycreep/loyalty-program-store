"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Popcorn } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const description = "An interactive pie chart showing top-performing products with special types by count.";

const productData = [
    { product: "BIT BOARD 6.4X0.9X3.0", special: "Drywall Triple Treat", specialType: "Combined Special", revenue: 15000, store: "BOKSBURG", count: 200, fill: "#ff2257" },
    { product: "GYPROC-R/BOARD 6.4X0.9X2.4", special: "Gyproc Board BOGO Deal", specialType: "Special", revenue: 12000, store: "LANSERIA", count: 150, fill: "#00d384" },
    { product: "SINIAT BOARD 6.4X.0.9X2.7", special: "Siniat Premium Deal", specialType: "Combined Special", revenue: 18000, store: "MIDRAND", count: 100, fill: "#ffa726" },
    { product: "SINIAT BOARD 6.4X0.9X2.7", special: "Bit Board Special Offer", specialType: "Special", revenue: 10000, store: "SOWETO", count: 120, fill: "#1ec3ff" },
    { product: "SINIAT BOARD 6.4X0.9X3.3", special: "50% OFF Weekend Blowout", specialType: "Special", revenue: 14000, store: "BURGERSFORT", count: 90, fill: "#D4D4D4" },
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

function getChartConfigKey(specialType: string): keyof typeof chartConfig {
  return specialType === "Percentage" ? "Percentage" : "Amount";
}

export function TopPerformanceProductsChart() {
    const id = "pie-top-products-chart";
    const [activeStore, setActiveStore] = React.useState(productData[0].store);
  
    const activeIndex = React.useMemo(
      () => productData.findIndex((item) => item.store === activeStore),
      [activeStore]
    );
  
    return (
      <Card data-chart={id} className="flex flex-col">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <h5 className="text-black font-bold text-md">Top Performing Stores</h5>
            <p className="text-gray-400 text-sm">Total Count for Top Performing Stores</p>
          </div>
          <Select value={activeStore} onValueChange={setActiveStore}>
            <SelectTrigger
              className="ml-auto h-7 w-[160px] rounded-lg pl-2.5"
              aria-label="Select a store"
            >
              <SelectValue placeholder="Select store" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {productData.map(({ store, fill }) => (
                <SelectItem key={store} value={store} className="rounded-lg [&_span]:flex">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: fill }}
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
            className="mx-auto aspect-square w-[750px] h-[275px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={productData}
                dataKey="count"
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
                            className="text-black text-3xl font-bold"
                          >
                            {productData[activeIndex].count.toLocaleString()}
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
          <div className="flex items-center justify-center gap-2 text-black font-bold">
            <span className="text-black font-bold text-md">Top Performing Products</span>
            <Popcorn className="h-4 w-4" />
          </div>
          <div className="leading-none text-gray-500">
            Special: {productData[activeIndex].special} ({productData[activeIndex].specialType})
          </div>
          <div className="text-lg text-black font-bold">
            Total Revenue for {productData[activeIndex].product} at {activeStore}: R{productData[activeIndex].revenue.toLocaleString()}
          </div>
        </CardFooter>
      </Card>
    );
  }