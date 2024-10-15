"use client"

import { Popcorn } from 'lucide-react'

export const RewardCards = () => {
    return (
        <div className="flex justify-between">
            <div className="cursor-pointer transition-all duration-500 hover:translate-y-2 w-96 h-32 bg-green rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-4 px-4">
                <svg
                    className="stroke-black shrink-0 rounded-full"
                    height="50"
                    width="50"
                    preserveAspectRatio="xMidYMid meet"
                    viewBox="0 0 100 100"
                    x="0"
                    xmlns="http://www.w3.org/2000/svg"
                    y="0"
                >
                    <path
                        d="M17.9,60.7A14.3,14.3,0,0,0,32.2,75H64.3a17.9,17.9,0,0,0,0-35.7h-.4a17.8,17.8,0,0,0-35.3,3.6,17.2,17.2,0,0,0,.4,3.9A14.3,14.3,0,0,0,17.9,60.7Z"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="8"
                    >
                    </path>
                </svg>
                <div>
                    <span className="font-bold text-purple-300">Product Reviews</span>
                    <p className="line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="cursor-pointer transition-all duration-500 hover:translate-y-2 w-96 h-32 bg-blue rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-4 px-4">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="150"
                    height="200" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    className="lucide lucide-popcorn stroke-black">
                        <path d="M18 8a2 2 0 0 0 0-4 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0-4 0 2 2 0 0 0 0 4"/>
                        <path d="M10 22 9 8"/>
                        <path d="m14 22 1-14"/>
                        <path d="M20 8c.5 0 .9.4.8 1l-2.6 12c-.1.5-.7 1-1.2 1H7c-.6 0-1.1-.4-1.2-1L3.2 9c-.1-.6.3-1 .8-1Z"/>
                </svg>
                <div>
                    <span className="font-bold text-purple-300">Survey's</span>
                    <p className="line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="cursor-pointer transition-all duration-500 hover:translate-y-2 w-96 h-32 bg-yellow rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-4 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="150"
                    height="200" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    className="lucide lucide-speech">
                        <path d="M8.8 20v-4.1l1.9.2a2.3 2.3 0 0 0 2.164-2.1V8.3A5.37 5.37 0 0 0 2 8.25c0 2.8.656 3.054 1 4.55a5.77 5.77 0 0 1 .029 2.758L2 20"/>
                        <path d="M19.8 17.8a7.5 7.5 0 0 0 .003-10.603"/>
                        <path d="M17 15a3.5 3.5 0 0 0-.025-4.975"/>
                </svg>
                <div>
                    <span className="font-bold text-purple-300">Card title</span>
                    <p className="line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
            <div className="cursor-pointer transition-all duration-500 hover:translate-y-2 w-96 h-32 bg-orange rounded-lg shadow-xl flex flex-row items-center justify-evenly gap-4 px-4">
                <svg xmlns="http://www.w3.org/2000/svg" 
                    width="150"
                    height="200" 
                    viewBox="0 0 24 24" fill="none" 
                    stroke="currentColor" stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    className="lucide lucide-notebook-text">
                        <path d="M2 6h4"/>
                        <path d="M2 10h4"/>
                        <path d="M2 14h4"/>
                        <path d="M2 18h4"/>
                        <rect width="16" height="20" x="4" y="2" rx="2"/>
                        <path d="M9.5 8h5"/>
                        <path d="M9.5 12H16"/>
                        <path d="M9.5 16H14"/>
                </svg>
                <div>
                    <span className="font-bold text-purple-300">Card title</span>
                    <p className="line-clamp-3">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
        </div>
    )
}