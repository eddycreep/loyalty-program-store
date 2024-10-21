"use clients"

import React from "react";
import { Apple, Coffee, Milk, DollarSign, ShoppingBag, Carrot, UtensilsCrossed, Leaf, CreditCard, Users, Percent } from "lucide-react"
import { Badge } from "@/components/ui/badge"


interface Survey {
  id: number
  title: string
  description: string
  completions: number
  type: 'Percentage' | 'Amount'
  icon: React.ElementType
}

interface Reward {
  id: number
  title: string
  description: string
  redemptions: number
  type: 'Percentage' | 'Amount'
  icon: React.ElementType
}

const activeSurveys: Survey[] = [
  { id: 1, title: "Fresh Produce Satisfaction", description: "Rate the quality of our fruits and vegetables", completions: 150, type: "Percentage", icon: Carrot },
  { id: 2, title: "Deli Counter Feedback", description: "Share your thoughts on our deli offerings", completions: 75, type: "Amount", icon: UtensilsCrossed },
  { id: 3, title: "Organic Section Experience", description: "Help us improve our organic food selection", completions: 100, type: "Percentage", icon: Leaf },
  { id: 4, title: "Checkout Process Evaluation", description: "Rate your experience at our checkout counters", completions: 200, type: "Amount", icon: CreditCard },
  { id: 5, title: "Weekly Specials Feedback", description: "Tell us about your experience with our weekly deals", completions: 125, type: "Percentage", icon: Percent },
]

const activeRewards: Reward[] = [
  { id: 1, title: "10% Off Fresh Produce", description: "Get 10% off your next fresh produce purchase", redemptions: 320, type: "Percentage", icon: Apple },
  { id: 2, title: "Free Bakery Item", description: "Enjoy a free item from our in-store bakery", redemptions: 185, type: "Amount", icon: Coffee },
  { id: 3, title: "Double Points on Dairy", description: "Earn double points on all dairy products", redemptions: 250, type: "Percentage", icon: Milk },
  { id: 4, title: "$5 Off $50 Purchase", description: "Save $5 when you spend $50 or more", redemptions: 400, type: "Amount", icon: DollarSign },
  { id: 5, title: "Buy One Get One Free - Store Brand", description: "BOGO on any store brand item", redemptions: 275, type: "Percentage", icon: ShoppingBag },
]

export default function EngagementMetrics() {
  return (
    <div className="min-h-screen">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Active Rewards Section */}
          <div>
            <h2 className="text-2xl font-semibold text-red mb-6">Active Rewards</h2>
            <div className="space-y-6">
              {activeRewards.map((reward) => (
                <div
                  key={reward.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {React.createElement(reward.icon, { className: "text-gray-500 mr-2", size: 24 })}
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{reward.title}</h3>
                    </div>
                    <Badge variant="secondary" className="bg-green text-emerald-800">
                      {reward.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{reward.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="mr-1" size={16} />
                    <span>{reward.redemptions} customers redeemed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Surveys Section */}
          <div>
            <h2 className="text-2xl font-semibold text-red mb-6">Active Surveys</h2>
            <div className="space-y-6">
              {activeSurveys.map((survey) => (
                <div
                  key={survey.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      {React.createElement(survey.icon, { className: "text-gray-500 mr-2", size: 24 })}
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">{survey.title}</h3>
                    </div>
                    <Badge variant="secondary" className="bg-blue text-cyan-900 dark:bg-blue-800 dark:text-blue-100">
                      {survey.type}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">{survey.description}</p>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Users className="mr-1" size={16} />
                    <span>{survey.completions} customers completed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}