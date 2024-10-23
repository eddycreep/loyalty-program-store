"use client"

export const ActiveMembersCard = () => {
    return (
        /* From Uiverse.io by TamaniPhiri */
        <div className="flex relative items-center justify-center w-60">
            {/* Card container with hover effect */}
            <div className="rounded-xl overflow-hidden relative text-center p-4 group items-center flex flex-col max-w-sm hover:shadow-2xl transition-all duration-500 shadow-xl">
                
                {/* Active Members Section */}
                <div className="text-purple group-hover:scale-105 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-person-standing">
                        <circle cx="12" cy="5" r="1"/>
                        <path d="m9 20 3-6 3 6"/>
                        <path d="m6 8 6 2 6-2"/>
                        <path d="M12 10v4"/>
                    </svg>
                </div>
                
                <div className="group-hover:pb-10 transition-all duration-500 delay-200">
                    <h5 className="font-semibold text-gray-700">Active Members</h5>
                    <p className="text-gray-500 text-sm">4500</p>
                </div>

                {/* New Members Section */}
                {/* Initially hidden using opacity-0 and -bottom-full */}
                <div className="flex flex-col items-center transition-all duration-500 delay-200 group-hover:opacity-100 group-hover:bottom-0 opacity-0 -bottom-full absolute gap-2 justify-evenly w-full z-0">
                    {/* New Members Info */}
                    <div className="group-hover:pb-1 transition-all duration-500 delay-200">
                        <h6 className="text-sm font-semibold text-gray-700">New Members</h6>
                        <p className="text-gray-500 text-sm">145</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
