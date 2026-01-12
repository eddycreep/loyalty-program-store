'use client'

import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { Check, X, Search, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgeGroupsResponse, TiersResponse, StoresResponse, UserActivity } from '@/modules/types/data-types'
import { Special, SpecialInfo, SpecialInfoRes } from '@/modules/types/special/product/data-types'
import { apiClient } from '@/utils/api-client';
import { Item, ItemsResponse } from '@/modules/types/products/product-types';
import { Organisation } from '@/modules/types/organisation/organisation-types';
import { Branch } from '@/modules/types/branch/branches-types';
import { getOrganisations } from '@/components/data/organisation/get-organisations-data';
import { getBranches } from '@/components/data/branch/get-branches-data';
import { useSession } from '@/context';
import { getInventory } from '@/components/data/inventory/get-inventory';


interface Props {
  onClose: () => void;  // Corrected syntax here
}

//specials
interface Specials {
  special_id: number,
  special_name: string,
  special: string,
  special_type: string,
  store_id: string,
  start_date: string,
  expiry_date: string,
  special_value: string,
  isActive: number
}


//special items - individual x combined
// interface SpecialItems {
//   special_id: number,
//   special_group_id: string,
//   product_description: string,
//   special_price: string
// }


export interface CombinedSpecialItems {
    special_id: number,
    special_group_id: number,
    item_code: string,
    product_description: string,
}

type Product = {
  id: string
  name: string
  price: number
  item_code: string
}

type SpecialProduct = Product & {
  groupId: string
}

type CombinedSpecial = {
  id?: string 
  special_name: string
  special: string
  description: string
  special_price?: number
  special_type: 'Percentage' | 'Amount' 
  store_id: string
  start_date: string
  expiry_date: string
  special_value: string
  loyalty_tier: string
  age_group: string
  isActive: boolean
  organisation: string
  branch: string
  product: SpecialProduct | null
  products: SpecialProduct[]
}

export function AddCombinedSpecials({ onClose }: Props) {
    const { user } = useSession();
    const [specials, setSpecials] = useState<CombinedSpecial[]>([])
    const [currentSpecial, setCurrentSpecial] = useState<CombinedSpecial>({
        special_name: '',
        special: '',
        description: '',
        special_type: 'Percentage',
        store_id: '',
        start_date: '',
        expiry_date: '',
        special_value: '',
        loyalty_tier: '',
        age_group: '',
        isActive: false,
        organisation: '',
        branch: '',
        product: null,
        products: []
    })

    const [searchTerm, setSearchTerm] = useState('')
    const [specialID, setSpecialID] = useState<SpecialInfoRes>([])

    const [allProducts, setAllProducts] = useState<Item[]>([])
    const [allStores, setAllStores] = useState<StoresResponse>([]);
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([]);
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([]);

    //organisations x branches
    const [organisations, setOrganisations] = useState<Organisation[] | null>(null);
    const [branches, setBranches] = useState<Branch[] | null>(null);

    // Filter products based on search term, show all if search is empty
    const searchProducts = allProducts.filter(product =>
        !searchTerm || // Show all products when search term is empty
        product?.description_1?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Limit to 9 products to display 3 rows (3 columns × 3 rows = 9 items on medium/large screens)
    const displayedProducts = searchProducts.slice(0, 9);

    const fetchInventory = useCallback(async () => {
        // setLoadingData(true);

        try {
            const inventory = await getInventory(user)
            setAllProducts(inventory)
            console.log("inventory returned: ", inventory)
            setAllProducts(inventory);
        } catch (error) {
            console.error('Error fetching inventory:', error)
            setAllProducts([]);
        }
    }, [user])

    const getStores = useCallback(async () => {
        try {
            const url = `inventory/get-stores`
            const response = await apiClient.get<StoresResponse>(`${apiEndPoint}/${url}`);
            setAllStores(response.data)
        } catch (error) {
            console.error('Error RETURNING STORES:', error)
        }
    }, [])
    
    const getLoyaltyTiers = useCallback(async () => {
        try {
            const url = `tiers/get-loyalty-tiers`
            const response = await apiClient.get<TiersResponse>(`${apiEndPoint}/${url}`);
            setLoyaltyTiers(response.data)
        } catch (error) {
            console.error('Error RETURNING TIERS:', error)
        }
    }, [])
    
    const getAgeGroups = useCallback(async () => {
        try {
            const url = `age-group/get-age-groups`
            const response = await apiClient.get<AgeGroupsResponse>(`${apiEndPoint}/${url}`);
            setAgeGroups(response.data)
        } catch (error) {
            console.error('Error RETURNING AGE_GROUPS:', error)
        }
    }, [])

    const getAllOrganisations = useCallback(async () => {
        try {
            const orgData = await getOrganisations()
            // Filter to only show user's organisation
            if (orgData && user?.organisation?.uid) {
                const filteredOrgs = orgData.filter(org => org.uid === user.organisation.uid)
                setOrganisations(filteredOrgs)
                console.log("filtered organisations (user's org only): ", filteredOrgs)
            } else if (orgData) {
                setOrganisations(orgData)
            } else {
                setOrganisations(null)
            }
        } catch (error) {
            console.error('error fetching all organisations bro:', error)
            setOrganisations(null)
        }
    }, [user?.organisation?.uid])

    const getAllBranches = useCallback(async () => {
        try {
            // Use filtered endpoint if user has organisation, otherwise fetch all
            if (user?.organisation?.uid) {
                // Fetch branches filtered by user's organisation
                const url = `branch/get-branches/${user.organisation.uid}`;
                const response = await apiClient.get(`${apiEndPoint}/${url}`);
                console.log("branches returned (filtered by org): ", response.data)
                
                // Extract the data array from response.data.data or response.data
                const branchesData = response.data?.data || response.data || [];
                setBranches(branchesData)
                console.log("filtered branches (user's org only): ", branchesData)
            } else {
                // Fallback: fetch all branches if no user organisation
                const branchesData = await getBranches()
                setBranches(branchesData)
            }
        } catch (error) {
            console.error('error fetching all branches bro:', error)
            setBranches(null)
        }
    }, [user?.organisation?.uid])

    const addProductToSpecial = (product: Item) => {
        // Check if we haven't reached the product limit
        if (currentSpecial.products.length >= 5) {
            toast.error('Maximum of 5 products allowed per special');
            return;
        }

        // Convert the inventory product to the SpecialProduct format
        const specialProduct: SpecialProduct = {
            id: product.id.toString(), // Convert to string since SpecialProduct.id is string
            name: product.description_1,
            price: product.selling_incl_1, // Access from product directly, not from inventory
            item_code: product.item_code, // Access from product directly, not from inventory
            groupId: ''
        };

        setCurrentSpecial(prev => ({
        ...prev,
        products: [...prev.products, specialProduct]
        }));
    }

    const removeProductFromSpecial = (productId: string) => {
        // Remove the product with the matching ID
        setCurrentSpecial(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== productId)
        }));
    }

    const updateProductGroupId = (productId: string, groupId: string) => {
        setCurrentSpecial(prev => ({
        ...prev,
        products: prev.products.map(p =>
            p.id === productId ? { ...p, groupId } : p
        )
        }))
    }

    const saveSpecial = async () => {
        try {
            const specialType = 'Combined Special'

            // Removed: newOrgId — organisationId is implicit via private DB connection in multi-tenancy
            const newBrId = Number(currentSpecial.branch);

            // const selectedStore = allStores.find(store => store.code === currentReward.store_id);
            // const region = selectedStore ? selectedStore.address_4 : ''; 

            // Function to format date with default time (00:00:00)
            const formatDate = (dateStr: string): string => {
                if (!dateStr) return '';
                return `${dateStr} 00:00:00`;
            };

            // Fixed: frontend payload no longer sends organisationId — implicit via private DB connection
            const payload = {
                special_name: currentSpecial.special_name,
                special: currentSpecial.special,
                description: currentSpecial.description,
                special_price: currentSpecial.special_price,
                special_type: specialType,
                store_id: currentSpecial.store_id,
                start_date: formatDate(currentSpecial.start_date),
                expiry_date: formatDate(currentSpecial.expiry_date),
                special_value: currentSpecial.special_value,
                loyalty_tier: currentSpecial.loyalty_tier,
                age_group: currentSpecial.age_group,
                isActive: currentSpecial.isActive,
                // Removed: organisationId — implicit via private DB connection in multi-tenancy
                branchId: currentSpecial.branch,
            }

            const url = `specials/save-special`
            const response = await apiClient.post<Special>(`${apiEndPoint}/${url}`, payload);
            console.log('The Special has been saved successfully:', response.data)

            // if (response.status === 200) {
            //     toast.success('The special has been saved successfully', {
            //         icon: <Check color={colors.green} size={24} />,
            //         duration: 3000,
            //     })
            // }

            fetchSpecialInfo()
        } catch (error) {
            console.error('Error saving special:', error)
            
            toast.success('There was an error when saving the special', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    const fetchSpecialInfo = async () => {
        try {
            const url = `specials/get-special-info/${currentSpecial.special_name}`;
            const response = await apiClient.get<SpecialInfoRes>(`${apiEndPoint}/${url}`);

            setSpecialID(response?.data);

            if (response.data.length > 0) {
                saveSpecialItems(response.data[0].special_id); // save the items
                
                logUserActivity(response.data[0]); // Pass the fetched data directly to logUserActivity

                console.error('Special info returned: ', response.data);
            } else if (response.data.length == 0) {
                console.error('No special data returned: ', response.data);
            }
        } catch (error) {
            console.error('Error fetching special ID:', error);
        }
    };

    const saveSpecialItems = async (specialId: number) => {
        console.log('passed special id from info function: ', specialId);

        try {
            // Loop through each product in currentSpecial.products
            for (let i = 0; i < currentSpecial.products.length; i++) {
                const product = currentSpecial.products[i];
                
                const payload: CombinedSpecialItems = {
                    special_id: specialId,
                    special_group_id: i + 1, // Assign sequential group IDs (1, 2, 3)
                    item_code: product.item_code,
                    product_description: product.name // Use the product name from the SpecialProduct
                };

                console.log('saving special item payload:', payload);

                const url = `specials/save-combined-special-items`;
                const response = await apiClient.post<CombinedSpecialItems>(`${apiEndPoint}/${url}`, payload);
                console.log('Special item saved successfully:', response.data);
            }

            // Show success toast after all items are saved
            toast.success('Special Saved', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

            onClose();
        } catch (error) {
            console.error('Special Items Not Saved:', error);
            
            toast.error('Error saving special items', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    const logUserActivity = async (special: SpecialInfo) => {
        const message = "User created a new combined special";
    
        try {
            const payload = {
                emp_id: user.uid,
                emp_name: user.emp_name,
                activity_id: special.special_id,
                activity: special.special_name,
                activity_type: special.special_type,
                log_message: message,
            };
    
            const url = `logs/log-user-activity`;
            const response = await apiClient.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
        } catch (error) {
            console.error('Error logging activity:', error);
    
            toast.error('Error logging activity!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    };

    useEffect(() => {
        fetchInventory();
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
        getAllOrganisations();
        getAllBranches();
        
        // Set default organisation and branch from user session
        if (user?.organisation?.uid) {
            setCurrentSpecial(prev => ({
                ...prev,
                organisation: user.organisation.uid.toString()
            }));
        }
        if (user?.branch?.uid) {
            setCurrentSpecial(prev => ({
                ...prev,
                branch: user.branch.uid.toString()
            }));
        }
    }, [fetchInventory, getStores, getLoyaltyTiers, getAgeGroups, getAllOrganisations, getAllBranches, user?.organisation?.uid, user?.branch?.uid]);

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
                        <CardTitle>Create Combined Special</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Set the special with the required fields and assign all the products linked to the special. Click Save Special once completed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {/* Special Name and Special fields */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="special-name" className="text-black text-xs sm:text-sm">Special Name</label>
                                    <Input
                                        id="special-name"
                                        value={currentSpecial.special_name}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special_name: e.target.value }))}
                                        placeholder="back to school special"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="special" className="text-black text-xs sm:text-sm">Special</label>
                                    <Input
                                        id="special"
                                        value={currentSpecial.special}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special: e.target.value }))}
                                        placeholder="10% OFF"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Description and Special Type */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="description" className="text-black text-xs sm:text-sm">Description</label>
                                    <Input
                                        id="description"
                                        value={currentSpecial.description}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, description: e.target.value }))}
                                        placeholder="buy 3 or more school supplies..."
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="special-type" className="text-black text-xs sm:text-sm">Special Type</label>
                                    {/* <Select
                                        value={currentSpecial.special_value}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, special_value: value }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select special type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Percentage" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">Percentage</SelectItem>
                                            <SelectItem value="Amount" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">Amount</SelectItem>
                                        </SelectContent>
                                    </Select> */}
                                    <select
                                        id="special-type"
                                        value={currentSpecial.special_value}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special_value: e.target.value }))}
                                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
                                    >
                                        <option value="">Select special type</option>
                                        <option value="Percentage">Percentage</option>
                                        <option value="Amount">Amount</option>
                                    </select>
                                </div>
                            </div>

                            {/* Loyalty Tier and Age Group */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="tier" className="text-black text-xs sm:text-sm">Loyalty Tier</label>
                                    {/* <Select
                                        value={currentSpecial.loyalty_tier}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, loyalty_tier: value }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select Tier" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                            {loyaltyTiers.map((loyalty) => (
                                                <SelectItem key={loyalty.tier_id} value={loyalty.tier} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                    {loyalty.tier}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select> */}
                                    <select
                                        id="tier"
                                        value={currentSpecial.loyalty_tier}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, loyalty_tier: e.target.value }))}
                                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
                                    >
                                        <option value="">Select Tier</option>
                                        <option value="All">All</option>
                                        {loyaltyTiers.map((loyalty) => (
                                            <option key={loyalty.tier_id} value={loyalty.tier}>
                                                {loyalty.tier}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="age-group" className="text-black text-xs sm:text-sm">Age Group</label>
                                    {/* <Select
                                        value={currentSpecial.age_group}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, age_group: value }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select Age Group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                            {ageGroups.map((group) => (
                                                <SelectItem key={group.age_group_id} value={group.age_range} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                    {group.group_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select> */}
                                    <select
                                        id="age-group"
                                        value={currentSpecial.age_group}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, age_group: e.target.value }))}
                                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
                                    >
                                        <option value="">Select Age Group</option>
                                        <option value="All">All</option>
                                        {ageGroups.map((group) => (
                                            <option key={group.age_group_id} value={group.age_range}>
                                                {group.group_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Dates */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="start-date" className="text-black text-xs sm:text-sm">Start Date</label>
                                    <Input
                                        id="start-date"
                                        type="date"
                                        value={currentSpecial.start_date}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, start_date: e.target.value }))}
                                        className="mt-1 cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="end-date" className="text-black text-xs sm:text-sm">End Date</label>
                                    <Input
                                        id="end-date"
                                        type="date"
                                        value={currentSpecial.expiry_date}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, expiry_date: e.target.value }))}
                                        className="mt-1 cursor-pointer"
                                    />
                                </div>
                            </div>

                            { /* Organisation x Branch */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="organisation" className="text-black text-xs sm:text-sm">Organisation</label>
                                    {/* <Select
                                        value={currentSpecial.organisation}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, organisation: value }))}
                                        disabled={!organisations || organisations.length === 0}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder={organisations && organisations.length > 0 ? "Select Organisation" : "No organisations available"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {organisations && organisations.length > 0 && (
                                                organisations.map((org) => (
                                                    <SelectItem key={org.uid} value={org.uid.toString()} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                        {org.name}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select> */}
                                    <select
                                        id="organisation"
                                        value={currentSpecial.organisation || ''}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, organisation: e.target.value }))}
                                        disabled={!organisations || organisations.length === 0}
                                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">
                                            {organisations && organisations.length > 0 ? "Select Organisation" : "No organisations available"}
                                        </option>
                                        {organisations && Array.isArray(organisations) && organisations.length > 0 && (
                                            organisations.map((org) => (
                                                <option key={org.uid} value={org.uid.toString()}>
                                                    {org.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="branch" className="text-black text-xs sm:text-sm">Branch</label>
                                    {/* <Select
                                        value={currentSpecial.branch}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, branch: value }))}
                                        disabled={!branches || branches.length === 0}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder={branches && branches.length > 0 ? "Select Branch" : "No branches available"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {branches && branches.length > 0 && (
                                                branches.map((branch) => (
                                                    <SelectItem key={branch.uid} value={branch.uid.toString()} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                        {branch.name}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select> */}
                                    <select
                                        id="branch"
                                        value={currentSpecial.branch || ''}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, branch: e.target.value }))}
                                        disabled={!branches || branches.length === 0}
                                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="">
                                            {branches && branches.length > 0 ? "Select Branch" : "No branches available"}
                                        </option>
                                        {branches && Array.isArray(branches) && branches.length > 0 && (
                                            branches.map((branch) => (
                                                <option key={branch.uid} value={branch.uid.toString()}>
                                                    {branch.name}
                                                </option>
                                            ))
                                        )}
                                    </select>
                                </div>
                            </div>

                            {/* Store and Active Toggle */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-end">
                                <div>
                                    <label htmlFor="store-id" className="text-black text-xs sm:text-sm">Store ID</label>
                                    {/* <Select
                                        value={currentSpecial.store_id}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, store_id: value }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select store ID" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                            {allStores.map((branch) => (
                                                <SelectItem key={branch.id} value={branch.code} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                    {branch.code}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select> */}
                                    <select
                                        id="store-id"
                                        value={currentSpecial.store_id}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, store_id: e.target.value }))}
                                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
                                    >
                                        <option value="">Select store ID</option>
                                        <option value="All">All</option>
                                        {allStores.map((branch) => (
                                            <option key={branch.id} value={branch.code}>
                                                {branch.code}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col items-center justify-center space-x-2 pr-56 pb-4">
                                    <label htmlFor="active-toggle" className="text-black text-xs sm:text-sm">
                                        Active
                                    </label>
                                    <Switch
                                        id="active-toggle"
                                        checked={currentSpecial.isActive}
                                        onCheckedChange={(checked) =>
                                            setCurrentSpecial(prev => ({ ...prev, isActive: checked }))
                                        }
                                    />
                                </div>
                            </div>

                            {/* Special Price */}
                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="special-price" className="text-black text-xs sm:text-sm">Price</label>
                                    <Input
                                        id="special-price"
                                        type="number"
                                        value={currentSpecial.special_price || ''}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special_price: parseFloat(e.target.value) }))}
                                        placeholder="Enter special price"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Product Search */}
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
                                            onClick={() => addProductToSpecial(product)}
                                            disabled={currentSpecial.products.length >= 5}
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

                            {/* Selected Products */}
                            <div>
                                <label className="text-black text-xs sm:text-sm">Selected Products</label>
                                <div className="space-y-2 mt-1">
                                    {currentSpecial.products.map((product) => (
                                        <Card key={product.id} className="p-2 flex justify-between items-center">
                                            <span className="text-black font-bold text-xs sm:text-sm truncate">{product.name}</span>
                                            <div className="flex items-center space-x-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Group ID"
                                                    value={product.groupId}
                                                    onChange={(e) => updateProductGroupId(product.id, e.target.value)}
                                                    className="w-24 text-xs sm:text-sm"
                                                />
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeProductFromSpecial(product.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                                <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                    Cancel
                                </Button>
                                <Button onClick={saveSpecial} className="bg-green hover:bg-emerald-300 text-white">
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