'use client'

import { useSession } from '@/context';
import { usePathname } from 'next/navigation';
import { Navigation } from '@/shared/ui/navigation';

export default function AppWrapper({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const { user } = useSession();

    const hideNavigation = pathname?.toLocaleLowerCase()?.includes('/login')

    if (!user) {
        return;
    }

    return (
        <main className={`w-full h-screen flex flex-col overflow-hidden md:ease-in-out md:duration-500 bg-black ${!hideNavigation && 'lg:p-1'}`}>
            <div className="flex flex-col lg:flex-row lg:gap-2 flex-grow pt-2">
                <nav className={`${hideNavigation ? 'hidden' : 'w-full lg:w-1/12'}`}>
                    <Navigation />
                </nav>
                <div className={`${hideNavigation ? 'w-full' : 'lg:w-11/12 lg:rounded'} h-full bg-gray-100 flex-grow`}>
                    {children}
                </div>
            </div>
        </main>
    )
}