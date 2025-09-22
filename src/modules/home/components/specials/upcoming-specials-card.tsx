"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndPoint } from '@/utils/colors'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PercentDiamond, Coins, Coffee, BadgeCheck, Clock, BadgeInfo, AlertTriangle, Users } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SquareCircleLoader from "@/lib/square-circle-loader"
import { BlueLoader } from "@/lib/blueLoader"
import MultiColorLoader from "@/lib/loaders"
import ThreeDotsLoader from "@/lib/three-dots-loader"
import { apiClient } from '@/utils/api-client';

interface SpecialProps {
    uid: number,
    special_id: number, 
    special_name: string,
    special: string,
    special_type: string,
    store_id: string,
    start_date: string,
    expiry_date: string,
    special_value: string,
    isActive: number,
    insertedAt: string,
    updatedAt: string
}

type SpecialResponse = {
    message: string;
    results: SpecialProps[];
};

// SpecialCard component to display individual special information
export const UpcomingSpecialCards = () => {
    const [upcomingSpecials, setUpcomingSpecials] = useState<SpecialProps[]>([])

    const [upcomingSpecialsLoading, setUpcomingSpecialsLoading] = useState(false);
    const [upcomingSpecialsErrors, setUpcomingSpecialsErrors] = useState(false);


    const getUpcomingSpecials = async () => {
        setUpcomingSpecialsLoading(true);
        //http://localhost:4400/specials/get-all-upcoming-specials
    
        try {
            const url = `specials/get-all-upcoming-specials`
            // const response = await axios.get<SpecialResponse>(`${apiEndPoint}/${url}`);
            const response = await apiClient.get(url) // Note: no need for full URL since apiClient has baseURL

            setUpcomingSpecials(response?.data.results || []);
            console.log('Upcoming Specials: ', response.data);
    
        } catch (error) {
            console.log("An error occurred when fetching the upcoming specials");
            setUpcomingSpecialsErrors(true);
        }
    
            setUpcomingSpecialsLoading(false);
    }

    const getSpecialTypeIcon = (special_value: string) => {
        switch (special_value) {
            case 'Percentage':
                return <PercentDiamond className="h-4 w-4 sm:h-5 sm:w-5 text-blue" />;
            case 'Amount':
                return <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-blue" />;
            case 'Free':
                return <Coffee className="h-4 w-4 sm:h-5 sm:w-5 text-blue" />;
            default:
                return <BadgeInfo className="h-4 w-4 sm:h-5 sm:w-5 text-blue" />;
        }
    };

    useEffect(() => {
        getUpcomingSpecials();

        // Set up an interval to fetch data every 5 minutes
        const interval = setInterval(() => {
            getUpcomingSpecials();
        }, 300000); // 300,000 ms = 5 minutes || 60000 = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (upcomingSpecialsLoading) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <SquareCircleLoader />
                <p className="text-gray-600 text-sm uppercase">loading upcoming specials...</p>
            </div>
        )
    }


    if (upcomingSpecialsErrors) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <AlertTriangle size={38} color="red"/>
                <p className="text-gray-600 text-sm uppercase">Oops! error when fetching Upcoming Specials, kindly refresh the page.</p>
            </div>
        )
    }


    if (upcomingSpecials.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <BadgeInfo size={38} className="text-emerald-500"/>
                <p className="text-gray-600 text-sm uppercase">No specials available. please navigate to the Admin page to add new specials.</p>
            </div>
        )
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {upcomingSpecials?.map(({ special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive }) => (
            <Card key={special_id} className="shadow-lg hover:shadow-xl w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <CardTitle className="text-base sm:text-lg">{special_name}</CardTitle>
                            <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {getSpecialTypeIcon(special_value)} { /* render different icons based on special value */ }
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{special_value === 'Free' ? 'Free Item' : special_value}</p>
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
                    {/* <Badge variant="secondary" className="w-fit bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs sm:text-sm mt-2">
                        {special_type}
                    </Badge> */}
                    <div className="flex items-center text-xs sm:text-sm text-muted-foreground space-x-1">
                        <span>{special_type}</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="font-bold text-base sm:text-lg text-black">{special}</p>
                    <div className="flex flex-col pt-2">
                        <p className="text-xs sm:text-sm text-gray-400">Valid From:</p>
                        <p className="text-xs sm:text-sm text-gray-400">{start_date ? start_date.split(" ")[0] : '--:--'} - {expiry_date ? expiry_date.split(" ")[0] : '--:--'}</p>
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