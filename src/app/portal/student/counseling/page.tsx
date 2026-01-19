"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    GraduationCap, CheckCircle2, Clock, ArrowLeft,
    FileEdit, Calendar, MapPin, Users, ArrowRight
} from "lucide-react"
import Link from "next/link"

import { useAppStore } from "@/store/useAppStore"
import { mockStudents } from "@/modules/students/mock-data"
import { mockColleges } from "@/modules/counseling/mock-data"

export default function StudentCounselingPage() {
    const { currentUser, students } = useAppStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const student = students.find(s => s.id === currentUser?.id) || mockStudents[0];

    if (!mounted || !student) return null;

    const counselingSessions = [
        { id: 'state_85', label: 'Mah. State 85%', desc: 'Maharashtra State Quota' },
        { id: 'aiq', label: 'AIQ 15%', desc: 'All India Quota' },
        { id: 'deemed', label: 'Deemed', desc: 'Deemed Universities' }
    ].map(type => {
        const isRegistered = student.counselingRegistrations.includes(type.id as any);
        return {
            id: type.id,
            type: type.label,
            name: `${type.label} Counseling`,
            status: isRegistered ? 'registered' as const : 'not_registered' as const,
            currentRound: 1,
            totalRounds: 3,
            deadline: '28 Jan 2026',
            choicesFilled: student.preferences.length, // Simplified
            description: type.desc
        }
    });

    const preferenceList = student.preferences.map(pref => {
        const college = mockColleges.find(c => c.id === pref.collegeId);
        return {
            rank: pref.rank,
            college: college?.name || 'Unknown College',
            course: 'MBBS',
            fee: `₹${(college?.fees.tuition || 0).toLocaleString()}/yr`
        }
    }).sort((a, b) => a.rank - b.rank);

    const statusConfig = {
        not_registered: { color: 'bg-muted', label: 'Not Registered', icon: Clock },
        registered: { color: 'bg-blue-500', label: 'Registered', icon: CheckCircle2 },
        choice_filling: { color: 'bg-yellow-500', label: 'Choice Filling', icon: FileEdit },
        locked: { color: 'bg-purple-500', label: 'Choices Locked', icon: CheckCircle2 },
        allotted: { color: 'bg-green-500', label: 'Seat Allotted', icon: CheckCircle2 },
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="space-y-4">
                <Link href="/portal/student/dashboard">
                    <Button variant="ghost" size="sm" className="text-xs">
                        <ArrowLeft className="mr-2 h-3 w-3" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
                        <GraduationCap className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Counseling Center</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">
                        Admission <span className="text-primary">Counseling</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium">
                        Register for counseling sessions and fill your college preferences
                    </p>
                </div>
            </div>

            {/* Your Details Card */}
            <Card className="glass-card border-primary/20">
                <CardContent className="pt-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">NEET Score</p>
                            <p className="text-lg font-black text-primary">{student.academicHistory?.neet?.score || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">All India Rank</p>
                            <p className="text-lg font-black">{student.academicHistory?.neet?.rank?.toLocaleString() || 'N/A'}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">Category</p>
                            <p className="text-lg font-black capitalize">{student.category}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] text-muted-foreground uppercase font-bold">State</p>
                            <p className="text-lg font-black">{student.state}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Counseling Sessions */}
            <div className="space-y-4">
                <h2 className="text-lg font-bold">Available Counseling Sessions</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {counselingSessions.map((session) => {
                        const config = statusConfig[session.status]
                        const StatusIcon = config.icon

                        return (
                            <Card key={session.id} className="glass-card hover:border-primary/30 transition-all">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <Badge variant="outline" className="text-[10px]">
                                            {session.type}
                                        </Badge>
                                        <Badge className={`text-[10px] ${config.color}`}>
                                            <StatusIcon className="h-3 w-3 mr-1" />
                                            {config.label}
                                        </Badge>
                                    </div>
                                    <CardTitle className="text-base font-bold mt-2">
                                        {session.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <p className="text-xs text-muted-foreground">{session.description}</p>

                                    <div className="flex items-center gap-4 text-xs">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3 w-3 text-muted-foreground" />
                                            <span>{session.deadline}</span>
                                        </div>
                                        {session.currentRound && (
                                            <div className="flex items-center gap-1">
                                                <Users className="h-3 w-3 text-muted-foreground" />
                                                <span>Round {session.currentRound}/{session.totalRounds}</span>
                                            </div>
                                        )}
                                    </div>

                                    {session.status === 'registered' && session.choicesFilled && (
                                        <p className="text-xs text-primary font-medium">
                                            {session.choicesFilled} choices filled
                                        </p>
                                    )}

                                    <Button
                                        className="w-full text-xs font-bold"
                                        variant={session.status === 'not_registered' ? 'default' : 'outline'}
                                    >
                                        {session.status === 'not_registered' ? 'Register Now' : 'Manage Choices'}
                                        <ArrowRight className="ml-2 h-3 w-3" />
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </div>

            {/* Current Preferences */}
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <MapPin className="h-5 w-5 text-primary" />
                        Your Preferences (State 85%)
                    </CardTitle>
                    <Button variant="outline" size="sm" className="text-xs">
                        <FileEdit className="mr-2 h-3 w-3" />
                        Edit Choices
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {preferenceList.map((pref) => (
                            <div
                                key={pref.rank}
                                className="flex items-center gap-4 p-3 rounded-xl bg-muted/20"
                            >
                                <div className="bg-primary/10 text-primary font-black text-sm h-8 w-8 rounded-full flex items-center justify-center">
                                    {pref.rank}
                                </div>
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{pref.college}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {pref.course} • {pref.fee}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                        Showing top 5 of 15 preferences • Last updated: 18 Jan 2026
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
