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

export function EditAlternativeRewards({ onClose, selectedReward }: any) {
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

        const url = `rewards/update-alternative-reward/${currentReward.reward_id}`
        const response = await axios.patch<Rewards>(`${apiEndPoint}/${url}`, payload)
        console.log('The Alternative Reward has been updated successfully:', response.data)

        if (response.status === 200) {
            toast.success('The Alternative Reward has been updated successfully', {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <Card className="mb-6 w-[600px]">
              <div className="flex justify-end pr-4 pt-4">
                <button onClick={ onClose }>
                  <X className="h-4 w-4" color="red" />
                </button>
              </div>
            <div className="pl-6 pb-4">
                <p className="text-xl font-bold">Edit Reward</p>
                <p className="text-gray-600">Edit existing customer rewards</p>
            </div>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-full">
                    <Label htmlFor="special-name">Title</Label>
                    <Input
                      id="reward-title"
                      value={currentReward.reward_title} 
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_title: e.target.value }))} 
                      placeholder="Enter reward title"
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="special-name">Description</Label>
                    <Input
                      id="special-name"
                      value={currentReward.description} 
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter reward"
                    />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                    <label htmlFor="special-name" className="text-black text-sm">Reward</label>
                    <Input
                      id="special-name"
                      value={currentReward.reward} 
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, reward: e.target.value }))}
                      placeholder="Enter reward"
                    />
                </div>
                <div className="w-full">
                  <Label htmlFor="special-type">Type</Label>
                  <Select
                    value={currentReward.reward_type}
                    onValueChange={(value: string) => setCurrentReward(prev => ({ ...prev, reward_type: value as 'Percentage' | 'Amount' }))} 
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select reward type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-4">
                  <div className="w-full">
                    <Label htmlFor="store-id">Tier</Label>
                      <Select
                        value={currentReward.loyalty_tier}
                        onValueChange={(value: string) => setCurrentReward(prev => ({ ...prev, loyalty_tier: value }))}
                      >
                        <SelectTrigger className="w-full">
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
                  <div className="w-full">
                      <Label htmlFor="special-price">Price</Label>
                      <Input
                          id="special-price"
                          type="number"
                          value={currentReward.reward_price || ''}
                          onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_price: parseFloat(e.target.value) }))}
                          placeholder="Enter reward price"
                        />
                  </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="start-date">Start Date</Label>
                  <input 
                    type="datetime-local" 
                    name="start-date"
                    value={currentReward.start_date} 
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, start_date: e.target.value }))} 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                  </input>
                </div>
                <div className="w-full">
                  <Label htmlFor="end-date">End Date</Label>
                  <input 
                    type="datetime-local" 
                    name="end-date"
                    value={currentReward.expiry_date} 
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, expiry_date: e.target.value }))} 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                  </input>
                </div>
              </div>
              <div className="flex gap-4">
                  <div className="w-full">
                    <Label htmlFor="store-id">Store ID</Label>
                      <Select
                        value={currentReward.store_id}
                        onValueChange={(value: string) => setCurrentReward(prev => ({ ...prev, store_id: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select store ID" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          {allStores.map((branch) => (
                            <SelectItem key={branch.id} value={branch.code}>
                              {branch.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>
                  <div className="w-full">
                    <Label htmlFor="age-group">Age Group</Label>
                    <Select
                      value={currentReward.age_group}
                      onValueChange={(value: string) => setCurrentReward(prev => ({ ...prev, age_group: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Age Group" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        {ageGroups.map((age) => (
                          <SelectItem key={age.age_group_id} value={age.age_range}>
                            {age.group_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
              </div>
              <div className="flex gap-4">
                  <div className="flex flex-col space-x-2 pt-2">
                      <Label htmlFor="active-toggle">
                        Active
                      </Label>
                      <div className="pt-2">
                        <Switch
                          id="active-toggle"
                          checked={currentReward.isActive}
                          onCheckedChange={(checked) =>
                            setCurrentReward(prev => ({ ...prev, isActive: checked }))
                          }
                        />
                      </div>
                  </div>
              </div>

              <Button className="bg-green hover:bg-emerald-300" onClick={ updateReward }>
                  Update Reward
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}