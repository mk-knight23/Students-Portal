"use client";

import React from "react";
import {
    Search,
    Download,
    Terminal,
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle, CardDescription, Card } from "@/components/ui/card";
import { MockAuditLog, MockUser } from "@/mocks/data-store";

export function ComplianceDataTable({ data }: { data: (MockAuditLog & { actor?: MockUser })[] }) {
    const [searchTerm, setSearchTerm] = React.useState("");

    const filtered = data.filter(log =>
        log.actorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.entity?.toLowerCase() || "").includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="glass border-white/10 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4 border-b border-white/5 flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
                        <Terminal className="h-5 w-5 text-primary" /> Immutable Audit Log
                    </CardTitle>
                    <CardDescription>Security ledger for all PII access and modifications</CardDescription>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Filter by User or Action..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 glass border-white/10 rounded-xl w-64 h-10 text-sm"
                        />
                    </div>
                    <Button variant="ghost" className="h-10 rounded-xl border border-white/10 gap-2">
                        <Download className="h-4 w-4" /> Export Logs
                    </Button>
                </div>
            </CardHeader>
            <div className="p-0">
                <Table>
                    <TableHeader className="bg-white/2">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-xs uppercase font-bold tracking-widest pl-8 py-6">Timestamp</TableHead>
                            <TableHead className="text-xs uppercase font-bold tracking-widest">Actor</TableHead>
                            <TableHead className="text-xs uppercase font-bold tracking-widest">Action</TableHead>
                            <TableHead className="text-xs uppercase font-bold tracking-widest">Resource</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((log) => (
                            <TableRow key={log.id} className="border-white/5 hover:bg-white/2 transition-colors group">
                                <TableCell className="text-[11px] font-mono text-muted-foreground pl-8 py-4">
                                    {new Date(log.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell className="font-bold text-white text-xs">{log.actorName}</TableCell>
                                <TableCell>
                                    <Badge className={`text-[9px] font-black tracking-tight rounded-md px-2 py-0.5 border-none ${log.action.includes("VIEW") ? "bg-amber-500/20 text-amber-500" :
                                        log.action.includes("REGISTER") ? "bg-blue-500/20 text-blue-500" :
                                            log.action.includes("ERASE") ? "bg-destructive/20 text-destructive" :
                                                "bg-emerald-500/20 text-emerald-500"
                                        }`}>
                                        {log.action}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">{log.entity || "N/A"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
