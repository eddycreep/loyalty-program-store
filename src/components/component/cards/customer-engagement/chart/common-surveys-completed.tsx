"use client"

import * as React from "react"
import { Label, Pie, PieChart, Sector } from "recharts"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { TrendingUp, Trophy } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const description = "An interactive pie chart"

const surveysData = [
    { category: "Products", completions: 300, fill: "#ff2257" },
    { category: "Store", completions: 200, fill: "#00d384" },
    { category: "Staff", completions: 150, fill: "#1ec3ff" },
  ];
  
  const chartConfig = {
    products: {
      label: "Products",
      color: "#ff2257",
    },
    store: {
      label: "Store",
      color: "#00d384",
    },
    staff: {
      label: "Staff",
      color: "#1ec3ff",
    },
  } satisfies ChartConfig;
  
  export function SurveysCompletedChart() {
    const id = "pie-survey-completions";
    const [activeCategory, setActiveCategory] = React.useState(surveysData[0].category);
  
    const activeIndex = React.useMemo(
      () => surveysData.findIndex((item) => item.category === activeCategory),
      [activeCategory]
    );
    const categories = React.useMemo(() => surveysData.map((item) => item.category), []);
  
    return (
      <Card data-chart={id} className="flex flex-col">
        <ChartStyle id={id} config={chartConfig} />
        <CardHeader className="flex-row items-start space-y-0 pb-0">
          <div className="grid gap-1">
            <h5 className="text-black font-bold text-md">Survey Completions</h5>
            <p className="text-gray-400 text-sm">Completions per category</p>
          </div>
          <Select value={activeCategory} onValueChange={setActiveCategory}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a category"
            >
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {surveysData.map(({ category }) => {
                const configKey = category.toLowerCase();
                const config = chartConfig[configKey as keyof typeof chartConfig];
  
                if (!config) {
                  return null;
                }
  
                return (
                  <SelectItem
                    key={category}
                    value={category}
                    className="rounded-lg [&_span]:flex"
                  >
                    <div className="flex items-center gap-2 text-xs">
                      <span
                        className="flex h-3 w-3 shrink-0 rounded-sm"
                        style={{
                          backgroundColor: config.color,
                        }}
                      />
                      {config?.label}
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
                data={surveysData}
                dataKey="completions"
                nameKey="category"
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
                            {surveysData[activeIndex].completions.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Completions
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
            <span className="text-black font-bold text-md">Survey Categories</span>
            <TrendingUp className="h-4 w-4" color="black" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing survey completions per category
          </div>
        </CardFooter>
      </Card>
    );
  }