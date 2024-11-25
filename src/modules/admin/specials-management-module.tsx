'use client'

import React from 'react';
import { ProductSpecials } from "./specials/product/product-specials"
import { CombinedSpecials } from "./specials/combined/combined-specials"


export const SpecialsManagementModule = () => {

    return (
        <div className="w-full h-screen mb-4 pr-4 space-y-6">
            <div className="pb-20">
                <div>
                    <ProductSpecials />
                </div>
                <div>
                    <CombinedSpecials />
                </div>
            </div>
        </div>
    );
}