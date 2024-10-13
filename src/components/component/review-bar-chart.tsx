"use client"

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export const description = "An interactive Bar chart"

export const chartData = [
    { product: 'Cheese Burger', Category: 'Burgers', Rating: 3 },
    { product: 'Switch', Category: 'Drinks', Rating: 4 },
    { product: 'Danone 1kg D/Cream', Category: 'Dairy', Rating: 5 },
    { product: 'CLEAN BONES', Category: 'Meat', Rating: 1 },
    { product: 'B.B.Q. MINCE', Category: 'Processed Meats', Rating: 2 },
    { product: 'CO-EX QUALITY BRAAI', Category: 'Other', Rating: 1 },
    { product: 'VALUE BRAAI (FREDDY/SKIN)', Category: 'Meat', Rating: 4 },
    { product: 'CO-EX HEROES BRAAI', Category: 'Other', Rating: 3 },
    { product: 'B.B.Q. MINCE', Category: 'Meat', Rating: 5 },
    { product: 'BEST BOEREWORS', Category: 'Meat', Rating: 2 },
    { product: 'CO-EX PORK(FREDDY)', Category: 'Meat', Rating: 2 },
    { product: 'CHOICE SKIN SAUSAGE', Category: 'Meat', Rating: 2 },
    { product: 'SKIN PORK SAUSAGE', Category: 'Meat', Rating: 3 },
    { product: 'VALUE BRAAI (FREDDY)', Category: 'Meat', Rating: 5 },
    { product: 'PORK TAILS(FROZEN)', Category: 'Meat', Rating: 5 },
    { product: 'PORK RIBS FRESH', Category: 'Meat', Rating: 4 },
    { product: 'STEWING BEEF', Category: 'Meat', Rating: 4 },
    { product: 'CLEAN BONES', Category: 'Meat', Rating: 3 },
    { product: 'CHICKEN WINGS TIPS', Category: 'Meat', Rating: 3 },
    { product: 'MUTTON NECK BONE', Category: 'Meat', Rating: 3 },
    { product: 'FROZEN BRISKET [DELI]', Category: 'Meat', Rating: 3 },
    { product: 'CO-EX CHAKALAKA', Category: 'Other', Rating: 2 },
    { product: 'SKIN CHAKALAKA DELI', Category: 'Other', Rating: 2 },
    { product: 'LEGENDS SAUSAGE', Category: 'Processed Meats', Rating: 1 },
    { product: 'CO-EX QUALITY BRAAI', Category: 'Other', Rating: 1 },
    { product: 'VALUE BRAAI (FREDDY/SKIN)', Category: 'Processed Meats', Rating: 5 }
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  product: {
    label: "product",
    color: "hsl(var(--chart-1))",
  },
  Category: {
    label: "Category",
    color: "hsl(var(--chart-1))",
  },
  Rating: {
    label: "Rating",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig


export function ProductBarChart() {
    const [selectedCategory, setSelectedCategory] = React.useState("All");

    // Filter the chart data based on the selected category or show all if "All" is selected
    const filteredData = selectedCategory === "All" 
        ? chartData 
        : chartData.filter(item => item.Category.toLowerCase() === selectedCategory.toLowerCase());

    return (
      <Card>
        <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
          <div className="grid flex-1 gap-1 text-center sm:text-left">
            <CardTitle>Bar Chart - Interactive</CardTitle>
            <CardDescription>
              Showing product ratings for the selected category
            </CardDescription>
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger
              className="w-[160px] rounded-lg sm:ml-auto"
              aria-label="Select a category"
            >
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="All" className="rounded-lg">
                All
              </SelectItem>
              <SelectItem value="Burgers" className="rounded-lg">
                Burgers
              </SelectItem>
              <SelectItem value="Drinks" className="rounded-lg">
                Drinks
              </SelectItem>
              <SelectItem value="Dairy" className="rounded-lg">
                Dairy
              </SelectItem>
              <SelectItem value="Meat" className="rounded-lg">
                Meat
              </SelectItem>
              <SelectItem value="Processed Meats" className="rounded-lg">
                Processed Meats
              </SelectItem>
              <SelectItem value="Other" className="rounded-lg">
                Other
              </SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="product" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Rating" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
}