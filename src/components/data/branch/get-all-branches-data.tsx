import { apiEndPoint } from '@/utils/colors';
import { apiClient } from "@/utils/api-client";
import { BranchesResponse } from '@/modules/types/branch/branches-types';

export const getAllBranches = async () => {
    try {
        const url = `branch/get-all-branches`;
        const response = await apiClient.get<BranchesResponse>(`${apiEndPoint}/${url}`)
        console.log('branches returned my gee: ', response?.data?.data);

        return response?.data?.data;
    } catch (error) {
        console.error('Error fetching branches:', error);
        return null;
    }
};