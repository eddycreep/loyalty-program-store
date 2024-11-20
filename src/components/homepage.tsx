
'use client'

import { useState, useEffect } from 'react'
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Gem, NotepadText } from 'lucide-react'
import { apiEndPoint } from '@/utils/colors'

import { LoyaltySummaryCards } from '@/components/loyalty-summary-cards'
import { ActiveSpecialCards } from '@/modules/home/components/specials/active-specials-card'
import { UpcomingSpecialCards } from '@/modules/home/components/specials/upcoming-specials-card'

import { ActiveRewardsCards } from '@/modules/home/components/rewards/active-rewards-card'
import { UpcomingRewardsCards } from '@/modules/home/components/rewards/upcoming-rewards-cards'

import { ActiveSurveyCards } from '@/modules/home/components/surveys/active-surveys-card'
import { UpcomingSurveyCards } from '@/modules/home/components/surveys/upcoming-surveys-card'



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
  const [activeRewardsTab, setActiveRewardsTab] = useState("active-rewards")

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
          {/* <section>
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
                    <ActiveRewardsCard />
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section> */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Rewards</h2>
            <Tabs defaultValue="active-rewards" onValueChange={setActiveRewardsTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="active-rewards">Active Rewards</TabsTrigger>
                <TabsTrigger value="upcoming-rewards">Upcoming Rewards</TabsTrigger>
              </TabsList>
              <TabsContent value="active-rewards">
                <div className="w-full">
                  <ActiveRewardsCards />
                </div>
              </TabsContent>
              <TabsContent value="upcoming-rewards">
                <div className="w-full">
                  <UpcomingRewardsCards />
                </div>
              </TabsContent>
            </Tabs>
          </section>

            {/* Surveys and Rewards Section */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Surveys</h2>
              <Tabs defaultValue="active-surveys" onValueChange={setActiveRewardsTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="active-surveys">Active Surveys</TabsTrigger>
                  <TabsTrigger value="upcoming-surveys">Upcoming Surveys</TabsTrigger>
                </TabsList>
                <TabsContent value="active-surveys">
                  <div className="w-full">
                    <ActiveSurveyCards />
                  </div>
                </TabsContent>
                <TabsContent value="upcoming-surveys">
                  <div className="w-full">
                    <UpcomingSurveyCards />
                  </div>
                </TabsContent>
              </Tabs>
          </section>
        </div>
      </main>
    </div>
  )
}

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