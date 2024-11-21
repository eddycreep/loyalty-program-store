"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndPoint } from '@/utils/colors'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BadgeCheck, BadgeInfo, AlertTriangle, Users, ScrollText, Store, UserRound, Popcorn, Clock } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SquareCircleLoader from "@/lib/square-circle-loader"

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


export const UpcomingSurveyCards = () => {
    const [upcomingSurveys, setUpcomingSurveys] = useState<SurveyResponse>([]);

    const [upcomingSurveysLoading, setUpcomingSurveysLoading] = useState(false);
    const [upcomingSurveysErrors, setUpcomingSurveysErrors] = useState(false);


    const getUpcomingSurveys = async () => {
        setUpcomingSurveysLoading(true);
    
        try {
            const url = `products/get-upcoming-surveys`
            const response = await axios.get<SurveyResponse>(`${apiEndPoint}/${url}`);
            setUpcomingSurveys(response?.data);
            console.log('Upcoming Surveys: ', response.data);
    
        } catch (error) {
            console.log("An error occurred when fetching the upcoming Surveys");
            setUpcomingSurveysErrors(true);
        }
    
            setUpcomingSurveysLoading(false);
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
        getUpcomingSurveys();

        // Set up an interval to fetch data every 5 minutes
        const interval = setInterval(() => {
            getUpcomingSurveys();
        }, 300000); // 300,000 ms = 5 minutes || 60000 = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (upcomingSurveysLoading) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <SquareCircleLoader />
                <p className="text-gray-600 text-sm uppercase">loading active Surveys...</p>
            </div>
        )
    }


    if (upcomingSurveysErrors) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <AlertTriangle size={38} color="red"/>
                <p className="text-gray-600 text-sm uppercase">Oops! Unfortunately an error was encountered when fetching Active Surveys, kindly refresh the page.</p>
            </div>
        )
    }


    if (upcomingSurveys.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <BadgeInfo size={38} className="text-emerald-500"/>
                <p className="text-gray-600 text-sm uppercase">No surveys are currently available. To add new surveys, please navigate to the Admin page.</p>
            </div>
        )
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {upcomingSurveys?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
            <Card key={survey_id} className="shadow-lg hover:shadow-xl w-[300px] sm:flex flex-col md:w-[350px] lg:w-[400px]">
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
                        <p className="text-xs sm:text-sm text-muted-foreground">Valid From:</p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{start_date} - {expiry_date}</p>
                    </div>
                    <div className="mt-2 flex items-center">
                        <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1 text-purple" />
                        <span className="text-xs sm:text-sm text-purple-600 font-semibold pl-2">0</span>
                    </div>
                </CardContent>
            </Card>
        ))}
        </div>
    )
}