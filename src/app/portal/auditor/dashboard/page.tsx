"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Shield, Eye, FileSearch, Clock, AlertTriangle,
    CheckCircle2, Search, Filter, Download
} from "lucide-react"
import { Input } from "@/components/ui/input"

const auditStats = [
    { label: 'Total Audit Events', value: 15420, icon: FileSearch },
    { label: 'High Risk Events', value: 23, icon: AlertTriangle, color: 'text-red-500' },
    { label: 'Data Access Logs', value: 892, icon: Eye },
    { label: 'Compliance Score', value: '98.5%', icon: CheckCircle2, color: 'text-green-500' },
]

const recentAuditLogs = [
    { id: 'AUD001', user: 'Super Admin', action: 'Exported student data', resource: 'Report', risk: 'high', time: '5 min ago' },
    { id: 'AUD002', user: 'Priya Sharma', action: 'Viewed Aadhaar (PII)', resource: 'Student', risk: 'medium', time: '15 min ago' },
    { id: 'AUD003', user: 'Rahul Verma', action: 'Verified document', resource: 'Document', risk: 'low', time: '32 min ago' },
    { id: 'AUD004', user: 'System', action: 'Automated backup', resource: 'Database', risk: 'low', time: '1 hour ago' },
    { id: 'AUD005', user: 'Branch Head', action: 'Generated report', resource: 'Report', risk: 'medium', time: '2 hours ago' },
]

const complianceChecks = [
    { name: 'Data Encryption', status: 'Compliant', lastCheck: '2 hours ago' },
    { name: 'Access Controls', status: 'Compliant', lastCheck: '2 hours ago' },
    { name: 'Audit Logging', status: 'Compliant', lastCheck: '2 hours ago' },
    { name: 'Data Retention', status: 'Review Needed', lastCheck: '1 day ago' },
    { name: 'Consent Management', status: 'Compliant', lastCheck: '6 hours ago' },
]

export default function AuditorDashboardPage() {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 w-fit border border-amber-500/20">
                        <Shield className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Compliance Audit</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">
                        Audit <span className="text-primary">Dashboard</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium">
                        Read-only compliance and security monitoring view
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search audit logs..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="icon">
                        <Filter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="text-xs">
                        <Download className="mr-2 h-3.5 w-3.5" />
                        Export Report
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {auditStats.map((stat) => (
                    <Card key={stat.label} className="glass-card">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className={`text-2xl font-black ${stat.color || ''}`}>{stat.value}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                        {stat.label}
                                    </p>
                                </div>
                                <stat.icon className={`h-8 w-8 ${stat.color || 'text-muted-foreground'} opacity-50`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Audit Logs */}
                <Card className="lg:col-span-2 glass-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <FileSearch className="h-5 w-5 text-primary" />
                            Recent Audit Events
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                            Live Feed
                        </Badge>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {recentAuditLogs.map((log) => (
                            <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/20">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold">{log.user}</p>
                                        <Badge
                                            variant={
                                                log.risk === 'high' ? 'destructive' :
                                                    log.risk === 'medium' ? 'secondary' : 'outline'
                                            }
                                            className="text-[9px]"
                                        >
                                            {log.risk} risk
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {log.action} • {log.resource}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] text-muted-foreground">{log.time}</span>
                                    <Button variant="ghost" size="sm" className="text-xs h-7">
                                        <Eye className="h-3 w-3" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Compliance Status */}
                <Card className="glass-card">
                    <CardHeader className="pb-3">
                        <CardTitle className="flex items-center gap-2 text-sm font-bold">
                            <Shield className="h-4 w-4 text-green-500" />
                            Compliance Status
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {complianceChecks.map((check) => (
                            <div key={check.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/20">
                                <div className="space-y-0.5">
                                    <p className="text-xs font-medium">{check.name}</p>
                                    <p className="text-[10px] text-muted-foreground">Last: {check.lastCheck}</p>
                                </div>
                                <Badge
                                    variant={check.status === 'Compliant' ? 'default' : 'secondary'}
                                    className={`text-[10px] ${check.status === 'Compliant' ? 'bg-green-500' : 'bg-yellow-500'}`}
                                >
                                    {check.status === 'Compliant' ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <Clock className="h-3 w-3 mr-1" />}
                                    {check.status}
                                </Badge>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
