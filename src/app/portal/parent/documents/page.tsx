"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, CheckCircle2, Clock, AlertCircle, ShieldCheck } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"

export default function AdjustedParentDocumentsPage() {
    const { currentUser, students } = useAppStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const studentId = currentUser?.id.replace('PAR', '') || students[0]?.id;
    const student = students.find(s => s.id === studentId) || students[0];

    if (!mounted || !student) return null;

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 font-bold text-[10px] uppercase tracking-widest">
                        <FileText className="h-3 w-3" />
                        Document Repository
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                            Legal <span className="text-blue-500">Vault</span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2">
                            {student.name} <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" /> Verified Node
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {student.documents.map((doc, i) => (
                    <Card key={i} className="glass-card group hover:border-blue-500/40 transition-all">
                        <CardHeader className="pb-3 text-left">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500">
                                    <FileText className="h-5 w-5" />
                                </div>
                                <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'} className="text-[8px] font-black uppercase tracking-tighter rounded-lg">
                                    {doc.status}
                                </Badge>
                            </div>
                            <CardTitle className="text-xs font-black uppercase tracking-tight leading-tight">
                                {doc.type.replace(/_/g, ' ')}
                            </CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">
                                Version 1.0.3
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-3 p-3 rounded-2xl bg-muted/20 border border-white/5">
                                {doc.status === 'verified' ? (
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="h-4 w-4 text-green-500" />
                                        <span className="text-[9px] font-black uppercase text-green-500 tracking-widest">Audit Passed</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-yellow-500" />
                                        <span className="text-[9px] font-black uppercase text-yellow-500 tracking-widest">Awaiting Verification</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
