import { apiEndPoint } from '@/utils/colors';
import { BranchResponse } from '@/modules/types/branch/branches-types';
import { apiClient } from "@/utils/api-client";

export const getBranch = async (branchId: number) => {
    try {
        const url = `branch/get-branch/${branchId}`;
        const response = await apiClient.get<BranchResponse>(`${apiEndPoint}/${url}`)
        console.log('branch returned my gee: ', response?.data);

        return response?.data;
    } catch (error) {
        console.error('Error fetching branch:', error);
        return null;
    }
};