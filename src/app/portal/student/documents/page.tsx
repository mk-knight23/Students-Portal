"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DocumentUpload } from "@/components/ui/document-upload"
import {
    FileText, CheckCircle2, Clock, AlertCircle,
    ArrowLeft, HelpCircle
} from "lucide-react"
import Link from "next/link"

import { useAppStore } from "@/store/useAppStore"
import { mockStudents } from "@/modules/students/mock-data"

export default function StudentDocumentsPage() {
    const { currentUser, students } = useAppStore();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const student = students.find(s => s.id === currentUser?.id) || mockStudents[0];

    if (!mounted || !student) return null;
    // ... (rest of the mapping logic)

    const documentSlots = student.documents.map(doc => ({
        id: doc.id,
        name: doc.type.replace(/_/g, ' ').toUpperCase(),
        status: doc.status as 'verified' | 'uploaded' | 'pending', // map types loosely
        required: true,
        file: doc.url ? { name: `${doc.type}_doc.pdf`, url: doc.url } : undefined,
        instructions: `Upload valid ${doc.type.replace(/_/g, ' ')}`,
    }));

    const statusSummary = {
        verified: documentSlots.filter(d => d.status === 'verified').length,
        uploaded: documentSlots.filter(d => d.status === 'uploaded').length,
        pending: documentSlots.filter(d => d.status === 'pending').length,
        total: documentSlots.length,
    }

    const handleUpload = async (file: File) => {
        // Mock upload delay
        await new Promise(resolve => setTimeout(resolve, 2000))
        console.log('Uploaded:', file.name)
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="space-y-4">
                <Link href="/portal/student/dashboard">
                    <Button variant="ghost" size="sm" className="text-xs">
                        <ArrowLeft className="mr-2 h-3 w-3" />
                        Back to Dashboard
                    </Button>
                </Link>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary w-fit border border-primary/20">
                        <FileText className="h-3 w-3" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.1em]">Document Center</span>
                    </div>
                    <h1 className="text-3xl font-black tracking-tight">
                        Upload <span className="text-primary">Documents</span>
                    </h1>
                    <p className="text-sm text-muted-foreground font-medium">
                        Complete your document submission for admission processing
                    </p>
                </div>
            </div>

            {/* Status Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="glass-card">
                    <CardContent className="pt-6 text-center">
                        <p className="text-2xl font-black text-green-500">{statusSummary.verified}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            Verified
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardContent className="pt-6 text-center">
                        <p className="text-2xl font-black text-yellow-500">{statusSummary.uploaded}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-1">
                            <Clock className="h-3 w-3" />
                            Under Review
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card">
                    <CardContent className="pt-6 text-center">
                        <p className="text-2xl font-black text-red-500">{statusSummary.pending}</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Pending
                        </p>
                    </CardContent>
                </Card>
                <Card className="glass-card bg-gradient-to-br from-primary/20 to-primary/5 border-primary/20">
                    <CardContent className="pt-6 text-center">
                        <p className="text-2xl font-black">{Math.round((statusSummary.verified / statusSummary.total) * 100)}%</p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            Complete
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Document Upload Grid */}
            <Card className="glass-card">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg font-bold">
                        <FileText className="h-5 w-5 text-primary" />
                        Required Documents
                    </CardTitle>
                    <Button variant="ghost" size="sm" className="text-xs">
                        <HelpCircle className="mr-2 h-3 w-3" />
                        Help Guide
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        {documentSlots.map((slot) => (
                            <DocumentUpload
                                key={slot.id}
                                slotId={slot.id}
                                slotName={slot.name}
                                required={slot.required}
                                existingFile={slot.file}
                                instructions={slot.instructions}
                                onUpload={handleUpload}
                                onRemove={() => console.log('Remove:', slot.id)}
                                status={slot.status as any}
                            />
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Help Section */}
            <Card className="glass-card border-blue-500/20">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-blue-500/10 p-2 rounded-xl">
                            <HelpCircle className="h-6 w-6 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold">Need Help?</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                                Make sure all documents are clear, legible, and recent. Documents will be verified within 24-48 hours.
                                For questions, contact our support team.
                            </p>
                            <Button variant="link" className="text-blue-500 p-0 h-auto mt-2 text-xs font-bold">
                                Contact Support →
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
