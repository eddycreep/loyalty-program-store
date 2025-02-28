"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { X, Filter, XOctagon, ShieldAlert } from "lucide-react";
import SquareCircleLoader from "@/lib/square-circle-loader"
import axios from "axios";
import { StoresResponse } from '@/modules/types/data-types';

// Define the updated data interface
interface DiscountRevenueData {
    store_id: string;
    store_name: string;
    region: string;
    date: string;
    total_discounts_given: number;
    total_revenue_from_discounts: number;
    discount_rate: string;
    top_discount_products: string;
    tiers_usage_rate: { StarterSaver: number; SmartShopper: number; PremierCollector: number };
    net_revenue_after_discounts: number;
}

const discountRevenueData: DiscountRevenueData[] = [
    {
        store_id: "SOO1",
        store_name: "PLUS DC Stellenbosch",
        region: "Western Cape",
        date: "2024-10-01",
        total_discounts_given: 5000,
        total_revenue_from_discounts: 30000,
        discount_rate: "15%",
        top_discount_products: "Apples",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 25000,
    },
    {
        store_id: "SOO2",
        store_name: "PLUS DC Alberton",
        region: "Gauteng",
        date: "2024-10-01",
        total_discounts_given: 4000,
        total_revenue_from_discounts: 25000,
        discount_rate: "12%",
        top_discount_products: "Bananas",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 21000,
    },
    {
        store_id: "SOO3",
        store_name: "PLUS DC Bellville",
        region: "Western Cape",
        date: "2024-10-01",
        total_discounts_given: 6000,
        total_revenue_from_discounts: 40000,
        discount_rate: "18%",
        top_discount_products: "Oranges",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 34000,
    },
    {
        store_id: "SOO4",
        store_name: "PLUS DC Nelspruit",
        region: "Mpumalanga",
        date: "2024-09-28",
        total_discounts_given: 5500,
        total_revenue_from_discounts: 35000,
        discount_rate: "16%",
        top_discount_products: "Maynards",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 29500,
    },
    {
        store_id: "SOO5",
        store_name: "PLUS DC Durbanville",
        region: "Western Cape",
        date: "2024-09-30",
        total_discounts_given: 7000,
        total_revenue_from_discounts: 45000,
        discount_rate: "20%",
        top_discount_products: "Lays",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 38000,
    },
    {
        store_id: "SOO6",
        store_name: "PLUS DC Bloemfontein",
        region: "Free State",
        date: "2024-10-03",
        total_discounts_given: 3000,
        total_revenue_from_discounts: 18000,
        discount_rate: "10%",
        top_discount_products: "Coke",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 16000,
    },
    {
        store_id: "SOO7",
        store_name: "PLUS DC Cape Town",
        region: "Western Cape",
        date: "2024-10-02",
        total_discounts_given: 8000,
        total_revenue_from_discounts: 50000,
        discount_rate: "14%",
        top_discount_products: "Applie Pie",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 43000,
    },
    {
        store_id: "SOO8",
        store_name: "PLUS DC Pietermaritzburg",
        region: "KwaZulu-Natal",
        date: "2024-10-05",
        total_discounts_given: 4500,
        total_revenue_from_discounts: 30000,
        discount_rate: "15%",
        top_discount_products: "Doritos",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 25500,
    },
    {
        store_id: "SOO9",
        store_name: "PLUS DC East London",
        region: "Eastern Cape",
        date: "2024-09-29",
        total_discounts_given: 3500,
        total_revenue_from_discounts: 20000,
        discount_rate: "12%",
        top_discount_products: "School Books",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 17500,
    },
    {
        store_id: "SOO10",
        store_name: "PLUS DC Pretoria",
        region: "Gauteng",
        date: "2024-10-04",
        total_discounts_given: 9000,
        total_revenue_from_discounts: 60000,
        discount_rate: "15%",
        top_discount_products: "Watermelon",
        tiers_usage_rate: { StarterSaver: 40, SmartShopper: 60, PremierCollector: 80 },
        net_revenue_after_discounts: 51000,
    },
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

export const DiscountedRevenueReport = () => {
    const headers = ['Store ID', 'Store Name', 'Region', 'Date', 'discounts given', 'discounts revenue', 'Discount Rate', 'Top Discount Products',  'Tiers Usage Rate', 'Profit After Discounts'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState("");

    const [filteredData, setFilteredData] = useState<DiscountRevenueData[]>([]); 
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
        let filtered = discountRevenueData;
    
        // Filter by date range
        if (startDate && endDate) {
          filtered = filtered.filter(
            (item) => item.date >= startDate && item.date <= endDate
          );
        }
    
        // Filter by region
        if (selectedRegion && selectedRegion !== "All") {
          filtered = filtered.filter((item) => item.region === selectedRegion);
        }
    
        setFilteredData(filtered);
    
        if (filtered.length === 0) {
          toast.error("No data found for the selected filters!", {
            icon: <X color={colors.red} size={24} />,
            duration: 3000,
          });
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
                    <p className="ml-2 uppercase pt-2 text-red">There is no data available for the selected dates!</p>
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
                    <div className="w-[570px] flex flex-col pt-4">
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
                {filteredData.map(({ store_id, store_name, region, date, total_discounts_given, total_revenue_from_discounts, discount_rate, top_discount_products, tiers_usage_rate, net_revenue_after_discounts }) => (
                    <div key={store_id} className="bg-white text-gray-500 flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{region}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center">{total_discounts_given}</p>
                            <p className="text-sm flex-1 text-center">{total_revenue_from_discounts}</p>
                            <p className="text-sm flex-1 text-center">{discount_rate}</p>
                            <p className="text-sm flex-1 text-center">{top_discount_products}</p>
                            <p className="text-sm flex-1 text-center">
                                <span className="text-blue">{tiers_usage_rate.StarterSaver}</span>{' '}
                                <span className="text-green">{tiers_usage_rate.SmartShopper}</span>{' '}
                                <span className="text-purple">{tiers_usage_rate.PremierCollector}</span>
                            </p>
                            <p className="text-sm flex-1 text-center">{net_revenue_after_discounts}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};