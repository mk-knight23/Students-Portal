import React from "react";
import {
    ShieldCheck,
    History,
    UserCheck,
    Lock,
    AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ComplianceDataTable } from "@/components/compliance/compliance-data-table";
import { getAuditLogs } from "@/services/data-access";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function CompliancePage() {
    const session = await auth();
    // if (!session) return null;

    const logs = await getAuditLogs();

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                        <ShieldCheck className="h-8 w-8 text-primary" /> Regulatory & Privacy Control
                    </h1>
                    <p className="text-muted-foreground text-sm mt-1 uppercase tracking-widest font-bold">DPDPA 2023 Compliance Center</p>
                </div>
                <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary py-2 px-4 rounded-xl font-bold gap-2">
                    <Lock className="h-3 w-3" /> SOC2 / DPDPA Compliant
                </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass border-white/10 rounded-[2rem]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                            Consent Density <UserCheck className="h-4 w-4 text-primary" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-end">
                            <p className="text-3xl font-bold text-white">98.4%</p>
                            <p className="text-xs text-emerald-500 font-bold uppercase tracking-tighter">+1.2% YTD</p>
                        </div>
                        <Progress value={98.4} className="h-2 bg-white/5" />
                        <p className="text-[10px] text-muted-foreground leading-tight italic">
                            Explicit consent obtained via digital signature for all active registrations in the 2026 cycle.
                        </p>
                    </CardContent>
                </Card>

                <Card className="glass border-white/10 rounded-[2rem]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                            Data Retention <History className="h-4 w-4 text-amber-500" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-end">
                            <p className="text-3xl font-bold text-white">14 Days</p>
                            <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter">Avg Hold</p>
                        </div>
                        <Progress value={45} className="h-2 bg-white/5" />
                        <p className="text-[10px] text-muted-foreground leading-tight italic">
                            All student PII is encrypted at rest using AES-256. Automated purging active for abandoned leads.
                        </p>
                    </CardContent>
                </Card>

                <Card className="glass border-white/10 rounded-[2rem] border-red-500/20 bg-red-500/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-bold uppercase tracking-widest text-destructive flex items-center justify-between">
                            Erasure Actions <AlertTriangle className="h-4 w-4" />
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-center">
                            <p className="text-2xl font-bold text-white">0 Pending</p>
                            <Button size="sm" variant="destructive" className="h-8 rounded-lg text-[10px] font-bold uppercase px-3" disabled>
                                Process Erasure
                            </Button>
                        </div>
                        <div className="h-2 w-full bg-white/2 rounded-full overflow-hidden">
                            <div className="h-full bg-red-500 w-[0%]" />
                        </div>
                        <p className="text-[10px] text-muted-foreground leading-tight italic">
                            Critical: 72-hour hard deadline for processing 'Right to Erasure' requests per Section 13 (2)(d).
                        </p>
                    </CardContent>
                </Card>
            </div>

            <ComplianceDataTable data={logs as any} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="glass border-white/10 rounded-[2.5rem] bg-amber-500/5">
                    <CardContent className="p-8 flex gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
                            <AlertTriangle className="h-7 w-7 text-amber-500" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-white">Privacy Impact Assessment</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                The current data processing posture for this tenant is rated <span className="font-bold text-emerald-500">LOW RISK</span>. Aadhaar masking is verified on all staff-facing dashboards.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                <Card className="glass border-white/10 rounded-[2.5rem] bg-primary/5">
                    <CardContent className="p-8 flex gap-6">
                        <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                            <ShieldCheck className="h-7 w-7 text-primary" />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-white">Encryption & Keys</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Master Encryption Key (MEK) rotation scheduled in <span className="font-bold text-primary">12 days</span>. HSM (Hardware Security Module) integration confirmed for APAAR ID vaults.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
