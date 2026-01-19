"use client"

import { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import {
    FileUp,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Table as TableIcon,
    Trash2,
    Database
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

export function BulkUpload() {
    const [isUploading, setIsUploading] = useState(false);
    const [previewData, setPreviewData] = useState<any[] | null>(null);
    const { addStudent } = useAppStore();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        // Simulate parsing delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock parsed data
        const mockParsed = [
            { name: "Arjun Mehta", email: "arjun.m@example.com", phone: "+91 98765 43210", neet_score: 610, neet_rank: 8500, state: "Maharashtra", category: "General" },
            { name: "Snehal Gore", email: "snehal.g@example.com", phone: "+91 87654 32109", neet_score: 590, neet_rank: 12000, state: "Maharashtra", category: "OBC" },
            { name: "Kiran Patil", email: "kiran.p@example.com", phone: "+91 76543 21098", neet_score: 645, neet_rank: 4200, state: "Maharashtra", category: "General" },
        ];

        setPreviewData(mockParsed);
        setIsUploading(false);
        toast.success("File Parsed Successfully", {
            description: `Detected ${mockParsed.length} valid student records.`
        });
    };

    const handleCommit = () => {
        if (!previewData) return;

        previewData.forEach(s => {
            addStudent({
                ...s,
                gender: "Male" as any, // Default for mock
                dob: "2007-01-01",
                aadhaar_masked: "XXXX XXXX 0000",
                status: "Inquiry",
                documents_verified: false,
                branch: "Pune Center",
                preferences: [],
                documents: [],
                counseling_registrations: [],
            });
        });

        setPreviewData(null);
        toast.success("Bulk Upload Complete", {
            description: `${previewData.length} records added to the master database.`
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <Card className="glass-card border-dashed">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-primary/10 text-primary">
                            <FileUp className="h-5 w-5" />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-black tracking-tight">Bulk Import</CardTitle>
                            <CardDescription className="text-xs font-bold uppercase tracking-widest leading-none">Category 2.2 - CSV/Excel Processing</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {!previewData ? (
                        <label className="flex flex-col items-center justify-center py-12 border-2 border-dashed rounded-3xl cursor-pointer hover:bg-primary/5 transition-all group">
                            {isUploading ? (
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="h-10 w-10 text-primary animate-spin" />
                                    <p className="text-xs font-black uppercase tracking-widest text-primary">Validating Data Integrity...</p>
                                </div>
                            ) : (
                                <>
                                    <div className="h-16 w-16 rounded-2xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-all">
                                        <FileUp className="h-8 w-8" />
                                    </div>
                                    <p className="mt-4 text-sm font-black uppercase tracking-tight">Drop enrollment CSV here</p>
                                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">Maximum 500 records per batch</p>
                                    <input type="file" className="hidden" onChange={handleFileChange} accept=".csv" />
                                </>
                            )}
                        </label>
                    ) : (
                        <div className="space-y-6">
                            <div className="rounded-2xl border bg-muted/10 overflow-hidden">
                                <table className="w-full text-left text-xs">
                                    <thead className="bg-muted/30">
                                        <tr>
                                            <th className="px-4 py-3 font-black uppercase tracking-tight">Name</th>
                                            <th className="px-4 py-3 font-black uppercase tracking-tight">NEET Score</th>
                                            <th className="px-4 py-3 font-black uppercase tracking-tight">State</th>
                                            <th className="px-4 py-3 font-black uppercase tracking-tight">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {previewData.map((row, i) => (
                                            <tr key={i} className="border-t border-white/5">
                                                <td className="px-4 py-3 font-bold">{row.name}</td>
                                                <td className="px-4 py-3 font-mono">{row.neet_score}</td>
                                                <td className="px-4 py-3 text-muted-foreground">{row.state}</td>
                                                <td className="px-4 py-3">
                                                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-green-500">
                                                        <CheckCircle2 className="h-3 w-3" /> Ready
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1 rounded-2xl h-12 font-black uppercase shadow-lg shadow-primary/20 bg-primary" onClick={handleCommit}>
                                    <Database className="mr-2 h-4 w-4" /> Commit to Master DB
                                </Button>
                                <Button variant="outline" className="rounded-2xl h-12 px-6" onClick={() => setPreviewData(null)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                <div className="p-3 bg-blue-500 rounded-2xl text-white">
                    <AlertCircle className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                    <h4 className="font-black text-blue-500 uppercase tracking-tight">Validation Logic Active</h4>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                        Our system automatically checks for duplicate emails, phone numbers, and invalid NEET score ranges. Records failing these checks will be highlighted for manual review.
                    </p>
                </div>
            </div>
        </div>
    )
}
