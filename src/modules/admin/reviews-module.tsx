'use client'

import axios from 'axios';
import { useState, useEffect } from "react"
import { apiEndPoint, colors } from '@/utils/colors';
import { Expand, Shrink, Edit, X, Check, Trash2, ShieldAlert, XOctagon, PlusCircle} from "lucide-react"
import { AddReview } from "./reviews/add-review";
import { EditRewards } from "@/components/component/edit-rewards";
import { RewardSummaryCards } from "./rewards/reward-cards";
import SquareCircleLoader from "@/lib/square-circle-loader";
import { DeleteReviewConfirmation } from '@/components/component/delete-review-confirmation';

export interface ReviewProps {
    review_id: number,
    review_title: string,
    description: string,
    review_category: string,
    store_id: string,
    reward: string,
    reward_price: number,
    reward_type: string,
    region: string,
    loyalty_tier: string,
    age_group: string,
    start_date: string,
    expiry_date: string,
    isActive: boolean
    
}
type ReviewsResponse = ReviewProps[]

export const ReviewsModule = () => {
    const [reviews, setReviews] = useState<ReviewsResponse>([]);
    const [addReviewsPopUp, setReviewsPopUp] = useState(false);
    const [editProductsPopup, setEditProductsPopup] = useState(false);
    const [selectedReview, setSelectedReview] = useState<ReviewProps | null>(null);
    const [selectedReviewID, setSelectedReviewID] = useState(0);
    const [selectedReviewTitle, setSelectedReviewTitle] = useState('');

    const headers = ['Review ID', 'Title', 'Description', 'Reward', 'Reward Type', 'Reward Price', 'Store ID', 'Action']

    const [deletePopUp, setDeletePopUp] = useState(false);
    const [expandedRow, setExpandedRow] = useState<number | null>(null);

    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    const handleExpandClick = (id: number) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const fetchReviews = async () => {
        setLoadingData(true);

        try {
            const url = `reviews/get-all-reviews`
            const response = await axios.get<ReviewsResponse>(`${apiEndPoint}/${url}`);
            setReviews(response?.data);
            setLoadingData(false);

        } catch (error) {
            console.error('Error fetching reviews:', error);
            setIsError(true);
        }
    }

    const toggleAddReviews = () => {
        setReviewsPopUp(!addReviewsPopUp);
    }

    const handleEditReview = (review_id: any) => {
        const selected = reviews.find((item) => item.review_id === review_id) || null;
        
        if (selected) {
            setSelectedReview(selected);
            setEditProductsPopup(true);
            
        } else {
            console.log("No selected Review, sumn wrong with the code my nigga:" + selected);
        }
    }; 

    const toggleDeletePage = (reviewID: number, reviewTitle: string) => {
        setDeletePopUp(!deletePopUp);
        setSelectedReviewID(reviewID)
        setSelectedReviewTitle(reviewTitle)
    };

    const closeEditReviewsPopup = () => {
        setEditProductsPopup(false);
    }

    useEffect(() => {
        fetchReviews();
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
                      <h4 className="text-xl font-semibold text-purple">Customer Reviews</h4>
                      <p className="text-gray-400">Manage customer feedback to gain insights on products, store experience, and the loyalty program.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddReviews } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
        {/* {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddReviews } />} */}
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
                      <h4 className="text-xl font-semibold text-purple">Customer Reviews</h4>
                      <p className="text-gray-400">Manage customer feedback to gain insights on products, store experience, and the loyalty program.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddReviews } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                    <XOctagon size={44} className="text-black" />
                    <p className="ml-2 uppercase pt-2 text-red">An error occoured when fetching the rewards!</p>
                </div>
            </div>
        </div>
        {/* {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddReviews } />} */}
        </div>
        )
    }


    if (reviews.length === 0) {
        return (
            <div>
            <div className='w-full h-full flex flex-col gap-4 rounded-lg overflow-y mb-80'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pl-2 pt-6">
                      <h4 className="text-xl font-semibold text-purple">Customer Reviews</h4>
                      <p className="text-gray-400">Manage customer feedback to gain insights on products, store experience, and the loyalty program.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddReviews } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
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
                    <ShieldAlert size={44} className="text-black" />
                    <p className="ml-2 uppercase pt-2 text-green">No rewards have been set for customers. Add new rewards to enhance their experience!</p>
                </div>
            </div>
        </div>
        {/* {deletePopUp && (<DeleteRewardConfirmation isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {editProductsPopup && <EditRewards onClose={closeEditRewardsPopup} selectedReward={selectedReward} />}
        {addRewardsPopUp && <AddNewRewards onClose={ toggleAddReviews } />} */}
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
                        <h4 className="text-xl font-semibold text-purple">Customer Reviews</h4>
                        <p className="text-gray-400">Manage customer feedback to gain insights on products, store experience, and the loyalty program.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddReviews } className="bg-green text-white py-2 px-2 w-10 h-10 rounded-lg hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                            {headers?.map((header, index) => (
                                <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                                    {header}
                                </p>
                            ))}
                        </div>
                        <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {reviews?.map(({ review_id, review_title, description, review_category, store_id, reward, reward_price, reward_type, region, loyalty_tier, age_group, start_date, expiry_date, isActive }) => (
                                    <div key={review_id} className="bg-white text-gray-600 flex flex-col p-3 mx-2 rounded shadow-lg">
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm flex-1 text-center text-purple">{review_id}</p>
                                            <p className="text-sm flex-1 text-center">{review_title || '--:--'}</p>
                                            <p className="text-sm flex-1 text-center">{description || '--:--'}</p>
                                            <p className="text-sm flex-1 text-center">{reward || '--:--'}</p>
                                            <p className="text-sm flex-1 text-center">{reward_type || '--:--'}</p>
                                            <p className="text-sm flex-1 text-center">R{reward_price || '--:--'}</p>
                                            <p className="text-sm flex-1 text-center">{store_id || '--:--'}</p>
                                            <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                                                <button onClick={() => handleExpandClick(review_id)} className="flex items-center justify-center cursor-pointer bg-white text-purple border border-purple hover:bg-indigo-100 p-1 rounded-lg">
                                                    {expandedRow === review_id ? (<Shrink size={21} />) : (<Expand size={21} />)}
                                                </button>
                                                <button onClick={() => handleEditReview(review_id)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg">
                                                    <Edit size={21} /> 
                                                </button>
                                                <button onClick={() => toggleDeletePage(review_id, review_title)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
                                                    <Trash2 size={21} /> 
                                                </button>
                                            </div>
                                        </div>
                                        {expandedRow === review_id && (
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
            </div>
        </div>
        {deletePopUp && (<DeleteReviewConfirmation reviewID={selectedReviewID} reviewTitle={selectedReviewTitle} isOpen={ deletePopUp } onClose={ toggleDeletePage } /> )}
        {/* {editProductsPopup && <EditReviews onClose={closeEditReviewsPopup} selectedReview={selectedReview} />} */}
        {addReviewsPopUp && <AddReview onClose={ toggleAddReviews } />} 
        </div>
    );
}