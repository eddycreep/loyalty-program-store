'use client'

import axios from 'axios';
import { useState, useEffect } from "react"
import { apiEndPoint, colors } from '@/utils/colors';
import { Expand, Shrink, Edit, X, Check, Trash2, ShieldAlert, XOctagon, PlusCircle} from "lucide-react"
import { AddNewRewards } from "./rewards/add-new-rewards";
import { EditRewards } from "@/components/component/edit-rewards";
import { DeleteRewardConfirmation } from "@/components/component/delete-reward-confirmation";
import { RewardSummaryCards } from "./rewards/reward-cards";
import SquareCircleLoader from "@/lib/square-circle-loader";

export interface RewardProps {
    reward_id: number,
    reward_title: string,
    description: string,
    reward: string,
    reward_type: string,
    reward_price: number,
    store_id: string,
    region: string,
    start_date: string,
    expiry_date: string,
    loyalty_tier: string,
    age_group: string,
    isActive: boolean
    
}
type RewardsResponse = RewardProps[]

export const RewardsModule = () => {
    const [rewards, setRewards] = useState<RewardsResponse>([]);
    const [addRewardsPopUp, setRewardsPopUp] = useState(false);
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const [selectedReward, setSelectedReward] = useState<RewardProps | null>(null);
    const [selectedRewardID, setSelectedRewardID] = useState(0);
    const [selectedRewardTitle, setSelectedRewardTitle] = useState('');

    const headers = ['Reward ID', 'Title', 'Description', 'Reward', 'Reward Type', 'Reward Price', 'Store ID', 'Action']

    const [deletePopUp, setDeletePopUp] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const fetchRewards = async () => {
        setLoadingData(true);

        try {
            const url = `rewards/get-all-rewards`
            const response = await axios.get<RewardsResponse>(`${apiEndPoint}/${url}`);
            setRewards(response?.data);
            setLoadingData(false);

        } catch (error) {
            console.error('Error fetching rewards:', error);
            setIsError(true);
        }
    }

    const toggleAddRewards = () => {
        setRewardsPopUp(!addRewardsPopUp);
    }

    const handleEditReward = (reward_id: any) => {
        const selected = rewards.find((item) => item.reward_id === reward_id) || null;
        
        if (selected) {
            setSelectedReward(selected);
            setEditProductsPopup(true);
            
        } else {
            console.log("No selected Reward, sumn wrong with the code my nigga:" + selected);
        }
    }; 

    const toggleDeletePage = (rewardID: number, rewardTitle: string) => {
        setDeletePopUp(!deletePopUp);
        setSelectedRewardID(rewardID)
        setSelectedRewardTitle(rewardTitle)
    };

    const closeEditRewardsPopup = () => {
        setEditProductsPopup(false);
    }

    useEffect(() => {
        fetchRewards();
    }, []);


    if (loadingData) {
        return (
            <div>
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-xl font-semibold text-purple">Customer Rewards</h4>
                        <p className="text-gray-400">Provide customers with multiple options to redeem their rewards.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddRewards } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-20 flex flex-col items-center justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        </div>
        {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />}
        </div>
        )
    }


    if (isError) {
        return (
            <div>
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-xl font-semibold text-purple">Customer Rewards</h4>
                        <p className="text-gray-400">Provide customers with multiple options to redeem their rewards.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddRewards } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <XOctagon size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">An error occoured when fetching the rewards!</p>
                </div>
            </div>
        </div>
        {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />}
        </div>
        )
    }


    if (rewards.length === 0) {
        return (
            <div>
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                        <h4 className="text-xl font-semibold text-purple">Customer Rewards</h4>
                        <p className="text-gray-400">Provide customers with multiple options to redeem their rewards.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddRewards } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <ShieldAlert size={44} />
                    <p className="ml-2 uppercase pt-2 text-green">No rewards have been set for customers. Add new rewards to enhance their experience!</p>
                </div>
            </div>
        </div>
        {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />}
        </div>
        )
    }

    return (
        <div className="pb-52">
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y pb-10'>
                <div className="pt-6">
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-24">
                        <h4 className="text-xl font-semibold text-purple">Customer Rewards</h4>
                        <p className="text-gray-400">Provide customers with multiple options to redeem their rewards.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddRewards } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                {rewards?.map(({ reward_id, reward_title, description, reward, reward_type, reward_price, store_id, region, start_date, expiry_date, loyalty_tier, age_group, isActive }) => (
                            <div key={reward_id} className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-lg">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm flex-1 text-center text-purple">{reward_id}</p>
                                    <p className="text-sm flex-1 text-center">{reward_title || '--:--'}</p>
                                    <p className="text-sm flex-1 text-center">{description || '--:--'}</p>
                                    <p className="text-sm flex-1 text-center">{reward || '--:--'}</p>
                                    <p className="text-sm flex-1 text-center">{reward_type || '--:--'}</p>
                                    <p className="text-sm flex-1 text-center">R{reward_price || '--:--'}</p>
                                    <p className="text-sm flex-1 text-center">{store_id || '--:--'}</p>
                                    <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                        <button onClick={() => handleExpandClick(reward_id)} className="flex items-center justify-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg">
                                            {expandedRow === reward_id ? (<Shrink size={21} />) : (<Expand size={21} />)}
                                        </button>
                                        <button onClick={() => handleEditReward(reward_id)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
                                            <Edit size={21} /> 
                                        </button>
                                        <button onClick={() => toggleDeletePage(reward_id, reward_title)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
                                            <Trash2 size={21} /> 
                                        </button>
                                    </div>
                                </div>
                                {expandedRow === reward_id && (
                                    <div className="pt-4">
                                        <div className="grid grid-cols-8 gap-4 pt-2 bg-gray-100 rounded shadow-inner text-center p-4 text-sm">
                                            <p className="font-medium text-gray-600"></p>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Region</p>
                                            <p className="text-sm text-gray-500 pt-1">{region || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Loyalty Tier</p>
                                            <p className="text-sm text-gray-500 pt-1">{loyalty_tier || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Age Group</p>
                                            <p className="text-sm text-gray-500 pt-1">{age_group || '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Start Date</p>
                                            <p className="text-sm text-gray-500 pt-1">{start_date ? start_date.split(" ")[0] : '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Expiry Date</p>
                                            <p className="text-sm pt-1 text-red">{expiry_date ? expiry_date.split(" ")[0] : '--:--'}</p>
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-600 text-xs uppercase">Status</p>
                                            <p className={`text-sm pt-1 ${isActive === true ? 'text-green' : 'text-red'}`}>
                                                {isActive === true ? 'Active' : 'Inactive'}
                                            </p>
                                        </div>
                                    </div>
                                    </div>
                                )}
                            </div>
                        ))}
                </div>
            </div>
        </div>
        {deletePopUp && (<DeleteRewardConfirmation rewardID={selectedRewardID} rewardTitle={selectedRewardTitle} isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddRewards } />}
        </div>
    );
}