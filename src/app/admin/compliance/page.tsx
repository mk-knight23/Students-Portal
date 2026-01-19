"use client"

import { ComplianceDashboard } from "@/features/admin/components/compliance-dashboard"
import { ShieldCheck, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminCompliancePage() {
    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                        <ShieldCheck className="h-3 w-3" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Data Privacy Node</span>
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">Compliance Hub</h1>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2">
                            DPDPA 2023 & GDPR Alignment Portal <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" /> Encrypted Core
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl font-bold text-[10px] uppercase tracking-widest px-6 h-12 border-2">
                        Download Audit Log
                    </Button>
                    <Button className="rounded-xl font-black text-[10px] uppercase tracking-widest px-6 h-12 shadow-xl shadow-blue-500/20 bg-blue-500 hover:bg-blue-600">
                        Run Security Scan <Activity className="ml-2 h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            <ComplianceDashboard />
        </div>
    )
}
