"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter, XOctagon, ShieldAlert } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

// Interface for promotionalImpactData
interface PromotionalImpact {
    store_id: string;
    store_name: string;
    date: string;
    special: string,
    sales_during_promotion: number;
    sales_before_promotion: number;
    promotional_impact: number;
    revenue_growth: number;
    units_sold: number;
    most_redeemed: string;
    promotion_spend: number;
    promotion_roi: number;
    avg_basket_increase: number;
}

// Updated promotionalImpactData with random dates and more rows
const promotionalImpactData: PromotionalImpact[] = [ 
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        date: '2024-09-15',
        special: 'Fruits Special',
        sales_during_promotion: 35000,
        sales_before_promotion: 30000,
        promotional_impact: 16.67,
        revenue_growth: 5000,
        units_sold: 1200,
        most_redeemed: 'Fresh Produce',
        promotion_spend: 2000,
        promotion_roi: 150,
        avg_basket_increase: 25.5
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        date: '2024-08-20',
        special: 'Candy Special',
        sales_during_promotion: 30000,
        sales_before_promotion: 25000,
        promotional_impact: 20,
        revenue_growth: 5000,
        units_sold: 850,
        most_redeemed: 'Dairy Products',
        promotion_spend: 1800,
        promotion_roi: 177.8,
        avg_basket_increase: 22.3
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        date: '2024-07-10',
        special: 'Peanut Special',
        sales_during_promotion: 45000,
        sales_before_promotion: 40000,
        promotional_impact: 12.5,
        revenue_growth: 5000,
        units_sold: 1000,
        most_redeemed: 'Bakery Products',
        promotion_spend: 2000,
        promotion_roi: 125,
        avg_basket_increase: 20.5
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Nelspruit',
        date: '2024-06-25',
        special: '10% Off Special',
        sales_during_promotion: 25000,
        sales_before_promotion: 22000,
        promotional_impact: 13.64,
        revenue_growth: 5000,
        units_sold: 900,
        most_redeemed: 'Fruit and Vegetables',
        promotion_spend: 1800,
        promotion_roi: 136.4,
        avg_basket_increase: 20.5
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durbanville',
        date: '2024-10-05',
        special: 'Buy-One-Get-One-Free',
        sales_during_promotion: 33000,
        sales_before_promotion: 29000,
        promotional_impact: 13.79,
        revenue_growth: 5000,
        units_sold: 1100,
        most_redeemed: 'Meat and Poultry',
        promotion_spend: 2000,
        promotion_roi: 137.9,
        avg_basket_increase: 25.5
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        date: '2024-05-15',
        special: 'Snack Combo',
        sales_during_promotion: 29000,
        sales_before_promotion: 26000,
        promotional_impact: 11.54,
        revenue_growth: 5000,
        units_sold: 950,
        most_redeemed: 'Dairy Products',
        promotion_spend: 1800,
        promotion_roi: 115.4,
        avg_basket_increase: 22.3
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Cape Town',
        date: '2024-03-28',
        special: 'Discount Special',
        sales_during_promotion: 41000,
        sales_before_promotion: 36000,
        promotional_impact: 13.89,
        revenue_growth: 5000,
        units_sold: 1050,
        most_redeemed: 'Bakery Products',
        promotion_spend: 2000,
        promotion_roi: 138.9,
        avg_basket_increase: 25.5
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Pietermaritzburg',
        date: '2024-04-12',
        special: 'Sweety Combo', 
        sales_during_promotion: 37000,
        sales_before_promotion: 33000,
        promotional_impact: 12.12,
        revenue_growth: 5000,
        units_sold: 950,
        most_redeemed: 'Fruit and Vegetables',
        promotion_spend: 1800,
        promotion_roi: 121.2,
        avg_basket_increase: 20.5
    },
    {
        store_id: 'SOO9',
        store_name: 'PLUS DC East London',
        date: '2024-09-01',
        special: 'Summer Special',
        sales_during_promotion: 28000,
        sales_before_promotion: 24000,
        promotional_impact: 16.67,
        revenue_growth: 5000,
        units_sold: 800,
        most_redeemed: 'Meat and Poultry',
        promotion_spend: 2000,
        promotion_roi: 166.7,
        avg_basket_increase: 25.5
    },
    {
        store_id: 'SOO10',
        store_name: 'PLUS DC Pretoria',
        date: '2024-08-05',
        special: 'Braai Special',
        sales_during_promotion: 39000,
        sales_before_promotion: 35000,
        promotional_impact: 11.43,
        revenue_growth: 5000,
        units_sold: 900,
        most_redeemed: 'Dairy Products',
        promotion_spend: 1800,
        promotion_roi: 114.3,
        avg_basket_increase: 22.3
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


export const PromotionalImpactReport = () => {
    const headers = ['Store ID', 'Store Name', 'Date', 'Special', 'Sales During Special', 'Sales Before Special', 'Promotional Impact (%)', 'Revenue Growth During Promotion', 'Units Sold During Promotion', 'Most Redeemed Products'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [filteredData, setFilteredData] = useState<PromotionalImpact[]>([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [isError, setIsError] = useState(false); 
    const [hasFiltered, setDataHasFiltered] = useState(false);

    
    const handleFilter = () => {
        setIsLoading(true);
        let filtered = promotionalImpactData;  
        
        
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
                <div className="w-[300px] flex flex-col pt-4">
                    <Label htmlFor="storeid" className="text-left pt-4 pb-1">
                        Store ID:
                    </Label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {stores.map(({ id, store_id, store }) => (
                            <option key={id} value={store_id}>
                                {store_id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-[300px] flex flex-col pt-4">
                    <Label htmlFor="storeid" className="text-left pt-4 pb-1">
                        Regions:
                    </Label>
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
                <div className="w-[300px] flex flex-col pt-4">
                    <Label htmlFor="storeid" className="text-left pt-4 pb-1">
                        Store ID:
                    </Label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {stores.map(({ id, store_id, store }) => (
                            <option key={id} value={store_id}>
                                {store_id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-[300px] flex flex-col pt-4">
                    <Label htmlFor="storeid" className="text-left pt-4 pb-1">
                        Regions:
                    </Label>
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
                    <XOctagon size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">An error occured when fetch report data</p>
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
                                <div className="w-[300px] flex flex-col pt-4">
                    <Label htmlFor="storeid" className="text-left pt-4 pb-1">
                        Store ID:
                    </Label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {stores.map(({ id, store_id, store }) => (
                            <option key={id} value={store_id}>
                                {store_id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-[300px] flex flex-col pt-4">
                    <Label htmlFor="storeid" className="text-left pt-4 pb-1">
                        Regions:
                    </Label>
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
                <div className="w-[300px] flex flex-col pt-4">
                    <Label htmlFor="storeid" className="text-left pt-4 pb-1">
                        Store ID:
                    </Label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {stores.map(({ id, store_id, store }) => (
                            <option key={id} value={store_id}>
                                {store_id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-[300px] flex flex-col pt-4">
                    <Label htmlFor="storeid" className="text-left pt-4 pb-1">
                        Regions:
                    </Label>
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
                {filteredData.map(({ store_id, store_name, date, special, sales_during_promotion, sales_before_promotion, promotional_impact, revenue_growth, units_sold, most_redeemed }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center">{special}</p>
                            <p className="text-sm flex-1 text-center">R{sales_during_promotion.toLocaleString()}</p>
                            <p className="text-sm flex-1 text-center">R{sales_before_promotion.toLocaleString()}</p>
                            <p className={`text-sm flex-1 text-center ${promotional_impact >= 50 ? 'text-green' : 'text-red'}`}>
                                {promotional_impact}%
                            </p>
                            <p className="text-sm flex-1 text-center">R{revenue_growth.toLocaleString()}</p>
                            <p className="text-sm flex-1 text-center">{units_sold.toLocaleString()}</p>
                            <p className="text-sm flex-1 text-center">{most_redeemed}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};