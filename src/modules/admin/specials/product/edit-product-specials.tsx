'use client'

import { format } from "date-fns";
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Search, Check, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgeGroupsResponse, TiersResponse, StoresResponse, Products, ProductDescription, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Special, SaveSpecial, SpecialItems, SpecialInfo, SpecialInfoRes, UpdateSpecialItems } from '@/modules/types/special/product/data-types'
import { useSession } from '@/context';
import { ProductSpecialsProps } from "./product-specials";
import { getOrganisations } from "@/components/data/organisation/get-organisations-data";
import { Organisation } from "@/modules/types/organisation/organisation-types";
import { Branch } from "@/modules/types/branch/branches-types";
import { getBranches } from "@/components/data/branch/get-branches-data";
import { getInventory } from "@/components/data/inventory/get-inventory";
import { Item } from "@/modules/types/products/product-types";
//import { CombinedSpecial } from "./add-product-specials";


interface Props {
    onClose: () => void;  // Corrected syntax here
    selectedSpecial: ProductSpecialsProps | null;
}

//old product data
type Product = {
    id: string
    name: string
    price: number
    item_code: string
}

type SpecialProduct = Product & {
    
}

//old special data
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
}

export function EditProductSpecials ({ onClose, selectedSpecial }: Props) {
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

    // First filter products based on search term
    const searchProducts = allProducts.filter(product =>
        product?.description_1 && 
        product.description_1.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Then limit to first 3 matches
    const displayedProducts = searchProducts.slice(0, 3);
    console.log("selected special: ", selectedSpecial)

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
            setLoyaltyTiers(response.data)
        } catch (error) {
            console.error('Error RETURNING TIERS:', error)
        }
    }
    
    const getAgeGroups = async () => {
        try {
            const url = `age-group/get-age-groups`
            const response = await axios.get<AgeGroupsResponse>(`${apiEndPoint}/${url}`)
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

    const getAllBranches = useCallback(async () => {
        try {
            const branchesData = await getBranches(user)
            setBranches(branchesData)
            console.log("all branches returned bro: ", branchesData)
        } catch (error) {
            console.error('error fetching all branches bro:', error)
        }
    }, [user])
    
    const addProductToSpecial = (product: Item) => {
        setCurrentSpecial(prev => ({
            ...prev,
            product: {
                id: product.id.toString(),
                name: product?.description_1 || '',
                price: product.selling_incl_1,
                item_code: product.item_code
            }
        }))
    }

    const removeProductFromSpecial = () => {
        setCurrentSpecial(prev => ({
            ...prev,
            product: null
        }))
    }

    const updateSpecial = async () => {
        try {
            const specialType = 'Special'

            // const selectedStore = allStores.find(store => store.code === currentReward.store_id);
            // const region = selectedStore ? selectedStore.address_4 : ''; 
    
            // Function to format date with default time (00:00:00)
            const formatDate = (dateStr: string): string => {
                if (!dateStr) return '';
                return `${dateStr} 00:00:00`;
            };

            // Fixed: frontend payload no longer sends organisationId — implicit via private DB connection
            // Only include branchId if it's a valid number (not "All" or empty)
            const branchId = currentSpecial.branch && currentSpecial.branch !== 'All' 
                ? parseInt(currentSpecial.branch) 
                : undefined;

            const payload: any = {
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
            };

            // Removed: organisationId — implicit via private DB connection in multi-tenancy
            // Only add branchId if it's a valid number
            if (branchId && !isNaN(branchId)) {
                payload.branchId = branchId;
            }

            const url = `specials/update-special/${selectedSpecial?.special_id}`
            const response = await axios.patch<Special>(`${apiEndPoint}/${url}`, payload)
            console.log('The Special has been saved successfully:', response.data)

            if (response.status === 200) {
                updateSpecialItems();
            } else {
                toast.error('Special Not Updated', {
                    icon: <X color={colors.red} size={24} />,
                    duration: 3000,
                })
            }
            
        } catch (error) {
            console.error('Error saving special:', error)
            
            toast.success('There was an error when saving the special', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }
    
    //     try {
    //         const url = `specials/get-special-info/${currentSpecial.special_name}`;
    //         const response = await axios.get<SpecialInfoRes>(`${apiEndPoint}/${url}`);
    //         console.log('The Special ID has been fetched successfully:', response.data);
    
    //         setSpecialID(response?.data);
    
    //         if (response.data.length > 0) {
    //             saveSpecialItems(response.data[0].special_id); // save the items
                
    //             logUserActivity(response.data[0]); // Pass the fetched data directly to logUserActivity
    
    //             toast.success('Special Info Fetched, now saving items', {
    //                 icon: <Check color={colors.blue} size={24} />,
    //                 duration: 3000,
    //             });
    
    //             console.error('Special info returned: ', response.data);
    //         } else if (response.data.length == 0) {
    //             toast.success('No special data, returning', {
    //                 icon: <Check color={colors.blue} size={24} />,
    //                 duration: 3000,
    //             });
    
    //             console.error('No special data returned: ', response.data);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching special ID:', error);
    //     }
    // };
    
    const updateSpecialItems = async () => {
        try {
            const payload = {
                item_code: currentSpecial.product?.item_code,
                product_description: currentSpecial.product?.name,
            }

            console.log('special items payload: ', payload)

            const url = `specials/update-special-item/${selectedSpecial?.special_id}`
            const response = await axios.patch<UpdateSpecialItems>(`${apiEndPoint}/${url}`, payload)
            console.log('The Special item has been saved with its ID:', response.data)

            if (response.status === 200) {
                toast.success('Special Updated', {
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
                time_logged: timeLogged,
                log_message: message,
            };
    
            const url = `logs/log-user-activity`;
            const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
            console.log('The User\'s activity has been logged!', response.data);
    
            if (response.status === 200) {
                toast.success('Activity logged!', {
                    icon: <Check color={colors.orange} size={24} />,
                    duration: 3000,
                });
            }
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
    }, [fetchInventory, getAllBranches]);

    useEffect(() => {
        if (selectedSpecial) {
            setCurrentSpecial({
                special_name: selectedSpecial.special_name,
                special: selectedSpecial.special,
                description: selectedSpecial.description,
                special_type: selectedSpecial.special_type as 'Percentage' | 'Amount',
                store_id: selectedSpecial.store_id,
                start_date: selectedSpecial.start_date,
                expiry_date: selectedSpecial.expiry_date,
                special_value: selectedSpecial.special_value,
                loyalty_tier: selectedSpecial.loyalty_tier,
                age_group: selectedSpecial.age_group,
                isActive: selectedSpecial.isActive,
                special_price: parseFloat(selectedSpecial.special_price),
                organisation: user?.organisation?.uid?.toString() || '',
                branch: user?.branch?.uid?.toString() || '',
                product: null,
            });
        }
    }, [selectedSpecial, user]);

    // Find and set the product when both selectedSpecial and allProducts are available
    useEffect(() => {
        // Check for specialItems (array) - the actual API response structure
        // The product_description in the API is actually the item_code
        const specialItems = (selectedSpecial as any)?.specialItems;
        const productIdentifier = specialItems?.[0]?.product_description || 
                                  selectedSpecial?.specialItem?.product_description;
        
        if (productIdentifier && allProducts.length > 0) {
            // Find the product that matches by item_code (product_description in API is actually item_code)
            const matchedProduct = allProducts.find(product => 
                product?.item_code === productIdentifier
            );

            if (matchedProduct) {
                setCurrentSpecial(prev => ({
                    ...prev,
                    product: {
                        id: matchedProduct.id.toString(),
                        name: matchedProduct.description_1 || '',
                        price: matchedProduct.selling_incl_1,
                        item_code: matchedProduct.item_code
                    }
                }));
            } else {
                console.log('Product not found in inventory by item_code:', productIdentifier);
                console.log('Available item_codes:', allProducts.map(p => p.item_code));
            }
        }
    }, [selectedSpecial, allProducts]);

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
                    <CardTitle>Edit Special</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Set the special with the required fields and assign all the products linked to the special. Click Save Special once completed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
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
                                    value={currentSpecial.special_type}
                                    onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, special_type: value as 'Percentage' | 'Amount' }))}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select special type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Percentage">Percentage</SelectItem>
                                        <SelectItem value="Amount">Amount</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

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
                                <Select
                                    value={currentSpecial.organisation}
                                    onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, organisation: value }))}
                                >
                                    <SelectTrigger className="w-full mt-1">
                                        <SelectValue placeholder="Select Organisation" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                        <SelectItem value={user?.organisation?.uid?.toString() || ''} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                            {user?.organisation?.name || 'User Organisation'}
                                        </SelectItem>
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
                                        <SelectItem value="All">All</SelectItem>
                                        {allStores.map((branch) => (
                                            <SelectItem key={branch.id} value={branch.code}>
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                            {displayedProducts.map((product) => (
                                <Button
                                    key={product.id}
                                    onClick={() => addProductToSpecial(product)}
                                    disabled={currentSpecial.product !== null}
                                    className="justify-start bg-white text-black text-xs sm:text-sm"
                                >
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    <span className="truncate">{product?.description_1 || 'No description'}</span>
                                </Button>
                            ))}
                        </div>

                        <div>
                            <label className="text-black text-xs sm:text-sm">Selected Product</label>
                            {currentSpecial.product && (
                                <Card className="p-2 flex justify-between items-center mt-1">
                                    <span className="text-xs sm:text-sm text-black font-bold truncate">{currentSpecial.product.name}</span>
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

                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                            <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                Cancel
                            </Button>
                            <Button onClick={updateSpecial} className="bg-green hover:bg-emerald-300 text-white">
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