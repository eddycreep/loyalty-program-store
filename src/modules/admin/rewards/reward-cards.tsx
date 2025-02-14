'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, ShoppingCart, TrendingUp, TrendingDown, Star, User, Store, Popcorn } from 'lucide-react'

// Dummy data for rewards engagement
const rewardsEngagementData = {
  commonRewards: [
    { title: "Free Coffee", engagement: "Most Redeemed" },
    { title: "10% Off", engagement: "Frequently Redeemed" },
    { title: "Free Birthday Item", engagement: "Popular for Birthdays" },
  ],
  commonSurveys: [
    { title: "Product Survey", completionRate: "High" },
    { title: "Store Feedback", completionRate: "Moderate" },
    { title: "Staff Interaction", completionRate: "Low" },
  ],
  topEngagingStores: [
    { name: "Downtown Market", engagementLevel: "High" },
    { name: "Suburb Supermarket", engagementLevel: "Moderate" },
    { name: "Lakeside Grocery", engagementLevel: "Low" },
  ],
  tierEngagement: {
    gold: "45%",
    diamond: "30%",
    platinum: "25%",
  },
};

export function RewardSummaryCards() {
  const renderSummaryCards = () => {
    const cardData = [
      {
        title: "Common Rewards Redeemed",
        icon: <ShoppingCart className="w-6 h-6 text-green" />,
        content: rewardsEngagementData.commonRewards
          .map(reward => `${reward.title}: ${reward.engagement}`)
          .join("\n"),
      },
      {
        title: "Common Surveys Completed",
        icon: <Star className="w-6 h-6 text-yellow" />,
        content: rewardsEngagementData.commonSurveys
          .map(survey => `${survey.title}: ${survey.completionRate}`)
          .join("\n"),
      },
      {
        title: "Stores with Highest Engagement",
        icon: <Store className="w-6 h-6 text-blue" />,
        content: rewardsEngagementData.topEngagingStores
          .map(store => `${store.name}: ${store.engagementLevel}`)
          .join("\n"),
      },
      {
        title: "Engagement by Loyalty Tier",
        icon: <Award className="w-6 h-6 text-purple" />,
        content: `Start Savers: ${rewardsEngagementData.tierEngagement.gold}\nSmart Shoppers: ${rewardsEngagementData.tierEngagement.diamond}\nPremier Collectors: ${rewardsEngagementData.tierEngagement.platinum}`,
      },
      {
        title: "Common Items Redeemed",
        icon: <Popcorn className="w-6 h-6 text-red" />,
        content: "Coke 2L\nLays\nMaynards",
      },
    ];

    return cardData.map((card, index) => (
      <Card key={index} className="col-span-1 shadow-lg rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 border-b border-gray-200">
          <CardTitle className="text-sm font-bold">{card.title}</CardTitle>
          {card.icon}
        </CardHeader>
        <CardContent className="pt-4">
          <div className="text-xs font-medium text-gray-600 whitespace-pre-line">{card.content}</div>
        </CardContent>
      </Card>
    ));
  }

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {renderSummaryCards()}
      </div>
    </div>
  );
}