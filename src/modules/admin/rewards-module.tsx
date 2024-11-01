'use client'

import axios from 'axios';
import { useState, useEffect } from "react"
import { apiEndPoint, colors } from '@/utils/colors';
import toast from 'react-hot-toast';
import { Check, Edit, Calendar, Gift, X, Soup, Store, Expand, Trash2} from "lucide-react"
import { RewardCards } from "@/components/component/rewards-cards";
import { AddNewRewards } from "./rewards/add-rewards";
import { EditRewards } from "@/components/component/edit-rewards";
import { DeleteRewardConfirmation } from "@/components/component/delete-reward";
import { RewardSummaryCards } from "./rewards/reward-cards"

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
    const [addRewardsPopUp, setRewardsPopUp] = useState(false);
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

    const [deletePopUp, setDeletePopUp] = useState(false);
    
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

    const toggleAddRewards = () => {
        setRewardsPopUp(!addRewardsPopUp);
    }

    const toggleEditProductPage = () => {
        setEditProductsPopup(!editProductsPopup);
    };

    const toggleDeletePage = () => {
        setDeletePopUp(!deletePopUp);
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
        <div>
            {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
            {editProductsPopup && <EditRewards onClose={ toggleEditProductPage } />}
            {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />}
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-2xl font-semibold text-red">Customer Rewards</h4>
                        <p className="text-gray-500">Provide customers with multiple options to redeem their rewards.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddRewards } className="bg-black text-white p-2 w-40 h-10 rounded-lg hover:bg-red">
                            Add Rewards
                        </button>
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
                                    {/* {editProductsPopup && <EditRewards onClose={ toggleEditProductPage } />} */}
                                    <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                        <button className="flex items-center justify-center cursor-pointer">
                                            <Expand  color="gray" />
                                        </button>
                                        <button className="flex items-center justify-center cursor-pointer" onClick={ toggleEditProductPage }>
                                            <Edit color="gray" /> 
                                        </button>
                                        <button className="flex items-center justify-center cursor-pointer" onClick={ toggleDeletePage }>
                                            <Trash2 color="red" /> 
                                        </button>
                                    </div>
                                </div>
                            </div>
                    {/* })} */}
                </div>
            </div>
        </div>
        </div>
    );
}