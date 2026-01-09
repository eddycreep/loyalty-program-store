'use client'

import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check, Upload, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSession } from '@/context';
import { CreateOrganisation, OrganisationResponse } from '@/modules/types/organisation/organisation-types';
import { apiClient } from '@/utils/api-client';

interface OrganisationFormData {
    name: string;
    description: string;
    email: string;
    website: string;
    database_host: string;
    database_port: number | string;
    database_name: string;
    database_user: string;
    database_password: string;
}

export function AddNewOrganisation({ onClose, onSuccess }: any) {
    const { user } = useSession();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Separate logo file state from text fields
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [uploadError, setUploadError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    
    const [currentOrganisation, setCurrentOrganisation] = useState<OrganisationFormData>({
        name: '',
        description: '',
        email: '',
        website: '',
        database_host: '',
        database_port: 3306,
        database_name: '',
        database_user: '',
        database_password: '',
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

    const saveOrganisation = async () => {
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
            // Create FormData to handle multipart/form-data submission
            const formData = new FormData();
            formData.append('name', currentOrganisation.name);
            formData.append('description', currentOrganisation.description);
            formData.append('email', currentOrganisation.email);
            formData.append('website', currentOrganisation.website);
            formData.append('database_host', currentOrganisation.database_host);
            formData.append('database_port', String(currentOrganisation.database_port));
            formData.append('database_name', currentOrganisation.database_name);
            formData.append('database_user', currentOrganisation.database_user);
            formData.append('database_password', currentOrganisation.database_password);
            
            // Append logo file if selected
            if (logoFile) {
                formData.append('logo', logoFile);
            }

            const url = `organisation/create-organisation`;
            // Use axios directly for FormData to ensure proper headers
            const response = await apiClient.post<OrganisationResponse>(
                `${url}`, 
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            
            console.log('The Organisation has been saved:', response);

            if (response.status === 201) {
                toast.success('Organisation Saved!', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                    style: {
                        backgroundColor: 'black',
                        color: 'white', 
                    },
                });
            }

            // Call the onSuccess callback to refresh the organisation data
            if (onSuccess) {
                onSuccess();
            }

            onClose();
        } catch (error) {
            console.error('Error saving Organisation:', error);
            
            toast.error('Organisation not saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    return (
        <div className="fixed inset-0 z-50">
            <div className="flex fixed inset-0 justify-center items-center p-4 bg-black bg-opacity-50">
                <Card className="w-full max-w-[95vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-end pt-4 pr-4">
                        <button onClick={onClose}>
                            <X className="w-4 h-4" color="red" />
                        </button>
                    </div>
                    <CardHeader>
                        <CardTitle>Add New Organisation</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Create a new organisation by filling in the required information below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            {/* Logo Upload Section - positioned above Name and Description */}
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
                                    
                                    {/* Upload area with dotted border */}
                                    {!logoPreview ? (
                                        <div
                                            onClick={handleUploadClick}
                                            className="p-6 text-center rounded-lg border-2 border-gray-300 border-dashed transition-colors cursor-pointer hover:border-purple"
                                        >
                                            <Upload className="mx-auto w-10 h-10 text-gray-400" />
                                            <p className="mt-2 text-sm text-gray-600">Click to upload logo</p>
                                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                                        </div>
                                    ) : (
                                        // Image preview with remove option
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
                                            <p className="mt-2 text-xs text-center text-gray-600">{logoFile?.name}</p>
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
                                            value={currentOrganisation.database_host}
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
                                            value={currentOrganisation.database_port}
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
                                            value={currentOrganisation.database_name}
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
                                            value={currentOrganisation.database_user}
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
                                            value={currentOrganisation.database_password}
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
                                <Button onClick={saveOrganisation} className="text-white bg-green hover:bg-emerald-300">
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