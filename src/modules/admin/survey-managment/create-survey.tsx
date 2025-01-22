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


export const CreateSurveys = () => {
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


            const url = `survey/save-survey`
            const response = await axios.post<SurveyResponse>(`${apiEndPoint}/${url}`, payload)
            console.log('The Survey has been saved successfully', response)

            if (response.status === 201) {
                toast.success('Survey Saved Successfully!', {
                    icon: <Check color={colors.green} size={24} />,
                    duration: 3000,
                });
            }

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
            const response = await axios.get<SurveyInfoResponse>(`${apiEndPoint}/${url}`)
            setSurveyInfo(response?.data);
            console.log('Retrieved Survey ID Successfully!', response)

            toast.success('Retrieved Survey ID Successfully!', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

            await saveSurveyQuestions(response.data[0]);
        } catch (error) {
            console.error('Error saving survey ID:', error)
            toast.error('Error Saving Survey ID', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    const saveSurveyQuestions = async (surveyData: SurveyInfo) => {
        try {
            // Map through questions and prepare the payload for each question
            const questionPayloads = questions.map((q) => ({
                survey_id: surveyData.survey_id, // Use the survey ID from the retrieved survey data
                question_text: q.question, // The text of the question
                question_type: q.action, // The type of the question (e.g., Text, Rating, Multiple Choice)
            }));

            console.log('question payload: ', questionPayloads);

            // Loop through the payloads and save each question
            for (const payload of questionPayloads) {
                const url = `survey/save-survey-questions`;
                const response = await axios.post<SurveyResponse>(`${apiEndPoint}/${url}`, payload);
                console.log(`Question Saved Successfully: ${payload.question_text}`, response);
            }

            // const url = `survey/save-survey-questions`
            // const response = await axios.post<SurveyResponse>(`${apiEndPoint}/${url}`, payload)
            // console.log('The Survey Questions have been saved successfully', response)

            toast.success('Survey Questions Saved Successfully!', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });
        } catch (error) {
            console.error('Error Saving Survey Questions:', error)
            toast.error('Error Saving Survey Questions', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    // const logUserActivity = async (bonus: SurveyInfo) => {
    //     const message = "User created a new survey";
    
    //     try {
    //         const payload = {
    //           // emp_id: user.id,
    //           // emp_name: user.emp_name,
    //             emp_id: 102,
    //             emp_name: "Eddy", 
    //             activity_id: bonus.survey_id,
    //             activity: bonus.survey_title,
    //             activity_type: bonus.survey_category,
    //             log_message: message
    //         };
    
    //         const url = `logs/log-user-activity`;
    //         const response = await axios.post<UserActivity>(`${apiEndPoint}/${url}`, payload);
    //         console.log('The Users activity has been logged!', response.data);
    //     } catch (error) {
    //         console.error('Error logging surevy activity:', error);
    //     }
    // };

    // const saveSurveyQuestions = async () => {
    //     try {
    //         const payload = {
    //             // survey_id,
    //             // question_text,
    //             // question_type
    //         }

    //         const url = `survey/save-survey-questions`
    //         const response = await axios.post<SurveyResponse>(`${apiEndPoint}/${url}`, payload)
    //         console.log('The Survey Questions have been saved successfully', response)

    //         toast.success('Survey Questions Saved Successfully!', {
    //             icon: <Check color={colors.green} size={24} />,
    //             duration: 3000,
    //         });
    //     } catch (error) {
    //         console.error('Error Saving Survey Questions:', error)
    //         toast.error('Error Saving Survey', {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         });
    //     }
    // }

    // const saveSurveyChoices = async (questionID: number) => {
    //     try {
    //         // const payload = {
    //         //     choice_id: 
    //         //     question_id
    //         //     choice_text
    //         // }


    //         const url = `admin/savesurveychoices/${questionID}`
    //         const response = await axios.post<SurveyResponse>(`${apiEndPoint}/${url}`)
    //         console.log('The Survey has been saved successfully', response)
    //         toast.success('Survey Saved Successfully!', {
    //             icon: <Check color={colors.green} size={24} />,
    //             duration: 3000,
    //         });
    //     } catch (error) {
    //         console.error('Error saving survey:', error)
    //         toast.error('Error Saving Survey', {
    //             icon: <X color={colors.red} size={24} />,
    //             duration: 3000,
    //         });
    //     }
    // }

    useEffect(() => {
        getStores();
        getLoyaltyTiers();
        getAgeGroups();
    }, []);

    return (
        <div className="px-4 mb-52">
            <div className="flex justify-between px-2 pt-4">
                <div>
                    <h4 className="text-purple font-bold">Create Surveys</h4>
                </div>
                <div>
                    <div className="flex gap-2">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <div className="">
                                        <button onClick={addQuestion} className="bg-gray-400 hover:bg-gray-300 text-white h-9 w-16 rounded flex items-center justify-center">
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
                                    <button onClick={ saveSurvey } className="bg-green hover:bg-emerald-300 text-white h-10 w-16 rounded flex items-center justify-center">
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
                <div className="w-[350px] flex flex-col pt-3">
                    <label>Survey Title</label>
                    <input
                        type="input"
                        placeholder="enter survey title"
                        className="w-full h-12 p-2 rounded-lg border border-gray-300"
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                    />
                </div>
                <div className="w-[350px] flex flex-col pt-4">
                    <label>Survey Category</label>
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
                    <label>Store ID</label>
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
                    <label>Loyalty Tiers</label>
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
            </div>

            {questions.map((q, index) => (
                <div key={index}>
                    <div className="flex pt-4">
                        <div className="w-[500px] flex flex-col pt-4">
                            <label>{`Question ${index + 1}`}</label>
                            <input
                                type="input"
                                placeholder="Enter your question here..."
                                className="w-full p-2 rounded-lg border border-gray-300"
                                value={q.question}
                                onChange={(e) => updateQuestionText(index, e.target.value)}
                            />
                        </div>
                        <div className="pt-12 pl-6 cursor-pointer" onClick={() => removeQuestion(index)}>
                            <div className="border border-red w-full">
                                <X color="red" />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <div className="w-[300px] flex flex-col pt-4">
                            <label>Action</label>
                            <select
                                className="w-full p-2 rounded-lg border border-gray-300"
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
                        <div className="flex pt-4 gap-2">
                            {[...Array(3)].map((_, optionIndex) => (
                                <div key={optionIndex} className="w-[300px] flex flex-col pt-4">
                                    <label>{`Option ${optionIndex + 1}`}</label>
                                    <input
                                        type="input"
                                        placeholder={`Option ${optionIndex + 1}`}
                                        className="w-full p-2 rounded-lg border border-gray-300"
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