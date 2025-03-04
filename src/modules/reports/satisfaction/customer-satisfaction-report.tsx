"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { X, AlertTriangle, Filter, XOctagon } from "lucide-react";
import SquareCircleLoader from "@/lib/square-circle-loader"
import axios from "axios";
import { StoresResponse } from '@/modules/types/data-types';

interface CustomerSatisfactionData {
    store_id: string;
    store_name: string;
    region: string;
    date: string;
    total_surveys_collected: number;
    total_positive_responses: number;
    csat_score: number;
    negative_responses: number;
    time_to_response: number; 
    customer_service_interactions: number;
    product_satisfaction_ratings: number; 
}

const customerSatisfactionData: CustomerSatisfactionData[] = [
    { store_id: 'SOO1', store_name: 'PLUS DC Stellenbosch', region: 'Western Cape', date: '2024-09-15', total_surveys_collected: 220, total_positive_responses: 200, csat_score: 91, negative_responses: 20, time_to_response: 15, customer_service_interactions: 30, product_satisfaction_ratings: 4 },
    { store_id: 'SOO2', store_name: 'PLUS DC Albertin', region: 'Gauteng', date: '2024-08-10', total_surveys_collected: 180, total_positive_responses: 150, csat_score: 83, negative_responses: 30, time_to_response: 20, customer_service_interactions: 25, product_satisfaction_ratings: 4 },
    { store_id: 'SOO3', store_name: 'PLUS DC Bellville', region: 'Western Cape', date: '2024-07-25', total_surveys_collected: 270, total_positive_responses: 245, csat_score: 91, negative_responses: 25, time_to_response: 18, customer_service_interactions: 40, product_satisfaction_ratings: 5 },
    { store_id: 'SOO4', store_name: 'PLUS DC Nelspruit', region: 'Mpumalanga', date: '2024-06-05', total_surveys_collected: 210, total_positive_responses: 190, csat_score: 90, negative_responses: 20, time_to_response: 17, customer_service_interactions: 35, product_satisfaction_ratings: 4 },
    { store_id: 'SOO5', store_name: 'PLUS DC Durbanville', region: 'Western Cape', date: '2024-05-18', total_surveys_collected: 160, total_positive_responses: 140, csat_score: 88, negative_responses: 20, time_to_response: 22, customer_service_interactions: 20, product_satisfaction_ratings: 4 },
    { store_id: 'SOO6', store_name: 'PLUS DC Bloemfontein', region: 'Free State', date: '2024-04-22', total_surveys_collected: 190, total_positive_responses: 170, csat_score: 89, negative_responses: 20, time_to_response: 19, customer_service_interactions: 27, product_satisfaction_ratings: 3 },
    { store_id: 'SOO7', store_name: 'PLUS DC Cape Town', region: 'Western Cape', date: '2024-03-15', total_surveys_collected: 300, total_positive_responses: 280, csat_score: 93, negative_responses: 20, time_to_response: 15, customer_service_interactions: 50, product_satisfaction_ratings: 5 },
    { store_id: 'SOO8', store_name: 'PLUS DC Pietermaritzburg', region: 'KwaZulu-Natal', date: '2024-02-28', total_surveys_collected: 220, total_positive_responses: 190, csat_score: 86, negative_responses: 30, time_to_response: 24, customer_service_interactions: 20, product_satisfaction_ratings: 3 },
    { store_id: 'SOO9', store_name: 'PLUS DC East London', region: 'Eastern Cape', date: '2024-01-09', total_surveys_collected: 250, total_positive_responses: 225, csat_score: 90, negative_responses: 25, time_to_response: 16, customer_service_interactions: 30, product_satisfaction_ratings: 4 },
    { store_id: 'SOO10', store_name: 'PLUS DC Pretoria', region: 'Gauteng', date: '2024-05-21', total_surveys_collected: 300, total_positive_responses: 260, csat_score: 87, negative_responses: 40, time_to_response: 20, customer_service_interactions: 30, product_satisfaction_ratings: 4 },
    { store_id: 'SOO11', store_name: 'PLUS DC Germiston', region: 'Gauteng', date: '2024-09-02', total_surveys_collected: 240, total_positive_responses: 220, csat_score: 92, negative_responses: 20, time_to_response: 15, customer_service_interactions: 28, product_satisfaction_ratings: 5 },
    { store_id: 'SOO12', store_name: 'PLUS DC Polokwane', region: 'Limpopo', date: '2024-06-11', total_surveys_collected: 230, total_positive_responses: 210, csat_score: 91, negative_responses: 20, time_to_response: 17, customer_service_interactions: 33, product_satisfaction_ratings: 5 },
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


export const CustomerSatisfactionReport = () => {
    const headers = ["Store ID", "Store Name", "Region", "Date", "Surveys Collected", "Positive Responses", "CSAT Score (%)", "Negative Responses", "Product Ratings", "Store Ratings", "Staff Ratings"];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [filteredData, setFilteredData] = useState<CustomerSatisfactionData[]>([]); // Explicitly typed state
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

    // Filter function to handle filtering by date range and store
    const handleFilter = () => {
        setIsLoading(true);
        let filtered = customerSatisfactionData;
    
        // Filter by date range
        if (startDate && endDate) {
          filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }
    
        // Filter by store
        if (selectedStore !== 'All') {
          filtered = filtered.filter(item => item.store_id === selectedStore);
        }
    
        // Filter by region
        if (selectedRegion !== 'All') {
          filtered = filtered.filter(item => item.region === selectedRegion);
        }
    
        setFilteredData(filtered);
        setIsLoading(false);
    
        if (filtered.length === 0) {
          setIsError(true);
          toast.error('No data found for the selected filters!', {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
          });
        } else {
          setIsError(false);
        }
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
                    <label htmlFor="storeid" className="text-left pt-4 pb-1 text-black">
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
                    <label htmlFor="storeid" className="text-left pt-4 pb-1 text-black">
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
                    <label htmlFor="storeid" className="text-left pt-4 pb-1 text-black">
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
                    <label htmlFor="storeid" className="text-left pt-4 pb-1 text-black">
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
                    <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching report data</p>
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
                    <label htmlFor="storeid" className="text-left pt-4 pb-1 text-black">
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
                    <label htmlFor="storeid" className="text-left pt-4 pb-1 text-black">
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
                    <label htmlFor="storeid" className="text-left pt-4 pb-1 text-black">
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
                    <label htmlFor="storeid" className="text-left pt-4 pb-1 text-black">
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
            <div className="pt-2 max-h-screen pb-2 space-y-2">
                {filteredData.map(({ store_id, store_name, region, date, total_surveys_collected, total_positive_responses, csat_score, negative_responses, time_to_response, customer_service_interactions, product_satisfaction_ratings }) => (
                    <div key={store_id} className="bg-white text-gray-500 flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center text">{region}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_surveys_collected}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_positive_responses}</p>
                            <p className="text-sm flex-1 text-center uppercase">{csat_score}%</p>
                            <p className="text-sm flex-1 text-center uppercase">{negative_responses}</p>
                            <p className="text-sm flex-1 text-center uppercase">{time_to_response}</p>
                            <p className="text-sm flex-1 text-center uppercase">{customer_service_interactions}</p>
                            <p className="text-sm flex-1 text-center uppercase">{product_satisfaction_ratings}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};