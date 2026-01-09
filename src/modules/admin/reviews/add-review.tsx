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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export function AddReview({ onClose }: any) {
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

    const saveReview = async () => {
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

            const url = `reviews/save-review`
            const response = await apiClient.post<any>(`${apiEndPoint}/${url}`, payload)
            console.log('The Review has been saved:', response)

            if (response.status === 201) {
              toast.success('Review Saved!', {
                  icon: <Check color={colors.green} size={24} />,
                  duration: 3000,
                  style: {
                      backgroundColor: 'black',
                      color: 'white', 
                  },
              });

              const reviewData = response?.data?.data;
              console.log("review response data ID: ", reviewData?.review_id);
              console.log("review response data title: ", reviewData?.review_title);
              console.log("review response data category: ", reviewData?.review_category);

              if (reviewData) {
                await logUserActivity(reviewData);
              }
            }
        } catch (error) {
            console.error('Error saving Review:', error)
            
            toast.error('Review not saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    const logUserActivity = async (reviewData: any) => {
        const message = "User created a new review";

        try {
            const payload = {
                emp_id: user.uid,
                emp_name: user.emp_name,
                activity_id: reviewData.review_id,
                activity: reviewData.review_title,
                activity_type: reviewData.review_category,
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

    useEffect(() => {
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
        getAllOrganisations();
        getAllBranches();
        getAllRewardsList(); // ✅ NEW: Fetch rewards for dropdown
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                <CardTitle>Add New Review</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Create a new review by filling in the required information below
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
                    <select
                      id="reward-select"
                      value={currentReview.reward_id || ''}
                      onChange={(e) => setCurrentReview(prev => ({ ...prev, reward_id: e.target.value ? Number(e.target.value) : null }))}
                      className="p-2 mt-1 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                    >
                      <option value="">Select a reward (optional)</option>
                      {rewards.map((reward) => (
                        <option key={reward.reward_id} value={reward.reward_id}>
                          {reward.reward_title} - {reward.reward} ({reward.reward_type})
                        </option>
                      ))}
                    </select>
                  </div>
    
                  {/* loyalty tier */}
                  <div>
                    <label htmlFor="loyalty-tier" className="text-xs text-black sm:text-sm">Loyalty Tier</label>
                    <select
                      id="loyalty-tier"
                      value={currentReview.loyalty_tier}
                      onChange={(e) => setCurrentReview(prev => ({ ...prev, loyalty_tier: e.target.value }))}
                      className="p-2 mt-1 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                    >
                      <option value="">Select tier</option>
                      <option value="All">All</option>
                      {loyaltyTiers.map((loyalty) => (
                        <option key={loyalty.tier_id} value={loyalty.tier}>
                          {loyalty.tier}
                        </option>
                      ))}
                    </select>
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
                      {/* <Select
                        value={currentReview.store_id}
                        onValueChange={(value) => setCurrentReview(prev => ({ ...prev, store_id: value }))}
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
                      </Select> */}
                      <select
                        id="store-id"
                        value={currentReview.store_id}
                        onChange={(e) => {
                          const newStoreId = e.target.value;
                          const selectedStore = allStores.find(store => store.code === newStoreId);
                          // Auto-populate region from store if region is empty
                          setCurrentReview(prev => ({ 
                            ...prev, 
                            store_id: newStoreId,
                            region: prev.region || (selectedStore ? selectedStore.address_4 : '')
                          }));
                        }}
                        className="p-2 mt-1 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                      >
                        <option value="">Select store</option>
                        <option value="All">All</option>
                        {allStores.map((branch) => (
                          <option key={branch.id} value={branch.code}>
                            {branch.code}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="age-group" className="text-xs text-black sm:text-sm">Age Group</label>
                      {/* <Select
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
                      </Select> */}
                      <select
                        id="age-group"
                        value={currentReview.age_group}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, age_group: e.target.value }))}
                        className="p-2 mt-1 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                      >
                        <option value="">Select age group</option>
                        <option value="All">All</option>
                        {ageGroups.map((age) => (
                          <option key={age.age_group_id} value={age.age_range}>
                            {age.group_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* branch */}
                  <div>
                    <label htmlFor="branch" className="text-xs text-black sm:text-sm">Branch</label>
                    <select
                      id="branch"
                      value={currentReview.branch === 0 ? "All" : currentReview.branch.toString()}
                      onChange={(e) => setCurrentReview(prev => ({ ...prev, branch: e.target.value === "All" ? 0 : Number(e.target.value) }))}
                      className="p-2 mt-1 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                    >
                      <option value="All">All</option>
                      {branches && Array.isArray(branches) && branches.length > 0 && branches.map((branch) => (
                        <option key={branch.uid} value={branch.uid.toString()}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* review category x active */}
                  <div className="flex mt-1 space-x-2">
                        <div className="flex flex-col w-full">
                            <label htmlFor="review-category" className="text-xs text-black sm:text-sm">Review Category</label>
                            {/* <Select
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
                            </Select> */}
                            <select
                              id="review-category"
                              value={currentReview.review_category}
                              onChange={(e) => setCurrentReview(prev => ({ ...prev, review_category: e.target.value }))}
                              className="p-2 mt-1 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                            >
                              <option value="">Select category</option>
                              <option value="Products">Products</option>
                              <option value="Store">Store</option>
                              <option value="Loyalty">Loyalty</option>
                            </select>
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
                    <Button onClick={saveReview} className="text-white bg-green hover:bg-emerald-300">
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