'use client'

import toast from 'react-hot-toast';
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { X, Check } from 'lucide-react'
import { apiEndPoint, colors } from '@/utils/colors';
import { useSession } from '@/context';
import { apiClient } from '@/utils/api-client';
import { Branch } from '@/modules/types/branch/branches-types';

export const DeleteBranchConfirmation = ({ isOpen, onClose, branchID, onSuccess }: any) => {
    const { user } = useSession();
    const [branch, setBranch] = useState<Branch | null>(null);

    if (!isOpen) return null;

    const deleteBranch = async () => {
        try{
            const url = `branch/delete-branch/${branchID}`
            const response = await apiClient.patch(`${apiEndPoint}/${url}`)

            toast.success('Branch Deleted', {
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
            console.error('Error deleting branch:', error)
            toast.error('Branch Not Deleted', {
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
                    <div className="text-lg font-bold pb-2 text-gray-600">Confirm Deletion</div>
                    <p className="text-gray-600 pb-4">Are you sure you want to delete this branch? This action cannot be undone.</p>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button onClick={onClose} className="bg-purple text-white border-purple hover:bg-indigo-300 hover:border-indigo-300 hover:text-white h-8">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteBranch() } className="bg-red text-white border-red hover:bg-rose-300 hover:border-rose-300 h-8">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};