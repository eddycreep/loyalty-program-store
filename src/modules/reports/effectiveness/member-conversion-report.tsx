"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

// Define the interface for RedemptionRate data
interface MemberConversion {
    store_id: string,
    store_name: string,
    date: string,
    total_non_members: number,
    new_members_joined: number,
    member_conversion_rate: number,
    total_store_visits: number,
    avg_spend_non_members: number,
    conversion_by_category: {
        grocery: number,
        electronics: number,
        clothing: number
    },
    new_member_demographics: {
        age_18_24: number,
        age_25_34: number,
        age_35_plus: number
    },
    non_member_repeat_visits: number
}


const memberConversionData: MemberConversion[] = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        date: '2024-09-15',
        total_non_members: 1000,
        new_members_joined: 50,
        member_conversion_rate: 5,
        total_store_visits: 1500,
        avg_spend_non_members: 250.50,
        conversion_by_category: {
            grocery: 45,
            electronics: 30,
            clothing: 25
        },
        new_member_demographics: {
            age_18_24: 30,
            age_25_34: 45,
            age_35_plus: 25
        },
        non_member_repeat_visits: 300
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        date: '2024-09-25',
        total_non_members: 800,
        new_members_joined: 40,
        member_conversion_rate: 5,
        total_store_visits: 1200,
        avg_spend_non_members: 200.00,
        conversion_by_category: {
            grocery: 35,
            electronics: 25,
            clothing: 20
        },
        new_member_demographics: {
            age_18_24: 25,
            age_25_34: 35,
            age_35_plus: 20
        },
        non_member_repeat_visits: 250
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        date: '2024-10-05',
        total_non_members: 1200,
        new_members_joined: 60,
        member_conversion_rate: 5,
        total_store_visits: 1800,
        avg_spend_non_members: 275.00,
        conversion_by_category: {
            grocery: 40,
            electronics: 30,
            clothing: 25
        },
        new_member_demographics: {
            age_18_24: 30,
            age_25_34: 40,
            age_35_plus: 25
        },
        non_member_repeat_visits: 350
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Nelspruit',
        date: '2024-08-20',
        total_non_members: 950,
        new_members_joined: 48,
        member_conversion_rate: 5.05,
        total_store_visits: 1400,
        avg_spend_non_members: 240.00,
        conversion_by_category: {
            grocery: 38,
            electronics: 28,
            clothing: 24
        },
        new_member_demographics: {
            age_18_24: 28,
            age_25_34: 38,
            age_35_plus: 24
        },
        non_member_repeat_visits: 280
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durbanville',
        date: '2024-07-30',
        total_non_members: 1100,
        new_members_joined: 52,
        member_conversion_rate: 4.73,
        total_store_visits: 1600,
        avg_spend_non_members: 260.00,
        conversion_by_category: {
            grocery: 37,
            electronics: 27,
            clothing: 23
        },
        new_member_demographics: {
            age_18_24: 27,
            age_25_34: 37,
            age_35_plus: 23
        },
        non_member_repeat_visits: 320
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        date: '2024-06-14',
        total_non_members: 890,
        new_members_joined: 45,
        member_conversion_rate: 5.06,
        total_store_visits: 1300,
        avg_spend_non_members: 230.00,
        conversion_by_category: {
            grocery: 36,
            electronics: 26,
            clothing: 21
        },
        new_member_demographics: {
            age_18_24: 26,
            age_25_34: 36,
            age_35_plus: 21
        },
        non_member_repeat_visits: 270
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Cape Town',
        date: '2024-05-22',
        total_non_members: 1300,
        new_members_joined: 65,
        member_conversion_rate: 5,
        total_store_visits: 1900,
        avg_spend_non_members: 280.00,
        conversion_by_category: {
            grocery: 40,
            electronics: 30,
            clothing: 25
        },
        new_member_demographics: {
            age_18_24: 30,
            age_25_34: 40,
            age_35_plus: 25
        },
        non_member_repeat_visits: 360
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Pietermaritzburg',
        date: '2024-04-10',
        total_non_members: 1040,
        new_members_joined: 54,
        member_conversion_rate: 5.19,
        total_store_visits: 1700,
        avg_spend_non_members: 260.00,
        conversion_by_category: {
            grocery: 39,
            electronics: 29,
            clothing: 24
        },
        new_member_demographics: {
            age_18_24: 29,
            age_25_34: 39,
            age_35_plus: 24
        },
        non_member_repeat_visits: 300
    },
    {
        store_id: 'SOO9',
        store_name: 'PLUS DC East London',
        date: '2024-03-28',
        total_non_members: 970,
        new_members_joined: 47,
        member_conversion_rate: 4.85,
        total_store_visits: 1500,
        avg_spend_non_members: 240.00,
        conversion_by_category: {
            grocery: 37,
            electronics: 27,
            clothing: 22
        },
        new_member_demographics: {
            age_18_24: 27,
            age_25_34: 37,
            age_35_plus: 22
        },
        non_member_repeat_visits: 290
    },
    {
        store_id: 'SOO10',
        store_name: 'PLUS DC Pretoria',
        date: '2024-02-17',
        total_non_members: 1020,
        new_members_joined: 51,
        member_conversion_rate: 5,
        total_store_visits: 1600,
        avg_spend_non_members: 250.00,
        conversion_by_category: {
            grocery: 38,
            electronics: 28,
            clothing: 23
        },
        new_member_demographics: {
            age_18_24: 28,
            age_25_34: 38,
            age_35_plus: 23
        },
        non_member_repeat_visits: 310
    },
    {
        store_id: 'SOO11',
        store_name: 'PLUS DC Germiston',
        date: '2024-01-05',
        total_non_members: 1140,
        new_members_joined: 58,
        member_conversion_rate: 5.09,
        total_store_visits: 1800,
        avg_spend_non_members: 270.00,
        conversion_by_category: {
            grocery: 40,
            electronics: 30,
            clothing: 25
        },
        new_member_demographics: {
            age_18_24: 30,
            age_25_34: 40,
            age_35_plus: 25
        },
        non_member_repeat_visits: 340
    },
    {
        store_id: 'SOO12',
        store_name: 'PLUS DC Polokwane',
        date: '2024-09-11',
        total_non_members: 980,
        new_members_joined: 49,
        member_conversion_rate: 5,
        total_store_visits: 1400,
        avg_spend_non_members: 230.00,
        conversion_by_category: {
            grocery: 36,
            electronics: 26,
            clothing: 21
        },
        new_member_demographics: {
            age_18_24: 26,
            age_25_34: 36,
            age_35_plus: 21
        },
        non_member_repeat_visits: 290
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


export const MemberConversionReport = () => {
    const headers = [ 'Store ID', 'Store Name', 'Date', 'Total Non-Members', 'New Members Joined', 'Member Conversion Rate (%)', 'Total Store Visits', 'Average Spend of Non-Members', 'Conversion Rate by Product Category', 'Customer Demographics of New Members', 'Non-Member Repeat Visits'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [filteredData, setFilteredData] = useState<MemberConversion[]>([]); // Explicitly typed state
    const [isLoading, setIsLoading] = useState(false); // Loading state to control the loader
    const [isError, setIsError] = useState(false); // Error state to handle no data

    // Filter function to handle filtering by date range and store
    const handleFilter = () => {
        setIsLoading(true);
        let filtered = memberConversionData;  // Start with full data set
        
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
            {/* <div className="">
                <h4 className="text-xl font-bold">Member Conversion Rate</h4>
                <p className="text-sm text-gray-500">Percentage of non-members joining the loyalty program</p>
            </div> */}
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
            {/* <div className="">
                <h4 className="text-xl font-bold">Member Conversion Rate</h4>
                <p className="text-sm text-gray-500">Percentage of non-members joining the loyalty program</p>
            </div> */}
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
            {/* <div className="">
                <h4 className="text-xl font-bold">Member Conversion Rate</h4>
                <p className="text-sm text-gray-500">Percentage of non-members joining the loyalty program</p>
            </div> */}
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
                {filteredData.map(({ store_id, store_name, date, total_non_members, new_members_joined, member_conversion_rate, 
                    total_store_visits, avg_spend_non_members, conversion_by_category, new_member_demographics, non_member_repeat_visits }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_non_members}</p>
                            <p className="text-sm flex-1 text-center">{new_members_joined}</p>
                            <p className={`text-sm flex-1 text-center ${member_conversion_rate >= 50 ? 'text-green' : 'text-red'}`}>
                                {member_conversion_rate}%
                            </p>
                            <p className="text-sm flex-1 text-center">{total_store_visits}</p>
                            <p className="text-sm flex-1 text-center">R{avg_spend_non_members}</p>
                            <p className="text-sm flex-1 text-center">{`G:${conversion_by_category.grocery}% E:${conversion_by_category.electronics}% C:${conversion_by_category.clothing}%`}</p>
                            <p className="text-sm flex-1 text-center">{`18-24:${new_member_demographics.age_18_24}% 25-34:${new_member_demographics.age_25_34}% 35+:${new_member_demographics.age_35_plus}%`}</p>
                            <p className="text-sm flex-1 text-center">{non_member_repeat_visits}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};