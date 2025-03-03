'use client'

import { useState } from 'react';
import { CreateSurveys } from './survey-managment/create-survey';
import { ViewSurveys } from './survey-managment/view-survey';

export const SurveyModule = () => {
    const [currentTab, setCurrentTab] = useState('');

    return (
        <div className='w-full h-screen flex flex-col py-4 gap-4 rounded-lg overflow-y-auto mb-4'>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentTab('createSurvey')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'createSurvey' ? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>
                        Create Survey
                    </button>
                    <button onClick={() => setCurrentTab('viewSurvey')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'viewSurvey' ? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>
                        View Survey
                    </button>
                </div>
            {currentTab === 'createSurvey' && <CreateSurveys /> }
            {currentTab === 'viewSurvey' && <ViewSurveys />}
        </div>
    );
}