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
import { apiClient } from '@/utils/api-client';
import { EditReview } from './reviews/edit-review';
import { getAllReviews } from '@/components/data/reviews/get-all-reviews';
import { useSession } from '@/context';

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
    const { user } = useSession();
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
            const reviewsData = await getAllReviews(user)
            setReviews(reviewsData)
            console.log("reviews data returned my gee: ", reviewsData)
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
            <div className='flex flex-col gap-4 mb-80 w-full h-full rounded-lg overflow-y'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-6 pl-2">
                      <h4 className="text-xl font-semibold text-purple">Customer Reviews</h4>
                      <p className="text-gray-400">Manage customer feedback to gain insights on products, store experience, and the loyalty program.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddReviews } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 mx-2 mt-4 font-bold text-gray-600 bg-white rounded divide-x divide-gray-500 shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center pt-20">
                    <SquareCircleLoader />
                    <p className="pt-4 text-gray-500 uppercase">Loading data, please be patient.</p>
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
            <div className='flex flex-col gap-4 mb-80 w-full h-full rounded-lg overflow-y'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-6 pl-2">
                      <h4 className="text-xl font-semibold text-purple">Customer Reviews</h4>
                      <p className="text-gray-400">Manage customer feedback to gain insights on products, store experience, and the loyalty program.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddReviews } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 mx-2 mt-4 font-bold text-gray-600 bg-white rounded divide-x divide-gray-500 shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center pt-10">
                    <XOctagon size={44} className="text-black" />
                    <p className="pt-2 ml-2 uppercase text-red">An error occoured when fetching the rewards!</p>
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
            <div className='flex flex-col gap-4 mb-80 w-full h-full rounded-lg overflow-y'>
                <div>
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-6 pl-2">
                      <h4 className="text-xl font-semibold text-purple">Customer Reviews</h4>
                      <p className="text-gray-400">Manage customer feedback to gain insights on products, store experience, and the loyalty program.</p>
                    </div>
                    <div className='flex gap-2 pt-8 pr-2'>
                        <button onClick={ toggleAddReviews } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="flex justify-between items-center p-3 mx-2 mt-4 font-bold text-gray-600 bg-white rounded divide-x divide-gray-500 shadow-lg">
                    {headers?.map((header, index) => (
                        <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                            {header}
                        </p>
                    ))}
                </div>
                <div className="flex flex-col justify-center items-center pt-10">
                    <ShieldAlert size={44} className="text-black" />
                    <p className="pt-2 ml-2 uppercase text-green">No rewards have been set for customers. Add new rewards to enhance their experience!</p>
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
            <div className='flex flex-col gap-4 pb-10 w-full h-full rounded-lg overflow-y'>
                <div className="pt-6">
                    <RewardSummaryCards />
                </div>
            <div>
                <div className="flex justify-between">
                    <div className="flex flex-col pt-24 pl-2">
                        <h4 className="text-xl font-semibold text-purple">Customer Reviews</h4>
                        <p className="text-gray-400">Manage customer feedback to gain insights on products, store experience, and the loyalty program.</p>
                    </div>
                    <div className='flex gap-2 pt-28 pr-2'>
                        <button onClick={ toggleAddReviews } className="px-2 py-2 w-10 h-10 text-white rounded-lg bg-green hover:bg-emerald-300">
                            <PlusCircle size={21} /> 
                        </button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                        <div className="flex justify-between items-center p-3 mx-2 mt-4 font-bold text-gray-600 bg-white rounded divide-x divide-gray-500 shadow-lg">
                            {headers?.map((header, index) => (
                                <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                                    {header}
                                </p>
                            ))}
                        </div>
                        <div className="pt-2 max-h-[550px] pb-2 space-y-2">
                        {reviews?.map(({ review_id, review_title, description, review_category, store_id, reward, reward_price, reward_type, region, loyalty_tier, age_group, start_date, expiry_date, isActive }) => (
                                    <div key={review_id} className="flex flex-col p-3 mx-2 text-gray-600 bg-white rounded shadow-lg">
                                        <div className="flex justify-between items-center">
                                            <p className="flex-1 text-sm text-center text-purple">{review_id}</p>
                                            <p className="flex-1 text-sm text-center">{review_title || '--:--'}</p>
                                            <p className="flex-1 text-sm text-center">{description || '--:--'}</p>
                                            <p className="flex-1 text-sm text-center">{reward || '--:--'}</p>
                                            <p className="flex-1 text-sm text-center">{reward_type || '--:--'}</p>
                                            <p className="flex-1 text-sm text-center">R{reward_price || '--:--'}</p>
                                            <p className="flex-1 text-sm text-center">{store_id || '--:--'}</p>
                                            <div className="flex flex-1 gap-4 justify-center items-center text-sm text-center">
                                                <button onClick={() => handleExpandClick(review_id)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-purple border-purple hover:bg-indigo-100">
                                                    {expandedRow === review_id ? (<Shrink size={21} />) : (<Expand size={21} />)}
                                                </button>
                                                <button onClick={() => handleEditReview(review_id)} className="flex justify-center items-center p-1 text-gray-500 bg-white rounded-lg border border-gray-500 cursor-pointer hover:bg-gray-200">
                                                    <Edit size={21} /> 
                                                </button>
                                                <button onClick={() => toggleDeletePage(review_id, review_title)} className="flex justify-center items-center p-1 bg-white rounded-lg border cursor-pointer text-red border-red hover:bg-rose-100">
                                                    <Trash2 size={21} /> 
                                                </button>
                                            </div>
                                        </div>
                                        {expandedRow === review_id && (
                                            <div className="pt-4">
                                                <div className="grid grid-cols-8 gap-4 p-4 pt-2 text-sm text-center bg-gray-100 rounded shadow-inner">
                                                    <p className="font-medium text-gray-600"></p>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-600 uppercase">Region</p>
                                                    <p className="pt-1 text-sm text-gray-500">{region || '--:--'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-600 uppercase">Loyalty Tier</p>
                                                    <p className="pt-1 text-sm text-gray-500">{loyalty_tier || '--:--'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-600 uppercase">Age Group</p>
                                                    <p className="pt-1 text-sm text-gray-500">{age_group || '--:--'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-600 uppercase">Start Date</p>
                                                    <p className="pt-1 text-sm text-gray-500">{start_date ? start_date.split(" ")[0] : '--:--'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-600 uppercase">Expiry Date</p>
                                                    <p className="pt-1 text-sm text-red">{expiry_date ? expiry_date.split(" ")[0] : '--:--'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-600 uppercase">Status</p>
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
        {editProductsPopup && <EditReview onClose={closeEditReviewsPopup} selectedReview={selectedReview} />}
        {addReviewsPopUp && <AddReview onClose={ toggleAddReviews } />} 
        </div>
    );
}