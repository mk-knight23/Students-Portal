"use client"

import { StudentMasterTable } from "@/features/admin/components/student-master-table"
import { Users } from "lucide-react"

export default function StaffStudentsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
                        <Users className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Student Node</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        Student <span className="text-primary italic">Master</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Comprehensive management of all student records for your assigned region. Search, filter, and monitor progress across the admission funnel.
                    </p>
                </div>
            </div>

            <StudentMasterTable />
        </div>
    )
}
