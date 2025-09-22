/**
 * Secure cookie handling utilities
 */

const COOKIE_CONFIG = {
    secure: typeof window !== 'undefined' && window.location.protocol === 'https:',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 7 * 24 * 60 * 60, // 7 days
};

export const setCookie = (name: string, value: string): void => {
    if (typeof window === 'undefined') return;
    
    const cookieString = [
        `${name}=${encodeURIComponent(value)}`,
        `path=${COOKIE_CONFIG.path}`,
        `max-age=${COOKIE_CONFIG.maxAge}`,
        `samesite=${COOKIE_CONFIG.sameSite}`,
        COOKIE_CONFIG.secure ? 'secure' : '',
    ].filter(Boolean).join('; ');
    
    document.cookie = cookieString;
};

export const getCookie = (name: string): string | null => {
    if (typeof window === 'undefined') return null;
    
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
    if (parts.length === 2) {
        const cookieValue = parts.pop()?.split(';').shift();
        return cookieValue ? decodeURIComponent(cookieValue) : null;
    }
    
    return null;
};

export const removeCookie = (name: string): void => {
    if (typeof window === 'undefined') return;
    document.cookie = `${name}=; path=${COOKIE_CONFIG.path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
};

// Store user data in separate cookies
export const setUserDataCookies = (userData: any): void => {
    if (!userData) return;
    
    const userInfo = {
        accessToken: userData.accessToken,
        uid: userData.uid,
        id_no: userData.id_no,
        emp_name: userData.emp_name,
        emp_surname: userData.emp_surname,
        role: userData.role,
    };
    
    setCookie('user', JSON.stringify(userInfo));
    
    if (userData.organisation) {
        setCookie('organization', JSON.stringify(userData.organisation));
    }
    
    if (userData.branch) {
        setCookie('branch', JSON.stringify(userData.branch));
    }
};

// Get complete user data from cookies
export const getUserDataFromCookies = (): any => {
    const userCookie = getCookie('user');
    const organizationCookie = getCookie('organization');
    const branchCookie = getCookie('branch');
    
    if (!userCookie) return null;
    
    try {
        const userData = JSON.parse(userCookie);
        const organization = organizationCookie ? JSON.parse(organizationCookie) : null;
        const branch = branchCookie ? JSON.parse(branchCookie) : null;
        
        return {
            ...userData,
            organisation: organization,
            branch: branch,
        };
    } catch (error) {
        console.error('Error parsing user data from cookies:', error);
        return null;
    }
};

// Clear all user cookies
export const clearUserDataCookies = (): void => {
    removeCookie('user');
    removeCookie('organization');
    removeCookie('branch');
}; 