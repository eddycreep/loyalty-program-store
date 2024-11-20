'use client'

import axios from 'axios';
import { apiEndPoint } from '@/utils/colors'
import { useState, useEffect } from 'react'
import { BadgeInfo, AlertTriangle, Users, Calendar, Home } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Gem } from 'lucide-react'
import SquareCircleLoader from "@/lib/square-circle-loader"

interface RewardProps {
    reward_id: number,
    reward_title: string,
    description: string,
    reward: string,
    reward_type: string,
    reward_price: string,
    store_id: string,
    region: string,
    start_date: string,
    expiry_date: string,
    loyalty_tier: string,
    age_group: string,
    isActive: number
}

type RewardsResponse = RewardProps[]

export const ActiveSurveysCard = () => {
    const [rewards, setRewards] = useState<RewardsResponse>([]);

    const [loadingRewards, setLoadingRewards] = useState(false);
    const [rewardError, setRewardError] = useState(false);

    const getActiveRewards = async () => {
        setLoadingRewards(true);
    
        try {
            const url = `products/getactiverewards`
            const response = await axios.get<RewardsResponse>(`${apiEndPoint}/${url}`);
            setRewards(response?.data);
            console.log('Active Rewards: ', response.data);
    
        } catch (error) {
            console.log("An error occurred when fetching the active rewards");
            setRewardError(true);
        }
    
        setLoadingRewards(false);
    }


    useEffect(() => {
        getActiveRewards();

        // Set up an interval to fetch data every 5 minutes
        const interval = setInterval(() => {
            getActiveRewards();
        }, 300000); // 300,000 ms = 5 minutes || 60000 = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);


    if (loadingRewards) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <SquareCircleLoader />
                <p className="text-gray-600 text-sm uppercase">loading active rewards...</p>
            </div>
        )
    }


    if (rewardError) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <AlertTriangle size={38} color="red"/>
                <p className="text-gray-600 text-sm uppercase">Oops! Unfortunately an error was encountered when fetching Active Rewards, kindly refresh the page.</p>
            </div>
        )
    }


    if (rewards.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <BadgeInfo size={38} className="text-emerald-500"/>
                <p className="text-gray-600 text-sm uppercase">No rewards are currently available. To add new rewards, please navigate to the Admin page.</p>
            </div>
        )
    }


    return (
        <ul className="space-y-4">
    {rewards.map(({ reward_id, reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive }) => (
        <li key={reward_id} className="border-b pb-4">
            {/* Main container with flex layout to split content into left and right sides */}
            <div className="flex justify-between items-start">
                
                {/* Left side: Reward title, description, dates, store ID, region, and tier */}
                <div className="flex-1 w-10">
                    <p className="font-semibold text-sm sm:text-base">{reward_title}</p>
                    {/* <p className="text-xs sm:text-sm text-muted-foreground">{description}</p> */}

                    {/* Start and expiry dates with calendar icon */}
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground space-x-1">
                        <Calendar className="h-4 w-4 text-gray-500" /> {/* Calendar icon */}
                        <span className="text-gray-500">Sd:</span><span>{start_date}</span> 
                        <span>|</span>
                        <span className="text-gray-500">Ed:</span><span>{expiry_date}</span>
                    </div>

                    {/* Store ID, region, and loyalty tier with house icon */}
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground space-x-1">
                        <Home className="h-4 w-4 text-gray-500" /> {/* House icon */}
                        <span>{store_id} | {region} | {loyalty_tier}</span>
                    </div>
                </div>
                
                {/* Right side: Badge, count, and users icon */}
                <div className="flex items-center space-x-2">
                    <Badge 
                        variant="secondary" 
                        className={`text-xs ${reward_type === 'Free' ? 'bg-green text-white hover:bg-emerald-300 cursor-pointer' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 cursor-pointer'}`}
                    >
                        {reward_type}
                    </Badge>
                    <span className="text-xs sm:text-sm">19</span>
                    <Users className="h-3 w-3 sm:h-4 sm:w-4 text-purple" />
                </div>
            </div>
        </li>
    ))}
</ul>
    )
}