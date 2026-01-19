"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users, FileCheck, Clock, CheckCircle2, AlertTriangle,
    ArrowRight, Search, Filter, Download
} from "lucide-react"
import { Input } from "@/components/ui/input"

import { mockStudents } from "@/modules/students/mock-data"

export default function StaffDashboardPage() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    // Dynamic Stats Calculation
    const totalStudents = mockStudents.length;
    const pendingVerificationsCount = mockStudents.reduce((acc, s) =>
        acc + s.documents.filter(d => d.status === 'uploaded' || d.status === 'pending').length, 0);

    // Mocking "Verified Today" based on random factor for demo vitality
    const verifiedToday = Math.floor(totalStudents * 0.15);
    const rejectedCount = mockStudents.reduce((acc, s) =>
        acc + s.documents.filter(d => d.status === 'rejected').length, 0);

    if (!mounted) return null;

    const stats = [
        { label: 'Pending Verifications', value: pendingVerificationsCount, icon: Clock, color: 'text-yellow-500' },
        { label: 'Verified Today', value: verifiedToday, icon: CheckCircle2, color: 'text-green-500' },
        { label: 'Rejected', value: rejectedCount, icon: AlertTriangle, color: 'text-red-500' },
        { label: 'Total Students', value: totalStudents, icon: Users, color: 'text-primary' },
    ]

    // Derive Pending Verifications List
    const pendingVerifications = mockStudents
        .flatMap(s => s.documents.map(d => ({ ...d, studentName: s.name, studentId: s.id })))
        .filter(d => d.status === 'uploaded' || d.status === 'pending')
        .slice(0, 5)
        .map(d => ({
            id: d.id, // THE UNIQUE DOCUMENT ID
            studentId: d.studentId, // THE STUDENT ID
            name: d.studentName,
            document: d.type.replace(/_/g, ' ').toUpperCase(),
            submittedAt: '2 hours ago'
        }));

    // Derive Recent Payments List
    const recentPayments = mockStudents
        .flatMap(s => s.payments.map(p => ({ ...p, studentName: s.name })))
        .sort((a, b) => new Date(b.paidAt || 0).getTime() - new Date(a.paidAt || 0).getTime())
        .slice(0, 5)
        .map(p => ({
            id: p.id,
            studentName: p.studentName,
            amount: p.amount,
            type: p.type.charAt(0).toUpperCase() + p.type.slice(1),
            status: p.status === 'paid' ? 'Success' : 'Pending'
        }));


    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 w-fit border border-emerald-500/20">
                        <FileCheck className="h-3 w-3" />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
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
                {/* Pending Verifications */}
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <Clock className="h-5 w-5 text-yellow-500" />
                            Pending Verifications
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                            {pendingVerifications.length} pending
                        </Badge>
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
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-muted-foreground">{item.submittedAt}</span>
                                    <Button size="sm" className="text-xs h-8">
                                        Review
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" className="w-full text-xs font-bold text-primary">
                            View All Pending <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Recent Payments */}
                <Card className="glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            Recent Payments
                        </CardTitle>
                        <Button variant="outline" size="sm" className="text-xs">
                            <Download className="mr-2 h-3 w-3" />
                            Export
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recentPayments.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/20">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">{payment.studentName}</p>
                                    <p className="text-xs text-muted-foreground">{payment.type} Fee</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">₹{payment.amount.toLocaleString()}</p>
                                    <Badge variant={payment.status === 'Success' ? 'default' : 'secondary'} className="text-[10px]">
                                        {payment.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" className="w-full text-xs font-bold text-primary">
                            View All Transactions <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
