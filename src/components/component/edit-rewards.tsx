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
import { Item } from "@/modules/types/products/product-types";
import { getInventory } from "@/components/data/inventory/get-inventory";
import { useSession } from '@/context';
import { apiClient } from '@/utils/api-client';

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
  const { user } = useSession();
  const [allStores, setAllStores] = useState<StoresResponse>([])
  const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
  const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
  // Added: Product selection state for Free Item rewards
  const [allProducts, setAllProducts] = useState<Item[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

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

  // Added: Fetch inventory for product selection
  const fetchInventory = async () => {
    try {
        const inventory = await getInventory(user)
        setAllProducts(inventory)
        console.log("inventory in edit rewards returned: ", inventory)
    } catch (error) {
        console.error('Error fetching inventory in edit rewards:', error)
        setAllProducts([]);
    }
  }

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

        // Added: Validate item_code is selected for Free Item rewards
        if (currentReward.reward_type === 'Free Item' && !selectedProduct) {
            toast.error('Please select a product for Free Item rewards', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return;
        }

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
          loyalty_tier: currentReward.loyalty_tier,
          age_group: currentReward.age_group,
          isActive: currentReward.isActive,
        }

        // Added: Include item_code only if reward_type is 'Free Item'
        if (currentReward.reward_type === 'Free Item' && selectedProduct) {
            payload.item_code = selectedProduct.item_code;
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
    fetchInventory();
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

        // Added: If reward has item_code and is Free Item type, find and set selected product
        if (selectedReward.reward_type === 'Free Item' && (selectedReward as any).item_code) {
            const product = allProducts.find(p => p.item_code === (selectedReward as any).item_code);
            if (product) {
                setSelectedProduct(product);
            }
        }
    }

  }, [selectedReward, ageGroups, allProducts]);

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
                                    onValueChange={(value) => {
                                        setCurrentReward(prev => ({ ...prev, reward_type: value }));
                                        // Added: Clear selected product if reward type changes away from Free Item
                                        if (value !== 'Free Item') {
                                            setSelectedProduct(null);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Percentage">Percentage</SelectItem>
                                        <SelectItem value="Amount">Amount</SelectItem>
                                        <SelectItem value="Free Item">Free Item</SelectItem>
                                    </SelectContent>
                                </Select>
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