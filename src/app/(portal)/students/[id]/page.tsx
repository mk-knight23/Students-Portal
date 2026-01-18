"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
    User, FileText, CreditCard, GraduationCap, Phone, Mail,
    MapPin, Calendar, ArrowLeft, Edit, Download, CheckCircle2,
    Clock, XCircle, Building2
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for student detail
const mockStudent = {
    id: "std-001",
    name: "Arjun Patil",
    email: "arjun@example.com",
    phone: "+91 98765 43210",
    aadhaarMasked: "XXXX XXXX 4521",
    category: "Open",
    domicileState: "Maharashtra",
    neetScore: 645,
    neetRank: "8234",
    status: "REGISTERED",
    branch: "Latur",
    registeredAt: "2026-01-10",
    parentName: "Rajesh Patil",
    parentPhone: "+91 98765 43211",
    address: "123, MG Road, Latur, Maharashtra - 413512",
};

const mockDocuments = [
    { id: "1", type: "10th Marksheet", status: "VERIFIED", uploadedAt: "2026-01-10" },
    { id: "2", type: "12th Marksheet", status: "VERIFIED", uploadedAt: "2026-01-10" },
    { id: "3", type: "Aadhaar Card", status: "PENDING", uploadedAt: "2026-01-11" },
    { id: "4", type: "NEET Scorecard", status: "PENDING", uploadedAt: "2026-01-11" },
];

const mockPreferences = [
    { priority: 1, college: "Grant Medical College", city: "Mumbai", course: "MBBS", status: "Locked" },
    { priority: 2, college: "B.J. Medical College", city: "Pune", course: "MBBS", status: "Locked" },
    { priority: 3, college: "GMC Latur", city: "Latur", course: "MBBS", status: "Locked" },
];

const mockPayments = [
    { id: "txn-001", type: "Registration Fee", amount: 50000, status: "SUCCESS", date: "2026-01-10" },
];

const statusConfig = {
    VERIFIED: { color: "bg-green-500/20 text-green-400", icon: CheckCircle2 },
    PENDING: { color: "bg-yellow-500/20 text-yellow-400", icon: Clock },
    REJECTED: { color: "bg-red-500/20 text-red-400", icon: XCircle },
};

export default function StudentDetailPage() {
    const params = useParams();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/students">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div className="flex-1">
                    <h1 className="text-2xl font-bold">{mockStudent.name}</h1>
                    <p className="text-muted-foreground">Student ID: {params.id}</p>
                </div>
                <Button variant="outline" className="gap-2">
                    <Edit className="h-4 w-4" /> Edit
                </Button>
                <Button className="gap-2">
                    <Download className="h-4 w-4" /> Export
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass md:col-span-1">
                    <CardContent className="pt-6">
                        <div className="flex flex-col items-center text-center">
                            <Avatar className="h-20 w-20 ring-4 ring-primary/20">
                                <AvatarFallback className="text-xl bg-primary/20">
                                    {mockStudent.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                            </Avatar>
                            <h2 className="mt-4 text-xl font-bold">{mockStudent.name}</h2>
                            <Badge className="mt-2 bg-primary/20 text-primary">{mockStudent.status}</Badge>
                        </div>

                        <div className="mt-6 space-y-3">
                            {[
                                { icon: Mail, value: mockStudent.email },
                                { icon: Phone, value: mockStudent.phone },
                                { icon: MapPin, value: mockStudent.domicileState },
                                { icon: Building2, value: mockStudent.branch },
                                { icon: Calendar, value: `Registered: ${mockStudent.registeredAt}` },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm">
                                    <item.icon className="h-4 w-4 text-muted-foreground" />
                                    <span>{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="md:col-span-2 space-y-6">
                    <div className="grid gap-4 md:grid-cols-3">
                        <Card className="glass-card">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-blue-500/20">
                                        <GraduationCap className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">NEET Score</p>
                                        <p className="text-xl font-bold">{mockStudent.neetScore}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="glass-card">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-purple-500/20">
                                        <GraduationCap className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">NEET Rank</p>
                                        <p className="text-xl font-bold">{mockStudent.neetRank}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="glass-card">
                            <CardContent className="pt-6">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-xl bg-green-500/20">
                                        <User className="h-5 w-5 text-green-500" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground">Category</p>
                                        <p className="text-xl font-bold">{mockStudent.category}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Tabs defaultValue="documents" className="space-y-4">
                        <TabsList className="glass">
                            <TabsTrigger value="documents" className="gap-2">
                                <FileText className="h-4 w-4" /> Documents
                            </TabsTrigger>
                            <TabsTrigger value="preferences" className="gap-2">
                                <GraduationCap className="h-4 w-4" /> Preferences
                            </TabsTrigger>
                            <TabsTrigger value="payments" className="gap-2">
                                <CreditCard className="h-4 w-4" /> Payments
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="documents">
                            <Card className="glass">
                                <CardContent className="pt-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Document</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Uploaded</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {mockDocuments.map((doc) => {
                                                const config = statusConfig[doc.status as keyof typeof statusConfig];
                                                return (
                                                    <TableRow key={doc.id}>
                                                        <TableCell className="font-medium">{doc.type}</TableCell>
                                                        <TableCell>
                                                            <Badge className={config.color}>{doc.status}</Badge>
                                                        </TableCell>
                                                        <TableCell>{doc.uploadedAt}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="preferences">
                            <Card className="glass">
                                <CardContent className="pt-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Priority</TableHead>
                                                <TableHead>College</TableHead>
                                                <TableHead>Course</TableHead>
                                                <TableHead>Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {mockPreferences.map((pref, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="font-bold">{pref.priority}</TableCell>
                                                    <TableCell>
                                                        <div>
                                                            <p className="font-medium">{pref.college}</p>
                                                            <p className="text-xs text-muted-foreground">{pref.city}</p>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{pref.course}</TableCell>
                                                    <TableCell>
                                                        <Badge className="bg-green-500/20 text-green-400">{pref.status}</Badge>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="payments">
                            <Card className="glass">
                                <CardContent className="pt-6">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Type</TableHead>
                                                <TableHead>Amount</TableHead>
                                                <TableHead>Status</TableHead>
                                                <TableHead>Date</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {mockPayments.map((pay) => (
                                                <TableRow key={pay.id}>
                                                    <TableCell className="font-medium">{pay.type}</TableCell>
                                                    <TableCell>₹{pay.amount.toLocaleString()}</TableCell>
                                                    <TableCell>
                                                        <Badge className="bg-green-500/20 text-green-400">{pay.status}</Badge>
                                                    </TableCell>
                                                    <TableCell>{pay.date}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
