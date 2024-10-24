'use client'

import axios from 'axios';
import { useState, useEffect } from "react"
import { apiEndPoint, colors } from '@/utils/colors';
import toast from 'react-hot-toast';
import { Check, Edit, Calendar, Gift, X, Soup, Store} from "lucide-react"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import { RewardCards } from "@/components/component/rewards-cards";
import { EditRewards } from "@/components/component/edit-rewards"

// Define the Reward type
type Reward = {
    id: number
    task: string
    reward: string
    type: 'percentage' | 'fixed'
    icon: JSX.Element
}

// Define the initial rewards
const initialRewards: Reward[] = [
        // { id: 1, task: 'Share product on social media', reward: '10% off next purchase', type: 'percentage', icon: <Share2 className="h-6 w-6" /> },
        { id: 1, task: 'Attend in-store event', reward: '$5 store credit', type: 'fixed', icon: <Calendar className="h-6 w-6" /> },
        { id: 2, task: 'Refer a friend', reward: 'Free gift with next purchase', type: 'fixed', icon: <Gift className="h-6 w-6" /> },
        // { id: 4, task: 'Join loyalty program', reward: '15% off first purchase', type: 'percentage', icon: <Users className="h-6 w-6" /> },
        { id: 3, task: 'Complete a Product Review', reward: '5% off reviewed product', type: 'percentage', icon: <Soup className="h-6 w-6" /> },
]

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

export const RewardsModule = () => {
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const headers = ['Title', 'Task', 'Reward', 'Type', 'Amount', 'Action']

    const [title, setRewardTitle] = useState('')
    const [description, setRewardDescription] = useState('')
    const [expiryDate, setRewardExpiryDate] = useState('')
    const [reward, setReward] = useState('')
    const [rewardType, setRewardType] = useState('')
    const [storeID, setStoreID] = useState('') //add store id to the backend as well
    const [rewardPrice, setRewardPrice] = useState(0)
    const [isActive, setRewardIsActive] = useState(false)
    
    const addReward = async () => {
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
            const response = await axios.post<RewardsResponse>(`${apiEndPoint}/${url}`, payload)
            console.log("The reward has been added successfully", response.data)
            rewardSuccessNotification()
        } catch (error) {
            console.error('Failed to add reward:', error);
            rewardErrorNotification();
        }
    }

    const handleSpecialToggle = () => {
        setRewardIsActive(!isActive); // Toggle the state
    };

    const toggleEditProductPage = () => {
        setEditProductsPopup(!editProductsPopup);
    };

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
        <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
            <div>
                <RewardCards />
            </div>
            <div>
            <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-red">Customer Rewards</h4>
                        <p className="text-gray-500">Provide customers with multiple options to redeem their rewards.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="bg-black text-white p-2 w-40 rounded-lg hover:bg-red">Add Reward</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[600px]">
                                    <DialogHeader>
                                    <DialogTitle>Add New Rewad</DialogTitle>
                                    <DialogDescription>
                                        Add alternative ways customers can redeem rewards
                                    </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex gap-2">
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
                                        <div className="flex gap-2">
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
                                        </div>
                                        <div className="flex gap-2">
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
                                            <div className="w-full">
                                                <Label htmlFor="name" className="text-left pt-4">
                                                    Store ID:
                                                </Label>
                                                <select 
                                                    className="w-full p-2 rounded-lg border border-gray-300"
                                                    onChange={(e) => setStoreID(e.target.value)}
                                                >
                                                        <option>Select Store ID</option>
                                                        <option value="All">All</option>
                                                        <option value="S001">S001</option>
                                                        <option value="S002">S002</option>
                                                        <option value="S003">S003</option>
                                                        <option value="S004">S004</option>
                                                        <option value="S005">S005</option>
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
                                    </div>
                                    <DialogFooter>
                                        <button  onClick={ addReward } className="bg-black text-white p-2 w-full rounded-lg hover:bg-red">
                                            Save
                                        </button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                    </div>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                {/* {allProductSpecials?.map(({ special_id, special, special_type, store_id, start_date, expiry_date, special_value, isActive, product_description, special_price }) => { */}
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Product Reviews</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by completing product reviews</p>
                                    <p className="text-sm flex-1 text-center">10% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center text-green">10</p>
                                    {editProductsPopup && <EditRewards onClose={ toggleEditProductPage } />}
                                    <button className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer" onClick={ toggleEditProductPage }>
                                        <Edit />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Survey Completion</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards by completing survys</p>
                                    <p className="text-sm flex-1 text-center">R50 discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Amount</p>
                                    <p className="text-sm flex-1 text-center text-green">50</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Client Referral</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards referring new customers to the loyalty program</p>
                                    <p className="text-sm flex-1 text-center">20% Discount on Cart</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center text-green">20</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">Store Event</p>
                                    <p className="text-sm flex-1 text-center">Customers can earn rewards battending events hosted by the company</p>
                                    <p className="text-sm flex-1 text-center">20% Discount any product</p>
                                    <p className="text-sm flex-1 text-center">Percentage</p>
                                    <p className="text-sm flex-1 text-center text-green">20</p>
                                    <p className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                                        <Edit />
                                    </p>
                                </div>
                            </div>
                    {/* })} */}
                </div>
            </div>
        </div>
    );
}