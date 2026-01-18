"use client";

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
} from "recharts";
import {
    TrendingUp,
    Users,
    AlertCircle,
    FileSpreadsheet,
    FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export function AnalyticsDashboard({
    stats,
    funnel,
    categoryMix,
    dailyRevenue
}: {
    stats: any;
    funnel: any[];
    categoryMix: any[];
    dailyRevenue: any[];
}) {
    const handleExport = (format: string) => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: `Preparing ${format} report...`,
                success: `Report exported successfully!`,
                error: "Export failed.",
            }
        );
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-white mb-2">Intelligence & Analytics</h1>
                    <p className="text-muted-foreground text-sm uppercase tracking-[0.3em] font-bold">Strategic Oversight Module</p>
                </div>
                <div className="flex gap-4">
                    <Select defaultValue="branch">
                        <SelectTrigger className="w-[200px] glass rounded-2xl">
                            <SelectValue placeholder="Scope" />
                        </SelectTrigger>
                        <SelectContent className="glass-dark border-white/10">
                            <SelectItem value="branch">Current Tenant View</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="flex gap-2">
                        <Button onClick={() => handleExport("Excel")} variant="outline" className="glass border-white/10 gap-2 rounded-2xl px-6 font-bold hover:bg-emerald-500/10 hover:text-emerald-500 h-11">
                            <FileSpreadsheet className="h-4 w-4" /> Export XLSX
                        </Button>
                        <Button onClick={() => handleExport("PDF")} variant="outline" className="glass border-white/10 gap-2 rounded-2xl px-6 font-bold hover:bg-red-500/10 hover:text-red-500 h-11">
                            <FileText className="h-4 w-4" /> Export PDF
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="glass border-white/10 rounded-[2.5rem] p-8 group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:text-blue-500 transition-colors">
                            <Users className="h-6 w-6" />
                        </div>
                        <Badge className="bg-white/5 text-emerald-500 border-emerald-500/20 text-[10px] py-0 px-2">+12%</Badge>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tight mb-1">{stats.totalStudents}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Total Applicants</p>
                </Card>
                <Card className="glass border-white/10 rounded-[2.5rem] p-8 group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:text-primary transition-colors">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                        <Badge className="bg-white/5 text-emerald-500 border-emerald-500/20 text-[10px] py-0 px-2">+22%</Badge>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tight mb-1">₹ {stats.totalRevenue.toLocaleString()}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Settled Revenue</p>
                </Card>
                <Card className="glass border-white/10 rounded-[2.5rem] p-8 group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:text-amber-500 transition-colors">
                            <AlertCircle className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tight mb-1">{stats.pendingDocs}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Pending Verifications</p>
                </Card>
                <Card className="glass border-white/10 rounded-[2.5rem] p-8 group hover:border-primary/30 transition-all">
                    <div className="flex justify-between items-start mb-6">
                        <div className="h-12 w-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:text-emerald-500 transition-colors">
                            <TrendingUp className="h-6 w-6" />
                        </div>
                    </div>
                    <p className="text-3xl font-black text-white tracking-tight mb-1">94%</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Admissions Forecast</p>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 glass border-white/10 rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-10 pb-0">
                        <CardTitle className="text-xl font-bold text-white">Conversion Lifecycle</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[450px] p-10 pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={funnel} layout="vertical" margin={{ left: 40 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                                <XAxis type="number" hide />
                                <YAxis
                                    dataKey="name"
                                    type="category"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: "bold" }}
                                />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" radius={[0, 12, 12, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="glass border-white/10 rounded-[3rem]">
                    <CardHeader className="p-10 pb-0">
                        <CardTitle className="text-xl font-bold text-white">Category Mix</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[450px] p-10 flex flex-col items-center">
                        <ResponsiveContainer width="100%" height="80%">
                            <PieChart>
                                <Pie
                                    data={categoryMix}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={120}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {categoryMix.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 glass border-white/10 rounded-[3rem]">
                    <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-bold text-white">Settlement Velocity</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="h-[400px] p-10 pt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dailyRevenue}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: "bold" }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10, fontWeight: "bold" }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
