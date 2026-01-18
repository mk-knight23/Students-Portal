"use client";

import React from "react";
import Link from "next/link";
import {
    Users,
    FileText,
    CreditCard,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StaffDashboardProps {
    stats: {
        totalStudents: number;
        registeredToday: number;
        pendingDocuments: number;
        pendingPayments: number;
        verifiedToday: number;
    };
    recentActivity: Array<{
        id: string;
        action: string;
        entity: string;
        time: string;
    }>;
}

export function StaffDashboard({ stats, recentActivity }: StaffDashboardProps) {
    return (
        <div className="space-y-6" data-testid="staff-dashboard">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={<Users className="h-5 w-5" />}
                    label="Total Students"
                    value={stats.totalStudents}
                    change={`+${stats.registeredToday} today`}
                    trend="up"
                />
                <StatCard
                    icon={<FileText className="h-5 w-5" />}
                    label="Pending Documents"
                    value={stats.pendingDocuments}
                    change="Needs verification"
                    trend="alert"
                />
                <StatCard
                    icon={<CreditCard className="h-5 w-5" />}
                    label="Pending Payments"
                    value={stats.pendingPayments}
                    change="Awaiting collection"
                    trend="neutral"
                />
                <StatCard
                    icon={<CheckCircle2 className="h-5 w-5" />}
                    label="Verified Today"
                    value={stats.verifiedToday}
                    change="Documents processed"
                    trend="up"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickAction
                    href="/students/add"
                    icon={<Users className="h-6 w-6" />}
                    title="Register Student"
                    description="Add a new student to the system"
                />
                <QuickAction
                    href="/students"
                    icon={<FileText className="h-6 w-6" />}
                    title="Verify Documents"
                    description={`${stats.pendingDocuments} pending verification`}
                    urgent={stats.pendingDocuments > 0}
                />
                <QuickAction
                    href="/payments"
                    icon={<CreditCard className="h-6 w-6" />}
                    title="Record Payment"
                    description="Process fee collection"
                />
            </div>

            {/* Recent Activity */}
            <Card className="glass border-white/10">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Activity</CardTitle>
                    <Link href="/compliance">
                        <Button variant="ghost" size="sm" className="text-xs">
                            View All <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-primary/20">
                                        <Clock className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium">{activity.action}</p>
                                        <p className="text-xs text-muted-foreground">{activity.entity}</p>
                                    </div>
                                </div>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Today's Tasks */}
            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-amber-400" /> Priority Tasks
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <TaskItem
                            title="Verify pending documents"
                            count={stats.pendingDocuments}
                            href="/students"
                        />
                        <TaskItem
                            title="Process pending payments"
                            count={stats.pendingPayments}
                            href="/payments"
                        />
                        <TaskItem
                            title="Follow up on incomplete registrations"
                            count={3}
                            href="/students?status=incomplete"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    change,
    trend,
}: {
    icon: React.ReactNode;
    label: string;
    value: number;
    change: string;
    trend: "up" | "down" | "neutral" | "alert";
}) {
    const trendColors = {
        up: "text-emerald-400",
        down: "text-red-400",
        neutral: "text-muted-foreground",
        alert: "text-amber-400",
    };

    return (
        <Card className="glass border-white/10">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">{icon}</div>
                    {trend === "up" && <TrendingUp className="h-4 w-4 text-emerald-400" />}
                </div>
                <p className="text-2xl font-bold mb-1">{value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className={`text-xs mt-2 ${trendColors[trend]}`}>{change}</p>
            </CardContent>
        </Card>
    );
}

function QuickAction({
    href,
    icon,
    title,
    description,
    urgent,
}: {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
    urgent?: boolean;
}) {
    return (
        <Link href={href}>
            <Card className={`glass ${urgent ? "border-amber-500/30" : "border-white/10"} hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer h-full`}>
                <CardContent className="p-4 flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${urgent ? "bg-amber-500/20 text-amber-400" : "bg-primary/20 text-primary"}`}>
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-semibold">{title}</h3>
                        <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}

function TaskItem({ title, count, href }: { title: string; count: number; href: string }) {
    return (
        <Link href={href}>
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <span className="text-sm">{title}</span>
                <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-2 py-1 rounded-full">
                    {count}
                </span>
            </div>
        </Link>
    );
}
