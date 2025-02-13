"use client"

import React from "react";
import axios from "axios"
import { useState, useEffect } from "react"
import { Crown, ShoppingCart, Tag, Calendar, MessageSquare, Users, Repeat, Trophy, Cake, PartyPopper, Rocket, Clock, WalletCards, ShoppingBag, ShoppingBasket, ChefHat, Coins, Star, Edit, Trash2, XOctagon, ShieldAlert,  } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import "../styles/loyalty-program-tiers.css"
import { apiEndPoint, colors } from '@/utils/colors'
import { AddNewTiers } from "@/modules/admin/loyalty-tiers/add-new-tiers"
import { DeleteTierConfirmation } from "./component/delete-tier-confirmation";
import { TierInfo, TierInfoResponse, LoyaltyTiersProps, LoyaltyTiersResponse } from '@/modules/types/tiers/data-types';
import { EditTiers } from "@/modules/admin/loyalty-tiers/edit-tiers"
import { DeleteAlternativeRewardConfirmation } from "./component/delete-alternative-reward-confirmation";
import { AddNewAlternativeReward } from "@/modules/admin/rewards/add-alternative-reward";
import { AlternativeRewardProps, AlternativeRewardResponse } from "@/modules/types/alternative-reward/alternative-reward.data-types";
import { AlternativeRewardCard } from "@/modules/admin/rewards/alternative-reward-card"
import SquareCircleLoader from "@/lib/square-circle-loader";

// const upgradeMethods = [
//   {
//     icon: ShoppingCart,
//     color: "text-blue",
//     title: "Increase Spending",
//     description: "Spend more within a calendar month to move up."
//   },
//   {
//     icon: Tag,
//     color: "text-green",
//     title: "Purchase Specials",
//     description: "Buy limited-time promotional items consistently."
//   },
//   {
//     icon: Calendar,
//     color: "text-red",
//     title: "Engage During Holidays",
//     description: "Take advantage of seasonal offers and exclusive deals."
//   },
//   {
//     icon: MessageSquare,
//     color: "text-purple",
//     title: "Survey Participation",
//     description: "Complete feedback surveys to unlock bonus invites or upgrades."
//   },
//   {
//     icon: ShoppingCart,
//     color: "text-yellow",
//     title: "Bundle Purchases",
//     description: "Buy bundled snacks or school supplies frequently."
//   },
//   {
//     icon: Users,
//     color: "text-purple",
//     title: "Referral Bonuses",
//     description: "Refer new customers to the program for tier upgrade credits."
//   },
//   {
//     icon: Repeat,
//     color: "text-cyan-400",
//     title: "Frequent Visits",
//     description: "Make multiple purchases in a month rather than one large purchase."
//   },
//   {
//     icon: Trophy,
//     color: "text-orange",
//     title: "Loyalty Challenges",
//     description: "Participate in challenges (e.g., spend $300 in 30 days) for an instant boost."
//   },
//   {
//     icon: Cake,
//     color: "text-pink-500",
//     title: "Anniversary Shopping",
//     description: "Shop during the anniversary sales for double benefits toward tier progress."
//   },
//   {
//     icon: PartyPopper,
//     color: "text-teal-400",
//     title: "Event Participation",
//     description: "Join in-store or online events, like back-to-school workshops or tasting sessions."
//   },
//   {
//     icon: Rocket,
//     color: "text-green",
//     title: "First-to-Market",
//     description: "Be among the first to purchase newly launched snacks or supplies."
//   },
//   {
//     icon: Clock,
//     color: "text-gray-500",
//     title: "Continuous Membership",
//     description: "Stay active for a specified period (e.g., no inactive months for 6 months)."
//   }
// ]

const icons = [
  { id: 1, icon: ShoppingBasket, color: "text-blue" },
  { id: 2, icon: ShoppingBag, color: "text-green" },
  { id: 3, icon: Crown, color: "text-purple" },
  { id: 4, icon: WalletCards, color: "text-pink-500" },
  { id: 5, icon: ChefHat, color: "text-orange" },
  { id: 6, icon: Coins, color: "text-cyan-400" },
  { id: 7, icon: Star, color: "text-teal-400" }
]

interface TiersProps {
    tier_id: number;
    tier: string;
    eligibility: string;
    rewards: string;
    discounts: string;
    min_spending_amount: number;
    max_spending_amount: number;
}
type TiersResponse = TiersProps[];

// function UpgradeMethodCard({ icon: Icon, color, title, description }: any) {
//   const [loading, setLoading] = useState(false);
//   const [isError, setIsError] = useState(false);
//   const [editRewardPopup, setEditRewardPopup] = useState(false);
//   const [deletePopUp, setDeletePopUp] = useState(false);

//   const [rewardID, setSelectedRewardID] = useState(0);
//   const [rewardTitle, setSelectedRewardTitle] = useState('');

//   const [ARData, setARData] = useState<AlternativeRewardResponse>([]);
//   const [selectedReward, setSelectedReward] = useState<AlternativeRewardProps | null>(null);

//   const getAlternativeRewards = async () => {
//     setLoading(true);

//     try {
//       const url = `rewards/get-all-alternative-rewards`
//       const response = await axios.get<AlternativeRewardResponse>(`${apiEndPoint}/${url}`)
//       console.log('alternative: ', response)
//       setARData(response.data);
//       setLoading(false);

//     } catch (error) {
//       console.log('error: ', error);
//       setIsError(true);
//     }
//   }


//   const handleEditReward = (rewardId: any) => {
//     const selected = ARData.find((item) => item.reward_id === rewardId) || null;
    
//     if (selected) {
//         setSelectedReward(selected);
//         setEditRewardPopup(true);
        
//     } else {
//         console.log("No selected Tier, sumn wrong with the code my nigga:" + selected);
//     }
//   }; 

//   const closeEditRewardPopup = () => {
//     setEditRewardPopup(false);
// }

//   const toggleRewardDeletePage = (rewardId: number, rewardTitle: string) => {
//     setDeletePopUp(!deletePopUp);
//     setSelectedRewardID(rewardId)
//     setSelectedRewardTitle(rewardTitle)
//   };

//   useEffect(()=> {
//     getAlternativeRewards();
//   }, [])

//   return (
//     <div>
//       {deletePopUp && (<DeleteAlternativeRewardConfirmation arID={ rewardID } arTitle={ rewardTitle } isOpen={ deletePopUp } onClose={ toggleRewardDeletePage } /> )}
//       <div className="gap-y-2">
//         {ARData?.map(({ reward_id, reward_title, description, reward, reward_type, reward_price, start_date, expiry_date, loyalty_tier, age_group, isActive }) => (
//           <Card key={reward_id} className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg relative">
//             <CardContent className="flex flex-col items-center p-6 text-center">
//               <div className="absolute top-4 right-4 flex gap-2">
//                 <button onClick={() => handleEditReward(reward_id)} className="flex items-center justify-center bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 w-7 h-7 rounded-lg">
//                   <Edit />
//                 </button>
//                 <button onClick={() => toggleRewardDeletePage(reward_id, reward_title)} className="flex items-center justify-center bg-white text-red border border-red hover:bg-rose-100 p-1 w-7 h-7 rounded-lg">
//                   <Trash2 />
//                 </button>
//               </div>
//               <Icon className={`w-12 h-12 mb-4 ${color}`} />
//               <h3 className="text-lg font-semibold mb-2">{reward_title}</h3>
//               <p className="text-sm text-muted-foreground">{description}</p>
//             </CardContent>
//           </Card>
//           ))}
//         </div>
//     </div>
//   )
// }

export default function LoyaltyProgramTiers() {
  const [addTiersPopUp, setTiersPopUp] = useState(false);
  const [addARPopUp, setARPopUp] = useState(false);
  const [editTiersPopup, setEditTiersPopup] = useState(false);
  const [deletePopUp, setDeletePopUp] = useState(false);

  const [tierID, setSelectedTierID] = useState(0);
  const [tierTitle, setSelectedTierTitle] = useState('');

  const [tiersData, setTiersData] = useState<TiersResponse>([]);
  const [selectedTier, setSelectedTier] = useState<LoyaltyTiersProps | null>(null);

  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const getTiers = async () => {
    setLoading(true);

    try {
      const url = `tiers/get-loyalty-tiers`
      const response = await axios.get<TiersResponse>(`${apiEndPoint}/${url}`)
      setTiersData(response.data);
      setLoading(false);

    } catch (error) {
      console.log('error: ', error);
      setIsError(true);
    }
  }

  const toggleAddTiers = () => {
    setTiersPopUp(!addTiersPopUp);
  }

  const toggleAddAR = () => {
    setARPopUp(!addARPopUp);
  }

  const handleEditTier = (tierId: any) => {
    const selected = tiersData.find((item) => item.tier_id === tierId) || null;
    
    if (selected) {
        setSelectedTier(selected);
        setEditTiersPopup(true);
        
    } else {
        console.log("No selected Tier, sumn wrong with the code my nigga:" + selected);
    }
  }; 

  const closeEditTiersPopup = () => {
      setEditTiersPopup(false);
  }

  const toggleTierDeletePage = (tierId: number, tierTitle: string) => {
    setDeletePopUp(!deletePopUp);
    setSelectedTierID(tierId)
    setSelectedTierTitle(tierTitle)
  };
  //   setDeleteARPopUp(!deleteARPopUp);
  //   setSelectedARID(alternativeRewardId)
  //   setSelectedARTitle(alternativeRewardTitle)
  // };

  useEffect(() => {
    getTiers();
  }, [])


  if (loading) {
    return (
        <div className=" py-8">
          <Card className="bg-white shadow-lg mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-purple mb-2">Loyalty Tiers</CardTitle>
              <CardDescription className="text-lg text-gray-600 mb-4">
                  Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='pb-2'>
                  <button onClick={ toggleAddTiers } className="bg-green text-white p-2 w-40 h-10 rounded-lg hover:bg-emerald-300">
                      Add Tier
                  </button>
              </div>
              <div className="overflow-x-auto">
                <Table className="w-full border">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="w-[170px] py-4 text-center text-gray-600">Tier</TableHead>
                      <TableHead className="w-[200px] py-4 text-center text-gray-600">Eligibility</TableHead>
                      <TableHead className="w-[600px] py-4 text-center text-gray-600">Discounts</TableHead>
                      <TableHead className="w-[600px] py-4 text-center text-gray-600">Rewards</TableHead>
                      <TableHead className="w-[110px] py-4 text-center text-gray-600">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <div className="min-h-[200px] w-full flex flex-col items-center justify-center">
                          <SquareCircleLoader />
                          <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple mb-2">Boost Your Tier Status</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Discover exciting ways to climb the loyalty ladder and unlock premium rewards!
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="">
                  <AlternativeRewardCard />
              </div>
            </CardContent>
          </Card>
          {addTiersPopUp && <AddNewTiers onClose={ toggleAddTiers } />}
          {editTiersPopup && <EditTiers onClose={ closeEditTiersPopup } selectedTier={ selectedTier } />}
          {deletePopUp && (<DeleteTierConfirmation tierID={ tierID } tierTitle={ tierTitle } isOpen={ deletePopUp } onClose={ toggleTierDeletePage } /> )}
      </div>
    )
  }


  if (isError) {
    return (
        <div className=" py-8">
          <Card className="bg-white shadow-lg mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-purple mb-2">Loyalty Tiers</CardTitle>
              <CardDescription className="text-lg text-gray-600 mb-4">
                  Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='pb-2'>
                  <button onClick={ toggleAddTiers } className="bg-green text-white p-2 w-40 h-10 rounded-lg hover:bg-emerald-300">
                      Add Tier
                  </button>
              </div>
              <div className="overflow-x-auto">
                <Table className="w-full border">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="w-[170px] py-4 text-center text-gray-600">Tier</TableHead>
                      <TableHead className="w-[200px] py-4 text-center text-gray-600">Eligibility</TableHead>
                      <TableHead className="w-[600px] py-4 text-center text-gray-600">Discounts</TableHead>
                      <TableHead className="w-[600px] py-4 text-center text-gray-600">Rewards</TableHead>
                      <TableHead className="w-[110px] py-4 text-center text-gray-600">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <div className="min-h-[200px] w-full flex flex-col items-center justify-center">
                          <XOctagon size={34} />
                          <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching tiers</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple mb-2">Boost Your Tier Status</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Discover exciting ways to climb the loyalty ladder and unlock premium rewards!
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="">
                  <AlternativeRewardCard />
              </div>
            </CardContent>
          </Card>
          {addTiersPopUp && <AddNewTiers onClose={ toggleAddTiers } />}
          {editTiersPopup && <EditTiers onClose={ closeEditTiersPopup } selectedTier={ selectedTier } />}
          {deletePopUp && (<DeleteTierConfirmation tierID={ tierID } tierTitle={ tierTitle } isOpen={ deletePopUp } onClose={ toggleTierDeletePage } /> )}
      </div>
    )
  }


  if (tiersData.length === 0) {
    return (
        <div className=" py-8">
          <Card className="bg-white shadow-lg mb-8">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold text-purple mb-2">Loyalty Tiers</CardTitle>
              <CardDescription className="text-lg text-gray-600 mb-4">
                  Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='pb-2'>
                  <button onClick={ toggleAddTiers } className="bg-green text-white p-2 w-40 h-10 rounded-lg hover:bg-emerald-300">
                      Add Tier
                  </button>
              </div>
              <div className="overflow-x-auto">
                <Table className="w-full border">
                  <TableHeader>
                    <TableRow className="bg-gray-100">
                      <TableHead className="w-[170px] py-4 text-center text-gray-600">Tier</TableHead>
                      <TableHead className="w-[200px] py-4 text-center text-gray-600">Eligibility</TableHead>
                      <TableHead className="w-[600px] py-4 text-center text-gray-600">Discounts</TableHead>
                      <TableHead className="w-[600px] py-4 text-center text-gray-600">Rewards</TableHead>
                      <TableHead className="w-[110px] py-4 text-center text-gray-600">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <tr>
                      <td colSpan={4}>
                        <div className="flex flex-col items-center justify-center py-10 w-full">
                          <ShieldAlert size={34} />
                          <p className="ml-2 uppercase pt-2 text-green">No tiers have been set. Add new tiers to enhance their experience!</p>
                        </div>
                      </td>
                    </tr>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-purple mb-2">Boost Your Tier Status</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Discover exciting ways to climb the loyalty ladder and unlock premium rewards!
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              <div className="">
                  <AlternativeRewardCard />
              </div>
            </CardContent>
          </Card>
          {addTiersPopUp && <AddNewTiers onClose={ toggleAddTiers } />}
          {editTiersPopup && <EditTiers onClose={ closeEditTiersPopup } selectedTier={ selectedTier } />}
          {deletePopUp && (<DeleteTierConfirmation tierID={ tierID } tierTitle={ tierTitle } isOpen={ deletePopUp } onClose={ toggleTierDeletePage } /> )}
      </div>
    )
  }


  return (
    <div className=" py-8">
      <Card className="bg-white shadow-lg mb-8">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-purple mb-2">Loyalty Tiers</CardTitle>
          <CardDescription className="text-lg text-gray-600 mb-4">
              Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='pb-2'>
              <button onClick={ toggleAddTiers } className="bg-green text-white p-2 w-40 h-10 rounded-lg hover:bg-emerald-300">
                  Add Tier
              </button>
          </div>
          <div className="overflow-x-auto">
            <Table className="w-full border">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="w-[170px] py-4 text-center text-gray-600">Tier</TableHead>
                  <TableHead className="w-[200px] py-4 text-center text-gray-600">Eligibility</TableHead>
                  <TableHead className="w-[600px] py-4 text-center text-gray-600">Discounts</TableHead>
                  <TableHead className="w-[600px] py-4 text-center text-gray-600">Rewards</TableHead>
                  <TableHead className="w-[110px] py-4 text-center text-gray-600">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tiersData.map((tier, index) => (
                  <TableRow key={tier.tier} className="bg-white text-black">
                    <TableCell className="font-medium py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                          {icons[index]?.icon &&
                              React.createElement(icons[index].icon, {
                                className: `w-6 h-6 ${icons[index].color}`,
                              })}
                        <span className="text-base">{tier.tier}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-4 text-center">{tier.eligibility}</TableCell>
                    <TableCell className="py-4 text-left">
                      {/* <ul className="list-disc list-inside text-left">
                        {tier.discounts.map((discount, i) => (
                          <li key={i} className="text-sm mb-1">{tier.discounts}</li>
                        ))}
                      </ul> */}
                      <span className="text-base">{tier.discounts}</span>
                    </TableCell>
                    <TableCell className="py-4 text-left">
                      {/* <ul className="list-disc list-inside text-left">
                        {tier.rewards.map((reward, i) => (
                          <li key={i} className="text-sm mb-1">{reward}</li>
                        ))}
                      </ul> */}
                      <span className="text-base">{tier.rewards}</span>
                    </TableCell>
                    <TableCell className="py-4 text-left">
                      <div>
                        <div className="flex gap-2">
                          <button onClick={() => handleEditTier(tier.tier_id)} className="flex items-center justify-center bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 w-10 h-10 rounded-lg">
                            <Edit />
                          </button>
                          <button onClick={() => toggleTierDeletePage(tier.tier_id, tier.tier)} className="flex items-center justify-center bg-white text-red border border-red hover:bg-rose-100 p-1 w-10 h-10 rounded-lg">
                            <Trash2 />
                          </button>
                        </div>
                      </div>
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
          <CardTitle className="text-2xl font-bold text-purple mb-2">Boost Your Tier Status</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Discover exciting ways to climb the loyalty ladder and unlock premium rewards!
          </CardDescription>
        </CardHeader>
        <CardContent>
            <div className='pb-2'>
                <button onClick={ toggleAddAR } className="bg-green text-white p-2 w-52 h-10 rounded-lg hover:bg-emerald-300">
                    Add Alternative Reward
                </button>
            </div>
              <AlternativeRewardCard />
        </CardContent>
      </Card>
      {addTiersPopUp && <AddNewTiers onClose={ toggleAddTiers } />}
      {editTiersPopup && <EditTiers onClose={ closeEditTiersPopup } selectedTier={ selectedTier } />}
      {deletePopUp && (<DeleteTierConfirmation tierID={ tierID } tierTitle={ tierTitle } isOpen={ deletePopUp } onClose={ toggleTierDeletePage } /> )}
      {addARPopUp && <AddNewAlternativeReward onClose={ toggleAddAR } />}
    </div>
  )
}