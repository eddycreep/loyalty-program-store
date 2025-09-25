import { apiEndPoint } from '@/utils/colors';
import { apiClient } from "@/utils/api-client";
import { UsersResponse } from '@/modules/types/user/user-types';

export const getUsers = async () => {
    try {
        const url = `user/get-users`;
        const response = await apiClient.get<UsersResponse>(`${apiEndPoint}/${url}`)
        console.log('users returned my gee: ', response?.data?.data);

        return response?.data?.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        return null;
    }
};