'use client'

import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import MultiColorLoader from '@/lib/loaders';
import { SurveyMan } from '@/components/component/survey-man';
import { EnhancedSurveyCreatorComponent } from '@/components/enhanced-survey-creator';



export const SurveyModule = () => {


    return (
        <div className='w-full h-full flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto mb-4'>
                {/* <SurveyMan /> */}
                <EnhancedSurveyCreatorComponent />
        </div>
    );
}