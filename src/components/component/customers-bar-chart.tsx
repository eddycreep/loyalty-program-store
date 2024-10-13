"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "Loyalty Customers compared to Non Loyalty Customers"

const chartData = [
    { date: "2024-04-01", loyalty: 222, nonLoyalty: 150 },
    { date: "2024-04-02", loyalty: 97, nonLoyalty: 180 },
    { date: "2024-04-03", loyalty: 167, nonLoyalty: 120 },
    { date: "2024-04-04", loyalty: 242, nonLoyalty: 260 },
    { date: "2024-04-05", loyalty: 373, nonLoyalty: 290 },
    { date: "2024-04-06", loyalty: 301, nonLoyalty: 340 },
    { date: "2024-04-07", loyalty: 245, nonLoyalty: 180 },
    { date: "2024-04-08", loyalty: 409, nonLoyalty: 320 },
    { date: "2024-04-09", loyalty: 59, nonLoyalty: 110 },
    { date: "2024-04-10", loyalty: 261, nonLoyalty: 190 },
    { date: "2024-04-11", loyalty: 327, nonLoyalty: 350 },
    { date: "2024-04-12", loyalty: 292, nonLoyalty: 210 },
    { date: "2024-04-13", loyalty: 342, nonLoyalty: 380 },
    { date: "2024-04-14", loyalty: 137, nonLoyalty: 220 },
    { date: "2024-04-15", loyalty: 120, nonLoyalty: 170 },
    { date: "2024-04-16", loyalty: 138, nonLoyalty: 190 },
    { date: "2024-04-17", loyalty: 446, nonLoyalty: 360 },
    { date: "2024-04-18", loyalty: 364, nonLoyalty: 410 },
    { date: "2024-04-19", loyalty: 243, nonLoyalty: 180 },
    { date: "2024-04-20", loyalty: 89, nonLoyalty: 150 },
    { date: "2024-04-21", loyalty: 137, nonLoyalty: 200 },
    { date: "2024-04-22", loyalty: 224, nonLoyalty: 170 },
    { date: "2024-04-23", loyalty: 138, nonLoyalty: 230 },
    { date: "2024-04-24", loyalty: 387, nonLoyalty: 290 },
    { date: "2024-04-25", loyalty: 215, nonLoyalty: 250 },
    { date: "2024-04-26", loyalty: 75, nonLoyalty: 130 },
    { date: "2024-04-27", loyalty: 383, nonLoyalty: 420 },
    { date: "2024-04-28", loyalty: 122, nonLoyalty: 180 },
    { date: "2024-04-29", loyalty: 315, nonLoyalty: 240 },
    { date: "2024-04-30", loyalty: 454, nonLoyalty: 380 },
    { date: "2024-05-01", loyalty: 165, nonLoyalty: 220 },
    { date: "2024-05-02", loyalty: 293, nonLoyalty: 310 },
    { date: "2024-05-03", loyalty: 247, nonLoyalty: 190 },
    { date: "2024-05-04", loyalty: 385, nonLoyalty: 420 },
    { date: "2024-05-05", loyalty: 481, nonLoyalty: 390 },
    { date: "2024-05-06", loyalty: 498, nonLoyalty: 520 },
    { date: "2024-05-07", loyalty: 388, nonLoyalty: 300 },
    { date: "2024-05-08", loyalty: 149, nonLoyalty: 210 },
    { date: "2024-05-09", loyalty: 227, nonLoyalty: 180 },
    { date: "2024-05-10", loyalty: 293, nonLoyalty: 330 },
    { date: "2024-05-11", loyalty: 335, nonLoyalty: 270 },
    { date: "2024-05-12", loyalty: 197, nonLoyalty: 240 },
    { date: "2024-05-13", loyalty: 197, nonLoyalty: 160 },
    { date: "2024-05-14", loyalty: 448, nonLoyalty: 490 },
    { date: "2024-05-15", loyalty: 473, nonLoyalty: 380 },
    { date: "2024-05-16", loyalty: 338, nonLoyalty: 400 },
    { date: "2024-05-17", loyalty: 499, nonLoyalty: 420 },
    { date: "2024-05-18", loyalty: 315, nonLoyalty: 350 },
    { date: "2024-05-19", loyalty: 235, nonLoyalty: 180 },
    { date: "2024-05-20", loyalty: 177, nonLoyalty: 230 },
    { date: "2024-05-21", loyalty: 82, nonLoyalty: 140 },
    { date: "2024-05-22", loyalty: 81, nonLoyalty: 120 },
    { date: "2024-05-23", loyalty: 252, nonLoyalty: 290 },
    { date: "2024-05-24", loyalty: 294, nonLoyalty: 220 },
    { date: "2024-05-25", loyalty: 201, nonLoyalty: 250 },
    { date: "2024-05-26", loyalty: 213, nonLoyalty: 170 },
    { date: "2024-05-27", loyalty: 420, nonLoyalty: 460 },
    { date: "2024-05-28", loyalty: 233, nonLoyalty: 190 },
    { date: "2024-05-29", loyalty: 78, nonLoyalty: 130 },
    { date: "2024-05-30", loyalty: 340, nonLoyalty: 280 },
    { date: "2024-05-31", loyalty: 178, nonLoyalty: 230 },
    { date: "2024-06-01", loyalty: 178, nonLoyalty: 200 },
    { date: "2024-06-02", loyalty: 470, nonLoyalty: 410 },
    { date: "2024-06-03", loyalty: 103, nonLoyalty: 160 },
    { date: "2024-06-04", loyalty: 439, nonLoyalty: 380 },
    { date: "2024-06-05", loyalty: 88, nonLoyalty: 140 },
    { date: "2024-06-06", loyalty: 294, nonLoyalty: 250 },
    { date: "2024-06-07", loyalty: 323, nonLoyalty: 370 },
    { date: "2024-06-08", loyalty: 385, nonLoyalty: 320 },
    { date: "2024-06-09", loyalty: 438, nonLoyalty: 480 },
    { date: "2024-06-10", loyalty: 155, nonLoyalty: 200 },
    { date: "2024-06-11", loyalty: 92, nonLoyalty: 150 },
    { date: "2024-06-12", loyalty: 492, nonLoyalty: 420 },
    { date: "2024-06-13", loyalty: 81, nonLoyalty: 130 },
    { date: "2024-06-14", loyalty: 426, nonLoyalty: 380 },
    { date: "2024-06-15", loyalty: 307, nonLoyalty: 350 },
    { date: "2024-06-16", loyalty: 371, nonLoyalty: 310 },
    { date: "2024-06-17", loyalty: 475, nonLoyalty: 520 },
    { date: "2024-06-18", loyalty: 107, nonLoyalty: 170 },
    { date: "2024-06-19", loyalty: 341, nonLoyalty: 290 },
    { date: "2024-06-20", loyalty: 408, nonLoyalty: 450 },
    { date: "2024-06-21", loyalty: 169, nonLoyalty: 210 },
    { date: "2024-06-22", loyalty: 317, nonLoyalty: 270 },
    { date: "2024-06-23", loyalty: 480, nonLoyalty: 530 },
    { date: "2024-06-24", loyalty: 132, nonLoyalty: 180 },
    { date: "2024-06-25", loyalty: 141, nonLoyalty: 190 },
    { date: "2024-06-26", loyalty: 434, nonLoyalty: 380 },
    { date: "2024-06-27", loyalty: 448, nonLoyalty: 490 },
    { date: "2024-06-28", loyalty: 149, nonLoyalty: 200 },
    { date: "2024-06-29", loyalty: 103, nonLoyalty: 160 },
    { date: "2024-06-30", loyalty: 446, nonLoyalty: 400 },
]

const chartConfig = {
    views: {
        label: "Page Views",
    },
    loyalty: {
        label: "Loyalty Customers",
        color: "hsl(var(--chart-1))",
    },
    nonLoyalty: {
        label: "Non-Loyalty Customers",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function LoyaltyCustomersChart() {
    const [activeChart, setActiveChart] =
        React.useState<keyof typeof chartConfig>("loyalty")

    const total = React.useMemo(
        () => ({
        loyalty: chartData.reduce((acc, curr) => acc + curr.loyalty, 0),
        nonLoyalty: chartData.reduce((acc, curr) => acc + curr.nonLoyalty, 0),
        }),
        []
    )

    return (
        <Card>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                <CardTitle>Loyalty vs Non Loyalty Comparisons</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 3 months
                </CardDescription>
                </div>
                <div className="flex">
                {["loyalty", "nonLoyalty"].map((key) => {
                    const chart = key as keyof typeof chartConfig
                    return (
                    <button
                        key={chart}
                        data-active={activeChart === chart}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => setActiveChart(chart)}
                    >
                        <span className="text-xs text-muted-foreground">
                        {chartConfig[chart].label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                        {total[key as keyof typeof total].toLocaleString()}
                        </span>
                    </button>
                    )
                })}
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
                >
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                    <CartesianGrid vertical={false} />
                    <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    minTickGap={32}
                    tickFormatter={(value) => {
                        const date = new Date(value)
                        return date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        })
                    }}
                    />
                    <ChartTooltip
                    content={
                        <ChartTooltipContent
                        className="w-[150px]"
                        nameKey="views"
                        labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            })
                        }}
                        />
                    }
                    />
                    <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
                </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
