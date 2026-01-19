"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Timeline } from "@/components/ui/timeline"
import {
    GraduationCap, FileText, CreditCard,
    User, BookOpen, Eye, Sparkles
} from "lucide-react"

import { useAppStore } from "@/store/useAppStore"
import { workflowStates } from "@/modules/students/mock-data"

export default function AdjustedParentDashboardPage() {
    const { currentUser, students } = useAppStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const studentId = currentUser?.id.replace('PAR', '') || students[0]?.id;
    const student = students.find(s => s.id === studentId) || students[0];

    if (!mounted || !student) return null;

    const currentStepIndex = workflowStates.indexOf(student.workflowState);
    const workflowSteps = workflowStates.map((step, index) => ({
        id: step,
        label: step.charAt(0).toUpperCase() + step.slice(1),
        status: index < currentStepIndex ? 'completed' as const
            : index === currentStepIndex ? 'current' as const
                : 'upcoming' as const,
        date: index <= currentStepIndex ? 'Verified' : undefined
    }));

    const completedSteps = workflowSteps.filter(s => s.status === 'completed').length;
    const progress = Math.min(100, Math.round((completedSteps + (student.workflowState ? 0.5 : 0)) / workflowSteps.length * 100));

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-700">
            {/* Hero Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-bold text-[10px] uppercase tracking-widest">
                        <Eye className="h-3 w-3" />
                        Parental Oversight Node
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                            Ward <span className="text-blue-500">Status</span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2">
                            Tracking: {student.name} <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" /> Live Admission Sync
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass-card border-blue-500/20 bg-blue-500/5">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Admission Progress</CardTitle>
                            <Sparkles className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic">{progress}%</div>
                        <Progress value={progress} className="h-1.5 mt-4 bg-blue-500/10" indicatorClassName="bg-blue-500" />
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">NEET Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic text-primary">{student.academicHistory?.neet?.score || "N/A"}</div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mt-1">Global Verification Index</p>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Document Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-black italic">
                            {student.documents.filter(d => d.status === 'verified').length}/{student.documents.length}
                        </div>
                        <p className="text-[10px] font-bold uppercase text-muted-foreground mt-1">Verified Nodes</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-7 gap-10">
                <Card className="lg:col-span-4 glass-card border-none bg-muted/5">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg font-black uppercase tracking-tight italic">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            Admission Journey
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Timeline steps={workflowSteps} />
                    </CardContent>
                </Card>

                <div className="lg:col-span-3 space-y-6">
                    <Card className="glass-card">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest">
                                <FileText className="h-4 w-4 text-primary" />
                                Critical Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {student.documents.slice(0, 4).map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-2xl bg-muted/20 border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-tight truncate max-w-[150px]">{doc.type.replace(/_/g, ' ')}</span>
                                    <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'} className="text-[8px] font-black uppercase tracking-tighter rounded-lg">
                                        {doc.status}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="glass-card bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-primary">
                                <CreditCard className="h-4 w-4" />
                                Financial Node
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between border-b border-primary/10 pb-4">
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Total Fee Paid</span>
                                    <span className="text-lg font-black italic">₹{student.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase text-muted-foreground">Outstanding</span>
                                    <span className="text-lg font-black italic text-primary">₹{student.payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
