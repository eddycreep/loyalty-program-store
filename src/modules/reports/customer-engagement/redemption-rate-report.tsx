"use client"

import { apiEndPoint, colors } from '@/utils/colors';
import * as React from "react";
import { useState, useEffect } from "react";
import toast from 'react-hot-toast';
import { Check, X, BadgeAlert, AlertTriangle } from "lucide-react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import SquareCircleLoader from "@/lib/square-circle-loader"

const enrollmentRate = [
    { month: 'january', newMembers: 200 },
    { month: 'february', newMembers: 220 },
    { month: 'march', newMembers: 240 },
    { month: 'april', newMembers: 260 },
    { month: 'may', newMembers: 300 },
    { month: 'june', newMembers: 320 },
    { month: 'july', newMembers: 340 },
    { month: 'august', newMembers: 360 },
    { month: 'september', newMembers: 380 },
    { month: 'october', newMembers: 400 },
    { month: 'november', newMembers: 420 },
    { month: 'december', newMembers: 440 },
];


export const RedemptionRateReport = () => {
    const headers = ['ID', 'Month', 'No. New Members'];

    const [selectedMonth, setSelectedMonth] = useState(''); // Initialize without filtering on mount
    const [filteredData, setFilteredData] = useState<{ month: string, newMembers: number }[]>([]); // No data filtered initially
    const [isLoading, setIsLoading] = useState(false); // Loading state to control the loader
    const [isError, setIsError] = useState(false); // Error state to handle no data

    // Effect to filter data only after a month has been selected
    useEffect(() => {
        // Check if a month has been selected to start filtering
        if (selectedMonth !== '') {
            setIsLoading(true);

            if (selectedMonth === 'All') {
                setFilteredData(enrollmentRate); // Show all data if "All" is selected
                toast.success('The report has been filtered for all months', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                });
            } else {
                const filtered = enrollmentRate.filter((item) => item.month === selectedMonth);
                setFilteredData(filtered);

                // Show an error if no data is found for the selected month
                if (filtered.length === 0) {
                    setIsError(true);
                    toast.error(`There is no data for the selected month "${selectedMonth}"`, {
                        icon: <X color={colors.red} size={24} />,
                        duration: 3000,
                    });
                } else {
                    setIsError(false);
                }
            }
            setIsLoading(false); // Stop loader after filtering
        }
    }, [selectedMonth]); // Only runs when selectedMonth changes

    // Display loading screen if data is being fetched
    if (isLoading) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
                <div className="">
                    <h4 className="text-xl font-bold">Active Members</h4>
                    <p className="text-sm text-gray-500">Number of active members over time</p>
                </div>
                <div className="pt-6">
                    <Select onValueChange={(value) => setSelectedMonth(value)}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Select a month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Month</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {enrollmentRate.map(({ month }) => (
                                    <SelectItem key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-20 flex flex-col items-center justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        );
    }

    // Show error message if there is no data for the selected month
    if (isError) {
        return (
            <div className="h-screen overflow-y-auto pl-2 pt-4">
                <div className="">
                    <h4 className="text-xl font-bold">Active Members</h4>
                    <p className="text-sm text-gray-500">Number of active members over time</p>
                </div>
                <div className="pt-6">
                    <Select onValueChange={(value) => setSelectedMonth(value)}>
                        <SelectTrigger className="w-[180px] bg-white">
                            <SelectValue placeholder="Select a month" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Month</SelectLabel>
                                <SelectItem value="All">All</SelectItem>
                                {enrollmentRate.map(({ month }) => (
                                    <SelectItem key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col items-center justify-center pt-20">
                    <AlertTriangle size={44} />
                    <p className="ml-2 uppercase pt-2 text-red">There is no data available for the selected month!</p>
                </div>
            </div>
        );
    }

    // Display filtered data when available
    

    return (
        <div className="h-screen overflow-y-auto pl-2 pt-4">
            <div className="">
                <h4 className="text-xl font-bold">Enrollment Rate</h4>
                <p className="text-sm text-gray-500">New members joining the program</p>
            </div>
            <div className="pt-6">
                <Select onValueChange={(value) => setSelectedMonth(value)}>
                    <SelectTrigger className="w-[180px] bg-white">
                        <SelectValue placeholder="Select a month" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Month</SelectLabel>
                            <SelectItem value="All">All</SelectItem>
                            {enrollmentRate.map(({ month }) => (
                                <SelectItem key={month} value={month}>{month.charAt(0).toUpperCase() + month.slice(1)}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 rounded shadow-lg">
                {headers.map((header, index) => (
                    <p key={index} className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>
                        {header}
                    </p>
                ))}
            </div>

            <div className="pt-2 max-h-screen pb-2 space-y-2 overflow-y-auto">
                {filteredData.map((item, index) => (
                    <div key={index} className="bg-white flex flex-col p-3 rounded shadow-lg">
                        <div className="flex items-center justify-between divide-x divide-gray-300">
                            <p className="text-sm flex-1 text-center text-red">{index + 1}</p>
                            <p className="text-sm flex-1 text-center uppercase">{item.month}</p>
                            <p className="text-sm flex-1 text-center">{item.newMembers}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};