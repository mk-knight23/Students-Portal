"use client"

import { ComplianceDashboard } from "@/features/admin/components/compliance-dashboard"
import { ShieldCheck } from "lucide-react"

export default function AuditorCompliancePage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-500 w-fit border border-red-500/20">
                        <ShieldCheck className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Compliance Monitor</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        Legal <span className="text-red-500 italic">Audit</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Monitor system-wide compliance adherence. Track documentation discrepancies, regulatory risk factors, and verification latency.
                    </p>
                </div>
            </div>

            <ComplianceDashboard />
        </div>
    )
}
