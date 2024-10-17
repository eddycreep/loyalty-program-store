"use client"

import axios from "axios";
import moment from "moment";
import { isEmpty } from "lodash";
import Validator from 'validatorjs';
import { toast } from "react-hot-toast";
import { useRef, useState, FormEvent } from "react";
import { SurveySheet } from "@/components/component/survey-sheet"


export const CreateSurveys = () => {
    return (
        <div className="">
            <div className="flex gap-4">
                <div className="w-[500px] flex flex-col pt-4">
                    <label>Survey Name</label>
                    <input type="input" placeholder="Product Reviews" className='w-full p-2 rounded-lg border border-gray-300'/>
                </div>
                <div className="w-[500px] flex flex-col pt-4">
                    <label>Survey Category</label>
                    <input type="input" placeholder="Product Reviews" className='w-full p-2 rounded-lg border border-gray-300'/>
                </div>
                <div className="flex">
                    <div className="pt-6 pr-4">
                        <div className="checkbox-apple">
                            <input className="yep" id="check-apple" type="checkbox" />
                            <label htmlFor="check-apple"></label>
                        </div>
                    </div>
                    <div className="pt-10">
                        <button className="bg-red text-white h-10 rounded p-2">
                            Add Question
                        </button>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                <div className="w-[500px] flex flex-col pt-4">
                    <label>Survey Name</label>
                    <input type="input" placeholder="Product Reviews" className='w-full p-2 rounded-lg border border-gray-300'/>
                </div>
            </div>
        </div>
    )
};
