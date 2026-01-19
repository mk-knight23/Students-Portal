"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, ShieldCheck, TrendingUp, DollarSign } from "lucide-react"
import { useAppStore } from "@/store/useAppStore"
import { Button } from "@/components/ui/button"

export default function AdjustedParentPaymentsPage() {
    const { currentUser, students } = useAppStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const studentId = currentUser?.id.replace('PAR', '') || students[0]?.id;
    const student = students.find(s => s.id === studentId) || students[0];

    if (!mounted || !student) return null;

    const totalPaid = student.payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
    const totalPending = student.payments.filter(p => p.status !== 'paid').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="space-y-10 pb-20 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
                        <DollarSign className="h-3 w-3" />
                        Secure Payment Node
                    </div>
                    <div className="space-y-1">
                        <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                            Financial <span className="text-emerald-500">Node</span>
                        </h1>
                        <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2">
                            {student.name} <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Asset Tracking
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-[40px] bg-black p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group border border-white/10">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <TrendingUp className="h-24 w-24" />
                    </div>
                    <div className="relative z-10 space-y-2 text-left">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white w-fit border border-white/20">
                            <ShieldCheck className="h-3 w-3" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Settled Assets</span>
                        </div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight italic">₹{totalPaid.toLocaleString()}</h3>
                        <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed tracking-widest">Total Fees Transferred & Confirmed</p>
                    </div>
                </div>

                <div className="rounded-[40px] bg-primary/10 p-8 text-primary space-y-6 border border-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                        <CreditCard className="h-24 w-24" />
                    </div>
                    <div className="relative z-10 space-y-2 text-left">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary w-fit border border-primary/20 text-left">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em]">Outstanding</span>
                        </div>
                        <h3 className="text-4xl font-black uppercase tracking-tighter leading-tight italic">₹{totalPending.toLocaleString()}</h3>
                        <p className="text-[10px] font-bold text-primary/60 uppercase leading-relaxed tracking-widest">Payment Pipeline Awaiting Execution</p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <h3 className="text-xl font-black uppercase tracking-tight italic flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-emerald-500" /> Transactions
                </h3>
                <div className="space-y-4">
                    {student.payments.map((payment, i) => (
                        <Card key={i} className="glass-card group hover:border-emerald-500/40 transition-all overflow-hidden border-none text-left">
                            <CardContent className="flex items-center justify-between p-6">
                                <div className="flex items-center gap-6">
                                    <div className="h-12 w-12 rounded-2xl bg-muted/20 border border-white/5 flex items-center justify-center font-black text-xs text-muted-foreground">
                                        F{i + 1}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black uppercase tracking-tight italic">{payment.type} Fee</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            {payment.paidAt ? `TXN DATE: ${new Date(payment.paidAt).toLocaleDateString()}` : 'STATUS: PENDING DISBURSEMENT'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <p className="text-lg font-black italic tracking-tighter">₹{payment.amount.toLocaleString()}</p>
                                        <Badge variant={payment.status === 'paid' ? 'default' : 'secondary'} className={`text-[8px] font-black uppercase tracking-tighter rounded-lg ${payment.status === 'paid' ? 'bg-emerald-500 text-white' : ''}`}>
                                            {payment.status}
                                        </Badge>
                                    </div>
                                    <Button size="icon" variant="ghost" className="rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                                        <TrendingUp className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
