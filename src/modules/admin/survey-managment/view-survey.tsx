"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { useState, useEffect, createContext } from 'react';
import { toast } from "react-hot-toast";
import { Check, Edit, ShieldAlert, Trash2, XOctagon, XOctagonIcon } from "lucide-react";
import { ViewDetailedSurvey } from "./view-detailed-survey";
import { useRouter } from 'next/navigation';
import { DeleteSurveyConfirmation  } from '@/components/component/delete-survey-confirmation';
import SquareCircleLoader from "@/lib/square-circle-loader";
import { apiClient } from '@/utils/api-client';
import { Badge } from '@/components/ui/badge';
import { getAllSurveys } from '@/components/data/survey/get-all-surveys';
import { useSession } from '@/context';

interface SurveyProps {
    survey_id: number,
    survey_title: string,
    survey_category: string,
    store_id: string,
    region: string,
    loyalty_tier: string,
    start_date: string,
    expiry_date: string,
    isActive: boolean
}
type SurveyResponse = SurveyProps[]

export const SurveyContext = createContext<SurveyProps | null>(null);

type Params = {
    params: {
        survey_id: string
    }
}

export const ViewSurveys = () => {
    const { user } = useSession();
    const router = useRouter();

    const [surveyDeletePopUp, setSurveyDeletePopUp] = useState(false);
    const [surveys, setSurveys] = useState<SurveyResponse>([]);

    const [selectedSurveyID, setSelectedSurveyID] = useState(0);
    const [loadingData, setLoadingData] = useState(false);
    const [isError, setIsError] = useState(false);

    const headers = ['Survey ID', 'Survey Name', 'Category', 'Store', 'Region', 'Loyalty Tier', 'Start Date', 'Expiry Date', 'Status', 'Action']

    const handleSurveyClick = (survey_id: number) => {
        router.push(`/surveys/view-detailed-survey/${survey_id}`);
    };

    const handleEditSurvey = (survey_id: number) => {
        router.push(`/surveys/edit-survey/${survey_id}`);
    };

    const toggleSurveyDeletePage = (surveyID: number) => {
        setSurveyDeletePopUp(!surveyDeletePopUp);
        setSelectedSurveyID(surveyID)
    };

    const fetchAllSurveys = async () => {
        setLoadingData(true);

        try {
            const surveysData = await getAllSurveys(user)
            setSurveys(surveysData)
            setLoadingData(false);
            console.log("surveys data returned my gee: ", surveysData)
            
        } catch (error) {
            console.error("An error occurred when fetching surveys:", error)
            setIsError(true);
        }
    }

    useEffect(() => {
        fetchAllSurveys();
    
        const loggedTicketsInterval = setInterval(() => {
            fetchAllSurveys();
        }, 60000);
    
        return () => clearInterval(loggedTicketsInterval);
    },[]);


    if (loadingData) {
        return (
            <div className="h-screen w-full">
                <div className="pl-4 pt-4">
                    <h4 className="text-xl font-semibold text-purple">Surveys</h4>
                </div>
                <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
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
                    <h4 className="text-xl font-semibold text-purple">Surveys</h4>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <XOctagon size={44} className="text-black" />
                    <p className="ml-2 uppercase pt-2 text-red">An error occoured when fetching surveys!</p>
                </div>
            </div>
        )
    }


    if (surveys.length === 0) {
        return (
            <div className="h-screen w-full">
                <div className="pl-4 pt-4">
                    <h4 className="text-xl font-semibold text-purple">Surveys</h4>
                </div>
                <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                    {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
                </div>
                <div className="flex flex-col items-center justify-center pt-10">
                    <ShieldAlert size={44} className="text-black" />
                    <p className="ml-2 uppercase pt-2 text-green">No surveys have been set for customers. Create new surveys to engage them and gather valuable feedback!</p>
                </div>
            </div>
        )
    }


    return (
        <div className="h-screen w-full pb-2">
            {surveyDeletePopUp && (<DeleteSurveyConfirmation surveyID={selectedSurveyID} isOpen={surveyDeletePopUp} onClose={toggleSurveyDeletePage}/> )}
            <div className="pt-10">
                <h4 className="text-xl font-semibold text-purple">View Surveys</h4>
            </div>
            <div className="bg-white text-gray-600 font-bold flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 rounded shadow-lg">
                {headers?.map((header, index) => (<p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
            </div>
            <div className="pt-2 max-h-screen pb-2 space-y-2 overflow-y-auto">
            {surveys?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
                <div key={survey_id} className="bg-white text-gray-600 flex flex-col p-2 rounded shadow-md cursor-pointer">
                    <div className="flex items-center justify-between">
                        <p onClick={() => handleSurveyClick(survey_id)}  className="text-sm flex-1 text-center text-purple">{survey_id}</p>
                        <p className="text-sm flex-1 text-center">{survey_title || '--:--'}</p>
                        <p className="text-sm flex-1 text-center">{survey_category || '--:--'}</p>
                        <p className="text-sm flex-1 text-center">{store_id || '--:--'}</p>
                        <p className="text-sm flex-1 text-center">{region || '--:--'}</p>
                        <p className={`text-sm flex-1 text-center ${
                                loyalty_tier === 'Starter Savers'
                                ? 'text-blue'
                                : loyalty_tier === 'Smart Shoppers'
                                ? 'text-green'
                                : loyalty_tier === 'Premier Collectors'
                                ? 'text-purple'
                                : ''
                            }`}
                            >
                            {loyalty_tier || '--:--'}
                        </p>
                        <p className="text-sm flex-1 text-center">{start_date ? start_date.split(" ")[0] : '--:--'}</p>
                        <p className="text-sm flex-1 text-center">{expiry_date ? expiry_date.split(" ")[0] : '--:--'}</p>
                        <Badge className={`text-sm flex-1 text-center flex items-center justify-center sBadgeace-x-2 ${isActive === true ? 'text-green' : 'text-red'}`}>
                            {isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <div className="flex items-center justify-center text-sm flex-1 text-center gap-4">
                            <button onClick={() => handleEditSurvey(survey_id)} className="flex items-center justify-center cursor-pointer bg-white text-gray-500 border border-gray-500 hover:bg-gray-200 p-1 rounded-lg" >
                                <Edit size={21} /> 
                            </button>
                            <button onClick={() => toggleSurveyDeletePage(survey_id)} className="flex items-center justify-center cursor-pointer bg-white text-red border border-red hover:bg-rose-100 p-1 rounded-lg">
                                <Trash2 size={21} /> 
                            </button>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
};