"use client"

import { useAppStore } from "@/store/useAppStore"
import { useStudentSearch } from "../hooks/useStudentSearch"
import { CASTE_CATEGORIES, STATES_SUPPORTED } from "@/constants/portal"
import {
    Search,
    Filter,
    Plus,
    MoreHorizontal,
    FileDown,
    UserCheck,
    AlertCircle,
    Mail,
    Phone,
    ArrowUpDown,
    Download
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

import { useState } from "react"
import { StudentProfileEditor } from "./student-profile-editor"
import { Student } from "@/store/useAppStore"

export function StudentMasterTable() {
    const { students } = useAppStore();
    const { searchTerm, setSearchTerm, filters, setFilters, filteredStudents } = useStudentSearch(students);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const handleExport = () => {
        toast.info("Exporting records...", {
            description: `Generated CSV for ${filteredStudents.length} selected records.`
        });
    };

    return (
        <div className="space-y-6">
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border shadow-sm">
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by Name, ID, or Phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 rounded-xl bg-muted/20 border-none focus-visible:ring-1 focus-visible:ring-primary"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <select
                        className="text-xs font-bold bg-muted/40 border-none rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                        value={filters.category}
                        onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                    >
                        <option value="all">All Categories</option>
                        {CASTE_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select
                        className="text-xs font-bold bg-muted/40 border-none rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-primary"
                        value={filters.city}
                        onChange={(e) => setFilters(prev => ({ ...prev, city: e.target.value }))}
                    >
                        <option value="all">All Cities</option>
                        {[
                            'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik',
                            'Aurangabad', 'Solapur', 'Amravati', 'Navi Mumbai', 'Latur'
                        ].map(city => <option key={city} value={city}>{city}</option>)}
                    </select>
                    <Button variant="outline" size="sm" className="rounded-lg h-9 gap-2" onClick={handleExport}>
                        <Download className="h-3.5 w-3.5" /> Export
                    </Button>
                </div>
            </div>

            {/* Table Container */}
            <div className="rounded-2xl border bg-card shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 border-b">
                            <tr className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                <th className="px-6 py-4">Student Identity</th>
                                <th className="px-6 py-4">Academic Specs</th>
                                <th className="px-6 py-4">Category/Quota</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredStudents.map((student) => (
                                <tr key={student.id} className="hover:bg-accent/5 transition-colors group">
                                    <td className="px-6 py-4" onClick={() => setSelectedStudent(student)}>
                                        <div className="flex items-center gap-3 cursor-pointer">
                                            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center font-black text-xs text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                                {student.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm leading-none">{student.name}</span>
                                                <span className="text-[10px] text-muted-foreground mt-1.5 uppercase font-mono">{student.id}</span>
                                                <div className="flex items-center gap-3 mt-1 text-[10px] text-muted-foreground">
                                                    <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {student.phone}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-black">{student.neet_score}</span>
                                                <span className="text-[10px] text-muted-foreground tracking-tighter">Rank: {student.neet_rank.toLocaleString()}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] text-primary font-bold uppercase">{student.city}</span>
                                                <span className="text-[10px] text-muted-foreground opacity-50">•</span>
                                                <span className="text-[10px] text-muted-foreground font-bold uppercase">{student.state}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-start gap-1">
                                            <Badge variant="outline" className="border-primary/20 bg-primary/5 text-[9px] font-black px-1.5 py-0 h-4">
                                                {student.category}
                                            </Badge>
                                            <div className="flex flex-wrap gap-1">
                                                {student.counseling_registrations.map(reg => (
                                                    <span key={reg} className="text-[8px] font-bold text-muted-foreground uppercase">{reg}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-1.5 w-1.5 rounded-full ${student.documents_verified ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-yellow-500'
                                                }`} />
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${student.documents_verified ? 'text-green-500' : 'text-yellow-600'
                                                }`}>
                                                {student.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"
                                                onClick={() => setSelectedStudent(student)}
                                            >
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredStudents.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center gap-2 opacity-30">
                                            <Search className="h-10 w-10 text-muted-foreground" />
                                            <p className="font-bold uppercase tracking-widest text-xs">No records found Matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="px-6 py-4 border-t bg-muted/5 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                    <span>Showing {filteredStudents.length} of {students.length} Total Records</span>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <span>Rows per page</span>
                            <select className="bg-transparent border-none outline-none font-black text-foreground">
                                <option>10</option>
                                <option>20</option>
                                <option>50</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="hover:text-primary transition-colors disabled:opacity-30" disabled>Previous</button>
                            <button className="hover:text-primary transition-colors">Next</button>
                        </div>
                    </div>
                </div>
            </div>

            {selectedStudent && (
                <StudentProfileEditor
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    )
}
