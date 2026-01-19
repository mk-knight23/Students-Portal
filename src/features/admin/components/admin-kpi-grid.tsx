"use client"

import { useAppStore } from "@/store/useAppStore"
import { calculateDashboardStats } from "../utils/stats"
import { Users, UserCheck, Clock, ShieldAlert, TrendingUp, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminKPIGrid() {
    const { students } = useAppStore();
    const stats = calculateDashboardStats(students);

    const topCity = Object.entries(stats.cityDist).sort((a, b) => (b[1] as number) - (a[1] as number))[0];
    const verificationRate = Math.round((stats.verified / stats.total) * 100);

    const kpis = [
        {
            label: "Total Registrations",
            value: stats.total,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            trend: "100+ Nodes Verified"
        },
        {
            label: "Top City Hub",
            value: topCity ? topCity[0] : "N/A",
            icon: Target,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            trend: `${Math.round(((topCity?.[1] as number || 0) / stats.total) * 100)}% of Total Nodes`
        },
        {
            label: "Operational Stats",
            value: `${verificationRate}%`,
            icon: UserCheck,
            color: "text-green-500",
            bg: "bg-green-500/10",
            trend: "Data Integrity Scanned"
        },
        {
            label: "Action Required",
            value: stats.pending,
            icon: Clock,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            trend: "Awaiting Verification"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpis.map((kpi, i) => (
                <Card key={i} className="glass-card overflow-hidden group hover:scale-[1.01] transition-all duration-300">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                            {kpi.label}
                        </CardTitle>
                        <div className={`p-1.5 rounded-lg ${kpi.bg} ${kpi.color}`}>
                            <kpi.icon className="h-3.5 w-3.5" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black tracking-tight">{kpi.value.toLocaleString()}</div>
                        <div className="flex items-center gap-1.5 mt-2">
                            <TrendingUp className={`h-3 w-3 ${kpi.color} opacity-70`} />
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{kpi.trend}</p>
                        </div>
                    </CardContent>
                    <div className={`h-1 w-full mt-2 ${kpi.bg}`}>
                        <div className={`h-full ${kpi.color.replace('text-', 'bg-')} transition-all duration-1000`} style={{ width: '60%' }} />
                    </div>
                </Card>
            ))}
        </div>
    )
}
