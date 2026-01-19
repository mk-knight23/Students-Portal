"use client"

import { AgencyDashboard } from "@/features/admin/components/agency-dashboard"
import { BarChart3 } from "lucide-react"

export default function AgentPerformancePage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 w-fit border border-blue-500/20">
                        <BarChart3 className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Growth Node</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        Performance <span className="text-blue-500 italic">Analytics</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Real-time visualization of your referral conversion funnel. Monitor enrollment velocity and branch-wise performance metrics.
                    </p>
                </div>
            </div>

            <AgencyDashboard />
        </div>
    )
}
