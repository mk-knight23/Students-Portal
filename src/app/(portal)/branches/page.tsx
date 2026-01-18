"use client";

import { motion } from "framer-motion";
import { Building2, MapPin, Users, Plus, Edit, MoreVertical } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const mockBranches = [
    { id: "branch-latur", name: "Latur", code: "LAT", city: "Latur", state: "Maharashtra", students: 248, staff: 5, status: "Active" },
    { id: "branch-pune", name: "Pune", code: "PUN", city: "Pune", state: "Maharashtra", students: 185, staff: 4, status: "Active" },
    { id: "branch-mumbai", name: "Mumbai", code: "MUM", city: "Mumbai", state: "Maharashtra", students: 312, staff: 8, status: "Active" },
    { id: "branch-nashik", name: "Nashik", code: "NSK", city: "Nashik", state: "Maharashtra", students: 89, staff: 2, status: "Inactive" },
];

export default function BranchesPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Branches</h1>
                    <p className="text-muted-foreground">Manage organization branches</p>
                </div>
                <Button className="gap-2">
                    <Plus className="h-4 w-4" /> Add Branch
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { label: "Total Branches", value: mockBranches.length, icon: Building2 },
                    { label: "Active Branches", value: mockBranches.filter(b => b.status === "Active").length, icon: Building2 },
                    { label: "Total Students", value: mockBranches.reduce((a, b) => a + b.students, 0), icon: Users },
                    { label: "Total Staff", value: mockBranches.reduce((a, b) => a + b.staff, 0), icon: Users },
                ].map((stat, i) => (
                    <Card key={i} className="glass-card">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-xl bg-primary/10">
                                    <stat.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid gap-4 md:grid-cols-2"
            >
                {mockBranches.map((branch, i) => (
                    <motion.div
                        key={branch.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="glass hover:border-primary/30 transition-colors">
                            <CardHeader className="flex flex-row items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-3 rounded-2xl bg-primary/10">
                                        <Building2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">{branch.name}</CardTitle>
                                        <CardDescription className="flex items-center gap-1">
                                            <MapPin className="h-3 w-3" /> {branch.city}, {branch.state}
                                        </CardDescription>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge className={branch.status === "Active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}>
                                        {branch.status}
                                    </Badge>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Edit className="h-4 w-4 mr-2" /> Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>View Details</DropdownMenuItem>
                                            <DropdownMenuItem className="text-red-400">Deactivate</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>{branch.students} Students</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>{branch.staff} Staff</span>
                                    </div>
                                    <div className="text-muted-foreground">
                                        Code: <span className="font-mono">{branch.code}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
