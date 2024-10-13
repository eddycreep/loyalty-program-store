'use client'

import { isEmpty } from 'lodash';
import { useQuery } from "@/hooks/useQuery";
import { Check, CheckCheck, X, Pyramid } from "lucide-react";
import { apiEndPoint, colors } from '@/utils/colors';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAudit } from '@/shared/tools/auditMonit';
import MultiColorLoader from '@/lib/loaders';
import Image from 'next/image';

interface LoyaltyClientsProps {
    id: number,
    name: string,
    surname: string
    id_number: number,
    mobile_number: string,
    age: number,
    gender: string,
    birthday: string,
    ethnicity: string,
    employment_status: string,
    loyalty: number,
    sign_up_date: string
}

type LoyaltyResponse = LoyaltyClientsProps[]
type NonLoyaltyResponse = LoyaltyClientsProps[]


export const ReportsModule = () => {


    return (
        <div className='w-full h-screen flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto m2b-4'>
            <p>Reports</p>
        </div>
    );
}