"use client"

import React from "react";
import axios from "axios"
import { useState, useEffect } from "react"
import { Crown, WalletCards, ShoppingBag, ShoppingBasket, ChefHat, Coins, Star, Edit, Trash2, XOctagon, ShieldAlert, PlusCircle } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import "../styles/loyalty-program-tiers.css"
import { apiEndPoint } from '@/utils/colors'
import { AddNewTiers } from "@/modules/admin/loyalty-tiers/add-new-tiers"
import { DeleteTierConfirmation } from "./component/delete-tier-confirmation";
import { LoyaltyTiersProps } from '@/modules/types/tiers/data-types';
import { EditTiers } from "@/modules/admin/loyalty-tiers/edit-tiers"
import { AddNewAlternativeReward } from "@/modules/admin/rewards/add-alternative-reward";
import { AlternativeRewardCard } from "@/modules/admin/rewards/alternative-reward-card"
import SquareCircleLoader from "@/lib/square-circle-loader";

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

  const headers = ['Tier', 'Eligibility', 'Discounts', 'Rewards', 'Acton']

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

  useEffect(() => {
    getTiers();
  }, [])

  if (loading) {
    return (
      <div className="pb-14 py-8">
            <div className="flex justify-between">
                <div className="flex flex-col pl-2">
                    <h4 className="text-xl font-semibold text-purple">Loyalty Tiers</h4>
                    <p className="text-gray-400">Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!</p>
                </div>
                <div className='flex gap-2'>
                    <button onClick={ toggleAddTiers } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                        <PlusCircle size={21}/> 
                    </button>
                </div>
            </div>
              <div className="overflow-x-auto pt-4">
                <Table className="w-full border border-gray-200 rounded-lg">
                  <TableHeader>
                    <TableRow className="bg-gray-100 text-black">
                        <TableHead className="w-[170px] py-4 text-center">Tier</TableHead>
                        <TableHead className="w-[200px] py-4 text-center">Eligibility</TableHead>
                        <TableHead className="w-[600px] py-4 text-center">Discounts</TableHead>
                        <TableHead className="w-[600px] py-4 text-center">Rewards</TableHead>
                        <TableHead className="w-[110px] py-4 text-center">Action</TableHead>
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

              <div className="pt-10">
                  <div className="flex justify-between">
                    <div className="flex flex-col pl-2">
                        <h4 className="text-xl font-semibold text-purple">Boost Your Tier Status</h4>
                        <p className="text-gray-400">Discover exciting ways to climb the loyalty ladder and unlock premium rewards!</p>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={ toggleAddAR } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21}/> 
                        </button>
                    </div>
                  </div>
                  <div className="pt-4">
                      <AlternativeRewardCard />
                  </div>
              </div>
        {addTiersPopUp && <AddNewTiers onClose={ toggleAddTiers } />}
        {editTiersPopup && <EditTiers onClose={ closeEditTiersPopup } selectedTier={ selectedTier } />}
        {deletePopUp && (<DeleteTierConfirmation tierID={ tierID } tierTitle={ tierTitle } isOpen={ deletePopUp } onClose={ toggleTierDeletePage } /> )}
        {addARPopUp && <AddNewAlternativeReward onClose={ toggleAddAR } />}
      </div>
    )
  }


  if (isError) {
    return (
      <div className="pb-14 py-8">
            <div className="flex justify-between">
                <div className="flex flex-col pl-2">
                    <h4 className="text-xl font-semibold text-purple">Loyalty Tiers</h4>
                    <p className="text-gray-400">Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!</p>
                </div>
                <div className='flex gap-2'>
                    <button onClick={ toggleAddTiers } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                        <PlusCircle size={21}/> 
                    </button>
                </div>
            </div>
              <div className="overflow-x-auto pt-4">
                <Table className="w-full border border-gray-200 rounded-lg">
                  <TableHeader>
                    <TableRow className="bg-gray-100 text-black">
                        <TableHead className="w-[170px] py-4 text-center">Tier</TableHead>
                        <TableHead className="w-[200px] py-4 text-center">Eligibility</TableHead>
                        <TableHead className="w-[600px] py-4 text-center">Discounts</TableHead>
                        <TableHead className="w-[600px] py-4 text-center">Rewards</TableHead>
                        <TableHead className="w-[110px] py-4 text-center">Action</TableHead>
                      </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        <div className="min-h-[200px] w-full flex flex-col items-center justify-center">
                          <XOctagon size={34} className="text-black" />
                          <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching tiers</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="pt-10">
                  <div className="flex justify-between">
                    <div className="flex flex-col pl-2">
                        <h4 className="text-xl font-semibold text-purple">Boost Your Tier Status</h4>
                        <p className="text-gray-400">Discover exciting ways to climb the loyalty ladder and unlock premium rewards!</p>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={ toggleAddAR } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21}/> 
                        </button>
                    </div>
                  </div>
                  <div className="pt-4">
                      <AlternativeRewardCard />
                  </div>
              </div>
        {addTiersPopUp && <AddNewTiers onClose={ toggleAddTiers } />}
        {editTiersPopup && <EditTiers onClose={ closeEditTiersPopup } selectedTier={ selectedTier } />}
        {deletePopUp && (<DeleteTierConfirmation tierID={ tierID } tierTitle={ tierTitle } isOpen={ deletePopUp } onClose={ toggleTierDeletePage } /> )}
        {addARPopUp && <AddNewAlternativeReward onClose={ toggleAddAR } />}
      </div>
    )
  }


  if (tiersData.length === 0) {
    return (
      <div className="pb-14 py-8">
            <div className="flex justify-between">
                <div className="flex flex-col pl-2">
                    <h4 className="text-xl font-semibold text-purple">Loyalty Tiers</h4>
                    <p className="text-gray-400">Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!</p>
                </div>
                <div className='flex gap-2'>
                    <button onClick={ toggleAddTiers } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                        <PlusCircle size={21}/> 
                    </button>
                </div>
            </div>
              <div className="min-w-[800px]">
                <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className="text-xs uppercase flex-1 text-center">
                            {header}
                        </p>
                    ))}
                  </div>
                  <div className="min-h-[200px] w-full flex flex-col items-center justify-center">
                      <ShieldAlert size={44} className="text-black" />
                      <p className="ml-2 uppercase pt-2 text-green">No rewards have been set for customers. Add new rewards to enhance their experience!</p>
                  </div>
                </div>

              <div className="pt-10">
                  <div className="flex justify-between">
                    <div className="flex flex-col pl-2">
                        <h4 className="text-xl font-semibold text-purple">Boost Your Tier Status</h4>
                        <p className="text-gray-400">Discover exciting ways to climb the loyalty ladder and unlock premium rewards!</p>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={ toggleAddAR } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21}/> 
                        </button>
                    </div>
                  </div>
                  <div className="pt-4">
                      <AlternativeRewardCard />
                  </div>
              </div>
        {addTiersPopUp && <AddNewTiers onClose={ toggleAddTiers } />}
        {editTiersPopup && <EditTiers onClose={ closeEditTiersPopup } selectedTier={ selectedTier } />}
        {deletePopUp && (<DeleteTierConfirmation tierID={ tierID } tierTitle={ tierTitle } isOpen={ deletePopUp } onClose={ toggleTierDeletePage } /> )}
        {addARPopUp && <AddNewAlternativeReward onClose={ toggleAddAR } />}
      </div>
    )
  }


  return (
    <div className="pb-14 py-8 px-2">
            <div className="flex justify-between">
                <div className="flex flex-col pl-2">
                    <h4 className="text-xl font-semibold text-purple">Loyalty Tiers</h4>
                    <p className="text-gray-400">Unlock exclusive rewards and benefits as you climb our loyalty tiers. The more you engage, the more you earn!</p>
                </div>
                <div className='flex gap-2'>
                    <button onClick={ toggleAddTiers } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                        <PlusCircle size={21}/> 
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto pt-4">
              <div className="min-w-[800px]">
                <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className="text-xs uppercase flex-1 text-center">
                            {header}
                        </p>
                    ))}
                  </div>

                {/* Tier Rows */}
                {tiersData.map((tier, index) => (
                    <div key={tier.tier} className="pt-2 max-h-[350px] pb-1 space-y-2">
                        <div className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-md">
                            <div className="flex items-center justify-between">
                                <div className="flex-1 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        {icons[index]?.icon &&
                                            React.createElement(icons[index].icon, {
                                                className: `w-6 h-6 ${icons[index].color}`,
                                            })}
                                        <span className="text-sm flex-1 text-center">{tier.tier}</span>
                                    </div>
                                </div>
                                <div className="text-sm flex-1 text-center">{tier.eligibility}</div>
                                <div className="text-sm flex-1 text-center">{tier.discounts}</div>
                                <div className="text-sm flex-1 text-center">{tier.rewards}</div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-center gap-4">
                                          <button 
                                            onClick={() => handleEditTier(tier.tier_id)}
                                            className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
                                              <Edit size={21} />
                                          </button>
                                          <button 
                                            onClick={() => toggleTierDeletePage(tier.tier_id, tier.tier)}
                                            className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
                                              <Trash2 size={21} />
                                          </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
              

              <div className="pt-10">
                  <div className="flex justify-between">
                    <div className="flex flex-col pl-2">
                        <h4 className="text-xl font-semibold text-purple">Boost Your Tier Status</h4>
                        <p className="text-gray-400">Discover exciting ways to climb the loyalty ladder and unlock premium rewards!</p>
                    </div>
                    <div className='flex gap-2'>
                        <button onClick={ toggleAddAR } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21}/> 
                        </button>
                    </div>
                  </div>
                  <div className="pt-4">
                      <AlternativeRewardCard />
                  </div>
              </div>
      {addTiersPopUp && <AddNewTiers onClose={ toggleAddTiers } />}
      {editTiersPopup && <EditTiers onClose={ closeEditTiersPopup } selectedTier={ selectedTier } />}
      {deletePopUp && (<DeleteTierConfirmation tierID={ tierID } tierTitle={ tierTitle } isOpen={ deletePopUp } onClose={ toggleTierDeletePage } /> )}
      {addARPopUp && <AddNewAlternativeReward onClose={ toggleAddAR } />}
    </div>
  )
}