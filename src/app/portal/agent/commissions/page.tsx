"use client"

import { FinancialTracker } from "@/features/admin/components/financial-tracker"
import { DollarSign } from "lucide-react"

export default function AgentCommissionsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 w-fit border border-emerald-500/20">
                        <DollarSign className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Partner Revenue Node</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        Commission <span className="text-emerald-500 italic">Tracker</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Monitor your referral earnings and payout cycles. Track settled commissions and upcoming disbursements in real-time.
                    </p>
                </div>
            </div>

            <FinancialTracker />
        </div>
    )
}
