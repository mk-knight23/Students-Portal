"use client"

import React from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    GraduationCap,
    Wallet,
    Compass,
    IdCard,
    Bell,
    Sparkles
} from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { CommunicationHub } from "@/features/portal/components/communication-hub"
import { FeePaymentPortal } from "@/features/portal/components/fee-payment-portal"
import { IDCardGenerator } from "@/features/portal/components/id-card-generator"
import { CounselingPreferenceBuilder } from "@/features/counseling/components/counseling-preference-builder"
import { SeatAllotmentSim } from "@/features/counseling/components/seat-allotment-sim"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function StudentDashboard() {
    const { students, currentUser } = useAppStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const student = students.find(s => s.id === currentUser?.id) || students[0];

    if (!mounted || !student) return null;

    // Probability Logic
    const neetScore = student.academicHistory?.neet?.score || 0;
    const neetRank = student.academicHistory?.neet?.rank || 0;
    const prob = neetScore > 600 ? 98 : neetScore > 500 ? 85 : 62;

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Hero Header */}
            <div className="bg-black text-white p-10 rounded-[2.5rem] relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-12 opacity-5 blur-xl">
                    <Sparkles className="h-48 w-48 text-primary" />
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-primary/20 backdrop-blur-md flex items-center justify-center font-bold text-xl text-primary border border-primary/20 shadow-inner">
                            {student.name?.split(' ').map(n => n[0]).join('') || 'ST'}
                        </div>
                        <div className="space-y-0.5 text-left">
                            <h1 className="text-3xl md:text-4xl font-black tracking-tight italic leading-none">
                                {student.name?.split(' ')[0] || 'Student'} <span className="text-primary tracking-[-0.05em]">HUB</span>
                            </h1>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40 flex items-center gap-2 mt-1">
                                Operational Status <span className="h-1 w-1 rounded-full bg-green-500 animate-pulse" /> {student.workflowState}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                        <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                            <p className="text-[8px] font-bold uppercase text-white/40 tracking-widest">NEET Score</p>
                            <p className="text-xl font-black italic">{neetScore}</p>
                        </div>
                        <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
                            <p className="text-[8px] font-bold uppercase text-white/40 tracking-widest">National Rank</p>
                            <p className="text-xl font-black italic">#{neetRank.toLocaleString()}</p>
                        </div>
                        <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-left">
                            <p className="text-[8px] font-bold uppercase text-white/40 tracking-widest">Location Node</p>
                            <p className="text-sm font-black italic uppercase tracking-wider">{student.city}, {student.state?.slice(0, 2).toUpperCase()}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Navigation */}
            <div className="space-y-12">
                <Tabs defaultValue="overview" className="space-y-12">
                    <TabsList className="h-16 bg-white/50 backdrop-blur-sm p-1.5 rounded-2xl border border-black/5 shadow-sm w-fit flex gap-1">
                        <TabsTrigger value="overview" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                            <GraduationCap className="h-4 w-4" /> Academic
                        </TabsTrigger>
                        <TabsTrigger value="counseling" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                            <Compass className="h-4 w-4" /> Counseling
                        </TabsTrigger>
                        <TabsTrigger value="finance" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                            <Wallet className="h-4 w-4" /> Finance
                        </TabsTrigger>
                        <TabsTrigger value="id-card" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                            <IdCard className="h-4 w-4" /> Digital ID
                        </TabsTrigger>
                        <TabsTrigger value="inbox" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                            <Bell className="h-4 w-4" /> Inbox
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="focus-visible:outline-none">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-black uppercase tracking-tight italic">Academic Integrity</h2>
                                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Global verification level reached</p>
                                </div>
                                <div className="p-10 rounded-[2.5rem] bg-white border border-black/5 shadow-sm space-y-6">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between border-b border-black/5 pb-4">
                                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">10th Grade Node</span>
                                            <span className="text-sm font-black uppercase tracking-tight">{student.academicHistory?.class10?.board || "CBSE"} SECURED</span>
                                        </div>
                                        <div className="flex items-center justify-between border-b border-black/5 pb-4">
                                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">12th Percentage</span>
                                            <span className="text-sm font-black italic">{student.academicHistory?.class12?.percentage?.toFixed(2) || "0.00"}%</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Registrations</span>
                                            <div className="flex gap-2">
                                                {student.counselingRegistrations?.map(reg => (
                                                    <span key={reg} className="px-2 py-0.5 rounded-lg bg-black text-white text-[8px] font-black uppercase tracking-tighter">{reg}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex flex-col justify-center items-center text-center space-y-8">
                                <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner group">
                                    <Sparkles className="h-10 w-10 text-primary group-hover:scale-125 transition-transform" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl font-black uppercase tracking-tight italic">Admission Index</h3>
                                    <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em] bg-primary/10 px-4 py-1.5 rounded-full inline-block">High Probability: {prob}%</p>
                                    <p className="max-w-xs text-[10px] text-muted-foreground font-medium italic leading-relaxed uppercase tracking-widest mx-auto">
                                        Based on {student.state} state trends and AIR positioning.
                                    </p>
                                </div>
                                <Button className="rounded-2xl h-14 px-8 font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary/20">
                                    Generate Full Prediction
                                </Button>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="counseling" className="focus-visible:outline-none">
                        <div className="grid lg:grid-cols-7 gap-12">
                            <div className="lg:col-span-4">
                                <CounselingPreferenceBuilder />
                            </div>
                            <div className="lg:col-span-3">
                                <SeatAllotmentSim />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="finance" className="focus-visible:outline-none">
                        <FeePaymentPortal />
                    </TabsContent>

                    <TabsContent value="id-card" className="focus-visible:outline-none">
                        <IDCardGenerator />
                    </TabsContent>

                    <TabsContent value="inbox" className="focus-visible:outline-none">
                        <CommunicationHub />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
