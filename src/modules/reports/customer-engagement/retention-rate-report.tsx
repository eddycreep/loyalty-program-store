"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

// Updated RetentionRate interface with the new property 'members_churned'
interface RetentionRate {
    store_id: string;            
    store_name: string;             
    date: string;                   
    total_members_at_start: number; 
    members_retained: number;      
    members_churned: number;        
    retention_rate: number;       
}

// Updated retentionRate array with additional data and 'members_churned' property
const retentionRate: RetentionRate[] = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        date: '2024-08-15',            
        total_members_at_start: 2000,
        members_retained: 1800,
        members_churned: 200,          
        retention_rate: 90,
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        date: '2024-08-16',            
        total_members_at_start: 1500,
        members_retained: 1200,
        members_churned: 300,          
        retention_rate: 80,
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        date: '2024-09-10',            
        total_members_at_start: 2200,
        members_retained: 2100,
        members_churned: 100,          
        retention_rate: 95.5,
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Nelspruit',
        date: '2024-09-15',            
        total_members_at_start: 1800,
        members_retained: 1600,
        members_churned: 200,          
        retention_rate: 88.9,
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durbanville',
        date: '2024-09-20',            
        total_members_at_start: 2400,
        members_retained: 2300,
        members_churned: 100,          
        retention_rate: 95.8,
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        date: '2024-09-25',            
        total_members_at_start: 1600,
        members_retained: 1400,
        members_churned: 200,          
        retention_rate: 87.5,
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Cape Town',
        date: '2024-09-28',            
        total_members_at_start: 3000,
        members_retained: 2850,
        members_churned: 150,          
        retention_rate: 95,
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Pietermaritzburg',
        date: '2024-10-01',            
        total_members_at_start: 2100,
        members_retained: 1900,
        members_churned: 200,          
        retention_rate: 90.5,
    },
    {
        store_id: 'SOO9',
        store_name: 'PLUS DC East London',
        date: '2024-10-05',            
        total_members_at_start: 1700,
        members_retained: 1500,
        members_churned: 200,          
        retention_rate: 88.2,
    },
    {
        store_id: 'SOO10',
        store_name: 'PLUS DC Pretoria',
        date: '2024-10-10',            
        total_members_at_start: 2500,
        members_retained: 2300,
        members_churned: 200,          
        retention_rate: 92,
    },
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

export const RetentionRateReport = () => {
    const headers = ['Store ID', 'Store Name', 'Date', 'Starting Members', 'Members Retained', 'Members Churned', 'Retention Rate (%)'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [filteredData, setFilteredData] = useState<RetentionRate[]>([]); // Explicitly typed state
    const [isLoading, setIsLoading] = useState(false); // Loading state to control the loader
    const [isError, setIsError] = useState(false); // Error state to handle no data

    
    const handleFilter = () => {
        setIsLoading(true);
    
        // Initially set the filtered data to the full retentionRate array
        let filtered = retentionRate;
    
        // Filter by date range if both startDate and endDate are selected
        if (startDate && endDate) {
        filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }
    
        // Filter by selected store if a specific store is selected
        if (selectedStore !== 'All') {
        filtered = filtered.filter(item => item.store_id === selectedStore);
        }
    
        setFilteredData(filtered);
    
        // Handle the case when no data matches the filters
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
    };

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
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Expiry Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-12">
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
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Start Date:
                            </Label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <Label htmlFor="username" className="text-left pt-4">
                                Expiry Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-12">
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

                <div className="flex flex-col items-center justify-center pt-20">
                    <AlertTriangle size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">There is no data available for the selected month!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen overflow-y-auto pl-2 pt-4">
            <div className="">
                <h4 className="text-xl font-bold">Retention vs Churn Rate</h4>
                <p className="text-sm text-gray-500">Percentage of customers retained vs. churned</p>
            </div>
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
                                Expiry Date:
                            </Label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="pt-12">
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
                {filteredData.map(({ store_id, store_name, date, total_members_at_start, members_retained, members_churned, retention_rate }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_members_at_start}</p>
                            <p className="text-sm flex-1 text-center">
                                {members_retained}
                            </p>
                            <p className="text-sm flex-1 text-center text-red">
                                {members_churned}
                            </p>
                            <p className={`text-sm flex-1 text-center ${retention_rate >= 50 ? 'text-green' : 'text-red'}`}>
                                {retention_rate}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};