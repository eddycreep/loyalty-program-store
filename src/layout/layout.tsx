import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import MultiColorLoader from '@/lib/loaders';

export const Layout = ({ children }: any) => {
    const [isLoading, setIsLoading] = useState(true); // State to track loader visibility

    useEffect(() => {
        // Show loader when tab change starts
        setIsLoading(true);

        // Simulate loading completion after a short delay
        const timer = setTimeout(() => {
            setIsLoading(false); // Hide loader when tab change is done
        }, 50000); // Adjust delay as needed (500ms is just an example)

        // Cleanup timer
        return () => clearTimeout(timer);
    }, [children]); // Runs every time the children (page content) changes

    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <MultiColorLoader /> {/* Loader component */}
                </div>
            )}
            
            <div className="h-screen w-full overflow-hidden lg:ease-in-out duration-500 bg-black flex flex-col justify-start lg:justify-between lg:gap-2 lg:p-2">
                <div className="flex items-start justify-between gap-2 w-full lg:h-[90vh] relative">
                    <main className="w-full lg:w-[96%] h-full border bg-grey lg:rounded overflow-y-hidden">
                        <article className="w-full h-full">
                            {children} {/* This is the page content */}
                        </article>
                    </main>
                </div>
            </div>

            <Toaster
                position="bottom-center"
                reverseOrder={false}
                toastOptions={{
                    className: 'flex items-start justify-center gap-2 text-center'
                }}
            />
        </>
    );
};
