"use client"

import axios from "axios";
import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import { SurveySheet } from "@/components/component/survey-sheet";
import { apiEndPoint, colors } from "@/utils/colors";
import { Check, HelpCircle, Save, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SurveyProps, SurveyResponse, SurveyInfo, SurveyInfoResponse, Question } from "@/modules/types/survey/data-types";
import { AgeGroupsResponse, TiersResponse, StoresResponse, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Rewards, RewardInfo, RewardInfoResponse } from '@/modules/types/rewards/rewards-data';
import { SwitchExtended } from "@/components/ui/switch-extended";


export default function EditSurvey() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [surveyName, setSurveyName] = useState<string>("");
    const [surveyCategory, setSurveyCategory] = useState<string>("");
    const [selectedStore, setSelectedStore] = useState<string>("");
    const [selectedTier, setSelectedTier] = useState("");
    const [startDate, setStartDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isActive, setIsActive] = useState(false);

    const [allStores, setAllStores] = useState<StoresResponse>([])
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
    const [surveyInfo, setSurveyInfo] = useState<SurveyInfoResponse>([]);

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

    const updateQuestionText = (index: number, text: string) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question = text;
        setQuestions(updatedQuestions);
    };

    const updateOption = (index: number, optionIndex: number, optionText: string) => {
        const updatedQuestions = [...questions];
        if (!updatedQuestions[index].options) {
            updatedQuestions[index].options = [];
        }
        updatedQuestions[index].options![optionIndex] = optionText;
        setQuestions(updatedQuestions);
    };

    const removeQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
    };

    // const saveSurvey = async () => {
    //     try {
    //         const selectedstore = allStores.find(store => store.code === selectedStore);
    //         const region = selectedstore ? selectedstore.address_4 : ''; 

    //         console.log('selected store: ', selectedstore);
    //         console.log('region: ', region);
    
    //         const formatDateTime = (value: string): string => {
    //             const [date, time] = value.split('T'); // Split date and time from 'YYYY-MM-DDTHH:mm'
    //             return `${date} ${time}:00`; // Append ':00' to match 'HH:mm:ss'
    //         };
    
    //         const formattedStartDate = formatDateTime(startDate);
    //         const formattedExpiryDate = formatDateTime(expiryDate);


    //         console.log('startdate: ', formattedStartDate);
    //         console.log('enddate: ', formattedExpiryDate);


    //         const payload = {
    //             survey_title: surveyName,
    //             survey_category: surveyCategory,
    //             store_id: selectedStore,
    //             region: region,
    //             loyalty_tier: selectedTier,
    //             start_date: formattedStartDate,
    //             expiry_date: formattedExpiryDate,
    //             isActive: true
    //             // isActive: isActive
    //         }


    //         const url = `survey/save-survey`
    //         const response = await axios.post<SurveyResponse>(`${apiEndPoint}/${url}`, payload)

    //         await getSurveyInfo();
    //     } catch (error) {
    //         console.error('Error saving survey:', error)
    //         toast.error('Survey Not Saved', {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         });
    //     }
    // }

    // const getSurveyInfo = async () => {
    //     try {
    //         const url = `survey/get-survey-id/${surveyName}`
    //         const response = await axios.get<SurveyInfoResponse>(`${apiEndPoint}/${url}`)
    //         setSurveyInfo(response?.data);

    //         await saveSurveyQuestions(response.data[0]);
    //     } catch (error) {
    //         console.log('Error getting survey info: ', error);
    //     }
    // }

    // const saveSurveyQuestions = async (surveyData: SurveyInfo) => {
    //     try {
    //         // Filter out incomplete or invalid questions
    //         const validQuestions = questions.filter((q) => q.question && q.action);
    //         if (!validQuestions.length) {
    //             toast.error('No valid questions to save.');
    //             return;
    //         }

    //         // Prepare payloads
    //         const questionPayloads = validQuestions.map((q) => ({
    //             survey_id: surveyData.survey_id,
    //             question_text: q.question.trim(),
    //             question_type: q.action.trim(),
    //         }));

    //         // Use a bulk API call instead of looping (if supported by the backend)
    //         const url = `survey/save-survey-questions`;
    //         const response = await axios.post(`${apiEndPoint}/${url}`, questionPayloads);

    //         if (response.status === 201 || response.status === 200) {
    //             console.log('Questions saved successfully:', response.data);
    //             toast.success('Survey Saved Successfully!');
    //             logUserActivity(surveyData);
    //         } else {
    //             throw new Error('Failed to save questions');
    //         }
    //     } catch (error) {
    //         console.error('Error Saving Survey:', error)
    //         toast.error('Survey Not Saved', {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //             style: {
    //                 backgroundColor: 'black',
    //                 color: 'white', 
    //             },
    //         });
    //     }
    // }

    // const logUserActivity = async (surveyData: SurveyInfo) => {
    //     const message = "User created a new survey";
    
    //     try {
    //         const payload = {
    //           // emp_id: user.id,
    //           // emp_name: user.emp_name,
    //             emp_id: 102,
    //             emp_name: "Eddy", 
    //             activity_id: surveyData.survey_id,
    //             activity: surveyData.survey_title,
    //             activity_type: surveyData.survey_category,
    //             log_message: message
    //         };
    
    //         const url = `logs/log-user-activity`;
    //         const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
    //         console.log('The Users activity has been logged!', response.data);

    //         toast.success('Activity Logged Successufully', {
    //             icon: <Check color={colors.green} size={24} />,
    //             duration: 3000,
    //             style: {
    //                 backgroundColor: 'black',
    //                 color: 'white', 
    //             },
    //         });
    //     } catch (error) {
    //         console.error('Error logging surevy activity:', error);
    //         toast.error('Activity Not Logged', {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //             style: {
    //                 backgroundColor: 'black',
    //                 color: 'white', 
    //             },
    //         });
    //     }
    // };

    useEffect(() => {
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
    }, []);

    return (
        <div className="h-screen">
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
                                    <button className="bg-green hover:bg-emerald-300 text-white h-10 w-16 rounded flex items-center justify-center">
                                        <Save />
                                    </button>
                                </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                        <p>Save Survey</p>
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
                    <div className="flex gap-4">
                        <div className="w-[350px] flex flex-col pt-3">
                            <label>Question 1:</label>
                            <input
                                type="input"
                                placeholder="enter survey title"
                                className="w-full h-12 p-2 rounded-lg border border-gray-300"
                                value={surveyName}
                                onChange={(e) => setSurveyName(e.target.value)}
                            />
                        </div>
                        <div className="w-[350px] flex flex-col pt-4">
                            <label>Question 1: (Type)</label>
                            <select
                                className="w-full h-12 p-2 rounded-lg border border-gray-300"
                                onChange={(e) => setSurveyCategory(e.target.value)}
                            >
                                <option value="All">All</option>
                                <option value="Products">Products</option>
                                <option value="Staff">Staff</option>
                                <option value="Store">Store</option>
                            </select>
                        </div>
                        <div className="w-[350px] flex flex-col pt-4">
                            <label>Question 2:</label>
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
                            <label>Question 2: (Type)</label>
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
                            <label>Question 3:</label>
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
                            <label>Question 3: (Type)</label>
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
                        <div className="w-[350px] flex flex-col pt-4">
                            <label>Question 4:</label>
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
                            <label>Question 4: (Type)</label>
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
                            <label>Question 5:</label>
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
                            <label>Question 5: (Type)</label>
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
                </div>
            </div>
            <div className="py-6">
                <div className="border-purple border-t-2 py-4" />
            </div>
        </div>
    );
};