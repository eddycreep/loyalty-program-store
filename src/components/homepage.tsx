'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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


  return (
    <div className="h-screen bg-gray-100 overflow-y-auto pb-20">
      <main className="py-4 sm:py-6 md:py-8 px-2s sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Loyalty Program Management</h1>
          </header>

          {/* Summary Cards */}
          <div className="gap-4 sm:gap-6 pb-6 sm:pb-8">
            <LoyaltySummaryCards />
          </div>

          {/* Specials Card */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red">Specials</h2>
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

          {/* Rewards Card */}
          <section className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red">Rewards</h2>
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

            {/* Surveys Card */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-red">Surveys</h2>
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