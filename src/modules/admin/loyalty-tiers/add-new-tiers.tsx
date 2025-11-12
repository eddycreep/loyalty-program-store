'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { useSession } from '@/context';
import { AgeGroupsResponse, TiersResponse, StoresResponse, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Rewards, RewardInfo, RewardInfoResponse } from '@/modules/types/rewards/rewards-data';
import { Textarea } from "@/components/ui/textarea";
import { TierInfo, TierInfoResponse, LoyaltyTiersProps, LoyaltyTiersResponse } from "@/modules/types/tiers/data-types"


export function AddNewTiers({ onClose }: any) {
    const { user } = useSession();

    const [allStores, setAllStores] = useState<StoresResponse>([])
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
    const [tierInfo, setTierInfo] = useState<TierInfoResponse>([])

    const [currentTier, setCurrentTier] = useState<LoyaltyTiersProps>({
        tier: '',
        eligibility: '',
        rewards: '',
        discounts: '',
        min_spending_amount: 0,
        max_spending_amount: 0,
    })

    const getStores = async () => {
        try {
            const url = `inventory/get-stores`
            const response = await axios.get<StoresResponse>(`${apiEndPoint}/${url}`)
            setAllStores(response.data)
        } catch (error) {
            console.error('Error RETURNING STORES:', error)
        }
    }

    const getLoyaltyTiers = async () => {
        try {
            const url = `tiers/get-loyalty-tiers`
            const response = await axios.get<TiersResponse>(`${apiEndPoint}/${url}`)
            console.log('TIERS RETURNED !!', response.data)
            setLoyaltyTiers(response.data)
        } catch (error) {
            console.error('Error RETURNING TIERS:', error)
        }
    }

    const getAgeGroups = async () => {
        try {
            const url = `age-group/get-age-groups`
            const response = await axios.get<AgeGroupsResponse>(`${apiEndPoint}/${url}`)
            console.log('AGE_GROUPS RETURNED !!', response.data)
            setAgeGroups(response.data)
        } catch (error) {
            console.error('Error RETURNING AGE_GROUPS:', error)
        }
    }

    const saveTier = async () => {
        try {
            const payload = {
                tier: currentTier.tier,
                eligibility: currentTier.eligibility,
                rewards: currentTier.rewards,
                discounts: currentTier.discounts,
                min_spending_amount: currentTier.min_spending_amount,
                max_spending_amount: currentTier.max_spending_amount
            }

            const url = `tiers/create-tier`
            const response = await axios.post<LoyaltyTiersProps>(`${apiEndPoint}/${url}`, payload)
            console.log('The Tier has been saved:', response)

            if (response.status === 201) {
                toast.success('Tier Saved!', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                    style: {
                        backgroundColor: 'black',
                        color: 'white', 
                    },
                });
            }

            await getTierInfo(); 
        } catch (error) {
            console.error('Error saving Tier:', error)
            
            toast.error('Tier not saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    const getTierInfo = async () => {
        try {
            const url = `tiers/get-tier-info/${currentTier.tier}`
            const response = await axios.get<TierInfoResponse>(`${apiEndPoint}/${url}`)
            console.log('Tier INFO RETURNED!!', response.data)
            setTierInfo(response.data)

            await logUserActivity(response.data[0]); 
        } catch (error) {
            console.error('Error RETURNING Tier INFO:', error)
        }
    }

    const logUserActivity = async (tierInfo: TierInfo) => {
        const message = "User created a new tier";
        const type = "Tier"

        try {
            const payload = {
                emp_id: user.uid,
                emp_name: user.emp_name,
                activity_id: tierInfo.tier_id,
                activity: tierInfo.tier,
                activity_type: type,
                log_message: message
            };

            const url = `logs/log-user-activity`;
            const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
            console.log('The Users activity has been logged!', response.data);

            onClose();
        } catch (error) {
            console.error('Error logging reward activity:', error);
        }
    };


    useEffect(() => {
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
    }, []);


    return (
        <div className="fixed inset-0 z-50">
            {/* Responsive container with padding for smaller screens */}
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                {/* Card with dynamic width based on screen size */}
                <Card className="w-full max-w-[95vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-end pr-4 pt-4">
                        <button onClick={onClose}>
                            <X className="h-4 w-4" color="red" />
                        </button>
                    </div>
                    <CardHeader>
                        <CardTitle>Add Tier</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Create new tiers for a loyalty program
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {/* Tier and Eligibility */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="tier" className="text-black text-xs sm:text-sm">Tier</label>
                                    <Input
                                        id="tier"
                                        value={currentTier.tier}
                                        onChange={(e) => setCurrentTier(prev => ({ ...prev, tier: e.target.value }))}
                                        placeholder="Enter tier"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="eligibility" className="text-black text-xs sm:text-sm">Eligibility</label>
                                    <Input
                                        id="eligibility"
                                        value={currentTier.eligibility}
                                        onChange={(e) => setCurrentTier(prev => ({ ...prev, eligibility: e.target.value }))}
                                        placeholder="Enter eligibility"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Spending Amounts */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="min-spending-amount" className="text-black text-xs sm:text-sm">
                                        Minimum Spending Amount
                                    </label>
                                    <Input
                                        id="min-spending-amount"
                                        type="number"
                                        value={currentTier.min_spending_amount}
                                        onChange={(e) => setCurrentTier(prev => ({ ...prev, min_spending_amount: parseFloat(e.target.value) }))}
                                        placeholder="Enter minimum amount"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="max-spending-amount" className="text-black text-xs sm:text-sm">
                                        Maximum Spending Amount
                                    </label>
                                    <Input
                                        id="max-spending-amount"
                                        type="number"
                                        value={currentTier.max_spending_amount || ''}
                                        onChange={(e) => setCurrentTier(prev => ({ ...prev, max_spending_amount: parseFloat(e.target.value) }))}
                                        placeholder="Enter maximum amount"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Textarea fields with controlled height */}
                            <div className="space-y-3">
                                {/* Discount textarea with max height */}
                                <div>
                                    <label htmlFor="discount" className="text-black text-xs sm:text-sm">Discount</label>
                                    <Textarea
                                        id="discount"
                                        value={currentTier.discounts}
                                        onChange={(e) => setCurrentTier(prev => ({ ...prev, discounts: e.target.value }))}
                                        placeholder="Enter discounts available"
                                        className="mt-1 min-h-[80px] max-h-[120px] resize-y"
                                    />
                                </div>
                                {/* Reward textarea with max height */}
                                <div>
                                    <label htmlFor="rewards" className="text-black text-xs sm:text-sm">Reward</label>
                                    <Textarea
                                        id="rewards"
                                        value={currentTier.rewards}
                                        onChange={(e) => setCurrentTier(prev => ({ ...prev, rewards: e.target.value }))}
                                        placeholder="Enter rewards available"
                                        className="mt-1 min-h-[80px] max-h-[120px] resize-y"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                                <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                    Cancel
                                </Button>
                                <Button onClick={saveTier} className="bg-green hover:bg-emerald-300 text-white">
                                    Save
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}