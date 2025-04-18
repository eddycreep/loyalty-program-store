"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndPoint } from '@/utils/colors'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, BadgeInfo, AlertTriangle, Users, ScrollText, Store, UserRound, Popcorn } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SquareCircleLoader from "@/lib/square-circle-loader"

interface SurveyProps {
    survey_id: number,
    survey_title: string,
    description: string,
    survey_category: string,
    store_id: string,
    region: string,
    reward: string,
    loyalty_tier: string,
    start_date: string,
    expiry_date: string,
    isActive: number
    insertedAt: string,
    updatedAt: string
}

interface SurveyResponse {
    message: string;
    results: SurveyProps[];
}

export const ActiveSurveyCards = () => {
    const [activeSurveys, setActiveSurveys] = useState<SurveyProps[]>([])

    const [activeSurveysLoading, setActiveSurveysLoading] = useState(false);
    const [activeSurveysErrors, setActiveSurveysErrors] = useState(false);


    const getActiveSurveys = async () => {
        setActiveSurveysLoading(true);

        try {
            const url = `survey/get-active-surveys`
            const response = await axios.get<SurveyResponse>(`${apiEndPoint}/${url}`);
            setActiveSurveys(response.data.results);
            console.log('Active Surveys: ', response.data);
    
        } catch (error) {
            console.log("An error occurred when fetching the Active Surveys");
            setActiveSurveysErrors(true);
        }
    
        setActiveSurveysLoading(false);
    }


    const getSurveyCategoryIcon = (survey_category: string) => {
        switch (survey_category) {
            case 'Products':
                return <Popcorn className="h-4 w-4 sm:h-5 sm:w-5 text-blue" />;
            case 'Staff':
                return <UserRound className="h-4 w-4 sm:h-5 sm:w-5 text-blue" />;
            case 'Store':
                return <Store className="h-4 w-4 sm:h-5 sm:w-5 text-blue" />;
            default:
                return <ScrollText className="h-4 w-4 sm:h-5 sm:w-5 text-blue" />;
        }
    };

    useEffect(() => {
        getActiveSurveys();

        // Set up an interval to fetch data every 5 minutes
        const interval = setInterval(() => {
            getActiveSurveys();
        }, 300000); // 300,000 ms = 5 minutes || 60000 = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (activeSurveysLoading) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <SquareCircleLoader />
                <p className="text-gray-600 text-sm uppercase">loading active surveys...</p>
            </div>
        )
    }


    if (activeSurveysErrors) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <AlertTriangle size={38} color="red"/>
                <p className="text-gray-600 text-sm uppercase">Oops! error when fetching Upcoming surveys, kindly refresh the page.</p>
            </div>
        )
    }


    if (activeSurveys.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <BadgeInfo size={38} className="text-emerald-500"/>
                <p className="text-gray-600 text-sm uppercase">No surveys available. please navigate to the Admin page to add new surveys.</p>
            </div>
        )
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activeSurveys?.map(({ survey_id, survey_title, description, survey_category, store_id, region, reward, loyalty_tier, start_date, expiry_date, isActive }) => (
            <Card key={survey_id} className="shadow-lg hover:shadow-xl w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <CardTitle className="text-base sm:text-lg">{survey_title}</CardTitle>
                            <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {getSurveyCategoryIcon(survey_category)} { /* render different icons based on special value */ }
                                </TooltipTrigger>
                                <TooltipContent>
                                <p>
                                    {survey_category === 'Products' && "Products Survey"}
                                    {survey_category === 'Staff' && "Staff Survey"}
                                    {survey_category === 'Store' && "Store Survey"}
                                </p>
                                </TooltipContent>
                            </Tooltip>
                            </TooltipProvider>
                        </div>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Active</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground space-x-1">
                        <span>{store_id || "'no-store'"} | {region || "'no-region'"} | {loyalty_tier || "'no-tier'"}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-base sm:text-lg text-black">{survey_category}</p>
                    <div className="flex flex-col pt-2">
                        <p className="text-xs sm:text-sm text-gray-400">Valid From:</p>
                        <p className="text-xs sm:text-sm text-gray-400">{start_date ? start_date.split(" ")[0] : '--:--'} - {expiry_date ? expiry_date.split(" ")[0] : '--:--'}</p>
                    </div>
                    <div className="mt-2 flex items-center">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-purple" />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <span className="text-xs sm:text-sm text-black font-semibold pl-2">0</span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Customer Redemptions</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </CardContent>
            </Card>
        ))}
        </div>
    )
}