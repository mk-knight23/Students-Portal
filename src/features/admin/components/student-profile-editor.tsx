"use client"

import { useState } from "react"
import { Student, useAppStore } from "@/store/useAppStore"
import {
    X,
    Save,
    Trash2,
    GraduationCap,
    CreditCard,
    User,
    MapPin,
    ChevronRight,
    ShieldCheck,
    History,
    AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

interface StudentProfileEditorProps {
    student: Student;
    onClose: () => void;
}

export function StudentProfileEditor({ student, onClose }: StudentProfileEditorProps) {
    const { updateStudent, deleteStudent } = useAppStore();
    const [formData, setFormData] = useState<Student>(student);

    const handleSave = () => {
        updateStudent(student.id, formData);
        toast.success("Profile Updated", {
            description: `Changes to ${student.name} have been committed to the master database.`
        });
        onClose();
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this student profile? This action is irreversible.")) {
            deleteStudent(student.id);
            toast.error("Profile Deleted");
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-2xl bg-background shadow-2xl h-full flex flex-col animate-in slide-in-from-right duration-500 border-l">
                {/* Header */}
                <div className="p-6 border-b flex items-center justify-between bg-muted/20">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center font-black text-lg text-primary">
                            {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                            <h2 className="text-xl font-black uppercase tracking-tight">{student.name}</h2>
                            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">{student.id} • {student.branch}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="rounded-xl">
                        <X className="h-5 w-5" />
                    </Button>
                </div>

                <Tabs defaultValue="personal" className="flex-1 flex flex-col overflow-hidden">
                    <div className="px-6 border-b bg-muted/10">
                        <TabsList className="h-12 bg-transparent justify-start gap-6 rounded-none p-0">
                            <TabsTrigger value="personal" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-1 text-xs font-black uppercase tracking-widest">Profile</TabsTrigger>
                            <TabsTrigger value="academic" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-1 text-xs font-black uppercase tracking-widest">Academic</TabsTrigger>
                            <TabsTrigger value="financials" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-1 text-xs font-black uppercase tracking-widest">Financials</TabsTrigger>
                            <TabsTrigger value="audit" className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-primary border-b-2 border-transparent data-[state=active]:border-primary rounded-none h-full px-1 text-xs font-black uppercase tracking-widest">Audit Logs</TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                        <TabsContent value="personal" className="mt-0 space-y-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Full Name</label>
                                    <Input value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Email Address</label>
                                    <Input value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Phone Number</label>
                                    <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="rounded-xl" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Identity Masking</label>
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/20 border">
                                        <ShieldCheck className="h-4 w-4 text-green-500" />
                                        <span className="text-sm font-mono">{formData.aadhaar_masked}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 flex items-start gap-4">
                                <div className="p-2 bg-primary rounded-xl text-white">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase">Lifecycle Status</p>
                                    <select
                                        className="mt-1 bg-transparent border-none font-bold text-primary text-sm outline-none cursor-pointer"
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                    >
                                        <option>Inquiry</option>
                                        <option>Application</option>
                                        <option>Documents</option>
                                        <option>Verification</option>
                                        <option>Counseling</option>
                                        <option>Admission</option>
                                        <option>Confirmed</option>
                                    </select>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="academic" className="mt-0 space-y-8">
                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <GraduationCap className="h-5 w-5 text-primary" />
                                    <h3 className="text-sm font-black uppercase tracking-tight">Competitive Entrance</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-6 p-6 rounded-3xl bg-muted/10 border border-white/5">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground">NEET Score</p>
                                        <p className="text-2xl font-black italic">{formData.neet_score}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase text-muted-foreground">All India Rank</p>
                                        <p className="text-2xl font-black italic">#{formData.neet_rank.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-blue-500" />
                                    <h3 className="text-sm font-black uppercase tracking-tight">Educational Background</h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/5 border border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-xs font-black uppercase">Class 10th (SSC)</p>
                                            <p className="text-[10px] text-muted-foreground font-bold">
                                                {formData.academic_history?.class10?.board || "SSC"} • {formData.academic_history?.class10?.year || "2023"} • {formData.academic_history?.class10?.percentage.toFixed(2)}%
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-primary">View Docs</Button>
                                    </div>
                                    <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/5 border border-white/5">
                                        <div className="space-y-1">
                                            <p className="text-xs font-black uppercase">Class 12th (HSC)</p>
                                            <p className="text-[10px] text-muted-foreground font-bold">
                                                {formData.academic_history?.class12?.board || "HSC"} • {formData.academic_history?.class12?.year || "2025"} • {formData.academic_history?.class12?.percentage.toFixed(2)}%
                                            </p>
                                        </div>
                                        <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-primary">View Docs</Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="financials" className="mt-0 space-y-8">
                            <div className="grid grid-cols-3 gap-4">
                                <div className="p-4 rounded-2xl bg-muted/10 border border-white/5 space-y-1">
                                    <p className="text-[9px] font-black uppercase text-muted-foreground">Total Fees</p>
                                    <p className="text-lg font-black">₹ 14.5L</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/20 space-y-1">
                                    <p className="text-[9px] font-black uppercase text-green-500">Paid Amount</p>
                                    <p className="text-lg font-black text-green-500">
                                        ₹ {(formData.payments?.filter(p => p.status === 'Success').reduce((sum, p) => sum + p.amount, 0) || 0).toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-4 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-1">
                                    <p className="text-[9px] font-black uppercase text-red-500">Pending</p>
                                    <p className="text-lg font-black text-red-500">
                                        ₹ {(1450000 - (formData.payments?.filter(p => p.status === 'Success').reduce((sum, p) => sum + p.amount, 0) || 0)).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-black uppercase tracking-tight flex items-center gap-2">
                                        <CreditCard className="h-4 w-4 text-primary" />
                                        Payment History
                                    </h3>
                                    <Button variant="ghost" className="text-[10px] font-black uppercase text-primary h-8">Add Entry</Button>
                                </div>
                                <div className="space-y-2">
                                    {formData.payments?.length ? formData.payments.map((p, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-muted/10 border border-white/5 group">
                                            <div className="space-y-1">
                                                <p className="text-xs font-black uppercase">{p.type} Installment</p>
                                                <p className="text-[10px] text-muted-foreground font-bold">{p.date} • {p.method}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <p className="text-sm font-black italic">₹{p.amount.toLocaleString()}</p>
                                                <Badge className="bg-green-500/10 text-green-500 border-green-500/20 text-[8px] font-black px-1.5 py-0 h-4">Success</Badge>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="text-center py-10 opacity-30 italic text-xs font-black uppercase tracking-widest">No transactions logged</div>
                                    )}
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="audit" className="mt-0 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <History className="h-5 w-5 text-muted-foreground" />
                                    <h3 className="text-sm font-black uppercase tracking-tight">System Audit Trail</h3>
                                </div>
                                <div className="space-y-6 relative ml-3 border-l-2 border-muted pl-6 py-2">
                                    {[
                                        { event: "Status updated to Confirmed", user: "Admin (ADM001)", time: "12 Jan, 14:30" },
                                        { event: "Document 'Aadhaar' verified", user: "Staff (STF01)", time: "11 Jan, 10:15" },
                                        { event: "Application submitted", user: "Student Portal", time: "10 Jan, 09:45" },
                                        { event: "Inquiry started", user: "Siddhesh Jadhav", time: "10 Jan, 09:30" },
                                    ].map((log, i) => (
                                        <div key={i} className="relative group">
                                            <div className="absolute -left-[31px] top-1 h-2 w-2 rounded-full bg-muted-foreground/30 group-hover:bg-primary transition-colors" />
                                            <div className="space-y-1">
                                                <p className="text-xs font-black uppercase tracking-tight">{log.event}</p>
                                                <p className="text-[10px] text-muted-foreground font-medium">{log.user} • {log.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabsContent>
                    </div>
                </Tabs>

                {/* Footer Actions */}
                <div className="p-6 border-t bg-muted/20 flex items-center justify-between gap-4">
                    <Button variant="outline" className="rounded-xl h-12 px-6 text-red-500 hover:bg-red-500/10 hover:text-red-600 border-red-500/20 font-black uppercase text-xs" onClick={handleDelete}>
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Profile
                    </Button>
                    <div className="flex gap-4 flex-1">
                        <Button variant="outline" className="flex-1 rounded-xl h-12 font-black uppercase text-xs" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button className="flex-2 rounded-xl h-12 font-black uppercase text-xs shadow-lg shadow-primary/20 bg-primary px-8" onClick={handleSave}>
                            <Save className="mr-2 h-4 w-4" /> Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
