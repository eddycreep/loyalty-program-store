"use client"

export const ActiveMembersCard = () => {
    return (
        /* From Uiverse.io by LeryLey */ 
        <article className="w-96 h-60 bg-white shadow-lg p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300">
            <div className="flex justify-between">
                <h6 className="text-xl font-bold">Loyalty Members</h6>
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    className="w-10 h-10 text-red bg-rose-200 rounded-full p-1"
                >
                        <path d="M18 20a6 6 0 0 0-12 0"/>
                        <circle cx="12" cy="10" r="4"/>
                        <circle cx="12" cy="12" r="10"/>
                </svg>
            </div>
            <div>
                <div className="flex gap-2">
                    <p className="text-sm text-gray-950">Total Members:</p>
                    <p className="text-sm text-gray-500">300</p>
                </div>
                <div className="flex gap-2">
                    <p className="text-sm text-gray-950">Active Members:</p>
                    <div className="flex divide-x-2 gap-2">
                        <p className="text-sm text-gray-500">233</p>
                        <p className="text-sm text-purple pl-2">70%</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <p className="text-sm text-gray-950">New Members:</p>
                    <p className="text-sm text-gray-500">120</p>
                </div>
            </div>
            {/* Loyalty Tiers Section */}
            <div>
                {/* Sub-header for Loyalty Tiers */}
                <h6 className="text-md font-semibold pt-4">Loyalty Tiers</h6>

                {/* Tiers in a single row with values below */}
                <div className="flex justify-between pt-2">
                    <div className="flex flex-col items-start">
                        <p className="text-sm text-gray-950">Gold</p>
                        <div className="flex divide-x-2 gap-2 pt-1">
                            <p className="text-sm text-gray-500">102</p>
                            <p className="text-sm text-gray-500 pl-2">40%</p>
                        </div>
                    </div>

                    {/* Diamond Tier */}
                    <div className="flex flex-col items-start">
                        <p className="text-sm text-gray-950">Diamond</p>
                        <div className="flex divide-x-2 gap-2">
                            <p className="text-sm text-gray-500">110</p>
                            <p className="text-sm text-gray-500 pl-2">45%</p>
                        </div>
                    </div>

                    {/* Platinum Tier */}
                    <div className="flex flex-col items-start">
                        <p className="text-sm text-gray-950">Platinum</p>
                        <div className="flex divide-x-2 gap-2">
                            <p className="text-sm text-gray-500">88</p>
                            <p className="text-sm text-gray-500 pl-2">25%</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    )
}