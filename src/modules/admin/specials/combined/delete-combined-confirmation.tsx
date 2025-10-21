'use client'

import toast from 'react-hot-toast';
import React from 'react'
import { Button } from "@/components/ui/button"
import { X, Check } from 'lucide-react'
import { apiEndPoint, colors } from '@/utils/colors';
import { apiClient } from '@/utils/api-client';

export const CombinedDeleteConfirmation = ({ isOpen, onClose, specialID }: any) => {
    if (!isOpen) return null; // Return null if dialog is not open

    const deleteSpecial = async (specialId: number) => {
        try{
            const url = `specials/delete-special/${specialId}`
            const response = await apiClient.patch(`${apiEndPoint}/${url}`)
            console.log("Special deleted successfully:", response)
        
            toast.success('Special deleted successfully', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            })
        
            onClose()
        } catch (error) {
            console.error('Error deleting special:', error)
            toast.error('Error deleting special', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            })
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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
                    <p className="text-gray-600 pb-4">Are you sure you want to delete this special? This action cannot be undone.</p>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button onClick={onClose} className="bg-purple text-white border-purple hover:bg-indigo-300 hover:border-indigo-300 hover:text-white h-8">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteSpecial(specialID)} className="bg-red text-white border-red hover:bg-rose-300 hover:border-rose-300 h-8">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};