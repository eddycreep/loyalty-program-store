"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"


const enrollmentRate = [
    { month: 'january', store_id: 'SOO11', store: 'PLUS DC Germiston', newMembers: 200 },
    { month: 'february', store_id: 'SOO11', store: 'PLUS DC Germiston', newMembers: 220 },  // Store ID SOO11 matches store name 'PLUS DC Germiston'
    { month: 'march', store_id: 'SOO2', store: 'PLUS DC Albertin', newMembers: 240 },
    { month: 'april', store_id: 'SOO10', store: 'PLUS DC Pretoria', newMembers: 260 },
    { month: 'may', store_id: 'SOO5', store: 'PLUS DC Durbanville', newMembers: 300 },
    { month: 'june', store_id: 'SOO2', store: 'PLUS DC Albertin', newMembers: 320 },  // Store ID SOO2 matches store name 'PLUS DC Albertin'
    { month: 'july', store_id: 'SOO3', store: 'PLUS DC Bellville', newMembers: 340 },
    { month: 'august', store_id: 'SOO7', store: 'PLUS DC Cape Town', newMembers: 360 },
    { month: 'september', store_id: 'SOO7', store: 'PLUS DC Cape Town', newMembers: 380 },  // Store ID SOO7 matches store name 'PLUS DC Cape Town'
    { month: 'october', store_id: 'SOO11', store: 'PLUS DC Germiston', newMembers: 400 },  // Store ID SOO11 matches store name 'PLUS DC Germiston'
    { month: 'november', store_id: 'SOO12', store: 'PLUS DC Polokwane', newMembers: 420 },
    { month: 'december', store_id: 'SOO1', store: 'PLUS DC Stellenbosch', newMembers: 440 },
];


const stores = [
    { id: 1, store_id: 'SOO1', store: 'PLUS DC Stellenbosch' },
    { id: 2, store_id: 'SOO2', store: 'PLUS DC Albertin' },
    { id: 3, store_id: 'SOO3', store: 'PLUS DC Bellville' },
    { id: 4, store_id: 'SOO4', store: 'PLUS DC Nelspruit' },  // Random place added
    { id: 5, store_id: 'SOO5', store: 'PLUS DC Durbanville' },
    { id: 6, store_id: 'SOO6', store: 'PLUS DC Bloemfontein' },  // Random place added
    { id: 7, store_id: 'SOO7', store: 'PLUS DC Cape Town' },
    { id: 8, store_id: 'SOO8', store: 'PLUS DC Pietermaritzburg' },  // Random place added
    { id: 9, store_id: 'SOO9', store: 'PLUS DC East London' },  // Random place added
    { id: 10, store_id: 'SOO10', store: 'PLUS DC Pretoria' },
    { id: 11, store_id: 'SOO11', store: 'PLUS DC Germiston' },
    { id: 12, store_id: 'SOO12', store: 'PLUS DC Polokwane' },
];



export const CostvsDiscountedRevenueReport = () => {
    const headers = ['Store ID', 'Store', 'Month', 'No. New Members'];

    const [selectedMonth, setSelectedMonth] = useState(''); // Initialize without filtering on mount
    const [selectedStore, setSelectedStore] = useState('')
    const [filteredData, setFilteredData] = useState<{ store_id: string, store: string, month: string, newMembers: number }[]>([]); // No data filtered initially
    const [isLoading, setIsLoading] = useState(false); // Loading state to control the loader
    const [isError, setIsError] = useState(false); // Error state to handle no data

    // Effect to filter data only after a month has been selected
    // Filter data based on selected month and store
    useEffect(() => {
        setIsLoading(true);

        let filtered = enrollmentRate;

        if (selectedMonth !== '' && selectedMonth !== 'All') {
            filtered = filtered.filter(item => item.month === selectedMonth);
        }

        if (selectedStore !== '' && selectedStore !== 'All') {
            filtered = filtered.filter(item => item.store_id === selectedStore);
        }

        setFilteredData(filtered);

        if (filtered.length === 0) {
            setIsError(true);
            toast.error('No data found for the selected filters!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        } else {
            setIsError(false);
        }

        setIsLoading(false);
    }, [selectedMonth, selectedStore]); // Runs when either month or store changes

    // Display loading screen if data is being fetched
    if (isLoading) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
                <div className="">
                    <h4 className="text-xl font-bold">Active Members</h4>
                    <p className="text-sm text-gray-500">Number of active members over time</p>
                </div>
                <div className='flex gap-4'>
            <div className="pt-6">
                <Select onValueChange={(value) => setSelectedMonth(value)}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Month</SelectLabel>
                            <SelectItem value="All">All</SelectItem>
                            {enrollmentRate.map(({ month }) => (
                                <SelectItem key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="pt-6">
                        <Select onValueChange={(value) => setSelectedStore(value)}>
                            <SelectTrigger className="w-[200px] bg-white">
                                <SelectValue placeholder="Select a store" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Store</SelectLabel>
                                    <SelectItem value="All">All</SelectItem>
                                    {stores.map(({ id, store_id, store }) => (
                                        <SelectItem key={id} value={store_id}>{store}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="pt-6">
                        <button className="bg-red hover:bg-black text-white w-20 h-8 rounded shadoww-lg flex items-center justify-center">
                            <Filter />
                        </button>
                    </div>
            </div>

                <div className="pt-20 flex flex-col items-center justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        );
    }

    // Show error message if there is no data for the selected month
    if (isError) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
                <div className="">
                    <h4 className="text-xl font-bold">Active Members</h4>
                    <p className="text-sm text-gray-500">Number of active members over time</p>
                </div>
                <div className='flex gap-4'>
            <div className="pt-6">
                <Select onValueChange={(value) => setSelectedMonth(value)}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Month</SelectLabel>
                            <SelectItem value="All">All</SelectItem>
                            {enrollmentRate.map(({ month }) => (
                                <SelectItem key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="pt-6">
                        <Select onValueChange={(value) => setSelectedStore(value)}>
                            <SelectTrigger className="w-[200px] bg-white">
                                <SelectValue placeholder="Select a store" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Store</SelectLabel>
                                    <SelectItem value="All">All</SelectItem>
                                    {stores.map(({ id, store_id, store }) => (
                                        <SelectItem key={id} value={store_id}>{store}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="pt-6">
                        <button className="bg-red hover:bg-black text-white w-20 h-8 rounded shadoww-lg flex items-center justify-center">
                            <Filter />
                        </button>
                    </div>
            </div>

                <div className="flex flex-col items-center justify-center pt-20">
                    <AlertTriangle size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">There is no data available for the selected month!</p>
                </div>
            </div>
        );
    }

    // Display filtered data when available
    


    return (
        <div className="h-screen overflow-y-auto pl-2 pt-4">
            <div className="">
                <h4 className="text-xl font-bold">Redemption Rate</h4>
                <p className="text-sm text-gray-500">Percentage of redeemed vs unredeemed discounts</p>
            </div>
            <div className='flex gap-4'>
            <div className="pt-6">
                <Select onValueChange={(value) => setSelectedMonth(value)}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Month</SelectLabel>
                            <SelectItem value="All">All</SelectItem>
                            {enrollmentRate.map(({ month }) => (
                                <SelectItem key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <div className="pt-6">
                        <Select onValueChange={(value) => setSelectedStore(value)}>
                            <SelectTrigger className="w-[200px] bg-white">
                                <SelectValue placeholder="Select a store" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Store</SelectLabel>
                                    <SelectItem value="All">All</SelectItem>
                                    {stores.map(({ id, store_id, store }) => (
                                        <SelectItem key={id} value={store_id}>{store}</SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="pt-6">
                        <button className="bg-red hover:bg-black text-white w-20 h-9 rounded shadoww-lg flex items-center justify-center">
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
                {filteredData.map((item, index) => (
                    <div key={index} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-red">{item.store_id}</p>
                            <p className="text-sm flex-1 text-center">{item.store}</p>
                            <p className="text-sm flex-1 text-center uppercase">{item.month}</p>
                            <p className="text-sm flex-1 text-center">{item.newMembers}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};