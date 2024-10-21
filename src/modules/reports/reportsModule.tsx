'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveMembersReport } from "./customer-engagement/active-members-report"
import { EnrollmentRateReport } from "./customer-engagement/enrollment-rate-report"
import { RetentionRateReport } from "./customer-engagement/retention-rate-report"
import { RedemptionRateReport } from "./customer-engagement/redemption-rate-report"

interface LoyaltyClientsProps {
    id: number,
    name: string,
    surname: string
    id_number: number,
    mobile_number: string,
    age: number,
    gender: string,
    birthday: string,
    ethnicity: string,
    employment_status: string,
    loyalty: number,
    sign_up_date: string
}

type LoyaltyResponse = LoyaltyClientsProps[]
type NonLoyaltyResponse = LoyaltyClientsProps[]


export const ReportsModule = () => {
    const [activeTab, setActiveTab] = useState('customer-engagement')
    const [currentTab, setCurrentTab] = useState('members')


    return (
        <div className='w-full h-screen flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto m2b-4'>
            <h1 className="text-3xl font-bold mb-4">Reports</h1>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="customer-engagement">Customer Engagement</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="redemption">Redemption</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
          <TabsTrigger value="performance">Product Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="customer-engagement" className="space-y-4">
            <div className="pl-2">
                <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                    <button onClick={() => setCurrentTab('members')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'members'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Active Members</button>
                    <button onClick={() => setCurrentTab('enrollment')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'enrollment'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Enrollment Rate</button>
                    <button onClick={() => setCurrentTab('retention')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'retention'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Retention Rate</button>
                    <button onClick={() => setCurrentTab('redemption')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'redemption'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Redemption Rate</button>
                </div>
            </div>
            {currentTab === 'members' && <ActiveMembersReport />}
            {currentTab === 'enrollment' && <EnrollmentRateReport />}
            {currentTab === 'retention' && <RetentionRateReport />}
            {currentTab === 'redemption' && <RedemptionRateReport />}
        </TabsContent>
        <TabsContent value="financial" className="space-y-4">
            <div className="pl-2">
                <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                    <button onClick={() => setCurrentTab('revenue')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'revenue'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Revenue</button>
                    <button onClick={() => setCurrentTab('lifetime')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'lifetime'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Lifetime Value</button>
                    <button onClick={() => setCurrentTab('costRevenue')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'costRevenue'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Cost vs Revenue</button>
                    <button onClick={() => setCurrentTab('costDiscountRevenue')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'costDiscountRevenue'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Cost vs Discounted Revenue</button>
                </div>
            </div>
            {currentTab === 'revenue' && <ActiveMembersReport />}
            {currentTab === 'lifetime' && <EnrollmentRateReport />}
            {currentTab === 'costRevenue' && <RetentionRateReport />}
            {currentTab === 'costDiscountRevenue' && <RedemptionRateReport />}
        </TabsContent>
        <TabsContent value="redemption" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Time to First Redemption</CardTitle>
                <CardDescription>Average time for new members to redeem first reward</CardDescription>
              </CardHeader>
              <CardContent>
              Time to First Redemption
                {/* <ChartContainer config={{ count: { label: "Count", color: "hsl(var(--chart-13))" } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeToFirstRedemption}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="days" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Redemption Frequency</CardTitle>
                <CardDescription>How often members redeem rewards</CardDescription>
              </CardHeader>
              <CardContent>
              Redemption Frequency
                {/* <ChartContainer config={{ count: { label: "Count", color: "hsl(var(--chart-14))" } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={redemptionFrequency}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="frequency" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="var(--color-count)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Unused Points Liability</CardTitle>
                <CardDescription>Total number of points earned but not redeemed</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
              Unused Points Liability
                {/* <div className="relative w-48 h-48">
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
                </div> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="satisfaction" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Score (CSAT)</CardTitle>
              <CardDescription>Satisfaction scores from surveys</CardDescription>
            </CardHeader>
            <CardContent>
            Customer Satisfaction Score (CSAT)
              {/* <ResponsiveContainer width="100%" height={300}>
                <LineChart data={csatScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip /> 
                  <Line type="monotone" dataKey="score" stroke="#8884d8" /> 
                </LineChart>
              </ResponsiveContainer> */}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Net Promoter Score (NPS)</CardTitle>
              <CardDescription>Likelihood of members recommending the program</CardDescription>
            </CardHeader>
            <CardContent>
            Net Promoter Score (NPS)
              {/* <ResponsiveContainer width="100%" height={300}>
                <LineChart data={npsScores}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[-100, 100]} />
                  <Tooltip /> 
                  <Line type="monotone" dataKey="score" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer> */}
            </CardContent>
          </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Spend per Transaction</CardTitle>
                <CardDescription>By customer segment</CardDescription>
              </CardHeader>
              <CardContent>
              Average Spend per Transaction
                {/* <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={averageSpend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="segment" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="spend" fill="hsl(var(--chart-10))" />
                  </BarChart>
                </ResponsiveContainer> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Cross-Sell/Upsell Rate</CardTitle>
                <CardDescription>Success rate of additional product purchases</CardDescription>
              </CardHeader>
              <CardContent>
              Cross-Sell/Upsell Rate
                {/* <ChartContainer config={{ crossSell: { label: "Cross-Sell", color: "hsl(var(--chart-18))" }, upSell: { label: "Up-Sell", color: "hsl(var(--chart-19))" } }} className="h-[300px]">
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
                </ChartContainer> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="effectiveness" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Member Conversion Rate</CardTitle>
                <CardDescription>Percentage of non-members joining the loyalty program</CardDescription>
              </CardHeader>
              <CardContent>
              Member Conversion Rate
                {/* <ChartContainer config={{ value: { label: "Conversion", color: "hsl(var(--chart-20))" } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={memberConversionRate}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="value" fill="var(--color-value)" stroke="var(--color-value)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer> */}
              </CardContent>
            </Card>
            {/* <Card>
              <CardHeader>
                <CardTitle>Program ROI</CardTitle>
                <CardDescription>Return on Investment over years</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={programROI}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="roi" fill="hsl(var(--chart-11))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader>
                <CardTitle>Promotional Impact</CardTitle>
                <CardDescription>Effectiveness of special promotions on sales</CardDescription>
              </CardHeader>
              <CardContent>
              Promotional Impact
                {/* <ChartContainer config={{ sales: { label: "Sales", color: "hsl(var(--chart-22))" } }} className="h-[300px]">
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
                </ChartContainer> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        {/* product performance */}
        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Member Conversion Rate</CardTitle>
                <CardDescription>Percentage of non-members joining the loyalty program</CardDescription>
              </CardHeader>
              <CardContent>
              Member Conversion Rate
                {/* <ChartContainer config={{ value: { label: "Conversion", color: "hsl(var(--chart-20))" } }} className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={memberConversionRate}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="stage" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area type="monotone" dataKey="value" fill="var(--color-value)" stroke="var(--color-value)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer> */}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Promotional Impact</CardTitle>
                <CardDescription>Effectiveness of special promotions on sales</CardDescription>
              </CardHeader>
              <CardContent>
              Promotional Impact
                {/* <ChartContainer config={{ sales: { label: "Sales", color: "hsl(var(--chart-22))" } }} className="h-[300px]">
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
                </ChartContainer> */}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
        </div>
    );
}