"use client"

import axios from 'axios';
import { useState, useEffect } from "react"
import { apiEndPoint, colors } from '@/utils/colors';
import toast from 'react-hot-toast';
import { Check, Edit, Calendar, Gift, X, Soup } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";

interface Props {
    onClose: () => void;
}

interface RewardProps {
    uid: number,
    reward_title: string,
    description: string,
    expiry_date: string,
    reward: string,
    reward_type: string,
    rewardPrice: number,
    isActive: number
}
type RewardsResponse = RewardProps[]

export const EditRewards = ({ onClose }: Props) => {
    const [title, setRewardTitle] = useState('')
    const [description, setRewardDescription] = useState('')
    const [expiryDate, setRewardExpiryDate] = useState('')
    const [reward, setReward] = useState('')
    const [rewardType, setRewardType] = useState('')
    const [rewardPrice, setRewardPrice] = useState(0)
    const [isActive, setRewardIsActive] = useState(false)

    const handleSpecialToggle = () => setRewardIsActive(!isActive);

    const updateReward = async () => {
        try {
            const payload = {
                rewardTitle: title,
                description: description,
                expiryDate: expiryDate,
                reward: reward,
                rewardType: rewardType,
                rewardPrice: rewardPrice,
                isActive: isActive
            }

            const url = `products/setreward`
            const response = await axios.patch<RewardsResponse>(`${apiEndPoint}/${url}`, payload)
            console.log("The reward has been added successfully", response.data)
            rewardSuccessNotification()
            onClose();
        } catch (error) {
            console.error('Failed to add reward:', error);
            rewardErrorNotification();
        }
    }

    const rewardSuccessNotification = () => {
        toast.success('The reward has been saved to the database', {
            icon: <Check color={colors.green} size={24} />,
            duration: 3000,
        });
    };

    const rewardErrorNotification = () => {
        toast.error('There was an error was setting the new reward', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
        });
    };

    return (
        <div className='flex gap-2 pt-8 pr-2'>
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg sm:max-w-[600px] w-full">
                        <div className="flex justify-end cursor-pointer">
                            <X size={18} color='red' onClick={onClose}/>
                        </div>
                        <div className="text-xl font-semibold">Edit Reward</div>
                        <p className="text-gray-600">Add alternative ways customers can redeem rewards</p>
                        <div className="pt-4">
                                <div className="flex flex-col gap-2">
                                    <div className="w-full">
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Title:
                                        </Label>
                                        <input onChange={(e) => setRewardTitle(e.target.value)} type="input" placeholder="Product Reviews" className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                    <div className="w-full">
                                        <Label htmlFor="name" className="text-left pt-4">
                                            Description:
                                        </Label>
                                        <input onChange={(e) => setRewardDescription(e.target.value)} type="input" placeholder="complete a review on store products" className='w-full p-2 rounded-lg border border-gray-300'/>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Reward:
                                                </Label>
                                                <input onChange={(e) => setReward(e.target.value)} type="input" placeholder="10% Off Cart" className='w-full p-2 rounded-lg border border-gray-300'/>
                                            </div>
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Price:
                                                </Label>
                                                <input onChange={(e) => setRewardPrice(Number(e.target.value))} type="input" placeholder="10" className='w-full p-2 rounded-lg border border-gray-300'/>
                                            </div>
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Type:
                                                </Label>
                                                <select 
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                    onChange={(e) => setRewardType(e.target.value)}
                                                >
                                                        <option>Select Type</option>
                                                            <option value="Percentage">Percentage</option>
                                                            <option value="Amount">Amount</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col w-full">
                                                <Label htmlFor="isactive" className="text-left pt-4">
                                                    Active/Inactive:
                                                </Label>
                                                <div className="checkbox-apple">
                                                    <input className="yep" 
                                                    id="check-apple" 
                                                    type="checkbox" 
                                                    onClick={ handleSpecialToggle }
                                                />
                                                    <label htmlFor="check-apple"></label>
                                                </div>
                                            </div>
                        <button
                            onClick={ updateReward  }
                            className="bg-black text-white p-2 w-full rounded-lg hover:bg-red"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
