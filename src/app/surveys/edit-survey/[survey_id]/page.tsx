"use client"

import axios from "axios";
import toast from 'react-hot-toast';
import { useState, useEffect } from "react";
import { SurveySheet } from "@/components/component/survey-sheet";
import { apiEndPoint, colors } from "@/utils/colors";
import { Check, HelpCircle, Save, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { SurveyProps, SurveyInfo, SurveyInfoResponse, Question } from "@/modules/types/survey/data-types";
import { AgeGroupsResponse, TiersResponse, StoresResponse, ProductsResponse, UserActivity } from '@/modules/types/data-types'
import { Rewards, RewardInfo, RewardInfoResponse } from '@/modules/types/rewards/rewards-data';
import { SwitchExtended } from "@/components/ui/switch-extended";
import { useParams } from "next/navigation"; // For Next.js 13



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

    const [allStores, setAllStores] = useState<StoresResponse>([])
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([])
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([])
    const [surveyInfo, setSurveyInfo] = useState<SurveyInfoResponse>([]);
    const [surveyData, setSurveyData] = useState<Survey[]>([]);

    const [mainSurveyData, setMainSurveyData] = useState({
        surveyTitle: "",
        surveyCategory: "",
        storeId: "",
        loyaltyTiers: "",
        startdate: "",
        expirydate: "",
        isActive: false,
    })

    const [surveyQuestionData, setSurveyQuestionsData] = useState({
        questionOne: "",
        questionTwo: "",
        questionThree: "",
        questionFour: "",
        questionFive: "",
    })

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


    const getSurveyData = async () => {
        try {
            const url = `survey/get-survey-questions-with-choices/${surveyID}`
            const response = await axios.get<SurveyResponse>(`${apiEndPoint}/${url}`)
            console.log('Survey Data: ', response.data)

            setSurveyData(response?.data.results || [])
        } catch (error) {
            console.error('Survey Data: ', error)
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


    useEffect(() => {
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
    }, []);

    useEffect(() => {
        getSurveyData();
    }, [surveyID])

    return (
        <div className="min-h-screen px-4 overflow-y-auto">
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
                        onChange={(e) => setMainSurveyData(e.target.value)}
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
            <div className="pt-1">
                <div className="border-purple border-t-2 py-4" />
            </div>
            <div className="">
                <div>
                    <h5 className="text-purple font-bold">Multiple Choice Options</h5>
                </div>
                <div className="flex gap-4">
                    <div className="w-[350px] flex flex-col pt-3">
                        <label>Option 1:</label>
                        <input
                            type="input"
                            placeholder="enter survey title"
                            className="w-full h-12 p-2 rounded-lg border border-gray-300"
                            value={surveyName}
                            onChange={(e) => setSurveyName(e.target.value)}
                        />
                    </div>
                    {/* <div className="w-[350px] flex flex-col pt-4">
                        <label>Question 2: (Type)</label>
                        <select
                            className="w-full h-12 p-2 rounded-lg border border-gray-300"
                            onChange={(e) => setSurveyCategory(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Products">Products</option>
                            <option value="Staff">Staff</option>
                            <option value="Store">Store</option>
                        </select>
                    </div> */}
                </div>
            </div>
        </div>
    );
};