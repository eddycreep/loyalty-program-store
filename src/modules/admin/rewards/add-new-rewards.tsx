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
import { format } from "date-fns";
import { AgeGroupsResponse, TiersResponse, StoresResponse, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Rewards, RewardInfo, RewardInfoResponse } from '@/modules/types/rewards/rewards-data'
import { apiClient } from '@/utils/api-client';
// import { Branch, Organisation } from '@/types/user-types';
import { getOrganisations } from '@/components/data/organisation/get-organisations-data';
import { getBranches } from '@/components/data/branch/get-branches-data';
import { Organisation } from "@/modules/types/organisation/organisation-types";
import { Branch } from "@/modules/types/branch/branches-types";

export function AddNewRewards({ onClose }: any) {
  const { user } = useSession();

  const [products, setProducts] = useState<ProductsResponse[]>([])
  const [allStores, setAllStores] = useState<StoresResponse>([])
  const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
  const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
  const [rewardInfo, setRewardInfo] = useState<RewardInfoResponse>([])

  //organisations x branches
  const [organisations, setOrganisations] = useState<Organisation[] | null>(null);
  const [branches, setBranches] = useState<Branch[] | null>(null);

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
    organisation: 0,
    branch: 0,
  })

  const getStores = async () => {
    try {
        const url = `inventory/get-stores`
        const response = await apiClient.get<StoresResponse>(`${apiEndPoint}/${url}`)
        setAllStores(response.data)
    } catch (error) {
        console.error('Error RETURNING STORES:', error)
    }
  }

  const getLoyaltyTiers = async () => {
    try {
        const url = `tiers/get-loyalty-tiers`
        const response = await apiClient.get<TiersResponse>(`${apiEndPoint}/${url}`)
        console.log('TIERS RETURNED !!', response.data)
        setLoyaltyTiers(response.data)
    } catch (error) {
        console.error('Error RETURNING TIERS:', error)
    }
  }

  const getAllOrganisations = async () => {
    try {
        const orgData = await getOrganisations()
        setOrganisations(orgData)
        console.log("all organisations returned bro: ", orgData)
    } catch (error) {
        console.error('error fetching all organisations bro:', error)
    }
  }

  const getAllBranches = async () => {
    try {
        const branchesData = await getBranches()
        setBranches(branchesData)
        console.log("all branches returned bro: ", branchesData)
    } catch (error) {
        console.error('error fetching all branches bro:', error)
    }
  }

  const getAgeGroups = async () => {
    try {
        const url = `age-group/get-age-groups`
        const response = await apiClient.get<AgeGroupsResponse>(`${apiEndPoint}/${url}`)
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
            organisationId: currentReward.organisation,
            branchId: currentReward.branch,
        }

        const url = `rewards/save-reward`
        const response = await apiClient.post<Rewards>(`${apiEndPoint}/${url}`, payload)
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
        const url = `rewards/get-reward-info/${currentReward.reward_title}`
        const response = await apiClient.get<RewardInfoResponse>(`${apiEndPoint}/${url}`)
        console.log('REWARD INFO RETURNED!!', response.data)
        setRewardInfo(response.data)

        await logUserActivity(response.data[0]); 
    } catch (error) {
        console.error('Error RETURNING REWARD INFO:', error)
    }
  }

  const logUserActivity = async (bonus: RewardInfo) => {
    const message = "User created a new reward";

    try {
        const payload = {
          emp_id: user.uid,
          emp_name: user.emp_name,
          activity_id: bonus.reward_id,
          activity: bonus.reward_title,
          activity_type: bonus.reward_type,
          log_message: message
        };

        const url = `logs/log-user-activity`;
        const response = await apiClient.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
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
    getAllOrganisations();
    getAllBranches();
  }, []);

  const userOrganisation = user?.organisation?.name
  const userOrganisationUid = user?.organisation?.uid

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
        <Card className="w-full max-w-[95vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <div className="flex justify-end pr-4 pt-4">
            <button onClick={onClose}>
              <X className="h-4 w-4" color="red" />
            </button>
          </div>
          <CardHeader>
            <CardTitle>Add New Reward</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Create a new reward by filling in the required information below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">

              {/* Reward Title x Description */}
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

              {/* Reward x Type */}
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
                      <SelectItem value="All">All</SelectItem>
                      <SelectItem value="Percentage">Percentage</SelectItem>
                      <SelectItem value="Amount">Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Loyalty Tier x Reward Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="loyalty-tier" className="text-black text-xs sm:text-sm">Loyalty Tier</label>
                  <Select
                    value={currentReward.loyaltyTier}
                    onValueChange={(value) => setCurrentReward(prev => ({ ...prev, loyaltyTier: value }))}
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

              {/* Start Date x End Date */}
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

              {/* Store ID x Age Group */}
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
                      {allStores.map((branch) => (
                        <SelectItem key={branch.id} value={branch.code}>
                          {branch.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="age-group" className="text-black text-xs sm:text-sm">Age Group</label>
                  <Select
                    value={currentReward.ageGroup}
                    onValueChange={(value) => setCurrentReward(prev => ({ ...prev, ageGroup: value }))}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select age group" />
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

              { /* Organisation x Branch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="organisation" className="text-black text-xs sm:text-sm">Organisation</label>
                          <Select
                              value={currentReward.organisation === 0 ? "All" : currentReward.organisation.toString()}
                              onValueChange={(value: string) => setCurrentReward(prev => ({ ...prev, organisation: value === "All" ? 0 : Number(value) }))}
                          >
                              <SelectTrigger className="w-full mt-1">
                                  <SelectValue placeholder="Select Organisation" />
                              </SelectTrigger>
                              <SelectContent>
                                  <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                      <SelectItem  value={userOrganisationUid.toString()} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                          {userOrganisation}
                                      </SelectItem>
                              </SelectContent>
                          </Select>
                    </div>
                    <div>
                        <label htmlFor="branch" className="text-black text-xs sm:text-sm">Branch</label>
                            <Select
                              value={currentReward.branch === 0 ? "All" : currentReward.branch.toString()}
                              onValueChange={(value: string) => setCurrentReward(prev => ({ ...prev, branch: value === "All" ? 0 : Number(value) }))}
                            >
                              <SelectTrigger className="w-full mt-1">
                                  <SelectValue placeholder="Select Branch" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                    {branches?.map((branch) => (
                                        <SelectItem key={branch.uid} value={branch.uid.toString()} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                          {branch.name}
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
                <Button onClick={saveReward} className="bg-green hover:bg-emerald-300 text-white">
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