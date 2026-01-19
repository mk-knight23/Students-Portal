"use client"

import React from "react"

import { AdminKPIGrid } from "@/features/admin/components/admin-kpi-grid"
import { CounselingMonitor } from "@/features/admin/components/counseling-monitor"
import { ShieldCheck, ArrowRight, Activity, Download, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
                        <ShieldCheck className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Admin Console</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight italic">
                        EXECUTIVE <span className="text-primary tracking-[-0.05em]">CONSOLE</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium max-w-lg">
                        Real-time operational overview across all branches and students.
                        Full administrative access enabled.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl font-bold text-xs uppercase tracking-widest px-6">
                        <Download className="mr-2 h-3.5 w-3.5" />
                        Export All
                    </Button>
                    <Button variant="outline" className="rounded-xl font-bold text-xs uppercase tracking-widest px-6">
                        <Settings className="mr-2 h-3.5 w-3.5" />
                        Settings
                    </Button>
                    <Button className="rounded-xl font-bold text-xs uppercase tracking-widest px-6 shadow-lg shadow-primary/20 bg-primary">
                        Quick Actions <Activity className="ml-2 h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>

            <AdminKPIGrid />

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <CounselingMonitor />
                </div>
                <div className="space-y-8">
                    <div className="rounded-3xl border bg-card p-8 glass-card space-y-6">
                        <div className="space-y-1">
                            <h3 className="font-black text-lg">System Health</h3>
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Global Status Index</p>
                        </div>
                        <div className="space-y-4">
                            {[
                                { label: "Database Sync", status: "Operational", color: "bg-green-500" },
                                { label: "Document OCR Engine", status: "High Load", color: "bg-yellow-500" },
                                { label: "Payment Gateway", status: "Operational", color: "bg-green-500" },
                                { label: "State API - 85% Quota", status: "Operational", color: "bg-green-500" },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-tight">{s.label}</span>
                                    <div className="flex items-center gap-2">
                                        <span className={`h-2 w-2 rounded-full ${s.color} animate-pulse`} />
                                        <span className="text-[10px] font-bold opacity-70">{s.status}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full text-xs font-bold text-primary group">
                            View Network logs
                            <ArrowRight className="ml-2 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
