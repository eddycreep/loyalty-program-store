"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

interface AverageSpendData {
    store_id: string;
    store_name: string;
    date: string;
    total_revenue: number;
    total_transactions: number;
    average_spend_per_transaction: number;
    basket_size: number;
    spend_per_customer_segment: number;
    dwell_time: number;
    promotion_impact: number;
}

const averageSpendData: AverageSpendData[] = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        date: '2024-10-01',
        total_revenue: 30000,
        total_transactions: 1500,
        average_spend_per_transaction: 20,
        basket_size: 5,
        spend_per_customer_segment: 35.76,
        dwell_time: 45,
        promotion_impact: 0.82,
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        date: '2024-10-01',
        total_revenue: 25000,
        total_transactions: 1200,
        average_spend_per_transaction: 20.83,
        basket_size: 7,
        spend_per_customer_segment: 47.32,
        dwell_time: 39,
        promotion_impact: 0.67,
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        date: '2024-10-01',
        total_revenue: 40000,
        total_transactions: 1800,
        average_spend_per_transaction: 22.22,
        basket_size: 6,
        spend_per_customer_segment: 40.15,
        dwell_time: 53,
        promotion_impact: 0.59,
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Pretoria',
        date: '2024-10-01',
        total_revenue: 18000,
        total_transactions: 900,
        average_spend_per_transaction: 20,
        basket_size: 8,
        spend_per_customer_segment: 42.90,
        dwell_time: 47,
        promotion_impact: 0.71,
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durban',
        date: '2024-10-01',
        total_revenue: 22000,
        total_transactions: 1100,
        average_spend_per_transaction: 20,
        basket_size: 4,
        spend_per_customer_segment: 31.42,
        dwell_time: 36,
        promotion_impact: 0.84,
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Cape Town',
        date: '2024-10-01',
        total_revenue: 35000,
        total_transactions: 1750,
        average_spend_per_transaction: 20,
        basket_size: 9,
        spend_per_customer_segment: 54.23,
        dwell_time: 50,
        promotion_impact: 0.63,
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Johannesburg',
        date: '2024-10-01',
        total_revenue: 27000,
        total_transactions: 1350,
        average_spend_per_transaction: 20,
        basket_size: 3,
        spend_per_customer_segment: 37.89,
        dwell_time: 43,
        promotion_impact: 0.77,
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Bloemfontein',
        date: '2024-10-01',
        total_revenue: 29000,
        total_transactions: 1450,
        average_spend_per_transaction: 20,
        basket_size: 5,
        spend_per_customer_segment: 29.99,
        dwell_time: 48,
        promotion_impact: 0.69,
    },
    {
        store_id: 'SOO9',
        store_name: 'PLUS DC East London',
        date: '2024-10-01',
        total_revenue: 24000,
        total_transactions: 1200,
        average_spend_per_transaction: 20,
        basket_size: 4,
        spend_per_customer_segment: 33.87,
        dwell_time: 42,
        promotion_impact: 0.74,
    },
    {
        store_id: 'SO10',
        store_name: 'PLUS DC Port Elizabeth',
        date: '2024-10-01',
        total_revenue: 32000,
        total_transactions: 1600,
        average_spend_per_transaction: 20,
        basket_size: 6,
        spend_per_customer_segment: 45.62,
        dwell_time: 46,
        promotion_impact: 0.68,
    },
    {
        store_id: 'SO11',
        store_name: 'PLUS DC George',
        date: '2024-10-01',
        total_revenue: 21000,
        total_transactions: 1050,
        average_spend_per_transaction: 20,
        basket_size: 7,
        spend_per_customer_segment: 39.45,
        dwell_time: 40,
        promotion_impact: 0.79,
    },
    {
        store_id: 'SO12',
        store_name: 'PLUS DC Nelspruit',
        date: '2024-10-01',
        total_revenue: 26000,
        total_transactions: 1300,
        average_spend_per_transaction: 20,
        basket_size: 5,
        spend_per_customer_segment: 36.21,
        dwell_time: 44,
        promotion_impact: 0.72,
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


export const AvgSpendPerTransactionReport = () => {
    const headers = ["Store ID", "Store Name", "Date", "Total Revenue",  "Total Transactions",  "Avg. Spend per Transaction", "Basket Size",  "Spend per Customer Segment", "Time in Store (Dwell Time)", "Promotion Impact"];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [filteredData, setFilteredData] = useState<AverageSpendData[]>([]); // Explicitly typed state
    const [isLoading, setIsLoading] = useState(false); // Loading state to control the loader
    const [isError, setIsError] = useState(false); // Error state to handle no data

    // Filter function to handle filtering by date range and store
    const handleFilter = () => {
        setIsLoading(true);
        let filtered = averageSpendData;  // Start with full data set
        
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

    // Display loading screen if data is being fetched
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

    // Show error message if there is no data for the selected month
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
                {filteredData.map(({ store_id, store_name, date, total_revenue, total_transactions, average_spend_per_transaction, basket_size, spend_per_customer_segment, dwell_time, promotion_impact }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_revenue}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_transactions}</p>
                            <p className="text-sm flex-1 text-center uppercase">{average_spend_per_transaction}%</p>
                            <p className="text-sm flex-1 text-center uppercase">{basket_size}</p>
                            <p className="text-sm flex-1 text-center uppercase">{spend_per_customer_segment}</p>
                            <p className="text-sm flex-1 text-center uppercase">{dwell_time}</p>
                            <p className="text-sm flex-1 text-center uppercase">{promotion_impact}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};