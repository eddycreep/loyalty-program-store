"use client"

import { useState } from "react";
import { X } from "lucide-react";
import { SurveySheet } from "@/components/component/survey-sheet";

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
    { id: 4, store_id: 'SOO4', store: 'PLUS DC Nelspruit' },  // Random place added
    { id: 5, store_id: 'SOO5', store: 'PLUS DC Durbanville' },
    { id: 6, store_id: 'SOO6', store: 'PLUS DC Bloemfontein' },  // Random place added
    { id: 7, store_id: 'SOO7', store: 'PLUS DC Cape Town' },
    { id: 8, store_id: 'SOO8', store: 'PLUS DC Pietermaritzburg' },  // Random place added
    { id: 9, store_id: 'SOO9', store: 'PLUS DC East London' },  // Random place added
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

export const CreateSurveys = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [surveyName, setSurveyName] = useState<string>("");
    const [surveyCategory, setSurveyCategory] = useState<string>("");
    const [selectedStore, setSelectedStore] = useState<string>("");
    const [selectedRegion, setSelectedRegion] = useState("");

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

    return (
        <div className="mb-52">
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
                <div className="w-[300px] flex flex-col pt-4">
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
                <div className="w-[300px] flex flex-col pt-4">
                    <label>Regions</label>
                    <select
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="All">All</option>
                        {storeRegions.map((region) => (
                            <option key={region.id} value={region.region}>
                                {region.region}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex gap-2">
                    <div className="pt-10">
                        <button onClick={addQuestion} className="bg-red text-white h-10 rounded p-2">
                            Add Question
                        </button>
                    </div>
                    <div className="pt-10">
                        <SurveySheet questions={questions} surveyName={surveyName} surveyCategory={surveyCategory} />
                    </div>
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
                            <X color="red" />
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
