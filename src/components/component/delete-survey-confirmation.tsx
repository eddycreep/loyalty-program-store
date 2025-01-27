'use client'

import toast from 'react-hot-toast';
import axios from 'axios'
import React from 'react'
import { Button } from "@/components/ui/button"
import { X, Check } from 'lucide-react'
import { apiEndPoint, colors } from '@/utils/colors';

export const DeleteSurveyConfirmation = ({ isOpen, onClose, surveyID }: any) => {
  if (!isOpen) return null;

  const deleteSurvey = async (surveyid: number) => {
    try{
      const url = `survey/delete-survey/${surveyid}`
      const response = await axios.delete(`${apiEndPoint}/${url}`);
      console.log("Deleted Survey Successfully", response)

      toast.success('Survey Deleted', {
        icon: <Check color={colors.green} size={24} />,
        duration: 3000,
      });

      onClose() 
    } catch (error) {
      console.error('Error deleting survey questions', error)
      toast.error('Survey Not Deleted', {
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
          <div className="text-lg font-semibold mb-2">Confirm Deletion</div>
          <p className="text-gray-600 mb-4">Are you sure you want to delete this survey? This action cannot be undone.</p>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-purple text-white hover:bg-indigo-300 hover:text-white h-8"
          >
            Cancel
          </Button>
          <Button
            onClick={() => { deleteSurvey(surveyID)}}
            className="bg-red text-white hover:bg-rose-300 h-8"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};