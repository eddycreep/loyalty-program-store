import { apiClient } from "@/utils/api-client";
import { CustomersResponse } from '@/modules/types/customer/customer-types';

interface UserSession {
    organisation?: {
        uid: number;
        name?: string;
    };
}

// Updated: Fetches customers linked to the organisation from the user session
export const getAllCustomers = async (user?: UserSession | null) => {
    try {
        const url = `customer/get-all-customers`;

        const params = new URLSearchParams();
        // Pass organisationId from user session to filter customers by organisation
        if (user?.organisation?.uid) {
            params.append('organisationId', user.organisation.uid.toString());
        }
        
        const queryString = params.toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const response = await apiClient.get<CustomersResponse>(fullUrl);
        console.log('Customers returned:', response?.data?.data);

        return response?.data?.data || [];
    } catch (error) {
        console.error('Error fetching customers:', error);
        return [];
    }
};