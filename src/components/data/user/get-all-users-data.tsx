import { apiEndPoint } from '@/utils/colors';
import { apiClient } from "@/utils/api-client";
import { BranchesResponse } from '@/modules/types/branch/branches-types';
import { UsersResponse } from '@/modules/types/user/user-types';

export const getAllUsers = async () => {
    try {
        const url = `user/get-all-users`;
        const response = await apiClient.get<UsersResponse>(`${apiEndPoint}/${url}`)
        console.log('users returned my gee: ', response?.data?.data);

        return response?.data?.data;
    } catch (error) {
        console.error('Error fetching branches:', error);
        return null;
    }
};