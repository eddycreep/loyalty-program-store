'use client'

import axios from 'axios';
import { useState, useEffect } from "react"
import { apiEndPoint, colors } from '@/utils/colors';
import toast from 'react-hot-toast';
import { Check, Edit, X, Trash2} from "lucide-react"
import { AddNewRewards } from "./rewards/add-new-rewards";
import { EditRewards } from "@/components/component/edit-rewards";
import { DeleteRewardConfirmation } from "@/components/component/delete-reward-confirmation";
import { RewardSummaryCards } from "./rewards/reward-cards"

interface RewardProps {
    uid: number,
    reward_title: string,
    description: string,
    reward: string,
    reward_type: string,
    reward_price: number,
    store_id: string,
    region: string,
    start_date: string,
    expiry_date: string,
    isActive: string
}
type RewardsResponse = RewardProps[]

export const RewardsModule = () => {
    const [rewards, setRewards] = useState<RewardsResponse>([]);
    const [addRewardsPopUp, setRewardsPopUp] = useState(false);
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const [selectedReward, setSelectedReward] = useState(null);

    const headers = ['ID', 'Title', 'Task', 'Reward', 'Amount', 'Action']

    const [deletePopUp, setDeletePopUp] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    // const handleExpandClick = (id: number) => {
    //     setExpandedRow(expandedRow === id ? null : id);
    // };

    const fetchRewards = async () => {
        try {
            const url = `admin/getallrewards`
            const response = await axios.get<RewardsResponse>(`${apiEndPoint}/${url}`);
            setRewards(response?.data);
        } catch (error) {
            console.error('Error fetching rewards:', error);

            toast.error(`Error fetching rewards: ${error}`, {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    const toggleAddRewards = () => {
        setRewardsPopUp(!addRewardsPopUp);
    }

    const toggleEditProductPage = (reward: any) => {
        setSelectedReward(reward);  // Set selected reward data
        setEditProductsPopup(!editProductsPopup);
    };

    const toggleDeletePage = () => {
        setDeletePopUp(!deletePopUp);
    };

    useEffect(() => {
        fetchRewards();
    }, []);

    return (
        <div>
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
                {rewards?.map(({ uid, reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, isActive,}) => (
                            <div key={uid} className="bg-white flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-red">{uid}</p>
                                    <p className="text-sm flex-1 text-center">{reward_title || '--:--'}</p>
                                    <p className="text-sm flex-1 text-center">{description || '--:--'}</p>
                                    <p className="text-sm flex-1 text-center">{reward || '--:--'}</p>
                                    <p className="text-sm flex-1 text-center">{reward_price || '--:--'}</p>
                                    <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                        {/* <button className="flex items-center justify-center cursor-pointer" onClick={() => handleExpandClick(uid)}>
                                            <Expand color="gray" />
                                        </button> */}
                                        <button className="flex items-center justify-center cursor-pointer" onClick={ toggleEditProductPage }>
                                            <Edit color="gray" /> 
                                        </button>
                                        <button className="flex items-center justify-center cursor-pointer" onClick={ toggleDeletePage }>
                                            <Trash2 color="red" /> 
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
        {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards rewardData={selectedReward} onClose={ toggleEditProductPage } />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />}
        </div>
    );
}