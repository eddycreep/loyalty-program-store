'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from '@/context';
import { format } from "date-fns";
import { AgeGroupsResponse, TiersResponse, StoresResponse, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Reviews, ReviewInfoResponse } from '@/modules/types/reviews/reviews-data';
import { apiClient } from '@/utils/api-client';
import { Organisation } from "@/modules/types/organisation/organisation-types";
import { Branch } from "@/modules/types/branch/branches-types";
import { getOrganisations } from '@/components/data/organisation/get-organisations-data';
import { getBranches } from '@/components/data/branch/get-branches-data';
import { getAllRewards } from '@/components/data/rewards/get-all-rewards';
import { RewardProps } from '@/modules/admin/rewards-module';

export function EditReview({ onClose, selectedReview }: any) {
    const { user } = useSession();

    const [products, setProducts] = useState<ProductsResponse[]>([])
    const [allStores, setAllStores] = useState<StoresResponse>([])
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
    const [reviewInfo, setReviewInfo] = useState<ReviewInfoResponse>([])
    const [rewards, setRewards] = useState<RewardProps[]>([]) // ✅ NEW: State for rewards dropdown

    //organisations x branches
    const [organisations, setOrganisations] = useState<Organisation[] | null>(null);
    const [branches, setBranches] = useState<Branch[] | null>(null);

    const [currentReview, setCurrentReview] = useState<Reviews>({
        review_id: 0,
        review_title: '',
        description: '',
        review_category: '',
        store_id: '',
        isActive: false,
        reward_id: null, // ✅ UPDATED: Changed from reward, reward_price, reward_type to reward_id
        region: '',
        loyalty_tier: '',
        age_group: '',
        start_date: '',
        expiry_date: '',
        branch: 0, // ✅ Removed: organisation (only branchId is saved)
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

    // ✅ NEW: Fetch all rewards for dropdown
    const getAllRewardsList = async () => {
        try {
            const rewardsData = await getAllRewards(user)
            setRewards(rewardsData || [])
            console.log("all rewards returned: ", rewardsData)
        } catch (error) {
            console.error('error fetching all rewards:', error)
        }
    }

    const updateReview = async () => {
        try {
            console.log("selected branch value: ", currentReview.branch)

            // Function to format date-time value to 'YYYY-MM-DD HH:mm:ss'
            const formatDateTime = (value: string): string => {
            const [date, time] = value.split('T'); // Split date and time from 'YYYY-MM-DDTHH:mm'
            return `${date} ${time}:00`; // Append ':00' to match 'HH:mm:ss'
            };

            const formattedStartDate = formatDateTime(currentReview.start_date);
            const formattedExpiryDate = formatDateTime(currentReview.expiry_date);

            // ✅ UPDATED: Payload now sends reward_id instead of reward, reward_price, reward_type
            // ✅ UPDATED: Region is now manually entered by user (or auto-populated from store if not set)
            const selectedStore = allStores.find(store => store.code === currentReview.store_id);
            const region = currentReview.region || (selectedStore ? selectedStore.address_4 : '');

            const payload = {
                review_title: currentReview.review_title,
                description: currentReview.description,
                review_category: currentReview.review_category,
                reward_id: currentReview.reward_id || null, // ✅ NEW: Optional reward_id
                store_id: currentReview.store_id,
                region: region,
                start_date: formattedStartDate,
                expiry_date: formattedExpiryDate,
                loyalty_tier: currentReview.loyalty_tier,
                age_group: currentReview.age_group,
                isActive: currentReview.isActive,
                // Removed: organisationId — implicit via private DB connection in multi-tenancy
                branchId: currentReview.branch,
            }

            const url = `reviews/update-review/${selectedReview.review_id}`
            const response = await apiClient.patch<any>(`${apiEndPoint}/${url}`, payload)
            console.log('The Review has been updated:', response)

            if (response.status === 200 || response.status === 201) {
                toast.success('Review Updated!', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                    style: {
                        backgroundColor: 'black',
                        color: 'white', 
                    },
                });

                await logUserActivity();
            }
        } catch (error) {
            console.error('Error updating Review:', error)
            
            toast.error('Review not updated', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    const logUserActivity = async () => {
        const message = "User updated a review";

        try {
            const payload = {
                emp_id: user.uid,
                emp_name: user.emp_name,
                activity_id: currentReview.review_id,
                activity: currentReview.review_title,
                activity_type: currentReview.review_category,
                log_message: message
            };

            const url = `logs/log-user-activity`;
            const response = await apiClient.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
            console.log('The Users activity has been logged!', response.data);

            onClose();
        } catch (error) {
            console.error('Error logging review activity:', error);
        }
    };

    const formatDateTimeForInput = (dateString: string): string => {
        if (!dateString) return '';
        
        try {
            const [date, time] = dateString.split(' ');
            if (!date || !time) return '';
            
            const [hours, minutes] = time.split(':');
            return `${date}T${hours}:${minutes}`;
        } catch (error) {
            console.error('Error formatting date:', error);
            return '';
        }
    };

    useEffect(() => {
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
        getAllOrganisations();
        getAllBranches();
        getAllRewardsList(); // ✅ NEW: Fetch rewards for dropdown
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedReview) {
            const reviewData = selectedReview as any;
            
            const branchValue = reviewData.branch?.uid || reviewData.branch || 0;
            
            // ✅ UPDATED: Extract reward_id from review relationship or direct field
            const rewardId = reviewData.reward?.reward_id || reviewData.reward_id || null;
            
            setCurrentReview({
                review_id: selectedReview.review_id || 0,
                review_title: selectedReview.review_title || '',
                description: selectedReview.description || '',
                review_category: selectedReview.review_category || '',
                store_id: selectedReview.store_id || '',
                isActive: selectedReview.isActive || false,
                reward_id: rewardId, // ✅ UPDATED: Use reward_id instead of reward, reward_price, reward_type
                region: selectedReview.region || '',
                loyalty_tier: selectedReview.loyalty_tier || '',
                age_group: selectedReview.age_group || '',
                start_date: formatDateTimeForInput(selectedReview.start_date) || '',
                expiry_date: formatDateTimeForInput(selectedReview.expiry_date) || '',
                branch: branchValue, // ✅ Removed: organisation (only branchId is saved)
            });
        }
    }, [selectedReview]);

    const userOrganisation = user?.organisation?.name
    const userOrganisationUid = user?.organisation?.uid

    return (
        <div className="fixed inset-0 z-50">
          <div className="flex fixed inset-0 justify-center items-center p-4 bg-black bg-opacity-50">
            <Card className="w-full max-w-[95vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <div className="flex justify-end pt-4 pr-4">
                <button onClick={onClose}>
                  <X className="w-4 h-4" color="red" />
                </button>
              </div>
              <CardHeader>
                <CardTitle>Edit Review</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Update the review information below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">

                  {/* title x description */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label htmlFor="reward-title" className="text-xs text-black sm:text-sm">Title</label>
                      <Input
                        id="reward-title"
                        value={currentReview.review_title}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, review_title: e.target.value }))}
                        placeholder="Enter reward title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="text-xs text-black sm:text-sm">Description</label>
                      <Input
                        id="description"
                        value={currentReview.description}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description"
                        className="mt-1"
                      />
                    </div>
                  </div>
    
                  {/* ✅ UPDATED: Reward dropdown - replaced reward, reward_type, reward_price fields */}
                  <div>
                    <label htmlFor="reward-select" className="text-xs text-black sm:text-sm">Reward (Optional)</label>
                    <Select
                      value={currentReview.reward_id?.toString() || ''}
                      onValueChange={(value) => setCurrentReview(prev => ({ ...prev, reward_id: value ? Number(value) : null }))}
                    >
                      <SelectTrigger className="mt-1 w-full">
                        <SelectValue placeholder="Select a reward (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">None (No reward)</SelectItem>
                        {rewards.map((reward) => (
                          <SelectItem key={reward.reward_id} value={reward.reward_id.toString()}>
                            {reward.reward_title} - {reward.reward} ({reward.reward_type})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
    
                  {/* loyalty tier */}
                  <div>
                    <label htmlFor="loyalty-tier" className="text-xs text-black sm:text-sm">Loyalty Tier</label>
                    <Select
                      value={currentReview.loyalty_tier}
                      onValueChange={(value) => setCurrentReview(prev => ({ ...prev, loyalty_tier: value }))}
                    >
                      <SelectTrigger className="mt-1 w-full">
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
    
                  {/* start date x end date */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label htmlFor="start-date" className="text-xs text-black sm:text-sm">Start Date</label>
                      <Input
                        type="datetime-local"
                        value={currentReview.start_date}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, start_date: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="end-date" className="text-xs text-black sm:text-sm">End Date</label>
                      <Input
                        type="datetime-local"
                        value={currentReview.expiry_date}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, expiry_date: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
    
                  {/* region */}
                  <div>
                    <label htmlFor="region" className="text-xs text-black sm:text-sm">Region</label>
                    <Input
                      id="region"
                      value={currentReview.region}
                      onChange={(e) => setCurrentReview(prev => ({ ...prev, region: e.target.value }))}
                      placeholder="Enter region (e.g., Gauteng, Western Cape)"
                      className="mt-1"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {(() => {
                        const selectedStore = allStores.find(store => store.code === currentReview.store_id);
                        return selectedStore && selectedStore.address_4 
                          ? `Store region: ${selectedStore.address_4}` 
                          : 'Select a store to auto-populate region';
                      })()}
                    </p>
                  </div>

                  {/* store id x age group */}
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label htmlFor="store-id" className="text-xs text-black sm:text-sm">Store ID</label>
                      <Select
                        value={currentReview.store_id}
                        onValueChange={(value) => {
                          const selectedStore = allStores.find(store => store.code === value);
                          // Auto-populate region from store if region is empty
                          setCurrentReview(prev => ({ 
                            ...prev, 
                            store_id: value,
                            region: prev.region || (selectedStore ? selectedStore.address_4 : '')
                          }));
                        }}
                      >
                        <SelectTrigger className="mt-1 w-full">
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
                      <label htmlFor="age-group" className="text-xs text-black sm:text-sm">Age Group</label>
                      <Select
                        value={currentReview.age_group}
                        onValueChange={(value) => setCurrentReview(prev => ({ ...prev, age_group: value }))}
                      >
                        <SelectTrigger className="mt-1 w-full">
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

                  {/* branch */}
                  <div>
                    <label htmlFor="branch" className="text-xs text-black sm:text-sm">Branch</label>
                    <Select
                      value={currentReview.branch === 0 ? "All" : currentReview.branch.toString()}
                      onValueChange={(value: string) => setCurrentReview(prev => ({ ...prev, branch: value === "All" ? 0 : Number(value) }))}
                    >
                      <SelectTrigger className="mt-1 w-full">
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

                  {/* review category x active */}
                  <div className="flex mt-1 space-x-2">
                        <div className="flex flex-col w-full">
                            <label htmlFor="store-id" className="text-xs text-black sm:text-sm">Review Category</label>
                            <Select
                                value={currentReview.review_category}
                                onValueChange={(value) => setCurrentReview(prev => ({ ...prev, review_category: value }))}
                            >
                                <SelectTrigger className="mt-1 w-full">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Products">Products</SelectItem>
                                    <SelectItem value="Store">Store</SelectItem>
                                    <SelectItem value="Loyalty">Loyalty</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col items-center space-x-2">
                            <label htmlFor="active-toggle" className="text-xs text-black sm:text-sm">
                                Active
                            </label>
                            <Switch
                                id="active-toggle"
                                checked={currentReview.isActive}
                                onCheckedChange={(checked) =>
                                    setCurrentReview(prev => ({ ...prev, isActive: checked }))
                                }
                            />
                        </div>
                  </div>
    
                  <div className="grid grid-cols-2 gap-3 mt-4 sm:gap-4">
                    <Button onClick={onClose} className="text-white bg-red hover:bg-rose-300">
                      Cancel
                    </Button>
                    <Button onClick={updateReview} className="text-white bg-green hover:bg-emerald-300">
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