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
import { Reviews, ReviewInfoResponse, ReviewInfo } from '@/modules/types/reviews/reviews-data';


export function AddReview({ onClose }: any) {
    const { user } = useSession();

    const [products, setProducts] = useState<ProductsResponse[]>([])
    const [allStores, setAllStores] = useState<StoresResponse>([])
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
    const [reviewInfo, setReviewInfo] = useState<ReviewInfoResponse>([])

    const [currentReview, setCurrentReview] = useState<Reviews>({
        review_id: 0,
        review_title: '',
        description: '',
        review_category: '',
        store_id: '',
        isActive: false,
        reward: '',
        reward_price: 0,
        reward_type: '',
        region: '',
        loyalty_tier: '',
        age_group: '',
        start_date: '',
        expiry_date: '',
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
            const selectedStore = allStores.find(store => store.code === currentReview.store_id);
            const region = selectedStore ? selectedStore.address_4 : ''; 

            // Function to format date-time value to 'YYYY-MM-DD HH:mm:ss'
            const formatDateTime = (value: string): string => {
            const [date, time] = value.split('T'); // Split date and time from 'YYYY-MM-DDTHH:mm'
            return `${date} ${time}:00`; // Append ':00' to match 'HH:mm:ss'
            };

            const formattedStartDate = formatDateTime(currentReview.start_date);
            const formattedExpiryDate = formatDateTime(currentReview.expiry_date);

            const payload = {
                review_title: currentReview.review_title,
                description: currentReview.description,
                reward: currentReview.reward,
                reward_type: currentReview.reward_type,
                reward_price: currentReview.reward_price,
                store_id: currentReview.store_id,
                region: region,
                start_date: formattedStartDate,
                expiry_date: formattedExpiryDate,
                loyalty_tier: currentReview.loyalty_tier,
                age_group: currentReview.age_group,
                isActive: currentReview.isActive,
            }

            const url = `rewards/save-reward`
            const response = await axios.post<Reviews>(`${apiEndPoint}/${url}`, payload)
            console.log('The Reward has been saved:', response)

            if (response.status === 201) {
            toast.success('Review Saved!', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
                style: {
                    backgroundColor: 'black',
                    color: 'white', 
                },
            });
            }

            await getReviewInfo(); 
        } catch (error) {
            console.error('Error saving Review:', error)
            
            toast.error('Review not saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }


    const getReviewInfo = async () => {
        try {
            const url = `rewards/get-reward-info/${currentReview.review_title}`
            const response = await axios.get<ReviewInfoResponse>(`${apiEndPoint}/${url}`)
            console.log('Review INFO RETURNED!!', response.data)
            setReviewInfo(response.data)

            await logUserActivity(response.data[0]); 
        } catch (error) {
            console.error('Error RETURNING Review INFO:', error)
        }
    }


    const logUserActivity = async (bonus: ReviewInfo) => {
        const message = "User created a new review";

        try {
            const payload = {
                // emp_id: user.id,
                // emp_name: user.emp_name,
                emp_id: 102,
                emp_name: "Eddy", 
                activity_id: bonus.review_id,
                activity: bonus.review_title,
                activity_type: bonus.review_category,
                log_message: message
            };

            const url = `logs/log-user-activity`;
            const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
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
    }, []);


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
                <CardTitle>Add New Review</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Create a new reward by filling in the required information below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="reward-title" className="text-black text-xs sm:text-sm">Title</label>
                      <Input
                        id="reward-title"
                        value={currentReview.review_title}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, review_title: e.target.value }))}
                        placeholder="Enter reward title"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="text-black text-xs sm:text-sm">Description</label>
                      <Input
                        id="description"
                        value={currentReview.description}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Enter description"
                        className="mt-1"
                      />
                    </div>
                  </div>
    
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="reward" className="text-black text-xs sm:text-sm">Reward</label>
                      <Input
                        id="reward"
                        value={currentReview.reward}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, reward: e.target.value }))}
                        placeholder="Enter reward"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="reward-type" className="text-black text-xs sm:text-sm">Type</label>
                      <Select
                        value={currentReview.reward_type}
                        onValueChange={(value) => setCurrentReview(prev => ({ ...prev, reward_type: value }))}
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
    
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="loyalty-tier" className="text-black text-xs sm:text-sm">Loyalty Tier</label>
                      <Select
                        value={currentReview.loyalty_tier}
                        onValueChange={(value) => setCurrentReview(prev => ({ ...prev, loyalty_tier: value }))}
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
                        value={currentReview.reward_price || ''}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, reward_price: parseFloat(e.target.value) }))}
                        placeholder="Enter price"
                        className="mt-1"
                      />
                    </div>
                  </div>
    
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="start-date" className="text-black text-xs sm:text-sm">Start Date</label>
                      <Input
                        type="datetime-local"
                        value={currentReview.start_date}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, start_date: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label htmlFor="end-date" className="text-black text-xs sm:text-sm">End Date</label>
                      <Input
                        type="datetime-local"
                        value={currentReview.expiry_date}
                        onChange={(e) => setCurrentReview(prev => ({ ...prev, expiry_date: e.target.value }))}
                        className="mt-1"
                      />
                    </div>
                  </div>
    
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="store-id" className="text-black text-xs sm:text-sm">Store ID</label>
                      <Select
                        value={currentReview.store_id}
                        onValueChange={(value) => setCurrentReview(prev => ({ ...prev, store_id: value }))}
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
                        value={currentReview.age_group}
                        onValueChange={(value) => setCurrentReview(prev => ({ ...prev, age_group: value }))}
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
    
                    <div className="flex space-x-2 mt-1">
                        <div className="flex flex-col w-full">
                            <label htmlFor="store-id" className="text-black text-xs sm:text-sm">Review Category</label>
                            <Select
                                value={currentReview.reward_type}
                                onValueChange={(value) => setCurrentReview(prev => ({ ...prev, reward_type: value }))}
                            >
                                <SelectTrigger className="w-full mt-1">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="All">All</SelectItem>
                                    <SelectItem value="Percentage">Products</SelectItem>
                                    <SelectItem value="Amount">Loyalty</SelectItem>
                                    <SelectItem value="Amount">Store</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col items-center space-x-2">
                            <label htmlFor="active-toggle" className="text-black text-xs sm:text-sm">
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