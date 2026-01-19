"use client"

import { useAppStore } from "@/store/useAppStore"
import { COUNSELING_TYPES } from "@/constants/portal"
import { calculateDashboardStats } from "../utils/stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MapPin, Users, CalendarClock } from "lucide-react"

export function CounselingMonitor() {
    const { students } = useAppStore();

    const getStats = (typeId: string) => {
        const registered = students.filter(s => s.counselingRegistrations?.includes(typeId as any)).length;
        const total = students.length;
        const percentage = total > 0 ? (registered / total) * 100 : 0;
        return { registered, total, percentage };
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card md:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg font-black tracking-tight">Active Counseling Rounds</CardTitle>
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Real-time Registration Tracker</p>
                    </div>
                    <Badge variant="outline" className="text-[10px] font-black uppercase text-green-500 border-green-500/20 bg-green-500/5">
                        Round 1 Active
                    </Badge>
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-6 pt-4">
                    {COUNSELING_TYPES.map((type) => {
                        const stats = getStats(type.id);
                        return (
                            <div key={type.id} className="p-4 rounded-2xl bg-muted/20 border border-white/5 space-y-4 hover:border-primary/20 transition-all group">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black uppercase tracking-tight group-hover:text-primary transition-colors">{type.label}</h4>
                                        <p className="text-[10px] text-muted-foreground leading-tight">{type.description}</p>
                                    </div>
                                    <Users className="h-4 w-4 text-muted-foreground/30" />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black">
                                        <span className="text-muted-foreground uppercase italic">{stats.registered} Registered</span>
                                        <span className="text-primary">{Math.round(stats.percentage)}%</span>
                                    </div>
                                    <Progress value={stats.percentage} className="h-1.5" />
                                </div>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <CalendarClock className="h-4 w-4 text-primary" />
                        Upcoming Deadlines
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        { label: "MH-CET Preference Locking", date: "22 Jan 2026", timeLeft: "3 Days Left", color: "text-red-500" },
                        { label: "Karnataka Open State Registration", date: "25 Jan 2026", timeLeft: "6 Days Left", color: "text-yellow-500" },
                        { label: "AIQ Choice Filling - Round 1", date: "28 Jan 2026", timeLeft: "9 Days Left", color: "text-muted-foreground" },
                    ].map((d, i) => (
                        <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-muted/10 border border-white/5">
                            <div className="space-y-0.5">
                                <p className="text-[10px] font-black uppercase tracking-tight">{d.label}</p>
                                <p className="text-[10px] text-muted-foreground">{d.date}</p>
                            </div>
                            <span className={`text-[9px] font-black uppercase ${d.color}`}>{d.timeLeft}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card className="glass-card">
                <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        State Distribution
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {Object.entries(calculateDashboardStats(students).stateDist).map(([state, count], i) => {
                        const studentCount = count as number;
                        return (
                            <div key={i} className="space-y-1.5">
                                <div className="flex justify-between text-[10px] font-bold uppercase">
                                    <span>{state}</span>
                                    <span className="text-muted-foreground">{studentCount} Students</span>
                                </div>
                                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-500 opacity-70" style={{ width: `${(studentCount / students.length) * 100}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </CardContent>
            </Card>
        </div>
    )
}
