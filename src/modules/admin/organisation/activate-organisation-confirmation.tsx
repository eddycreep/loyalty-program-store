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

export const ActivateOrganisationConfirmation = ({ isOpen, onClose, organisationID, onSuccess }: any) => {
    const { user } = useSession();
    const [organisation, setOrganisation] = useState<Organisation | null>(null);

    if (!isOpen) return null;

    const activateOrganisation = async () => {
        try{
            const url = `organisation/activate-organisation/${organisationID}`
            const response = await apiClient.patch(`${apiEndPoint}/${url}`)

            toast.success('Organisation Activated', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
                style: {
                    backgroundColor: 'white', 
                    color: 'black',
                },
            });

            // Call the onSuccess callback to refresh the organisation data
            if (onSuccess) {
                onSuccess();
            }

            onClose();
        } catch (error) {
            console.error('Error activating organisation:', error)
            toast.error('Organisation Not Activated', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    return (
        <div className="h-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-[450px]">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={onClose}
                    aria-label="Close"
                >
                    <X className="h-4 w-4" />
                </Button>
                <div>
                    <div className="text-lg font-bold pb-2 text-gray-600">Confirm Activation</div>
                    <p className="text-gray-600 pb-4">Are you sure you want to activate this organisation? This action cannot be undone.</p>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button onClick={onClose} className="bg-purple text-white border-purple hover:bg-indigo-300 hover:border-indigo-300 hover:text-white h-8">
                        Cancel
                    </Button>
                    <Button onClick={() => activateOrganisation() } className="bg-red text-white border-red hover:bg-rose-300 hover:border-rose-300 h-8">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};