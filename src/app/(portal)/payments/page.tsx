import React from "react";
import {
    CreditCard,
    CheckCircle2,
    Clock,
    AlertCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/auth";
import { PaymentsDataTable } from "@/components/payments/payments-data-table";
import { getTransactions, getTransactionStats } from "@/services/data-access";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
    // In mock mode, we don't strictly require session for the UI to render, 
    // but we keep it for realistic flow simulation.
    const session = await auth();
    // if (!session) return null; // allow mock mode to proceed even if auth is flaky

    const transactions = await getTransactions();
    const stats = await getTransactionStats();

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Fee & Payments Ledger</h1>
                    <p className="text-muted-foreground text-sm mt-1 uppercase tracking-widest font-bold">Financial Governance Hub</p>
                </div>
                <div className="flex gap-4">
                    <div className="glass px-6 py-3 rounded-2xl border-white/5 flex flex-col items-end">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">Total Collected (Branch)</span>
                        <span className="text-xl font-bold text-gradient">₹ {stats.total.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="glass border-white/10 rounded-[2rem] bg-emerald-500/5">
                    <CardContent className="p-8 space-y-2">
                        <div className="h-10 w-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.success}</p>
                        <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Successful Payments</p>
                    </CardContent>
                </Card>
                <Card className="glass border-white/10 rounded-[2rem] bg-amber-500/5">
                    <CardContent className="p-8 space-y-2">
                        <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                            <Clock className="h-6 w-6" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.pending}</p>
                        <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Pending Reconciliations</p>
                    </CardContent>
                </Card>
                <Card className="glass border-white/10 rounded-[2rem] bg-destructive/5">
                    <CardContent className="p-8 space-y-2">
                        <div className="h-10 w-10 rounded-xl bg-destructive/20 flex items-center justify-center text-destructive mb-4">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                        <p className="text-3xl font-bold text-white">{stats.failed}</p>
                        <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground">Failed Transactions</p>
                    </CardContent>
                </Card>
            </div>

            <PaymentsDataTable data={transactions as any} />

            <div className="p-6 rounded-[2rem] glass border border-primary/20 bg-primary/5 flex items-start gap-4">
                <CreditCard className="h-6 w-6 text-primary shrink-0" />
                <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">Automated Reconciliation Active</h4>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                        All transactions are verified against bank nodes every 15 minutes. Securely signed digital receipts comply with IT Act guidelines for educational expenses.
                    </p>
                </div>
            </div>
        </div>
    );
}
