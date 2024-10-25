"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { Users, CalendarDays, Tag } from "lucide-react";

const engagementData = [
  { tier: "Gold", participationRate: 65, avgMonthlyVisits: 2.5, specialsRedemption: 3 },
  { tier: "Diamond", participationRate: 78, avgMonthlyVisits: 3.8, specialsRedemption: 5 },
  { tier: "Platinum", participationRate: 92, avgMonthlyVisits: 5.2, specialsRedemption: 8 },
];

export default function LoyaltyTierMembersChart() {
  return (
    <Card className="max-w-lg h-[400px]">
      <CardHeader>
        {/* <CardTitle>Customer Engagement by Tier</CardTitle>
        <CardDescription>Comparing participation across Gold, Diamond, and Platinum tiers</CardDescription> */}
      </CardHeader>
      <CardContent className="p-0"> {/* Removed padding for full chart width */}
        <ChartContainer
          config={{
            participationRate: {
              label: "Participation Rate",
              color: "hsl(var(--chart-1))",
            },
            avgMonthlyVisits: {
              label: "Avg Monthly Visits",
              color: "hsl(var(--chart-2))",
            },
            specialsRedemption: {
              label: "Specials Redemption",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-full w-full"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={engagementData}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="tier" type="category" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="participationRate" fill="var(--color-participationRate)" name="Participation Rate" />
              <Bar dataKey="avgMonthlyVisits" fill="var(--color-avgMonthlyVisits)" name="Avg Monthly Visits" />
              <Bar dataKey="specialsRedemption" fill="var(--color-specialsRedemption)" name="Specials Redemption" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: any[]; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-4 rounded-lg shadow-md border border-border">
        <h3 className="font-bold text-lg mb-2">{label}</h3>
        {payload.map((entry: any, index: number) => (
          <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
            {entry.name === "Participation Rate" && <Users className="w-4 h-4" />}
            {entry.name === "Avg Monthly Visits" && <CalendarDays className="w-4 h-4" />}
            {entry.name === "Specials Redemption" && <Tag className="w-4 h-4" />}
            <span className="font-medium">{entry.name}:</span>
            <span className="text-muted-foreground">
              {entry.name === "Avg Monthly Visits" ? entry.value.toFixed(1) : 
               entry.name === "Specials Redemption" ? entry.value : `${entry.value}%`}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
