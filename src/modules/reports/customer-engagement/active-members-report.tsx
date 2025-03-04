"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { X,  Filter, XOctagon, ShieldAlert } from "lucide-react";
import SquareCircleLoader from "@/lib/square-circle-loader";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { StoresResponse } from '@/modules/types/data-types';

const activeMembers = [
    {
        storeId: 'SOO1',
        storeName: 'PLUS DC Stellenbosch',
        activeMembers: 120,
        date: '2023-10-01',
        ageGroupEngagementRate: { "18-24": 35, "25-34": 45, "35-44": 15, "45+": 5 },
        genderEngagementRate: { Male: 48, Female: 50, PreferNotToSay: 1 },
        spendingTierDemographic: { Gold: 55, Diamond: 35, Platinum: 10 }
    },
    {
        storeId: 'SOO2',
        storeName: 'PLUS DC Albertin',
        activeMembers: 95,
        date: '2023-10-05',
        ageGroupEngagementRate: { "18-24": 25, "25-34": 30, "35-44": 25, "45+": 20 },
        genderEngagementRate: { Male: 52, Female: 46, PreferNotToSay: 1 },
        spendingTierDemographic: { Gold: 40, Diamond: 45, Platinum: 15 }
    },
    {
        storeId: 'SOO3',
        storeName: 'PLUS DC Bellville',
        activeMembers: 110,
        date: '2023-10-10',
        ageGroupEngagementRate: { "18-24": 20, "25-34": 30, "35-44": 30, "45+": 20 },
        genderEngagementRate: { Male: 45, Female: 53, PreferNotToSay: 1 },
        spendingTierDemographic: { Gold: 30, Diamond: 50, Platinum: 20 }
    },
    {
        storeId: 'SOO4',
        storeName: 'PLUS DC Nelspruit',
        activeMembers: 100,
        date: '2023-10-15',
        ageGroupEngagementRate: { "18-24": 15, "25-34": 35, "35-44": 35, "45+": 15 },
        genderEngagementRate: { Male: 49, Female: 49, PreferNotToSay: 1 },
        spendingTierDemographic: { Gold: 25, Diamond: 55, Platinum: 20 }
    },
    {
        storeId: 'SOO5',
        storeName: 'PLUS DC Durbanville',
        activeMembers: 100,
        date: '2023-10-20',
        ageGroupEngagementRate: { "18-24": 30, "25-34": 40, "35-44": 20, "45+": 10 },
        genderEngagementRate: { Male: 51, Female: 47, NonBinary: 1, PreferNotToSay: 1 },
        spendingTierDemographic: { Gold: 50, Diamond: 30, Platinum: 20 }
    }
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

export const ActiveMembersReport = () => {
    const header = ['Store ID', 'Store Name', 'Active Members p/Store', 'Age Group (18-24)', 'Age Group (25-34)', 'Age Group (35-44)', 'Age Group (45+)', 'Gender', 'Tiers']

    const [startdate, setStartDate] = useState('');
    const [enddate, setEndDate ] = useState('');
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedRegion, setSelectedRegion] = useState('');

    const [filteredData, setFilteredData] = useState(activeMembers);
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

    // Function to handle filtering based on selected dates and store
    const handleFilter = () => {
        //check if dates and store are null before filtering
        if (!validateFilters()) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        let filtered = activeMembers;

        // Parse the selected dates
        const start = new Date(startdate);
        const end = new Date(enddate);

        // Validate dates: Ensure start date is not after end date
        if (startdate && enddate && start > end) {
            toast.error('Start date cannot be after end date!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            setIsLoading(false);
            return;
        }

        // Filter by start date and end date if both are selected
        if (startdate && enddate) {
            filtered = filtered.filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate >= start && itemDate <= end;
            });
        }

        // Filter by store if selected
        if (selectedStore && selectedStore !== 'All') {
            filtered = filtered.filter((item) => item.storeId === selectedStore);
        }

        setFilteredData(filtered);
        setDataHasFiltered(true);

        if (filtered.length === 0) {
            // setIsError(true);
            toast.error('No data found for the selected filters!', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        } else {
            setIsError(false);
        }

        setIsLoading(false);
    };

    // Function to validate filters
    const validateFilters = () => {
        if (!startdate && !enddate && !selectedStore) {
            toast.error("Please select a start date, end date, and store!", {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return false;
        }

        if (startdate && !enddate) {
            toast.error("End date is missing. Please select an end date!", {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return false;
        }

        if (!startdate && enddate) {
            toast.error("Start date is missing. Please select a start date!", {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return false;
        }

        if (!selectedStore) {
            toast.error("Please select a store!", {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return false;
        }

        // Validate date range
        if (new Date(startdate) > new Date(enddate)) {
            toast.error("Start date cannot be after the end date!", {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return false;
        }

        return true;
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
                                <input 
                                    type="date" 
                                    value={startdate} 
                                    onChange={(e) => setStartDate(e.target.value)} 
                                    className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'
                                />
                            </div>
                            <div className="w-[270px]">
                                <label htmlFor="username" className="text-left pt-4 text-black">
                                    End Date:
                                </label>
                                <input 
                                    type="date" 
                                    value={enddate} 
                                    onChange={(e) => setEndDate(e.target.value)} 
                                    className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-[570px] flex flex-col pt-4">
                        <label htmlFor="storeid" className="text-left text-black pt-2">
                            Store ID:
                        </label>
                        <select
                            className="bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]"
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
                        <button className="bg-purple hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center">
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
                                <label htmlFor="username" className="text-left pt-4 text-black">
                                    Start Date:
                                </label>
                                <input 
                                    type="date" 
                                    value={startdate} 
                                    onChange={(e) => setStartDate(e.target.value)} 
                                    className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'
                                />
                            </div>
                            <div className="w-[270px]">
                                <label htmlFor="username" className="text-left pt-4 text-black">
                                    End Date:
                                </label>
                                <input 
                                    type="date" 
                                    value={enddate} 
                                    onChange={(e) => setEndDate(e.target.value)} 
                                    className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'
                                />
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
                        <button className="bg-purple hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center">
                            <Filter />
                        </button>
                    </div>
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
                                <input 
                                    type="date" 
                                    value={startdate} 
                                    onChange={(e) => setStartDate(e.target.value)} 
                                    className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'
                                />
                            </div>
                            <div className="w-[270px]">
                                <label htmlFor="username" className="text-left pt-4 text-black">
                                    End Date:
                                </label>
                                <input 
                                    type="date" 
                                    value={enddate} 
                                    onChange={(e) => setEndDate(e.target.value)} 
                                    className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'
                                />
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
                        <button className="bg-purple hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center">
                            <Filter />
                        </button>
                    </div>
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
                            {/* Added [color-scheme:light] to make the calendar icon black */}
                            <input 
                                type="date" 
                                value={startdate} 
                                onChange={(e) => setStartDate(e.target.value)} 
                                className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'
                            />
                        </div>
                        <div className="w-[270px]">
                            <label htmlFor="username" className="text-left text-black pt-4">
                                End Date:
                            </label>
                            <input 
                                type="date" 
                                value={enddate} 
                                onChange={(e) => setEndDate(e.target.value)} 
                                className='bg-white text-black w-full h-11 p-2 rounded-lg border border-gray-300 [color-scheme:light]'
                            />
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
                    <button className="bg-purple hover:bg-black text-white w-20 h-11 rounded shadow-lg flex items-center justify-center" 
                        onClick={ handleFilter }
                    >
                        <Filter />
                    </button>
                </div>
            </div>

            <div className="bg-white text-black font-bold flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {header.map((header, index) => (
                    <p key={index} className={`text-xs uppercase flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>
            <div className="pt-2 max-h-screen pb-2 space-y-2">
            {filteredData.map(({ storeId, storeName, activeMembers, ageGroupEngagementRate, genderEngagementRate, spendingTierDemographic }) => (
                    <div key={storeId} className="bg-white text-gray-500 flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-purple">{storeId}</p>
                            <p className="text-sm flex-1 text-center">{storeName}</p>
                            <p className="text-sm flex-1 text-center text-green">{activeMembers}</p>
                            <p className="text-sm flex-1 text-center">{ageGroupEngagementRate['18-24']}%</p>
                            <p className="text-sm flex-1 text-center">{ageGroupEngagementRate['25-34']}%</p>
                            <p className="text-sm flex-1 text-center">{ageGroupEngagementRate['35-44']}%</p>
                            <p className="text-sm flex-1 text-center">{ageGroupEngagementRate['45+']}%</p>
                            {/* Apply gap to gender engagement rates */}
                            <div className="text-sm flex-1 justify-center text-center flex gap-4">
                                <span className="text-pink-400">{genderEngagementRate['Female']}</span>
                                <span className="text-blue">{genderEngagementRate['Male']}</span>
                                <span className="text-gray-400">{genderEngagementRate['PreferNotToSay']}</span>
                            </div>

                            {/* Apply gap to spending tier demographics */}
                            <div className="text-sm flex-1 justify-center text-center flex gap-4">
                                <span className="text-amber-400">{spendingTierDemographic['Gold']}</span>
                                <span className="text-blue">{spendingTierDemographic['Diamond']}</span>
                                <span className="text-gray-400">{spendingTierDemographic['Platinum']}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};