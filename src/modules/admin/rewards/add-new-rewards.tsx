'use client'

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check, Search, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import { Item, ItemsResponse } from "@/modules/types/products/product-types";
import { getInventory } from '@/components/data/inventory/get-inventory';


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

  const [allProducts, setAllProducts] = useState<Item[]>([])
  // Added: Product selection state for Free Item rewards
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  // Updated: DTO now only requires branchId - organisationId implicit via private DB
  // Removed: organisation field (tenant context implicit)
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
    organisation: 0, // Kept for UI compatibility, not sent in payload
    branch: 0,
  })

  // Added: Filter products based on search term, show all if search is empty
  const searchProducts = allProducts.filter(product =>
    !searchTerm || // Show all products when search term is empty
    product?.description_1?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Added: Limit to 9 products to display 3 rows (3 columns × 3 rows = 9 items on medium/large screens)
  const displayedProducts = searchProducts.slice(0, 9);

  // Added: Add product to reward (for Free Item type)
  const addProductToReward = (product: Item) => {
    setSelectedProduct(product);
  }

  // Added: Remove product from reward
  const removeProductFromReward = () => {
    setSelectedProduct(null);
  }


  const fetchInventory = useCallback(async () => {
    // setLoadingData(true);

    try {
        const inventory = await getInventory(user)
        setAllProducts(inventory)
        console.log("inventory in rewards returned: ", inventory)
        setAllProducts(inventory);
    } catch (error) {
        console.error('Error fetching inventory in rewards:', error)
        setAllProducts([]);
    }
}, [user])

  const getStores = async () => {
    try {
        const url = `inventory/get-stores`
        const response = await apiClient.get<StoresResponse>(`${apiEndPoint}/${url}`)
        console.log('STORES RETURNED !!', response.data)
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

  const getAllBranches = useCallback(async () => {
    try {
        const branchesData = await getBranches(user)
        setBranches(branchesData)
        console.log("all branches returned bro: ", branchesData)
    } catch (error) {
        console.error('error fetching all branches bro:', error)
    }
  }, [user])

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

  // Fixed: frontend payload no longer sends organisationId - implicit via private DB connection
  const saveReward = async () => {
    try {
        // Added: Validate item_code is selected for Free Item rewards
        if (currentReward.reward_type === 'Free Item' && !selectedProduct) {
            toast.error('Please select a product for Free Item rewards', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return;
        }

        const selectedStore = allStores.find(store => store.code === currentReward.store_id);
        const region = selectedStore ? selectedStore.address_4 : ''; 

        // Function to format date-time value to 'YYYY-MM-DD HH:mm:ss'
        const formatDateTime = (value: string): string => {
          const [date, time] = value.split('T'); // Split date and time from 'YYYY-MM-DDTHH:mm'
          return `${date} ${time}:00`; // Append ':00' to match 'HH:mm:ss'
        };

        const formattedStartDate = formatDateTime(currentReward.start_date);
        const formattedExpiryDate = formatDateTime(currentReward.expiry_date);

        // Removed: organisationId — implicit via private DB connection in multi-tenancy
        // Updated: Save item_code only for Free Item rewards
        const payload: any = {
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
            branchId: currentReward.branch,
        }

        // Added: Include item_code only if reward_type is 'Free Item'
        if (currentReward.reward_type === 'Free Item' && selectedProduct) {
            payload.item_code = selectedProduct.item_code;
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
    getAllBranches();
    fetchInventory();
  }, [fetchInventory, getAllBranches]);


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
                  {/* <Select
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
                      <SelectItem value="Free Item">Free Item</SelectItem>
                    </SelectContent>
                  </Select> */}
                  <select
                    id="reward-type"
                    value={currentReward.reward_type}
                    onChange={(e) => {
                      const newType = e.target.value;
                      setCurrentReward(prev => ({ ...prev, reward_type: newType }));
                      // Added: Clear selected product if reward type changes away from Free Item
                      if (newType !== 'Free Item') {
                        setSelectedProduct(null);
                      }
                    }}
                    className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
                  >
                    <option value="">Select type</option>
                    <option value="All">All</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Amount">Amount</option>
                    <option value="Free Item">Free Item</option>
                  </select>
                </div>
              </div>

              {/* Added: Product Grid - Only shown when reward_type is 'Free Item' */}
              {currentReward.reward_type === 'Free Item' && (
                <>
                  {/* Search Products */}
                  <div>
                    <label htmlFor="product-search" className="text-black text-xs sm:text-sm">Search Products</label>
                    <div className="flex space-x-2 mt-1">
                      <Input
                        id="product-search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search for products"
                      />
                      <Button variant="outline" size="icon">
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Product Grid - Balanced layout: 1 mobile, 2 small, 3 medium/large with comfortable spacing */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {displayedProducts.length > 0 ? (
                      displayedProducts.map((product) => (
                        <Button
                          key={product.id}
                          onClick={() => addProductToReward(product)}
                          disabled={selectedProduct !== null}
                          className="justify-start bg-white text-black text-xs sm:text-sm"
                        >
                          <PlusCircle className="h-4 w-4 mr-2" />
                          <span className="truncate">{product.description_1}</span>
                        </Button>
                      ))
                    ) : (
                      // Show message when no products match search or no products loaded
                      <div className="col-span-full text-center text-gray-500 text-sm py-4">
                        {allProducts.length === 0 
                          ? "Loading products..." 
                          : searchTerm 
                            ? "No products found matching your search." 
                            : "No products available."
                        }
                      </div>
                    )}
                  </div>

                  {/* Selected Product */}
                  <div>
                    <label className="text-black text-xs sm:text-sm">Selected Product</label>
                    {selectedProduct ? (
                      <Card className="p-2 flex justify-between items-center mt-1">
                        <span className="text-black font-bold text-xs sm:text-sm truncate">{selectedProduct.description_1}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={removeProductFromReward}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </Card>
                    ) : (
                      <p className="text-red text-xs mt-1">Please select a product for this Free Item reward</p>
                    )}
                  </div>
                </>
              )}

              {/* Loyalty Tier x Reward Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label htmlFor="loyalty-tier" className="text-black text-xs sm:text-sm">Loyalty Tier</label>
                  {/* <Select
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
                  </Select> */}
                  <select
                    id="loyalty-tier"
                    value={currentReward.loyaltyTier}
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, loyaltyTier: e.target.value }))}
                    className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
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
                  {/* <Select
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
                  </Select> */}
                  <select
                    id="store-id"
                    value={currentReward.store_id}
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, store_id: e.target.value }))}
                    className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
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
                  <label htmlFor="age-group" className="text-black text-xs sm:text-sm">Age Group</label>
                  {/* <Select
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
                  </Select> */}
                  <select
                    id="age-group"
                    value={currentReward.ageGroup}
                    onChange={(e) => setCurrentReward(prev => ({ ...prev, ageGroup: e.target.value }))}
                    className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
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

              { /* Branch - Removed: organisation field (tenant context implicit) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                        <label htmlFor="branch" className="text-black text-xs sm:text-sm">Branch</label>
                            <select
                              id="branch"
                              value={currentReward.branch === 0 ? "All" : currentReward.branch.toString()}
                              onChange={(e) => setCurrentReward(prev => ({ ...prev, branch: e.target.value === "All" ? 0 : Number(e.target.value) }))}
                              className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
                            >
                              <option value="All">All</option>
                              {branches && branches.length > 0 && branches.map((branch) => (
                                <option key={branch.uid} value={branch.uid.toString()}>
                                  {branch.name}
                                </option>
                              ))}
                            </select>
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