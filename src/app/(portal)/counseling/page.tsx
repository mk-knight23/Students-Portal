"use client";

import React from "react";
import { motion, Reorder } from "framer-motion";
import {
    Plus,
    GripVertical,
    Trash2,
    Search,
    School,
    CheckCircle2,
    AlertCircle,
    Filter,
    Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { savePreferences } from "@/actions/student";
import { Loader2 } from "lucide-react";

interface College {
    id: string;
    name: string;
    code: string;
    type: "Govt" | "Private";
    district: string;
}

const availableColleges: College[] = [
    { id: "C001", name: "Grant Medical College, Mumbai", code: "1101", type: "Govt", district: "Mumbai" },
    { id: "C002", name: "B.J. Govt Medical College, Pune", code: "1202", type: "Govt", district: "Pune" },
    { id: "C003", name: "GMC Aurangabad", code: "1303", type: "Govt", district: "Aurangabad" },
    { id: "C004", name: "Seth GS Medical College, Mumbai", code: "1102", type: "Govt", district: "Mumbai" },
    { id: "C005", name: "DY Patil Medical College, Navi Mumbai", code: "1404", type: "Private", district: "Navi Mumbai" },
    { id: "C006", name: "MGM Medical College, Navi Mumbai", code: "1405", type: "Private", district: "Navi Mumbai" },
];

export default function ChoiceFillingPage() {
    const [selectedColleges, setSelectedColleges] = React.useState<College[]>([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    const filteredAvailable = availableColleges.filter(c =>
        !selectedColleges.find(sc => sc.id === c.id) &&
        (c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.includes(searchTerm))
    );

    const addCollege = (college: College) => {
        setSelectedColleges([...selectedColleges, college]);
        toast.success(`${college.name} added to list`, {
            description: `Priority #${selectedColleges.length + 1}`
        });
    };

    const removeCollege = (id: string) => {
        setSelectedColleges(selectedColleges.filter(c => c.id !== id));
    };

    const [isLoading, setIsLoading] = React.useState(false);
    const mockStudentId = "clk123456789"; // In real app, from session or URL

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const result = await savePreferences(mockStudentId, selectedColleges);
            if (result.success) {
                toast.success("Choices Locked Successfully", {
                    description: "Preference list has been saved for round 1."
                });
            }
        } catch (error) {
            toast.error("Failed to save preferences");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 space-y-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white">Choice Filling & Locking</h1>
                    <p className="text-muted-foreground text-sm mt-1 uppercase tracking-widest font-bold">Priority Management Engine</p>
                </div>
                <div className="flex gap-4">
                    <Select defaultValue="MBBS">
                        <SelectTrigger className="w-[180px] glass">
                            <SelectValue placeholder="Stream" />
                        </SelectTrigger>
                        <SelectContent className="glass-dark border-white/10">
                            <SelectItem value="MBBS">MBBS</SelectItem>
                            <SelectItem value="BDS">BDS</SelectItem>
                            <SelectItem value="BAMS">BAMS</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        onClick={handleSave}
                        disabled={isLoading || selectedColleges.length === 0}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 rounded-xl px-6"
                    >
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isLoading ? "Saving..." : "Save Preferences"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: Available Colleges */}
                <div className="space-y-6">
                    <Card className="glass border-white/10 rounded-[2rem]">
                        <CardContent className="p-6">
                            <div className="relative mb-6">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search Colleges by Name or Code..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 glass border-white/10 rounded-xl"
                                />
                            </div>

                            <div className="space-y-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                {filteredAvailable.map((college) => (
                                    <motion.div
                                        key={college.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-4 rounded-2xl glass border-white/5 hover:border-primary/30 transition-all flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                                <School className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-bold text-white leading-none mb-1">{college.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <code className="text-[10px] font-mono text-primary bg-primary/10 px-1.5 py-0.5 rounded">{college.code}</code>
                                                    <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{college.district}</span>
                                                    <Badge variant="outline" className="text-[8px] h-4 px-1">{college.type}</Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => addCollege(college)}
                                            className="h-8 w-8 rounded-lg hover:bg-primary/20 hover:text-primary"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Selected Preferences (Ordering) */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                            Selected Preferences <Badge className="bg-primary/20 text-primary border-primary/20">{selectedColleges.length}</Badge>
                        </h3>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <GripVertical className="h-3 w-3" /> Drag to reorder
                        </span>
                    </div>

                    {selectedColleges.length === 0 ? (
                        <div className="h-[600px] rounded-[2rem] border-2 border-dashed border-white/10 flex flex-col items-center justify-center text-center p-8 opacity-50">
                            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                                <Filter className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium text-white">No Priorities Set</p>
                            <p className="text-xs text-muted-foreground mt-2 max-w-[200px]">Add colleges from the left to build your preference list.</p>
                        </div>
                    ) : (
                        <Reorder.Group
                            axis="y"
                            values={selectedColleges}
                            onReorder={setSelectedColleges}
                            className="space-y-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar"
                        >
                            {selectedColleges.map((college, index) => (
                                <Reorder.Item
                                    key={college.id}
                                    value={college}
                                    className="p-4 rounded-2xl glass border-primary/20 bg-primary/5 flex items-center justify-between cursor-grab active:cursor-grabbing border-l-4 border-l-primary"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="text-[10px] font-bold text-primary">#{index + 1}</span>
                                            <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white leading-none mb-1">{college.name}</h4>
                                            <div className="flex items-center gap-2">
                                                <code className="text-[10px] font-mono text-primary/70">{college.code}</code>
                                                <span className="text-[10px] uppercase font-medium text-muted-foreground/60">{college.district}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => removeCollege(college.id)}
                                        className="h-8 w-8 rounded-lg hover:bg-destructive/20 hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    )}

                    {selectedColleges.length > 0 && (
                        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex gap-4">
                            <AlertCircle className="h-5 w-5 text-amber-500 shrink-0" />
                            <p className="text-[10px] text-amber-500/80 leading-relaxed uppercase font-bold tracking-tight">
                                Choices must be locked before the deadline (18th Jan, 11:59 PM). Unlocked choices will be auto-submitted in their current order.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
