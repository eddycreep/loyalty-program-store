"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle, Filter, XOctagon, ShieldAlert } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"
import { Label } from "@/components/ui/label";

// Define the interface for RedemptionRate data
// Define the interface for MemberConversion data
interface MemberConversion {
    store_id: string;
    store_name: string;
    region: string; // Added region field
    date: string;
    total_non_members: number;
    new_members_joined: number;
    member_conversion_rate: number;
    gender: {
        male: number;
        female: number;
        other: number;
    };
    age_group_of_new_members: {
        age_18_24: number;
        age_25_34: number;
        age_35_plus: number;
    };
    loyalty_tier_conversions: {
        StarterSavers: number;
        SmartShopper: number;
        PremierCollector: number;
    };
}

const memberConversionData: MemberConversion[] = [
    {
        store_id: 'SOO1',
        store_name: 'PLUS DC Stellenbosch',
        region: 'Western Cape', // Added region
        date: '2024-09-15',
        total_non_members: 1000,
        new_members_joined: 50,
        member_conversion_rate: 5,
        gender: { male: 25, female: 23, other: 2 },
        age_group_of_new_members: { age_18_24: 30, age_25_34: 15, age_35_plus: 5 },
        loyalty_tier_conversions: { StarterSavers: 30, SmartShopper: 15, PremierCollector: 5 }
    },
    {
        store_id: 'SOO2',
        store_name: 'PLUS DC Albertin',
        region: 'Gauteng',
        date: '2024-09-25',
        total_non_members: 800,
        new_members_joined: 40,
        member_conversion_rate: 5,
        gender: { male: 18, female: 20, other: 2 },
        age_group_of_new_members: { age_18_24: 25, age_25_34: 10, age_35_plus: 5 },
        loyalty_tier_conversions: { StarterSavers: 20, SmartShopper: 15, PremierCollector: 5 }
    },
    {
        store_id: 'SOO3',
        store_name: 'PLUS DC Bellville',
        region: 'Western Cape',
        date: '2024-10-05',
        total_non_members: 1200,
        new_members_joined: 60,
        member_conversion_rate: 5,
        gender: { male: 30, female: 28, other: 2 },
        age_group_of_new_members: { age_18_24: 40, age_25_34: 15, age_35_plus: 5 },
        loyalty_tier_conversions: { StarterSavers: 30, SmartShopper: 20, PremierCollector: 10 }
    },
    {
        store_id: 'SOO4',
        store_name: 'PLUS DC Nelspruit',
        region: 'Mpumalanga',
        date: '2024-08-20',
        total_non_members: 950,
        new_members_joined: 48,
        member_conversion_rate: 5.05,
        gender: { male: 22, female: 23, other: 3 },
        age_group_of_new_members: { age_18_24: 28, age_25_34: 15, age_35_plus: 5 },
        loyalty_tier_conversions: { StarterSavers: 25, SmartShopper: 18, PremierCollector: 5 }
    },
    {
        store_id: 'SOO5',
        store_name: 'PLUS DC Durbanville',
        region: 'Western Cape',
        date: '2024-07-30',
        total_non_members: 1100,
        new_members_joined: 52,
        member_conversion_rate: 4.73,
        gender: { male: 26, female: 24, other: 2 },
        age_group_of_new_members: { age_18_24: 27, age_25_34: 20, age_35_plus: 5 },
        loyalty_tier_conversions: { StarterSavers: 28, SmartShopper: 19, PremierCollector: 5 }
    },
    {
        store_id: 'SOO6',
        store_name: 'PLUS DC Bloemfontein',
        region: 'Free State',
        date: '2024-06-14',
        total_non_members: 890,
        new_members_joined: 45,
        member_conversion_rate: 5.06,
        gender: { male: 20, female: 22, other: 3 },
        age_group_of_new_members: { age_18_24: 26, age_25_34: 15, age_35_plus: 4 },
        loyalty_tier_conversions: { StarterSavers: 24, SmartShopper: 15, PremierCollector: 6 }
    },
    {
        store_id: 'SOO7',
        store_name: 'PLUS DC Cape Town',
        region: 'Western Cape',
        date: '2024-05-22',
        total_non_members: 1300,
        new_members_joined: 65,
        member_conversion_rate: 5,
        gender: { male: 32, female: 30, other: 3 },
        age_group_of_new_members: { age_18_24: 35, age_25_34: 25, age_35_plus: 5 },
        loyalty_tier_conversions: { StarterSavers: 35, SmartShopper: 20, PremierCollector: 10 }
    },
    {
        store_id: 'SOO8',
        store_name: 'PLUS DC Pietermaritzburg',
        region: 'KwaZulu-Natal',
        date: '2024-04-10',
        total_non_members: 1040,
        new_members_joined: 54,
        member_conversion_rate: 5.19,
        gender: { male: 25, female: 25, other: 4 },
        age_group_of_new_members: { age_18_24: 29, age_25_34: 20, age_35_plus: 5 },
        loyalty_tier_conversions: { StarterSavers: 30, SmartShopper: 15, PremierCollector: 9 }
    }
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

export const MemberConversionReport = () => {
    const headers = [ 'Store ID', 'Store Name', "Region", 'Date', 'Total Non-Members', 'New Members Joined', 'Conversion Rate (%)', 'Gender', 'Age Group', 'Tier Conversions'];

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [filteredData, setFilteredData] = useState<MemberConversion[]>([]); // Explicitly typed state
    const [isLoading, setIsLoading] = useState(false); 
    const [isError, setIsError] = useState(false); 
    const [hasFiltered, setDataHasFiltered] = useState(false);


    const handleFilter = () => {
        setIsLoading(true);
        let filtered = memberConversionData; 
        
        
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
                {filteredData.map(({ store_id, store_name, region, date, total_non_members, new_members_joined, member_conversion_rate, gender, age_group_of_new_members, loyalty_tier_conversions }) => (
                    <div key={store_id} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-red">{store_id}</p>
                            <p className="text-sm flex-1 text-center text">{store_name}</p>
                            <p className="text-sm flex-1 text-center text">{region}</p>
                            <p className="text-sm flex-1 text-center">{date}</p>
                            <p className="text-sm flex-1 text-center uppercase">{total_non_members}</p>
                            <p className="text-sm flex-1 text-center">{new_members_joined}</p>
                            {/* <p className={`text-sm flex-1 text-center ${member_conversion_rate >= 50 ? 'text-green' : 'text-red'}`}>
                                {member_conversion_rate}%
                            </p> */}
                            <p className="text-sm flex-1 text-center">{member_conversion_rate}</p>
                            <p className="text-sm flex-1 text-center">
                                <span className="text-blue">{gender.male}</span>{' '}
                                <span className="text-green">{gender.female}</span>{' '}
                                <span className="text-purple">{gender.other}</span>
                            </p>
                            <p className="text-sm flex-1 text-center">
                                <div className="flex flex-col">
                                    <span>
                                        <span className="text-gray-400">18-24 - </span>{' '}
                                        <span className="text-blue">{age_group_of_new_members.age_18_24}</span>
                                    </span>
                                    <span>
                                        <span className="text-gray-400">25-34 - </span>{' '}
                                        <span className="text-green">{age_group_of_new_members.age_25_34}</span>
                                    </span>
                                    <span>
                                        <span className="text-gray-400">35-plus - </span>{' '}
                                        <span className="text-purple">{age_group_of_new_members.age_35_plus}</span>
                                    </span>
                                </div>
                            </p>
                            <p className="text-sm flex-1 text-center">
                                <span className="text-blue">{loyalty_tier_conversions.StarterSavers}</span>{' '}
                                <span className="text-green">{loyalty_tier_conversions.SmartShopper}</span>{' '}
                                <span className="text-purple">{loyalty_tier_conversions.PremierCollector}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};