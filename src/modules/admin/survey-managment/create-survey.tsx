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
import { Rewards, RewardInfo, RewardInfoResponse } from '@/modules/types/rewards/rewards-data'
import EditSurvey from "./edit-survey";
import { useSession } from '@/context';
import { apiClient } from "@/utils/api-client";
import { Organisation } from "@/modules/types/organisation/organisation-types";
import { Branch } from "@/modules/types/branch/branches-types";
import { getOrganisations } from "@/components/data/organisation/get-organisations-data";
import { getBranches } from "@/components/data/branch/get-branches-data";


export const CreateSurveys = () => {
    const { user } = useSession();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [surveyName, setSurveyName] = useState<string>("");
    const [surveyCategory, setSurveyCategory] = useState<string>("");
    const [selectedStore, setSelectedStore] = useState<string>("");
    const [selectedTier, setSelectedTier] = useState("");
    const [startDate, setStartDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [reward, setReward] = useState("");
    const [description, setDescription] = useState("");

    // store whats selected
    const [selectedOrganisation, setSelectedOrganisation] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("");

    const [allStores, setAllStores] = useState<StoresResponse>([]);
    const [loyaltyTiers, setLoyaltyTiers] = useState<TiersResponse>([]);
    const [ageGroups, setAgeGroups] = useState<AgeGroupsResponse>([]);
    const [surveyInfo, setSurveyInfo] = useState<SurveyInfoResponse>([]);

    //organisations x branches data
    const [organisations, setOrganisations] = useState<Organisation[] | null>(null);
    const [branches, setBranches] = useState<Branch[] | null>(null);

    const getStores = async () => {
        try {
            const url = `inventory/get-stores`
            const response = await apiClient.get(url)
            setAllStores(response.data)
        } catch (error) {
            console.error('Error RETURNING STORES:', error)
        }
    }
    
    const getLoyaltyTiers = async () => {
        try {
            const url = `tiers/get-loyalty-tiers`
            const response = await apiClient.get(url)
            console.log('TIERS RETURNED !!', response.data)
            setLoyaltyTiers(response.data)
        } catch (error) {
            console.error('Error RETURNING TIERS:', error)
        }
    }
    
    const getAgeGroups = async () => {
        try {
            const url = `age-group/get-age-groups`
            const response = await apiClient.get(url) 
            console.log('AGE_GROUPS RETURNED !!', response.data)
            setAgeGroups(response.data)
        } catch (error) {
            console.error('Error RETURNING AGE_GROUPS:', error)
        }
    }

    const getAllOrganisations = async () => {
        try {
            const orgData = await getOrganisations()
            setOrganisations(orgData)
            console.log("all organisations returned bro: ", orgData)
        } catch (error) {
            console.error('error fetching all organisations bro:', error)
        }
    }

    const getAllBranches = async () => {
        try {
            const branchesData = await getBranches()
            setBranches(branchesData)
            console.log("all branches returned bro: ", branchesData)
        } catch (error) {
            console.error('error fetching all branches bro:', error)
        }
    }

    const addQuestion = () => {
        // Check if the maximum limit of 5 questions has been reached
        if (questions.length >= 5) {
            // Display a message indicating no more questions can be added
            toast.error('You can only add up to 5 questions.', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
            return;
        }
        // Increment the question number and add a new question to the list
        //const newQuestionNumber = questions.length + 1;
        setQuestions([...questions, { question: "", answer: "", action: "", options: [] }]);
    };

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

    const saveSurvey = async () => {
        try {
            const formatDateTime = (value: string): string => {
                const [date, time] = value.split('T'); // Split date and time from 'YYYY-MM-DDTHH:mm'
                return `${date} ${time}:00`; // Append ':00' to match 'HH:mm:ss'
            };
    
            const formattedStartDate = formatDateTime(startDate);
            const formattedExpiryDate = formatDateTime(expiryDate);
            console.log('startdate: ', formattedStartDate);
            console.log('enddate: ', formattedExpiryDate);

            // Removed: newOrgId — organisationId is implicit via private DB connection in multi-tenancy
            const newBrId = Number(selectedBranch);
            console.log('br id: ', newBrId);
            console.log('selected region: ', selectedRegion);

            // Fixed: frontend payload no longer sends organisationId — implicit via private DB connection
            const payload = {
                survey_title: surveyName,
                survey_category: surveyCategory,
                description: description,
                store_id: selectedStore,
                region: selectedRegion || 'All', // Use selected region or default to 'All'
                loyalty_tier: selectedTier,
                start_date: formattedStartDate,
                expiry_date: formattedExpiryDate,
                isActive: true,
                reward: reward,
                // Removed: organisationId — implicit via private DB connection in multi-tenancy
                branchId: newBrId
            }

            const url = `survey/save-survey`
            const response = await apiClient.post(url, payload)
            console.log("response on saving survey: ", response.data)

            await getSurveyInfo();
        } catch (error) {
            console.error('Error saving survey:', error)
            toast.error('Survey Not Saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    const getSurveyInfo = async () => {
        try {
            const url = `survey/get-survey-id/${surveyName}`
            const response = await apiClient.get(url)
            setSurveyInfo(response?.data);

            await saveSurveyQuestions(response.data[0]);
        } catch (error) {
            console.log('Error getting survey info: ', error);
        }
    }

    const saveSurveyQuestions = async (surveyData: SurveyInfo) => {
        try {
            // Filter out incomplete or invalid questions
            const validQuestions = questions.filter((q) => q.question && q.action);
            if (!validQuestions.length) {
                toast.error('No valid questions to save.');
                return;
            }

            // Prepare payloads
            const questionPayloads = validQuestions.map((q) => ({
                survey_id: surveyData.survey_id,
                question_text: q.question.trim(),
                question_type: q.action.trim(),
            }));

            // Wrap the array in an object to match the DTO structure
            const payload = {
                questions: questionPayloads
            };

            // Save questions and get back saved questions with IDs
            const url = `survey/save-survey-questions`;
            const response = await apiClient.post(url, payload)
            console.log("saving survey questions successful: ", response.data)

            // Get saved questions with their IDs from response
            const savedQuestions = response.data?.questions || [];
            
            // Now save choices for multiple-choice questions
            if (savedQuestions.length > 0) {
                await saveSurveyChoices(surveyData.survey_id, validQuestions, savedQuestions);
            }

            toast.success('Survey Saved Successfully!');
            logUserActivity(surveyData);
        } catch (error) {
            console.error('Error Saving Survey:', error)
            toast.error('Survey Questions Not Saved', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
                style: {
                    backgroundColor: 'black',
                    color: 'white', 
                },
            });
        }
    }

    // Save choices for multiple-choice questions
    const saveSurveyChoices = async (surveyId: number, validQuestions: Question[], savedQuestions: any[]) => {
        try {
            const choicesToSave: any[] = [];

            // Map through valid questions and match with saved questions by index
            validQuestions.forEach((question, index) => {
                // Only save choices for Multiple Choice questions
                if (question.action === 'Multiple Choice' && question.options && question.options.length > 0) {
                    const savedQuestion = savedQuestions[index];
                    if (savedQuestion && savedQuestion.question_id) {
                        // Create choice entries for each option
                        question.options.forEach((optionText, optionIndex) => {
                            if (optionText && optionText.trim()) {
                                choicesToSave.push({
                                    survey_id: surveyId,
                                    question_id: savedQuestion.question_id,
                                    option_text: optionText.trim(),
                                    option_order: optionIndex + 1
                                });
                            }
                        });
                    }
                }
            });

            // Save choices in bulk if there are any
            if (choicesToSave.length > 0) {
                const choicesPayload = {
                    choices: choicesToSave
                };
                const url = `survey/save-survey-choices-bulk`;
                const response = await apiClient.post(url, choicesPayload);
                console.log("saving survey choices successful: ", response.data);
            }
        } catch (error) {
            console.error('Error Saving Survey Choices:', error);
            // Don't show error toast here to avoid confusing the user - questions were saved successfully
        }
    }

    const logUserActivity = async (surveyData: SurveyInfo) => {
        const message = "User created a new survey";
    
        try {
            const payload = {
                emp_id: user.uid,
                emp_name: user.emp_name,
                activity_id: surveyData.survey_id,
                activity: surveyData.survey_title,
                activity_type: surveyData.survey_category,
                log_message: message
            };
    
            const url = `logs/log-user-activity`;
            // const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
            const response = await apiClient.post(url, payload) // Note: no need for full URL since apiClient has baseURL
            console.log('The Users activity has been logged!', response.data);

            // toast.success('Activity Logged Successufully', {
            //     icon: <Check color={colors.green} size={24} />,
            //     duration: 3000,
            //     style: {
            //         backgroundColor: 'black',
            //         color: 'white', 
            //     },
            // });
        } catch (error) {
            console.error('Error logging surevy activity:', error);
            // toast.error('Activity Not Logged', {
            //     icon: <X color={colors.red} size={24} />,
            //     duration: 3000,
            //     style: {
            //         backgroundColor: 'black',
            //         color: 'white', 
            //     },
            // });
        }
    };


    useEffect(() => {
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
        getAllOrganisations();
        getAllBranches();
    }, []);

    const userOrganisation = user?.organisation?.name
    const userOrganisationUid = user?.organisation?.uid

    return (
        <div className="pb-20">
            <div className="flex justify-between pt-10">
                <div>
                    <h4 className="text-xl font-semibold text-purple">Create Survey</h4>
                </div>
                <div>
                    <div className="flex gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="">
                                        <button onClick={addQuestion} className="flex justify-center items-center w-16 h-9 text-white bg-gray-400 rounded hover:bg-gray-300">
                                            <HelpCircle />
                                        </button>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                        <p>Add Question</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                <div className="">
                                    <button onClick={ saveSurvey } className="flex justify-center items-center w-16 h-10 text-white rounded bg-green hover:bg-emerald-300">
                                        <Save />
                                    </button>
                                </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                        <p>Save Survey</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="">
                                        <SurveySheet questions={questions} surveyName={surveyName} surveyCategory={surveyCategory} />
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                        <p>Preview</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            <div className="flex gap-4">
                {/* Survey Title */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Survey Title</label>
                    <input
                        type="input"
                        placeholder="enter survey title"
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                    />
                </div>

                {/* Survey Category */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Survey Category</label>
                    <select
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                        onChange={(e) => setSurveyCategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Products">Products</option>
                        <option value="Loyalty">Loyalty</option>
                        <option value="Store">Store</option>
                    </select>
                </div>

                {/* Store ID */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Store ID</label>
                    <select
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
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

                {/* Loyalty Tiers */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Loyalty Tiers</label>
                    <select
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
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

            {/* 2nd Row */}
            <div className="flex gap-4 pt-10">
                {/* Start Date */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Start Date:</label>
                    <input 
                        type="datetime-local" 
                        name="start-date"
                        value={startDate} 
                        onChange={(e) => setStartDate(e.target.value)}
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300">
                    </input>
                </div>

                {/* Expiry Date */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Expiry Date:</label>
                    <input 
                        type="datetime-local" 
                        name="expiry-date"
                        value={expiryDate} 
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300">
                    </input>
                </div>

                {/* Organisation */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Organisation</label>
                    <select
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                        value={selectedOrganisation}
                        onChange={(e) => setSelectedOrganisation(e.target.value)}
                    >
                        <option value="All">All</option>
                        {/* {organisations && organisations.map((organisation) => ( */}
                            <option key={userOrganisationUid} value={userOrganisationUid.toString()}>
                                {userOrganisation}
                            </option>
                        {/* // ))} */}
                    </select>
                </div>

                {/* Branch */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Branch</label>
                    <select
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                    >
                        <option value="All">All</option>
                        {branches && Array.isArray(branches) && branches.length > 0 && branches.map((branch) => (
                            <option key={branch.uid} value={branch.uid.toString()}>
                                {branch.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* 3rd Row */}
            <div className="flex gap-4 pt-10">
                {/* Reward */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Reward</label>
                    <input
                        type="input"
                        placeholder="enter reward"
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Description</label>
                    <input
                        type="input"
                        placeholder="enter description"
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {/* Region */}
                <div className="w-[350px] flex flex-col pt-4">
                    <label className="text-black">Region</label>
                    <select
                        className="p-2 w-full h-12 text-black bg-white rounded-lg border border-gray-300"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="All">All</option>
                        {Array.from(new Set(allStores.map(store => store.address_4).filter(Boolean))).map((region) => (
                            <option key={region} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {questions.map((q, index) => (
                <div key={index}>
                    <div className="flex pt-4">
                        <div className="w-[500px] flex flex-col pt-4">
                            <label>{`Question ${index + 1}`}</label>
                            <input
                                type="input"
                                placeholder="Enter your question here..."
                                className="p-2 w-full text-black bg-white rounded-lg border border-gray-300"
                                value={q.question}
                                onChange={(e) => updateQuestionText(index, e.target.value)}
                            />
                        </div>
                        <div className="pt-12 pl-6 cursor-pointer" onClick={() => removeQuestion(index)}>
                            <div className="w-full border border-red">
                                <X color="red" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-[300px] flex flex-col pt-4">
                            <label>Action</label>
                            <select
                                className="p-2 w-full text-black bg-white rounded-lg border border-gray-300"
                                value={q.action}
                                onChange={(e) => {
                                    const updatedQuestions = [...questions];
                                    updatedQuestions[index].action = e.target.value;
                                    setQuestions(updatedQuestions);
                                }}
                            >
                                <option value="">Answer Type</option>
                                <option value="Text">Text</option>
                                <option value="Rating">Rating</option>
                                <option value="Multiple Choice">Multiple Choice</option>
                            </select>
                        </div>
                    </div>

                    {q.action === "Multiple Choice" && (
                        <div className="flex gap-2 pt-4">
                            {[...Array(3)].map((_, optionIndex) => (
                                <div key={optionIndex} className="w-[300px] flex flex-col pt-4">
                                    <label>{`Option ${optionIndex + 1}`}</label>
                                    <input
                                        type="input"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        className="p-2 w-full text-black bg-white rounded-lg border border-gray-300"
                                        value={q.options?.[optionIndex] || ""}
                                        onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};