"use client"

import { useAppStore } from "@/store/useAppStore"
import { calculateDashboardStats } from "../utils/stats"
import {
    DollarSign,
    CreditCard,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Wallet,
    PieChart,
    Download,
    ShieldCheck
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function FinancialTracker() {
    const { students } = useAppStore();
    const stats = calculateDashboardStats(students);
    const { totalRevenueTarget, collectedRevenue, pendingRevenue, paymentVelocity } = stats.financialStats;

    const collectionRate = (collectedRevenue / totalRevenueTarget) * 100;

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid md:grid-cols-4 gap-6">
                <Card className="glass-card bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest leading-none">Total Collection</CardDescription>
                        <CardTitle className="text-2xl font-black italic mt-1">₹{(collectedRevenue / 1000).toFixed(1)}K</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-green-500">
                            <ArrowUpRight className="h-3 w-3" /> +24% vs last week
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest leading-none">Pending Receivables</CardDescription>
                        <CardTitle className="text-2xl font-black italic mt-1 text-red-500">₹{(pendingRevenue / 100000).toFixed(1)}L</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-red-500">
                            <ArrowDownRight className="h-3 w-3" /> High Risk (Feb 15)
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest leading-none">Installment Velocity</CardDescription>
                        <CardTitle className="text-2xl font-black italic mt-1 text-blue-500">{Math.round(paymentVelocity)}%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-blue-500">
                            On-time payments
                        </div>
                    </CardContent>
                </Card>

                <Card className="glass-card">
                    <CardHeader className="pb-2">
                        <CardDescription className="text-[10px] font-black uppercase tracking-widest leading-none">Collection Rate</CardDescription>
                        <CardTitle className="text-2xl font-black italic mt-1 text-orange-500">{Math.round(collectionRate)}%</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-1.5 text-[10px] font-black uppercase text-orange-500">
                            of annual target
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-7 gap-8">
                <Card className="lg:col-span-4 glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-lg font-black tracking-tight uppercase">Cash Flow Engine</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">Real-time installment tracking</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="rounded-xl h-9 text-[10px] font-black uppercase tracking-widest gap-2">
                            <Download className="h-3.5 w-3.5" /> Ledger
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest italic">
                                <span>Latur Hub (BR01)</span>
                                <span className="text-primary">{stats.branchStats['Latur Hub'] || 0} Students</span>
                            </div>
                            <Progress value={(stats.branchStats['Latur Hub'] || 0) / (students.length / 3) * 100} className="h-2 rounded-full" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest italic text-muted-foreground">
                                <span>Pune Center (BR02)</span>
                                <span>{stats.branchStats['Pune Tech'] || 0} Students</span>
                            </div>
                            <Progress value={(stats.branchStats['Pune Tech'] || 0) / (students.length / 3) * 100} className="h-2 rounded-full" />
                        </div>

                        <div className="pt-6 space-y-4">
                            <h4 className="text-xs font-black uppercase border-b pb-2">Recent Transactions</h4>
                            {stats.recentTransactions.map((tx, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/10 border border-white/5 group">
                                    <div className="flex items-center gap-4">
                                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black text-[10px] ${tx.status === 'Success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                                            }`}>
                                            {tx.status === 'Success' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase">{tx.studentName}</p>
                                            <p className="text-[10px] font-bold text-muted-foreground uppercase">{new Date(tx.date).toLocaleDateString()} • {tx.type}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black italic">₹{tx.amount.toLocaleString()}</p>
                                        <p className={`text-[8px] font-black uppercase ${tx.status === 'Success' ? 'text-green-500' : 'text-red-500'}`}>
                                            {tx.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-3 space-y-6">
                    <Card className="glass-card bg-black text-white border-white/10 overflow-hidden relative">
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <PieChart className="h-48 w-48" />
                        </div>
                        <CardHeader>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white w-fit border border-white/20">
                                <Wallet className="h-3 w-3" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Management Fee Engine</span>
                            </div>
                            <CardTitle className="text-2xl font-black mt-4 italic">Next Disbursement</CardTitle>
                            <CardDescription className="text-white/60 font-bold uppercase tracking-widest text-[10px]">Processing Stage: Final Review</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-black">₹4,22,400.00</span>
                                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest flex items-center gap-1">
                                    <ShieldCheck className="h-3 w-3" /> All security nodes cleared
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                                    <p className="text-[8px] font-black uppercase text-white/40">Entities</p>
                                    <p className="text-sm font-black">14 Agents</p>
                                </div>
                                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                                    <p className="text-[8px] font-black uppercase text-white/40">Due Date</p>
                                    <p className="text-sm font-black">Jan 23</p>
                                </div>
                            </div>
                            <Button className="w-full h-12 rounded-2xl bg-white text-black font-black hover:bg-white/90">
                                Confirm Disbursement
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="p-6 rounded-3xl bg-orange-500/5 border border-orange-500/10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-orange-500 rounded-xl text-white">
                                <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-tight italic">Upcoming Deadlines</h4>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Fee Collection Cycles</p>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-bold">
                                <span className="uppercase italic text-muted-foreground">Hostel Deposit (B2)</span>
                                <span className="font-black text-orange-500 underline">JAN 25</span>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-bold">
                                <span className="uppercase italic text-muted-foreground">Tuition - 2nd Installment</span>
                                <span className="font-black text-orange-500 underline">FEB 10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
