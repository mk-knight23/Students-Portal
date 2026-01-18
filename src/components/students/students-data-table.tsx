"use client";

import React from "react";
import {
    Search,
    Filter,
    MoreVertical,
    Download,
    FileSpreadsheet,
    UserPlus,
    ArrowUpDown,
    CheckCircle,
    AlertCircle,
    Clock,
    FileText
} from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentCenter } from "@/components/students/document-center";
import { Checkbox } from "@/components/ui/checkbox";
import { MockStudent, StudentStatus } from "@/mocks/data-store";

export function StudentsDataTable({ data }: { data: MockStudent[] }) {
    const [isDocCenterOpen, setIsDocCenterOpen] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState<{ name: string; id: string } | null>(null);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
    const [sortConfig, setSortConfig] = React.useState<{ key: keyof MockStudent; direction: "asc" | "desc" } | null>(null);

    const openDocCenter = (student: MockStudent) => {
        setSelectedStudent({ name: student.name, id: student.id });
        setIsDocCenterOpen(true);
    };

    const toggleSelectAll = () => {
        if (selectedIds.length === filteredStudents.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(filteredStudents.map(s => s.id));
        }
    };

    const toggleSelectRow = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
        );
    };

    const handleSort = (key: keyof MockStudent) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const sortedData = React.useMemo(() => {
        if (!sortConfig) return data;
        return [...data].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
            if (aVal === undefined || aVal === null) return 1;
            if (bVal === undefined || bVal === null) return -1;
            if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }, [data, sortConfig]);

    const filteredStudents = sortedData.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search students (⌘+K)"
                        className="pl-11 h-12 glass rounded-2xl border-white/10 focus:border-primary/50 transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="h-12 glass rounded-2xl border-white/10 gap-2 px-5">
                        <Filter className="h-4 w-4" /> Filters
                    </Button>
                </div>
            </div>

            {selectedIds.length > 0 && (
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-4">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-primary">{selectedIds.length} students selected</span>
                        <div className="h-4 w-[1px] bg-primary/20" />
                        <div className="flex gap-2">
                            <Button size="sm" variant="ghost" className="text-xs font-bold uppercase tracking-wider h-8">Batch Verify</Button>
                            <Button size="sm" variant="ghost" className="text-xs font-bold uppercase tracking-wider h-8 text-destructive">Delete</Button>
                        </div>
                    </div>
                </div>
            )}

            <div className="glass rounded-[2rem] border-white/10 overflow-hidden shadow-2xl">
                <Table>
                    <TableHeader className="bg-white/5">
                        <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="w-[50px] pl-8 py-5">
                                <Checkbox
                                    checked={selectedIds.length === filteredStudents.length && filteredStudents.length > 0}
                                    onCheckedChange={toggleSelectAll}
                                />
                            </TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest py-5 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort("name")}>
                                <div className="flex items-center gap-2">Student <ArrowUpDown className="h-3 w-3" /></div>
                            </TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest py-5">Category</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest py-5 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort("neetScore")}>
                                <div className="flex items-center gap-2">NEET Score <ArrowUpDown className="h-3 w-3" /></div>
                            </TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest py-5">State</TableHead>
                            <TableHead className="font-bold text-xs uppercase tracking-widest py-5 text-center">Status</TableHead>
                            <TableHead className="w-[80px] py-5 pr-8"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredStudents.map((student) => (
                            <TableRow
                                key={student.id}
                                className={`border-white/5 hover:bg-white/5 transition-colors group ${selectedIds.includes(student.id) ? "bg-primary/5" : ""}`}
                            >
                                <TableCell className="pl-8 py-4">
                                    <Checkbox
                                        checked={selectedIds.includes(student.id)}
                                        onCheckedChange={() => toggleSelectRow(student.id)}
                                    />
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary/20 to-chart-2/20 flex items-center justify-center font-bold text-xs group-hover:scale-110 transition-transform">
                                            {student.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm tracking-tight">{student.name}</p>
                                            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{student.id}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <Badge variant="outline" className="border-white/10 text-xs rounded-lg px-2.5 py-0.5 bg-white/5">
                                        {student.category}
                                    </Badge>
                                </TableCell>
                                <TableCell className="py-4">
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-sm">{student.neetScore}</span>
                                        <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-primary" style={{ width: `${((student.neetScore || 0) / 720) * 100}%` }} />
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="py-4">
                                    <span className="text-xs text-muted-foreground font-medium">{student.domicileState}</span>
                                </TableCell>
                                <TableCell className="py-4 text-center">
                                    <StatusBadge status={student.status} />
                                </TableCell>
                                <TableCell className="py-4 pr-8 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-full">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="glass border-white/10 rounded-xl">
                                            <DropdownMenuItem className="focus:bg-white/10 text-xs font-medium">View Profile</DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() => openDocCenter(student)}
                                                className="focus:bg-white/10 rounded-lg cursor-pointer flex items-center gap-2"
                                            >
                                                <FileText className="h-3 w-3" /> Documents
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <DocumentCenter
                isOpen={isDocCenterOpen}
                onClose={() => setIsDocCenterOpen(false)}
                studentName={selectedStudent?.name || ""}
                studentId={selectedStudent?.id || ""}
            />
        </div>
    );
}

function StatusBadge({ status }: { status: StudentStatus }) {
    switch (status) {
        case "COMPLETED":
        case "CONFIRMED":
            return (
                <Badge className="bg-green-500/20 text-green-400 border-none rounded-full h-8 px-4 gap-1.5 text-[10px] font-bold">
                    <CheckCircle className="h-3 w-3" /> {status}
                </Badge>
            );
        case "REGISTERED":
            return (
                <Badge className="bg-blue-500/20 text-blue-400 border-none rounded-full h-8 px-4 gap-1.5 text-[10px] font-bold">
                    <Clock className="h-3 w-3" /> REGISTERED
                </Badge>
            );
        default:
            return (
                <Badge className="bg-orange-500/20 text-orange-400 border-none rounded-full h-8 px-4 gap-1.5 text-[10px] font-bold">
                    <Clock className="h-3 w-3" /> {status}
                </Badge>
            );
    }
}
