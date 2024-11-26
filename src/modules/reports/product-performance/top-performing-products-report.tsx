"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter, ShieldAlert, XOctagon } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader";
import { Label } from "@/components/ui/label";

interface TopPerformingProductsData {
    store_id: string;
    store_name: string;
    product_id: string;
    product_name: string;
    category: string;
    total_sales: number;
    total_revenue: number;
    total_discount_amount: number;
    discount_usage_rate: number;
    avg_discount: number;
    gross_margin: number;
    customer_count: number;
    date: string;
}

const topPerformingProductsReport: TopPerformingProductsData[] = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        product_id: 'P001',
        product_name: 'Organic Apples',
        category: 'Groceries',
        total_sales: 150,
        total_revenue: 4500,
        total_discount_amount: 300,
        discount_usage_rate: 20,
        avg_discount: 5,
        gross_margin: 35,
        customer_count: 120,
        date: '2024-11-01'
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        product_id: 'P002',
        product_name: 'Smart TV',
        category: 'Electronics',
        total_sales: 30,
        total_revenue: 18000,
        total_discount_amount: 1000,
        discount_usage_rate: 10,
        avg_discount: 15,
        gross_margin: 40,
        customer_count: 25,
        date: '2024-11-02'
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        product_id: 'P003',
        product_name: 'Men’s Jacket',
        category: 'Fashion',
        total_sales: 75,
        total_revenue: 11250,
        total_discount_amount: 500,
        discount_usage_rate: 25,
        avg_discount: 10,
        gross_margin: 30,
        customer_count: 60,
        date: '2024-11-03'
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Nelspruit',
        product_id: 'P004',
        product_name: 'Bluetooth Speaker',
        category: 'Electronics',
        total_sales: 40,
        total_revenue: 6000,
        total_discount_amount: 300,
        discount_usage_rate: 15,
        avg_discount: 7,
        gross_margin: 38,
        customer_count: 35,
        date: '2024-11-04'
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durbanville',
        product_id: 'P005',
        product_name: 'Sports Shoes',
        category: 'Fashion',
        total_sales: 90,
        total_revenue: 13500,
        total_discount_amount: 450,
        discount_usage_rate: 18,
        avg_discount: 5,
        gross_margin: 32,
        customer_count: 80,
        date: '2024-11-05'
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        product_id: 'P006',
        product_name: 'Cooking Oil',
        category: 'Groceries',
        total_sales: 120,
        total_revenue: 4800,
        total_discount_amount: 200,
        discount_usage_rate: 30,
        avg_discount: 4,
        gross_margin: 25,
        customer_count: 95,
        date: '2024-11-06'
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Cape Town',
        product_id: 'P007',
        product_name: 'Laptop',
        category: 'Electronics',
        total_sales: 10,
        total_revenue: 50000,
        total_discount_amount: 3000,
        discount_usage_rate: 8,
        avg_discount: 12,
        gross_margin: 50,
        customer_count: 8,
        date: '2024-11-07'
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Pietermaritzburg',
        product_id: 'P008',
        product_name: 'Yoga Mat',
        category: 'Sports',
        total_sales: 60,
        total_revenue: 2400,
        total_discount_amount: 100,
        discount_usage_rate: 12,
        avg_discount: 3,
        gross_margin: 28,
        customer_count: 50,
        date: '2024-11-08'
    },
    {
        store_id: 'SOO9',
        store_name: 'PLUS DC East London',
        product_id: 'P009',
        product_name: 'Organic Milk',
        category: 'Groceries',
        total_sales: 130,
        total_revenue: 6500,
        total_discount_amount: 250,
        discount_usage_rate: 22,
        avg_discount: 6,
        gross_margin: 27,
        customer_count: 115,
        date: '2024-11-09'
    },
    {
        store_id: 'SOO10',
        store_name: 'PLUS DC Pretoria',
        product_id: 'P010',
        product_name: 'LED Light Bulbs',
        category: 'Electronics',
        total_sales: 80,
        total_revenue: 3200,
        total_discount_amount: 180,
        discount_usage_rate: 14,
        avg_discount: 4,
        gross_margin: 33,
        customer_count: 70,
        date: '2024-11-10'
    },
    {
        store_id: 'SOO11',
        store_name: 'PLUS DC Germiston',
        product_id: 'P011',
        product_name: 'Designer Handbag',
        category: 'Fashion',
        total_sales: 20,
        total_revenue: 10000,
        total_discount_amount: 600,
        discount_usage_rate: 10,
        avg_discount: 8,
        gross_margin: 45,
        customer_count: 18,
        date: '2024-11-11'
    },
    {
        store_id: 'SOO12',
        store_name: 'PLUS DC Polokwane',
        product_id: 'P012',
        product_name: 'Organic Coffee Beans',
        category: 'Groceries',
        total_sales: 200,
        total_revenue: 10000,
        total_discount_amount: 500,
        discount_usage_rate: 25,
        avg_discount: 5,
        gross_margin: 29,
        customer_count: 175,
        date: '2024-11-12'
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

export const TopPerformingProductsReport = () => {
    const headers = ['Store ID', 'Store Name', 'Product ID', 'Product Name', 'Category', 'Date', 'Total Sales', 'Total Revenue', 'Total Discount', 'Usage Rate (%)', 'Avg. Discount (%)', 'Customer Count'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [filteredData, setFilteredData] = useState<TopPerformingProductsData[]>([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [isError, setIsError] = useState(false);
    const [hasFiltered, setDataHasFiltered] = useState(false);


    const handleFilter = () => {
        setIsLoading(true);
        let filtered = topPerformingProductsReport;

        // Filter by date range
        if (startDate && endDate) {
            filtered = filtered.filter(item => item.date >= startDate && item.date <= endDate);
        }

        // Filter by selected store
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
                                    Expiry Date:
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
                                Expiry Date:
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
                {filteredData.map(({ store_id, store_name, product_id, product_name, category, total_sales, total_revenue, total_discount_amount, discount_usage_rate, avg_discount, gross_margin, customer_count, date }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-red">{store_id}</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{store_name}</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{product_id}</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{product_name}</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{category}</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{date}</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{total_sales}</p>
                            <p className="text-sm flex-1 text-center text-green">R{total_revenue}</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{total_discount_amount}</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{discount_usage_rate}%</p>
                            <p className="text-sm flex-1 text-center text-gray-500">{avg_discount}%</p>
                            {/* <p className="text-sm flex-1 text-center">{gross_margin}</p> */}
                            <p className="text-sm flex-1 text-center text-purple">{customer_count}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};