"use client";

import { GlassWater, Popcorn, Cherry, Beef } from "lucide-react";

export const SuccessCard = () => {
    return (
        <div className="flex gap-4">

            {/* First Card - Green */}
            <div className="w-full cursor-pointer transition-all duration-500 hover:translate-y-2 shadow-xl">
                <div className="card card-green">
                    <GlassWater size={26} color="black" />
                    <div className="message-text-container">
                        <p className="message-text text-black">Drinks Reviews</p>
                        <div className="flex gap-2">
                            <p className="text-sm text-black">Completed:</p>
                            <p className="text-sm text-black">97</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Card - Blue */}
            <div className="w-full cursor-pointer transition-all duration-500 hover:translate-y-2 shadow-xl">
                <div className="card card-blue">
                    <Popcorn size={26} color="black" />
                    <div className="message-text-container">
                        <p className="message-text text-black">Snacks Reviews</p>
                        <div className="flex gap-2">
                            <p className="text-sm text-black">Completed:</p>
                            <p className="text-sm text-black">72</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Third Card - Yellow */}
            <div className="w-full cursor-pointer transition-all duration-500 hover:translate-y-2 shadow-xl">
                <div className="card card-yellow">
                    <Cherry size={26} color="black" />
                    <div className="message-text-container">
                        <p className="message-text text-black">Fruit & Vegetable Reviews</p>
                        <div className="flex gap-2">
                            <p className="text-sm text-black font-bold">Completed:</p>
                            <p className="text-sm text-black">14</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fourth Card - Orange */}
            <div className="w-full cursor-pointer transition-all duration-500 hover:translate-y-2 shadow-xl">
                <div className="card card-orange">
                    <Beef size={26} color="black" />
                    <div className="message-text-container">
                        <p className="message-text text-black">Processed Foods Reviews</p>
                        <div className="flex gap-2">
                            <p className="text-sm text-black">Completed:</p>
                            <p className="text-sm text-black">65</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};