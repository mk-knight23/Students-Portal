"use client"

import { useAppStore } from "@/store/useAppStore"
import {
    UserCog,
    ShieldCheck,
    MapPin,
    Mail,
    Trash2,
    Plus,
    Lock,
    Search
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

export function StaffManagement() {
    const { staff, branches } = useAppStore();

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1">
                    <h3 className="text-xl font-black uppercase tracking-tight">Access Control</h3>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest leading-none">Category 20.3 - RBAC & Staff Management</p>
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search Staff..." className="pl-10 rounded-xl h-10 text-xs font-bold" />
                    </div>
                    <Button className="rounded-xl font-bold text-xs uppercase shadow-lg shadow-primary/20 bg-primary h-10 px-6">
                        <Plus className="mr-2 h-4 w-4" /> Add Member
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member) => (
                    <Card key={member.id} className="glass-card group hover:border-primary/40 transition-all">
                        <CardHeader className="pb-4">
                            <div className="flex items-start justify-between">
                                <div className="h-10 w-10 rounded-xl bg-muted/20 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                    <UserCog className="h-5 w-5" />
                                </div>
                                <Badge variant="outline" className={`text-[8px] font-black uppercase ${member.role === 'Admin' ? 'text-red-500 border-red-500/20 bg-red-500/5' :
                                        member.role === 'Office Head' ? 'text-blue-500 border-blue-500/20 bg-blue-500/5' :
                                            'text-green-500 border-green-500/20 bg-green-500/5'
                                    }`}>
                                    {member.role}
                                </Badge>
                            </div>
                            <CardTitle className="text-sm font-black uppercase tracking-tight mt-4">{member.name}</CardTitle>
                            <CardDescription className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                <Mail className="h-3 w-3" /> {member.email}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                            <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/20 border border-white/5">
                                <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                                <span className="text-[10px] font-black uppercase italic text-muted-foreground">
                                    Assignment: {branches.find(b => b.id === member.branchId)?.name || member.branchId}
                                </span>
                            </div>
                            <div className="pt-2 flex items-center gap-2">
                                <Button variant="ghost" className="flex-1 h-9 rounded-xl text-[10px] font-black uppercase tracking-widest gap-2">
                                    <Lock className="h-3 w-3" /> Permissions
                                </Button>
                                <Button variant="ghost" className="h-9 w-9 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="glass-card border-dashed bg-primary/5">
                <CardContent className="py-10 flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-primary/10 text-primary">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-black uppercase tracking-tight">Security Protocol Active</h4>
                        <p className="max-w-md text-xs text-muted-foreground font-medium leading-relaxed">
                            All administrative actions are logged in the global audit trail. Modifying staff permissions requires an additional OTP verification from the Master Admin.
                        </p>
                    </div>
                    <Button variant="outline" className="rounded-xl h-10 px-8 text-xs font-black uppercase tracking-widest">
                        View Access Logs
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
