'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, DollarSign, PlusCircle, ShoppingCart, Users, FileText, Gift, Mail, TrendingUp, Gem, BadgeCheck, NotepadText } from 'lucide-react'
import { PercentDiamond, Coins, Coffee } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Homepage() {
  const [activeTab, setActiveTab] = useState("active")

  return (
    <div className="h-screen bg-gray-100 overflow-y-auto pb-20">
      {/* Main content */}
      <main className="py-4 sm:py-6 md:py-8 px-2s sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <header className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Loyalty Program Management</h1>
          </header>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <SummaryCard 
              title="Active Loyalty Members" 
              value="15,234" 
              icon={<Users className="h-5 w-5 sm:h-6 sm:w-6" />} 
              increase={234}
            />
            <SummaryCard 
              title="Total Specials Redeemed" 
              value="45,678" 
              icon={<ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />} 
              increase={1234}
            />
            <SummaryCard 
              title="Rewards Redeemed" 
              value="12,345" 
              icon={<Gift className="h-5 w-5 sm:h-6 sm:w-6" />} 
              increase={543}
            />
            <SummaryCard 
              title="Revenue from Specials" 
              value="$234,567" 
              icon={<DollarSign className="h-5 w-5 sm:h-6 sm:w-6" />} 
              increase={12345}
              isCurrency={true}
            />
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  <SpecialCard
                    type="Normal"
                    name="Summer Fruit Bonanza"
                    discount="20% off"
                    startDate="2023-06-01"
                    endDate="2023-08-31"
                    timesRedeemed={1234}
                    isActive={true}
                    specialType="Percentage"
                  />
                  <SpecialCard
                    type="Combined"
                    name="Back to School Bundle"
                    discount="$10 off"
                    startDate="2023-07-15"
                    endDate="2023-09-15"
                    timesRedeemed={567}
                    isActive={true}
                    specialType="Amount"
                  />
                  <SpecialCard
                    type="Normal"
                    name="Midweek Madness"
                    discount="15% off"
                    startDate="2023-07-01"
                    endDate="2023-09-30"
                    timesRedeemed={892}
                    isActive={true}
                    specialType="Percentage"
                  />
                  <SpecialCard
                    type="Combined"
                    name="Family Movie Night Bundle"
                    discount="$5 off"
                    startDate="2023-08-01"
                    endDate="2023-10-31"
                    timesRedeemed={456}
                    isActive={true}
                    specialType="Amount"
                  />
                  {/* Add more SpecialCards as needed */}
                </div>
              </TabsContent>
              <TabsContent value="upcoming">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  <SpecialCard
                    type="Normal"
                    name="Fall Harvest Special"
                    discount="15% off"
                    startDate="2023-09-01"
                    endDate="2023-11-30"
                    timesRedeemed={0}
                    isActive={false}
                    specialType="Percentage"
                  />
                  <SpecialCard
                    type="Normal"
                    name="Winter Warmers Special"
                    discount="Free Item"
                    startDate="2023-12-01"
                    endDate="2024-02-29"
                    timesRedeemed={0}
                    isActive={false}
                    specialType="Free"
                  />
                  <SpecialCard
                    type="Combined"
                    name="New Year Health Kick"
                    discount="$15 off"
                    startDate="2024-01-01"
                    endDate="2024-03-31"
                    timesRedeemed={0}
                    isActive={false}
                    specialType="Amount"
                  />
                  {/* Add more upcoming SpecialCards as needed */}
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

function SummaryCard({ title, value, icon, increase, isCurrency = false }: any) {
  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-indigo-300 text-indigo-600 rounded-full">
          {React.cloneElement(icon, { className: "h-5 w-5 sm:h-6 sm:w-6 text-red-500" })}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-xl sm:text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-2 text-gray-400 text-xs sm:text-sm">
          <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
          <span>
            {isCurrency ? '+$' : '+'}
            {increase.toLocaleString()} from last month
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function SpecialCard({ type, name, discount, startDate, endDate, timesRedeemed, isActive, specialType }: any) {
  const getSpecialTypeIcon = () => {
    switch (specialType) {
      case 'Percentage':
        return <PercentDiamond className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />;
      case 'Amount':
        return <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />;
      case 'Free':
        return <Coffee className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />; // Changed from text-green-500 to text-purple-500
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CardTitle className="text-base sm:text-lg">{name}</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  {getSpecialTypeIcon()}
                </TooltipTrigger>
                <TooltipContent>
                  <p>{specialType === 'Free' ? 'Free Item' : specialType}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          {isActive ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Active</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upcoming</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        <Badge 
          variant="secondary"
          className="w-fit bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs sm:text-sm mt-2"
        >
          {type}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="font-bold text-base sm:text-lg">{discount}</p>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Valid From: {startDate} - {endDate}
        </p>
        <div className="mt-2 flex items-center">
          <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-gray-400" />
          <span className="text-xs sm:text-sm text-gray-400">Redemptions: </span>
          <span className="text-xs sm:text-sm text-purple-600 font-semibold pl-2">{timesRedeemed}</span>
        </div>
      </CardContent>
    </Card>
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