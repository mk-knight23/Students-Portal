"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users, FileCheck, Clock, CheckCircle2, AlertTriangle,
    ArrowRight, Search, Filter, Download, BarChart3
} from "lucide-react"
import { Input } from "@/components/ui/input"

import { mockStudents } from "@/modules/students/mock-data"

export default function HeadDashboardPage() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Dynamic Stats Calculation
    const totalStudents = mockStudents.length;
    const pendingVerificationsCount = mockStudents.reduce((acc, s) =>
        acc + s.documents.filter(d => d.status === 'uploaded' || d.status === 'pending').length, 0);

    const verifiedToday = Math.floor(totalStudents * 0.15);
    const rejectedCount = mockStudents.reduce((acc, s) =>
        acc + s.documents.filter(d => d.status === 'rejected').length, 0);

    if (!mounted) return null;

    const stats = [
        { label: 'Pending Verifications', value: pendingVerificationsCount, icon: Clock, color: 'text-yellow-500' },
        { label: 'Branch Conversions', value: '72%', icon: BarChart3, color: 'text-blue-500' },
        { label: 'Rejected', value: rejectedCount, icon: AlertTriangle, color: 'text-red-500' },
        { label: 'Total Students', value: totalStudents, icon: Users, color: 'text-primary' },
    ]

    const pendingVerifications = mockStudents
        .flatMap(s => s.documents.map(d => ({ ...d, studentName: s.name, studentId: s.id })))
        .filter(d => d.status === 'uploaded' || d.status === 'pending')
        .slice(0, 5)
        .map(d => ({
            id: d.id,
            studentId: d.studentId,
            name: d.studentName,
            document: d.type.replace(/_/g, ' ').toUpperCase(),
            submittedAt: '2 hours ago'
        }));

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 w-fit border border-blue-500/20">
                        <BarChart3 className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Strategy Node</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        Branch <span className="text-blue-500 italic">Headquarters</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Operational oversight and conversion analytics for your assigned branch.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="glass-card">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-2xl font-black">{stat.value}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                        {stat.label}
                                    </p>
                                </div>
                                <stat.icon className={`h-8 w-8 ${stat.color} opacity-50`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            Pending Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {pendingVerifications.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">{item.name}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <span>{item.studentId}</span>
                                        <span>•</span>
                                        <span>{item.document}</span>
                                    </div>
                                </div>
                                <Button size="sm" variant="ghost" className="h-8">
                                    Track
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            Conversion Funnel
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { label: 'Inquiry to Application', value: '85%' },
                                { label: 'Verification Complete', value: '92%' },
                                { label: 'Counseling Paid', value: '45%' }
                            ].map(funnel => (
                                <div key={funnel.label} className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                                        <span>{funnel.label}</span>
                                        <span>{funnel.value}</span>
                                    </div>
                                    <div className="h-2 w-full bg-muted/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: funnel.value }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
