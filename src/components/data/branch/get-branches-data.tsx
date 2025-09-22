import { apiEndPoint } from '@/utils/colors';
import { BranchesResponse } from '@/modules/types/branch/branches-types';
import { apiClient } from "@/utils/api-client";

export const getBranches = async () => {
    try {
        const url = `branch/get-branches`;
        const response = await apiClient.get<BranchesResponse>(`${apiEndPoint}/${url}`)
        console.log('branches returned my gee: ', response?.data);

        return response?.data;
    } catch (error) {
        console.error('Error fetching branches:', error);
        return null;
    }
};