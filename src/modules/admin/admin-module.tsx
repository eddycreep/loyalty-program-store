'use client'

import { useState } from 'react';
import { RewardsModule } from './rewards-module';
import { SpecialsManagementModule } from './specials-management-module';
import { ReviewsModule } from './reviews-module';
import { SurveyModule } from './survey-module';


export const AdminModule = () => {
    const [currentTab, setCurrentTab] = useState('products');


    return (
        <div className='w-full h-screen flex flex-col gap-4 rounded-lg overflow-y-auto m2b-4'>
            <div className='w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center'>
                <button onClick={() => setCurrentTab('products')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'products'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Product Specials</button>
                <button onClick={() => setCurrentTab('rewards')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'rewards'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Customer Rewards</button>
                <button onClick={() => setCurrentTab('reviews')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'reviews'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Customer Reviews</button>
                <button onClick={() => setCurrentTab('surveys')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'surveys'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Survey Management</button>
            </div>
            {currentTab === 'products' && <SpecialsManagementModule />}
            {currentTab === 'rewards' && <RewardsModule />}
            {currentTab === 'reviews' && <ReviewsModule />}
            {currentTab === 'surveys' && <SurveyModule />}
        </div>
    );
}
