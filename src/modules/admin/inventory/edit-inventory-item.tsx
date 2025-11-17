'use client'

import { useState, useRef, useEffect } from 'react';
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
    image?: string;
}

interface EditInventoryItemProps {
    onClose: () => void;
    onSuccess: () => void;
    selectedInventoryItem: any;
}

export function EditInventoryItem({ onClose, onSuccess, selectedInventoryItem }: EditInventoryItemProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Separate image file state from text fields
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
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
        selling_incl_2: 0,
        image: ''
    })

    // Load selected inventory item data on mount
    useEffect(() => {
        if (selectedInventoryItem) {
            console.log('Loading inventory item:', selectedInventoryItem);
            
            setInventoryItem({
                item_code: selectedInventoryItem.item_code || '',
                description_1: selectedInventoryItem.description_1 || '',
                unit_size: selectedInventoryItem.unit_size || '',
                physical_item: selectedInventoryItem.physical_item || 0,
                category_main: selectedInventoryItem.category_main || '',
                category_sub: selectedInventoryItem.category_sub || '',
                category_last: selectedInventoryItem.category_last || '',
                sales_tax_type: selectedInventoryItem.sales_tax_type || '',
                purchase_tax_type: selectedInventoryItem.purchase_tax_type || '',
                net_mass: selectedInventoryItem.net_mass || 0,
                store_code: selectedInventoryItem.store_code || '',
                group_num: selectedInventoryItem.group_num || '',
                selling_incl_1: selectedInventoryItem.selling_incl_1 || 0,
                selling_incl_2: selectedInventoryItem.selling_incl_2 || 0,
                image: selectedInventoryItem.image || ''
            });

            // Set existing image URL if available
            if (selectedInventoryItem.image) {
                setExistingImageUrl(selectedInventoryItem.image);
            }
        }
    }, [selectedInventoryItem]);

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

    // Remove selected file and clear existing image
    const handleRemoveFile = () => {
        setImageFile(null);
        setImagePreview(null);
        setExistingImageUrl(null);
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const updateInventoryItem = async () => {
        try {
            setIsLoading(true);

            // Create FormData to handle multipart/form-data submission
            // Backend handles both inventory and pricing updates in a single transaction
            const formData = new FormData();
            formData.append('description_1', inventoryItem.description_1);
            formData.append('unit_size', inventoryItem.unit_size);
            formData.append('physical_item', inventoryItem.physical_item.toString());
            formData.append('category_main', inventoryItem.category_main);
            formData.append('category_sub', inventoryItem.category_sub);
            formData.append('category_last', inventoryItem.category_last);
            formData.append('sales_tax_type', inventoryItem.sales_tax_type);
            formData.append('purchase_tax_type', inventoryItem.purchase_tax_type);
            formData.append('net_mass', inventoryItem.net_mass.toString());
            
            // Append pricing fields
            formData.append('store_code', inventoryItem.store_code);
            formData.append('group_num', inventoryItem.group_num);
            formData.append('selling_incl_1', inventoryItem.selling_incl_1.toString());
            if (inventoryItem.selling_incl_2) {
                formData.append('selling_incl_2', inventoryItem.selling_incl_2.toString());
            }
            
            // Append new image file if selected
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Update inventory item with pricing in a single transaction
            console.log('Updating inventory item with pricing...');
            const url = `inventory/update-inventory-item/${inventoryItem.item_code}`;
            const response = await apiClient.put(
                `${url}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            console.log('Inventory Item updated successfully:', response.data);

            if (response.status === 200) {
                toast.success('Inventory Item Updated!', {
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
        } catch (error: any) {
            console.error('Error updating Inventory Item:', error);
            
            // Extract error message from response if available
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update inventory item';
            
            toast.error(errorMessage, {
                icon: <X color={colors.red} size={24} />,
                duration: 5000,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            <div className="flex fixed inset-0 justify-center items-center p-4 bg-black bg-opacity-50">
                <Card className="w-full max-w-[95vw] md:max-w-[800px] max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-end pt-4 pr-4">
                        <button onClick={onClose}>
                            <X className="w-4 h-4" color="red" />
                        </button>
                    </div>
                    <CardHeader>
                        <CardTitle>Edit Inventory Item</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Update inventory item information and pricing details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {/* Item Image Upload Section */}
                            <div className="w-full">
                                <label className="text-xs font-medium text-black sm:text-sm">Item Image</label>
                                <div className="mt-2">
                                    {/* Hidden file input */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    
                                    {/* Upload area with dotted border or existing image */}
                                    {!imagePreview && !existingImageUrl ? (
                                        <div
                                            onClick={handleUploadClick}
                                            className="p-6 text-center rounded-lg border-2 border-gray-300 border-dashed transition-colors cursor-pointer hover:border-purple"
                                        >
                                            <Upload className="mx-auto w-10 h-10 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">Click to upload item image</p>
                                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                                        </div>
                                    ) : (
                                        // Image preview with remove/change option
                                        <div className="relative p-4 rounded-lg border-2 border-gray-300">
                                            <div className="flex relative justify-center mx-auto w-full max-h-32">
                                                <Image
                                                    src={imagePreview || existingImageUrl || ''}
                                                    alt="Item preview"
                                                    width={128}
                                                    height={128}
                                                    className="object-contain max-h-32"
                                                    unoptimized
                                                />
                                            </div>
                                            <button
                                                onClick={handleRemoveFile}
                                                className="absolute top-2 right-2 p-1 text-white rounded-full bg-red hover:bg-rose-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                            {imageFile ? (
                                                <p className="mt-2 text-xs text-center text-gray-600">{imageFile.name} (new)</p>
                                            ) : (
                                                <div className="mt-2 text-center">
                                                    <p className="text-xs text-gray-600">Current image</p>
                                                    <Button
                                                        onClick={handleUploadClick}
                                                        variant="outline"
                                                        size="sm"
                                                        className="mt-2 text-xs"
                                                    >
                                                        Change Image
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    
                                    {/* Display upload error if any */}
                                    {uploadError && (
                                        <p className="mt-1 text-xs text-red">{uploadError}</p>
                                    )}
                                </div>
                            </div>

                            {/* Basic Item Information */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label htmlFor="item_code" className="text-xs text-black sm:text-sm">Item Code</label>
                                    <Input
                                        id="item_code"
                                        value={inventoryItem.item_code}
                                        readOnly
                                        disabled
                                        placeholder="Item code"
                                        className="mt-1 bg-gray-100 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="description_1" className="text-xs text-black sm:text-sm">Description</label>
                                    <Input
                                        id="description_1"
                                        value={inventoryItem.description_1}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, description_1: e.target.value }))}
                                        placeholder="Enter description"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label htmlFor="unit_size" className="text-xs text-black sm:text-sm">Unit Size</label>
                                    <Input
                                        id="unit_size"
                                        value={inventoryItem.unit_size}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, unit_size: e.target.value }))}
                                        placeholder="e.g., 200ml"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="physical_item" className="text-xs text-black sm:text-sm">Physical Item</label>
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
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                                <div>
                                    <label htmlFor="category_main" className="text-xs text-black sm:text-sm">Category Main</label>
                                    <Input
                                        id="category_main"
                                        value={inventoryItem.category_main}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, category_main: e.target.value }))}
                                        placeholder="Main category"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category_sub" className="text-xs text-black sm:text-sm">Category Sub</label>
                                    <Input
                                        id="category_sub"
                                        value={inventoryItem.category_sub}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, category_sub: e.target.value }))}
                                        placeholder="Sub category"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category_last" className="text-xs text-black sm:text-sm">Category Last</label>
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
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label htmlFor="sales_tax_type" className="text-xs text-black sm:text-sm">Sales Tax Type</label>
                                    <Input
                                        id="sales_tax_type"
                                        value={inventoryItem.sales_tax_type}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, sales_tax_type: e.target.value }))}
                                        placeholder="e.g., 001"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="purchase_tax_type" className="text-xs text-black sm:text-sm">Purchase Tax Type</label>
                                    <Input
                                        id="purchase_tax_type"
                                        value={inventoryItem.purchase_tax_type}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, purchase_tax_type: e.target.value }))}
                                        placeholder="e.g., 002"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label htmlFor="net_mass" className="text-xs text-black sm:text-sm">Net Mass</label>
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
                            <div className="pt-4 mt-4 border-t">
                                <h3 className="mb-3 text-sm font-medium text-black">Pricing Information</h3>
                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                    <div>
                                        <label htmlFor="store_code" className="text-xs text-black sm:text-sm">Store Code</label>
                                        <Input
                                            id="store_code"
                                            value={inventoryItem.store_code}
                                            onChange={(e) => setInventoryItem(prev => ({ ...prev, store_code: e.target.value }))}
                                            placeholder="e.g., 001"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="group_num" className="text-xs text-black sm:text-sm">Group Number</label>
                                        <Input
                                            id="group_num"
                                            value={inventoryItem.group_num}
                                            onChange={(e) => setInventoryItem(prev => ({ ...prev, group_num: e.target.value }))}
                                            placeholder="e.g., 002"
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 sm:gap-4">
                                    <div>
                                        <label htmlFor="selling_incl_1" className="text-xs text-black sm:text-sm">Selling Price (Incl. Tax 1)</label>
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
                                        <label htmlFor="selling_incl_2" className="text-xs text-black sm:text-sm">Selling Price (Incl. Tax 2) <span className="text-gray-500">(Optional)</span></label>
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
                            <div className="grid grid-cols-2 gap-3 mt-4 sm:gap-4">
                                <Button 
                                    onClick={onClose} 
                                    className="text-white bg-red hover:bg-rose-300"
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                    onClick={updateInventoryItem} 
                                    className="text-white bg-green hover:bg-emerald-300"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Updating...' : 'Update'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}