"use client"

import axios from "axios";
import toast from 'react-hot-toast';
import { useState, useEffect, useCallback } from "react";
import { apiEndPoint, colors } from "@/utils/colors";
import { Save, ShieldAlert, X, XOctagon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SurveyInfo, SurveyInfoResponse, Question } from "@/modules/types/survey/data-types";
import { AgeGroupsResponse, TiersResponse, StoresResponse } from '@/modules/types/data-types'
import { useParams } from "next/navigation";
import SquareCircleLoader from "@/lib/square-circle-loader";

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
    surveyQuestions: SurveyQuestions[]
    surveyQuestionsChoices: SurveyQuestionsChoices[]
}

interface SurveyQuestions {
    question_id: number,
    survey_id: number,
    question_text: string,
    question_type: string
}

interface SurveyQuestionsChoices {
    option_id: number,
    survey_id: number,
    question_id: number,
    option_text: string,
    option_order: number,
}

type SurveyResponse = {
    message: string;
    results: Survey[];
};

export default function EditSurvey() {
    const params = useParams();

    const [questions, setQuestions] = useState<Question[]>([]);
    const [surveyName, setSurveyName] = useState<string>("");
    const [surveyCategory, setSurveyCategory] = useState<string>("");
    const [selectedStore, setSelectedStore] = useState<string>("");
    const [selectedTier, setSelectedTier] = useState("");
    const [startDate, setStartDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isActive, setIsActive] = useState(false);

    const  [loading, setLoading] = useState(false);
    const  [isError, setIsError] = useState(false);

    const [allStores, setAllStores] = useState<StoresResponse>([])
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
    const [surveyInfo, setSurveyInfo] = useState<SurveyInfoResponse>([]);
    const [surveyData, setSurveyData] = useState<Survey[]>([]);
    const [surveyQuestionsData, setSurveyQuestionsData] = useState<SurveyQuestions[]>([]);
    const [surveyQuestionsChoicesData, setSurveyQuestionsChoicesData] = useState<SurveyQuestionsChoices[]>([]);

    // Convert surveyId from params to a number
    const surveyID = Number(params?.survey_id); // Conversion to number

    const getStores = async () => {
        try {
            const url = `inventory/get-stores`
            const response = await axios.get<StoresResponse>(`${apiEndPoint}/${url}`)
            setAllStores(response.data)
        } catch (error) {
            console.error('Error RETURNING STORES:', error)
        }
    }
    
    const getLoyaltyTiers = async () => {
        try {
            const url = `tiers/get-loyalty-tiers`
            const response = await axios.get<TiersResponse>(`${apiEndPoint}/${url}`)
            console.log('TIERS RETURNED !!', response.data)
            setLoyaltyTiers(response.data)
        } catch (error) {
            console.error('Error RETURNING TIERS:', error)
        }
    }
    
    const getAgeGroups = async () => {
        try {
            const url = `age-group/get-age-groups`
            const response = await axios.get<AgeGroupsResponse>(`${apiEndPoint}/${url}`)
            console.log('AGE_GROUPS RETURNED !!', response.data)
            setAgeGroups(response.data)
        } catch (error) {
            console.error('Error RETURNING AGE_GROUPS:', error)
        }
    }

    // Wrap getSurveyData in useCallback
    const getSurveyData = useCallback(async () => {
        try {
            const url = `survey/get-survey-questions-with-choices/${surveyID}`
            const response = await axios.get<SurveyResponse>(`${apiEndPoint}/${url}`)
            console.log('Survey Data: ', response.data)

            if (response?.data?.results && response.data.results.length > 0) {
                setSurveyData(response?.data.results || [])

                // main survey data
                setSurveyName(response?.data.results[0].survey_title)
                setSurveyCategory(response?.data.results[0].survey_category)
                setSelectedStore(response?.data.results[0].store_id)
                setSelectedTier(response?.data.results[0].loyalty_tier)
                setStartDate(response?.data.results[0].start_date)
                setExpiryDate(response?.data.results[0].expiry_date)
                setIsActive(response?.data.results[0].isActive)

                // sub survey data
                setSurveyQuestionsData(response?.data.results[0].surveyQuestions)
                setSurveyQuestionsChoicesData(response?.data.results[0].surveyQuestionsChoices)
            } else {
                console.log('No survey data found', response?.data.results)
                toast.error('No survey data found')
            }
        } catch (error) {
            console.error('Survey Data: ', error)
        }
    }, [surveyID]); // Add surveyID as dependency


    const updateSurvey = async () => {
        try {
            const selectedstore = allStores.find(store => store.code === selectedStore);
            const region = selectedstore ? selectedstore.address_4 : ''; 

            console.log('selected store: ', selectedstore);
            console.log('region: ', region);
    
            const formatDateTime = (value: string): string => {
                const [date, time] = value.split('T'); // Split date and time from 'YYYY-MM-DDTHH:mm'
                return `${date} ${time}:00`; // Append ':00' to match 'HH:mm:ss'
            };
    
            const formattedStartDate = formatDateTime(startDate);
            const formattedExpiryDate = formatDateTime(expiryDate);


            console.log('startdate: ', formattedStartDate);
            console.log('enddate: ', formattedExpiryDate);


            const payload = {
                survey_title: surveyName,
                survey_category: surveyCategory,
                store_id: selectedStore,
                region: region,
                loyalty_tier: selectedTier,
                start_date: formattedStartDate,
                expiry_date: formattedExpiryDate,
                isActive: true
                // isActive: isActive
            }

            const url = `survey/update-survey/${surveyID}`
            const response = await axios.patch<SurveyResponse>(`${apiEndPoint}/${url}`, payload)
            console.log('Survey Updated: ', response.data)
        } catch (error) {
            console.error('Error updating survey:', error)
            toast.error('Survey Not Updated', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    const updateSurveyQuestions = async (surveyData: SurveyInfo) => {
        try {
            // Filter out incomplete or invalid questions
            const validQuestions = questions.filter((q) => q.question && q.action);
            if (!validQuestions.length) {
                toast.error('No valid questions to save.');
                return;
            }

            // Prepare payloads
            const questionPayloads = validQuestions.map((q) => ({
                // survey_id: surveyData.survey_id,
                // question_text: q.question.trim(),
                question_type: q.action.trim(),
            }));

            // Use a bulk API call instead of looping (if supported by the backend)
            const url = `survey/save-survey-questions`;
            const response = await axios.post(`${apiEndPoint}/${url}`, questionPayloads);

            if (response.status === 201 || response.status === 200) {
                console.log('Questions saved successfully:', response.data);
                toast.success('Survey Saved Successfully!');
                //logUserActivity(surveyData);
            } else {
                throw new Error('Failed to save questions');
            }
        } catch (error) {
            console.error('Error Saving Survey:', error)
            toast.error('Survey Not Saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
                style: {
                    backgroundColor: 'black',
                    color: 'white', 
                },
            });
        }
    }


    useEffect(() => {
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
    }, []);

    useEffect(() => {
        getSurveyData();
    }, [getSurveyData]); // Update dependency array to include getSurveyData

    if (loading) {
        return (
            <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4">
                <div className="flex justify-between pt-4">
                    <div>
                        <h4 className="text-purple font-bold">Edit Survey</h4>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                    <div className="">
                                        <button onClick={() => updateSurvey()}className="bg-green hover:bg-emerald-300 text-white h-10 w-16 rounded flex items-center justify-center">
                                            <Save />
                                        </button>
                                    </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                            <p>Update Survey</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
                <div className="min-h-[200px] w-full flex flex-col items-center py-20 justify-center">
                    <SquareCircleLoader />
                    <p className="text-gray-500 uppercase pt-4">Loading data, please be patient.</p>
                </div>
            </div>
        </div>
        )
    }
    
    if (isError) {
        return (
            <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4">
                <div className="flex justify-between pt-4">
                    <div>
                        <h4 className="text-purple font-bold">Edit Survey</h4>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                    <div className="">
                                        <button onClick={() => updateSurvey()}className="bg-green hover:bg-emerald-300 text-white h-10 w-16 rounded flex items-center justify-center">
                                            <Save />
                                        </button>
                                    </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                            <p>Update Survey</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
                <div className="min-h-[200px] w-full flex flex-col items-center py-20 justify-center">
                    <XOctagon size={34} />
                    <p className="ml-2 uppercase pt-2 text-red">An error occured when fetching survey data</p>
                </div>
            </div>
        </div>
        )
    }
    
    if (surveyQuestionsData?.length === 0) {
        return (
            <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4">
                <div className="flex justify-between pt-4">
                    <div>
                        <h4 className="text-purple font-bold">Edit Survey</h4>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                    <div className="">
                                        <button onClick={() => updateSurvey()}className="bg-green hover:bg-emerald-300 text-white h-10 w-16 rounded flex items-center justify-center">
                                            <Save />
                                        </button>
                                    </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                            <p>Update Survey</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center py-20 w-full">
                    <ShieldAlert size={34} />
                    <p className="ml-2 uppercase pt-2 text-green">The survey has no responses yet or is inactive</p>
                </div>
            </div>
        </div>
        )
    }

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-4">
                <div className="flex justify-between pt-4">
                    <div>
                        <h4 className="text-purple font-bold">Edit Survey</h4>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                    <div className="">
                                        <button onClick={() => updateSurvey()}className="bg-green hover:bg-emerald-300 text-white h-10 w-16 rounded flex items-center justify-center">
                                            <Save />
                                        </button>
                                    </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                            <p>Update Survey</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="w-[350px] flex flex-col pt-3">
                        <label>Survey Title:</label>
                        <input
                            type="input"
                            placeholder="enter survey title"
                            className="w-full h-12 p-2 rounded-lg border border-gray-300"
                            value={surveyName}
                            onChange={(e) => setSurveyName(e.target.value)}
                        />
                    </div>
                    <div className="w-[350px] flex flex-col pt-4">
                        <label>Survey Category:</label>
                        <select
                            className="w-full h-12 p-2 rounded-lg border border-gray-300"
                            value={surveyCategory}
                            onChange={(e) => setSurveyCategory(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Products">Products</option>
                            <option value="Staff">Staff</option>
                            <option value="Store">Store</option>
                        </select>
                    </div>
                    <div className="w-[350px] flex flex-col pt-4">
                        <label>Store ID:</label>
                        <select
                            className="w-full h-12 p-2 rounded-lg border border-gray-300"
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
                    <div className="w-[350px] flex flex-col pt-4">
                        <label>Loyalty Tiers:</label>
                        <select
                            className="w-full h-12 p-2 rounded-lg border border-gray-300"
                            value={selectedTier}
                            onChange={(e) => setSelectedTier(e.target.value)}
                        >
                            <option value="All">All</option>
                            {loyaltyTiers.map((loyalty) => (
                                <option key={loyalty.tier_id} value={loyalty.tier}>
                                    {loyalty.tier}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex gap-4 pt-10">
                    <div className="w-[350px] flex flex-col pt-4">
                        <label>Start Date:</label>
                        <input 
                            type="datetime-local" 
                            name="start-date"
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)}
                            className="w-full h-12 p-2 rounded-lg border border-gray-300">
                        </input>
                    </div>
                    <div className="w-[350px] flex flex-col pt-4">
                        <label>Expiry Date:</label>
                        <input 
                            type="datetime-local" 
                            name="expiry-date"
                            value={expiryDate} 
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full h-12 p-2 rounded-lg border border-gray-300">
                        </input>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex flex-col space-x-2 pt-4">
                          <label htmlFor="active-toggle">
                            Active
                          </label>
                          <div>
                            <div className="toggle-switch">
                                <input className="toggle-input" id="toggle" type="checkbox"/>
                                <label className="toggle-label" id="toggle"></label>
                            </div>
                          </div>
                      </div>
                  </div>
                </div>
                <div className="py-10">
                    <div className="border-purple border-t-2 py-4">
                        <div>
                            <h5 className="text-purple font-bold">Questions</h5>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {surveyQuestionsData?.map(({ question_id, question_text, question_type }, index) => (
                                <div key={question_id} className="flex flex-col pt-3">
                                    <label>Question {index + 1}:</label>
                                    <input
                                        type="input"
                                        placeholder="Enter question"
                                        className="w-full h-12 p-2 rounded-lg border border-gray-300"
                                        value={question_text}
                                        onChange={(e) => setSurveyName(e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="pb-8">
                    <div className="border-purple border-t-2 py-4">
                        <div>
                            <h5 className="text-purple font-bold">Multiple Choice Options</h5>
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {surveyQuestionsChoicesData?.map(({ option_id, question_id, option_text, option_order }) => (
                                <div key={option_id} className="flex flex-col pt-3">
                                    <label>Options for {question_id}:</label>
                                    <input
                                        type="input"
                                        placeholder="Enter option"
                                        className="w-full h-12 p-2 rounded-lg border border-gray-300"
                                        value={option_text}
                                        onChange={(e) => setSurveyName(e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};