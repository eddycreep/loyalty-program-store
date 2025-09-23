'use client'

import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSession } from '@/context';
import { CreateOrganisation, OrganisationResponse } from '@/modules/types/organisation/organisation-types';
import { apiClient } from '@/utils/api-client';

export function AddNewOrganisation({ onClose, onSuccess }: any) {
    const { user } = useSession();
    const [currentOrganisation, setCurrentOrganisation] = useState<CreateOrganisation>({
      name: '',
      description: '',
      email: '',
      website: '',
      logo: ''
    })

    const saveOrganisation = async () => {
        try {
            const payload = {
                name: currentOrganisation.name,
                description: currentOrganisation.description,
                email: currentOrganisation.email,
                website: currentOrganisation.website,
                logo: currentOrganisation.logo,
            }

            const url = `organisation/create-organisation`
            const response = await apiClient.post<OrganisationResponse>(`${apiEndPoint}/${url}`, payload)
            console.log('The Organisation has been saved:', response)

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
            console.error('Error saving Organisation:', error)
            
            toast.error('Organisation not saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

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
                        <CardTitle>Add New Organisation</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Create a new organisation by filling in the required information below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
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

                            <div className="grid grid-cols-1 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="logo" className="text-black text-xs sm:text-sm">Logo URL</label>
                                    <Input
                                        id="logo"
                                        value={currentOrganisation.logo}
                                        onChange={(e) => setCurrentOrganisation(prev => ({ ...prev, logo: e.target.value }))}
                                        placeholder="Enter logo URL"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                                <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                    Cancel
                                </Button>
                                <Button onClick={saveOrganisation} className="bg-green hover:bg-emerald-300 text-white">
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