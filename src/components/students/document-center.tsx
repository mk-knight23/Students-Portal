"use client";

import React from "react";
import {
    FileText,
    Upload,
    CheckCircle2,
    XCircle,
    Clock,
    Eye,
    AlertCircle,
    FileSearch,
    Loader2
} from "lucide-react";
import { uploadDocument } from "@/actions/compliance";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";

type DocStatus = "Pending" | "Verified" | "Rejected" | "Missing";

interface DocSlot {
    id: string;
    name: string;
    type: string;
    status: DocStatus;
    updatedAt?: string;
}

const initialSlots: DocSlot[] = [
    { id: "1", name: "Aadhaar Card (Original)", type: "Identity", status: "Verified", updatedAt: "2026-01-16" },
    { id: "2", name: "NEET Scorecard 2026", type: "Academic", status: "Pending", updatedAt: "2026-01-18" },
    { id: "3", name: "12th Marksheet", type: "Academic", status: "Rejected", updatedAt: "2026-01-17" },
    { id: "4", name: "Domicile Certificate", type: "Legal", status: "Missing" },
    { id: "5", name: "Caste Validity", type: "Reservation", status: "Missing" },
];

export function DocumentCenter({
    isOpen,
    onClose,
    studentName,
    studentId
}: {
    isOpen: boolean;
    onClose: () => void;
    studentName: string;
    studentId: string;
}) {
    const [slots, setSlots] = React.useState(initialSlots);
    const [uploading, setUploading] = React.useState<string | null>(null);

    const handleUpload = async (slotId: string, type: string) => {
        setUploading(slotId);
        try {
            // Simulated upload success
            const result = await uploadDocument(studentId, type, `https://s3.bucket/${studentId}/${type}.pdf`);
            if (result.success) {
                toast.success("Document Uploaded", {
                    description: `${type} has been queued for verification.`
                });
                setSlots(prev => prev.map(s => s.id === slotId ? { ...s, status: "Pending" as DocStatus } : s));
            }
        } catch (error) {
            toast.error("Upload failed");
        } finally {
            setUploading(null);
        }
    };

    const stats = {
        total: slots.length,
        verified: slots.filter(s => s.status === "Verified").length,
        pending: slots.filter(s => s.status === "Pending").length,
        missing: slots.filter(s => s.status === "Missing").length,
    };

    const progress = (stats.verified / stats.total) * 100;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="glass-dark border-white/10 w-full sm:max-w-xl p-0">
                <div className="h-full flex flex-col">
                    <SheetHeader className="p-8 pb-0">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="h-10 w-10 rounded-2xl bg-primary/20 flex items-center justify-center">
                                <FileSearch className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <SheetTitle className="text-2xl font-bold tracking-tight text-white">Document Center</SheetTitle>
                                <SheetDescription className="text-muted-foreground text-xs uppercase tracking-widest font-bold">
                                    Vault for {studentName}
                                </SheetDescription>
                            </div>
                        </div>

                        <div className="mt-8 p-6 rounded-3xl glass border-white/10 space-y-4">
                            <div className="flex justify-between items-end">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Verification Progress</p>
                                    <p className="text-2xl font-bold text-gradient">{Math.round(progress)}% Complete</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-white">{stats.verified} / {stats.total} SLOTS</p>
                                </div>
                            </div>
                            <Progress value={progress} className="h-2 bg-white/5" />
                            <div className="flex gap-4 pt-1">
                                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] px-2 py-0">
                                    {stats.verified} VERIFIED
                                </Badge>
                                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-[9px] px-2 py-0">
                                    {stats.pending} PENDING
                                </Badge>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="flex-1 overflow-y-auto px-8 py-8 space-y-4">
                        {slots.map((slot) => (
                            <div
                                key={slot.id}
                                className="group p-5 rounded-3xl glass border-white/10 hover:border-primary/30 transition-all flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center border transition-colors ${slot.status === "Verified" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" :
                                        slot.status === "Rejected" ? "bg-destructive/10 border-destructive/20 text-destructive" :
                                            slot.status === "Pending" ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                                                "bg-white/5 border-white/10 text-muted-foreground"
                                        }`}>
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h5 className="text-sm font-bold text-white group-hover:text-primary transition-colors">{slot.name}</h5>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground opacity-70">{slot.type}</span>
                                            <span className="h-1 w-1 rounded-full bg-white/20" />
                                            <span className="text-[10px] font-medium text-muted-foreground/60">{slot.updatedAt ? `Updated ${slot.updatedAt}` : "Required"}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {slot.status === "Missing" ? (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            disabled={!!uploading}
                                            onClick={() => handleUpload(slot.id, slot.name)}
                                            className="rounded-xl bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/5 gap-2 px-3"
                                        >
                                            {uploading === slot.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                                            <span className="text-[10px] font-bold uppercase">{uploading === slot.id ? "Uploading..." : "Upload"}</span>
                                        </Button>
                                    ) : (
                                        <div className="flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/10">
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-white/10">
                                                <Upload className="h-4 w-4 text-muted-foreground" />
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div className="p-6 rounded-3xl bg-primary/5 border border-primary/20 flex gap-4">
                            <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                <span className="font-bold text-primary italic">Audit Note:</span> Every file upload is tracked via IP and timestamp. Rejected documents must be re-uploaded within 48 hours to maintain counseling eligibility.
                            </p>
                        </div>
                    </div>

                    <div className="p-8 border-t border-white/5 bg-white/2">
                        <Button className="w-full h-12 rounded-2xl bg-white text-black hover:bg-white/90 font-bold uppercase tracking-widest">
                            Save & Close Vault
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
