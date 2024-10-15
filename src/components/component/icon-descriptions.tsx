import { X, Activity, TrendingUp } from "lucide-react";

export const IconDescriptions = () => {
    return (
        /* From Uiverse.io by Cybercom682 */ 
        <div className="space-y-2 p-4 w-96">
            <div
                role="alert"
                className="bg-gray-300 hover:bg-green dark:bg-emerald-300 gap-1 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105"
            >
                <Activity size={16} />
                <p className="text-xs font-semibold">Active - This Special is currently active!</p>
            </div>

            <div
                role="alert"
                className="bg-gray-300 hover:bg-amber-400 gap-1 border-orange-500 dark:border-orange-700 text-orange-900 dark:text-orange-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-orange-200 dark:hover:bg-orange-800 transform hover:scale-105"
            >
                <TrendingUp size={16} />
                <p className="text-xs font-semibold">Upcoming - This special is scheduled to start soon.</p>
            </div>

            <div
                role="alert"
                className="bg-gray-300 hover:bg-red gap-1 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105"
            >
                <X size={16} />
                <p className="text-xs font-semibold">In-Active – This special is not active.</p>
            </div>
        </div>
    )
}