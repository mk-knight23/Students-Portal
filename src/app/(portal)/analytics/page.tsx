"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, IndianRupee, PieChart, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const stats = [
    { label: "Total Students", value: "524", change: "+12%", icon: Users, color: "text-blue-500" },
    { label: "Revenue", value: "₹1.25 Cr", change: "+18%", icon: IndianRupee, color: "text-green-500" },
    { label: "Conversion Rate", value: "67%", change: "+5%", icon: TrendingUp, color: "text-purple-500" },
    { label: "Avg. Processing", value: "2.4 days", change: "-15%", icon: BarChart3, color: "text-orange-500" },
];

const categoryData = [
    { category: "Open", count: 210, percentage: 40 },
    { category: "OBC", count: 145, percentage: 28 },
    { category: "SC", count: 78, percentage: 15 },
    { category: "ST", count: 42, percentage: 8 },
    { category: "EWS", count: 49, percentage: 9 },
];

const funnelData = [
    { stage: "Registered", count: 524, color: "bg-blue-500" },
    { stage: "Choices Filled", count: 312, color: "bg-purple-500" },
    { stage: "Allotted", count: 156, color: "bg-orange-500" },
    { stage: "Confirmed", count: 89, color: "bg-green-500" },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                <p className="text-muted-foreground">Insights and performance metrics</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
                {stats.map((stat, i) => (
                    <Card key={i} className="glass-card">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                                    {stat.change}
                                </Badge>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-bold">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="glass">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChart className="h-5 w-5" /> Category Distribution
                        </CardTitle>
                        <CardDescription>Students by reservation category</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {categoryData.map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.category}</span>
                                    <span className="text-muted-foreground">{item.count} ({item.percentage}%)</span>
                                </div>
                                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percentage}%` }}
                                        transition={{ duration: 1, delay: i * 0.1 }}
                                        className="h-full bg-primary"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="glass">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <LineChart className="h-5 w-5" /> Conversion Funnel
                        </CardTitle>
                        <CardDescription>Student journey stages</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {funnelData.map((item, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <div className={`w-3 h-3 rounded-full ${item.color}`} />
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium">{item.stage}</span>
                                        <span>{item.count}</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-white/10 overflow-hidden mt-1">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${(item.count / 524) * 100}%` }}
                                            transition={{ duration: 1, delay: i * 0.15 }}
                                            className={`h-full ${item.color}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="glass">
                <CardHeader>
                    <CardTitle>Monthly Revenue Trend</CardTitle>
                    <CardDescription>Revenue collection over time</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-4 h-48">
                        {[
                            { month: "Jan", revenue: 25, label: "₹25L" },
                            { month: "Feb", revenue: 32, label: "₹32L" },
                            { month: "Mar", revenue: 41, label: "₹41L" },
                            { month: "Apr", revenue: 27, label: "₹27L" },
                        ].map((item, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${item.revenue * 3}px` }}
                                    transition={{ duration: 0.8, delay: i * 0.1 }}
                                    className="w-full bg-primary/60 rounded-t-lg"
                                />
                                <span className="text-xs text-muted-foreground">{item.month}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
