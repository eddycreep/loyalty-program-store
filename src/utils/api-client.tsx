import axios from "axios";

const API_BASE_URL = "http://localhost:4400" // process.env.NEXT_PUBLIC_API_ENDPOINT || 'https://hr-server-znv3.onrender.com'

// const API_BASE_URL = "http://localhost:4400";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // Enable cookies
});

// Add request interceptor to automatically attach Authorization header
// This reads the user's accessToken from sessionStorage and adds it to every request
apiClient.interceptors.request.use(
    (config) => {
        // Get user data from sessionStorage (where login stores the complete user object)
        const userData = sessionStorage.getItem('user');
        
        if (userData) {
            try {
                const user = JSON.parse(userData);
                // Extract accessToken and add Authorization header
                // Example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                if (user.accessToken) {
                    config.headers.Authorization = `Bearer ${user.accessToken}`;
                }
            } catch (error) {
                console.warn('Failed to parse user data from sessionStorage:', error);
            }
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);