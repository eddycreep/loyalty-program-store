'use client'

import axios from "axios";
import moment from 'moment';
import { useSession } from "@/context";
import { useAudit } from "@/shared/tools/auditMonit";
import { AdminModule } from "@/modules/admin/admin-module";

export default function Checkin() {
    const { user } = useSession();
    const { addAuditLog } = useAudit();


    return (
        <div className="w-full h-full flex justify-between px-4 py-4 gap-2 rounded-lg">
            <AdminModule />
        </div>
    );
}