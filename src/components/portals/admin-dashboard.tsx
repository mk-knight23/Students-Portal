"use client";

import React from "react";
import Link from "next/link";
import {
    Building2,
    Users,
    CreditCard,
    TrendingUp,
    Settings,
    Shield,
    BarChart3,
    Palette,
    ArrowUpRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface AdminDashboardProps {
    stats: {
        totalBranches: number;
        totalStudents: number;
        totalRevenue: number;
        conversionRate: number;
        branchStats: Array<{
            id: string;
            name: string;
            students: number;
            revenue: number;
        }>;
    };
}

export function AdminDashboard({ stats }: AdminDashboardProps) {
    return (
        <div className="space-y-6" data-testid="admin-dashboard">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <OverviewCard
                    icon={<Building2 className="h-5 w-5" />}
                    label="Active Branches"
                    value={stats.totalBranches}
                    subtext="Across all regions"
                />
                <OverviewCard
                    icon={<Users className="h-5 w-5" />}
                    label="Total Students"
                    value={stats.totalStudents}
                    subtext="All branches combined"
                />
                <OverviewCard
                    icon={<CreditCard className="h-5 w-5" />}
                    label="Total Revenue"
                    value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}
                    subtext="This counseling session"
                />
                <OverviewCard
                    icon={<TrendingUp className="h-5 w-5" />}
                    label="Conversion Rate"
                    value={`${stats.conversionRate}%`}
                    subtext="Registration to Confirmation"
                />
            </div>

            {/* Branch Performance */}
            <Card className="glass border-white/10">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Branch Performance</CardTitle>
                    <Link href="/reports">
                        <Button variant="ghost" size="sm" className="text-xs">
                            Detailed Reports <ArrowUpRight className="h-3 w-3 ml-1" />
                        </Button>
                    </Link>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {stats.branchStats.map((branch) => (
                            <BranchRow
                                key={branch.id}
                                name={branch.name}
                                students={branch.students}
                                revenue={branch.revenue}
                                maxRevenue={Math.max(...stats.branchStats.map(b => b.revenue))}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Admin Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <AdminActionCard
                    href="/settings/branches"
                    icon={<Building2 className="h-6 w-6" />}
                    title="Manage Branches"
                    description="Add or edit branch locations"
                />
                <AdminActionCard
                    href="/settings/users"
                    icon={<Users className="h-6 w-6" />}
                    title="User Management"
                    description="Staff roles & permissions"
                />
                <AdminActionCard
                    href="/compliance"
                    icon={<Shield className="h-6 w-6" />}
                    title="Audit Logs"
                    description="View system activity"
                />
                <AdminActionCard
                    href="/settings/branding"
                    icon={<Palette className="h-6 w-6" />}
                    title="Branding"
                    description="Customize portal appearance"
                />
            </div>

            {/* Quick Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="glass border-white/10">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-primary" /> Category Distribution
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            <CategoryBar label="Open" percent={42} color="bg-blue-500" />
                            <CategoryBar label="OBC" percent={28} color="bg-violet-500" />
                            <CategoryBar label="SC" percent={15} color="bg-amber-500" />
                            <CategoryBar label="ST" percent={8} color="bg-emerald-500" />
                            <CategoryBar label="EWS" percent={7} color="bg-pink-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass border-white/10">
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Settings className="h-5 w-5 text-primary" /> System Health
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <HealthItem label="Database" status="healthy" />
                            <HealthItem label="API Response" status="healthy" value="48ms avg" />
                            <HealthItem label="Storage" status="warning" value="78% used" />
                            <HealthItem label="Email Service" status="healthy" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

function OverviewCard({
    icon,
    label,
    value,
    subtext,
}: {
    icon: React.ReactNode;
    label: string;
    value: string | number;
    subtext: string;
}) {
    return (
        <Card className="glass border-white/10">
            <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">{icon}</div>
                </div>
                <p className="text-2xl font-bold mb-1">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xs text-primary/80 mt-1">{subtext}</p>
            </CardContent>
        </Card>
    );
}

function BranchRow({
    name,
    students,
    revenue,
    maxRevenue,
}: {
    name: string;
    students: number;
    revenue: number;
    maxRevenue: number;
}) {
    const percent = (revenue / maxRevenue) * 100;

    return (
        <div className="flex items-center gap-4">
            <div className="w-24 font-medium">{name}</div>
            <div className="flex-1">
                <Progress value={percent} className="h-2" />
            </div>
            <div className="w-20 text-right text-sm">{students} students</div>
            <div className="w-24 text-right text-sm font-medium">₹{(revenue / 1000).toFixed(0)}K</div>
        </div>
    );
}

function AdminActionCard({
    href,
    icon,
    title,
    description,
}: {
    href: string;
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <Link href={href}>
            <Card className="glass border-white/10 hover:border-primary/50 transition-all hover:scale-[1.02] cursor-pointer h-full">
                <CardContent className="p-4 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/20 text-primary">
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

function CategoryBar({ label, percent, color }: { label: string; percent: number; color: string }) {
    return (
        <div className="flex items-center gap-3">
            <div className="w-12 text-sm text-muted-foreground">{label}</div>
            <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width: `${percent}%` }} />
            </div>
            <div className="w-10 text-right text-sm font-medium">{percent}%</div>
        </div>
    );
}

function HealthItem({
    label,
    status,
    value,
}: {
    label: string;
    status: "healthy" | "warning" | "error";
    value?: string;
}) {
    const statusColors = {
        healthy: "bg-emerald-500",
        warning: "bg-amber-500",
        error: "bg-red-500",
    };

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
                <span className="text-sm">{label}</span>
            </div>
            {value && <span className="text-xs text-muted-foreground">{value}</span>}
        </div>
    );
}
