"use client";

import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Building2, Shield, Edit, Camera } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockProfile = {
    name: "M. Kazi",
    email: "admin@admissions.com",
    phone: "+91 98765 43210",
    role: "Tenant Owner",
    branch: "Latur",
    organization: "Admissions Made Easy",
    joinedDate: "January 2024",
};

export default function ProfilePage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
                <p className="text-muted-foreground">Manage your account information</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="glass md:col-span-1">
                    <CardContent className="pt-6 flex flex-col items-center text-center">
                        <div className="relative group">
                            <Avatar className="h-24 w-24 ring-4 ring-primary/20">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-2xl bg-primary/20">MK</AvatarFallback>
                            </Avatar>
                            <Button
                                size="icon"
                                variant="secondary"
                                className="absolute bottom-0 right-0 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <Camera className="h-4 w-4" />
                            </Button>
                        </div>
                        <h2 className="mt-4 text-xl font-bold">{mockProfile.name}</h2>
                        <Badge className="mt-2 bg-primary/20 text-primary">{mockProfile.role}</Badge>
                        <p className="text-sm text-muted-foreground mt-2">Member since {mockProfile.joinedDate}</p>
                    </CardContent>
                </Card>

                <Card className="glass md:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Your account details</CardDescription>
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Edit className="h-4 w-4" /> Edit
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[
                            { icon: User, label: "Full Name", value: mockProfile.name },
                            { icon: Mail, label: "Email", value: mockProfile.email },
                            { icon: Phone, label: "Phone", value: mockProfile.phone },
                            { icon: Building2, label: "Organization", value: mockProfile.organization },
                            { icon: MapPin, label: "Branch", value: mockProfile.branch },
                            { icon: Shield, label: "Role", value: mockProfile.role },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-white/5">
                                <div className="p-2 rounded-lg bg-primary/10">
                                    <item.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{item.label}</p>
                                    <p className="font-medium">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            <Card className="glass">
                <CardHeader>
                    <CardTitle>Activity Summary</CardTitle>
                    <CardDescription>Your recent actions</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                        {[
                            { label: "Students Registered", value: "156" },
                            { label: "Documents Verified", value: "423" },
                            { label: "Payments Processed", value: "89" },
                            { label: "Sessions", value: "342" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-4 rounded-xl bg-white/5">
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
