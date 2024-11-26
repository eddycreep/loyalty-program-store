import { Award, Star, Zap, Crown, Gift, ShoppingCart, Tag, Calendar, MessageSquare, Users, Repeat, Trophy, Cake, PartyPopper, Rocket, Clock, WalletCards, ShoppingBag, ShoppingBasket } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import "../styles/loyalty-program-tiers.css"
import { apiEndPoint, colors } from '@/utils/colors'

const tiers = [
  {
    name: "Starter Savers",
    icon: ShoppingBasket,
    eligibility: "R50–R199/month",
    discounts: [
      "5% off on snacks/beverages",
      "10% off holiday-themed bundles",
      "Snack Pack Special: Buy a sandwich and get 50% off a drink"
    ],
    rewards: [
      '"Buy 2 get 1 free" on select school supplies',
      "Birthday perk: Free snack bundle (choose from 3)",
      "Seasonal perk: Special themed stationery set"
    ]
  },
  {
    name: "Smart Shoppers",
    icon: ShoppingBag,
    eligibility: "R200–R499/month",
    discounts: [
      "10% off snacks/school supplies",
      "15% cart discount during seasonal events",
      "Lunch Combo: 20% off when buying a meal deal with a fruit snack"
    ],
    rewards: [
      "Early-bird promotions access",
      "Free item for every R300 spent in a month",
      "Back-to-School special: Premium supply kit free with R100+ purchases in January"
    ]
  },
  {
    name: "Premier Collectors",
    icon: Crown,
    eligibility: "R500+/month",
    discounts: [
      "15% off across all categories",
      "20% off orders over R100",
      "Study Boost: 25% off when buying any textbook with a pack of highlighters"
    ],
    rewards: [
      "Monthly product samples (new snacks/limited-edition supplies)",
      "Free holiday bundles on R150+ purchases",
      "Free delivery on all orders",
      "Special occasion gift: Premium items"
    ]
  },
  {
    name: "Elite Enthusiasts",
    icon: WalletCards,
    eligibility: "Invitation-only",
    discounts: [
      "25% off exclusive items",
      "30% off during VIP shopping events",
      "Luxury Learning: 40% off when purchasing a premium backpack with any electronic device"
    ],
    rewards: [
      "VIP event invitations",
      "Monthly exclusive item gifts",
      "Priority access to limited/sold-out products",
      "Thank-you bonus: R25 gift card every 6 months of continuous engagement"
    ]
  }
]

const upgradeMethods = [
  {
    icon: ShoppingCart,
    color: "text-blue",
    title: "Increase Spending",
    description: "Spend more within a calendar month to move up."
  },
  {
    icon: Tag,
    color: "text-green",
    title: "Purchase Specials",
    description: "Buy limited-time promotional items consistently."
  },
  {
    icon: Calendar,
    color: "text-red",
    title: "Engage During Holidays",
    description: "Take advantage of seasonal offers and exclusive deals."
  },
  {
    icon: MessageSquare,
    color: "text-purple",
    title: "Survey Participation",
    description: "Complete feedback surveys to unlock bonus invites or upgrades."
  },
  {
    icon: ShoppingCart,
    color: "text-yellow",
    title: "Bundle Purchases",
    description: "Buy bundled snacks or school supplies frequently."
  },
  {
    icon: Users,
    color: "text-purple",
    title: "Referral Bonuses",
    description: "Refer new customers to the program for tier upgrade credits."
  },
  {
    icon: Repeat,
    color: "text-cyan-400",
    title: "Frequent Visits",
    description: "Make multiple purchases in a month rather than one large purchase."
  },
  {
    icon: Trophy,
    color: "text-orange",
    title: "Loyalty Challenges",
    description: "Participate in challenges (e.g., spend $300 in 30 days) for an instant boost."
  },
  {
    icon: Cake,
    color: "text-pink-500",
    title: "Anniversary Shopping",
    description: "Shop during the anniversary sales for double benefits toward tier progress."
  },
  {
    icon: PartyPopper,
    color: "text-teal-400",
    title: "Event Participation",
    description: "Join in-store or online events, like back-to-school workshops or tasting sessions."
  },
  {
    icon: Rocket,
    color: "text-green",
    title: "First-to-Market",
    description: "Be among the first to purchase newly launched snacks or supplies."
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

export default function LoyaltyProgramTiers() {
  return (
    <div className=" py-8">
      {/* <Award className="w-16 h-16 mx-auto text-primary" /> */}
      <Card className="bg-white shadow-lg mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-red mb-2">Loyalty Tiers</CardTitle>
          <CardDescription className="text-lg text-gray-600 mb-4">
            Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!
          </CardDescription>
          {/* <Award className="w-16 h-16 mx-auto text-primary" /> */}
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="w-full border">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-[150px] py-4 text-center text-gray-600">Tier</TableHead>
                  <TableHead className="w-[150px] py-4 text-center text-gray-600">Eligibility</TableHead>
                  <TableHead className="py-4 text-center text-gray-600">Discounts</TableHead>
                  <TableHead className="py-4 text-center text-gray-600">Rewards</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tiers.map((tier, index) => (
                  <TableRow key={tier.name} className="bg-white text-black">
                    <TableCell className="font-medium py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <tier.icon className={`w-6 h-6 ${
                          tier.name === "Starter Savers" ? "text-blue" :
                            tier.name === "Smart Shoppers" ? "text-green" :
                              tier.name === "Premier Collectors" ? "text-purple" :
                                tier.name === "Elite Enthusiasts" ? "text-pink-500" :
                                  "text-gray-500"
                        }`} />
                        <span className="text-base">{tier.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">{tier.eligibility}</TableCell>
                    <TableCell className="py-4 text-left">
                      <ul className="list-disc list-inside text-left">
                        {tier.discounts.map((discount, i) => (
                          <li key={i} className="text-sm mb-1">{discount}</li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="py-4 text-left">
                      <ul className="list-disc list-inside text-left">
                        {tier.rewards.map((reward, i) => (
                          <li key={i} className="text-sm mb-1">{reward}</li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red mb-2">Boost Your Tier Status</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Discover exciting ways to climb the loyalty ladder and unlock premium rewards!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {upgradeMethods.map((method, index) => (
              <UpgradeMethodCard key={index} {...method} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

