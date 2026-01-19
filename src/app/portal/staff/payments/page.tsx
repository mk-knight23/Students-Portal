"use client"

import { FinancialTracker } from "@/features/admin/components/financial-tracker"
import { Receipt } from "lucide-react"

export default function StaffPaymentsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 w-fit border border-orange-500/20">
                        <Receipt className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Staff Financial View</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        Fee <span className="text-orange-500 italic">Tracking</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Monitor student fee status and collection records for your assigned branch.
                    </p>
                </div>
            </div>

            <FinancialTracker />
        </div>
    )
}
