import { apiClient } from "@/utils/api-client";
import { CustomersResponse } from '@/modules/types/customer/customer-types';

interface UserSession {
    organisation?: {
        uid: number;
        name?: string;
    };
}

/**
 * Fetches all loyalty customers for the authenticated user's organisation
 * Used by store managers to view their organisation's customer base
 * The organisationId is automatically extracted from the JWT token in the Authorization header
 */
export const getLoyaltyCustomersByOrganisation = async (user?: UserSession | null) => {
    try {
        // Endpoint automatically extracts organisationId from JWT token
        // Note: Using 'customers' (plural) to match controller route @Controller('customers')
        const url = `customers/get-loyalty-customers-by-organisation`;

        const response = await apiClient.get<CustomersResponse>(url);
        console.log('Loyalty customers returned:', response?.data?.data);

        return response?.data?.data || [];
    } catch (error) {
        console.error('Error fetching loyalty customers by organisation:', error);
        return [];
    }
};

