"use client"

import React from "react"
import { BarChart3, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HeadReportsPage() {
    return (
        <div className="space-y-8 pb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 w-fit border border-blue-500/20">
                        <BarChart3 className="h-3 w-3" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Analytics Node</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter sm:text-5xl uppercase">
                        Branch <span className="text-blue-500 italic">Intelligence</span>
                    </h1>
                    <p className="text-muted-foreground font-medium max-w-xl">
                        Detailed reporting on branch operations, staff efficiency, and student conversion metrics.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl font-bold uppercase text-[10px] tracking-widest gap-2">
                        <Filter className="h-4 w-4" />
                        Filter
                    </Button>
                    <Button className="rounded-xl font-bold uppercase text-[10px] tracking-widest gap-2">
                        <Download className="h-4 w-4" />
                        Export PDF
                    </Button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <Card className="glass-card h-80 flex items-center justify-center border-dashed border-2">
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Branch Growth Chart Placeholder</p>
                </Card>
                <Card className="glass-card h-80 flex items-center justify-center border-dashed border-2">
                    <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">Staff Performance Heatmap Placeholder</p>
                </Card>
            </div>
        </div>
    )
}
