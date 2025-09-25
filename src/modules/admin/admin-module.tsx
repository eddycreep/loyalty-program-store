'use client'

import { useState } from 'react';
import { RewardsModule } from './rewards-module';
import { SpecialsModule } from './specials-module';
import { ReviewsModule } from './reviews-module';
import { SurveyModule } from './survey-module';
import { Tiers } from './loyalty-tiers/tiers'
import { OrganizationModule } from './organization-module';
import { BranchModule } from './branch-module';
import { UserModule } from './user-module';

export const AdminModule = () => {
    const [currentTab, setCurrentTab] = useState('specials');

    return (
        <div className='w-full h-screen flex flex-col gap-4 rounded-lg overflow-y-auto m2b-4'>
            <div className='w-full sm:flex justify-start md:gap-2 flex-wrap md:flex justify-start md:gap-4 flex-wrap lg:flex items-center'>
                <button onClick={() => setCurrentTab('specials')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'specials'? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Product Specials</button>
                <button onClick={() => setCurrentTab('rewards')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'rewards'? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Customer Rewards</button>
                <button onClick={() => setCurrentTab('reviews')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'reviews'? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Customer Reviews</button>
                <button onClick={() => setCurrentTab('surveys')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'surveys'? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Survey Management</button>
                <button onClick={() => setCurrentTab('tiers')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'tiers'? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Loyalty Tiers</button>
                <button onClick={() => setCurrentTab('organisation')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'organisation'? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Organisation</button>
                <button onClick={() => setCurrentTab('branch')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'branch'? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Branch</button>
                <button onClick={() => setCurrentTab('users')} className={`whitespace-nowrap w-10 lg:ease-in-out duration-500 shadow rounded ${currentTab === 'users'? 'bg-purple text-white' : 'bg-white text-black'} text-sm p-2 cursor-pointer font-medium hover:text-white hover:bg-purple lg:ease-in-out duration-300 w-44 outline-none`}>Users</button>
            </div>
            {currentTab === 'specials' && <SpecialsModule />}
            {currentTab === 'rewards' && <RewardsModule />}
            {currentTab === 'reviews' && <ReviewsModule />}
            {currentTab === 'surveys' && <SurveyModule />}
            {currentTab === 'tiers' && <Tiers />}
            {currentTab === 'organisation' && <OrganizationModule />}
            {currentTab === 'branch' && <BranchModule />}
            {currentTab === 'users' && <UserModule />}
        </div>
    );
}
