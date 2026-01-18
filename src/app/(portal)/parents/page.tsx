"use client";

import { motion } from "framer-motion";
import {
    Users, GraduationCap, FileText, CreditCard, Bell,
    CheckCircle2, Clock, AlertCircle, MessageSquare
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockChildren = [
    {
        id: "std-001",
        name: "Arjun Patil",
        neetScore: 645,
        status: "REGISTERED",
        pendingDocs: 2,
        pendingPayments: 0,
    },
];

const notifications = [
    { id: 1, message: "Document verification pending for Aadhaar Card", type: "warning", time: "2 hours ago" },
    { id: 2, message: "Choice filling deadline: January 25, 2026", type: "info", time: "1 day ago" },
    { id: 3, message: "Registration fee payment successful", type: "success", time: "3 days ago" },
];

export default function ParentsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Parent Portal</h1>
                <p className="text-muted-foreground">Track your childs admission journey</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass md:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" /> My Children
                        </CardTitle>
                        <CardDescription>Students linked to your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {mockChildren.map((child) => (
                            <div key={child.id} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                                            <AvatarFallback className="bg-primary/20">
                                                {child.name.split(" ").map(n => n[0]).join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-bold">{child.name}</h3>
                                            <p className="text-sm text-muted-foreground">NEET Score: {child.neetScore}</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-primary/20 text-primary">{child.status}</Badge>
                                </div>

                                <div className="grid grid-cols-3 gap-4 mt-6">
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
                                        <FileText className="h-4 w-4 text-yellow-500" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Pending Docs</p>
                                            <p className="font-bold">{child.pendingDocs}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
                                        <CreditCard className="h-4 w-4 text-green-500" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Pending Pay</p>
                                            <p className="font-bold">{child.pendingPayments}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5">
                                        <GraduationCap className="h-4 w-4 text-blue-500" />
                                        <div>
                                            <p className="text-xs text-muted-foreground">Choices</p>
                                            <p className="font-bold">3 Filled</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <Button size="sm" variant="outline">View Details</Button>
                                    <Button size="sm" variant="outline">Upload Document</Button>
                                    <Button size="sm">Track Status</Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card className="glass">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" /> Notifications
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {notifications.map((notif) => (
                            <div key={notif.id} className="p-3 rounded-xl bg-white/5 border border-white/10">
                                <div className="flex items-start gap-3">
                                    {notif.type === "warning" && <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />}
                                    {notif.type === "success" && <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />}
                                    {notif.type === "info" && <Clock className="h-4 w-4 text-blue-500 mt-0.5" />}
                                    <div className="flex-1">
                                        <p className="text-sm">{notif.message}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="glass">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" /> Need Help?
                    </CardTitle>
                    <CardDescription>Contact our support team</CardDescription>
                </CardHeader>
                <CardContent className="flex gap-4">
                    <Button variant="outline">FAQ</Button>
                    <Button variant="outline">Call Us</Button>
                    <Button>Chat with Support</Button>
                </CardContent>
            </Card>
        </div>
    );
}
