"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    GraduationCap,
    FileText,
    CreditCard,
    ClipboardList,
    Bell,
    User,
    ChevronRight,
    CheckCircle2,
    Clock,
    AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Timeline } from "@/components/ui/timeline";
import { Progress } from "@/components/ui/progress";

interface StudentPortalProps {
    student: {
        name: string;
        status: string;
        neetRank: string;
        neetScore: number;
        documentsVerified: number;
        documentsTotal: number;
        allottedCollege?: string;
    };
}

export function StudentPortalDashboard({ student }: StudentPortalProps) {
    const completionPercent = Math.round((student.documentsVerified / student.documentsTotal) * 100);

    const journeySteps = [
        { id: "1", label: "Registration", status: "completed" as const },
        { id: "2", label: "Documents", status: student.documentsVerified === student.documentsTotal ? "completed" as const : "current" as const },
        { id: "3", label: "Preferences", status: student.status === "CHOICES_FILLED" ? "completed" as const : "upcoming" as const },
        { id: "4", label: "Allotment", status: student.status === "ALLOTTED" ? "completed" as const : "upcoming" as const },
        { id: "5", label: "Confirmation", status: student.status === "CONFIRMED" ? "completed" as const : "upcoming" as const },
    ];

    return (
        <div className="space-y-6" data-testid="student-portal">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass border border-white/10 rounded-2xl p-6 bg-gradient-to-r from-primary/20 to-violet-600/20"
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Welcome, {student.name}!</h1>
                        <p className="text-muted-foreground">
                            NEET Rank: <span className="font-semibold text-primary">{student.neetRank}</span> •
                            Score: <span className="font-semibold">{student.neetScore}</span>
                        </p>
                    </div>
                    <StatusBadge variant={student.status.toLowerCase() as any}>
                        {student.status.replace("_", " ")}
                    </StatusBadge>
                </div>
            </motion.div>

            {/* Journey Timeline */}
            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle className="text-lg">Your Admission Journey</CardTitle>
                </CardHeader>
                <CardContent>
                    <Timeline steps={journeySteps} orientation="horizontal" />
                </CardContent>
            </Card>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionCard
                    icon={<FileText className="h-6 w-6" />}
                    title="Documents"
                    description={`${student.documentsVerified}/${student.documentsTotal} verified`}
                    href="/students/documents"
                    progress={completionPercent}
                    status={completionPercent === 100 ? "complete" : "pending"}
                />
                <QuickActionCard
                    icon={<ClipboardList className="h-6 w-6" />}
                    title="Fill Preferences"
                    description="Select your colleges"
                    href="/counseling"
                    status={student.status === "CHOICES_FILLED" ? "complete" : "action"}
                />
                <QuickActionCard
                    icon={<CreditCard className="h-6 w-6" />}
                    title="Payments"
                    description="View fee status"
                    href="/payments"
                    status="info"
                />
                <QuickActionCard
                    icon={<Bell className="h-6 w-6" />}
                    title="Notifications"
                    description="3 new updates"
                    href="/notifications"
                    badge={3}
                    status="alert"
                />
            </div>

            {/* Allotment Result (if allotted) */}
            {student.allottedCollege && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass border border-emerald-500/30 bg-emerald-500/10 rounded-2xl p-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-emerald-500/20">
                            <GraduationCap className="h-8 w-8 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold text-emerald-400">Congratulations!</h3>
                            <p className="text-sm text-muted-foreground">
                                You have been allotted: <span className="font-semibold text-white">{student.allottedCollege}</span>
                            </p>
                        </div>
                        <Button className="rounded-xl bg-emerald-500 hover:bg-emerald-600">
                            Confirm Admission
                        </Button>
                    </div>
                </motion.div>
            )}

            {/* Important Dates */}
            <Card className="glass border-white/10">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" /> Important Dates
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        <DateItem date="Jan 25, 2026" event="Round 1 Preference Deadline" urgent />
                        <DateItem date="Feb 1, 2026" event="Round 1 Allotment" />
                        <DateItem date="Feb 5, 2026" event="Fee Payment Deadline" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function QuickActionCard({
    icon,
    title,
    description,
    href,
    progress,
    badge,
    status,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    href: string;
    progress?: number;
    badge?: number;
    status: "complete" | "pending" | "action" | "info" | "alert";
}) {
    const statusColors = {
        complete: "border-emerald-500/30 hover:border-emerald-500/50",
        pending: "border-amber-500/30 hover:border-amber-500/50",
        action: "border-primary/30 hover:border-primary/50",
        info: "border-white/10 hover:border-white/20",
        alert: "border-red-500/30 hover:border-red-500/50",
    };

    return (
        <Link href={href}>
            <Card className={`glass ${statusColors[status]} transition-all hover:scale-[1.02] cursor-pointer`}>
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className={`p-2 rounded-lg ${status === "complete" ? "bg-emerald-500/20 text-emerald-400" : "bg-primary/20 text-primary"}`}>
                            {icon}
                        </div>
                        {badge && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {badge}
                            </span>
                        )}
                        {status === "complete" && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                    </div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{description}</p>
                    {progress !== undefined && (
                        <Progress value={progress} className="h-1.5" />
                    )}
                </CardContent>
            </Card>
        </Link>
    );
}

function DateItem({ date, event, urgent }: { date: string; event: string; urgent?: boolean }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <div className="flex items-center gap-3">
                {urgent ? (
                    <AlertCircle className="h-4 w-4 text-amber-400" />
                ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                )}
                <span className={urgent ? "font-medium text-amber-400" : ""}>{event}</span>
            </div>
            <span className="text-sm text-muted-foreground">{date}</span>
        </div>
    );
}
