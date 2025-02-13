'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActiveMembersReport } from "@/modules/reports/customer-engagement/active-members-report"
import { EnrollmentRateReport } from "@/modules/reports/customer-engagement/enrollment-rate-report"
import { RetentionRateReport } from "@/modules/reports/customer-engagement/retention-rate-report"
import { RedemptionRateReport } from "@/modules/reports/customer-engagement/redemption-rate-report"
import { RevenueReport } from "@/modules/reports/financial/revenue-report"
import { SpecialsReport } from "@/modules/reports/financial/specials-report"
import { CombinedSpecialsReport } from "@/modules/reports/financial/combined-specials-report"
import { DiscountedRevenueReport } from "@/modules/reports/financial/discounted-revenue"
import { FirstRedemptionReport } from "@/modules/reports/redemption/first-redemption-report"
import { RedemptionFrequencyReport } from "@/modules/reports/redemption/redemption-frequency-report"
import { UnsusedLoyaltyReport } from "@/modules/reports/redemption/unused-specials-report"
import { CustomerSatisfactionReport } from "@/modules/reports/satisfaction/customer-satisfaction-report"
import { AvgSpendPerTransactionReport } from "@/modules/reports/satisfaction/avg-spend-per-transaction"
import { MemberConversionReport } from "@/modules/reports/effectiveness/member-conversion-report"
import { PromotionalImpactReport } from "@/modules/reports/effectiveness/promotional-impace-report"
import { TopPerformingProductsReport } from "@/modules/reports/product-performance/top-performing-products-report"
import { LowPerformingProductsReport } from "@/modules/reports/product-performance/low-performing-products-report"

export default function Page() {
    const [activeTab, setActiveTab] = useState('customer-engagement')
    const [currentTab, setCurrentTab] = useState('members')

    return (
        <div className="w-full h-full flex justify-between px-4 py-4 gap-2 rounded-lg">
            <div className='w-full h-screen flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto m2b-4'>
                <h1 className="text-3xl font-bold mb-4 text-purple">Reports</h1>
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
                            <button onClick={() => setCurrentTab('members')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'members'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Active Members</button>
                            <button onClick={() => setCurrentTab('enrollment')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'enrollment'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Enrollment Rate</button>
                            <button onClick={() => setCurrentTab('retention')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'retention'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Retention Rate</button>
                            <button onClick={() => setCurrentTab('redemption')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'redemption'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Redemption Rate</button>
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
                            <button onClick={() => setCurrentTab('revenue')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'revenue'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Revenue</button>
                            <button onClick={() => setCurrentTab('specials')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'specials'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Specials</button>
                            <button onClick={() => setCurrentTab('combined')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'combined'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Combined Specials</button>
                            <button onClick={() => setCurrentTab('discountRevenue')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'discountRevenue'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Discounted Revenue</button>
                        </div>
                    </div>
                    {currentTab === 'revenue' && <RevenueReport />}
                    {currentTab === 'specials' && <SpecialsReport />}
                    {currentTab === 'combined' && <CombinedSpecialsReport />}
                    {currentTab === 'discountRevenue' && <DiscountedRevenueReport />}
                </TabsContent>
                <TabsContent value="redemption" className="space-y-4">
                    <div className="pl-2">
                        <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                            <button onClick={() => setCurrentTab('firstRedemtion')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'firstRedemtion'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Avg. First Redemption</button>
                            <button onClick={() => setCurrentTab('redemptionFrequency')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'redemptionFrequency'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Redemption Frequency</button>
                            <button onClick={() => setCurrentTab('usedSpecials')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'usedSpecials'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Unused Specials</button>
                        </div>
                    </div>
                    {currentTab === 'firstRedemtion' && <FirstRedemptionReport />}
                    {currentTab === 'redemptionFrequency' && <RedemptionFrequencyReport />}
                    {currentTab === 'usedSpecials' && <UnsusedLoyaltyReport />}
                </TabsContent>
                <TabsContent value="satisfaction" className="space-y-4">
                    <div className="pl-2">
                        <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                            <button onClick={() => setCurrentTab('satisfaction')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'satisfaction'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Customer Satisfaction</button>
                            <button onClick={() => setCurrentTab('avgTransaction')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'avgTransaction'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Avg. Spend Transaction</button>
                            {/* <button onClick={() => setCurrentTab('crossSell')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'crossSell'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Cross-Sell/Upsell Rate</button> */}
                        </div>
                    </div>
                    {currentTab === 'satisfaction' && <CustomerSatisfactionReport />}
                    {currentTab === 'avgTransaction' && <AvgSpendPerTransactionReport />}
                    {/* {currentTab === 'crossSell' && <CrossvsUpsellReport />} */}
                </TabsContent>
                <TabsContent value="effectiveness" className="space-y-4">
                    <div className="pl-2">
                        <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                            <button onClick={() => setCurrentTab('memberConversion')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'memberConversion'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Member Conversion</button>
                            <button onClick={() => setCurrentTab('promotionalImpact')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'promotionalImpact'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Promotional Impact</button>
                        </div>
                    </div>
                    {currentTab === 'memberConversion' && <MemberConversionReport />} 
                    {currentTab === 'promotionalImpact' && <PromotionalImpactReport />}
                </TabsContent>
                {/* product performance*/}
                <TabsContent value="performance" className="space-y-4">
                    <div className="pl-2">
                        <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                            <button onClick={() => setCurrentTab('topPerforming')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'topPerforming'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Top Performing</button>
                            <button onClick={() => setCurrentTab('lowPerforming')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'lowPerforming'? 'bg-purple text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Low Performing</button>
                        </div>
                    </div>
                    {currentTab === 'topPerforming' && <TopPerformingProductsReport />}
                    {currentTab === 'lowPerforming' && <LowPerformingProductsReport />}
                </TabsContent> 
                </Tabs>
            </div>
        </div>
    );
}