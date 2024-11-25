"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { apiEndPoint, colors } from "@/utils/colors";
import toast from "react-hot-toast";
import { X, Check, Save } from "lucide-react";
import { Label } from "@/components/ui/label";

interface SurveyProps {
    survey_title: string,
    survey_category: string,
    store_id: string,
    loyalty_tier: string,
    start_date: string,
    expiry_date: string,
    isActive: number
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

export const EditSurvey = () => {
    const [surveyName, setSurveyName] = useState("");
    const [surveyCategory, setSurveyCategory] = useState("");
    const [selectedStore, setSelectedStore] = useState("");
    const [selectedTier, setSelectedTier] = useState("");
    const [startDate, setStartDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [isActive, setIsActive] = useState(false);

    const updateSurvey = async (surveyID: number) => {
        try {
            const url = `admin/updatesurvey/${surveyID}`
            const response = await axios.patch<SurveyProps>(`${apiEndPoint}/${url}`)
            console.log("Updated Survey Successfully", response)

            toast.success("Updated Survey Successfully", {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });
        } catch (error) {
            console.error("Error updating survey:", error)
            toast.error("Error Updating Survey", {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    const updateSurveyQuestions = async (surveyID: number) => {
        try {
            const url = `admin/updatesurveyquestions/${surveyID}`
            const response = await axios.patch<SurveyProps>(`${apiEndPoint}/${url}`)
            console.log("Updated Survey Successfully", response)

            toast.success("Updated Survey Questions Successfully", {
                icon: <Check color={colors.green} size={24} />,
                duration: 3000,
            });
        } catch (error) {
            console.error("Error updating survey:", error)
            toast.error("Error Updating Survey Questions", {
                icon: <X color={colors.red} size={24} />,
                duration: 3000,
            });
        }
    }

    return (
        <div>
            <div className="border-b-2 border-rose-300 p-4">
                <div className="flex gap-6 pt-6">
                    <h4 className="text-red font-bold">Edit Surveys</h4>
                    {/* <p className="text-gray-500 font-bold pt-1">18</p> */}
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
                        <label>Loyalty Tiers</label>
                        <select
                            className="w-full p-2 rounded-lg border border-gray-300"
                            // value={selectedTier}
                            // onChange={(e) => setSelectedTier(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Gold">Gold</option>
                            <option value="Diamond">Diamond</option>
                            <option value="Platinum">Platinum</option>
                        </select>
                    </div>
                    <div className="w-[270px] pt-4">
                        <Label htmlFor="username" className="text-left pt-4">
                            Start Date:
                        </Label>
                        <input type="date" onChange={(e) => setStartDate(e.target.value)} className='w-full h-10 p-2 rounded-lg border border-gray-300'/>
                    </div>
                    <div className="w-[270px] pt-4">
                        <Label htmlFor="username" className="text-left pt-4">
                            Expiry Date:
                        </Label>
                        <input type="date" onChange={(e) => setExpiryDate(e.target.value)} className='w-full h-10 p-2 rounded-lg border border-gray-300'/>
                    </div>
                </div>
            </div>
            <div className="p-4">
            <div className="flex gap-4">
                <div className="w-[400px] flex flex-col pt-4">
                    <label>Question 1</label>
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
                        <label>Loyalty Tiers</label>
                        <select
                            className="w-full p-2 rounded-lg border border-gray-300"
                            // value={selectedTier}
                            // onChange={(e) => setSelectedTier(e.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Gold">Gold</option>
                            <option value="Diamond">Diamond</option>
                            <option value="Platinum">Platinum</option>
                        </select>
                    </div>
                    <div className="w-[270px] pt-4">
                        <Label htmlFor="username" className="text-left pt-4">
                            Start Date:
                        </Label>
                        <input type="date" onChange={(e) => setStartDate(e.target.value)} className='w-full h-10 p-2 rounded-lg border border-gray-300'/>
                    </div>
                    <div className="w-[270px] pt-4">
                        <Label htmlFor="username" className="text-left pt-4">
                            Expiry Date:
                        </Label>
                        <input type="date" onChange={(e) => setExpiryDate(e.target.value)} className='w-full h-10 p-2 rounded-lg border border-gray-300'/>
                    </div>
                </div>
            </div>
        </div>
    )
}