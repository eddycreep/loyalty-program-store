"use client"

export const XIconTooltip = () => {
    return (
        <section className="flex justify-center items-center">
            <button
                className="group flex justify-center p-2 rounded-md drop-shadow-xl from-gray-800 bg-red text-white font-semibold hover:translate-y-2 transition-all duration-250 hover:from-[#331029] hover:to-[#310413]"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="14" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    stroke-width="2" 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    className="lucide lucide-ticket-x">
                        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
                        <path d="m9.5 14.5 5-5"/><path d="m9.5 9.5 5 5"/>
                </svg>
                <span
                className="absolute opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-md group-hover:-translate-y-10 duration-500">
                    In-active
                </span>
            </button>
        </section>
    )
}