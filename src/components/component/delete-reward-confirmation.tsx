'use client'

import toast from 'react-hot-toast';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { X, Check } from 'lucide-react'
import { apiEndPoint, colors } from '@/utils/colors';
import { UserActivity } from '@/modules/types/data-types'
import { RewardInfo, RewardInfoResponse } from '@/modules/types/rewards/rewards-data';
import { useSession } from '@/context';

export const DeleteRewardConfirmation = ({ isOpen, onClose, rewardID, rewardTitle }: any) => {
  const { user } = useSession();
  const [rewardInfo, setRewardInfo] = useState<RewardInfoResponse>([])

  if (!isOpen) return null;

  
  const getRewardInfo = async () => {
    try {
        const url = `rewards/get-reward-info/${rewardTitle}`
        const response = await axios.get<RewardInfoResponse>(`${apiEndPoint}/${url}`)
        setRewardInfo(response.data)

        await logUserActivity(response.data[0]); 
    } catch (error) {
        console.error('Error RETURNING REWARD INFO:', error)
    }
  }


  const logUserActivity = async (bonus: RewardInfo) => {
    const message = "User deleted a reward";

    try {
        const payload = {
          emp_id: user.id,
          emp_name: user.emp_name,
          activity_id: bonus.reward_id,
          activity: bonus.reward_title,
          activity_type: bonus.reward_type,
          log_message: message
        };

        const url = `logs/log-user-activity`;
        const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);

        await deleteReward()
    } catch (error) {
        console.error('Error logging reward activity:', error);
    }
  };


  const deleteReward = async () => {
    try{
      const url = `rewards/delete-reward/${rewardID}`
      const response = await axios.delete(`${apiEndPoint}/${url}`)

      toast.success('Reward Deleted', {
          icon: <Check color={colors.green} size={24} />,
          duration: 3000,
          style: {
            backgroundColor: 'black', 
            color: 'white',
          },
      });

      onClose();
    } catch (error) {
      console.error('Error deleting special:', error)
      toast.error('Reward Not Deleted', {
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
          <div className="text-lg font-bold pb-2 text-gray-600">Confirm Deletion</div>
          <p className="text-gray-600 pb-4">Are you sure you want to delete this special? This action cannot be undone.</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button onClick={onClose} className="bg-purple text-white border-purple hover:bg-indigo-300 hover:border-indigo-300 hover:text-white h-8">
            Cancel
          </Button>
          <Button onClick={() => getRewardInfo() } className="bg-red text-white border-red hover:bg-rose-300 hover:border-rose-300 h-8">
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};