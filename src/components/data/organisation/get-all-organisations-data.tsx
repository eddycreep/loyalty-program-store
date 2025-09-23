import { apiEndPoint } from '@/utils/colors';
import { OrganisationsResponse } from '@/modules/types/organisation/organisation-types';
import { apiClient } from "@/utils/api-client";

export const getAllOrganisations = async () => {
    try {
        const url = `organisation/get-all-organisations`;
        const response = await apiClient.get<OrganisationsResponse>(`${apiEndPoint}/${url}`)
        console.log('organisations returned my gee: ', response?.data?.data);

        return response?.data?.data;
    } catch (error) {
        console.error('Error fetching organisations:', error);
        return null;
    }
};