import { apiEndPoint } from '@/utils/colors';
import { OrganisationResponse } from '@/modules/types/organisation/organisation-types';
import { apiClient } from "@/utils/api-client";

export const getOrganisation = async (orgId: number) => {
    try {
        const url = `organisation/get-organisation/${orgId}`;
        const response = await apiClient.get<OrganisationResponse>(`${apiEndPoint}/${url}`)
        console.log('organisation returned my gee: ', response?.data);

        return response?.data?.data;
    } catch (error) {
        console.error('Error fetching organisation:', error);
        return null;
    }
};