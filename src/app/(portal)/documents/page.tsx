"use client";

import { motion } from "framer-motion";
import { FileText, Upload, CheckCircle2, XCircle, Clock, Search, Filter, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const mockDocuments = [
    { id: "doc-001", student: "Arjun Patil", type: "10th Marksheet", status: "VERIFIED", uploadedAt: "2026-01-10" },
    { id: "doc-002", student: "Arjun Patil", type: "12th Marksheet", status: "VERIFIED", uploadedAt: "2026-01-10" },
    { id: "doc-003", student: "Sneha Deshmukh", type: "Aadhaar Card", status: "PENDING", uploadedAt: "2026-01-12" },
    { id: "doc-004", student: "Sneha Deshmukh", type: "NEET Scorecard", status: "PENDING", uploadedAt: "2026-01-12" },
    { id: "doc-005", student: "Vikram Jadhav", type: "Caste Certificate", status: "REJECTED", uploadedAt: "2026-01-08" },
    { id: "doc-006", student: "Priya Kulkarni", type: "Domicile Certificate", status: "VERIFIED", uploadedAt: "2026-01-05" },
];

const statusConfig = {
    VERIFIED: { color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
    PENDING: { color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
    REJECTED: { color: "bg-red-500/20 text-red-400", icon: XCircle },
};

export default function DocumentsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
                    <p className="text-muted-foreground">Manage and verify student documents</p>
                </div>
                <Button className="gap-2">
                    <Upload className="h-4 w-4" /> Upload New
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                {[
                    { label: "Pending Review", value: 45, icon: Clock, color: "text-yellow-500" },
                    { label: "Verified", value: 423, icon: CheckCircle2, color: "text-green-500" },
                    { label: "Rejected", value: 12, icon: XCircle, color: "text-red-500" },
                ].map((stat, i) => (
                    <Card key={i} className="glass-card">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className={`p-2 rounded-xl bg-white/5 ${stat.color}`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                                <span className="text-2xl font-bold">{stat.value}</span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="glass">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Document List</CardTitle>
                            <CardDescription>All uploaded documents</CardDescription>
                        </div>
                        <div className="flex gap-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search documents..." className="pl-9 w-64 glass" />
                            </div>
                            <Button variant="outline" className="gap-2">
                                <Filter className="h-4 w-4" /> Filter
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Document Type</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Uploaded</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockDocuments.map((doc) => {
                                const config = statusConfig[doc.status as keyof typeof statusConfig];
                                const StatusIcon = config.icon;
                                return (
                                    <TableRow key={doc.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-muted-foreground" />
                                                {doc.type}
                                            </div>
                                        </TableCell>
                                        <TableCell>{doc.student}</TableCell>
                                        <TableCell>
                                            <Badge className={`${config.color} gap-1`}>
                                                <StatusIcon className="h-3 w-3" />
                                                {doc.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{doc.uploadedAt}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-1">
                                                <Button size="sm" variant="ghost">
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                {doc.status === "PENDING" && (
                                                    <>
                                                        <Button size="sm" variant="ghost" className="text-green-400">
                                                            <CheckCircle2 className="h-4 w-4" />
                                                        </Button>
                                                        <Button size="sm" variant="ghost" className="text-red-400">
                                                            <XCircle className="h-4 w-4" />
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
