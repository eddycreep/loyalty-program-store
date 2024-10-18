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

export const CreateSurveys = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [surveyName, setSurveyName] = useState<string>("");
    const [surveyCategory, setSurveyCategory] = useState<string>("");

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
                <div className="w-[500px] flex flex-col pt-4">
                    <label>Survey Name</label>
                    <input
                        type="input"
                        placeholder="Product Reviews"
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                    />
                </div>
                <div className="w-[500px] flex flex-col pt-4">
                    <label>Survey Category</label>
                    <input
                        type="input"
                        placeholder="Product Reviews"
                        className="w-full p-2 rounded-lg border border-gray-300"
                        value={surveyCategory}
                        onChange={(e) => setSurveyCategory(e.target.value)}
                    />
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
