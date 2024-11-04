"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

interface UnusedSpecials {
    store_id: string;
    store_name: string;
    date: string;
    total_specials_issued: number;
    total_unused_specials: number;
    total_redemptions: number;
    redemption_rate: {
        rewards: number;
        discounts: number;
    };
    popular_unused: string[];
    expiry_influence: number;
    customer_rating: number;
    total_unused_rewards?: number; // Adding the optional property
    total_unused_discounts?: number; // Adding the optional property
}


const unusedSpecialsData: UnusedSpecials[] = [
    { 
        store_id: 'SOO1', 
        store_name: 'PLUS DC Stellenbosch', 
        date: '2024-10-01', 
        total_specials_issued: 15000,
        total_unused_specials: 10000, 
        total_redemptions: 5000,
        redemption_rate: {
            rewards: 65,
            discounts: 35
        },
        popular_unused: ['10% Off Electronics', '3-for-2 Groceries'],
        expiry_influence: 75,
        customer_rating: 4.2
    },
    { 
        store_id: 'SOO2', 
        store_name: 'PLUS DC Albertin', 
        date: '2024-09-15', 
        total_specials_issued: 12000,
        total_unused_specials: 8000, 
        total_redemptions: 4000,
        redemption_rate: {
            rewards: 55,
            discounts: 45
        },
        popular_unused: ['Buy 1 Get 1 Free', '15% Off Fresh Produce'],
        expiry_influence: 60,
        customer_rating: 3.8
    },
    { 
        store_id: 'SOO3', 
        store_name: 'PLUS DC Bellville', 
        date: '2024-08-01', 
        total_specials_issued: 10000,
        total_unused_specials: 12000, 
        total_redemptions: 4000,
        redemption_rate: {
            rewards: 50,
            discounts: 50
        },
        popular_unused: ['20% Off Clothing', 'Buy 2 Get 3 Snacks'],
        expiry_influence: 65,
        customer_rating: 4.0
    },
    { 
        store_id: 'SOO4', 
        store_name: 'PLUS DC Nelspruit', 
        date: '2024-07-10', 
        total_specials_issued: 8000,
        total_unused_specials: 9500, 
        total_redemptions: 3000,
        redemption_rate: {
            rewards: 40,
            discounts: 60
        },
        popular_unused: ['5% Off Home Goods', 'Free Sample Packs'],
        expiry_influence: 50,
        customer_rating: 3.9
    },
    { 
        store_id: 'SOO5', 
        store_name: 'PLUS DC Durbanville', 
        date: '2024-06-25', 
        total_specials_issued: 9000,
        total_unused_specials: 11000, 
        total_redemptions: 3500,
        redemption_rate: {
            rewards: 45,
            discounts: 55
        },
        popular_unused: ['Back-to-School Deals', '20% Off Essentials'],
        expiry_influence: 70,
        customer_rating: 4.1
    },
    { 
        store_id: 'SOO6', 
        store_name: 'PLUS DC Bloemfontein', 
        date: '2024-05-30', 
        total_specials_issued: 11000,
        total_unused_specials: 13000, 
        total_redemptions: 3000,
        redemption_rate: {
            rewards: 60,
            discounts: 40
        },
        popular_unused: ['Bundle Discounts', 'Discounted Fresh Goods'],
        expiry_influence: 55,
        customer_rating: 4.0
    }
];



const stores = [
    { id: 1, store_id: 'SOO1', store: 'PLUS DC Stellenbosch' },
    { id: 2, store_id: 'SOO2', store: 'PLUS DC Albertin' },
    { id: 3, store_id: 'SOO3', store: 'PLUS DC Bellville' },
    { id: 4, store_id: 'SOO4', store: 'PLUS DC Nelspruit' }, 
    { id: 5, store_id: 'SOO5', store: 'PLUS DC Durbanville' },
    { id: 6, store_id: 'SOO6', store: 'PLUS DC Bloemfontein' }, 
    { id: 7, store_id: 'SOO7', store: 'PLUS DC Cape Town' },
    { id: 8, store_id: 'SOO8', store: 'PLUS DC Pietermaritzburg' }, 
    { id: 9, store_id: 'SOO9', store: 'PLUS DC East London' }, 
    { id: 10, store_id: 'SOO10', store: 'PLUS DC Pretoria' },
    { id: 11, store_id: 'SOO11', store: 'PLUS DC Germiston' },
    { id: 12, store_id: 'SOO12', store: 'PLUS DC Polokwane' },
];


export const UnsusedLoyaltyReport = () => {
    const headers = ["Store ID", "Store Name", "Date", "Total Specials Issued", "Unused Specials Count", "Total Redemptions", "Redemption Rate per Offer Type", "Popular Unused Specials", "Expiry Influence", "Customer Feedback Rating"]

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [filteredData, setFilteredData] = useState<UnusedSpecials[]>([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [isError, setIsError] = useState(false); 

    const handleFilter = () => {
        setIsLoading(true);
        let filtered = unusedSpecialsData;  // Start with full data set
        
        // Filter by selected date range (startDate and endDate)
        if (startDate && endDate) {
            filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }

        // Filter by selected store if not "All"
        if (selectedStore !== 'All') {
            filtered = filtered.filter(item => item.store_id === selectedStore);
        }

        setFilteredData(filtered);  // Set filtered data to state

        // Handle case when no data matches the filters
        if (filtered.length === 0) {
            setIsError(true);
            toast.error('No data found for the selected filters!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        } else {
            setIsError(false);
        }

        setIsLoading(false);  // Disable loader after filtering
    };


    if (isLoading) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                End Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <Label htmlFor="username" className="text-left">
                        Store:
                    </Label>
                    <Select onValueChange={(value) => setSelectedStore(value)}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Select a store" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Store</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {stores.map(({ id, store_id, store }) => (
                                    <SelectItem key={id} value={store_id}>{store_id}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-red hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

                <div className="pt-20 flex flex-col items-center justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        );
    }


    if (isError) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                End Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <Label htmlFor="username" className="text-left">
                        Store:
                    </Label>
                    <Select onValueChange={(value) => setSelectedStore(value)}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Select a store" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Store</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {stores.map(({ id, store_id, store }) => (
                                    <SelectItem key={id} value={store_id}>{store_id}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-red hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

                <div className="flex flex-col items-center justify-center pt-20">
                    <AlertTriangle size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">There is no data available for the selected month!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-y-auto pl-2 pt-4">
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                End Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-6">
                    <Label htmlFor="username" className="text-left">
                        Store:
                    </Label>
                    <Select onValueChange={(value) => setSelectedStore(value)}>
                        <SelectTrigger className="w-[200px] bg-white">
                            <SelectValue placeholder="Select a store" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Store</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {stores.map(({ id, store_id, store }) => (
                                    <SelectItem key={id} value={store_id}>{store_id}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-red hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

            <div className="pt-2 max-h-screen pb-2 space-y-2">
                {filteredData.map(({ 
                    store_id, 
                    store_name, 
                    date, 
                    total_specials_issued,
                    total_unused_specials, 
                    total_redemptions,
                    redemption_rate,
                    popular_unused,
                    expiry_influence,
                    customer_rating 
                }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center">{total_specials_issued}</p>
                            <p className="text-sm flex-1 text-center">{total_unused_specials}</p>
                            <p className="text-sm flex-1 text-center">{total_redemptions}</p>
                            <p className="text-sm flex-1 text-center">R: {redemption_rate.rewards}% D: {redemption_rate.discounts}%</p>
                            <p className="text-sm flex-1 text-center">{popular_unused.join(', ')}</p>
                            <p className="text-sm flex-1 text-center">{expiry_influence}%</p>
                            <p className="text-sm flex-1 text-center">{customer_rating}/5</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};