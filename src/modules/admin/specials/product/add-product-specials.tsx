'use client'

import { format } from "date-fns";
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Search, Check, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgeGroupsResponse, TiersResponse, StoresResponse, Products, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Special, SpecialInfo, SpecialInfoRes } from '@/modules/types/special/product/data-types'
import { useSession } from '@/context';
import { Item, ItemsResponse } from "@/modules/types/products/product-types";
import { apiClient } from "@/utils/api-client";
import { getOrganisations } from "@/components/data/organisation/get-organisations-data";
import { Organisation } from "@/modules/types/organisation/organisation-types";
import { Branch } from "@/modules/types/branch/branches-types";
import { getBranches } from "@/components/data/branch/get-branches-data";

interface Props {
    onClose: () => void; 
}

export type CombinedSpecial = {
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
    product: Item | null
}

export function AddProductsSpecials({ onClose }: Props) {
    const { user } = useSession();
    const [specials, setSpecials] = useState<Special[]>([])
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
        product: null
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

    const displayedProducts = searchProducts.slice(0, 3);

    const fetchProducts = async () => {
        try {
            const url = `inventory/get-products`;
            const response = await apiClient.get<ItemsResponse>(`${apiEndPoint}/${url}`);
            const products = response?.data || []; // Added safer access to nested property
            setAllProducts(products);

        } catch (error) {
            console.error('Error fetching products:', error);
            setAllProducts([]); // Ensure state is reset on error
        }
    };

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
            setLoyaltyTiers(response.data)
            console.log("response on loyalty-tiers fetched: ", response.data)
        } catch (error) {
            console.error('Error RETURNING TIERS:', error)
        }
    }
    
    const getAgeGroups = async () => {
        try {
            const url = `age-group/get-age-groups`
            const response = await apiClient.get<AgeGroupsResponse>(`${apiEndPoint}/${url}`)
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
    
    const addProductToSpecial = (product: Item) => {
        setCurrentSpecial(prev => ({
            ...prev,
            product: product,
                id: product.id.toString(),
                description_1: product.description_1,
                price: product.selling_incl_1,
                item_code: product.item_code
            }))
        // }))
    }

    const removeProductFromSpecial = () => {
        setCurrentSpecial(prev => ({
            ...prev,
            product: null
        }))
    }

    const saveSpecial = async () => {
        try {
            const specialType = 'Special'
            console.log("selected organisation value: ", currentSpecial.organisation)
            console.log("selected branch value: ", currentSpecial.branch)

            // const newOrgId = currentSpecial.organisation
            // const newBrId = currentSpecial.branch
            const newOrgId = Number(currentSpecial.organisation);
            const newBrId = Number(currentSpecial.branch);
            
            // const selectedStore = allStores.find(store => store.code === currentReward.store_id);
            // const region = selectedStore ? selectedStore.address_4 : ''; 
    
            // Function to format date with default time (00:00:00)
            const formatDate = (dateStr: string): string => {
                if (!dateStr) return '';
                return `${dateStr} 00:00:00`;
            };

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
                organisationId: currentSpecial.organisation,
                branchId: currentSpecial.branch,
            }

            const url = `specials/save-special`
            const response = await apiClient.post<Special>(`${apiEndPoint}/${url}`, payload)

            toast.success('Special saved successfully', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            })

            fetchSpecialInfo()
        } catch (error) {
            console.error('Error saving special:', error)
            
            toast.error('Error saving special', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    const fetchSpecialInfo = async () => {
        try {
            const url = `specials/get-special-info/${currentSpecial.special_name}`;
            const response = await apiClient.get<SpecialInfoRes>(`${apiEndPoint}/${url}`);
            console.log('The Special ID has been fetched successfully:', response.data);
    
            setSpecialID(response?.data);
    
            if (response.data.length > 0) {
                saveSpecialItems(response.data[0].special_id);
                
                logUserActivity(response.data[0]);
    
                // toast.success('Special Info Fetched, now saving items', {
                //     icon: <Check color={colors.blue} size={24} />,
                //     duration: 3000,
                // });
            } else if (response.data.length == 0) {
                toast.success('No special data, returning', {
                    icon: <Check color={colors.blue} size={24} />,
                    duration: 3000,
                });
    
                console.error('No special data returned: ', response.data);
            }
        } catch (error) {
            console.error('Error fetching special ID:', error);
        }
    };
    
    const saveSpecialItems = async (specialId: number) => {
        console.log('passed special id from info function: ', specialId);

        try {
            const payload = {
                special_id: specialId,
                item_code: currentSpecial.product?.item_code,
                product_description: currentSpecial.product?.description_1,
            }

            console.log('special items payload: ', payload)

            const url = `specials/save-special-items`
            const response = await apiClient.post<Special>(`${apiEndPoint}/${url}`, payload)
            console.log('The Special item has been saved with its ID:', response.data)

            if (response.status === 200) {
                toast.success('Special Items Saved', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                })
            }

            onClose();
        } catch (error) {
            console.error('Error saving special with its product:', error)
            
            toast.success('There was an error when saving the special items', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }
    
    const logUserActivity = async (special: SpecialInfo) => {
        const timeLogged = format(new Date(), "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX");
        const message = "User created a new normal special";
    
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
        fetchProducts();
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
                        <CardTitle>Create Product Special</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Set the special with the required fields and assign all the products linked to the special. Click Save Special once completed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            { /* Special Name x Special Fields */}
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

                            { /* Description x Special Type */}
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
                                    <Select
                                        value={currentSpecial.special_value}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, special_value: value as 'Percentage' | 'Amount' }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select special type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Percentage" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">Percentage</SelectItem>
                                            <SelectItem value="Amount" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">Amount</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            { /* Loyalty Tier x Age Group */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="tier" className="text-black text-xs sm:text-sm">Loyalty Tier</label>
                                    <Select
                                        value={currentSpecial.loyalty_tier}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, loyalty_tier: value }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select Tier" />
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
                                    <label htmlFor="age-group" className="text-black text-xs sm:text-sm">Age Group</label>
                                    <Select
                                        value={currentSpecial.age_group}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, age_group: value }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select Age Group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All">All</SelectItem>
                                            {ageGroups.map((group) => (
                                                <SelectItem key={group.age_group_id} value={group.age_range}>
                                                    {group.group_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            { /* StartDate x EndDate */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="start-date" className="text-black text-xs sm:text-sm">Start Date</label>
                                    <Input
                                        id="start-date"
                                        type="date"
                                        className="cursor-pointer"
                                        value={currentSpecial.start_date}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, start_date: e.target.value }))}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="end-date" className="text-black text-xs sm:text-sm">End Date</label>
                                    <Input
                                        id="end-date"
                                        type="date"
                                        className="cursor-pointer"
                                        value={currentSpecial.expiry_date}
                                        onChange={(e) => setCurrentSpecial(prev => ({ ...prev, expiry_date: e.target.value }))}
                                    />
                                </div>
                            </div>

                            { /* Organisation x Branch */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="organisation" className="text-black text-xs sm:text-sm">Organisation</label>
                                    <Select
                                        value={currentSpecial.organisation}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, organisation: value }))}
                                    >
                                        <SelectTrigger className="w-full mt-1">
                                            <SelectValue placeholder="Select Organisation" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                            {/* {organisations?.map((org) => ( */}
                                                <SelectItem value={userOrganisationUid.toString()} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                    {userOrganisation}
                                                </SelectItem>
                                            {/* // ))} */}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <label htmlFor="branch" className="text-black text-xs sm:text-sm">Branch</label>
                                    <Select
                                        value={currentSpecial.branch}
                                        onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, branch: value }))}
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

                            { /* StoreID x Active */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 items-end">
                                <div>
                                    <label htmlFor="store-id" className="text-black text-xs sm:text-sm">Store ID</label>
                                    <Select
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
                                    </Select>
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

                            { /* Price */}
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

                            { /* Search Products */}
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

                            { /* Displayed Products */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {displayedProducts.length > 0 ? (
                                    displayedProducts.map((product) => (
                                        <Button
                                            key={product.id}
                                            onClick={() => addProductToSpecial(product)}
                                            disabled={currentSpecial.product !== null}
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

                            { /* Selected Product */}
                            <div>
                                <label className="text-black text-xs sm:text-sm">Selected Product</label>
                                {currentSpecial.product && (
                                    <Card className="p-2 flex justify-between items-center mt-1">
                                        <span className="text-black font-bold text-xs sm:text-sm truncate">{currentSpecial.product.description_1}</span>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={removeProductFromSpecial}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </Card>
                                )}
                            </div>

                            { /* Action Buttons: SaveSpecial x Cancel */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                                <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                    Cancel
                                </Button>
                                <Button onClick={saveSpecial} className="bg-green hover:bg-emerald-300 text-white">
                                    Save Special
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}