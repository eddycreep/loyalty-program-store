"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { toast } from "react-hot-toast";
import { Edit, ShieldAlert, Trash2, XOctagon, XOctagonIcon } from "lucide-react";
import { ViewDetailedSurvey } from "./view-detailed-survey";
import { useRouter } from 'next/navigation';
import { DeleteSurveyConfirmation  } from '@/components/component/delete-survey-confirmation';
import SquareCircleLoader from "@/lib/square-circle-loader";

interface SurveyProps {
    survey_id: number,
    survey_title: string,
    survey_category: string,
    store_id: string,
    region: string,
    loyalty_tier: string,
    start_date: string,
    expiry_date: string,
    isActive: number
}
type SurveyResponse = SurveyProps[]

export const SurveyContext = createContext<SurveyProps | null>(null);

export const ViewSurveys = () => {
    const headers = ['Survey ID', 'Survey Name', 'Category', 'Store', 'Region', 'Loyalty Tier', 'Start Date', 'Expiry Date', 'Status', 'Action']
    const [surveyDeletePopUp, setSurveyDeletePopUp] = useState(false);
    const [surveys, setSurveys] = useState<SurveyResponse>([]);

    const [selectedSurveyID, setSelectedSurveyID] = useState(0);
    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    const router = useRouter();

    const handleSurveyClick = (surveyId: string) => {
        router.push(`/admin/survey-management/${surveyId}`);
    };

    const toggleSurveyDeletePage = (surveyID: number) => {
        setSurveyDeletePopUp(!surveyDeletePopUp);
        setSelectedSurveyID(surveyID)
    };

    const fetchAllSurveys = async () => {
        setLoadingData(true);

        try {
            const url = `admin/getallsurveys`
            const response = await axios.get(`${apiEndPoint}/${url}`);
            setSurveys(response?.data)
            setLoadingData(false);

        } catch (error) {
            console.error("An error occurred when fetching surveys:", error)
            setIsError(true);
        }
    }


    useEffect(() => {
        fetchAllSurveys();
    
        const loggedTicketsInterval = setInterval(() => {
            fetchAllSurveys();
        }, 60000); // 1 minutes
    
        return () => clearInterval(loggedTicketsInterval); // Clean up interval on unmount
    },[]);


    if (loadingData) {
        return (
            <div className="h-screen w-full">
                <div className="pl-4 pt-4">
                    <h4 className="text-red font-bold">Surveys</h4>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
                </div>
                <div className="pt-20 flex flex-col items-center justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        )
    }


    if (isError) {
        return (
            <div className="h-screen w-full">
                <div className="pl-4 pt-4">
                    <h4 className="text-red font-bold">Surveys</h4>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <XOctagon size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">An error occoured when fetching surveys!</p>
                </div>
            </div>
        )
    }


    if (surveys.length === 0) {
        return (
            <div className="h-screen w-full">
                <div className="pl-4 pt-4">
                    <h4 className="text-red font-bold">Surveys</h4>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <ShieldAlert size={44} />
                    <p className="ml-2 uppercase pt-2 text-green">No surveys have been set for customers. Create new surveys to engage them and gather valuable feedback!</p>
                </div>
            </div>
        )
    }


    return (
        <div className="h-screen w-full">
            {surveyDeletePopUp && (<DeleteSurveyConfirmation surveyID={selectedSurveyID} isOpen={surveyDeletePopUp} onClose={toggleSurveyDeletePage}/> )}
            <div className="pl-4 pt-4">
                <h4 className="text-red font-bold">Surveys</h4>
            </div>
            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
            </div>
            <div className="pt-2 max-h-[350px] pb-2 space-y-2 overflow-y-auto">
            {surveys?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
                <div key={survey_id} className="bg-white flex flex-col p-2 mx-2 rounded shadow-md">
                    <div className="flex items-center justify-between">
                        <p onClick={() => handleSurveyClick("1")}  className="text-sm flex-1 text-center cursor-pointer text-red">{survey_id}</p>
                        <p className="text-sm flex-1 text-center">{survey_title || '--:--'}</p>
                        <p className="text-sm flex-1 text-center">{survey_category || '--:--'}</p>
                        <p className="text-sm flex-1 text-center">{store_id || '--:--'}</p>
                        <p className="text-sm flex-1 text-center">{region || '--:--'}</p>
                        <p className={`text-sm flex-1 text-center ${
                                loyalty_tier === 'Gold'
                                ? 'text-amber-400'
                                : loyalty_tier === 'Diamond'
                                ? 'text-blue'
                                : loyalty_tier === 'Platinum'
                                ? 'text-gray-500'
                                : ''
                            }`}
                            >
                            {loyalty_tier || '--:--'}
                        </p>
                        <p className="text-sm flex-1 text-center">{start_date || '--:--'}</p>
                        <p className="text-sm flex-1 text-center">{expiry_date || '--:--'}</p>
                        <p className={`text-sm flex-1 text-center flex items-center justify-center space-x-2 ${isActive === 1 ? 'text-green' : 'text-red'}`}>
                            {isActive === 1 ? 'Active' : 'Inactive' || '--:--'}
                        </p>
                        <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                            <button className="flex items-center justify-center cursor-pointer" >
                                <Edit color="gray" /> 
                            </button>
                            <button className="flex items-center justify-center cursor-pointer" onClick={() => toggleSurveyDeletePage(survey_id)}>
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