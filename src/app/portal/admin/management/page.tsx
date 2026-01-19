"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Users,
    BarChart3,
    Building2,
    ShieldCheck,
    Database,
    LayoutDashboard,
    Zap
} from "lucide-react"
import { BulkUpload } from "@/features/admin/components/bulk-upload"
import { AgencyDashboard } from "@/features/admin/components/agency-dashboard"
import { StaffManagement } from "@/features/admin/components/staff-management"
import { FinancialTracker } from "@/features/admin/components/financial-tracker"
import { StudentMasterTable } from "@/features/admin/components/student-master-table"
import { RoleGuard } from "@/components/auth/role-guard"

export default function AdminManagementHub() {
    return (
        <RoleGuard allowedRoles={['admin', 'staff']}>
            <div className="space-y-10 pb-20 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-4 text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold text-[10px] uppercase tracking-widest">
                            <Zap className="h-3 w-3" />
                            Nexus Core Operations
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic leading-none">
                                Management <span className="text-primary tracking-[-0.05em]">HUB</span>
                            </h1>
                            <p className="text-sm text-muted-foreground font-medium uppercase tracking-widest flex items-center gap-2">
                                Enterprise Infrastructure <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> V0.3.2 Full Feature Spec
                            </p>
                        </div>
                    </div>
                </div>

                <Tabs defaultValue="students" className="space-y-12">
                    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 border-b border-black/5">
                        <TabsList className="h-14 bg-muted/10 p-1.5 rounded-2xl border border-black/5 w-fit">
                            <TabsTrigger value="students" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                                <Users className="h-4 w-4" /> Masters
                            </TabsTrigger>
                            <TabsTrigger value="bulk" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                                <Database className="h-4 w-4" /> Bulk Import
                            </TabsTrigger>
                            <TabsTrigger value="financials" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                                <BarChart3 className="h-4 w-4" /> Financials
                            </TabsTrigger>
                            <TabsTrigger value="agencies" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                                <Building2 className="h-4 w-4" /> Agencies
                            </TabsTrigger>
                            <TabsTrigger value="staff" className="rounded-xl h-full px-6 gap-2 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">
                                <ShieldCheck className="h-4 w-4" /> Security / Staff
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="students" className="mt-0 focus-visible:outline-none">
                        <StudentMasterTable />
                    </TabsContent>

                    <TabsContent value="bulk" className="mt-0 focus-visible:outline-none">
                        <div className="max-w-4xl mx-auto text-left">
                            <div className="mb-10 space-y-2">
                                <h2 className="text-2xl font-black uppercase tracking-tight italic">Batch Data Injection</h2>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Process bulk enrollments from regional partners</p>
                            </div>
                            <BulkUpload />
                        </div>
                    </TabsContent>

                    <TabsContent value="financials" className="mt-0 focus-visible:outline-none">
                        <FinancialTracker />
                    </TabsContent>

                    <TabsContent value="agencies" className="mt-0 focus-visible:outline-none">
                        <AgencyDashboard />
                    </TabsContent>

                    <TabsContent value="staff" className="mt-0 focus-visible:outline-none">
                        <StaffManagement />
                    </TabsContent>
                </Tabs>
            </div>
        </RoleGuard>
    )
}
