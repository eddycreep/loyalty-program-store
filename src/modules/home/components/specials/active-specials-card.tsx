"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndPoint } from '@/utils/colors'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PercentDiamond, Coins, Coffee, BadgeCheck, BadgeInfo, AlertTriangle, Users } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import SquareCircleLoader from "@/lib/square-circle-loader"

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
    isActive: number
    insertedAt: string,
    updatedAt: string
}

type SpecialResponse = {
    message: string;
    results: SpecialProps[];
};


export const ActiveSpecialCards = () => {
    const [activeSpecials, setActiveSpecials] = useState<SpecialProps[]>([]);

    const [activeSpecialsLoading, setActiveSpecialsLoading] = useState(false);
    const [activeSpecialsErrors, setActiveSpecialsErrors] = useState(false);


    const getActiveSpecials = async () => {
        setActiveSpecialsLoading(true);
        //http://localhost:4400/specials/get-all-active-specials
    
        try {
            const url = `specials/get-all-active-specials`
            const response = await axios.get<SpecialResponse>(`${apiEndPoint}/${url}`);
            setActiveSpecials(response?.data.results || []);
            console.log('Active Specials: ', response.data);
    
        } catch (error) {
            console.log("An error occurred when fetching the active specials");
            setActiveSpecialsErrors(true);
        }
    
        setActiveSpecialsLoading(false);
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
        getActiveSpecials();

        // Set up an interval to fetch data every 5 minutes
        const interval = setInterval(() => {
            getActiveSpecials();
        }, 300000); // 300,000 ms = 5 minutes || 60000 = 1 minute

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    if (activeSpecialsLoading) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <SquareCircleLoader />
                <p className="text-gray-600 text-sm uppercase">loading active specials...</p>
            </div>
        )
    }


    if (activeSpecialsErrors) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <AlertTriangle size={38} color="red"/>
                <p className="text-gray-600 text-sm uppercase">Oops! error when fetching Upcoming Specials, kindly refresh the page.</p>
            </div>
        )
    }


    if (activeSpecials.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center gap-4">
                <BadgeInfo size={38} className="text-emerald-500"/>
                <p className="text-gray-600 text-sm uppercase">No specials available. please navigate to the Admin page to add new specials.</p>
            </div>
        )
    }



    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {activeSpecials?.map(({ special_id, special_name, special, special_type, store_id, start_date, expiry_date, special_value, isActive }) => (
            <Card key={special_id} className="w-full shadow-lg hover:shadow-xl">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                            <CardTitle className="text-base sm:text-lg font-bold">{special_name}</CardTitle>
                            <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    {getSpecialTypeIcon(special_value)}
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
                                    <BadgeCheck className="h-4 w-4 sm:h-5 sm:w-5 text-green" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Active</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    {/* <Badge variant="secondary" className="w-fit bg-gray-200 text-gray-800 hover:bg-gray-300 text-xs sm:text-sm mt-2">
                        {special_type}
                    </Badge> */}
                    <div className="flex items-center text-xs sm:text-sm space-x-1 text-gray-400">
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