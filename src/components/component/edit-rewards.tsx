'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Search, Check, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RewardProps } from "@/modules/admin/rewards-module";
import { AgeGroupsResponse, TiersResponse, StoresResponse, ProductsResponse, UserActivity } from '@/modules/types/data-types'

interface Props {
  onClose: () => void;  // Corrected syntax here
  selectedReward: RewardProps
}

interface Rewards {
    reward_id: number,
    reward_title: string,
    description: string,
    reward: string,
    reward_type: string,
    reward_price: number,
    store_id: string,
    region: string,
    start_date: string,
    expiry_date: string,
    loyalty_tier: string,
    age_group: string,
    isActive: boolean
}

export function EditRewards({ onClose, selectedReward }: any) {
  const [allStores, setAllStores] = useState<StoresResponse>([])
  const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
  const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])

  const [currentReward, setCurrentReward] = useState<Rewards>({
      reward_id: 0,
      reward_title: '',
      description: '',
      reward: '',
      reward_type: '',
      reward_price: 0,
      store_id: '',
      region: '',
      start_date: '',
      expiry_date: '',
      loyalty_tier: '',
      age_group: '',
      isActive: false
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

  const updateReward = async () => {
    try {
        let region;
        const selectedStore = allStores.find(store => store.code === currentReward.store_id);

        if (currentReward.store_id === 'All') {
          region = 'All'
        } else {
          region = selectedStore ? selectedStore.address_4 : ''; 
        }

        console.log('Region:', region);

        // Function to format date-time value to 'YYYY-MM-DD HH:mm:ss'
        const formatDateTime = (value: string): string => {
          const [date, time] = value.split('T'); // Split date and time from 'YYYY-MM-DDTHH:mm'
          return `${date} ${time}:00`; // Append ':00' to match 'HH:mm:ss'
        };

        const formattedStartDate = formatDateTime(currentReward.start_date);
        const formattedExpiryDate = formatDateTime(currentReward.expiry_date);

        const payload = {
          reward_title: currentReward.reward_title,
          description: currentReward.description,
          reward: currentReward.reward,
          reward_type: currentReward.reward_type,
          reward_price: currentReward.reward_price,
          store_id: currentReward.store_id,
          region: region,
          start_date: formattedStartDate,
          expiry_date: formattedExpiryDate,
          loyalty_tier: currentReward.loyalty_tier,
          age_group: currentReward.age_group,
          isActive: currentReward.isActive,
        }
        console.log('Payload:', payload);

        const url = `rewards/update-reward/${currentReward.reward_id}`
        const response = await axios.patch<Rewards>(`${apiEndPoint}/${url}`, payload)
        console.log('The Reward has been updated successfully:', response.data)

        if (response.status === 200) {
            toast.success('The Reward has been updated successfully', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            })
        }
        onClose();
    } catch (error) {
        console.error('Error updating Reward:', error)
        
        toast.success('There was an error when updating the Reward', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        })
    }
  }

  useEffect(() => {
    getStores();
    getLoyaltyTiers();
    getAgeGroups();
  }, [])

  // Synchronize `selectedReward` data with `currentReward` and populate age group
  useEffect(() => {
    if (selectedReward && ageGroups.length > 0) {
        const matchedAgeGroup = ageGroups.find(ag => ag.age_range === selectedReward.age_group);
        
        setCurrentReward(prev => ({
            ...prev,
            ...selectedReward,
            age_group: matchedAgeGroup ? matchedAgeGroup.group_name : '',
        }));
    }

  }, [selectedReward, ageGroups]);

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
                    <CardTitle>Edit Reward</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Update the reward information below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        {/* Title and Description */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="reward-title" className="text-black text-xs sm:text-sm">Title</label>
                                <Input
                                    id="reward-title"
                                    value={currentReward.reward_title}
                                    onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_title: e.target.value }))}
                                    placeholder="Enter reward title"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="text-black text-xs sm:text-sm">Description</label>
                                <Input
                                    id="description"
                                    value={currentReward.description}
                                    onChange={(e) => setCurrentReward(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Enter description"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        {/* Reward and Type */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="reward" className="text-black text-xs sm:text-sm">Reward</label>
                                <Input
                                    id="reward"
                                    value={currentReward.reward}
                                    onChange={(e) => setCurrentReward(prev => ({ ...prev, reward: e.target.value }))}
                                    placeholder="Enter reward"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="reward-type" className="text-black text-xs sm:text-sm">Type</label>
                                <Select
                                    value={currentReward.reward_type}
                                    onValueChange={(value) => setCurrentReward(prev => ({ ...prev, reward_type: value }))}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Percentage">Percentage</SelectItem>
                                        <SelectItem value="Amount">Amount</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Tier and Price */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="loyalty-tier" className="text-black text-xs sm:text-sm">Loyalty Tier</label>
                                <Select
                                    value={currentReward.loyalty_tier}
                                    onValueChange={(value) => setCurrentReward(prev => ({ ...prev, loyalty_tier: value }))}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select tier" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All</SelectItem>
                                        {loyaltyTiers.map((loyalty) => (
                                            <SelectItem key={loyalty.tier_id} value={loyalty.tier}>
                                                {loyalty.tier}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="reward-price" className="text-black text-xs sm:text-sm">Price</label>
                                <Input
                                    id="reward-price"
                                    type="number"
                                    value={currentReward.reward_price || ''}
                                    onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_price: parseFloat(e.target.value) }))}
                                    placeholder="Enter price"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="start-date" className="text-black text-xs sm:text-sm">Start Date</label>
                                <Input
                                    type="datetime-local"
                                    value={currentReward.start_date}
                                    onChange={(e) => setCurrentReward(prev => ({ ...prev, start_date: e.target.value }))}
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="end-date" className="text-black text-xs sm:text-sm">End Date</label>
                                <Input
                                    type="datetime-local"
                                    value={currentReward.expiry_date}
                                    onChange={(e) => setCurrentReward(prev => ({ ...prev, expiry_date: e.target.value }))}
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        {/* Store and Age Group */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="store-id" className="text-black text-xs sm:text-sm">Store ID</label>
                                <Select
                                    value={currentReward.store_id}
                                    onValueChange={(value) => setCurrentReward(prev => ({ ...prev, store_id: value }))}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select store" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All">All</SelectItem>
                                        {allStores.map((store) => (
                                            <SelectItem key={store.id} value={store.code}>
                                                {store.code}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="age-group" className="text-black text-xs sm:text-sm">Age Group</label>
                                <Select
                                    value={currentReward.age_group}
                                    onValueChange={(value) => setCurrentReward(prev => ({ ...prev, age_group: value }))}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select age group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ageGroups.map((age) => (
                                            <SelectItem key={age.age_group_id} value={age.group_name}>
                                                {age.group_name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Active Toggle */}
                        <div className="flex items-center space-x-2">
                            <label htmlFor="active-toggle" className="text-black text-xs sm:text-sm">
                                Active
                            </label>
                            <Switch
                                id="active-toggle"
                                checked={currentReward.isActive}
                                onCheckedChange={(checked) =>
                                    setCurrentReward(prev => ({ ...prev, isActive: checked }))
                                }
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                            <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                Cancel
                            </Button>
                            <Button onClick={updateReward} className="bg-green hover:bg-emerald-300 text-white">
                                Update
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  )
}