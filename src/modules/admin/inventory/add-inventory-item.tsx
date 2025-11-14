'use client'

import { useState, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check, Upload } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { apiClient } from '@/utils/api-client';

// Inventory item form data interface
interface InventoryItemFormData {
    item_code: string;
    description_1: string;
    unit_size: string;
    physical_item: number;
    category_main: string;
    category_sub: string;
    category_last: string;
    sales_tax_type: string;
    purchase_tax_type: string;
    net_mass: number;
    store_code: string;
    group_num: string;
    selling_incl_1: number;
    selling_incl_2?: number;
}

export function AddInventoryItem({ onClose, onSuccess }: any) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Separate image file state from text fields
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string>('');
    
    // Inventory item form state
    const [inventoryItem, setInventoryItem] = useState<InventoryItemFormData>({
        item_code: '',
        description_1: '',
        unit_size: '',
        physical_item: 0,
        category_main: '',
        category_sub: '',
        category_last: '',
        sales_tax_type: '',
        purchase_tax_type: '',
        net_mass: 0,
        store_code: '',
        group_num: '',
        selling_incl_1: 0,
        selling_incl_2: 0
    })

    // Handle file selection and validation
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setUploadError('');

        if (file) {
            // Validate file type - only accept images
            const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                setUploadError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
                return;
            }

            // Validate file size - max 5MB
            const maxSizeInBytes = 5 * 1024 * 1024;
            if (file.size > maxSizeInBytes) {
                setUploadError('File size must be less than 5MB');
                return;
            }

            // Set the file and create preview
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger file input click
    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    // Remove selected file
    const handleRemoveFile = () => {
        setImageFile(null);
        setImagePreview(null);
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const saveInventoryItem = async () => {
        try {
            // Create pricing first to satisfy foreign key constraint (item_code must exist in multi_store_trn)
            const pricingPayload = {
                item_code: inventoryItem.item_code,
                store_code: inventoryItem.store_code,
                group_num: inventoryItem.group_num,
                selling_incl_1: inventoryItem.selling_incl_1,
                selling_incl_2: inventoryItem.selling_incl_2 || 0
            };

            const pricingUrl = `inventory/create-inventory-item-pricing`;
            const pricingResponse = await apiClient.post(`${pricingUrl}`, pricingPayload);
            console.log('The Inventory Item Pricing has been saved:', pricingResponse);

            // Create FormData to handle multipart/form-data submission
            const formData = new FormData();
            formData.append('item_code', inventoryItem.item_code);
            formData.append('description_1', inventoryItem.description_1);
            formData.append('unit_size', inventoryItem.unit_size);
            formData.append('physical_item', inventoryItem.physical_item.toString());
            formData.append('category_main', inventoryItem.category_main);
            formData.append('category_sub', inventoryItem.category_sub);
            formData.append('category_last', inventoryItem.category_last);
            formData.append('sales_tax_type', inventoryItem.sales_tax_type);
            formData.append('purchase_tax_type', inventoryItem.purchase_tax_type);
            formData.append('net_mass', inventoryItem.net_mass.toString());
            
            // Append image file if selected
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Create inventory item after pricing is created
            const url = `inventory/create-inventory-item`;
            const response = await apiClient.post(
                `${url}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            console.log('The Inventory Item has been saved:', response);

            if (response.status === 201) {
                toast.success('Inventory Item Saved!', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                    style: {
                        backgroundColor: 'black',
                        color: 'white', 
                    },
                });
            }

            // Call the onSuccess callback to refresh the inventory data
            if (onSuccess) {
                onSuccess();
            }

            onClose();
        } catch (error) {
            console.error('Error saving Inventory Item:', error);
            
            toast.error('Inventory Item not saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                <Card className="w-full max-w-[95vw] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-end pr-4 pt-4">
                        <button onClick={onClose}>
                            <X className="h-4 w-4" color="red" />
                        </button>
                    </div>
                    <CardHeader>
                        <CardTitle>Add New Inventory Item</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Create a new inventory item by filling in the required information below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {/* Item Image Upload Section */}
                            <div className="w-full">
                                <label className="text-black text-xs sm:text-sm font-medium">Item Image</label>
                                <div className="mt-2">
                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    
                                    {/* Upload area with dotted border */}
                                    {!imagePreview ? (
                                        <div
                                            onClick={handleUploadClick}
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple transition-colors"
                                        >
                                            <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">Click to upload item image</p>
                                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                                        </div>
                                    ) : (
                                        // Image preview with remove option
                                        <div className="relative border-2 border-gray-300 rounded-lg p-4">
                                            <div className="relative mx-auto max-h-32 w-full flex justify-center">
                                                <Image
                                                    src={imagePreview}
                                                    alt="Item preview"
                                                    width={128}
                                                    height={128}
                                                    className="max-h-32 object-contain"
                                                    unoptimized
                                                />
                                            </div>
                                            <button
                                                onClick={handleRemoveFile}
                                                className="absolute top-2 right-2 bg-red text-white rounded-full p-1 hover:bg-rose-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <p className="mt-2 text-xs text-center text-gray-600">{imageFile?.name}</p>
                                        </div>
                                    )}
                                    
                                    {/* Display upload error if any */}
                                    {uploadError && (
                                        <p className="mt-1 text-xs text-red">{uploadError}</p>
                                    )}
                                </div>
                            </div>

                            {/* Basic Item Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="item_code" className="text-black text-xs sm:text-sm">Item Code</label>
                                    <Input
                                        id="item_code"
                                        value={inventoryItem.item_code}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, item_code: e.target.value }))}
                                        placeholder="Enter item code"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description_1" className="text-black text-xs sm:text-sm">Description</label>
                                    <Input
                                        id="description_1"
                                        value={inventoryItem.description_1}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, description_1: e.target.value }))}
                                        placeholder="Enter description"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="unit_size" className="text-black text-xs sm:text-sm">Unit Size</label>
                                    <Input
                                        id="unit_size"
                                        value={inventoryItem.unit_size}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, unit_size: e.target.value }))}
                                        placeholder="e.g., 200ml"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="physical_item" className="text-black text-xs sm:text-sm">Physical Item</label>
                                    <Input
                                        id="physical_item"
                                        type="number"
                                        value={inventoryItem.physical_item}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, physical_item: Number(e.target.value) }))}
                                        placeholder="Enter physical item"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Category Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="category_main" className="text-black text-xs sm:text-sm">Category Main</label>
                                    <Input
                                        id="category_main"
                                        value={inventoryItem.category_main}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, category_main: e.target.value }))}
                                        placeholder="Main category"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category_sub" className="text-black text-xs sm:text-sm">Category Sub</label>
                                    <Input
                                        id="category_sub"
                                        value={inventoryItem.category_sub}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, category_sub: e.target.value }))}
                                        placeholder="Sub category"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category_last" className="text-black text-xs sm:text-sm">Category Last</label>
                                    <Input
                                        id="category_last"
                                        value={inventoryItem.category_last}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, category_last: e.target.value }))}
                                        placeholder="Last category"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Tax Information */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="sales_tax_type" className="text-black text-xs sm:text-sm">Sales Tax Type</label>
                                    <Input
                                        id="sales_tax_type"
                                        value={inventoryItem.sales_tax_type}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, sales_tax_type: e.target.value }))}
                                        placeholder="e.g., 001"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="purchase_tax_type" className="text-black text-xs sm:text-sm">Purchase Tax Type</label>
                                    <Input
                                        id="purchase_tax_type"
                                        value={inventoryItem.purchase_tax_type}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, purchase_tax_type: e.target.value }))}
                                        placeholder="e.g., 002"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="net_mass" className="text-black text-xs sm:text-sm">Net Mass</label>
                                    <Input
                                        id="net_mass"
                                        type="number"
                                        step="0.001"
                                        value={inventoryItem.net_mass}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, net_mass: Number(e.target.value) }))}
                                        placeholder="e.g., 15.550"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            {/* Pricing Information */}
                            <div className="border-t pt-4 mt-4">
                                <h3 className="text-sm font-medium text-black mb-3">Pricing Information</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label htmlFor="store_code" className="text-black text-xs sm:text-sm">Store Code</label>
                                        <Input
                                            id="store_code"
                                            value={inventoryItem.store_code}
                                            onChange={(e) => setInventoryItem(prev => ({ ...prev, store_code: e.target.value }))}
                                            placeholder="e.g., 001"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="group_num" className="text-black text-xs sm:text-sm">Group Number</label>
                                        <Input
                                            id="group_num"
                                            value={inventoryItem.group_num}
                                            onChange={(e) => setInventoryItem(prev => ({ ...prev, group_num: e.target.value }))}
                                            placeholder="e.g., 002"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-3">
                                    <div>
                                        <label htmlFor="selling_incl_1" className="text-black text-xs sm:text-sm">Selling Price (Incl. Tax 1)</label>
                                        <Input
                                            id="selling_incl_1"
                                            type="number"
                                            step="0.01"
                                            value={inventoryItem.selling_incl_1}
                                            onChange={(e) => setInventoryItem(prev => ({ ...prev, selling_incl_1: Number(e.target.value) }))}
                                            placeholder="e.g., 146.77"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="selling_incl_2" className="text-black text-xs sm:text-sm">Selling Price (Incl. Tax 2) <span className="text-gray-500">(Optional)</span></label>
                                        <Input
                                            id="selling_incl_2"
                                            type="number"
                                            step="0.01"
                                            value={inventoryItem.selling_incl_2 || ''}
                                            onChange={(e) => setInventoryItem(prev => ({ ...prev, selling_incl_2: e.target.value ? Number(e.target.value) : undefined }))}
                                            placeholder="e.g., 146.77"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                                <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                    Cancel
                                </Button>
                                <Button onClick={saveInventoryItem} className="bg-green hover:bg-emerald-300 text-white">
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
