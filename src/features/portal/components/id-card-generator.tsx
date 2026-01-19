"use client"

import { useAppStore } from "@/store/useAppStore"
import {
    IdCard,
    Download,
    Printer,
    ShieldCheck,
    QrCode,
    MapPin,
    Calendar,
    User
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function IDCardGenerator() {
    const { students, currentUser } = useAppStore();
    const student = students.find(s => s.id === currentUser?.id) || students[0];

    if (student.status !== "Confirmed" && student.status !== "Admission") {
        return (
            <Card className="glass-card bg-muted/20 border-dashed">
                <CardContent className="py-12 flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-muted/40 text-muted-foreground/30">
                        <IdCard className="h-10 w-10" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-black uppercase tracking-tight text-muted-foreground">Digital ID Not Ready</h4>
                        <p className="max-w-xs text-[10px] text-muted-foreground/60 font-medium leading-relaxed uppercase tracking-widest">
                            ID Card generation is only available for confirmed students after final admission verification.
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* ID Card Display */}
                <div className="w-80 h-[500px] bg-white text-black rounded-[2.5rem] shadow-2xl relative overflow-hidden border border-black/5 selection:bg-black/10 flex flex-col">
                    {/* Header / Brand */}
                    <div className="h-[140px] bg-black p-8 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <IdCard className="h-32 w-32" />
                        </div>
                        <div className="relative z-10 space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] italic opacity-60">Success Platform</p>
                            <h2 className="text-2xl font-black uppercase tracking-tighter leading-none italic">AME Portal</h2>
                            <h3 className="text-[8px] font-black uppercase tracking-[0.3em] opacity-40 mt-1">Academic Year 2026-27</h3>
                        </div>
                    </div>

                    {/* Photo & Info */}
                    <div className="flex-1 p-8 space-y-6 flex flex-col items-center">
                        <div className="h-28 w-28 rounded-3xl bg-muted p-1 border-4 border-black/5 -mt-20 relative bg-white">
                            <div className="w-full h-full rounded-2xl bg-muted flex items-center justify-center text-muted-foreground/20">
                                <User className="h-12 w-12" />
                            </div>
                        </div>

                        <div className="text-center space-y-1">
                            <h3 className="text-lg font-black uppercase tracking-tight leading-none">{student.name}</h3>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase italic tracking-widest">{student.category} Student • {student.state}</p>
                        </div>

                        <div className="w-full space-y-4">
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="h-5 px-1.5 rounded-lg border-black/10 font-bold text-[7px] bg-black/5 text-black">REG_ID</Badge>
                                <span className="text-xs font-black font-mono tracking-widest">{student.id}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="h-5 px-1.5 rounded-lg border-black/10 font-bold text-[7px] bg-black/5 text-black">BRANCH</Badge>
                                <span className="text-xs font-black uppercase tracking-tight">{student.branch} Hub</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge variant="outline" className="h-5 px-1.5 rounded-lg border-black/10 font-bold text-[7px] bg-black/5 text-black">EXPIRES</Badge>
                                <span className="text-xs font-black uppercase tracking-tight">July 2027</span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 w-full flex items-center justify-between border-t border-black/5">
                            <QrCode className="h-12 w-12 opacity-80" />
                            <div className="text-right">
                                <p className="text-[7px] font-black uppercase tracking-widest opacity-40">Digital Node</p>
                                <p className="text-[10px] font-black uppercase italic tracking-tight text-primary">Verified Hub</p>
                            </div>
                        </div>
                    </div>

                    {/* Safety Bar */}
                    <div className="h-1.5 w-full bg-primary" />
                </div>

                {/* Controls */}
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-black uppercase tracking-tight italic">Digital Identity Node</h3>
                        <p className="text-xs text-muted-foreground font-medium italic leading-relaxed">
                            This ID card is a cryptographically signed document verifiable at any AME partner node. It serves as your official entry pass for regional counseling and enrollment hubs.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button className="h-14 rounded-[1.5rem] bg-primary text-white font-black uppercase text-xs shadow-xl shadow-primary/20">
                            <Download className="mr-2 h-4 w-4" /> Download PDF
                        </Button>
                        <Button variant="outline" className="h-14 rounded-[1.5rem] border-2 font-black uppercase text-xs">
                            <Printer className="mr-2 h-4 w-4" /> Print Copy
                        </Button>
                    </div>

                    <div className="p-6 rounded-[2rem] bg-green-500/5 border border-green-500/10 flex items-start gap-4">
                        <div className="p-3 bg-green-500 rounded-2xl text-white">
                            <ShieldCheck className="h-6 w-6" />
                        </div>
                        <div className="space-y-1">
                            <h4 className="text-xs font-black uppercase tracking-tight text-green-500 italic">Integrity Secure</h4>
                            <p className="text-[10px] text-muted-foreground font-bold leading-relaxed uppercase tracking-widest">
                                Metadata includes Verhoeff-validated Aadhaar hash and APAAR linkage for national registry compatibility.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
