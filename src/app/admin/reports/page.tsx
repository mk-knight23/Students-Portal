"use client"

import { useAppStore } from "@/store/useAppStore"
import { exportToCSV } from "@/utils/export/export-engine"
import { ComplianceDashboard } from "@/features/admin/components/compliance-dashboard"
import {
    FileDown,
    Table as TableIcon,
    BarChart,
    ShieldCheck,
    Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AdminReportsPage() {
    const { students } = useAppStore();

    const handleBulkExport = () => {
        exportToCSV(students, `ame_full_export_${new Date().toISOString().split('T')[0]}.csv`);
    };

    return (
        <div className="space-y-10 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2 text-left">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 w-fit border border-blue-500/20">
                        <BarChart className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Data Intelligence</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl">
                        REPORTS <span className="text-blue-500 italic">& AUDIT</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Generate enrollment statistics, compliance audits, and bulk data exports for all 3 branches.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={handleBulkExport} className="rounded-xl font-bold text-xs uppercase shadow-lg shadow-blue-500/20 bg-blue-600 hover:bg-blue-700">
                        <FileDown className="mr-2 h-3.5 w-3.5" /> Full DB Export (CSV)
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Enrollment Trends", desc: "Category-wise bifurcation over time", icon: BarChart },
                    { title: "Compliance Report", desc: "DPDPA adherence and audit trail", icon: ShieldCheck },
                    { title: "Merit Lists", desc: "Rank-sorted student directories", icon: TableIcon },
                ].map((item, i) => (
                    <Card key={i} className="glass-card hover:border-blue-500/40 transition-all group overflow-hidden">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="space-y-1">
                                <CardTitle className="text-sm font-black uppercase tracking-tight">{item.title}</CardTitle>
                                <CardDescription className="text-[10px] uppercase font-bold tracking-widest leading-none opacity-60">Generate PDF</CardDescription>
                            </div>
                            <div className="p-2 rounded-lg bg-muted/40 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all">
                                <item.icon className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent className="pt-2">
                            <p className="text-[10px] text-muted-foreground font-medium mb-4">{item.desc}</p>
                            <Button variant="outline" size="sm" className="w-full text-[9px] font-black uppercase rounded-lg gap-2 h-8">
                                <Download className="h-3 w-3" /> Download Report
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-green-500" />
                    Compliance Inspector
                </h3>
                <ComplianceDashboard />
            </div>
        </div>
    )
}
