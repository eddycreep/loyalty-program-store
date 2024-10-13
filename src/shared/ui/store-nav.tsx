import React from 'react';

import Image from "next/image";

export const StoreNav = () => {
    return (
        <div className="w-full h-full flex justify-between px-4 py-4 gap-2 bg-white rounded-lg">
            <div className="pt-2">
                <Image 
                    src="/covers/plus.jpg" 
                    alt="Logo"
                    width={100}
                    height={50}
                />
            </div>
        </div>
    );
}

export default StoreNav;
