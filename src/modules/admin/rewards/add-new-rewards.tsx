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
import { useSession } from '@/context';
import { format } from "date-fns";
import { AgeGroupsResponse, LoyaltyTiersResponse, StoresResponse, ProductsResponse, UserActivity } from '@/shared/types/data-types'
import { Rewards, RewardInfo, RewardInfoResponse } from '@/shared/types/rewards/rewards-data'


export function AddNewRewards({ onClose }: any) {
  const { user } = useSession();

  const [products, setProducts] = useState<ProductsResponse>([])
  const [allStores, setAllStores] = useState<StoresResponse>([])
  const [loyaltyTiers, setLoyaltyTiers] = useState<LoyaltyTiersResponse>([])
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

  const getProducts = async () => {
    try {
        const url = `products/get-products`
        const response = await axios.get<ProductsResponse>(`${apiEndPoint}/${url}`)
        console.log('PRODUCTS RETURNED !!', response.data)
        setProducts(response.data)
    } catch (error) {
        console.error('Error RETURNING PRODUCTS:', error)
    }
  }


  const getStores = async () => {
    try {
        const url = `products/get-stores`
        const response = await axios.get<StoresResponse>(`${apiEndPoint}/${url}`)
        console.log('STORE RETURNED !!', response.data)
        setAllStores(response.data)
    } catch (error) {
        console.error('Error RETURNING STORES:', error)
    }
  }


  const getLoyaltyTiers = async () => {
    try {
        const url = `products/get-loyalty-tiers`
        const response = await axios.get<LoyaltyTiersResponse>(`${apiEndPoint}/${url}`)
        console.log('TIERS RETURNED !!', response.data)
        setLoyaltyTiers(response.data)
    } catch (error) {
        console.error('Error RETURNING TIERS:', error)
    }
  }


  const getAgeGroups = async () => {
    try {
        const url = `products/get-age-groups`
        const response = await axios.get<AgeGroupsResponse>(`${apiEndPoint}/${url}`)
        console.log('AGE_GROUPS RETURNED !!', response.data)
        setAgeGroups(response.data)
    } catch (error) {
        console.error('Error RETURNING AGE_GROUPS:', error)
    }
  }


  const saveReward = async () => {
    try {
        const payload = {
          reward_title: currentReward.reward_title,
          description: currentReward.description,
          reward: currentReward.reward,
          reward_type: currentReward.reward_type,
          reward_price: currentReward.reward_price,
          store_id: currentReward.store_id,
          region: currentReward.region,
          start_date: currentReward.start_date,
          expiry_date: currentReward.expiry_date,
          loyalty_tier: currentReward.loyaltyTier,
          age_group: currentReward.ageGroup,
          isActive: currentReward.isActive,
        }

        const url = `admin/save-reward`
        const response = await axios.post<Rewards>(`${apiEndPoint}/${url}`, payload)
        console.log('The Reward has been saved:', response.data)

        await getRewardInfo(); 
    } catch (error) {
        console.error('Error saving Reward:', error)
        
        toast.success('There was an error when saving the Reward', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        })
    }
  }


  const getRewardInfo = async () => {
    try {
        const url = `admin/get-reward-info/${currentReward.reward_title}`
        const response = await axios.get<RewardInfoResponse>(`${apiEndPoint}/${url}`)
        console.log('REWARD INFO RETURNED!!', response.data)
        setRewardInfo(response.data)


        await logUserActivity(response.data[0]); 
    } catch (error) {
        console.error('Error RETURNING REWARD INFO:', error)
    }
  }


  const logUserActivity = async (bonus: RewardInfo) => {
    const timeLogged = format(new Date(), "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX");
    const message = "User created a new reward";

    try {
        const payload = {
            emp_id: user.emp_id,
            emp_name: user.emp_name,
            activity_id: bonus.reward_id,
            activity: bonus.reward_title,
            activity_type: bonus.reward_type,
            time_logged: timeLogged,
            log_message: message,
        };

        console.log('PAYLOAD INFO - PAYLOAD INFO: ', bonus)

        const url = `users/log-user-activity`;
        const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
        console.log('The Users activity has been logged!', response.data);

        if (response.status === 200) {
            toast.success('Activity logged!', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });
        }
    } catch (error) {
        console.error('Error logging reward activity:', error);

        toast.error('Error logging reward activity!', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        });
    }
  };


  useEffect(() => {
    getProducts();
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
                <p className="text-xl font-bold">Add Reward</p>
                <p className="text-gray-600">Add alternative ways customers can redeem rewards</p>
            </div>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-full">
                    <Label htmlFor="special-name">Reward Title</Label>
                    <Input
                      id="reward-title"
                      value={currentReward.reward_title} // Changed `currentSpecial.name` to `currentReward.reward_title`
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_title: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `name` to `reward_title`
                      placeholder="Enter reward title"
                    />
                </div>
                <div className="w-full">
                    <Label htmlFor="special-name">Description</Label>
                    <Input
                      id="special-name"
                      value={currentReward.reward} // Changed `currentSpecial.special` to `currentReward.description`
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, reward: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `special` to `description`
                      placeholder="Enter reward"
                    />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="special-type">Reward Type</Label>
                  <Select
                    value={currentReward.reward_type} // Changed `currentSpecial.specialValue` to `currentReward.reward_type`
                    onValueChange={(value) => setCurrentReward(prev => ({ ...prev, reward_type: value as 'Percentage' | 'Amount' }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `specialValue` to `reward_type`
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
                <div className="w-full">
                    <Label htmlFor="special-price">Reward Price</Label>
                    <Input
                        id="special-price"
                        value={currentReward.reward_price || ''} // Changed `currentSpecial.specialPrice` to `currentReward.reward_price`
                        onChange={(e) => setCurrentReward(prev => ({ ...prev, reward_price: parseFloat(e.target.value) }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `specialPrice` to `reward_price`
                        placeholder="Enter reward price"
                      />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                  <Label htmlFor="start-date">Start Date</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={currentReward.start_date} // Changed `currentSpecial.startDate` to `currentReward.start_date`
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, start_date: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `startDate` to `start_date`
                  />
                </div>
                <div className="w-full">
                  <Label htmlFor="end-date">End Date</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={currentReward.expiry_date} // Changed `currentSpecial.endDate` to `currentReward.expiry_date`
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, expiry_date: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `endDate` to `expiry_date`
                  />
                </div>
              </div>
              <div className="flex gap-4">
                  <div className="w-full">
                    <Label htmlFor="store-id">Store ID</Label>
                      <Select
                        value={currentReward.store_id}
                        onValueChange={(value) => setCurrentReward(prev => ({ ...prev, store_id: value }))}
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
                    <Label htmlFor="store-id">Region</Label>
                    {/* Changed the input field to a select dropdown to display store IDs */}
                      <Select
                        value={currentReward.region}
                        onValueChange={(value) => setCurrentReward(prev => ({ ...prev, region: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          {allStores.map((branch) => (
                            <SelectItem key={branch.id} value={branch.address_4}>
                              {branch.address_4}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>
              </div>
              <div className="flex gap-4">
                  <div className="w-full">
                    <Label htmlFor="store-id">Age Group</Label>
                    <Select
                      value={currentReward.ageGroup} // Changed `currentSpecial.storeId` to `currentReward.store_id`
                      onValueChange={(value) => setCurrentReward(prev => ({ ...prev, ageGroup: value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `storeId` to `store_id`
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
                  <div className="w-full">
                    <Label htmlFor="store-id">Loyalty Tier</Label>
                      <Select
                        value={currentReward.loyaltyTier}
                        onValueChange={(value) => setCurrentReward(prev => ({ ...prev, loyaltyTier: value }))}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          {loyaltyTiers.map((tier) => (
                            <SelectItem key={tier.loyalty_id} value={tier.loyalty_tier}>
                              {tier.loyalty_tier}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                  </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full">
                    <Label htmlFor="reward">Reward Description</Label>
                    <Input
                      id="reward"
                      value={currentReward.description} 
                      onChange={(e) => setCurrentReward(prev => ({ ...prev, description: e.target.value }))} // Updated `setCurrentSpecial` to `setCurrentReward` and `name` to `reward_title`
                      placeholder="Enter description for reward"
                    />
                </div>
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

              <Button 
                onClick={ saveReward }>
                  Save Reward
              </Button>
            </div>
          </CardContent>
        </Card>
        </div>
    </div>
  )
}