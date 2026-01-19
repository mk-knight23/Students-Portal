"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Users, TrendingUp, Wallet, CheckCircle2, Clock,
    ArrowRight, ArrowUpRight, Download
} from "lucide-react"

import { useAppStore } from "@/store/useAppStore"
import { mockStudents } from "@/modules/students/mock-data"

export default function AgentDashboardPage() {
    const { currentUser, students } = useAppStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const agentId = currentUser?.id || 'AGT001';

    // Filter students referred by this agent
    const myReferrals = students.filter(s => s.referralAgentId === agentId);

    // Fallback for demo: if no referrals found for this ID, show some random ones from mockStudents to demonstrate UI
    const displayedReferrals = myReferrals.length > 0 ? myReferrals : mockStudents.slice(0, 5);

    const agentStats = {
        totalReferrals: displayedReferrals.length,
        activeStudents: displayedReferrals.filter(s => ['documents', 'verification', 'counseling'].includes(s.workflowState)).length,
        conversions: displayedReferrals.filter(s => ['allotment', 'enrollment'].includes(s.workflowState)).length,
        totalEarnings: displayedReferrals.length * 10000, // Mock calculation
        pendingCommissions: displayedReferrals.filter(s => s.workflowState !== 'enrollment').length * 10000,
    }

    const conversionRate = agentStats.totalReferrals > 0
        ? Math.round((agentStats.conversions / agentStats.totalReferrals) * 100)
        : 0;

    const referralsList = displayedReferrals.map(s => ({
        id: `REF${s.id}`,
        studentName: s.name,
        status: s.workflowState === 'enrollment' ? 'enrolled' : 'active',
        stage: s.workflowState.charAt(0).toUpperCase() + s.workflowState.slice(1),
        commission: 10000,
        commissionStatus: s.workflowState === 'enrollment' ? 'paid' : 'pending'
    }));

    const commissionsList = referralsList.filter(r => r.commissionStatus === 'paid').map(r => ({
        id: `COM${r.id}`,
        student: r.studentName,
        amount: r.commission,
        status: 'Paid',
        date: '15 Jan 2026'
    }));

    if (!mounted) return null;

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="space-y-2">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 w-fit border border-purple-500/20">
                    <Users className="h-3 w-3" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Agent Portal</span>
                </div>
                <h1 className="text-3xl font-black tracking-tight">
                    Welcome, <span className="text-primary">{currentUser?.name || 'Agent'}</span>
                </h1>
                <p className="text-sm text-muted-foreground font-medium">
                    Partner ID: {agentId} • South Maharashtra Zone
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="glass-card">
                    <CardContent className="pt-6 text-center">
                        <p className="text-3xl font-black text-primary">{agentStats.totalReferrals}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Total Referrals
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardContent className="pt-6 text-center">
                        <p className="text-3xl font-black text-blue-500">{agentStats.activeStudents}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Active
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardContent className="pt-6 text-center">
                        <p className="text-3xl font-black text-green-500">{agentStats.conversions}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Conversions
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardContent className="pt-6 text-center">
                        <p className="text-3xl font-black">{conversionRate}%</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Conversion Rate
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <p className="text-2xl font-black">₹{(agentStats.totalEarnings / 1000).toFixed(0)}K</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Total Earnings
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Referral List */}
                <Card className="lg:col-span-2 glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <Users className="h-5 w-5 text-primary" />
                            My Referrals
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                            {referralsList.length} students
                        </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {referralsList.map((ref) => (
                            <div key={ref.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 hover:bg-muted/30 transition-colors">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold">{ref.studentName}</p>
                                    <div className="flex items-center gap-2">
                                        <Badge
                                            variant={ref.status === 'enrolled' ? 'default' : 'secondary'}
                                            className="text-[10px]"
                                        >
                                            {ref.stage}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-sm font-bold">₹{ref.commission.toLocaleString()}</p>
                                    <Badge
                                        variant={
                                            ref.commissionStatus === 'paid' ? 'default' :
                                                ref.commissionStatus === 'approved' ? 'secondary' : 'outline'
                                        }
                                        className="text-[10px]"
                                    >
                                        {ref.commissionStatus}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                        <Button variant="ghost" className="w-full text-xs font-bold text-primary">
                            View All Referrals <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Commission Tracker */}
                <div className="space-y-6">
                    <Card className="glass-card border-green-500/20">
                        <CardHeader className="pb-3">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <Wallet className="h-4 w-4 text-green-500" />
                                Commission Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                                <span className="text-xs font-bold">Total Earned</span>
                                <span className="text-lg font-black text-green-500">₹{agentStats.totalEarnings.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <span className="text-xs font-bold">Pending</span>
                                <span className="text-lg font-black text-yellow-500">₹{agentStats.pendingCommissions.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2 text-sm font-bold">
                                <TrendingUp className="h-4 w-4 text-primary" />
                                Recent Payouts
                            </CardTitle>
                            <Button variant="ghost" size="sm" className="text-xs">
                                <Download className="mr-2 h-3 w-3" />
                                Export
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {commissionsList.map((com) => (
                                <div key={com.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                                    <div>
                                        <p className="text-xs font-medium">{com.student}</p>
                                        <p className="text-[10px] text-muted-foreground">{com.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold">₹{com.amount.toLocaleString()}</p>
                                        <Badge variant={com.status === 'Paid' ? 'default' : 'secondary'} className="text-[9px]">
                                            {com.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
