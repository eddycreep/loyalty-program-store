'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { Check, X, Search, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AgeGroupsResponse, TiersResponse, StoresResponse, Products, ProductDescription, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Special, SaveSpecial, SpecialItems, SpecialInfo, SpecialInfoRes } from '@/modules/types/special/product/data-types'


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
  product: SpecialProduct | null
  products: SpecialProduct[]
}

export function AddCombinedSpecials({ onClose }: Props) {
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
        product: null,
        products: []
    })

    const [searchTerm, setSearchTerm] = useState('')
    const [specialID, setSpecialID] = useState<SpecialInfoRes>([])

    const [allProducts, setAllProducts] = useState<Products[]>([])
    const [allStores, setAllStores] = useState<StoresResponse>([]);
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([]);
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([]);



        // First filter products based on search term
    const searchProducts = allProducts.filter(product =>
        product.inventory.description_1.toLowerCase().includes(searchTerm.toLowerCase())
    )

    // Then limit to first 3 matches
    const displayedProducts = searchProducts.slice(0, 3);

    const fetchProducts = async () => {
        try {
            const url = `inventory/get-products`;
            const response = await axios.get<ProductsResponse>(`${apiEndPoint}/${url}`);
            setAllProducts(response?.data.results || []);

        } catch (error) {
            console.error('error fetching products: ', error);
        }
    };

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

    const addProductToSpecial = (product: Products) => {
        // Check if we haven't reached the product limit
        if (currentSpecial.products.length >= 5) {
        toast.error('Maximum of 5 products allowed per special');
        return;
        }

        // Convert the inventory product to the SpecialProduct format
        const specialProduct: SpecialProduct = {
            id: product.id.toString(), // Convert to string since SpecialProduct.id is string
            name: product.inventory.description_1,
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
            }

            const url = `specials/save-special`
            const response = await axios.post<Special>(`${apiEndPoint}/${url}`, payload)
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
            const response = await axios.get<SpecialInfoRes>(`${apiEndPoint}/${url}`);
            console.log('The Special ID has been fetched successfully:', response.data);

            setSpecialID(response?.data);

            if (response.data.length > 0) {
                saveSpecialItems(response.data[0].special_id); // save the items
                
                //logUserActivity(response.data[0]); // Pass the fetched data directly to logUserActivity

                toast.success('Special Info Fetched, now saving items', {
                    icon: <Check color={colors.blue} size={24} />,
                    duration: 3000,
                });

                console.error('Special info returned: ', response.data);
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
            // Loop through each product in currentSpecial.products
            for (let i = 0; i < currentSpecial.products.length; i++) {
                const product = currentSpecial.products[i];
                
                const payload: CombinedSpecialItems = {
                    special_id: specialId,
                    special_group_id: i + 1, // Assign sequential group IDs (1, 2, 3)
                    product_description: product.name // Use the product name from the SpecialProduct
                };

                console.log('saving special item payload:', payload);

                const url = `specials/save-combined-special-items`;
                const response = await axios.post<CombinedSpecialItems>(
                    `${apiEndPoint}/${url}`, 
                    payload
                );

                console.log('Special item saved successfully:', response.data);
            }

            // Show success toast after all items are saved
            toast.success('Special Saved', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

        } catch (error) {
            console.error('Special Items Not Saved:', error);
            
            toast.error('Error saving special items', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    // const logUserActivity = async (special: SpecialInfo) => {
    //     const timeLogged = format(new Date(), "EEE MMM dd yyyy HH:mm:ss 'GMT'XXX");
    //     const message = "User created a new normal special";

    //     try {
    //         const payload = {
    //             emp_id: user.emp_id,
    //             emp_name: user.emp_name,
    //             activity_id: special.special_id,
    //             activity: special.special_name,
    //             activity_type: special.special_type,
    //             time_logged: timeLogged,
    //             log_message: message,
    //         };

    //         const url = `logs/log-user-activity`;
    //         const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
    //         console.log('The User\'s activity has been logged!', response.data);

    //         if (response.status === 200) {
    //             toast.success('Activity logged!', {
    //                 icon: <Check color={colors.orange} size={24} />,
    //                 duration: 3000,
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error logging activity:', error);

    //         toast.error('Error logging activity!', {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         });
    //     }
    // };

    useEffect(() => {
        fetchProducts();
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
    }, []);

    return (
        <div className="fixed inset-0 z-50">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <Card className="mb-6 w-[600px]">
                <div className="flex justify-end pr-4 pt-4">
                    <button onClick={ onClose }>
                        <X className="h-4 w-4" color="red" />
                    </button>
                </div>
                <CardHeader>
                    <CardTitle>Create Combined Special</CardTitle>
                    <CardDescription>
                    Set the special with the required fields and assign all the products linked to the special. Click Save Special once completed.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-full">
                            <label htmlFor="special-name" className="text-black text-sm">Special Name</label>
                            <Input
                                id="special-name"
                                value={currentSpecial.special_name}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special_name: e.target.value }))}
                                placeholder="back to school special"
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="special-name">Special</Label>
                            <Input

                                id="special-name"
                                value={currentSpecial.special}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special: e.target.value }))}
                                placeholder="10% OFF"
                            />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={currentSpecial.description}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="buy 3 or more school supplies and get 20% off your total purchase."
                            />
                        </div>
                        <div className="w-full">
                            <Label htmlFor="special-type">Special Type</Label>
                            <Select
                                value={currentSpecial.special_value}
                                onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, special_value: value as 'Percentage' | 'Amount' }))}
                            >
                                <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select special type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Percentage">Percentage</SelectItem>
                                    <SelectItem value="Amount">Amount</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <Label htmlFor="tier">Loyalty Tier</Label>
                            <Select
                                value={currentSpecial.loyalty_tier}
                                onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, loyalty_tier: value }))}
                            >
                                <SelectTrigger className="w-full">
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
                        <div className="w-full">
                            <Label htmlFor="age-group">Age Group</Label>
                            <Select
                                value={currentSpecial.age_group}
                                onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, age_group: value }))}
                            >
                                <SelectTrigger className="w-full">
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
                    
                    <div className="flex gap-4">
                        <div className="w-full">
                        <Label htmlFor="start-date">Start Date</Label>
                        <Input
                            id="start-date"
                            type="date"
                            value={currentSpecial.start_date}
                            onChange={(e) => setCurrentSpecial(prev => ({ ...prev, start_date: e.target.value }))}
                        />
                        </div>
                        <div className="w-full">
                        <Label htmlFor="end-date">End Date</Label>
                        <Input
                            id="end-date"
                            type="date"
                            value={currentSpecial.expiry_date}
                            onChange={(e) => setCurrentSpecial(prev => ({ ...prev, expiry_date: e.target.value }))}
                        />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-[500px]">
                            <Label htmlFor="store-id">Store ID</Label>
                            {/* Changed the input field to a select dropdown to display store IDs */}
                            <Select
                                value={currentSpecial.store_id}
                                onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, store_id: value }))}
                            >
                                <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select store ID" />
                                </SelectTrigger>
                                <SelectContent>
                                {/* Mapping through the stores array to create options for the dropdown */}
                                <SelectItem value="All">All</SelectItem> {/* Added "All" option */}
                                {allStores.map((branch) => (
                                    <SelectItem key={branch.id} value={branch.code}>
                                        {branch.code}
                                    </SelectItem>
                                ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-col items-center space-x-2 pt-2">
                            <Label htmlFor="active-toggle">
                                Active
                            </Label>
                            <div className="pt-2">
                                <Switch
                                    id="active-toggle"
                                    checked={currentSpecial.isActive}
                                    onCheckedChange={(checked) =>
                                        setCurrentSpecial(prev => ({ ...prev, isActive: checked }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-full">
                            <Label htmlFor="special-price">Price</Label>
                            <Input
                                id="special-price"
                                type="number" // Changed from 'text' or other types to 'number' to allow numeric input
                                // step="0.01" // Added 'step' attribute to allow decimal numbers
                                value={currentSpecial.special_price || ''}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special_price: parseFloat(e.target.value) }))}
                                placeholder="Enter special price"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="product-search">Search Products</Label>
                        <div className="flex space-x-2">
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

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {displayedProducts.map((product) => (
                    <Button
                        key={product.id}
                        variant="outline"
                        onClick={() => addProductToSpecial(product)}
                        disabled={currentSpecial.products.length >= 3 || currentSpecial.products.some(p => p.id === product.id.toString())} // Convert to string for comparison
                        className="justify-start"
                    >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        {product.inventory.description_1}
                    </Button>
                    ))}
                </div>

                <div className="mt-4">
                    <Label>Products (Max 5)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {currentSpecial.products.map((product) => (
                        <Card key={product.id} className="p-2 flex justify-between items-center">
                        <span>{product.name}</span>
                        <div className="flex items-center space-x-2">
                            {/* <Input
                            value={product.groupId}
                            onChange={(e) => updateProductGroupId(product.id, e.target.value)}
                            placeholder="Group ID"
                            className="w-32"
                            /> */}
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

                        <div className="flex gap-4">
                            <Button onClick={ onClose } className="bg-red hover:bg-rose-300 w-full">
                                Cancel
                            </Button>
                            <Button onClick={ saveSpecial } className="bg-green hover:bg-emerald-300 w-full">
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