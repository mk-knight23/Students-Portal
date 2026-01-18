import React from "react";
import { getAnalytics } from "@/services/data-access";
import { AnalyticsDashboard } from "@/components/analytics/analytics-dashboard";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
    const session = await auth();
    // if (!session) return null;

    const stats = await getAnalytics();
    if (!stats) return <div className="p-8">Loading analytics...</div>;

    return (
        <div className="p-8 pb-20 max-w-[1600px] mx-auto animate-in fade-in duration-700">
            <AnalyticsDashboard
                stats={stats}
                funnel={stats.funnel}
                categoryMix={stats.categoryMix}
                dailyRevenue={stats.dailyRevenue}
            />
        </div>
    );
}
