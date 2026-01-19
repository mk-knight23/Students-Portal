"use client"

import { StudentMasterTable } from "@/features/admin/components/student-master-table"
import { Users, ShieldCheck } from "lucide-react"

export default function HeadStudentsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 w-fit border border-blue-500/20">
                        <ShieldCheck className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Oversight Node</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        Branch <span className="text-blue-500 italic">Students</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Regional oversight of all student records. View progress, monitor bottlenecks, and manage branch performance.
                    </p>
                </div>
            </div>

            <StudentMasterTable />
        </div>
    )
}
