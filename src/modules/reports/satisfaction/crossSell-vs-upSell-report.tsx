"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { X, Filter, XOctagon, ShieldAlert } from "lucide-react";
import SquareCircleLoader from "@/lib/square-circle-loader"
import axios from "axios";
import { StoresResponse } from '@/modules/types/data-types';

interface CrossSellUpsellData {
    store_id: string;
    store_name: string;
    date: string;
    total_transactions_with_cross_sell: number;
    total_transactions: number;
    cross_sell_upsell_rate: number;
    top_cross_sold_items: string;
    conversion_rate_of_cross_sell_offers: number;
    customer_segment_impact: string;
    zone_engagement: string;
}


const crossSellUpsellData: CrossSellUpsellData[] = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        date: '2024-10-01',
        total_transactions_with_cross_sell: 200,
        total_transactions: 1500,
        cross_sell_upsell_rate: 13.33,
        top_cross_sold_items: 'Chips, Soda, Chocolate Bar',
        conversion_rate_of_cross_sell_offers: 8.2,
        customer_segment_impact: 'Youth',
        zone_engagement: 'Zone 1: 5 mins, Zone 2: 3 mins',
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        date: '2024-10-01',
        total_transactions_with_cross_sell: 150,
        total_transactions: 1200,
        cross_sell_upsell_rate: 12.5,
        top_cross_sold_items: 'Energy Drink, Protein Bar',
        conversion_rate_of_cross_sell_offers: 7.5,
        customer_segment_impact: 'Families',
        zone_engagement: 'Zone 1: 6 mins, Zone 2: 4 mins',
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        date: '2024-10-01',
        total_transactions_with_cross_sell: 300,
        total_transactions: 1800,
        cross_sell_upsell_rate: 16.67,
        top_cross_sold_items: 'Cookies, Fresh Juice, Granola Bar',
        conversion_rate_of_cross_sell_offers: 9.0,
        customer_segment_impact: 'Adults',
        zone_engagement: 'Zone 1: 4 mins, Zone 2: 5 mins',
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Nelspruit',
        date: '2024-10-05',
        total_transactions_with_cross_sell: 180,
        total_transactions: 1400,
        cross_sell_upsell_rate: 12.86,
        top_cross_sold_items: 'Bottled Water, Sandwich',
        conversion_rate_of_cross_sell_offers: 6.8,
        customer_segment_impact: 'Seniors',
        zone_engagement: 'Zone 1: 7 mins, Zone 2: 2 mins',
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durbanville',
        date: '2024-10-07',
        total_transactions_with_cross_sell: 250,
        total_transactions: 1600,
        cross_sell_upsell_rate: 15.63,
        top_cross_sold_items: 'Fruit Cup, Yoghurt',
        conversion_rate_of_cross_sell_offers: 8.7,
        customer_segment_impact: 'Teens',
        zone_engagement: 'Zone 1: 6 mins, Zone 2: 4 mins',
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        date: '2024-10-10',
        total_transactions_with_cross_sell: 350,
        total_transactions: 2250,
        cross_sell_upsell_rate: 15.56,
        top_cross_sold_items: 'Trail Mix, Muffin',
        conversion_rate_of_cross_sell_offers: 7.9,
        customer_segment_impact: 'Professionals',
        zone_engagement: 'Zone 1: 3 mins, Zone 2: 6 mins',
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Cape Town',
        date: '2024-10-12',
        total_transactions_with_cross_sell: 400,
        total_transactions: 3000,
        cross_sell_upsell_rate: 13.33,
        top_cross_sold_items: 'Pretzels, Smoothie, Popcorn',
        conversion_rate_of_cross_sell_offers: 10.0,
        customer_segment_impact: 'Young Adults',
        zone_engagement: 'Zone 1: 5 mins, Zone 2: 5 mins',
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Pietermaritzburg',
        date: '2024-10-14',
        total_transactions_with_cross_sell: 170,
        total_transactions: 1350,
        cross_sell_upsell_rate: 12.59,
        top_cross_sold_items: 'Baguette, Cheese Slice',
        conversion_rate_of_cross_sell_offers: 6.2,
        customer_segment_impact: 'Retirees',
        zone_engagement: 'Zone 1: 4 mins, Zone 2: 3 mins',
    },
    {
        store_id: 'SOO9',
        store_name: 'PLUS DC East London',
        date: '2024-10-15',
        total_transactions_with_cross_sell: 220,
        total_transactions: 1800,
        cross_sell_upsell_rate: 12.22,
        top_cross_sold_items: 'Nuts, Salad Bowl',
        conversion_rate_of_cross_sell_offers: 9.3,
        customer_segment_impact: 'Families',
        zone_engagement: 'Zone 1: 5 mins, Zone 2: 4 mins',
    },
    {
        store_id: 'SOO10',
        store_name: 'PLUS DC Pretoria',
        date: '2024-10-18',
        total_transactions_with_cross_sell: 280,
        total_transactions: 2450,
        cross_sell_upsell_rate: 11.43,
        top_cross_sold_items: 'Apple, Orange Juice',
        conversion_rate_of_cross_sell_offers: 8.4,
        customer_segment_impact: 'Professionals',
        zone_engagement: 'Zone 1: 7 mins, Zone 2: 3 mins',
    },
    {
        store_id: 'SOO11',
        store_name: 'PLUS DC Germiston',
        date: '2024-10-20',
        total_transactions_with_cross_sell: 200,
        total_transactions: 1550,
        cross_sell_upsell_rate: 12.9,
        top_cross_sold_items: 'Yoghurt Drink, Donut',
        conversion_rate_of_cross_sell_offers: 7.2,
        customer_segment_impact: 'Youth',
        zone_engagement: 'Zone 1: 4 mins, Zone 2: 6 mins',
    },
    {
        store_id: 'SOO12',
        store_name: 'PLUS DC Polokwane',
        date: '2024-10-22',
        total_transactions_with_cross_sell: 230,
        total_transactions: 2050,
        cross_sell_upsell_rate: 11.22,
        top_cross_sold_items: 'Ice Cream, Fruit Salad',
        conversion_rate_of_cross_sell_offers: 9.1,
        customer_segment_impact: 'Adults',
        zone_engagement: 'Zone 1: 5 mins, Zone 2: 4 mins',
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


export const CrossvsUpsellReport = () => {
    const headers = ["Store ID", "Store Name", "Date", "Total Transactions with Cross-Sell/Upsell", "Total Transactions", "Cross-Sell/Upsell Rate (%)", "Top Cross-Sold Items", "Conversion Rate of Cross-Sell Offers", "Customer Segment Impact", "Zone Engagement (Dwell Time by Zone)"];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [filteredData, setFilteredData] = useState<CrossSellUpsellData[]>([]); 
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
        let filtered = crossSellUpsellData;  
        
        
        if (startDate && endDate) {
            filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }

        
        if (selectedStore !== 'All') {
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
                {filteredData.map(({ store_id, store_name, date, total_transactions_with_cross_sell, total_transactions, cross_sell_upsell_rate, top_cross_sold_items, conversion_rate_of_cross_sell_offers, customer_segment_impact, zone_engagement }) => (
                    <div key={store_id} className="bg-white text-gray-500 flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_transactions_with_cross_sell}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_transactions}</p>
                            <p className="text-sm flex-1 text-center uppercase">{cross_sell_upsell_rate}%</p>
                            <p className="text-sm flex-1 text-center uppercase">{top_cross_sold_items}</p>
                            <p className="text-sm flex-1 text-center uppercase">{conversion_rate_of_cross_sell_offers}%</p>
                            <p className="text-sm flex-1 text-center uppercase">{customer_segment_impact}</p>
                            <p className="text-sm flex-1 text-center uppercase">{zone_engagement}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};