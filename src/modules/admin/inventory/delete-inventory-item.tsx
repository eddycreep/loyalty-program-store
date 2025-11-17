'use client'

import toast from 'react-hot-toast';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { X, Check } from 'lucide-react'
import { apiEndPoint, colors } from '@/utils/colors';
import { UserActivity } from '@/modules/types/data-types'
import { RewardInfo, RewardInfoResponse } from '@/modules/types/rewards/rewards-data';
import { useSession } from '@/context';
import { Organisation, OrganisationResponse } from '@/modules/types/organisation/organisation-types';
import { apiClient } from '@/utils/api-client';

export const DeleteInventoryItemConfirmation = ({ isOpen, onClose, itemCode, onSuccess }: any) => {
    const { user } = useSession();
    const [organisation, setOrganisation] = useState<Organisation | null>(null);

    if (!isOpen) return null;

    const deleteInventoryItem = async () => {
        try{
            const url = `inventory/delete-inventory-item/${itemCode}`
            const response = await apiClient.patch(`${apiEndPoint}/${url}`)

            toast.success('Item Deleted', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
                style: {
                    backgroundColor: 'white', 
                    color: 'black',
                },
            });

            // Call the onSuccess callback to refresh the inventory item data
            if (onSuccess) {
                onSuccess();
            }

            onClose();
        } catch (error) {
            console.error('Error deleting item:', error)
            toast.error('Item Not Deleted', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    return (
        <div className="flex fixed inset-0 justify-center items-center h-screen bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-[450px]">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X className="w-4 h-4" />
                </Button>
                <div>
                    <div className="pb-2 text-lg font-bold text-gray-600">Confirm Deletion</div>
                    <p className="pb-4 text-gray-600">Are you sure you want to delete this item? This action cannot be undone.</p>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button onClick={onClose} className="h-8 text-white bg-purple border-purple hover:bg-indigo-300 hover:border-indigo-300 hover:text-white">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteInventoryItem() } className="h-8 text-white bg-red border-red hover:bg-rose-300 hover:border-rose-300">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};