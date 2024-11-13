'use client'

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, DollarSign, PlusCircle, ShoppingCart, Users, FileText, Gift, Mail, TrendingUp, Gem, BadgeCheck, NotepadText } from 'lucide-react'
import { PercentDiamond, Coins, Coffee } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { apiEndPoint } from '@/utils/colors'

import { LoyaltySummaryCards } from '@/components/loyalty-summary-cards'
import { ActiveSpecialCards } from '@/modules/home/components/active-specials-card'
import { UpcomingSpecialCards } from '@/modules/home/components/upcoming-specials-card'


interface RewardProps {
  reward_id: number,
  reward_title: string,
  description: string,
  reward: string,
  reward_type: string,
  reward_price: number,
  store_id: string,
  region: string,
  start_date: string,
  expiry_date: string,
  loyalty_tier: string,
  age_group: string,
  isActive: number
}
type RewardResponse = RewardProps[]

interface SurveyProps {
  survey_id: number,
  survey_title: string,
  survey_category: string,
  store_id: string,
  region: string,
  start_date: string,
  expiry_date: string,
  isActive: number,
}
type SurveyResponse = SurveyProps[]


export function Homepage() {
  const [activeTab, setActiveTab] = useState("active")

  //state variables to hold data
  const [activeRewards, setActiveRewards] = useState<RewardResponse>([])
  const [activeSurveys, setActiveSurveys] = useState<SurveyResponse>([])

  //states for active rewards
  const [activeRewardsLoading, setActiveRewardsLoading] = useState(false);
  const [activeRewardsErrors, setActiveRewardsErrors] = useState(false);

  //states for active surveys
  const [activeSurveysLoading, setActiveSurveysLoading] = useState(false);
  const [activeSurveysErrors, setActiveSurveysErrors] = useState(false);

  // /getactivesurveys - /getactiverewards

  const getActiveRewards = async () => {
    setActiveRewardsLoading(true);

    try {
      const url = `products/getactiverewards`
      const response = await axios.get<RewardResponse>(`${apiEndPoint}/${url}`);
      setActiveRewards(response?.data);
      console.log('Active Rewards: ', response.data);

    } catch (error) {
      console.log("An error occurred when fetching the active rewards");
      setActiveRewardsErrors(true);
    }

    setActiveRewardsLoading(false);
  }

  const getActiveSurveys = async () => {
    setActiveSurveysLoading(true);

    try {
      const url = `products/getactivesurveys`
      const response = await axios.get<SurveyResponse>(`${apiEndPoint}/${url}`);
      setActiveSurveys(response?.data);
      console.log('Active Surveys: ', response.data);

    } catch (error) {
      console.log("An error occurred when fetching the active surveys");
      setActiveSurveysErrors(true);
    }

    setActiveSurveysLoading(false);
  }

  useEffect(() => {
    getActiveRewards();
    getActiveSurveys();
  }, []);



  return (
    <div className="h-screen bg-gray-100 overflow-y-auto pb-20">
      {/* Main content */}
      <main className="py-4 sm:py-6 md:py-8 px-2s sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Loyalty Program Management</h1>
          </header>

          {/* Summary Cards */}
          <div className="gap-4 sm:gap-6 pb-6 sm:pb-8">
            <LoyaltySummaryCards />
          </div>

          {/* Specials Section */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Specials</h2>
            <Tabs defaultValue="active" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active Specials</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming Specials</TabsTrigger>
              </TabsList>
              <TabsContent value="active">
                <div className="w-full">
                  <ActiveSpecialCards />
                </div>
              </TabsContent>
              <TabsContent value="upcoming">
                <div className="w-full">
                  <UpcomingSpecialCards />
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Surveys and Rewards Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Active Surveys and Rewards</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Surveys</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 sm:space-y-4">
                    <SurveyItem
                      name="Customer Satisfaction Survey"
                      category="Store"
                      type="Free"
                      completions={789}
                      location="Main Street Store"
                      region="North"
                    />
                    <SurveyItem
                      name="Product Feedback Survey"
                      category="Product"
                      type="Amount"
                      completions={456}
                      location="Downtown Store"
                      region="Central"
                    />
                    <SurveyItem
                      name="New Product Feedback"
                      category="Product"
                      type="Free"
                      completions={324}
                      location="All Stores"
                      region="West"
                    />
                    <SurveyItem
                      name="Staff Performance Review"
                      category="Staff"
                      type="Percentage"
                      completions={178}
                      location="City Center Store"
                      region="South"
                    />
                  </ul>
                </CardContent>
              </Card>
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">Rewards</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 sm:space-y-4">
                    <RewardItem
                      name="Refer a Friend"
                      task="Refer a new customer"
                      type="Percentage"
                      redemptions={321}
                      location="All Stores"
                      region="All Regions"
                    />
                    <RewardItem
                      name="Birthday Surprise"
                      task="Shop on your birthday"
                      type="Free"
                      redemptions={654}
                      location="All Stores"
                      region="All Regions"
                    />
                    <RewardItem
                      name="Loyalty Milestone Bonus"
                      task="Reach 1000 loyalty points"
                      type="Amount"
                      redemptions={287}
                      location="All Stores"
                      region="All Regions"
                    />
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

// function SummaryCard({ title, value, icon, increase, isCurrency = false }: any) {
//   return (
//     <Card className="shadow-lg">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">{title}</CardTitle>
//         <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
//           {React.cloneElement(icon, { className: "h-5 w-5 sm:h-6 sm:w-6 text-red-500" })}
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="text-xl sm:text-2xl font-bold">{value}</div>
//         <div className="flex items-center mt-2 text-gray-400 text-xs sm:text-sm">
//           <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
//           <span>
//             {isCurrency ? '+$' : '+'}
//             {increase.toLocaleString()} from last month
//           </span>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

// function SpecialCard({ type, name, discount, startDate, endDate, timesRedeemed, isActive, specialType }: any) {
//   const getSpecialTypeIcon = () => {
//     switch (specialType) {
//       case 'Percentage':
//         return <PercentDiamond className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />;
//       case 'Amount':
//         return <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />;
//       case 'Free':
//         return <Coffee className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Card className="shadow-lg">
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <div className="flex items-center space-x-2">
//             <CardTitle className="text-base sm:text-lg">{name}</CardTitle>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   {getSpecialTypeIcon()}
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>{specialType === 'Free' ? 'Free Item' : specialType}</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           </div>
//           {isActive ? (
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Active</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           ) : (
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger>
//                   <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange" />
//                 </TooltipTrigger>
//                 <TooltipContent>
//                   <p>Upcoming</p>
//                 </TooltipContent>
//               </Tooltip>
//             </TooltipProvider>
//           )}
//         </div>
//         <Badge 
//           variant="secondary"
//           className="w-fit bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs sm:text-sm mt-2"
//         >
//           {type}
//         </Badge>
//       </CardHeader>
//       <CardContent>
//         <p className="font-bold text-base sm:text-lg">{discount}</p>
//         <p className="text-xs sm:text-sm text-muted-foreground">
//           Valid From: {startDate} - {endDate}
//         </p>
//         <div className="mt-2 flex items-center">
//           <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-400" />
//           <span className="text-xs sm:text-sm text-gray-400">Redemptions: </span>
//           <span className="text-xs sm:text-sm text-purple-600 font-semibold pl-2">{timesRedeemed}</span>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }

function SurveyItem({ name, category, type, completions, location, region }: any) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between">
      <div>
        <p className="font-semibold text-sm sm:text-base">{name}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">{category} | {location} | {region}</p>
      </div>
      <div className="flex items-center space-x-2 mt-1 sm:mt-0">
        <Badge 
          variant="secondary"
          className={`text-xs ${type === 'Free' ? 'bg-green text-white hover:bg-emerald-300 cursor-pointer' : 'bg-gray-200 text-gray-800 hover:bg-gray-300  cursor-pointer'}`}
        >
          {type}
        </Badge>
        <span className="text-xs sm:text-sm">{completions} completions</span>
        <NotepadText className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
      </div>
    </li>
  )
}

function RewardItem({ name, task, type, redemptions, location, region }: any) {
  return (
    <li className="flex flex-col sm:flex-row sm:items-center justify-between">
      <div>
        <p className="font-semibold text-sm sm:text-base">{name}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">{task}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">{location} | {region}</p>
      </div>
      <div className="flex items-center space-x-2 mt-1 sm:mt-0">
        <Badge 
          variant="secondary"
          className={`text-xs ${type === 'Free' ? 'bg-green text-white hover:bg-emerald-300 cursor-pointer' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer'}`}
        >
          {type}
        </Badge>
        <span className="text-xs sm:text-sm">{redemptions} redemptions</span>
        <Gem className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
      </div>
    </li>
  )
}