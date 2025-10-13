'use client'

import { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check, Upload } from 'lucide-react';
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
    
    const [currentOrganisation, setCurrentOrganisation] = useState<CreateOrganisation>({
        name: '',
        description: '',
        email: '',
        website: '',
        logo: ''
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
            {/* Card with dynamic width based on screen size */}
            <Card className="w-full max-w-[95vw] md:max-w-[600px] max-h-[90vh] overflow-y-auto">
                <div className="flex justify-end pr-4 pt-4">
                    <button onClick={onClose}>
                        <X className="h-4 w-4" color="red" />
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
                            <label className="text-black text-xs sm:text-sm font-medium">Organisation Logo</label>
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
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple transition-colors"
                                    >
                                        <Upload className="mx-auto h-10 w-10 text-gray-400" />
                                        <p className="mt-2 text-sm text-gray-600">Click to upload new logo</p>
                                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF, WebP up to 5MB</p>
                                    </div>
                                ) : (
                                    // Image preview with remove/replace option
                                    <div className="relative border-2 border-gray-300 rounded-lg p-4">
                                        <img
                                            src={logoPreview}
                                            alt="Logo preview"
                                            className="mx-auto max-h-32 object-contain"
                                        />
                                        <button
                                            onClick={handleRemoveFile}
                                            className="absolute top-2 right-2 bg-red text-white rounded-full p-1 hover:bg-rose-600"
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                        <p className="mt-2 text-xs text-center text-gray-600">
                                            {logoFile?.name || 'Current logo'}
                                        </p>
                                        {/* Option to replace existing logo */}
                                        {!logoFile && (
                                            <button
                                                onClick={handleUploadClick}
                                                className="mt-2 w-full text-xs text-purple hover:text-indigo-700 underline"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="name" className="text-black text-xs sm:text-sm">Name</label>
                                <Input
                                    id="name"
                                    value={currentOrganisation.name}
                                    onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="Enter organisation name"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="description" className="text-black text-xs sm:text-sm">Description</label>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            <div>
                                <label htmlFor="email" className="text-black text-xs sm:text-sm">Email</label>
                                <Input
                                    id="email"
                                    value={currentOrganisation.email}
                                    onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, email: e.target.value }))}
                                    placeholder="Enter email"
                                    className="mt-1"
                                />
                            </div>
                            <div>
                                <label htmlFor="website" className="text-black text-xs sm:text-sm">Website</label>
                                <Input
                                    id="website"
                                    value={currentOrganisation.website}
                                    onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, website: e.target.value }))}
                                    placeholder="Enter website URL"
                                    className="mt-1"
                                />
                            </div>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                            <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                Cancel
                            </Button>
                            <Button onClick={updateOrganisation} className="bg-green hover:bg-emerald-300 text-white">
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