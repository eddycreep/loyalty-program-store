"use client"

import React from "react";
import axios from "axios"
import { useState, useEffect } from "react"
import { ShoppingBasket, ShoppingBag, Crown, WalletCards, ChefHat, Coins, Star, Globe, Heart, Bell, Sun, Moon, Cloud, Umbrella, Snowflake, Flame, Anchor, Camera, Music, XOctagon, ShieldAlert } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card"
import "../../../styles/loyalty-program-tiers.css";
import { apiEndPoint, colors } from '@/utils/colors'
import { Edit, Trash2 } from "lucide-react";
import { DeleteAlternativeRewardConfirmation } from "@/components/component/delete-alternative-reward-confirmation";
import { AlternativeRewardProps, AlternativeRewardResponse } from "@/modules/types/alternative-reward/alternative-reward.data-types";
import { EditAlternativeRewards } from "./edit-alternative-rewards";
import SquareCircleLoader from "@/lib/square-circle-loader";

const icons = [
    { id: 1, icon: ShoppingBasket, color: colors.blue },
    { id: 2, icon: ShoppingBag, color: colors.green },
    { id: 3, icon: Crown, color: colors.purple },
    { id: 4, icon: WalletCards, color: colors.red },
    { id: 5, icon: ChefHat, color: colors.orange },
    { id: 6, icon: Coins, color: colors.darkblue },
    { id: 7, icon: Star, color: colors.yellow },
    { id: 8, icon: Globe, color: colors.indigo },
    { id: 9, icon: Heart, color: colors.maroon },
    { id: 10, icon: Bell, color: colors.blackLight },
    { id: 11, icon: Sun, color: colors.yellow },
    { id: 12, icon: Moon, color: colors.grey },
    { id: 13, icon: Cloud, color: colors.greyLight },
    { id: 14, icon: Umbrella, color: colors.blue },
    // { id: 15, icon: Lightning, color: colors.orange },
    { id: 16, icon: Snowflake, color: colors.white },
    { id: 17, icon: Flame, color: colors.red },
    { id: 18, icon: Anchor, color: colors.darkIndigo },
    { id: 19, icon: Camera, color: colors.black },
    { id: 20, icon: Music, color: colors.purpleFaint },
]; 

export const AlternativeRewardCard = () => {
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [editRewardPopup, setEditRewardPopup] = useState(false);
    const [deletePopUp, setDeletePopUp] = useState(false);

    const [rewardID, setSelectedRewardID] = useState(0);
    const [rewardTitle, setSelectedRewardTitle] = useState('');
    const [rewardType, setSelectedRewardType] = useState('');

    const [ARData, setARData] = useState<AlternativeRewardResponse>([]);
    const [selectedReward, setSelectedReward] = useState<AlternativeRewardProps | null>(null);

    const getAlternativeRewards = async () => {
      setLoading(true);
  
      try {
        const url = `rewards/get-all-alternative-rewards`
        const response = await axios.get<AlternativeRewardResponse>(`${apiEndPoint}/${url}`)
        console.log('alternative: ', response)
        setARData(response.data);
        setLoading(false);

      } catch (error) {
        console.log('error: ', error);
        setIsError(true);
      }
    }

    const handleEditReward = (rewardId: any) => {
      const selected = ARData.find((item) => item.reward_id === rewardId) || null;
      
      if (selected) {
          setSelectedReward(selected);
          setEditRewardPopup(true);
          
      } else {
          console.log("No selected Tier, sumn wrong with the code my nigga:" + selected);
      }
    }; 

    const closeEditRewardPopup = () => {
      setEditRewardPopup(false);
    }

    const toggleRewardDeletePage = (rewardId: number, rewardTitle: string, rewardType: string) => {
        setDeletePopUp(!deletePopUp);
        setSelectedRewardID(rewardId)
        setSelectedRewardTitle(rewardTitle)
        setSelectedRewardType(rewardType)
    };


    useEffect(()=> {
        getAlternativeRewards();
    }, [])


    if (loading) {
      return (
            <div className="min-h-[200px] w-full flex flex-col items-center justify-center">
                <SquareCircleLoader />
                <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
            </div>
      )
    }
  
    if (isError) {
      return (
            <div className="min-h-[200px] w-full flex flex-col items-center justify-center">
                <XOctagon size={34} />
                <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching tiers</p>
            </div>
      )
    }
  
    if (ARData.length === 0) {
      return (
            <div className="flex flex-col items-center justify-center py-10 w-full">
                <ShieldAlert size={34} />
                <p className="ml-2 uppercase pt-2 text-green">No alternative rewards have been set. Add new rewards to enhance their experience!</p>
            </div>
      )
    }

    return (
        <>
        {deletePopUp && (<DeleteAlternativeRewardConfirmation ARID={rewardID} ARTitle={rewardTitle} ARType={rewardType} isOpen={deletePopUp} onClose={toggleRewardDeletePage}/>)}
        {editRewardPopup && <EditAlternativeRewards onClose={closeEditRewardPopup} selectedReward={selectedReward} />}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ARData?.map(({ reward_id, reward_title, description, reward_type }) => {const selectedIcon = icons.find((icon) => icon.id === reward_id) || icons[0]; const { icon: SelectedIcon, color } = selectedIcon;
    
              return (
                  <div key={reward_id}>
                    <Card className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg relative">
                      <CardContent className="flex flex-col items-center p-6 text-center">
                        <SelectedIcon className={`w-12 h-12 mb-4`} style={{ color }} />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <button onClick={() => handleEditReward(reward_id)} className="flex items-center justify-center bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 w-7 h-7 rounded-lg">
                                    <Edit />
                                </button>
                                <button onClick={() => toggleRewardDeletePage(reward_id, reward_title, reward_type)} className="flex items-center justify-center bg-white text-red border border-red hover:bg-rose-100 p-1 w-7 h-7 rounded-lg">
                                    <Trash2 />
                                </button>
                            </div>
                        <h3 className="text-lg font-semibold mb-2">{reward_title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </CardContent>
                    </Card>
                  </div>
              );
            })}
        </div>
        </>
      );
    };