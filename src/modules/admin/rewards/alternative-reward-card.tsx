"use client"

import React from "react";
import axios from "axios"
import { useState, useEffect } from "react"
import { 
    ShoppingBasket, 
    ShoppingBag, 
    Crown, 
    WalletCards, 
    ChefHat, 
    Coins, 
    Star, 
    Globe, 
    Heart, 
    Bell, 
    Sun, 
    Moon, 
    Cloud, 
    Umbrella, 
    Snowflake, 
    Flame, 
    Anchor, 
    Camera, 
    Music 
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import "../../../styles/loyalty-program-tiers.css";
import { apiEndPoint, colors } from '@/utils/colors'
import { Edit, Trash2 } from "lucide-react";
import { DeleteAlternativeRewardConfirmation } from "@/components/component/delete-alternative-reward-confirmation";
import { AddNewAlternativeReward } from "@/modules/admin/rewards/add-alternative-reward";
import { AlternativeRewardProps, AlternativeRewardResponse } from "@/modules/types/alternative-reward/alternative-reward.data-types";

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

    const toggleRewardDeletePage = (rewardId: number, rewardTitle: string) => {
        setDeletePopUp(!deletePopUp);
        setSelectedRewardID(rewardId)
        setSelectedRewardTitle(rewardTitle)
    };

    useEffect(()=> {
        getAlternativeRewards();
    }, [])

    return (
        <div>
          {deletePopUp && (<DeleteAlternativeRewardConfirmation arID={rewardID} arTitle={rewardTitle} isOpen={deletePopUp} onClose={toggleRewardDeletePage}/>)}
          <div>
            {ARData?.map(({ reward_id, reward_title, description }) => {
                const selectedIcon = icons.find((icon) => icon.id === reward_id) || icons[0];
                const { icon: SelectedIcon, color } = selectedIcon;
    
              return (
                  <div>
                    <Card className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg relative">
                    <CardContent className="flex flex-col items-center p-6 text-center">
                      {/* Displaying the icon above the reward title */}
                      <SelectedIcon className={`w-12 h-12 mb-4`} style={{ color }} />
                          <div className="absolute top-4 right-4 flex gap-2">
                              <button onClick={() => handleEditReward(reward_id)} className="flex items-center justify-center bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 w-7 h-7 rounded-lg">
                                  <Edit />
                              </button>
                              <button onClick={() => toggleRewardDeletePage(reward_id, reward_title)} className="flex items-center justify-center bg-white text-red border border-red hover:bg-rose-100 p-1 w-7 h-7 rounded-lg">
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
        </div>
      );
    };