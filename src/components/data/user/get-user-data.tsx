import { apiEndPoint } from '@/utils/colors';
import { apiClient } from "@/utils/api-client";
import { UserResponse } from '@/modules/types/user/user-types';

export const getUser = async (userId: number) => {
    try {
        const url = `user/get-user/${userId}`;
        const response = await apiClient.get<UserResponse>(`${apiEndPoint}/${url}`)
        console.log('user returned my gee: ', response?.data?.data);

        return response?.data?.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
};