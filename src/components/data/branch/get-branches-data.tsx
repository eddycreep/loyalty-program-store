import { apiEndPoint } from '@/utils/colors';
import { BranchesResponse } from '@/modules/types/branch/branches-types';
import { apiClient } from "@/utils/api-client";

interface UserSession {
    organisation?: {
        uid: number;
    };
}

export const getBranches = async (user?: UserSession | null) => {
    try {
        const url = `branch/get-all-branches`;
        
        const params = new URLSearchParams();
        if (user?.organisation?.uid) {
            params.append('organisationId', user.organisation.uid.toString());
        }
        
        const queryString = params.toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        
        const response = await apiClient.get<BranchesResponse>(`${apiEndPoint}/${fullUrl}`)
        console.log('branches returned my gee: ', response?.data?.data);

        return response?.data?.data;
    } catch (error) {
        console.error('Error fetching branches:', error);
        return null;
    }
};