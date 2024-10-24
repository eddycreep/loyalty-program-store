"use client"

export const EngagementRateCard = () => {
    return (
        /* From Uiverse.io by LeryLey */ 
        <article className="w-96 h-60 bg-white shadow-lg p-4 space-y-2 rounded-md hover:-translate-y-2 duration-300">
            <div className="flex justify-between">
                <h6 className="text-xl font-bold">Engagement Rate</h6>
                <svg xmlns="http://www.w3.org/2000/svg" 
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
                    <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>
                </svg>
            </div>
            <div className="flex gap-2">
                    <p className="text-sm text-gray-950">Participation Rate:</p>
                    <p className="text-sm text-gray-500">300</p>
                </div>
            <div>
                <div className="flex gap-2">
                    <p className="text-sm text-gray-950">Gold:</p>
                    <p className="text-sm text-gray-500">60%</p>
                </div>
                <div className="flex gap-2">
                    <p className="text-sm text-gray-950">Gold:</p>
                    <p className="text-sm text-gray-500">85%</p>
                </div>
                <div className="flex gap-2">
                    <p className="text-sm text-gray-950">Platinum:</p>
                    <p className="text-sm text-gray-500">45%</p>
                </div>
            </div>
            <div className="pt-8">
                <div className="flex gap-2">
                    <p className="text-sm text-gray-950">Avg. Monthly Visits:</p>
                    <p className="text-sm text-gray-500">12</p>
                </div>
                <div className="flex gap-2">
                    <p className="text-sm text-gray-950">Referral Participation</p>
                    <p className="text-sm text-gray-500">15%</p>
                </div>
            </div>
        </article>
    )
}