"use client"

import axios from "axios";
import toast from 'react-hot-toast';
import { useState } from "react";
import { SurveySheet } from "@/components/component/survey-sheet";
import { apiEndPoint, colors } from "@/utils/colors";
import { Check, HelpCircle, Save, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"


interface SurveyProps {
    survey_title: string,
    survey_category: string,
    store_id: string,
    loyalty_tier: string,
    start_date: string,
    expiry_date: string,
    isActive: number,
}
type SurveyResponse = SurveyProps[]

interface SurveyIDProps {
    survey_id: number,
}
type SurveyIDResponse = SurveyIDProps[]

interface Question {
    question: string;
    answer: string;
    action: string;
    options?: string[];
}

const stores = [
    { id: 1, store_id: 'SOO1', store: 'PLUS DC Stellenbosch' },
    { id: 2, store_id: 'SOO2', store: 'PLUS DC Albertin' },
    { id: 3, store_id: 'SOO3', store: 'PLUS DC Bellville' },
    { id: 4, store_id: 'SOO4', store: 'PLUS DC Nelspruit' },
    { id: 5, store_id: 'SOO5', store: 'PLUS DC Durbanville' },
    { id: 6, store_id: 'SOO6', store: 'PLUS DC Bloemfontein' },
    { id: 7, store_id: 'SOO7', store: 'PLUS DC Cape Town' },
    { id: 8, store_id: 'SOO8', store: 'PLUS DC Pietermaritzburg' },
    { id: 9, store_id: 'SOO9', store: 'PLUS DC East London' },
    { id: 10, store_id: 'SOO10', store: 'PLUS DC Pretoria' },
    { id: 11, store_id: 'SOO11', store: 'PLUS DC Germiston' },
    { id: 12, store_id: 'SOO12', store: 'PLUS DC Polokwane' },
];

//const regions = ['Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo', 'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape'];
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

const ageGroup = [
    { id: 1, age_range: '18-24', name: 'Young Adults' },
    { id: 2, age_range: '25-34', name: 'Adults' },
    { id: 3, age_range: '35-44', name: 'Middle-Aged Adults' },
    { id: 4, age_range: '45-50', name: 'Older Middle-Aged Adults' },
    { id: 5, age_range: '50+', name: 'Seniors' },
];

export const CreateSurveys = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [surveyName, setSurveyName] = useState<string>("");
    const [surveyCategory, setSurveyCategory] = useState<string>("");
    const [selectedStore, setSelectedStore] = useState<string>("");
    const [selectedTier, setSelectedTier] = useState("");
    const [startDate, setStartDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isActive, setIsActive] = useState(false);


    const [surveyID, setSurveyID] = useState<SurveyIDResponse>([]);

    const addQuestion = () => {
        const newQuestionNumber = questions.length + 1;
        setQuestions([...questions, { question: `Question ${newQuestionNumber}`, answer: "", action: "", options: [] }]);
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
            const payload = {
                survey_title: surveyName,
                survey_category: surveyCategory,
                store_id: selectedStore,
                loyalty_tier: selectedTier,
                start_date: startDate,
                expiry_date: expiryDate,
                isActive: isActive
            }


            const url = `admin/savesurvey`
            const response = await axios.post<SurveyResponse>(`${apiEndPoint}/${url}`, payload)
            console.log('The Survey has been saved successfully', response)
            toast.success('Survey Saved Successfully!', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

            await getSurveyID(surveyName);
        } catch (error) {
            console.error('Error saving survey:', error)
            toast.error('Error Saving Survey', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }


    const getSurveyID = async (surveyTitle: string) => {
        try {
            const url = `admin/getsurveyid/:${surveyTitle}`
            const response = await axios.post<SurveyIDResponse>(`${apiEndPoint}/${url}`)
            setSurveyID(response?.data);
            console.log('Retrieved Survey ID Successfully!', response)

            toast.success('Retrieved Survey ID Successfully!', {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });

            //await saveSurveyQuestions(response?.data.survey_id)
        } catch (error) {
            console.error('Error saving survey ID:', error)
            toast.error('Error Saving Survey ID', {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    // const saveSurveyQuestions = async (surveyID: number) => {
    //     try {
    //         const payload = {
    //             survey_id: ,
    //             question_text: ,
    //             question_type: ,
    //         }


    //         const url = `admin/savesurveyquestions/${surveyID}`
    //         const response = await axios.post<SurveyResponse>(`${apiEndPoint}/${url}`, payload)
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

    return (
        <div className="px-4 mb-52">
            <div className="pt-4">
                <h4 className="text-red font-bold">Create Surveys</h4>
            </div>
            <div className="flex gap-4">
                <div className="w-[300px] flex flex-col pt-4">
                    <label>Survey Title</label>
                    <input
                        type="input"
                        placeholder="enter survey title"
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                    />
                </div>
                <div className="w-[300px] flex flex-col pt-4">
                    <label>Survey Category</label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        onChange={(e) => setSurveyCategory(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Products">Products</option>
                        <option value="Staff">Staff</option>
                        <option value="Store">Store</option>
                    </select>
                </div>
                <div className="w-[200px] flex flex-col pt-4">
                    <label>Store ID</label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                    >
                        <option value="All">All</option>
                        {stores.map((store) => (
                            <option key={store.id} value={store.store_id}>
                                {/* {store.store}  */}
                                {store.store_id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-[200px] flex flex-col pt-4">
                    <label>Loyalty Tiers</label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedTier}
                        onChange={(e) => setSelectedTier(e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="Gold">Gold</option>
                        <option value="Diamond">Diamond</option>
                        <option value="Platinum">Platinum</option>
                    </select>
                </div>
                <div className="flex gap-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <div className="pt-10">
                                    <button onClick={addQuestion} className="bg-red text-white h-10 w-16 rounded flex items-center justify-center">
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
                            <div className="pt-10">
                                <button onClick={ saveSurvey } className="bg-red text-white h-10 w-16 rounded flex items-center justify-center">
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
                                <div className="pt-10">
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

            {questions.map((q, index) => (
                <div key={index}>
                    <div className="flex pt-4">
                        <div className="w-[500px] flex flex-col pt-4">
                            <label>{`Question ${index + 1}`}</label>
                            <input
                                type="input"
                                placeholder={`Enter Question ${index + 1}`}
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
