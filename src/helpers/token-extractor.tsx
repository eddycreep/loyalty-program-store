import { useEffect, useState } from 'react';

export const useTokenFromSession = () => {
    const [token, setToken] = useState<string>('');

    const extractTokenFromSession = () => {
        const session = JSON.parse(sessionStorage.getItem('session') || '{}');
        const extractedToken = session?.token || '';
        setToken(extractedToken);
    };

    useEffect(() => {
        extractTokenFromSession();
    }, []);

    return token; // Return the token directly
};
