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


interface Props {
  onClose: () => void;
  selectedSpecial: Special | null; // Updated to allow null values if no special is selected
}

//specials
export interface Special {
    special_id: number,
    special_name: string,
    special: string,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: boolean,
    product_description: string | null;
    special_price: number,
}

//special items - individual x combined
interface SpecialItems {
    special_id: number
    product_description: string,
    special_price: string
}

//get special id
interface SpecialIDProps {
    special_id: number
}


type Product = {
    id: string
    name: string
    price: number
    item_code: string
}

type SpecialProduct = Product & {
    
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

export function EditProductSpecials ({ onClose, selectedSpecial }: Props) {
  const [specials, setSpecials] = useState<Special[]>([])
  const [currentSpecial, setCurrentSpecial] = useState<Special>({
    special_id: 0,
    special_name: '',
    special: '',
    special_type: '',
    store_id: '',
    start_date: '',
    expiry_date: '',
    special_value: '',
    isActive: false,
    product_description: '',
    special_price: 0,
  })

 // Synchronize `selectedSpecial` data with `currentSpecial` when `selectedSpecial` changes
  useEffect(() => {
    if (selectedSpecial) {
      setCurrentSpecial(selectedSpecial);
    }
  }, [selectedSpecial]);


  const [searchTerm, setSearchTerm] = useState('')
  const [specialID, setSpecialID] = useState(0)

  // Mock product data (replace with actual API call in production)
  const allProducts: Product[] = [
    { id: '1', name: 'Apple', price: 0.5, item_code: 'P001' },
    { id: '2', name: 'Banana', price: 0.3, item_code: 'P002' },
    { id: '3', name: 'Orange', price: 0.6, item_code: 'P003' },
    { id: '4', name: 'Milk', price: 2.5, item_code: 'P004' },
    { id: '5', name: 'Bread', price: 1.5, item_code: 'P005' },
    { id: '6', name: 'Eggs', price: 3.0, item_code: 'P006' },
    { id: '7', name: 'Cheese', price: 4.5, item_code: 'P007' },
    { id: '8', name: 'Yogurt', price: 1.2, item_code: 'P008' },
    { id: '9', name: 'Tomato', price: 0.8, item_code: 'P009' },
    { id: '10', name: 'Potato', price: 0.4, item_code: 'P010' },
    { id: '11', name: 'Onion', price: 0.3, item_code: 'P011' },
    { id: '12', name: 'Carrot', price: 0.4, item_code: 'P012' },
  ]

  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const displayedProducts = filteredProducts.slice(0, 3); // Modified to limit products to 3

  const addProductToSpecial = (product: Product) => {
    setCurrentSpecial(prev => ({
      ...prev,
      product_description: product.name,  // Changed to use product name as string
    }));
  };


  const removeProductFromSpecial = () => {
    setCurrentSpecial(prev => ({
      ...prev,
      product_description: null, // Set to null or empty if no product should be assigned
    }));
  };

  const saveSpecial = async () => {
    try {
        const specialType = 'Special'
        
        const payload = {
            specialName: currentSpecial.special_name,
            special: currentSpecial.special,
            specialType: specialType,
            storeId: currentSpecial.store_id,
            startDate: currentSpecial.start_date,
            expiryDate: currentSpecial.expiry_date,
            specialValue: currentSpecial.special_value,
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
        const url = `admin/getspecialid/${currentSpecial.special_name}`
        const response = await axios.get<SpecialIDProps>(`${apiEndPoint}/${url}`)
        console.log('The Special ID has been fetched successfully:', response.data)
        setSpecialID(response?.data.special_id)
        saveSpecialItems() //save the item
    } catch (error) {
        console.error('Error fetching special ID:', error)
    }
  }

  const saveSpecialItems = async () => {
    try {
        const payload = {
            specialid: specialID,
            productdescription: currentSpecial.product_description,
            specialprice: currentSpecial.special_price
        }

        const url = `admin/saveproductspecial`
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
            <CardTitle>Edit Special</CardTitle>
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
                      value={currentSpecial.special_name}
                      onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special_name: e.target.value }))}
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
                <div className="w-full">
                    <Label htmlFor="special-price">Special Price</Label>
                    <Input
                      id="special-price"
                      // type="number"
                      value={currentSpecial.special_price || ''}
                      onChange={(e) => setCurrentSpecial(prev => ({ ...prev, special_price: parseFloat(e.target.value) }))}
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

              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {displayedProducts.map((product) => (
                <Button
                    key={product.id}
                    variant="outline"
                    onClick={() => addProductToSpecial(product)}
                    disabled={(currentSpecial?.product_description || '').length >= 1} // Disable button if product_description has 1 or more characters
                    className="justify-start"
                    >
                    <PlusCircle className="h-4 w-4 mr-2" />
                    {product.name}
                </Button>
                ))}
              </div>

              <div className="mt-4">
                <Label>Product</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {/* {currentSpecial.product_description.map((product) => ( */}
                    <Card className="p-2 flex justify-between items-center">
                      <span>{currentSpecial.product_description}</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={removeProductFromSpecial}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  {/* ))} */}
                </div>
              </div>

              <Button 
                onClick={ saveSpecial } 
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