import React from "react";
import {
    Download,
    FileSpreadsheet,
    UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StudentsDataTable } from "@/components/students/students-data-table";
import { getStudents } from "@/services/data-access";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function StudentsPage() {
    const students = await getStudents();

    return (
        <div className="space-y-8 pb-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight text-gradient">Student Directory</h1>
                    <p className="text-muted-foreground mt-2 text-sm font-medium uppercase tracking-widest opacity-70">
                        Enterprise Ledger • {students.length} Records Detected
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="glass rounded-xl gap-2 h-11 border-white/10">
                        <Download className="h-4 w-4" /> Export PDF
                    </Button>
                    <Button variant="outline" className="glass rounded-xl gap-2 h-11 border-white/10">
                        <FileSpreadsheet className="h-4 w-4" /> Excel
                    </Button>
                    <Button asChild className="rounded-xl h-11 shadow-lg shadow-primary/20 hover:scale-105 transition-transform bg-primary px-6">
                        <Link href="/students/add" className="flex items-center gap-2">
                            <UserPlus className="h-4 w-4" /> New Registration
                        </Link>
                    </Button>
                </div>
            </div>

            <StudentsDataTable data={students as any} />
        </div>
    );
}
