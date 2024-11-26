'use client'

import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// CUSTOMER ENGAGEMENT
import { ActiveMembersReport } from "./customer-engagement/active-members-report"
import { EnrollmentRateReport } from "./customer-engagement/enrollment-rate-report"
import { RetentionRateReport } from "./customer-engagement/retention-rate-report"
import { RedemptionRateReport } from "./customer-engagement/redemption-rate-report"

// cards
import { ActiveMembersCard } from "@/components/component/cards/customer-engagement/active-members-card"

// FINANCIAL
import { RevenueReport } from "./financial/revenue-report"
import { SpecialsReport } from "./financial/specials-report"
import { CombinedSpecialsReport } from "./financial/combined-specials-report"
import { DiscountedRevenueReport } from "./financial/discounted-revenue"

//REDEMPTIONS
import { FirstRedemptionReport } from "./redemption/first-redemption-report"
import { RedemptionFrequencyReport } from "./redemption/redemption-frequency-report"
import { UnsusedLoyaltyReport } from "./redemption/unused-specials-report"

//SATISFACTION
import { CustomerSatisfactionReport } from "./satisfaction/customer-satisfaction-report"
import { AvgSpendPerTransactionReport } from "./satisfaction/avg-spend-per-transaction"
// import { CrossvsUpsellReport } from "./satisfaction/crossSell-vs-upSell-report"

//EFFECTIVENESS
import { MemberConversionReport } from "./effectiveness/member-conversion-report"
import { PromotionalImpactReport } from "./effectiveness/promotional-impace-report"

//Performance
import { TopPerformingProductsReport } from "./product-performance/top-performing-products-report"
import { LowPerformingProductsReport } from "./product-performance/low-performing-products-report"


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
                          <button onClick={() => setCurrentTab('specials')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'specials'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Specials</button>
                          <button onClick={() => setCurrentTab('combined')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'combined'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Combined Specials</button>
                          <button onClick={() => setCurrentTab('discountRevenue')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'discountRevenue'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Discounted Revenue</button>
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
                          <button onClick={() => setCurrentTab('firstRedemtion')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'firstRedemtion'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Avg. First Redemption</button>
                          <button onClick={() => setCurrentTab('redemptionFrequency')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'redemptionFrequency'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Redemption Frequency</button>
                          <button onClick={() => setCurrentTab('usedSpecials')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'usedSpecials'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Unused Specials</button>
                      </div>
                  </div>
                  {currentTab === 'firstRedemtion' && <FirstRedemptionReport />}
                  {currentTab === 'redemptionFrequency' && <RedemptionFrequencyReport />}
                  {currentTab === 'usedSpecials' && <UnsusedLoyaltyReport />}
              </TabsContent>
              <TabsContent value="satisfaction" className="space-y-4">
                <div className="pl-2">
                      <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                          <button onClick={() => setCurrentTab('satisfaction')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'satisfaction'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Customer Satisfaction</button>
                          <button onClick={() => setCurrentTab('avgTransaction')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'avgTransaction'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Avg. Spend Transaction</button>
                          {/* <button onClick={() => setCurrentTab('crossSell')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'crossSell'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Cross-Sell/Upsell Rate</button> */}
                      </div>
                  </div>
                  {currentTab === 'satisfaction' && <CustomerSatisfactionReport />}
                  {currentTab === 'avgTransaction' && <AvgSpendPerTransactionReport />}
                  {/* {currentTab === 'crossSell' && <CrossvsUpsellReport />} */}
              </TabsContent>
              <TabsContent value="effectiveness" className="space-y-4">
                <div className="pl-2">
                      <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                          <button onClick={() => setCurrentTab('memberConversion')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'memberConversion'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Member Conversion</button>
                          <button onClick={() => setCurrentTab('promotionalImpact')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'promotionalImpact'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Promotional Impact</button>
                      </div>
                  </div>
                  {currentTab === 'memberConversion' && <MemberConversionReport />} 
                  {currentTab === 'promotionalImpact' && <PromotionalImpactReport />}
              </TabsContent>
              {/* product performance*/}
              <TabsContent value="performance" className="space-y-4">
                  <div className="pl-2">
                      <div className="w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center">
                          <button onClick={() => setCurrentTab('topPerforming')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'topPerforming'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Top Performing</button>
                          <button onClick={() => setCurrentTab('lowPerforming')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'lowPerforming'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Low Performing</button>
                      </div>
                  </div>
                  {currentTab === 'topPerforming' && <TopPerformingProductsReport />}
                  {currentTab === 'lowPerforming' && <LowPerformingProductsReport />}
              </TabsContent> 
            </Tabs>
        </div>
    );
}