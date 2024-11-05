"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { ActiveMembersCard } from "@/components/component/cards/customer-engagement/active-members-card"
// import { EngagementRateCard } from "@/components/component/cards/customer-engagement/engagement-rate-card"
import { CommonRedeemedSpecialsChart } from "@/components/component/cards/customer-engagement/chart/common-redeemed-specials"
import { CommonRedeemedRewardsChart } from "@/components/component/cards/customer-engagement/chart/common-redeemed-rewards"
import LoyaltyTierMembersChart  from "@/components/component/cards/customer-engagement/chart/tier-members-chart"
import { LoyaltyMembersChart } from "@/components/component/cards/customer-engagement/chart/loyalty-members-chart"
import { SurveysCompletedChart } from "@/components/component/cards/customer-engagement/chart/common-surveys-completed"

// Financial
import { SpecialsRevenueChart } from "@/components/financial/specials-revenue-chart"
import { TopProductsRevenueChart } from "@/components/financial/top-products-revenue-chart"
import { TiersRevenueChart } from "@/components/financial/tiers-revenue-chart"
// import { LoyaltyRevenueChart } from "@/components/financial/radial-revenue-chart"


// REDEMPTIONS
import { TopRedeemedProductsChart } from "@/components/redemption/top-redeemed-products-chart"
import { TopStoreRedemptionsChart } from "@/components/redemption/top-store-redemptions-chart"
import { LowestRedeemedProductsChart } from "@/components/redemption/lowest-redeemed-products-chart"

// satisfaction
import { TopRatedProductsChart } from "@/components/satisfaction/top-rated-products-chart"
import { TopRatedStoresChart } from "@/components/satisfaction/top-rated-stores-chart"
import { TopRatedStaffChart } from "@/components/satisfaction/top-rated-staff-chart"

// effectiveness
import { RedeemedTierRewards } from "@/components/effectiveness/redeemed-rewards-tiers-chart"
import { RedeemedRewardsCount } from "@/components/effectiveness/redeemed-rewards-count"

// Dummy data for charts
const activeMembers = [
  { month: 'Jan', members: 5000 },
  { month: 'Feb', members: 5200 },
  { month: 'Mar', members: 5400 },
  { month: 'Apr', members: 5600 },
  { month: 'May', members: 5900 },
  { month: 'Jun', members: 6200 },
  { month: 'Jul', members: 6400 },
  { month: 'Aug', members: 6600 },
  { month: 'Sep', members: 6800 },
  { month: 'Oct', members: 7000 },
];

const enrollmentRate = [
  { month: 'Jan', newMembers: 200 },
  { month: 'Feb', newMembers: 220 },
  { month: 'Mar', newMembers: 240 },
  { month: 'Apr', newMembers: 260 },
  { month: 'May', newMembers: 300 },
  { month: 'Jun', newMembers: 320 },
  { month: 'Jul', newMembers: 340 },
  { month: 'Aug', newMembers: 360 },
  { month: 'Sep', newMembers: 380 },
  { month: 'Oct', newMembers: 400 },
];

const retentionChurn = [
  { month: 'Jan', retention: 95, churn: 5 },
  { month: 'Feb', retention: 94, churn: 6 },
  { month: 'Mar', retention: 96, churn: 4 },
  { month: 'Apr', retention: 95, churn: 5 },
  { month: 'May', retention: 97, churn: 3 },
  { month: 'Jun', retention: 96, churn: 4 },
  { month: 'Jul', retention: 98, churn: 2 },
  { month: 'Aug', retention: 97, churn: 3 },
  { month: 'Sep', retention: 96, churn: 4 },
  { month: 'Oct', retention: 95, churn: 5 },
];

const redemptionRate = [
  { name: 'Redeemed', value: 70 },
  { name: 'Unredeemed', value: 30 },
]

const loyaltyTiers = [
  { name: 'Bronze', value: 50 },
  { name: 'Silver', value: 30 },
  { name: 'Gold', value: 15 },
  { name: 'Platinum', value: 5 },
]

const revenuePerMember = [
  { segment: 'Gold', revenue: 50 },
  { segment: 'Diamond', revenue: 100 },
  { segment: 'Platinum', revenue: 200 },
]

const ltv = [
  { segment: 'New', value: 500 },
  { segment: '1-2 Months', value: 1200 },
  { segment: '3-5 Months', value: 2500 },
  { segment: '5+ Months', value: 4000 },
]

const costVsRevenue = [
  { month: 'Jan', cost: 10000, revenue: 50000 },
  { month: 'Feb', cost: 12000, revenue: 55000 },
  { month: 'Mar', cost: 11000, revenue: 60000 },
  { month: 'Apr', cost: 13000, revenue: 58000 },
  { month: 'May', cost: 12500, revenue: 62000 },
  { month: 'Jun', cost: 13500, revenue: 65000 },
  { month: 'Jul', cost: 14000, revenue: 68000 },
  { month: 'Aug', cost: 14500, revenue: 71000 },
  { month: 'Sep', cost: 15000, revenue: 74000 },
  { month: 'Oct', cost: 15500, revenue: 77000 },
];

const discountCostVsRevenue = [
  { month: 'Jan', discountCost: 5000, revenue: 50000 },
  { month: 'Feb', discountCost: 6000, revenue: 55000 },
  { month: 'Mar', discountCost: 5500, revenue: 60000 },
  { month: 'Apr', discountCost: 7000, revenue: 65000 },
  { month: 'May', discountCost: 7500, revenue: 70000 },
  { month: 'Jun', discountCost: 8000, revenue: 75000 },
  { month: 'Jul', discountCost: 8500, revenue: 78000 },
  { month: 'Aug', discountCost: 9000, revenue: 81000 },
  { month: 'Sep', discountCost: 9500, revenue: 84000 },
  { month: 'Oct', discountCost: 10000, revenue: 87000 },
];

const timeToFirstRedemption = [
  { days: '0-7', count: 100 },
  { days: '8-14', count: 150 },
  { days: '15-30', count: 200 },
  { days: '31-60', count: 100 },
  { days: '60+', count: 50 },
]

const redemptionFrequency = [
  { frequency: 'Weekly', count: 1000 },
  { frequency: 'Bi-weekly', count: 2000 },
  { frequency: 'Monthly', count: 1500 },
  { frequency: 'Quarterly', count: 500 },
  { frequency: 'Annually', count: 100 },
]

const unusedPointsLiability = 75 // Percentage of total points that are unused

const csatScores = [
  { month: 'Jan', score: 4.2 },
  { month: 'Feb', score: 4.3 },
  { month: 'Mar', score: 4.4 },
  { month: 'Apr', score: 4.3 },
  { month: 'May', score: 4.5 },
  { month: 'Jun', score: 4.6 },
  { month: 'Jul', score: 4.4 },
  { month: 'Aug', score: 4.5 },
  { month: 'Sep', score: 4.6 },
  { month: 'Oct', score: 4.7 }
];

const npsScores = [
  { month: 'Jan', score: 35 },
  { month: 'Feb', score: 38 },
  { month: 'Mar', score: 40 },
  { month: 'Apr', score: 39 },
  { month: 'May', score: 42 },
  { month: 'Jun', score: 45 },
  { month: 'Jul', score: 43 },
  { month: 'Aug', score: 44 },
  { month: 'Sep', score: 46 },
  { month: 'Oct', score: 47 }
];

const averageSpend = [
  { segment: 'Non-member', spend: 30 },
  { segment: 'New member', spend: 40 },
  { segment: 'Regular', spend: 60 },
  { segment: 'VIP', spend: 100 },
]

const crossSellUpsellRate = [
  { month: 'Jan', crossSell: 10, upSell: 5 },
  { month: 'Feb', crossSell: 12, upSell: 6 },
  { month: 'Mar', crossSell: 15, upSell: 8 },
  { month: 'Apr', crossSell: 14, upSell: 7 },
  { month: 'May', crossSell: 16, upSell: 9 },
  { month: 'Jun', crossSell: 18, upSell: 10 },
  { month: 'Jul', crossSell: 17, upSell: 9 },
  { month: 'Aug', crossSell: 19, upSell: 11 },
  { month: 'Sep', crossSell: 20, upSell: 12 },
  { month: 'Oct', crossSell: 21, upSell: 13 }
];


const memberConversionRate = [
  { stage: 'Visitors', value: 10000 },
  { stage: 'Registered', value: 5000 },
  { stage: 'Active', value: 3000 },
  { stage: 'Loyal', value: 1000 },
]


const programROI = [
  { year: 2020, roi: 120 },
  { year: 2021, roi: 135 },
  { year: 2022, roi: 150 },
  { year: 2023, roi: 165 },
]


const promotionalImpact = [
  { month: 'Jan', sales: 100000, promotion: false },
  { month: 'Feb', sales: 110000, promotion: false },
  { month: 'Mar', sales: 150000, promotion: true },
  { month: 'Apr', sales: 120000, promotion: false },
  { month: 'May', sales: 180000, promotion: true },
  { month: 'Jun', sales: 130000, promotion: false },
  { month: 'Jul', sales: 140000, promotion: false },
  { month: 'Aug', sales: 170000, promotion: true },
  { month: 'Sep', sales: 160000, promotion: false },
  { month: 'Oct', sales: 190000, promotion: true }
];


// Add these new data structures for product performance metrics
const productPerformanceData = [
  { product: 'Product A', sales: 1200, growth: 15, engagement: 85 },
  { product: 'Product B', sales: 980, growth: 8, engagement: 72 },
  { product: 'Product C', sales: 1500, growth: 25, engagement: 90 },
  { product: 'Product D', sales: 750, growth: -5, engagement: 65 },
  { product: 'Product E', sales: 1100, growth: 12, engagement: 78 },
];

const customerDemographics = {
  ageGroups: [
    { group: '18-24', percentage: 15 },
    { group: '25-34', percentage: 30 },
    { group: '35-44', percentage: 25 },
    { group: '45-54', percentage: 20 },
    { group: '55+', percentage: 10 },
  ],
  gender: [
    { category: 'Male', value: 45 },
    { category: 'Female', value: 52 },
    { category: 'Other', value: 3 },
  ],
  purchaseFrequency: [
    { frequency: 'Weekly', count: 2000 },
    { frequency: 'Bi-weekly', count: 3500 },
    { frequency: 'Monthly', count: 4500 },
    { frequency: 'Quarterly', count: 2500 },
    { frequency: 'Annually', count: 1000 },
  ],
  customerSegments: [
    { segment: 'Value Seekers', percentage: 35 },
    { segment: 'Premium Buyers', percentage: 25 },
    { segment: 'Occasional Shoppers', percentage: 20 },
    { segment: 'Loyal Customers', percentage: 20 },
  ],
};


export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('customer-engagement')

  return (
    <div className="w-full mb-72">
      <h1 className="text-3xl font-bold mb-4">Loyalty Program Dashboard</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="customer-engagement">Customer Engagement</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="redemption">Redemption</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
          <TabsTrigger value="performance">Product Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="customer-engagement" className="space-y-4 h-screen w-full">
          <div className="h-screen w-full">
            <div className="flex justify-between gap-2 pb-2">
                  <div className="">
                    <LoyaltyMembersChart/>
                  </div>
                  <div className="">
                    <CommonRedeemedSpecialsChart />
                  </div>
                  <div className="">
                    <CommonRedeemedRewardsChart />
                  </div>
                  <div className="">
                    <SurveysCompletedChart />
                  </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Members</CardTitle>
                <CardDescription>Number of active members over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ members: { label: "Active Members", color: "hsl(var(--chart-1))" } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activeMembers}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="members" stroke="var(--color-members)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Enrollment Rate</CardTitle>
                <CardDescription>New members joining the program</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ newMembers: { label: "New Members", color: "hsl(var(--chart-2))" } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentRate}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="newMembers" fill="var(--color-newMembers)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Retention vs. Churn Rate</CardTitle>
                <CardDescription>Percentage of customers retained vs. churned</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ retention: { label: "Retention", color: "hsl(var(--chart-3))" }, churn: { label: "Churn", color: "hsl(var(--chart-4))" } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={retentionChurn}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="retention" fill="var(--color-retention)" />
                      <Bar dataKey="churn" fill="var(--color-churn)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Redemption Rate</CardTitle>
                <CardDescription>Percentage of redeemed vs unredeemed discounts</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={redemptionRate} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="hsl(var(--chart-4))" label />
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          </div>
        </TabsContent>
        <TabsContent value="financial" className="space-y-4 h-screen w-full pb-64">
          {/* <div className="h-screen w-full"> */}
            <div className="flex justify-between gap-2 pb-2">
              <div className="w-1/3">
                <SpecialsRevenueChart />
              </div>
              <div className="w-1/3">
                <TiersRevenueChart />
              </div>
              <div className="w-1/3">
                <TopProductsRevenueChart />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue per Member</CardTitle>
                  <CardDescription>Average revenue by customer segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenuePerMember}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="segment" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="hsl(var(--chart-5))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Lifetime Value (LTV)</CardTitle>
                  <CardDescription>Estimated total revenue per customer segment</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ value: { label: "LTV", color: "hsl(var(--chart-8))" } }} className="h-[300px] w-[800px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ltv}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="segment" />
                        <YAxis />
                        <ChartTooltip  content={<ChartTooltipContent />} />
                        <Bar dataKey="value" fill="var(--color-value)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Cost vs. Revenue</CardTitle>
                  <CardDescription>Comparison of costs and revenue generated</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ cost: { label: "Cost", color: "hsl(var(--chart-9))" }, revenue: { label: "Revenue", color: "hsl(var(--chart-10))" } }} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={costVsRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="cost" fill="var(--color-cost)" />
                        <Bar dataKey="revenue" fill="var(--color-revenue)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Discount Cost vs Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={{ 
                    discountCost: { label: "Discount Cost", color: "hsl(var(--chart-4))" },
                    revenue: { label: "Revenue", color: "hsl(var(--chart-5))" }
                  }} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={discountCostVsRevenue}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="discountCost" stroke="var(--color-discountCost)" strokeWidth={2} />
                        <Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          {/* </div> */}
        </TabsContent>
        <TabsContent value="redemption" className="space-y-4">
            <div className="flex justify-between gap-2">
                <div className="">
                  <TopRedeemedProductsChart />
                </div>
                <div className="">
                  <TopStoreRedemptionsChart />
                </div>
                <div className="">
                  <LowestRedeemedProductsChart />
                </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Time to First Redemption</CardTitle>
                <CardDescription>Average time for new members to redeem first reward</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ count: { label: "Count", color: "hsl(var(--chart-13))" } }} className="h-[300px] w-[800px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeToFirstRedemption}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="days" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Redemption Frequency</CardTitle>
                <CardDescription>How often members redeem rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ count: { label: "Count", color: "hsl(var(--chart-14))" } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={redemptionFrequency}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="frequency" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Unused Discounts Liability</CardTitle>
                <CardDescription>Total number of points earned but not redeemed</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                      className="text-muted-foreground"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="45"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      className="text-primary"
                      strokeWidth="10"
                      strokeDasharray={`${unusedPointsLiability * 2.83} 283`}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="45"
                      cx="50"
                      cy="50"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold">{unusedPointsLiability}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="satisfaction" className="space-y-4">
            <div className="flex justify-between gap-2">
                <div className="">
                  <TopRatedProductsChart />
                </div>
                <div className="">
                  <TopRatedStoresChart />
                </div>
                <div className="">
                  <TopRatedStaffChart />
                </div>
            </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Score (CSAT)</CardTitle>
              <CardDescription>Satisfaction scores from surveys</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={csatScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip /> {/* Recharts' built-in Tooltip */}
                  <Line type="monotone" dataKey="score" stroke="#8884d8" /> {/* Static color for testing */}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net Promoter Score (NPS)</CardTitle>
              <CardDescription>Likelihood of members recommending the program</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={npsScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[-100, 100]} />
                  <Tooltip />  {/* Built-in Recharts Tooltip */}
                  <Line type="monotone" dataKey="score" stroke="#8884d8" />  {/* Test with static color */}
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Spend per Transaction</CardTitle>
                <CardDescription>By customer segment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={averageSpend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="spend" fill="hsl(var(--chart-10))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cross-Sell/Upsell Rate</CardTitle>
                <CardDescription>Success rate of additional product purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ crossSell: { label: "Cross-Sell", color: "hsl(var(--chart-18))" }, upSell: { label: "Up-Sell", color: "hsl(var(--chart-19))" } }} className="h-[300px] w-[800px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={crossSellUpsellRate}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="crossSell" fill="var(--color-crossSell)" />
                      <Bar dataKey="upSell" fill="var(--color-upSell)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="effectiveness" className="space-y-4">
            {/* <div className="flex justify-between gap-2">
                <div className="">
                  <RedeemedTierRewards />
                </div>
                <div className="">
                  <RedeemedRewardsCount />
                </div>
            </div> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Reward Redemption by Tier</CardTitle>
                    <CardDescription>Distribution of rewards across membership tiers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        // { tier: 'Bronze', rewards: 150, avgValue: 25 },
                        { tier: 'Gold', rewards: 280, avgValue: 40 },
                        { tier: 'Diamond', rewards: 420, avgValue: 75 },
                        { tier: 'Platinum', rewards: 320, avgValue: 120 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tier" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" dataKey="rewards" fill="var(--color-rewards)" name="Number of Redemptions" />
                        <Line yAxisId="right" type="monotone" dataKey="avgValue" stroke="var(--color-value)" name="Avg. Value" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Member Engagement Score</CardTitle>
                    <CardDescription>Composite score based on program participation</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={[
                        { month: 'Jan', score: 72 },
                        { month: 'Feb', score: 75 },
                        { month: 'Mar', score: 78 },
                        { month: 'Apr', score: 76 },
                        { month: 'May', score: 80 },
                        { month: 'Jun', score: 82 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="score" stroke="var(--color-score)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* <Card>
                  <CardHeader>
                    <CardTitle>Time to Next Tier</CardTitle>
                    <CardDescription>Average days for members to reach next tier</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={[
                        { tier: 'Bronze to Silver', days: 45 },
                        { tier: 'Silver to Gold', days: 90 },
                        { tier: 'Gold to Platinum', days: 180 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="tier" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="days" fill="var(--color-days)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card> */}
                <Card>
                  <CardHeader>
                    <CardTitle>Member Conversion Rate</CardTitle>
                    <CardDescription>Percentage of non-members joining the loyalty program</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{ value: { label: "Conversion", color: "hsl(var(--chart-20))" } }} className="h-[300px] w-[800px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={memberConversionRate}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="stage" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area type="monotone" dataKey="value" fill="var(--color-value)" stroke="var(--color-value)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Promotional Impact</CardTitle>
                    <CardDescription>Effectiveness of special promotions on sales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer config={{ sales: { label: "Sales", color: "hsl(var(--chart-22))" } }} className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={promotionalImpact}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="sales" fill="var(--color-sales)">
                            {promotionalImpact.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.promotion ? "var(--color-promotion)" : "var(--color-sales)"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
            </div>
        </TabsContent>
        <TabsContent value="performance" className="space-y-4 h-screen w-full">
          <div className="flex gap-4">
              <Card className="w-[800px]">
                  <CardHeader>
                      <CardTitle>Top Performing Products</CardTitle>
                      <CardDescription>Products with the highest special redemptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={[
                              { product: 'Organic Apples', redemptions: 320, store: 'Store A' },
                              { product: 'Whole Wheat Bread', redemptions: 290, store: 'Store B' },
                              { product: 'Almond Milk', redemptions: 260, store: 'Store C' },
                              { product: 'Granola Bars', redemptions: 240, store: 'Store A' },
                              { product: 'Chicken Breasts', redemptions: 220, store: 'Store B' }
                          ]}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="product" />
                              <YAxis />
                              <Tooltip formatter={(value, name, props) => [`${value}`, `Store: ${props.payload.store}`]} />
                              <Legend />
                              <Bar dataKey="redemptions" fill="var(--color-high-performance)" name="Redemptions" />
                          </BarChart>
                      </ResponsiveContainer>
                  </CardContent>
              </Card>
              <Card className="w-[800px]">
                  <CardHeader>
                      <CardTitle>Low Performing Products</CardTitle>
                      <CardDescription>Products with the lowest special redemptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={[
                              { product: 'Orange Juice', redemptions: 100, store: 'Store C' },
                              { product: 'Instant Coffee', redemptions: 90, store: 'Store A' },
                              { product: 'Rice Cakes', redemptions: 80, store: 'Store B' },
                              { product: 'Diet Soda', redemptions: 70, store: 'Store C' },
                              { product: 'Canned Beans', redemptions: 65, store: 'Store B' }
                          ]}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="product" />
                              <YAxis />
                              <Tooltip formatter={(value, name, props) => [`${value}`, `Store: ${props.payload.store}`]} />
                              <Legend />
                              <Bar dataKey="redemptions" fill="var(--color-low-performance)" name="Redemptions" />
                          </BarChart>
                      </ResponsiveContainer>
                  </CardContent>
              </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}