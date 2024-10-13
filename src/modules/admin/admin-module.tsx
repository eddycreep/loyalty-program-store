'use client'

import axios from 'axios';
import { useQuery } from "@/hooks/useQuery";
import { apiEndPoint, colors } from '@/utils/colors';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import MultiColorLoader from '@/lib/loaders';
import { RewardsModule } from './rewards-module';
import { ProductsManModule } from './products-management-module';
import { ReviewsModule } from './reviews-module';
import { SurveyModule } from './survey-module';


export const AdminModule = () => {
    const [currentTab, setCurrentTab] = useState('products');


    return (
        <div className='w-full h-screen flex flex-col px-4 py-4 gap-4 rounded-lg overflow-y-auto m2b-4'>
            <div className='w-full p-2 sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center'>
                <button onClick={() => setCurrentTab('products')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'products'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Product Specials</button>
                <button onClick={() => setCurrentTab('rewards')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'rewards'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Customer Rewards</button>
                <button onClick={() => setCurrentTab('reviews')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'reviews'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Customer Reviews</button>
                <button onClick={() => setCurrentTab('surveys')} className={`bg-black whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'surveys'? 'bg-red text-white' : 'bg-black text-white'} text-sm p-2 cursor-pointer text-white font-medium hover:text-white hover:bg-red lg:ease-in-out duration-300 w-44 outline-none`}>Survey Management</button>
            </div>
            {currentTab === 'products' && <ProductsManModule />}
            {currentTab === 'rewards' && <RewardsModule />}
            {currentTab === 'reviews' && <ReviewsModule />}
            {currentTab === 'surveys' && <SurveyModule />}
        </div>
    );
}
