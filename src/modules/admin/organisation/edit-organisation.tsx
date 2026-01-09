'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check, Upload, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreateOrganisation, Organisation } from '@/modules/types/organisation/organisation-types';
import { apiClient } from '@/utils/api-client';

interface Props {
    onClose: () => void;
    selectedOrganisation: Organisation
}

export function EditOrganisation({ onClose, selectedOrganisation, onSuccess }: any) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Separate logo file state from text fields (matching AddNewOrganisation pattern)
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [currentOrganisation, setCurrentOrganisation] = useState<CreateOrganisation & {
        database_host?: string;
        database_port?: number | string;
        database_name?: string;
        database_user?: string;
        database_password?: string;
    }>({
        name: '',
        description: '',
        email: '',
        website: '',
        logo: '',
        database_host: '',
        database_port: 3306,
        database_name: '',
        database_user: '',
        database_password: '',
    })


    // Handle file selection and validation (copied from AddNewOrganisation)
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
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
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
        setLogoFile(null);
        setLogoPreview(null);
        setUploadError('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const updateOrganisation = async () => {
        // Validate required database credential fields
        if (!currentOrganisation.database_host || 
            !currentOrganisation.database_port || 
            !currentOrganisation.database_name || 
            !currentOrganisation.database_user || 
            !currentOrganisation.database_password) {
            toast.error('All database credential fields are required', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return;
        }

        try {
            const url = `organisation/update-organisation/${selectedOrganisation.uid}`;
            
            // Use FormData if a new logo file is being uploaded, otherwise use JSON payload
            if (logoFile) {
                // Create FormData to handle multipart/form-data submission
                const formData = new FormData();
                formData.append('name', currentOrganisation.name);
                formData.append('description', currentOrganisation.description);
                formData.append('email', currentOrganisation.email);
                formData.append('website', currentOrganisation.website);
                formData.append('database_host', currentOrganisation.database_host || '');
                formData.append('database_port', String(currentOrganisation.database_port || 3306));
                formData.append('database_name', currentOrganisation.database_name || '');
                formData.append('database_user', currentOrganisation.database_user || '');
                formData.append('database_password', currentOrganisation.database_password || '');
                formData.append('logo', logoFile);

                const response = await apiClient.patch(
                    `${apiEndPoint}/${url}`, 
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
                
                console.log('The Organisation has been updated successfully:', response.data);

                if (response.status === 200) {
                    toast.success('The Organisation has been updated successfully', {
                        icon: <Check color={colors.green} size={24} />,
                        duration: 3000,
                    });
                }
            } else {
                // No new file - send regular JSON payload without logo field
                const payload = {
                    name: currentOrganisation.name,
                    description: currentOrganisation.description,
                    email: currentOrganisation.email,
                    website: currentOrganisation.website,
                    database_host: currentOrganisation.database_host,
                    database_port: currentOrganisation.database_port,
                    database_name: currentOrganisation.database_name,
                    database_user: currentOrganisation.database_user,
                    database_password: currentOrganisation.database_password,
                };

                const response = await apiClient.patch(`${url}`, payload);
                console.log('The Organisation has been updated successfully:', response.data);

                if (response.status === 200) {
                    toast.success('The Organisation has been updated successfully', {
                        icon: <Check color={colors.green} size={24} />,
                        duration: 3000,
                    });
                }
            }

            // Call the onSuccess callback to refresh the organisation data
            if (onSuccess) {
                onSuccess();
            }

            onClose();
        } catch (error) {
            console.error('Error updating Organisation:', error);
            
            toast.error('There was an error when updating the Organisation', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    // Synchronize selectedOrganisation data and initialize logo preview with existing logo
    useEffect(() => {
        if (selectedOrganisation) {
            setCurrentOrganisation(prev => ({
                ...prev,
                ...selectedOrganisation,
            }));
            
            // Set existing logo as preview if available
            if (selectedOrganisation.logo) {
                setLogoPreview(selectedOrganisation.logo);
            }
        }
    }, [selectedOrganisation]);

  return (
    <div className="fixed inset-0 z-50">
        {/* Responsive container with padding for smaller screens */}
        <div className="flex fixed inset-0 justify-center items-center p-4 bg-black bg-opacity-50">
            {/* Card with dynamic width based on screen size */}
            <Card className="w-full max-w-[95vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-end pt-4 pr-4">
                    <button onClick={onClose}>
                        <X className="w-4 h-4" color="red" />
                    </button>
                </div>
                <CardHeader>
                    <CardTitle>Edit Organisation</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                        Update the organisation information below
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                        {/* Logo Upload Section - positioned above other fields (matches AddNewOrganisation) */}
                        <div className="w-full">
                            <label className="text-xs font-medium text-black sm:text-sm">Organisation Logo</label>
                            <div className="mt-2">
                                {/* Hidden file input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                                
                                {/* Upload area with dotted border or current logo preview */}
                                {!logoPreview ? (
                                    <div
                                        onClick={handleUploadClick}
                                        className="p-6 text-center rounded-lg border-2 border-gray-300 border-dashed transition-colors cursor-pointer hover:border-purple"
                                    >
                                        <Upload className="mx-auto w-10 h-10 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">Click to upload new logo</p>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                                    </div>
                                ) : (
                                    // Image preview with remove/replace option
                                    <div className="relative p-4 rounded-lg border-2 border-gray-300">
                                        <div className="flex relative justify-center mx-auto w-full max-h-32">
                                            <Image
                                                src={logoPreview}
                                                alt="Logo preview"
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
                                        <p className="mt-2 text-xs text-center text-gray-600">
                                            {logoFile?.name || 'Current logo'}
                                        </p>
                                        {/* Option to replace existing logo */}
                                        {!logoFile && (
                                            <button
                                                onClick={handleUploadClick}
                                                className="mt-2 w-full text-xs underline text-purple hover:text-indigo-700"
                                            >
                                                Click to replace logo
                                            </button>
                                        )}
                                    </div>
                                )}
                                
                                {/* Display upload error if any */}
                                {uploadError && (
                                    <p className="mt-1 text-xs text-red">{uploadError}</p>
                                )}
                            </div>
                        </div>

                        {/* Name and Description fields */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div>
                                <label htmlFor="name" className="text-xs text-black sm:text-sm">Name</label>
                                <Input
                                    id="name"
                                    value={currentOrganisation.name}
                                    onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter organisation name"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="text-xs text-black sm:text-sm">Description</label>
                                <Input
                                    id="description"
                                    value={currentOrganisation.description}
                                    onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Enter description"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        {/* Email and Website fields */}
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                            <div>
                                <label htmlFor="email" className="text-xs text-black sm:text-sm">Email</label>
                                <Input
                                    id="email"
                                    value={currentOrganisation.email}
                                    onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Enter email"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="website" className="text-xs text-black sm:text-sm">Website</label>
                                <Input
                                    id="website"
                                    value={currentOrganisation.website}
                                    onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, website: e.target.value }))}
                                    placeholder="Enter website URL"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        {/* Database Connection Details Section */}
                        <div className="pt-2 border-t border-gray-200">
                            <div className="mb-3">
                                <h3 className="text-sm font-semibold text-black">Database Connection Details</h3>
                                <p className="mt-1 text-xs text-gray-500">Required for tenant-specific data isolation</p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                                <div>
                                    <label htmlFor="database_host" className="text-xs text-black sm:text-sm">
                                        Database Host <span className="text-red">*</span>
                                    </label>
                                    <Input
                                        id="database_host"
                                        value={currentOrganisation.database_host || ''}
                                        onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, database_host: e.target.value }))}
                                        placeholder="e.g., localhost or 192.168.1.100"
                                        className="mt-1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="database_port" className="text-xs text-black sm:text-sm">
                                        Database Port <span className="text-red">*</span>
                                    </label>
                                    <Input
                                        id="database_port"
                                        type="number"
                                        value={currentOrganisation.database_port || ''}
                                        onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, database_port: e.target.value ? Number(e.target.value) : '' }))}
                                        placeholder="3306"
                                        className="mt-1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3 mt-3 sm:grid-cols-2 sm:gap-4 sm:mt-4">
                                <div>
                                    <label htmlFor="database_name" className="text-xs text-black sm:text-sm">
                                        Database Name <span className="text-red">*</span>
                                    </label>
                                    <Input
                                        id="database_name"
                                        value={currentOrganisation.database_name || ''}
                                        onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, database_name: e.target.value }))}
                                        placeholder="Enter database name"
                                        className="mt-1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="database_user" className="text-xs text-black sm:text-sm">
                                        Database Username <span className="text-red">*</span>
                                    </label>
                                    <Input
                                        id="database_user"
                                        value={currentOrganisation.database_user || ''}
                                        onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, database_user: e.target.value }))}
                                        placeholder="Enter database username"
                                        className="mt-1"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mt-3 sm:mt-4">
                                <label htmlFor="database_password" className="text-xs text-black sm:text-sm">
                                    Database Password <span className="text-red">*</span>
                                </label>
                                <div className="relative mt-1">
                                    <Input
                                        id="database_password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={currentOrganisation.database_password || ''}
                                        onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, database_password: e.target.value }))}
                                        placeholder="Enter database password"
                                        className="pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 text-gray-500 -translate-y-1/2 hover:text-gray-700"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-3 mt-4 sm:gap-4">
                            <Button onClick={onClose} className="text-white bg-red hover:bg-rose-300">
                                Cancel
                            </Button>
                            <Button onClick={updateOrganisation} className="text-white bg-green hover:bg-emerald-300">
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