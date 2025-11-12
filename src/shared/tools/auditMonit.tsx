'use client'

import { useSession } from '@/context';
import { apiEndPoint } from '@/utils/colors';
import axios from 'axios';
import moment from 'moment';
import { createContext, ReactNode, useContext } from 'react';

type AuditData = {
    action: string | null,
};

export const AuditSessionContext = createContext<{
    addAuditLog: (data: AuditData) => void;
} | undefined>(undefined);

export const AuditProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const { user } = useSession()

    const addAuditLog = async (data: AuditData) => {
        if (!data || !user) {
            return;
        }

        const { action } = data
        const { uid, emp_name } = user;
        const timeStamp = moment()?.format('YYYY-MM-DD HH:mm:ss');

        const payLoad = {
            emp_id: uid,
            emp_name: emp_name,
            action: action,
            date_time: timeStamp
        };

        try {
            const url = `user/insertauditlog`;
            const response = await axios.post(`${apiEndPoint}/${url}`, payLoad);

            if (response?.data?.message === 'Success') {
                console.log('audit success, testing -- improve this feature')
            }
        }
        catch (error) {
            // handle errors here 
        }
    }

    return <AuditSessionContext.Provider value={{ addAuditLog }}>{children}</AuditSessionContext.Provider>;
};

export const useAudit = () => {
    const context = useContext(AuditSessionContext);

    if (context === undefined) {
        throw new Error('useAudit must be used within a UserAuditProvider');
    }

    return context;
};
