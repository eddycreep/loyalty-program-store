"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader";
import { Label } from "@/components/ui/label";

interface CommonDiscountProductsData {
    store_id: string;
    store_name: string;
    product_id: string;
    product_name: string;
    category: string;
    customer_age_group: string;
    gender: string;
    geographic_location: string;
    purchase_time_trends: string;
    date: string;
}

const commonDiscountProductsReport: CommonDiscountProductsData[] = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        product_id: 'P001',
        product_name: 'Organic Apples',
        category: 'Groceries',
        customer_age_group: '25-34',
        gender: 'Female',
        geographic_location: 'Stellenbosch',
        purchase_time_trends: 'Morning',
        date: '2024-03-01'
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Cape Town',
        product_id: 'P002',
        product_name: 'Whole Wheat Bread',
        category: 'Bakery',
        customer_age_group: '35-44',
        gender: 'Male',
        geographic_location: 'Cape Town',
        purchase_time_trends: 'Afternoon',
        date: '2024-03-02'
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Durban',
        product_id: 'P003',
        product_name: 'Almond Milk',
        category: 'Dairy Alternatives',
        customer_age_group: '18-24',
        gender: 'Female',
        geographic_location: 'Durban',
        purchase_time_trends: 'Evening',
        date: '2024-03-03'
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Pretoria',
        product_id: 'P004',
        product_name: 'Chicken Breasts',
        category: 'Meat',
        customer_age_group: '45-54',
        gender: 'Male',
        geographic_location: 'Pretoria',
        purchase_time_trends: 'Morning',
        date: '2024-03-04'
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Johannesburg',
        product_id: 'P005',
        product_name: 'Granola Bars',
        category: 'Snacks',
        customer_age_group: '25-34',
        gender: 'Female',
        geographic_location: 'Johannesburg',
        purchase_time_trends: 'Afternoon',
        date: '2024-03-05'
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        product_id: 'P006',
        product_name: 'Orange Juice',
        category: 'Beverages',
        customer_age_group: '55-64',
        gender: 'Male',
        geographic_location: 'Bloemfontein',
        purchase_time_trends: 'Evening',
        date: '2024-03-06'
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

export const DiscountedProductsReport = () => {
    const headers = ['Store ID', 'Store Name', 'Product ID', 'Product Name', 'Category', 'Age Group of Discount Users', 'Gender Split', 'Geographic Location', 'Purchase Time Trends with Discounts'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [filteredData, setFilteredData] = useState<CommonDiscountProductsData[]>([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [isError, setIsError] = useState(false); 


    const handleFilter = () => {
        setIsLoading(true);
        let filtered = commonDiscountProductsReport;

        // Filter by date range
        if (startDate && endDate) {
            filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }

        // Filter by selected store
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
                {filteredData.map(({ store_id, store_name, product_id, product_name, category, customer_age_group, gender, geographic_location, purchase_time_trends, date }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{store_id}</p>
                            <p className="text-sm flex-1 text-center">{store_name}</p>
                            <p className="text-sm flex-1 text-center">{product_id}</p>
                            <p className="text-sm flex-1 text-center">{product_name}</p>
                            <p className="text-sm flex-1 text-center">{category}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center">{customer_age_group}</p>
                            <p className="text-sm flex-1 text-center">R{gender}</p>
                            <p className="text-sm flex-1 text-center">{geographic_location}</p>
                            <p className="text-sm flex-1 text-center">{purchase_time_trends}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};