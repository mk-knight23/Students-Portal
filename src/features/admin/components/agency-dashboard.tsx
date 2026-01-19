"use client"

import { useAppStore } from "@/store/useAppStore"
import { calculateDashboardStats } from "../utils/stats"
import {
    Users,
    TrendingUp,
    DollarSign,
    ExternalLink,
    Plus,
    ShieldCheck,
    Award
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function AgencyDashboard() {
    const { agencies, students } = useAppStore();
    const stats = calculateDashboardStats(students);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Channel Partners</h3>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest leading-none">Category 10.1 - Agency & Referral Management</p>
                </div>
                <Button className="rounded-xl font-bold text-xs uppercase shadow-lg shadow-primary/20 bg-primary h-10 px-6">
                    <Plus className="mr-2 h-4 w-4" /> Onboard Agency
                </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {agencies.map((agency) => (
                    <Card key={agency.id} className="glass-card group hover:border-primary/40 transition-all">
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                    <Users className="h-5 w-5" />
                                </div>
                                <Badge variant="outline" className="text-[8px] font-black uppercase text-green-500 border-green-500/20 bg-green-500/5">
                                    Verified Partner
                                </Badge>
                            </div>
                            <CardTitle className="text-sm font-black uppercase tracking-tight mt-3">{agency.name}</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest">{agency.contactPerson}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-2">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground italic">Referrals</p>
                                    <p className="text-lg font-black">{stats.agencyReferrals[agency.id] || 0}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground italic">Commission</p>
                                    <p className="text-lg font-black">₹{((stats.agencyReferrals[agency.id] || 0) * 5000 / 1000).toFixed(1)}K</p>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-primary">
                                    <TrendingUp className="h-3 w-3" />
                                    +{(stats.agencyReferrals[agency.id] || 0) * 2}% vs last month
                                </div>
                                <Button variant="ghost" size="sm" className="h-7 text-[9px] font-black uppercase gap-1 group/btn">
                                    Analytics <ExternalLink className="h-3 w-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <Card className="glass-card border-dashed flex flex-col items-center justify-center p-8 opacity-60 hover:opacity-100 transition-opacity cursor-pointer group">
                    <div className="h-12 w-12 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
                        <Plus className="h-6 w-6" />
                    </div>
                    <p className="mt-4 text-[10px] font-black uppercase tracking-widest">Connect New Node</p>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mt-10">
                <Card className="glass-card">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="text-lg font-black tracking-tight">Referral Leaderboard</CardTitle>
                                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Global Ranking by branch</p>
                            </div>
                            <Award className="h-5 w-5 text-yellow-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {Object.entries(stats.branchStats)
                                .sort((a, b) => (b[1] as number) - (a[1] as number))
                                .slice(0, 3)
                                .map(([branch, count], i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/20 border border-white/5">
                                        <div className="flex items-center gap-4">
                                            <span className={`text-xl font-black ${i === 0 ? 'text-yellow-500' : 'text-muted-foreground/30'}`}>#{i + 1}</span>
                                            <div>
                                                <p className="text-xs font-black uppercase tracking-tight">{branch}</p>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase italic">{(count as number)} Active Students</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-green-500">+{(count as number) * 0.5}%</span>
                                    </div>
                                ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <div className="rounded-[40px] bg-black p-8 text-white space-y-6 shadow-2xl relative overflow-hidden group border border-white/10">
                        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
                            <ShieldCheck className="h-24 w-24" />
                        </div>
                        <div className="relative z-10 space-y-2">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white w-fit border border-white/20">
                                <DollarSign className="h-3 w-3" />
                                <span className="text-[9px] font-black uppercase tracking-[0.2em]">Commission Engine</span>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight italic">Payouts<br />Ready for Disburse</h3>
                            <p className="text-xs font-bold text-muted-foreground uppercase leading-relaxed tracking-wider max-w-[200px]">
                                Weekly agency settlements are calculated and ready for direct bank transfer.
                            </p>
                        </div>
                        <Button className="w-full rounded-2xl bg-white text-black font-black hover:bg-white/90 relative z-10 h-12">
                            Disburse Management <TrendingUp className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
