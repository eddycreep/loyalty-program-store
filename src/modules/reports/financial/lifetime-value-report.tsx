"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter, XOctagon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

interface LifetimeData {
    store_id: string;
    store_name: string;
    date: string;
    average_purchase_value: number;
    average_purchase_frequency: number;
    ltv_estimate: number;
    customer_tenure: string;
    member_demographics: string;
    predicted_churn_rate: number;
    lifetime_revenue: number;
    top_products: string[];
}

const lifetimeData: LifetimeData[] = [
    { store_id: 'SOO1', store_name: 'PLUS DC Stellenbosch', date: '2024-10-01', average_purchase_value: 50, average_purchase_frequency: 6, ltv_estimate: 300, customer_tenure: '6 months', member_demographics: 'Male', predicted_churn_rate: 0.1, lifetime_revenue: 1800, top_products: ['Product A', 'Product B'] },
    { store_id: 'SOO2', store_name: 'PLUS DC Albertin', date: '2024-10-01', average_purchase_value: 40, average_purchase_frequency: 5, ltv_estimate: 200, customer_tenure: '5 months', member_demographics: 'Female', predicted_churn_rate: 0.15, lifetime_revenue: 1000, top_products: ['Product C', 'Product D'] },
    { store_id: 'SOO3', store_name: 'PLUS DC Bellville', date: '2024-10-01', average_purchase_value: 60, average_purchase_frequency: 7, ltv_estimate: 420, customer_tenure: '7 months', member_demographics: 'Male', predicted_churn_rate: 0.2, lifetime_revenue: 2520, top_products: ['Product E', 'Product F'] },
    { store_id: 'SOO4', store_name: 'PLUS DC Nelspruit', date: '2024-09-28', average_purchase_value: 55, average_purchase_frequency: 6, ltv_estimate: 330, customer_tenure: '6 months', member_demographics: 'Female', predicted_churn_rate: 0.18, lifetime_revenue: 1980, top_products: ['Product G', 'Product H'] },
    { store_id: 'SOO5', store_name: 'PLUS DC Durbanville', date: '2024-09-30', average_purchase_value: 65, average_purchase_frequency: 7, ltv_estimate: 455, customer_tenure: '7 months', member_demographics: 'Male', predicted_churn_rate: 0.22, lifetime_revenue: 2775, top_products: ['Product I', 'Product J'] },
    { store_id: 'SOO6', store_name: 'PLUS DC Bloemfontein', date: '2024-09-27', average_purchase_value: 70, average_purchase_frequency: 8, ltv_estimate: 560, customer_tenure: '8 months', member_demographics: 'Female', predicted_churn_rate: 0.25, lifetime_revenue: 3920, top_products: ['Product K', 'Product L'] },
    { store_id: 'SOO7', store_name: 'PLUS DC Cape Town', date: '2024-09-25', average_purchase_value: 62, average_purchase_frequency: 6, ltv_estimate: 372, customer_tenure: '6 months', member_demographics: 'Male', predicted_churn_rate: 0.19, lifetime_revenue: 2232, top_products: ['Product M', 'Product N'] },
    { store_id: 'SOO8', store_name: 'PLUS DC Pietermaritzburg', date: '2024-09-29', average_purchase_value: 58, average_purchase_frequency: 5, ltv_estimate: 290, customer_tenure: '5 months', member_demographics: 'Female', predicted_churn_rate: 0.16, lifetime_revenue: 1450, top_products: ['Product O', 'Product P'] },
    { store_id: 'SOO9', store_name: 'PLUS DC East London', date: '2024-09-26', average_purchase_value: 52, average_purchase_frequency: 6, ltv_estimate: 312, customer_tenure: '6 months', member_demographics: 'Male', predicted_churn_rate: 0.17, lifetime_revenue: 1872, top_products: ['Product Q', 'Product R'] },
    { store_id: 'SOO10', store_name: 'PLUS DC Pretoria', date: '2024-09-23', average_purchase_value: 68, average_purchase_frequency: 7, ltv_estimate: 476, customer_tenure: '7 months', member_demographics: 'Female', predicted_churn_rate: 0.21, lifetime_revenue: 3332, top_products: ['Product S', 'Product T'] },
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


export const LifetimeValueReport = () => {
    const headers = ['Store ID', 'Store Name', 'Date', 'Average Purchase Value', 'Average Purchase Frequency', 'LTV Estimate', 'Customer Tenure', 'Member Demographics', 'Predicted Churn Rate', 'Lifetime Revenue', 'Top Products Purchased'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState("");

    const [filteredData, setFilteredData] = useState<LifetimeData[]>([]); 
    const [isLoading, setIsLoading] = useState(false); 
    const [isError, setIsError] = useState(false); 
    const [hasFiltered, setDataHasFiltered] = useState(false);


    const handleFilter = () => {
        setIsLoading(true);
        let filtered = lifetimeData;  
        

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
                <p className="ml-2 uppercase pt-2 text-red">An error occured when fetch report data!</p>
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
                    <XOctagon size={44} />
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
                {filteredData.map(({ store_id, store_name, date, average_purchase_value, average_purchase_frequency, ltv_estimate, customer_tenure, member_demographics, predicted_churn_rate, lifetime_revenue, top_products }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{average_purchase_value}</p>
                            <p className="text-sm flex-1 text-center uppercase">{average_purchase_frequency}</p>
                            <p className="text-sm flex-1 text-center uppercase">{ltv_estimate}%</p>
                            <p className="text-sm flex-1 text-center">{customer_tenure}</p>
                            <p className="text-sm flex-1 text-center">{member_demographics}</p>
                            <p className="text-sm flex-1 text-center">{predicted_churn_rate}%</p>
                            <p className="text-sm flex-1 text-center">R{lifetime_revenue}</p>
                            <p className="text-sm flex-1 text-center">{top_products.join(', ')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};