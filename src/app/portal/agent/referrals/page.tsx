"use client"

import { StudentMasterTable } from "@/features/admin/components/student-master-table"
import { Briefcase, Users } from "lucide-react"

export default function AgentReferralsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 w-fit border border-green-500/20">
                        <Users className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Partner Node</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        My <span className="text-green-500 italic">Referrals</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Track students referred by your agency. Monitor their application progress, document status, and enrollment phase in real-time.
                    </p>
                </div>
            </div>

            <StudentMasterTable />
        </div>
    )
}
