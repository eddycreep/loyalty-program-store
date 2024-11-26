"use client"

import React, { useState } from 'react'
import { Award, ShoppingCart, Tag, Calendar, MessageSquare, Users, Repeat, Trophy, Cake, PartyPopper, Clock, ChevronDown, ChevronUp, Star, Percent, Gift, Zap } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import "../../../styles/loyalty-program-tiers.css"

const tiers = [
  {
    name: "Starter Savers",
    icon: Star,
    color: "text-yellow-600",
    eligibility: "R50–R199/month",
    rewards: [
      "Free snack bundle on birthday",
      "Early access to seasonal collections"
    ],
    discounts: [
      "5% off on snacks/beverages",
      "Buy 2 get 1 free on select school supplies",
      "10% off holiday-themed bundles"
    ],
    combinedSpecials: [
      "Snack Pack Special: Buy a sandwich and get 50% off a drink"
    ]
  },
  {
    name: "Smart Shoppers",
    icon: ShoppingCart,
    color: "text-green-600",
    eligibility: "R200–R499/month",
    rewards: [
      "Free item for every R300 spent in a month",
      "Premium supply kit free with R100+ purchases in August"
    ],
    discounts: [
      "10% off snacks/school supplies",
      "15% cart discount during seasonal events"
    ],
    combinedSpecials: [
      "Stationery Bundle: 20% off when buying a backpack and any 3 stationery items"
    ]
  },
  {
    name: "Premier Collectors",
    icon: Award,
    color: "text-purple-600",
    eligibility: "R500+/month",
    rewards: [
      "Monthly product samples",
      "Free holiday bundles on R150+ purchases",
      "Special occasion premium gifts"
    ],
    discounts: [
      "15% off across all categories",
      "Free delivery and 20% off orders over R100"
    ],
    combinedSpecials: [
      "Tech Boost: 25% off a calculator when purchasing any textbook"
    ]
  },
  {
    name: "Elite Enthusiasts",
    icon: Trophy,
    color: "text-red-600",
    eligibility: "Invitation-only",
    rewards: [
      "VIP event invitations",
      "Monthly exclusive item gifts",
      "Priority access to limited/sold-out products",
      "R25 gift card every 6 months of continuous engagement"
    ],
    discounts: [
      "25% off exclusive items",
      "30% off during anniversary sales"
    ],
    combinedSpecials: [
      "Luxury Learning: 40% off premium stationery when spending R500+ on textbooks"
    ]
  }
]

const upgradeMethods = [
  {
    icon: ShoppingCart,
    color: "text-blue-500",
    title: "Increase Spending",
    description: "Spend more within a calendar month to move up."
  },
  {
    icon: Tag,
    color: "text-green-500",
    title: "Purchase Specials",
    description: "Buy limited-time promotional items consistently."
  },
  {
    icon: Calendar,
    color: "text-red-500",
    title: "Engage During Holidays",
    description: "Take advantage of seasonal offers and exclusive deals."
  },
  {
    icon: MessageSquare,
    color: "text-purple-500",
    title: "Survey Participation",
    description: "Complete feedback surveys to unlock bonus invites or upgrades."
  },
  {
    icon: Users,
    color: "text-yellow-500",
    title: "Referral Bonuses",
    description: "Refer new customers to the program for tier upgrade credits."
  },
  {
    icon: Repeat,
    color: "text-indigo-500",
    title: "Frequent Visits",
    description: "Make multiple purchases in a month (minimum 3 purchases) rather than one large purchase."
  },
  {
    icon: Trophy,
    color: "text-orange-500",
    title: "Loyalty Challenges",
    description: "Participate in challenges (e.g., spend R300 in 30 days) for an instant boost."
  },
  {
    icon: Cake,
    color: "text-pink-500",
    title: "Anniversary Shopping",
    description: "Shop during the anniversary sales for double benefits toward tier progress."
  },
  {
    icon: PartyPopper,
    color: "text-teal-500",
    title: "Event Participation",
    description: "Join in-store or online events, like back-to-school workshops or tasting sessions."
  },
  {
    icon: Clock,
    color: "text-gray-500",
    title: "Continuous Membership",
    description: "Stay active for a specified period (e.g., no inactive months for 6 months)."
  }
]

function UpgradeMethodCard({ icon: Icon, color, title, description }: any) {
  return (
    <Card className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
      <CardContent className="flex flex-col items-center p-6 text-center">
        <Icon className={`w-12 h-12 mb-4 ${color}`} />
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function TierRow({ tier, isOpen, toggleOpen }: any) {
  const IconComponent = tier.icon

  return (
    <React.Fragment>
      <TableRow className="border-b border-gray-200 hover:bg-gray-50">
        <TableCell className="py-4">
          <Button
            variant="ghost"
            onClick={toggleOpen}
            className="p-0 hover:bg-transparent"
            aria-label={isOpen ? "Collapse tier details" : "Expand tier details"}
          >
            {isOpen ? <ChevronUp className="h-4 w-4 mr-2" /> : <ChevronDown className="h-4 w-4 mr-2" />}
          </Button>
          <IconComponent className={`inline-block w-6 h-6 mr-2 ${tier.color}`} />
          <span className={`font-semibold ${tier.color}`}>{tier.name}</span>
        </TableCell>
        <TableCell className="text-center">{tier.eligibility}</TableCell>
        <TableCell className="hidden md:table-cell">
          <ul className="list-disc pl-5">
            {tier.rewards.map((reward: string, index: number) => (
              <li key={index}>{reward}</li>
            ))}
            {tier.rewards.length > 2 && <li>...</li>}
          </ul>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <ul className="list-disc pl-5">
            {tier.discounts.map((discount: string, index: number) => (
              <li key={index}>{discount}</li>
            ))}
            {tier.discounts.length > 2 && <li>...</li>}
          </ul>
        </TableCell>
      </TableRow>
      {isOpen && (
        <TableRow className="bg-gray-50">
          <TableCell colSpan={4} className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Gift className="w-5 h-5 mr-2" />
                  Rewards
                </h4>
                <ul className="list-disc pl-5">
                {tier.rewards.map((reward: string, index: number) => (
      <li key={index}>{reward}</li>
    ))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center">
                  <Percent className="w-5 h-5 mr-2" />
                  Discounts
                </h4>
                <ul className="list-disc pl-5">
                {tier.discounts.map((discount: string, index: number) => (
      <li key={index}>{discount}</li>
    ))}
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <h4 className="font-semibold mb-2 flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Combined Specials
              </h4>
              <ul className="list-disc pl-5">
              {tier.combinedSpecials.map((special: string, index: number) => (
    <li key={index}>{special}</li>
  ))}
              </ul>
            </div>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  )
}

export default function LoyaltyProgramTiers() {
  const [openTiers, setOpenTiers] = useState<Record<string, boolean>>({});


  const toggleTier = (tierName: string) => {
    setOpenTiers(prev => ({ ...prev, [tierName]: !prev[tierName] }));
  };
  

  return (
    <TooltipProvider>
      <div className="container mx-auto px-4 py-8">
        <Card className="bg-white shadow-lg mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-gray-800 mb-2">Loyalty Tiers</CardTitle>
            <CardDescription className="text-lg text-gray-600 mb-4">
              Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!
            </CardDescription>
            <Award className="w-16 h-16 mx-auto text-primary" />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Tier</TableHead>
                    <TableHead className="text-center">Eligibility</TableHead>
                    <TableHead className="hidden md:table-cell">Rewards</TableHead>
                    <TableHead className="hidden md:table-cell">Discounts</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tiers.map((tier) => (
                    <TierRow
                      key={tier.name}
                      tier={tier}
                      isOpen={openTiers[tier.name]}
                      toggleOpen={() => toggleTier(tier.name)}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">Boost Your Tier Status</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Discover exciting ways to climb the loyalty ladder and unlock premium rewards!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upgradeMethods.map((method, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <UpgradeMethodCard {...method} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{method.description}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}