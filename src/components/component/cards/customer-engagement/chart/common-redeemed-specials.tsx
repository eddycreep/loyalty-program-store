"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { TrendingUp, Gem } from "lucide-react"

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

export const description = "An interactive pie chart"

const specialsData = [
  { special: "Buy 1 Get 1 Free", product: "chips", redemptions: 150, fill: "#ff2257" },
  { special: "20% Off", product: "drinks", redemptions: 120, fill: "#00d384" },
  { special: "Combo Offer", product: "processedFoods", redemptions: 90, fill: "#FFC400" },
  { special: "Back-to-School Discount", product: "schoolSupplies", redemptions: 80, fill: "#1ec3ff" },
  { special: "Free Drink with Purchase", product: "freeDrink", redemptions: 110, fill: "#a17efa" },
];

const chartConfig = {
  chips: {
    label: "Chips",
    color: "#ff2257",
  },
  drinks: {
    label: "Drinks",
    color: "#00d384",
  },
  processedFoods: {
    label: "Processed Foods",
    color: "#FFC400",
  },
  schoolSupplies: {
    label: "School Supplies",
    color: "#1ec3ff",
  },
  freeDrink: {
    label: "Free Drink",
    color: "#a17efa",
  },
};


export function CommonRedeemedSpecialsChart() {
  const id = "pie-common-redeemed-specials";
  const [activeCategory, setActiveCategory] = React.useState(specialsData[0].product);

  const activeIndex = React.useMemo(
    () => specialsData.findIndex((item) => item.product === activeCategory),
    [activeCategory]
  );
  const categories = React.useMemo(() => specialsData.map((item) => item.product), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <h5 className="text-black font-bold text-md">Common Specials</h5>
          <p className="text-gray-400 text-sm">Most redeemed offers by category</p>
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
              const configKey = key
                .replace(/\s/g, "") // Remove spaces to match config keys
                .toLowerCase();
              const config = chartConfig[configKey as keyof typeof chartConfig];

              if (!config) {
                return null;
              }

              return (
                <SelectItem
                  key={key}
                  value={key}
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
              );
            })}
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
              data={specialsData}
              dataKey="redemptions"
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
                          {specialsData[activeIndex].redemptions.toLocaleString()}
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
          <span className="text-black font-bold text-md">Common Specials</span>
          <Gem className="h-4 w-4" color="black" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing the most common specials redeemed
        </div>
      </CardFooter>
    </Card>
  );
}
