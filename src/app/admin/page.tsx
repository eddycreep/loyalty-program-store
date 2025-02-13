'use client'

import { AdminModule } from "@/modules/admin/admin-module";

export default function Page() {

    return (
        <div className="w-full h-full flex justify-between px-4 py-4 gap-2 rounded-lg">
            <AdminModule />
        </div>
    );
}