"use client"

import axios from "axios";
import moment from "moment";
import { isEmpty } from "lodash";
import Validator from 'validatorjs';
import { toast } from "react-hot-toast";
import { useRef, useState, FormEvent } from "react";
import { Edit, Brush, PenTool, PenToolIcon, Pencil } from "lucide-react";
import { ViewDeatiledSurvey } from "./view-detailed-survey";
import { useRouter } from 'next/navigation'; // Import the router

export const ViewSurveys = () => {
    const headers = ['Survey ID', 'Survey Name', 'Category', 'Store', 'Region', 'Start Date', 'Expiry Date', 'Status']

    const router = useRouter(); // Initialize the router

    const handleSurveyClick = (surveyId: string) => {
        router.push(`/survey/${surveyId}`); // Redirect to the desired page with survey ID
    };

    //Survey ID, Survey Name, Survey Category, Store, Region, Start Date, Expiry Date, Active


    return (
        <div className="h-screen w-full">
            <div className="pl-4 pt-4">
                <h4 className="text-red font-bold">Active Surveys</h4>
            </div>
            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-2 mt-4 mx-2 rounded shadow-lg">
                {headers?.map((header, index) => (<p key={index}className={`text-xs uppercase font-medium flex-1 text-center ${index === 1 ? 'hidden lg:block' : ''}`}>{header}</p>))}
            </div>
            <div className="pt-2 max-h-[350px] pb-2 space-y-2 overflow-y-auto">
                <div className="bg-white flex flex-col p-2 mx-2 rounded shadow-md h-10">
                    <div className="flex items-center justify-between">
                        <p onClick={() => handleSurveyClick("1")}  className="text-sm flex-1 text-center cursor-pointer text-red">1</p>
                        <p className="text-sm flex-1 text-center">Product Review</p>
                        <p className="text-sm flex-1 text-center">Products</p>
                        <p className="text-sm flex-1 text-center">PLUS DC Stellenbosch</p>
                        <p className="text-sm flex-1 text-center">Gauteng</p>
                        <p className="text-sm flex-1 text-center">2023-11-15</p>
                        <p className="text-sm flex-1 text-center">2023-11-15</p>
                        <p className="text-sm flex-1 text-center flex items-center justify-center space-x-2 text-green">Active</p>
                        {/* <button className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                            <Pencil />
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
};