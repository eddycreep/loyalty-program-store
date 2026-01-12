import { apiClient } from "@/utils/api-client";

interface UserSession {
    organisation?: {
        uid: number;
    };
    branch?: {
        uid: number;
    };
}

export const getUpcomingRewards = async (user?: UserSession | null) => {
    try {
        const url = `rewards/get-upcoming-rewards`;

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
        console.log('upcoming-rewards returned my gee: ', response?.data);

        return response?.data.results;
    } catch (error) {
        console.error('Error fetching all upcoming-rewards:', error);
        return null;
    }
};