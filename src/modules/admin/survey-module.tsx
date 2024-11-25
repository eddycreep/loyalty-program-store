'use client'

import { useState, useEffect } from 'react';
import { CreateSurveys } from './survey-managment/create-survey';
import { ViewSurveys } from './survey-managment/view-survey';
import { EnhancedSurveyCreatorComponent } from '@/components/enhanced-survey-creator'
import { EditSurvey } from './survey-managment/edit-survey';


export const SurveyModule = () => {
    const [currentTab, setCurrentTab] = useState('products');
    {/* <CreateSurveys /> */}
    {/* {currentTab === 'createSurvey' && <EnhancedSurveyCreatorComponent /> } */}


    return (
        <div className='w-full h-full flex flex-col py-4 gap-4 rounded-lg overflow-y-auto mb-4'>
                <div className="flex gap-2">
                    <button onClick={() => setCurrentTab('createSurvey')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'products'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Create Survey</button>
                    <button onClick={() => setCurrentTab('viewSurvey')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'rewards'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>View Survey</button>
                </div>
            {currentTab === 'createSurvey' && <CreateSurveys /> }
            {currentTab === 'viewSurvey' && <ViewSurveys />}
            {/* {currentTab === 'viewSurvey' && <EditSurvey  />} */}
        </div>
    );
}