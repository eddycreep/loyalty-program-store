"use client"

import axios from 'axios'
import toast from 'react-hot-toast'
import { apiEndPoint, colors } from '@/utils/colors';
import { Filter } from 'lucide-react';
import { useState, useEffect } from 'react'
import { Label, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { X, Check } from 'lucide-react'

const data = [
    { name: 'Question 1', No: 40, Yes: 24, Maybe: 24 },
    { name: 'Question 2', No: 30, Yes: 18, Maybe: 3 },
    { name: 'Question 3', No: 20, Yes: 8, Maybe: 9 },
    { name: 'Question 4', No: 27, Yes: 8, Maybe: 2 },
    { name: 'Question 5', No: 19, Yes: 48, Maybe: 26},
];

export default function SurveyChart() {
    const  [loadingData, setLoadingData] = useState(false);
    const  [isError, setIsError] = useState(false);

    const  [startdate, setStartDate] = useState('');
    const  [enddate, setEndDate] = useState('');

    const getSurveyData = async () => {
        if (!validateFilters()) {
            setLoadingData(false);
            return;
        }

        try {
            const url = `admin/get-survey-data`
            const response = await axios.get(`${apiEndPoint}/${url}`)
            console.log("Retrieved Survey Data:", response)
        } catch (error) {
            console.error("An error occurred when fetching survey data:", error)
            setIsError(true);
        }
    }
    

    const validateFilters = () => {
        if (!startdate && !enddate) {
            toast.error("Please select a start date, end date!", {
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



    return (
        <div className="h-screen p-4 overflow-y-auto">
            <div className="flex flex-col pl-2 pt-6">
                <h4 className="text-2xl font-semibold text-purple">Detailed Surveys</h4>
                <p className="text-gray-500">View detailed results of the survey, including comprehensive insights and responses from participants.</p>
            </div>
            <div className="pt-8 p-2">
                <div className="flex gap-4 py-2">
                    <div className="w-[350px]">
                        <label htmlFor="username" className="text-left pt-4">
                            Start Date:
                        </label>
                        <input type="date" value={startdate} onChange={(e) => setStartDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                    </div>
                    <div className="w-[350px]">
                        <label htmlFor="username" className="text-left pt-4">
                            Expiry Date:
                        </label>
                        <input type="date" value={enddate} onChange={(e) => setEndDate(e.target.value)} className='w-full p-2 rounded-lg border border-gray-300'/>
                    </div>
                    <div className="flex justify-end w-full pt-6">
                    <button className="bg-purple hover:bg-indigo-300 text-white w-20 h-11 rounded shadow-lg flex items-center justify-center">
                        <Filter />
                    </button>
                </div>
                </div>
                <div className="bg-white p-2 h-[500px] w-full rounded-lg shadow border-2 flex items-center justify-center text-sm text-gray-500 font-medium relative">
                    <div className='w-full h-[80%] flex flex-col justify-center items-center gap-2'>
                        <h2 className='text-center text-base md:text-lg'>Survey Results</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                data={data}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barSize={20} >
                                <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis>
                                        <Label value="No of Participants" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} />
                                    </YAxis>
                                    <Tooltip />
                                    <Legend />
                                <CartesianGrid strokeDasharray="3 3" stroke="#9f9f9f" vertical={false} />
                                <Bar dataKey="Yes" fill="#ff2257" background={{ fill: 'transparent' }} />
                                <Bar dataKey="No" fill="#00d384" background={{ fill: 'transparent' }} />
                                <Bar dataKey="Maybe" fill="#FFC400" background={{ fill: 'transparent' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 pt-16 p-2">
                <div className="w-96">
                    <div className="bg-white rounded p-4">
                        <h5 className="text-lg font-semibold text-purple">Survey Name</h5>
                        <p className="text-gray-500">Products Survey</p>
                    </div>
                </div>
                <div className="w-96">
                    <div className="bg-white rounded p-4">
                        <h5 className="text-lg font-semibold text-purple">Store ID</h5>
                        <p className="text-gray-500">SOO1</p>
                    </div>
                </div>
                <div className="w-96">
                    <div className="bg-white rounded p-4">
                        <h5 className="text-lg font-semibold text-purple">Region</h5>
                        <p className="text-gray-500">Gauteng</p>
                    </div>
                </div>
                <div className="w-96">
                    <div className="bg-white rounded p-4">
                        <h5 className="text-lg font-semibold text-purple">Loyalty Tier</h5>
                        <p className="text-gray-500">Gold</p>
                    </div>
                </div>
                <div className="w-96">
                    <div className="bg-white rounded p-4">
                        <h5 className="text-lg font-semibold text-purple">Status</h5>
                        <p className="text-green">Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
