'use client'

import toast from 'react-hot-toast';
import axios from 'axios'
import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { X, Check } from 'lucide-react'
import { apiEndPoint, colors } from '@/utils/colors';
import { UserActivity } from '@/modules/types/data-types'
import { ReviewInfoResponse, ReviewInfo } from '@/modules/types/reviews/reviews-data';
import { useSession } from '@/context';

export const DeleteReviewConfirmation = ({ isOpen, onClose, reviewID, reviewTitle }: any) => {
    const { user } = useSession();
    const [reviewInfo, setReviewInfo] = useState<ReviewInfoResponse>([])

    if (!isOpen) return null;

    console.log('review id: ', reviewID)
    console.log('review title: ', reviewTitle)

    
    const getReviewInfo = async () => {
        try {
            const url = `reviews/get-review-info/${reviewTitle}`
            const response = await axios.get<ReviewInfoResponse>(`${apiEndPoint}/${url}`)
            setReviewInfo(response.data)

            console.log('review info: ', response.data)

            await logUserActivity(response.data[0]); 
        } catch (error) {
            console.error('Error RETURNING REVIEW INFO:', error)
        }
    }


    const logUserActivity = async (bonus: ReviewInfo) => {
        const message = "User deleted a review";

        try {
            const payload = {
                emp_id: user.uid,
                emp_name: user.emp_name,
                activity_id: bonus.review_id,
                activity: bonus.review_title,
                activity_type: bonus.review_category,
                log_message: message
            };

            const url = `logs/log-user-activity`;
            const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);

            await deleteReview()
        } catch (error) {
            console.error('Error logging review activity:', error);
        }
    };


    const deleteReview = async () => {
        try{
        const url = `reviews/delete-review/${reviewID}`
        const response = await axios.delete(`${apiEndPoint}/${url}`)

        toast.success('Review Deleted', {
            icon: <Check color={colors.green} size={24} />,
            duration: 3000,
            style: {
                backgroundColor: 'black', 
                color: 'white',
            },
        });

        onClose();
        } catch (error) {
        console.error('Error deleting review:', error)
        toast.error('Review Not Deleted', {
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
                    <p className="text-lg font-bold pb-2 text-gray-600">Confirm Deletion</p>
                    <p className="text-gray-600 pb-4">Are you sure you want to delete this review? This action cannot be undone.</p>
                </div>
                <div className="flex justify-end space-x-2">
                    <Button onClick={ onClose } className="bg-purple text-white border-purple hover:bg-indigo-300 hover:border-indigo-300 hover:text-white h-8">
                        Cancel
                    </Button>
                    <Button onClick={() => getReviewInfo() } className="bg-red text-white border-red hover:bg-rose-300 hover:border-rose-300 h-8">
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
};