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
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

// Organization and Branch interfaces
interface Organisation {
    id: number;
    organisation_name: string;
}

interface Branch {
    id: number;
    branch_name: string;
}

export function AddInventoryItem({ onClose, onSuccess }: any) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Separate image file state from text fields
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string>('');
    
    // Organization and Branch state
    const [organisations, setOrganisations] = useState<Organisation[]>([]);
    const [branches, setBranches] = useState<Branch[]>([]);
    const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
    const [selectedBranchId, setSelectedBranchId] = useState<number | null>(null);
    const [loadingOrgs, setLoadingOrgs] = useState(false);
    const [loadingBranches, setLoadingBranches] = useState(false);
    
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

    // Fetch organisations on component mount
    useEffect(() => {
        const fetchOrganisations = async () => {
            setLoadingOrgs(true);
            try {
                const url = `organisation/get-organisations`;
                const response = await apiClient.get(`${apiEndPoint}/${url}`);
                console.log("organisations returned: ", response.data)
                
                // Extract the data array from response.data.data
                const organisationsData = response.data?.data || response.data || [];
                
                // Map the API response to match the interface (uid -> id, name -> organisation_name)
                const mappedOrganisations = organisationsData.map((org: any) => ({
                    id: org.uid || org.id,
                    organisation_name: org.name || org.organisation_name
                }));
                
                setOrganisations(mappedOrganisations);
            } catch (error) {
                console.error('Error fetching organisations:', error);
                toast.error('Failed to load organizations');
            }
            setLoadingOrgs(false);
        };

        fetchOrganisations();
    }, []);

    // Fetch branches when organization is selected
    useEffect(() => {
        if (!selectedOrgId) {
            setBranches([]);
            setSelectedBranchId(null);
            return;
        }

        const fetchBranches = async () => {
            setLoadingBranches(true);
            console.log("selectedOrgId: ", selectedOrgId)
            
            try {
                // const url = `organisation/get-branches/${selectedOrgId}`;
                const url = `branch/get-branches/${selectedOrgId}`;
                const response = await apiClient.get(`${apiEndPoint}/${url}`);
                console.log("branches returned: ", response.data)
                
                // Extract the data array from response.data.data
                const branchesData = response.data?.data || response.data || [];
                
                // Map the API response to match the interface (uid -> id, name -> branch_name)
                const mappedBranches = branchesData.map((branch: any) => ({
                    id: branch.uid || branch.id,
                    branch_name: branch.name || branch.branch_name
                }));
                
                setBranches(mappedBranches);
            } catch (error) {
                console.error('Error fetching branches:', error);
                toast.error('Failed to load branches');
            }
            setLoadingBranches(false);
        };

        fetchBranches();
    }, [selectedOrgId]);

    const saveInventoryItem = async () => {
        try {
            // Validate organization and branch selection
            if (!selectedOrgId) {
                toast.error('Please select an organization');
                return;
            }
            if (!selectedBranchId) {
                toast.error('Please select a branch');
                return;
            }

            // Create FormData to handle multipart/form-data submission
            // Backend now handles both inventory and pricing creation in a single transaction
            const formData = new FormData();
            
            // Append organization and branch IDs (required for multi-tenancy)
            formData.append('organisationId', selectedOrgId.toString());
            formData.append('branchId', selectedBranchId.toString());
            
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
            
            // Append pricing fields
            formData.append('store_code', inventoryItem.store_code);
            formData.append('group_num', inventoryItem.group_num);
            formData.append('selling_incl_1', inventoryItem.selling_incl_1.toString());
            if (inventoryItem.selling_incl_2) {
                formData.append('selling_incl_2', inventoryItem.selling_incl_2.toString());
            }
            
            // Append image file if selected
            if (imageFile) {
                formData.append('image', imageFile);
            }

            // Create inventory item with pricing in a single transaction
            console.log('Creating inventory item with pricing for org:', selectedOrgId, 'branch:', selectedBranchId);
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
            
            console.log('Inventory Item created successfully:', response.data);

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
        } catch (error: any) {
            console.error('Error saving Inventory Item:', error);
            
            // Extract error message from response if available
            const errorMessage = error?.response?.data?.message || error?.message || 'Failed to save inventory item';
            
            toast.error(errorMessage, {
                icon: <X color={colors.red} size={24} />,
                duration: 5000,
            });
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
                        <CardTitle>Add New Inventory Item</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Create a new inventory item by filling in the required information below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {/* Organization and Branch Selection - Required for Multi-tenancy */}
                            <div className="grid grid-cols-1 gap-3 pb-4 border-b sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label className="text-xs font-medium text-black sm:text-sm">Organization *</label>
                                    {/* <Select 
                                        value={selectedOrgId?.toString() || ''} 
                                        onValueChange={(value) => setSelectedOrgId(Number(value))}
                                        disabled={loadingOrgs}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder={loadingOrgs ? "Loading..." : "Select organization"} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {organisations?.map((org) => (
                                                <SelectItem key={org.id} value={org.id.toString()}>
                                                    {org.organisation_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select> */}
                                    <select
                                      value={selectedOrgId?.toString() || ''}
                                      onChange={(e) => setSelectedOrgId(Number(e.target.value))}
                                      disabled={loadingOrgs}
                                      className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <option value="">{loadingOrgs ? "Loading..." : "Select organization"}</option>
                                      {organisations?.map((org) => (
                                        <option key={org.id} value={org.id.toString()}>
                                          {org.organisation_name}
                                        </option>
                                      ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-black sm:text-sm">Branch *</label>
                                    {/* <Select 
                                        value={selectedBranchId?.toString() || ''} 
                                        onValueChange={(value) => setSelectedBranchId(Number(value))}
                                        disabled={!selectedOrgId || loadingBranches}
                                    >
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder={
                                                !selectedOrgId ? "Select organization first" : 
                                                loadingBranches ? "Loading..." : 
                                                "Select branch"
                                            } />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {branches?.map((branch) => (
                                                <SelectItem key={branch.id} value={branch.id.toString()}>
                                                    {branch.branch_name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select> */}
                                    <select
                                      value={selectedBranchId?.toString() || ''}
                                      onChange={(e) => setSelectedBranchId(Number(e.target.value))}
                                      disabled={!selectedOrgId || loadingBranches}
                                      className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      <option value="">
                                        {!selectedOrgId ? "Select organization first" : 
                                         loadingBranches ? "Loading..." : 
                                         "Select branch"}
                                      </option>
                                      {branches?.map((branch) => (
                                        <option key={branch.id} value={branch.id.toString()}>
                                          {branch.branch_name}
                                        </option>
                                      ))}
                                    </select>
                                </div>
                            </div>

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
                                    
                                    {/* Upload area with dotted border */}
                                    {!imagePreview ? (
                                        <div
                                            onClick={handleUploadClick}
                                            className="p-6 text-center rounded-lg border-2 border-gray-300 border-dashed transition-colors cursor-pointer hover:border-purple"
                                        >
                                            <Upload className="mx-auto w-10 h-10 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">Click to upload item image</p>
                                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                                        </div>
                                    ) : (
                                        // Image preview with remove option
                                        <div className="relative p-4 rounded-lg border-2 border-gray-300">
                                            <div className="flex relative justify-center mx-auto w-full max-h-32">
                                                <Image
                                                    src={imagePreview}
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
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label htmlFor="item_code" className="text-xs text-black sm:text-sm">Item Code</label>
                                    <Input
                                        id="item_code"
                                        value={inventoryItem.item_code}
                                        onChange={(e) => setInventoryItem(prev => ({ ...prev, item_code: e.target.value }))}
                                        placeholder="Enter item code"
                                        className="mt-1"
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
                                        // type="number"
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
                                        // type="number"
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
                                            // type="number"
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
                                            // type="number"
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
                                <Button onClick={onClose} className="text-white bg-red hover:bg-rose-300">
                                    Cancel
                                </Button>
                                <Button onClick={saveInventoryItem} className="text-white bg-green hover:bg-emerald-300">
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
