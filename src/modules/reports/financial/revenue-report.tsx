"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { X, Filter, XOctagon, ShieldAlert } from "lucide-react";
import SquareCircleLoader from "@/lib/square-circle-loader";
import axios from "axios";
import { StoresResponse } from '@/modules/types/data-types';

interface RevenuePerMemberData {
    store_id: string;
    store_name: string;
    date: string;
    total_revenue: number;
    total_active_members: number;
    revenue_per_member: number;
    new_members: number;
    churned_members: number;
    revenue_new_members: number;
    revenue_returning_members: number;
    top_selling_categories: string[];
    avg_transaction_value: number;
}


const revenuePerMemberData: RevenuePerMemberData[] = [
    { 
        store_id: 'SOO1', 
        store_name: 'PLUS DC Stellenbosch', 
        date: '2024-10-01', 
        total_revenue: 30000, 
        total_active_members: 1500, 
        revenue_per_member: 20,
        new_members: 150,
        churned_members: 45,
        revenue_new_members: 2250,
        revenue_returning_members: 27750,
        top_selling_categories: ['Electronics', 'Groceries', 'Home'],
        avg_transaction_value: 85.50
    },
    { store_id: 'SOO2', store_name: 'PLUS DC Albertin', date: '2024-10-01', total_revenue: 25000, total_active_members: 1200, revenue_per_member: 20.83, new_members: 120, churned_members: 30, revenue_new_members: 12000, revenue_returning_members: 10000, top_selling_categories: ['Category1', 'Category3'], avg_transaction_value: 105 },
    { store_id: 'SOO3', store_name: 'PLUS DC Bellville', date: '2024-10-01', total_revenue: 40000, total_active_members: 1800, revenue_per_member: 22.22, new_members: 180, churned_members: 50, revenue_new_members: 18000, revenue_returning_members: 12000, top_selling_categories: ['Category2', 'Category4'], avg_transaction_value: 110 },
    { store_id: 'SOO4', store_name: 'PLUS DC Nelspruit', date: '2024-09-28', total_revenue: 35000, total_active_members: 1600, revenue_per_member: 21.88, new_members: 160, churned_members: 40, revenue_new_members: 16000, revenue_returning_members: 10000, top_selling_categories: ['Category1', 'Category3'], avg_transaction_value: 100 },
    { store_id: 'SOO5', store_name: 'PLUS DC Durbanville', date: '2024-09-30', total_revenue: 45000, total_active_members: 1700, revenue_per_member: 26.47, new_members: 170, churned_members: 50, revenue_new_members: 17000, revenue_returning_members: 12000, top_selling_categories: ['Category2', 'Category4'], avg_transaction_value: 115 },
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

export const RevenueReport = () => {
    const headers = ['Store ID', 'Store Name', 'Date', 'Total Revenue', 'Active Members', 'Revenue per Tier', 'New Members', 'Churned Members', 'Top-Selling Categories', 'Avg. Basket Value'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('All');
    const [selectedRegion, setSelectedRegion] = useState("");

    const [filteredData, setFilteredData] = useState<RevenuePerMemberData[]>([]);
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
        let filtered = revenuePerMemberData; 
        

        if (startDate && endDate) {
            filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }


        if (selectedStore !== 'All') {
            filtered = filtered.filter(item => item.store_id === selectedStore);
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
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                End Date:
                            </label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left pt-2 text-black">
                        Store ID:
                    </label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
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
                <div className="w-[300px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left pt-2 text-black">
                        Regions:
                    </label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="All">All</option>
                        {storeRegions.map((region) => (
                            <option key={region.id} value={region.region}>
                                {region.region}
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
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                End Date:
                            </label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left pt-2 text-black">
                        Store ID:
                    </label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
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
                <div className="w-[300px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left pt-2 text-black">
                        Regions:
                    </label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="All">All</option>
                        {storeRegions.map((region) => (
                            <option key={region.id} value={region.region}>
                                {region.region}
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
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left pt-4 text-black">
                                End Date:
                            </label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                        </div>
                    </div>
                </div>
                <div className="w-[300px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left pt-2 text-black">
                        Store ID:
                    </label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
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
                <div className="w-[300px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left pt-2 text-black">
                        Regions:
                    </label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="All">All</option>
                        {storeRegions.map((region) => (
                            <option key={region.id} value={region.region}>
                                {region.region}
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
                    <p className="ml-2 uppercase pt-2 text-green">There is no data available for the selected dates!</p>
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
                            <option key={branch.id} value={branch.description}>
                                {branch.description}
                            </option>
                        ))}
                    </select>
                </div>
                {/* <div className="w-[570px] flex flex-col pt-4">
                    <label htmlFor="storeid" className="text-left pt-2 text-black">
                        Regions:
                    </label>
                    <select
                        className="bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="All">All</option>
                        {allStores.map((branch) => (
                            <option key={branch.id} value={branch.address_4}>
                                {branch.address_4}
                            </option>
                        ))}
                    </select>
                </div> */}
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
                {filteredData.map(({ store_id, store_name, date, total_revenue, total_active_members, revenue_per_member, new_members, churned_members, revenue_new_members, revenue_returning_members, top_selling_categories,avg_transaction_value }) => (
                    <div key={store_id} className="bg-white text-gray-500 flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase text-purple">R{total_revenue}</p>
                            <p className="text-sm flex-1 text-center uppercase text-green">{total_active_members}</p>
                            <p className="text-sm flex-1 text-center uppercase">R{revenue_per_member}</p>
                            <p className="text-sm flex-1 text-center uppercase">{new_members}</p>
                            <p className="text-sm flex-1 text-center uppercase">{churned_members}</p>
                            {/* <p className="text-sm flex-1 text-center uppercase">R{revenue_new_members}</p>
                            <p className="text-sm flex-1 text-center uppercase">R{revenue_returning_members}</p> */}
                            <p className="text-sm flex-1 text-center uppercase">{top_selling_categories.join(', ')}</p>
                            <p className="text-sm flex-1 text-center uppercase">R{avg_transaction_value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};