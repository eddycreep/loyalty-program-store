'use client'

import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useQuery } from "@/hooks/useQuery";
import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import { useAudit } from '@/shared/tools/auditMonit';
import MultiColorLoader from '@/lib/loaders';
import { SurveyManagerComponent } from '@/components/component/survey-manager'
import { SurveyManagement } from '@/components/component/survey-management'
import { SurveyMan } from '@/components/component/survey-man'



export const SurveyModule = () => {


    return (
        <div className='w-full h-full flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto mb-4'>
                <SurveyMan />
        </div>
    );
}