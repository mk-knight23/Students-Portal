"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, Lock, EyeOff, ClipboardList, Database, Bell } from "lucide-react"

export function ComplianceDashboard() {
    const complianceLogs = [
        { event: "Consent Recorded", type: "DPDPA", user: "ST2026001", time: "2m ago", status: "Verified" },
        { event: "Aadhaar Masking Applied", type: "Security", user: "ST2026001", time: "15m ago", status: "Success" },
        { event: "Right to Erasure Request", type: "Compliance", user: "ST2025882", time: "1h ago", status: "Pending" },
        { event: "PII Data Access Logged", type: "Audit", user: "ADM001", time: "3h ago", status: "Encrypted" },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="glass-card border-green-500/20 bg-green-500/5">
                    <CardHeader className="pb-2">
                        <ShieldCheck className="h-6 w-6 text-green-500 mb-2" />
                        <CardTitle className="text-sm font-black uppercase tracking-tight">DPDPA 2023 Ready</CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-widest leading-none">Status: Fully Compliant</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">98.2%</div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">Consent Coverage Index</p>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <Lock className="h-6 w-6 text-blue-500 mb-2" />
                        <CardTitle className="text-sm font-black uppercase tracking-tight">Data Encryption</CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-widest leading-none">AES-256-GCM Active</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">1.4 TB</div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">Encrypted Storage at Rest</p>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <EyeOff className="h-6 w-6 text-purple-500 mb-2" />
                        <CardTitle className="text-sm font-black uppercase tracking-tight">Anonymization</CardTitle>
                        <CardDescription className="text-[10px] uppercase font-bold tracking-widest leading-none">Masking Engine v2.0</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-black">100%</div>
                        <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">Aadhaar Masking Enforcement</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass-card">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black tracking-tight">Compliance Audit Trail</CardTitle>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Category 14.1 - Real-time activity logging</p>
                            </div>
                            <ClipboardList className="h-5 w-5 text-muted-foreground/30" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {complianceLogs.map((log, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-white/5 group hover:border-primary/20 transition-all">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center text-xs font-black">
                                            {log.type[0]}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase leading-tight">{log.event}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium">User: {log.user} • {log.time}</p>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-lg ${log.status === 'Verified' ? 'text-green-500 border-green-500/20' :
                                        log.status === 'Pending' ? 'text-yellow-500 border-yellow-500/20' : 'text-blue-500 border-blue-500/20'
                                        }`}>
                                        {log.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card className="glass-card h-fit">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                <Database className="h-4 w-4 text-primary" />
                                Retention Policy
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-2">
                                <p className="text-[10px] font-black uppercase text-primary">Auto-cleanup Profile</p>
                                <p className="text-xs font-medium text-muted-foreground">Records deleted after 36 months of inactivity as per DPDPA guidelines.</p>
                                <div className="pt-2">
                                    <Button size="sm" variant="outline" className="w-full text-[9px] font-black uppercase rounded-lg">Update Policy</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card h-fit border-red-500/20">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-red-500">
                                <Bell className="h-4 w-4" />
                                Alerting Node
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-2">
                                <p className="text-[10px] font-black uppercase text-red-500">Breach Notification</p>
                                <p className="text-xs font-medium text-muted-foreground">Automatic 72-hour notification mechanism is ENABLED.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
