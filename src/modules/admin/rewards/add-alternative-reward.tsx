'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from '@/context';
import { AgeGroupsResponse, TiersResponse, StoresResponse, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Rewards, RewardInfo, RewardInfoResponse } from '@/modules/types/rewards/rewards-data'


export function AddNewAlternativeReward({ onClose }: any) {
  const { user } = useSession();

  const [allStores, setAllStores] = useState<StoresResponse>([])
  const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
  const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
  const [rewardInfo, setRewardInfo] = useState<RewardInfoResponse>([])

  const [currentReward, setCurrentReward] = useState<Rewards>({
    reward_title: '',
    description: '',
    reward: '',
    reward_type: '',
    reward_price: 0,
    store_id: '',
    region: '',
    start_date: '',
    expiry_date: '',
    isActive: false,
    loyaltyTier: '',
    ageGroup: '',
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


  const saveReward = async () => {
    try {
        const selectedStore = allStores.find(store => store.code === currentReward.store_id);
        const region = selectedStore ? selectedStore.address_4 : ''; 

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
            loyalty_tier: currentReward.loyaltyTier,
            age_group: currentReward.ageGroup,
            isActive: currentReward.isActive,
        }

        const url = `rewards/save-alternative-reward`
        const response = await axios.post<Rewards>(`${apiEndPoint}/${url}`, payload)
        console.log('The Reward has been saved:', response)

        if (response.status === 201) {
          toast.success('Reward Saved!', {
              icon: <Check color={colors.green} size={24} />,
              duration: 3000,
              style: {
                backgroundColor: 'black',
                color: 'white', 
              },
          });
        }

        await getRewardInfo(); 
    } catch (error) {
        console.error('Error saving Reward:', error)
        
        toast.error('Reward not saved', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        })
    }
  }


  const getRewardInfo = async () => {
    try {
        const url = `rewards/get-alternative-reward-info/${currentReward.reward_title}`
        const response = await axios.get<RewardInfoResponse>(`${apiEndPoint}/${url}`)
        console.log('REWARD INFO RETURNED!!', response.data)
        setRewardInfo(response.data)

        await logUserActivity(response.data[0]); 
    } catch (error) {
        console.error('Error RETURNING REWARD INFO:', error)
    }
  }


  const logUserActivity = async (bonus: RewardInfo) => {
    const message = "User created a new alternative reward";

    try {
        const payload = {
          emp_id: user.id,
          emp_name: user.emp_name,
          activity_id: bonus.reward_id,
          activity: bonus.reward_title,
          activity_type: bonus.reward_type,
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
    <div className="container mx-auto p-4 relative">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <Card className="mb-6 w-[600px]">
              <div className="flex justify-end pr-4 pt-4">
                <button onClick={ onClose }>
                  <X className="h-4 w-4" color="red" />
                </button>
              </div>
            <div className="pl-6 pb-4">
                <p className="text-xl font-bold">Add Alternative Reward</p>
                <p className="text-gray-600">Add an alternative way a customer may retrieve rewards/benefits</p>
            </div>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-full">
                    <label htmlFor="special-name" className="text-black text-sm">Title</label>
                    <Input
                      id="reward-title"
                      value={currentReward.reward_title} 
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_title: e.target.value }))} 
                      placeholder="Enter reward title"
                    />
                </div>
                <div className="w-full">
                    <label htmlFor="special-name" className="text-black text-sm">Description</label>
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
                  <label htmlFor="special-type" className="text-black text-sm">Type</label>
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
                    <label htmlFor="store-id" className="text-black text-sm">Tier</label>
                      <Select
                        value={currentReward.loyaltyTier}
                        onValueChange={(value: string) => setCurrentReward(prev => ({ ...prev, loyaltyTier: value }))}
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
                      <label htmlFor="special-price" className="text-black text-sm">Price</label>
                      <Input
                          id="special-price"
                          type="number" // Changed from 'text' or other types to 'number' to allow numeric input
                          // step="0.01" // Added 'step' attribute to allow decimal numbers
                          value={currentReward.reward_price || ''}
                          onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_price: parseFloat(e.target.value) }))}
                          placeholder="Enter reward price"
                        />
                  </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <label htmlFor="start-date" className="text-black text-sm">Start Date</label>
                  <input 
                    type="datetime-local" 
                    name="start-date"
                    value={currentReward.start_date} 
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, start_date: e.target.value }))} 
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm">
                  </input>
                </div>
                <div className="w-full">
                  <label htmlFor="end-date" className="text-black text-sm">End Date</label>
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
                    <label htmlFor="store-id" className="text-black text-sm">Store ID</label>
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
                    <label htmlFor="store-id" className="text-black text-sm">Age Group</label>
                    <Select
                      value={currentReward.ageGroup}
                      onValueChange={(value: string) => setCurrentReward(prev => ({ ...prev, ageGroup: value }))}
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
                      <label htmlFor="active-toggle" className="text-black text-sm">
                        Active
                      </label>
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

              <Button className="bg-green hover:bg-emerald-300" onClick={ saveReward }>
                  Save Reward
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}