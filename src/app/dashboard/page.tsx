'use client'

import { DashboardModule } from "@/modules/dashboard/dashboardModule"

export default function Page() {

    return (
        <div className="w-full h-screen flex justify-between px-4 py-4 gap-2 rounded-lg overflow-y-auto"> 
            <DashboardModule />
        </div>
    );
}