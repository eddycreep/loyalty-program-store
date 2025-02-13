"use client"

import axios from 'axios'
import toast from 'react-hot-toast'
import { apiEndPoint, colors } from '@/utils/colors';
import { Filter, ShieldAlert, XOctagon } from 'lucide-react';
import { useState, useEffect } from 'react'
import { Label, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { X, Check } from 'lucide-react'
import { useParams } from "next/navigation"; // For Next.js 13+
import SquareCircleLoader from '@/lib/square-circle-loader';

interface Survey {
    survey_id: number,
    survey_title: string,
    survey_category: string,
    store_id: string,
    region: string,
    loyalty_tier: string,
    start_date: string,
    expiry_date: string,
    isActive: boolean,
    surveyQuestions: Questions[]
}

interface Questions {
    question_id: number,
    survey_id: number,
    question_text: string,
    question_type: string,
}

type SurveyResponse = {
    results: Survey[]
    message: string,
}


// survey response
interface SurveyCustomerResponseProps {
    response_id: number,
    survey_id: number,
    question_id: number,
    customer_id: number,
    text_response: string,
    rating_response: string,
    multiple_choice_response: string
}

type SurveyCustomerResponse = SurveyCustomerResponseProps[]

export default function SurveyChart() {
    const params = useParams();

    const  [loading, setLoading] = useState(false);
    const  [isError, setIsError] = useState(false);
    const  [startdate, setStartDate] = useState('');
    const  [enddate, setEndDate] = useState('');

    const [surveyData, setSurveyData] = useState<Survey[] | null>(null);
    const [surveyResponse, setSurveyResponseData] = useState<SurveyCustomerResponse>([])

    // Convert surveyId from params to a number
    const surveyID = Number(params?.survey_id); // Conversion to number
    console.log("surveyID: ", surveyID)

    useEffect(() => {
        const getSurveyData = async () => {
            setLoading(true);

            try {
                const url = `survey/get-active-survey-with-questions/${surveyID}`
                const response = await axios.get<SurveyResponse>(`${apiEndPoint}/${url}`);
                console.log("Retrieved Survey Data:", response.data)
                setSurveyData(response?.data.results);
                setLoading(false);
            } catch (error) {
                console.error("An error occurred when fetching survey data:", error)
                setIsError(true);
            }
        }

        const getSurveyResponse = async () => {
            try {
                const url = `survey/get-survey-response/${surveyID}`
                const response = await axios.get<SurveyCustomerResponse>(`${apiEndPoint}/${url}`)
                setSurveyResponseData(response.data)
                console.log('Survey Response Data: ', response.data)
            } catch (error) {
                console.error("An error occurred when fetching survey response data:", error)
            }
        }

        getSurveyData();
        getSurveyResponse();

    }, [surveyID])
    

    // const validateFilters = () => {
    //     if (!startdate && !enddate) {
    //         toast.error("Please select a start date, end date!", {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         });
    //         return false;
    //     }

    //     if (startdate && !enddate) {
    //         toast.error("End date is missing. Please select an end date!", {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         });
    //         return false;
    //     }

    //     if (!startdate && enddate) {
    //         toast.error("Start date is missing. Please select a start date!", {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         });
    //         return false;
    //     }

    //     // Validate date range
    //     if (new Date(startdate) > new Date(enddate)) {
    //         toast.error("Start date cannot be after the end date!", {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         });
    //         return false;
    //     }

    //     return true;
    // };

    if (loading) {
        return (
            <div className="p-4 pb-24">
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
                <div className="min-h-[200px] w-full flex flex-col items-center py-20 justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
            {surveyData?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
                <div key={survey_id} className="flex gap-4 pt-16 p-2">
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Survey Name</h5>
                            <p className="text-gray-500">{survey_title}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Store ID</h5>
                            <p className="text-gray-500">{store_id}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Region</h5>
                            <p className="text-gray-500">{region}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Loyalty Tier</h5>
                            <p className="text-gray-500">{loyalty_tier}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Status</h5>
                            <p className={isActive ? "text-green" : "text-red"}>
                                {isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        )
    }
    
    if (isError) {
        return (
            <div className="p-4 pb-24">
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
                <div className="min-h-[200px] w-full flex flex-col items-center py-20 justify-center">
                    <XOctagon size={34} />
                    <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching survey data</p>
                </div>
            </div>
            {surveyData?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
                <div key={survey_id} className="flex gap-4 pt-16 p-2">
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Survey Name</h5>
                            <p className="text-gray-500">{survey_title}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Store ID</h5>
                            <p className="text-gray-500">{store_id}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Region</h5>
                            <p className="text-gray-500">{region}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Loyalty Tier</h5>
                            <p className="text-gray-500">{loyalty_tier}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Status</h5>
                            <p className={isActive ? "text-green" : "text-red"}>
                                {isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        )
    }
    
    if (surveyData?.length === 0) {
        return (
            <div className="p-4 pb-24">
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
                <div className="flex flex-col items-center justify-center py-20 w-full">
                    <ShieldAlert size={34} />
                    <p className="ml-2 uppercase pt-2 text-green">The survey has no responses yet or is inactive</p>
                </div>
            </div>
            {surveyData?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
                <div key={survey_id} className="flex gap-4 pt-16 p-2">
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Survey Name</h5>
                            <p className="text-gray-500">{survey_title}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Store ID</h5>
                            <p className="text-gray-500">{store_id}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Region</h5>
                            <p className="text-gray-500">{region}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Loyalty Tier</h5>
                            <p className="text-gray-500">{loyalty_tier}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Status</h5>
                            <p className={isActive ? "text-green" : "text-red"}>
                                {isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        )
    }

    return (
        <div className="p-4 pb-24">
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
                {surveyData?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
                <div key={survey_id} className="bg-white p-2 h-[500px] w-full rounded-lg shadow border-2 flex items-center justify-center text-sm text-gray-500 font-medium relative">
                    <div className='w-full h-[80%] flex flex-col justify-center items-center gap-2'>
                        <h2 className='text-center text-base md:text-lg text-purple'>{survey_title}</h2>
                        <h2 className='text-center text-base md:text-lg'>Survey Results</h2>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                width={500}
                                height={300}
                                // data={data}
                                data={surveyResponse}
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
                                <Bar dataKey="rating_response" fill="#ff2257" background={{ fill: 'transparent' }} />
                                <Bar dataKey="multiple_choice_response" fill="#00d384" background={{ fill: 'transparent' }} />
                                <Bar dataKey="text_response" fill="#FFC400" background={{ fill: 'transparent' }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                ))}
            </div>
            {surveyData?.map(({ survey_id, survey_title, survey_category, store_id, region, loyalty_tier, start_date, expiry_date, isActive }) => (
                <div key={survey_id} className="flex gap-4 pt-16 p-2">
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Survey Name</h5>
                            <p className="text-gray-500">{survey_title}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Store ID</h5>
                            <p className="text-gray-500">{store_id}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Region</h5>
                            <p className="text-gray-500">{region}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Loyalty Tier</h5>
                            <p className="text-gray-500">{loyalty_tier}</p>
                        </div>
                    </div>
                    <div className="w-96">
                        <div className="bg-white rounded p-4">
                            <h5 className="text-lg font-semibold text-purple">Status</h5>
                            <p className={isActive ? "text-green" : "text-red"}>
                                {isActive ? 'Active' : 'Inactive'}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};