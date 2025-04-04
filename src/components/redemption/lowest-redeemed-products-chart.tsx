"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { Trophy } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const description = "An interactive pie chart showing lowest redeemed products with special types by count and revenue.";

const productData = [
  { product: "Oreo Cookies", count: 50, fill: "#1ec3ff", revenue: 5000, specialType: "Amount" },
  { product: "Pepsi 2L", count: 70, fill: "#D4D4D4", revenue: 6000, specialType: "Percentage" },
  { product: "Lay's Chips", count: 100, fill: "#00d384", revenue: 7000, specialType: "Amount" },
  { product: "Coke 2L", count: 120, fill: "#ff2257", revenue: 8000, specialType: "Percentage" },
  { product: "Red Bull", count: 140, fill: "#ffa726", revenue: 9000, specialType: "Percentage" },
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

export function LowestRedeemedProductsChart() {
  const id = "pie-products-chart";
  const [activeCategory, setActiveCategory] = React.useState(productData[0].product);

  const activeIndex = React.useMemo(
    () => productData.findIndex((item) => item.product === activeCategory),
    [activeCategory]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <h5 className="text-black font-bold text-md">Lowest Redeemed Products</h5>
          <p className="text-gray-400 text-sm">Total Redemption for Low Redeemed Products</p>
        </div>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a product"
          >
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {productData.map(({ product }) => (
              <SelectItem key={product} value={product} className="rounded-lg [&_span]:flex">
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className="flex h-3 w-3 shrink-0 rounded-sm"
                    style={{ backgroundColor: chartConfig[getChartConfigKey(productData.find(p => p.product === product)?.specialType || "")]?.color }}
                  />
                  {product}
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
              data={productData}
              dataKey="count"
              nameKey="product"
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
        <div className="flex items-center justify-center gap-2 font-medium">
          <span className="text-black font-bold text-md">Lowest Redeemed Products</span>
          <Trophy className="h-4 w-4" color="black" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing redemption counts/revenue for products with low engagement
        </div>
        <div className="text-black text-lg font-bold">
          Total Revenue for {activeCategory}: R{productData[activeIndex].revenue.toLocaleString()}
        </div>
      </CardFooter>
    </Card>
  );
}