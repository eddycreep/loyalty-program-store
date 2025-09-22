'use client'

import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserData } from '@/types/user-types';
import { setUserDataCookies, getUserDataFromCookies, clearUserDataCookies } from '../../../cookie-utils';

export const UserSessionContext = createContext<{
    user: UserData;
    login: (data: UserData) => void;
    logout: () => void;
} | undefined>(undefined);

export const SessionProvider: React.FunctionComponent<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserData>(() => {
        if (typeof window !== 'undefined') {
            // First try to get from sessionStorage for immediate access
            const storedData = sessionStorage.getItem(`user`);
            if (storedData) {
                return JSON.parse(storedData);
            }
            
            // Fall back to cookies if sessionStorage is empty
            const cookieData = getUserDataFromCookies();
            if (cookieData) {
                return cookieData;
            }
            
            // Default empty user state
            return { accessToken: null, uid: null, id_no: null, emp_name: null, emp_surname: null, role: null, organisation: null, branch: null };
        }
    });

    const router = useRouter();

    useEffect(() => {
        if (user?.uid === null) {
            router.push('/login')
        }
        
    }, [user, router]);

    const login = async (data: UserData) => {
        if (!data) {
            toast(`Login Failed`,
                {
                    icon: '❌',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );

            router.push("/");

            return;
        }

        setUser(data);
        
        // Store user data in both sessionStorage and cookies
        setUserDataCookies(data);

        toast(`Welcome ${data?.emp_name}, Role: ${data?.role}`,
            {
                icon: '👋',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );

        const path = data?.role === 'Admin' ? '/' : '/'

        router.push(path);
    };

    useEffect(() => { sessionStorage.setItem(`user`, JSON.stringify(user)) }, [user]);

    const logout = () => {
        // Clear both sessionStorage and cookies
        sessionStorage.removeItem(`user`);
        clearUserDataCookies();

        router.push("/login");

        toast(`Signed Out!`,
            {
                icon: '👋',
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            }
        );
    };

    return <UserSessionContext.Provider value={{ user, login, logout }}>{children}</UserSessionContext.Provider>;
};

export const useSession = () => {
    const context = useContext(UserSessionContext);

    if (context === undefined) {
        throw new Error('useSession must be used within a UserSessionProvider');
    }

    return context;
};