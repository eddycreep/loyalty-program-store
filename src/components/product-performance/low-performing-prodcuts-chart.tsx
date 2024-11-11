"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Popcorn } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const description = "An interactive pie chart showing low-performing products with specials per store by revenue.";

const productData = [
  { product: "Oreo Cookies", special: "Oreo Discount", specialType: "Special", revenue: 1100, store: "PLUS DC Pretoria", count: 80, fill: "#1ec3ff" },
  { product: "Apple", special: "Healthy Special", specialType: "Combined Special", revenue: 2300, store: "PLUS DC Germiston", count: 120, fill: "#D4D4D4" },
  { product: "Doritos", special: "Doritos Discount", specialType: "Special", revenue: 1800, store: "PLUS DC Polokwane", count: 100, fill: "#00d384" },
  { product: "Maynards", special: "Sweet Special", specialType: "Combined Special", revenue: 800, store: "PLUS DC East London", count: 140, fill: "#ff2257" },
  { product: "KINGSLEY 2L", special: "KINGSLEY Combo", specialType: "Special", revenue: 200, store: "PLUS DC Pietermaritzburg", count: 160, fill: "#ffa726" },
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

export function LowPerformanceProductsChart() {
  const id = "pie-low-products-chart";
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
          <h5>Low Performing Products</h5>
          <CardDescription>Total Count for Low Performing Products</CardDescription>
        </div>
        <Select value={activeStore} onValueChange={setActiveStore}>
          <SelectTrigger className="ml-auto h-7 w-[200px] rounded-lg pl-2.5" aria-label="Select a store">
            <SelectValue placeholder="Select store" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {productData.map(({ store, fill }) => (
              <SelectItem key={store} value={store} className="rounded-lg [&_span]:flex">
                <div className="flex items-center gap-2 text-xs">
                  <span className="flex h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: fill }} />
                  {store}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-[750px] h-[275px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={productData}
              dataKey="count"
              nameKey="product"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector {...props} outerRadius={outerRadius + 25} innerRadius={outerRadius + 12} />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {productData[activeIndex].count.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
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
        <div className="text-lg font-bold">
          Total Revenue for {productData[activeIndex].product} at {activeStore}: R{productData[activeIndex].revenue.toLocaleString()}
        </div>
        <div className="leading-none text-muted-foreground">
          Special: {productData[activeIndex].special} ({productData[activeIndex].specialType})
        </div>
        <div className="leading-none text-muted-foreground">
          Showing redemption counts for low products
        </div>
        <div className="flex items-center justify-center gap-2 font-medium">
          Low Performing Products <Popcorn className="h-4 w-4" />
        </div>
      </CardFooter>
    </Card>
  );
}