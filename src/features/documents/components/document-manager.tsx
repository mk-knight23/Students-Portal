"use client"

import { useState } from "react"
import { useAppStore } from "@/store/useAppStore"
import { DOCUMENT_SLOTS } from "@/constants/portal"
import { simulateOCR, OCRResult } from "../utils/ocr-simulate"
import {
    FileUp,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Eye,
    Trash2,
    FileText,
    Loader2,
    ScanSearch
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"

export function DocumentManager() {
    const [uploading, setUploading] = useState<string | null>(null);
    const [ocrResults, setOcrResults] = useState<Record<string, OCRResult>>({});
    const { students, updateStudent } = useAppStore();
    const student = students[0]; // Active student mock

    const handleUpload = async (slotId: string, file: File) => {
        setUploading(slotId);
        try {
            // Simulate OCR extraction
            const result = await simulateOCR(file);
            setOcrResults(prev => ({ ...prev, [slotId]: result }));

            // Update student document state
            const newDoc = {
                id: `DOC-${Date.now()}`,
                type: slotId,
                status: 'Pending' as const,
                url: URL.createObjectURL(file)
            };

            updateStudent(student.id, {
                documents: [...student.documents, newDoc]
            });

            toast.success(`${slotId.toUpperCase()} Uploaded`, {
                description: `OCR detected ${Object.keys(result.matchedFields).length} fields with ${Math.round(result.confidence * 100)}% confidence.`
            });
        } catch (err) {
            toast.error("Upload Failed", { description: "Check file quality and try again." });
        } finally {
            setUploading(null);
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DOCUMENT_SLOTS.map((slot) => {
                    const uploaded = student.documents.find(d => d.type === slot.id);
                    const isUploading = uploading === slot.id;
                    const ocr = ocrResults[slot.id];

                    return (
                        <Card key={slot.id} className={`glass-card relative overflow-hidden group border-dashed transition-all duration-300 ${uploaded ? 'border-solid border-primary/40 bg-primary/5' : 'hover:border-primary/40'
                            }`}>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="p-2 rounded-xl bg-muted/40 text-muted-foreground group-hover:text-primary transition-colors">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    {uploaded ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                                    ) : slot.required ? (
                                        <Badge variant="outline" className="text-[8px] font-black uppercase text-red-500 border-red-500/20">Required</Badge>
                                    ) : null}
                                </div>
                                <CardTitle className="text-sm font-black uppercase tracking-tight mt-3">{slot.label}</CardTitle>
                                <CardDescription className="text-[10px] uppercase font-bold tracking-widest leading-none">
                                    Formats: {slot.formats.join(', ')}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {uploaded ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 rounded-xl bg-background/40 border">
                                            <div className="flex items-center gap-2">
                                                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                                    <FileUp className="h-4 w-4 text-primary" />
                                                </div>
                                                <span className="text-[10px] font-bold opacity-60">Uploaded file</span>
                                            </div>
                                            <div className="flex gap-1">
                                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg"><Eye className="h-3 w-3" /></Button>
                                                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-red-500"><Trash2 className="h-3 w-3" /></Button>
                                            </div>
                                        </div>
                                        {ocr && (
                                            <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/10 space-y-2">
                                                <div className="flex items-center gap-1.5 text-[9px] font-black uppercase text-green-600">
                                                    <ScanSearch className="h-3 w-3" />
                                                    OCR Insight Found
                                                </div>
                                                <div className="space-y-1">
                                                    {Object.entries(ocr.matchedFields).map(([k, v]) => (
                                                        <div key={k} className="flex justify-between text-[10px]">
                                                            <span className="opacity-60 font-bold">{k}:</span>
                                                            <span className="font-black text-foreground">{v}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <label className="flex flex-col items-center justify-center py-6 border-2 border-dashed rounded-2xl cursor-pointer hover:bg-primary/5 transition-all group/label">
                                        {isUploading ? (
                                            <div className="flex flex-col items-center gap-2">
                                                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                                                <span className="text-[10px] font-black uppercase tracking-widest text-primary">Scanning Document...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <FileUp className="h-8 w-8 text-muted-foreground group-hover/label:text-primary transition-colors" />
                                                <span className="mt-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">Drag & Drop</span>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) handleUpload(slot.id, file);
                                                    }}
                                                />
                                            </>
                                        )}
                                    </label>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10 flex items-start gap-4">
                <div className="p-3 bg-blue-500 rounded-2xl text-white shadow-lg shadow-blue-500/20">
                    <AlertCircle className="h-6 w-6" />
                </div>
                <div>
                    <h4 className="font-black text-blue-500 uppercase tracking-tight">Security & Compliance Note</h4>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed mt-1">
                        All uploaded documents are encrypted at rest with AES-256 and processed through our isolated OCR engine to ensure zero data leakage as per DPDPA 2023 norms.
                    </p>
                </div>
            </div>
        </div>
    )
}

function Badge({ children, className, variant }: any) {
    return (
        <span className={`px-2 py-0.5 rounded-full ${variant === 'outline' ? 'border' : ''} ${className}`}>
            {children}
        </span>
    )
}
