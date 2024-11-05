// "use client";

// import * as React from "react";
// import { Label, Pie, PieChart, Sector } from "recharts";
// import { PieSectorDataItem } from "recharts/types/polar/Pie";
// import { Trophy } from "lucide-react";

// import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
// import { ChartConfig, ChartContainer, ChartStyle, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// export const description = "An interactive pie chart showing top stores by customer redemption count.";

// const storeData = [
//   { store: "PLUS DC Stellenbosch", count: 200, fill: "#ff2257" },
//   { store: "PLUS DC Albertin", count: 150, fill: "#00d384" },
//   { store: "PLUS DC Bellville", count: 120, fill: "#ffa726" },
//   { store: "PLUS DC Nelspruit", count: 100, fill: "#1ec3ff" },
//   { store: "PLUS DC Durbanville", count: 80, fill: "#D4D4D4" },
// ];

// const chartConfig = {
//   Percentage: {
//     label: "Percentage",
//     color: "#ff2257",
//   },
//   Amount: {
//     label: "Amount",
//     color: "#00d384",
//   },
// } satisfies ChartConfig;

// export function TopStoresEngagementChart() {
//   const id = "pie-store-redemptions-chart";
//   const [activeStore, setActiveStore] = React.useState(storeData[0].store);

//   const activeIndex = React.useMemo(
//     () => storeData.findIndex((item) => item.store === activeStore),
//     [activeStore]
//   );

//   return (
//     <Card data-chart={id} className="flex flex-col">
//       <CardHeader className="flex-row items-start space-y-0 pb-0">
//         <div className="grid gap-1">
//           <h5>Top Stores by Redemptions</h5>
//           <CardDescription>Total Customer Redemption Count per Store</CardDescription>
//         </div>
//         <Select value={activeStore} onValueChange={setActiveStore}>
//           <SelectTrigger className="ml-auto h-7 w-[130px] rounded-lg pl-2.5" aria-label="Select a store">
//             <SelectValue placeholder="Select store" />
//           </SelectTrigger>
//           <SelectContent align="end" className="rounded-xl">
//             {storeData.map(({ store }) => (
//               <SelectItem key={store} value={store} className="rounded-lg [&_span]:flex">
//                 <div className="flex items-center gap-2 text-xs">
//                   <span
//                     className="flex h-3 w-3 shrink-0 rounded-sm"
//                     style={{
//                       backgroundColor: storeData.find((s) => s.store === store)?.fill,
//                     }}
//                   />
//                   {store}
//                 </div>
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </CardHeader>
//       <CardContent className="flex flex-1 justify-center pb-0">
//         <ChartContainer id={id} config={chartConfig} className="mx-auto aspect-square w-[300px] h-[275px]">
//           <PieChart>
//             <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
//             <Pie
//               data={storeData}
//               dataKey="count"
//               nameKey="store"
//               innerRadius={60}
//               strokeWidth={5}
//               activeIndex={activeIndex}
//               activeShape={({ outerRadius = 0, ...props }: PieSectorDataItem) => (
//                 <g>
//                   <Sector {...props} outerRadius={outerRadius + 10} />
//                   <Sector
//                     {...props}
//                     outerRadius={outerRadius + 25}
//                     innerRadius={outerRadius + 12}
//                   />
//                 </g>
//               )}
//             >
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
//                         <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
//                           {storeData[activeIndex].count.toLocaleString()}
//                         </tspan>
//                         <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
//                           Customers Redeemed
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </Pie>
//           </PieChart>
//         </ChartContainer>
//       </CardContent>
//       <CardFooter className="flex-col items-center gap-2 text-sm">
//         <div className="flex items-center justify-center gap-2 font-medium">
//           Top Redemption Stores <Trophy className="h-4 w-4" />
//         </div>
//         <div className="leading-none text-muted-foreground">
//           Showing customer redemption counts for top stores
//         </div>
//         <div className="text-lg font-bold">
//           Total Customer Redemptions within {storeData.store}
//         </div>
//       </CardFooter>
//     </Card>
//   );
// }