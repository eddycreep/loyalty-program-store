'use client'

import axios from "axios";
import { toast } from 'react-hot-toast';
import { apiEndPoint } from "@/utils/colors";
import Image from "next/image";
import { DashboardModule } from "@/modules/dashboard/dashboardModule"

export default function Dashboard() {

    return (
        <div className="w-full h-screen flex justify-between px-4 py-4 gap-2 rounded-lg overflow-y-auto"> {/* Added overflow-y-auto to enable vertical scrolling */}
            <DashboardModule />
        </div>
    );
}