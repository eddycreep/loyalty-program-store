'use client'

import { useState } from 'react';
import toast from 'react-hot-toast';
import { apiEndPoint, colors } from '@/utils/colors';
import { X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useSession } from '@/context';
import { Organisation } from '@/modules/types/organisation/organisation-types';
import { apiClient } from '@/utils/api-client';
import { CreateBranch, SuccessResponse } from '@/modules/types/branch/branches-types';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AddNewBranch({ onClose, onSuccess }: any) {
    const { user } = useSession();
    const [organisation, setOrganisation] = useState<Organisation | null>(null)
    const [currentBranch, setCurrentBranch] = useState<CreateBranch>({
        name: '',
        address: '',
        contactNumber: '',
        email: '',
        managerName: '',
        // Operating hours field with proper structure as defined in CreateBranch interface
        operatingHours: {
            days: [],
            opening: '',
            closing: ''
        },
        // organisationId: 0
    })

    const saveBranch = async () => {
        try {
            const payload = {
                name: currentBranch.name,
                address: currentBranch.address,
                contactNumber: currentBranch.contactNumber,
                email: currentBranch.email,
                managerName: currentBranch.managerName,
                // Operating hours data properly structured according to CreateBranch interface
                operatingHours: {
                    days: currentBranch.operatingHours.days,
                    opening: currentBranch.operatingHours.opening,
                    closing: currentBranch.operatingHours.closing
                },
                // organisationId: user?.organisation?.uid
            }
            console.log("payload in add-new-branch: ", payload)

            const url = `branch/create-branch`
            const response = await apiClient.post<SuccessResponse>(`${apiEndPoint}/${url}`, payload)
            console.log('The Branch has been saved:', response)

            if (response.status === 201) {
                toast.success('Branch Saved!', {
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
            console.error('Error saving Branch:', error)
            
            toast.error('Branch not saved', {
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
                        <CardTitle>Add New Branch</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                            Create a new branch by filling in the required information below
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3 sm:space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="name" className="text-black text-xs sm:text-sm">Name</label>
                                    <Input
                                        id="name"
                                        value={currentBranch.name}
                                        onChange={(e) => setCurrentBranch(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Enter branch name"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="address" className="text-black text-xs sm:text-sm">Address</label>
                                    <Input
                                        id="address"
                                        value={currentBranch.address}
                                        onChange={(e) => setCurrentBranch(prev => ({ ...prev, address: e.target.value }))}
                                        placeholder="Enter branch address"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="contactNumber" className="text-black text-xs sm:text-sm">Contact Number</label>
                                    <Input
                                        id="contactNumber"
                                        value={currentBranch.contactNumber}
                                        onChange={(e) => setCurrentBranch(prev => ({ ...prev, contactNumber: e.target.value }))}
                                        placeholder="Enter contact number"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-black text-xs sm:text-sm">Email</label>
                                    <Input
                                        id="email"
                                        value={currentBranch.email}
                                        onChange={(e) => setCurrentBranch(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="Enter email"
                                        className="mt-1"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <div>
                                    <label htmlFor="managerName" className="text-black text-xs sm:text-sm">Manager Name</label>
                                    <Input
                                        id="managerName"
                                        value={currentBranch.managerName}
                                        onChange={(e) => setCurrentBranch(prev => ({ ...prev, managerName: e.target.value }))}
                                        placeholder="Enter manager name"
                                        className="mt-1"
                                    />
                                </div>
                                {/* <div>
                                    <label htmlFor="organisation" className="text-black text-xs sm:text-sm">Organisation</label>
                                        <Select
                                            value={currentBranch.organisationId.toString()}
                                            onValueChange={(value) => setCurrentBranch(prev => ({ ...prev, organisationId: Number(value) }))}
                                        >
                                            <SelectTrigger className="w-full mt-1">
                                                <SelectValue placeholder="Select Organisation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="All" className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">All</SelectItem>
                                                <SelectItem key={user?.organisation?.uid} value={user?.organisation?.uid.toString()} className="hover:bg-purple hover:text-white focus:bg-purple focus:text-white">
                                                    {user?.organisation?.name}
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <select
                                          id="organisation"
                                          value={currentBranch.organisationId.toString()}
                                          onChange={(e) => setCurrentBranch(prev => ({ ...prev, organisationId: Number(e.target.value) }))}
                                          className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300 mt-1"
                                        >
                                          <option value="All">All</option>
                                          <option value={user?.organisation?.uid.toString()}>
                                            {user?.organisation?.name}
                                          </option>
                                        </select>
                                </div> */}
                            </div>

                            {/* Operating Hours Section - Added to capture operatingHours field */}
                            <div className="space-y-3 sm:space-y-4">                                
                                {/* Days Selection */}
                                <div>
                                    <label className="text-black text-xs sm:text-sm">Operating Days</label>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => {
                                                    const currentDays = currentBranch.operatingHours.days;
                                                    const newDays = currentDays.includes(day)
                                                        ? currentDays.filter(d => d !== day)
                                                        : [...currentDays, day];
                                                    setCurrentBranch(prev => ({
                                                        ...prev,
                                                        operatingHours: {
                                                            ...prev.operatingHours,
                                                            days: newDays
                                                        }
                                                    }));
                                                }}
                                                className={`px-3 py-1 text-xs rounded-full border ${
                                                    currentBranch.operatingHours.days.includes(day)
                                                        ? 'bg-green text-white border-green'
                                                        : 'bg-white text-gray-700 border-gray-300'
                                                }`}
                                            >
                                                {day}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Opening and Closing Times */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    <div>
                                        <label htmlFor="opening" className="text-black text-xs sm:text-sm">Opening Time</label>
                                        <Input
                                            id="opening"
                                            type="time"
                                            value={currentBranch.operatingHours.opening}
                                            onChange={(e) => setCurrentBranch(prev => ({
                                                ...prev,
                                                operatingHours: {
                                                    ...prev.operatingHours,
                                                    opening: e.target.value
                                                }
                                            }))}
                                            className="mt-1"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="closing" className="text-black text-xs sm:text-sm">Closing Time</label>
                                        <Input
                                            id="closing"
                                            type="time"
                                            value={currentBranch.operatingHours.closing}
                                            onChange={(e) => setCurrentBranch(prev => ({
                                                ...prev,
                                                operatingHours: {
                                                    ...prev.operatingHours,
                                                    closing: e.target.value
                                                }
                                            }))}
                                            className="mt-1"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                                <Button onClick={onClose} className="bg-red hover:bg-rose-300 text-white">
                                    Cancel
                                </Button>
                                <Button onClick={saveBranch} className="bg-green hover:bg-emerald-300 text-white">
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