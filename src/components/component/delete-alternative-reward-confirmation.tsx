'use client'

import toast from 'react-hot-toast';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { X, Check } from 'lucide-react'
import { apiEndPoint, colors } from '@/utils/colors';
import { UserActivity } from '@/modules/types/data-types'
import {  AlternativeRewardProps, AlternativeRewardResponse, AlternativeRewardInfo, AlternativeRewardInfoResponse } from '@/modules/types/alternative-reward/alternative-reward.data-types';
import { useSession } from '@/context';

export const DeleteAlternativeRewardConfirmation = ({ isOpen, onClose, ARID, ARTitle, ARType }: any) => {
    const { user } = useSession();
    const [alternativeRewardInfo, setAlternativeRewardInfo] = useState<AlternativeRewardInfoResponse>([])

    if (!isOpen) return null;

    const deleteAlternativeReward = async () => {
        try{
            const url = `rewards/delete-alternative-reward/${ARID}`
            const response = await axios.delete(`${apiEndPoint}/${url}`)
            console.log('AR Deleted:', response)

            if (response.status === 200) {
                toast.success('Reward Deleted', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                    style: {
                        backgroundColor: 'black', 
                        color: 'white',
                    },
                });

                logUserActivity();
                onClose();
            } else {
                toast.error('Reward Not Deleted', {

                    icon: <X color={colors.red} size={24} />,
                    duration: 3000,
                    style: {
                        backgroundColor: 'black', 
                        color: 'white',
                    },
                });
            }
        } catch (error) {
            console.error('ERROR:', error)
            toast.error('ERROR', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    const logUserActivity = async () => {
        const message = "User deleted an alternative reward";

        try {
            const payload = {
                emp_id: user.uid,
                emp_name: user.emp_name,
                activity_id: ARID,
                activity: ARTitle,
                activity_type: ARType,
                log_message: message
            };


            console.log('PAYLOAD: ', payload)

            const url = `logs/log-user-activity`;
            const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
        } catch (error) {
            console.error('Error logging reward activity:', error);
        }
    };

    return (
        <div className="h-screen fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white rounded-lg shadow-lg p-6 w-[450px] z-50">
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
                    <p className="text-gray-600 pb-4">Are you sure you want to delete this alternative reward? This action cannot be undone.</p>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button onClick={onClose} className="bg-purple text-white border-purple hover:bg-indigo-300 hover:border-indigo-300 hover:text-white h-8">
                        Cancel
                    </Button>
                    <Button onClick={() => deleteAlternativeReward() } className="bg-red text-white border-red hover:bg-rose-300 hover:border-rose-300 h-8">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};