'use client'

import { format } from "date-fns";
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Search, Check, PlusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from '@/context';


interface Props {
  onClose: () => void;  // Corrected syntax here
}

//new special data
interface Special {
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

//special items
interface SpecialItems {
    special_id: number,
    product_description: string,
    special_price: string
}

interface SpecialInfo {
    special_id: number,
    special_name: string,
    special: string,
    special_type: string
}
type SpecialInfoRes = SpecialInfo[]

//old product data
type Product = {
    id: string
    name: string
    price: number
    item_code: string
}

//new product data
interface ProductsData {
    id: number,
    item_code: string
    selling_incl_1: number,
    special_price_incl: number,
    description_1: string
}
type ProductsDataRes = ProductsData[]

type SpecialProduct = Product & {
    
}

//old special data
type CombinedSpecial = {
    id: string
    name: string
    special: string
    products: SpecialProduct[]
    specialPrice: number
    specialValue: 'Percentage' | 'Amount'
    storeId: string
    startDate: string
    endDate: string
    isActive: boolean
}

const stores = [
  { id: 1, store_id: 'SOO1', store: 'PLUS DC Stellenbosch' },
  { id: 2, store_id: 'SOO2', store: 'PLUS DC Albertin' },
  { id: 3, store_id: 'SOO3', store: 'PLUS DC Bellville' },
  { id: 4, store_id: 'SOO4', store: 'PLUS DC Nelspruit' },  // Random place added
  { id: 5, store_id: 'SOO5', store: 'PLUS DC Durbanville' },
  { id: 6, store_id: 'SOO6', store: 'PLUS DC Bloemfontein' },  // Random place added
  { id: 7, store_id: 'SOO7', store: 'PLUS DC Cape Town' },
  { id: 8, store_id: 'SOO8', store: 'PLUS DC Pietermaritzburg' },  // Random place added
  { id: 9, store_id: 'SOO9', store: 'PLUS DC East London' },  // Random place added
  { id: 10, store_id: 'SOO10', store: 'PLUS DC Pretoria' },
  { id: 11, store_id: 'SOO11', store: 'PLUS DC Germiston' },
  { id: 12, store_id: 'SOO12', store: 'PLUS DC Polokwane' },
];

// user activity
interface UserActivity {
    emp_id: number,
    emp_name: string,
    activity_id: number,
    activity: string,
    activity_type: string,
    time_logged: string,
    log_message: string,
}


export function AddProductsSpecials({ onClose }: Props) {
    const { user } = useSession();
    const [specials, setSpecials] = useState<CombinedSpecial[]>([])
    const [currentSpecial, setCurrentSpecial] = useState<CombinedSpecial>({
        id: '',
        name: '',
        special: '',
        products: [],
        specialPrice: 0,
        specialValue: 'Amount',
        storeId: '',
        startDate: '',
        endDate: '',
        isActive: true
    })
    const [searchTerm, setSearchTerm] = useState('')
    const [specialID, setSpecialID] = useState<SpecialInfoRes>([])

    const [allProducts, setAllProducts] = useState<ProductsDataRes>([])

    const searchProducts = allProducts.filter(product =>
        product.description_1.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const displayedProducts = searchProducts.slice(0, 3); // Modified to limit products to 3

    const fetchProducts = async () => {
        try {
            const url = `products/getproducts`;
            const response = await axios.get<ProductsDataRes>(`${apiEndPoint}/${url}`);
            console.log('products data:', response.data);
    
            setAllProducts(response?.data);
    
            if (response.status === 200) {
                toast.success('Products Fetched', {
                    icon: <Check color={colors.blue} size={24} />,
                    duration: 3000,
                });

            } else {
                toast.error('Products Failed', {
                    icon: <Check color={colors.blue} size={24} />,
                    duration: 3000,
                });
    
                console.error('Products Failed: ', response.data);
            }

        } catch (error) {
            console.error('error fetching products: ', error);
        }
    };
    
    const addProductToSpecial = (product: Product) => {
        // Allow adding only one product
        if (currentSpecial.products.length === 0) {
            setCurrentSpecial(prev => ({
            ...prev,
            products: [{ ...product, groupId: '' }]
            }))
        }
    }

    const removeProductFromSpecial = (productId: string) => {
        setCurrentSpecial(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== productId)
        }))
    }

    const saveSpecial = async () => {
        try {
            const specialType = 'Special'
            
            const payload = {
                specialName: currentSpecial.name,
                special: currentSpecial.special,
                specialType: specialType,
                storeId: currentSpecial.storeId,
                startDate: currentSpecial.startDate,
                expiryDate: currentSpecial.endDate,
                specialValue: currentSpecial.specialValue,
                isActive: currentSpecial.isActive,
            }

            const url = `admin/savespecial`
            const response = await axios.post<Special>(`${apiEndPoint}/${url}`, payload)
            console.log('The Special has been saved successfully:', response.data)

            if (response.status === 200) {
                toast.success('The special has been saved successfully', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                })
            }

            fetchSpecialID() // fetch special id
        } catch (error) {
            console.error('Error saving special:', error)
            
            toast.success('There was an error when saving the special', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    const fetchSpecialID = async () => {
        try {
            const url = `admin/getspecialid/${currentSpecial.name}`;
            const response = await axios.get<SpecialInfoRes>(`${apiEndPoint}/${url}`);
            console.log('The Special ID has been fetched successfully:', response.data);
    
            setSpecialID(response?.data);
    
            if (response.data.length > 0) {
                saveSpecialItems(); // save the items
                
                logUserActivity(response.data[0]); // Pass the fetched data directly to logUserActivity
    
                toast.success('Executing user logging', {
                    icon: <Check color={colors.blue} size={24} />,
                    duration: 3000,
                });
    
                console.error('Special data returned: ', response.data);
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
    
    const saveSpecialItems = async () => {
        console.log('executing saving items: ', currentSpecial);

        // Destructure the 'name' property from the first item in the 'products' array
        const { id, products, specialPrice } = currentSpecial;
        const productName = products.length > 0 ? products[0].name : null;

        try {
            const payload = {
                specialid: id,
                productdescription: productName,
                specialprice: specialPrice
            }
            //http://localhost:4000/admin/save-special-items

            const url = `admin/save-special-items`
            const response = await axios.post<SpecialItems>(`${apiEndPoint}/${url}`, payload)
            console.log('The Special item has been saved with its ID:', response.data)

            if (response.status === 200) {
                toast.success('The special item has been saved successully', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                })
            }

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
                emp_id: user.emp_id,
                emp_name: user.emp_id,
                activity_id: special.special_id,
                activity: special.special_name,
                activity_type: special.special_type,
                time_logged: timeLogged,
                log_message: message,
            };
    
            const url = `users/log-user-activity`;
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

    return (
        <div className="container mx-auto p-4 relative">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <Card className="mb-6 w-[600px]">
                    <div className="flex justify-end pr-4 pt-4">
                        <button onClick={ onClose }>
                            <X className="h-4 w-4" color="red" />
                        </button>
                    </div>
                    <CardHeader>
                        <CardTitle>Create Special</CardTitle>
                        <CardDescription>
                            Set the special with the required fields and assign all the products linked to the special. Click Save Special once completed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-full">
                                <Label htmlFor="special-name">Special Name</Label>
                                <Input
                                id="special-name"
                                value={currentSpecial.name}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Enter special name"
                                />
                            </div>
                            <div className="w-full">
                                <Label htmlFor="special-name">Special</Label>
                                <Input
                                id="special-name"
                                value={currentSpecial.special}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special: e.target.value }))}
                                placeholder="Enter special"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-full">
                            <Label htmlFor="special-type">Special Type</Label>
                            <Select
                                value={currentSpecial.specialValue}
                                onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, specialValue: value as 'Percentage' | 'Amount' }))}
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
                            <div className="w-full">
                                <Label htmlFor="special-price">Special Price</Label>
                                <Input
                                id="special-price"
                                // type="number"
                                value={currentSpecial.specialPrice || ''}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, specialPrice: parseFloat(e.target.value) }))}
                                placeholder="Enter special price"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-full">
                            <Label htmlFor="start-date">Start Date</Label>
                            <Input
                                id="start-date"
                                type="date"
                                value={currentSpecial.startDate}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, startDate: e.target.value }))}
                            />
                            </div>
                            <div className="w-full">
                            <Label htmlFor="end-date">End Date</Label>
                            <Input
                                id="end-date"
                                type="date"
                                value={currentSpecial.endDate}
                                onChange={(e) => setCurrentSpecial(prev => ({ ...prev, endDate: e.target.value }))}
                            />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-[500px]">
                                <Label htmlFor="store-id">Store ID</Label>
                                {/* Changed the input field to a select dropdown to display store IDs */}
                                <Select
                                    value={currentSpecial.storeId}
                                    onValueChange={(value) => setCurrentSpecial(prev => ({ ...prev, storeId: value }))}
                                >
                                    <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select store ID" />
                                    </SelectTrigger>
                                    <SelectContent>
                                    {/* Mapping through the stores array to create options for the dropdown */}
                                    <SelectItem value="All">All</SelectItem> {/* Added "All" option */}
                                    {stores.map((store) => (
                                        <SelectItem key={store.id} value={store.store_id}>
                                        {store.store_id}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col items-center space-x-2 pt-2">
                                {/* Dynamic label based on isActive state */}

                                <Label htmlFor="active-toggle">
                                    {/* {currentSpecial.isActive ? 'Active' : 'In-Active'} */}
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

                        {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {displayedProducts.map((product) => (
                                <Button
                                    key={product.id}
                                    variant="outline"
                                    onClick={() => addProductToSpecial(product)}
                                    disabled={currentSpecial.products.length >= 1 || currentSpecial.products.some(p => p.id === product.id)}
                                    className="justify-start"
                                    >
                                    <PlusCircle className="h-4 w-4 mr-2" />
                                    {product.name}
                                </Button>
                            ))}
                        </div> */}

                        <div className="mt-4">
                            <Label>Product</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {currentSpecial.products.map((product) => (
                                <Card key={product.id} className="p-2 flex justify-between items-center">
                                <span>{product.name}</span>
                                <div className="flex items-center space-x-2">
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

                        <Button 
                            onClick={ saveSpecial } 
                            className="bg-green hover:bg-emerald-300"
                            // disabled={currentSpecial.products.length === 0 || !currentSpecial.name || currentSpecial.specialPrice <= 0 || !currentSpecial.storeId || !currentSpecial.startDate || !currentSpecial.endDate}
                        >
                            Save Special
                        </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}