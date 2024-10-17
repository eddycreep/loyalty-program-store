"use client"

import axios from "axios";
import moment from "moment";
import { isEmpty } from "lodash";
import Validator from 'validatorjs';
import { toast } from "react-hot-toast";
import { useRef, useState, FormEvent } from "react";
import { Edit, Brush, PenTool, PenToolIcon, Pencil } from "lucide-react"


export const ViewSurveys = () => {
    const headers = ['Survey ID', 'Survey Name', 'Category', 'Creation Date', 'Status', 'Action']

//     '1', 'Cooldrink Satisfaction Survey', 'Products', '2023-11-15', '1'
// '2', 'Snacks Feedback', 'Products', '2023-11-15', '1'
// '3', 'Chips Taste Test', 'Products', '2023-11-15', '1'
// '4', 'New Product Feedback', 'Products', '2023-11-15', '1'
// '5', 'Seasonal Specials Feedback', 'Products', '2023-11-15', '1'


    return (
        <div className="h-screen w-full">
            <div className="bg-white text-gray-500 flex items-center justify-between divide-x divide-gray-500 p-3 mt-4 mx-2 rounded shadow-lg">
                {headers?.map((header, index) => (
                    <p
                        key={index}
                        className={`text-xs uppercase font-medium flex-1 text-center ${
                        index === 1 ? 'hidden lg:block' : ''
                        }`}
                    >
                        {header}
                    </p>
                ))}
            </div>
            <div className="pt-2 max-h-[350px] pb-2 space-y-2 overflow-y-auto">
                <div className="bg-white flex flex-col p-2 mx-2 rounded shadow-lg h-10">
                    <div className="flex items-center justify-between">
                        <p className="text-sm flex-1 text-center cursor-pointer text-red">19</p>
                        <p className="text-sm flex-1 text-center">Product Review</p>
                        <p className="text-sm flex-1 text-center">Products</p>
                        <p className="text-sm flex-1 text-center">
                            {/* {expiry_date ? new Date(expiry_date).toString().split(' ').slice(1, 5).join(' ') : '--:--'} */}
                            2023-11-15
                        </p>
                        <p className="text-sm flex-1 text-center flex items-center justify-center space-x-2 text-green"> 
                            Active
                        </p>
                        <button className="text-sm flex-1 text-center flex items-center justify-center cursor-pointer">
                            <Pencil />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};