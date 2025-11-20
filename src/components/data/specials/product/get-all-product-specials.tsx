import { apiClient } from "@/utils/api-client";

interface UserSession {
    organisation?: {
        uid: number;
    };
    branch?: {
        uid: number;
    };
}

export const getAllProductSpecials = async (user?: UserSession | null) => {
    try {
        const url = `specials/get-all-product-specials`;

        const params = new URLSearchParams();
        if (user?.organisation?.uid) {
            params.append('organisationId', user.organisation.uid.toString());
        }
        if (user?.branch?.uid) {
            params.append('branchId', user.branch.uid.toString());
        }
        
        const queryString = params.toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const response = await apiClient.get<any>(fullUrl)
        console.log('product-specials returned my gee: ', response?.data);

        return response?.data;
    } catch (error) {
        console.error('Error fetching all product-specials:', error);
        return null;
    }
};