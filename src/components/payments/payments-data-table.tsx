"use client";

import React from "react";
import {
    Search,
    Filter,
    Receipt,
    FilterX
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
import { CardHeader, CardTitle, Card } from "@/components/ui/card";
import { toast } from "sonner";
import { MockTransaction, MockStudent } from "@/mocks/data-store";

export function PaymentsDataTable({ data }: { data: (MockTransaction & { student?: MockStudent | any })[] }) {
    const [searchTerm, setSearchTerm] = React.useState("");

    const handleDownloadReceipt = (id: string) => {
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 1500)),
            {
                loading: 'Generating Secure PDF Receipt...',
                success: `Receipt ${id}.pdf generated successfully!`,
                error: 'Error generating receipt.',
            }
        );
    };

    const filtered = data.filter(t =>
        // In mock data, studentId might be a string ID, not a full object unless joined.
        // But for this table we usually passed joined data.
        // We accept that `data` here might have student joined.
        (t as any).student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Card className="glass border-white/10 rounded-[2.5rem] overflow-hidden">
            <CardHeader className="p-8 pb-4 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <CardTitle className="text-xl font-bold text-white">Transaction History</CardTitle>
                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Student Name or TXN ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 glass border-white/10 rounded-xl w-64 text-sm"
                            />
                        </div>
                        <Button variant="ghost" className="rounded-xl border border-white/10 gap-2 h-10">
                            <Filter className="h-4 w-4" /> Filter
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <div className="p-0">
                <Table>
                    <TableHeader className="bg-white/2">
                        <TableRow className="border-white/5 hover:bg-transparent">
                            <TableHead className="text-xs uppercase font-bold tracking-widest pl-8 py-6">Transaction ID</TableHead>
                            <TableHead className="text-xs uppercase font-bold tracking-widest">Student</TableHead>
                            <TableHead className="text-xs uppercase font-bold tracking-widest">Category</TableHead>
                            <TableHead className="text-xs uppercase font-bold tracking-widest">Amount</TableHead>
                            <TableHead className="text-xs uppercase font-bold tracking-widest">Status</TableHead>
                            <TableHead className="text-xs uppercase font-bold tracking-widest text-right pr-8">Receipt</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="h-32 text-center py-10">
                                    <div className="flex flex-col items-center gap-2 opacity-50">
                                        <FilterX className="h-8 w-8 text-muted-foreground" />
                                        <p className="text-sm font-medium">No transactions found</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : filtered.map((txn) => (
                            <TableRow key={txn.id} className="border-white/5 hover:bg-white/2 transition-colors">
                                <TableCell className="font-mono text-[11px] font-bold text-muted-foreground pl-8 py-5">
                                    {txn.id}
                                </TableCell>
                                <TableCell className="font-bold text-white">{(txn as any).student?.name || "Student"}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="text-[10px] font-bold tracking-tight rounded-lg">
                                        {txn.type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-bold text-white">₹ {txn.amount.toLocaleString()}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <div className={`h-1.5 w-1.5 rounded-full ${txn.status === "SUCCESS" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" :
                                            txn.status === "PENDING" ? "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" :
                                                "bg-destructive shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                                            }`} />
                                        <span className={`text-[10px] font-bold uppercase ${txn.status === "SUCCESS" ? "text-emerald-500" :
                                            txn.status === "PENDING" ? "text-amber-500" :
                                                "text-destructive"
                                            }`}>{txn.status}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right pr-8">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        disabled={txn.status !== "SUCCESS"}
                                        onClick={() => handleDownloadReceipt(txn.id)}
                                        className="h-9 w-9 rounded-xl hover:bg-primary/20 hover:text-primary transition-all group"
                                    >
                                        <Receipt className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    );
}
