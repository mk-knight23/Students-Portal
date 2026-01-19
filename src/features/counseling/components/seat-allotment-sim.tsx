"use client"

import { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import colleges from "@/services/mock/colleges.json"
import {
    Trophy,
    MapPin,
    CheckCircle2,
    ArrowRight,
    ShieldCheck,
    Building2,
    Calendar,
    Lock,
    Info
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SeatAllotmentSim() {
    const [mounted, setMounted] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [result, setResult] = useState<any>(null);
    const { currentUser, students } = useAppStore();

    // Find current student or fallback to first for demo safety
    const student = students.find(s => s.id === currentUser?.id) || students[0];

    useState(() => {
        setMounted(true);
    });

    if (!mounted || !student) return null;

    const runAllotment = async () => {
        setIsRunning(true);
        // Simulate complex merit calculation
        await new Promise(resolve => setTimeout(resolve, 4000));

        // Simple logic: allot the first college in preferences if score > cutoff-50
        const pref = student.preferences?.[0];
        const college = colleges.find(c => c.id === (pref as any)?.collegeId);

        if (college) {
            setResult({
                success: true,
                college: college,
                round: "Round 1 (General Merit)",
                date: new Date().toLocaleDateString(),
                token: "AME-ALLOT-77221"
            });
        } else {
            setResult({
                success: false,
                message: "No Seat Allotted in Round 1. Please wait for Round 2."
            });
        }
        setIsRunning(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {!result ? (
                <Card className="glass-card shadow-2xl border-primary/20 overflow-hidden">
                    <div className="aspect-[21/9] bg-primary/10 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                        <Trophy className={`h-20 w-20 text-primary/40 ${isRunning ? 'animate-bounce' : ''}`} />
                        {isRunning && (
                            <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                                <div className="h-2 w-64 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-white animate-[progress_4s_ease-in-out]" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Cross-referencing 10.4L Records...</p>
                            </div>
                        )}
                    </div>
                    <CardContent className="p-10 space-y-6 text-center">
                        <div className="space-y-2">
                            <h3 className="text-2xl font-black uppercase tracking-tight italic leading-none">Merit List Terminal</h3>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest leading-relaxed">
                                Round 1 Allocation Node is now accepting merit tokens for {student.state} State Quota.
                            </p>
                        </div>
                        <Button
                            className="w-full h-16 rounded-[2rem] bg-primary text-white font-black uppercase tracking-widest text-sm shadow-2xl shadow-primary/30"
                            onClick={runAllotment}
                            disabled={isRunning}
                        >
                            {isRunning ? "Calculating Allotment..." : "Run Allotment Simulator"} <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <div className="flex items-center justify-center gap-2 text-[8px] font-black uppercase text-muted-foreground tracking-[0.2em] pt-4">
                            <Lock className="h-3.5 w-3.5" /> Deterministic Algorithm v4.2.0 • Zero-Bias Core
                        </div>
                    </CardContent>
                </Card>
            ) : result.success ? (
                <div className="space-y-6 animate-in zoom-in duration-500">
                    <Card className="border-green-500/20 bg-green-500/5 glass-card overflow-hidden">
                        <CardHeader className="bg-green-500/10 border-b border-green-500/10 pb-6">
                            <div className="flex items-center justify-between">
                                <Badge className="bg-green-500 text-white font-black uppercase text-[8px]">Allotment Confirmation</Badge>
                                <span className="text-[10px] font-black text-green-500 uppercase">{result.round}</span>
                            </div>
                            <CardTitle className="text-3xl font-black uppercase tracking-tighter mt-4 italic leading-tight">
                                Congratultions! Seat Secured
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-8">
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="h-32 w-32 rounded-3xl bg-white p-4 shadow-xl flex items-center justify-center border border-black/5">
                                    <Building2 className="h-16 w-16 text-primary" />
                                </div>
                                <div className="flex-1 space-y-4">
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-black uppercase tracking-tight leading-none">{result.college.name}</h4>
                                        <p className="text-sm text-muted-foreground font-bold uppercase tracking-widest flex items-center gap-1">
                                            <MapPin className="h-3.5 w-3.5" /> {result.college.city}, {result.college.state}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-3 rounded-2xl bg-white shadow-sm border border-black/5">
                                            <p className="text-[8px] font-black uppercase text-muted-foreground">Course Allotted</p>
                                            <p className="text-xs font-black">MBBS (General)</p>
                                        </div>
                                        <div className="p-3 rounded-2xl bg-white shadow-sm border border-black/5">
                                            <p className="text-[8px] font-black uppercase text-muted-foreground">Seat Type</p>
                                            <p className="text-xs font-black">Govt. Quota (G-MH)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-[2rem] bg-black text-white space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Calendar className="h-4 w-4 text-primary" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Reporting Deadline</span>
                                    </div>
                                    <span className="text-sm font-black italic text-primary">Feb 02, 2026</span>
                                </div>
                                <div className="flex items-center justify-between opacity-60">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="h-4 w-4" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Allotment Token</span>
                                    </div>
                                    <span className="text-xs font-mono font-bold">{result.token}</span>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-4">
                                <Button className="flex-1 h-14 rounded-3xl bg-primary font-black uppercase tracking-widest shadow-xl shadow-primary/20">
                                    Accept & Proceed to Fees
                                </Button>
                                <Button variant="outline" className="h-14 rounded-3xl px-8 border-2 font-black uppercase text-xs">
                                    Hold (Round 2 Upgrade)
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <Card className="glass-card border-red-500/20 bg-red-500/5">
                    <CardContent className="p-12 text-center space-y-6">
                        <div className="h-20 w-20 bg-red-500/10 rounded-full mx-auto flex items-center justify-center text-red-500">
                            <Info className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight italic">No Allotment</h3>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                            {result.message} Your preferences didn't match the current cut-off thresholds for Round 1.
                        </p>
                        <Button variant="outline" className="h-12 rounded-2xl px-10 border-2 font-black uppercase text-xs" onClick={() => setResult(null)}>
                            Refine Preferences
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
