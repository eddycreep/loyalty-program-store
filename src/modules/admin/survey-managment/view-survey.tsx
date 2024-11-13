"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { Edit, Trash2 } from "lucide-react";
import { ViewDetailedSurvey } from "./view-detailed-survey";
import { useRouter } from 'next/navigation';
import { DeleteSurveyConfirmation  } from '@/components/component/delete-survey-confirmation'

interface SurveyProps {
    survey_id: number,
    survey_title: string,
    survey_category: string,
    store_id: string,
    region: string,
    start_date: string,
    expiry_date: string,
    isActive: number
}
type SurveyResponse = SurveyProps[]

export const ViewSurveys = () => {
    const headers = ['Survey ID', 'Survey Name', 'Category', 'Store', 'Region', 'Start Date', 'Expiry Date', 'Status', 'Action']
    const [surveyDeletePopUp, setSurveyDeletePopUp] = useState(false);
    const [surveys, setSurveys] = useState<SurveyResponse>([]);

    const router = useRouter();

    const handleSurveyClick = (surveyId: string) => {
        //router.push(`/survey/${surveyId}`); 
        router.push(`/admin/survey-management/${surveyId}`);
    };

    const toggleSurveyDeletePage = () => {
        setSurveyDeletePopUp(!surveyDeletePopUp);
    };

    const fetchAllSurveys = async () => {
        try {
            const url = `admin/getallsurveys`
            const response = await axios.get(`${apiEndPoint}/${url}`);
            setSurveys(response?.data)
            console.log("Retrieved all surveys")
        } catch (error) {
            console.error("An error occurred when fetching surveys:", error)
        }
    }

    useEffect(() => {
        fetchAllSurveys();
    }, []);


    return (
        <div className="h-screen w-full">
            {surveyDeletePopUp && (<DeleteSurveyConfirmation isOpen={surveyDeletePopUp} onClose={toggleSurveyDeletePage}/> )}
            <div className="pl-4 pt-4">
                <h4 className="text-red font-bold">Active Surveys</h4>
            </div>
            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
            </div>
            <div className="pt-2 max-h-[350px] pb-2 space-y-2 overflow-y-auto">
            {surveys?.map(({ survey_id, survey_title, survey_category, store_id, region, start_date, expiry_date, isActive }) => (
                <div className="bg-white flex flex-col p-2 mx-2 rounded shadow-md">
                    <div key={survey_id} className="flex items-center justify-between">
                        <p onClick={() => handleSurveyClick("1")}  className="text-sm flex-1 text-center cursor-pointer text-red">{survey_id}</p>
                        <p className="text-sm flex-1 text-center">{survey_title}</p>
                        <p className="text-sm flex-1 text-center">{survey_category}</p>
                        <p className="text-sm flex-1 text-center">{store_id}</p>
                        <p className="text-sm flex-1 text-center">{region}</p>
                        <p className="text-sm flex-1 text-center">{start_date}</p>
                        <p className="text-sm flex-1 text-center">{expiry_date}</p>
                        <p className={`text-sm flex-1 text-center flex items-center justify-center space-x-2 ${isActive === 1 ? 'text-green' : 'text-red'}`}>
                            {isActive === 1 ? 'Active' : 'Inactive'}
                        </p>
                        <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                            <button className="flex items-center justify-center cursor-pointer" >
                                <Edit color="gray" /> 
                            </button>
                            <button className="flex items-center justify-center cursor-pointer" onClick={ toggleSurveyDeletePage }>
                                <Trash2 color="red" /> 
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
};