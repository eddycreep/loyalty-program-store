"use client"

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { apiEndPoint } from '@/utils/colors'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, BadgeInfo, AlertTriangle, Users, ScrollText, Store, UserRound, Popcorn, Clock } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SquareCircleLoader from "@/lib/square-circle-loader"
import { apiClient } from '@/utils/api-client';
import { getUpcomingSurveys } from '@/components/data/survey/get-upcoming-surveys';
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
    isActive: number
    insertedAt: string,
    updatedAt: string
}

interface SurveyResponse {
    message: string;
    results: SurveyProps[];
}


export const UpcomingSurveyCards = () => {
    const { user } = useSession();
    const [upcomingSurveys, setUpcomingSurveys] = useState<SurveyProps[]>([]);

    const [upcomingSurveysLoading, setUpcomingSurveysLoading] = useState(false);
    const [upcomingSurveysErrors, setUpcomingSurveysErrors] = useState(false);


    const fetchUpcomingSurveys = useCallback(async () => {
        setUpcomingSurveysLoading(true);

        try {
            const upcomingSurveys = await getUpcomingSurveys(user)
            setUpcomingSurveys(upcomingSurveys || []);
            console.log('Upcoming Surveys: ', upcomingSurveys);
    
        } catch (error) {
            console.log("An error occurred when fetching the upcoming Surveys");
            setUpcomingSurveysErrors(true);
        }
    
            setUpcomingSurveysLoading(false);
    }, [user]);

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
        fetchUpcomingSurveys();

        // Set up an interval to fetch data every 5 minutes
        const interval = setInterval(() => {
            fetchUpcomingSurveys();
        }, 300000); // 300,000 ms = 5 minutes || 60000 = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, [fetchUpcomingSurveys]);

    if (upcomingSurveysLoading) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <SquareCircleLoader />
                <p className="text-gray-600 text-sm uppercase">loading upcoming Surveys...</p>
            </div>
        )
    }


    if (upcomingSurveysErrors) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <AlertTriangle size={38} color="red"/>
                <p className="text-gray-600 text-sm uppercase">Oops! error when fetching Upcoming surveys, kindly refresh the page.</p>
            </div>
        )
    }


    if (upcomingSurveys.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <BadgeInfo size={38} className="text-emerald-500"/>
                <p className="text-gray-600 text-sm uppercase">No surveys available. please navigate to the Admin page to add new surveys.</p>
            </div>
        )
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {upcomingSurveys?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
            <Card key={survey_id} className="shadow-lg hover:shadow-xl w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <CardTitle className="text-base sm:text-lg text-black">{survey_title}</CardTitle>
                            <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {getSurveyCategoryIcon(survey_category)} 
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
                                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-orange" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Upcoming</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground space-x-1">
                        <span>{store_id || "'no-store'"} | {region || "'no-region'"} | {loyalty_tier || "'no-tier'"}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col pt-2">
                        <p className="text-xs sm:text-sm text-gray-400">Valid From:</p>
                        <p className="text-xs sm:text-sm text-gray-400">{start_date} - {expiry_date}</p>
                    </div>
                    <div className="mt-2 flex items-center">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-purple" />
                        <span className="text-xs sm:text-sm text-black font-semibold pl-2">0</span>
                    </div>
                </CardContent>
            </Card>
        ))}
        </div>
    )
}