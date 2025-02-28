"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { X, Filter, ShieldAlert, XOctagon } from "lucide-react";
import SquareCircleLoader from "@/lib/square-circle-loader"
import axios from "axios";
import { StoresResponse } from '@/modules/types/data-types';

interface RedemptionFrequency {
    store_id: string;
    store_name: string;
    region: string;
    date: string;
    total_redemptions: number;
    total_active_members: number;
    average_redemptions_per_member: number;
    member_retention_rate: number;
    top_redeemed_items: string[];
    redemption_type_breakdown: {
        percentage: number;
        amount: number;
        freeItem: number;
    };
    incentive_effectiveness: number;
}


const redemptionFrequencyData: RedemptionFrequency[] = [
    { 
        store_id: 'SOO1', 
        store_name: 'PLUS DC Stellenbosch', 
        region: 'Western Cape', 
        date: '2024-09-10', 
        total_redemptions: 200, 
        total_active_members: 1500, 
        average_redemptions_per_member: 0.13,
        member_retention_rate: 85,
        top_redeemed_items: ['Coffee', 'Bread', 'Milk'],
        redemption_type_breakdown: {
            percentage: 45,
            amount: 35,
            freeItem: 20
        },
        incentive_effectiveness: 78
    },
    { store_id: 'SOO2', store_name: 'PLUS DC Albertin', region: 'Gauteng', date: '2024-08-20', total_redemptions: 150, total_active_members: 1200, average_redemptions_per_member: 0.125, member_retention_rate: 80, top_redeemed_items: ['Bread', 'Milk'], redemption_type_breakdown: { percentage: 30, amount: 25, freeItem: 15 }, incentive_effectiveness: 75 },
    { store_id: 'SOO3', store_name: 'PLUS DC Bellville', region: 'Western Cape', date: '2024-07-15', total_redemptions: 300, total_active_members: 1800, average_redemptions_per_member: 0.17, member_retention_rate: 82, top_redeemed_items: ['Coffee', 'Bread', 'Milk'], redemption_type_breakdown: { percentage: 50, amount: 40, freeItem: 20 }, incentive_effectiveness: 79 },
    { store_id: 'SOO4', store_name: 'PLUS DC Nelspruit', region: 'Mpumalanga', date: '2024-09-25', total_redemptions: 220, total_active_members: 1600, average_redemptions_per_member: 0.137, member_retention_rate: 83, top_redeemed_items: ['Bread', 'Milk'], redemption_type_breakdown: { percentage: 35, amount: 28, freeItem: 17 }, incentive_effectiveness: 77 },
    { store_id: 'SOO5', store_name: 'PLUS DC Durbanville', region: 'Western Cape', date: '2024-07-01', total_redemptions: 190, total_active_members: 1300, average_redemptions_per_member: 0.146, member_retention_rate: 84, top_redeemed_items: ['Coffee', 'Bread'], redemption_type_breakdown: { percentage: 38, amount: 30, freeItem: 12 }, incentive_effectiveness: 76 },
    { store_id: 'SOO6', store_name: 'PLUS DC Bloemfontein', region: 'Free State', date: '2024-06-10', total_redemptions: 175, total_active_members: 1400, average_redemptions_per_member: 0.125, member_retention_rate: 81, top_redeemed_items: ['Milk'], redemption_type_breakdown: { percentage: 25, amount: 20, freeItem: 10 }, incentive_effectiveness: 74 },
];


const storeRegions = [
    { id: 1, region: 'Eastern Cape'}, 
    { id: 2, region: 'Free State'}, 
    { id: 3, region: 'Gauteng'},
    { id: 4, region: 'KwaZulu-Natal'},
    { id: 5, region: 'Limpopo'}, 
    { id: 6, region: 'Mpumalanga'},
    { id: 7, region: 'Northern Cape'},
    { id: 8, region: 'North West'},
    { id: 9, region: 'Western Cape'}
];


export const RedemptionFrequencyReport = () => {
    const headers = ["Store ID", "Store Name", "Region", "Date", "Total Redemptions", "Active Members", "Avg. Redemptions", "Member Retention Rate", "Top Redeemed Items", "Redemption Type"]

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [filteredData, setFilteredData] = useState<RedemptionFrequency[]>([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [isError, setIsError] = useState(false); 
    const [hasFiltered, setDataHasFiltered] = useState(false);

    const [allStores, setAllStores] = useState<StoresResponse>([]);

    const getStores = async () => {
        try {
            const url = `inventory/get-stores`
            const response = await axios.get<StoresResponse>(`${apiEndPoint}/${url}`)
            setAllStores(response.data)
        } catch (error) {
            console.error('Error RETURNING STORES:', error)
        }
    }

    const handleFilter = () => {
        setIsLoading(true);
        let filtered = redemptionFrequencyData;

        // Filter by date range
        if (startDate && endDate) {
            filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }

        // Filter by selected store
        if (selectedStore !== 'All') {
            filtered = filtered.filter(item => item.store_id === selectedStore);
        }

        // Filter by selected region
        if (selectedRegion !== 'All') { // New filtering logic
            filtered = filtered.filter(item => item.region === selectedRegion);
        }

        setFilteredData(filtered);
        setDataHasFiltered(true);

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

    useEffect(() => {
        getStores();
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                Start Date:
                            </label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'/>
                        </div>
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                End Date:
                            </label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'/>
                        </div>
                    </div>
                </div>
                <div className="w-[570px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left text-black pt-2">
                        Store ID:
                    </label>
                    <select
                        className="bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {allStores.map((branch) => (
                            <option key={branch.id} value={branch.code}>
                                {branch.code}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-purple hover:bg-indigo-300 text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-black font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
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
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                Start Date:
                            </label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'/>
                        </div>
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                End Date:
                            </label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'/>
                        </div>
                    </div>
                </div>
                <div className="w-[570px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left text-black pt-2">
                        Store ID:
                    </label>
                    <select
                        className="bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {allStores.map((branch) => (
                            <option key={branch.id} value={branch.code}>
                                {branch.code}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-purple hover:bg-indigo-300 text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-black font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

                <div className="flex flex-col items-center justify-center pt-20">
                    <XOctagon size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching report data!</p>
                </div>
            </div>
        );
    }


    if (hasFiltered && filteredData.length === 0) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
            <div className='flex gap-4'>
                <div className="pt-6">
                    <div className="flex gap-4">
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                Start Date:
                            </label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'/>
                        </div>
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                End Date:
                            </label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'/>
                        </div>
                    </div>
                </div>
                <div className="w-[570px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left text-black pt-2">
                        Store ID:
                    </label>
                    <select
                        className="bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {allStores.map((branch) => (
                            <option key={branch.id} value={branch.code}>
                                {branch.code}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-purple hover:bg-indigo-300 text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-black font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

                <div className="flex flex-col items-center justify-center pt-20">
                    <ShieldAlert size={44} />
                    <p className="ml-2 uppercase pt-2 text-green">There is no data available for the selected dates</p>
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
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                Start Date:
                            </label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'/>
                        </div>
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                End Date:
                            </label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'/>
                        </div>
                    </div>
                </div>
                <div className="w-[570px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left text-black pt-2">
                        Store ID:
                    </label>
                    <select
                        className="bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {allStores.map((branch) => (
                            <option key={branch.id} value={branch.code}>
                                {branch.code}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-end w-full pt-12">
                    <button className="bg-purple hover:bg-indigo-300 text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" onClick={handleFilter}>
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-black font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

            <div className="pt-2 max-h-screen pb-2 space-y-2">
                {filteredData.map(({ store_id, store_name, region, date, total_redemptions, total_active_members, average_redemptions_per_member, member_retention_rate, top_redeemed_items, redemption_type_breakdown, incentive_effectiveness }) => (
                    <div key={store_id} className="bg-white text-gray-500 flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center text">{region}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_redemptions}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_active_members}</p>
                            <p className="text-sm flex-1 text-center uppercase text-red">{average_redemptions_per_member}%</p>
                            <p className="text-sm flex-1 text-center uppercase text-green">{member_retention_rate}%</p>
                            <p className="text-sm flex-1 text-center uppercase">{top_redeemed_items.join(', ')}</p>
                            <p className="text-sm flex-1 text-center uppercase">
                                <span className="flex gap-2 justify-center">
                                    <span className="text-blue">{redemption_type_breakdown.percentage}</span>
                                    <span className="text-orange">{redemption_type_breakdown.amount}</span>
                                    <span className="text-green">{redemption_type_breakdown.freeItem}</span>
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};