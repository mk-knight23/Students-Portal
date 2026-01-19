"use client"

import { useState, useMemo } from "react"
import { useAppStore } from "@/store/useAppStore"
import { getStateEligibility } from "../utils/state-rule-engine"
import colleges from "@/services/mock/colleges.json"
import {
    Building2,
    Search,
    Plus,
    ArrowUp,
    ArrowDown,
    Trash2,
    Lock,
    ArrowRight,
    MapPin,
    GraduationCap
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

export function CounselingPreferenceBuilder() {
    const { currentUser, students, updateStudent } = useAppStore();
    const [mounted, setMounted] = useState(false);

    // Find current student or fallback to first for demo safety
    const student = students.find(s => s.id === currentUser?.id) || students[0];

    const [searchTerm, setSearchTerm] = useState("");
    const [preferences, setPreferences] = useState<any[]>([]);
    const [locked, setLocked] = useState(false);

    useState(() => {
        if (student?.preferences) {
            setPreferences(student.preferences);
        }
    });

    useState(() => {
        setMounted(true);
    });

    if (!mounted || !student) return null;

    const filteredColleges = colleges.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.city.toLowerCase().includes(searchTerm.toLowerCase())
    ).filter(c => !preferences.some(p => p.id === c.id));

    const addPreference = (college: any) => {
        if (locked) return;
        if (preferences.length >= 10) {
            toast.error("Limit Reached", { description: "You can only select up to 10 preferences." });
            return;
        }
        setPreferences([...preferences, college]);
    };

    const removePreference = (id: string) => {
        if (locked) return;
        setPreferences(preferences.filter(p => p.id !== id));
    };

    const movePreference = (index: number, direction: 'up' | 'down') => {
        if (locked) return;
        const newPrefs = [...preferences];
        const swapIndex = direction === 'up' ? index - 1 : index + 1;
        if (swapIndex < 0 || swapIndex >= newPrefs.length) return;
        [newPrefs[index], newPrefs[swapIndex]] = [newPrefs[swapIndex], newPrefs[index]];
        setPreferences(newPrefs);
    };

    const handleLock = () => {
        setLocked(true);
        updateStudent(student.id, { preferences });
        toast.success("Preferences Locked", {
            description: "Your choices have been submitted for the current round."
        });
    };

    return (
        <div className="grid lg:grid-cols-2 gap-10">
            {/* College Selection */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <h3 className="text-xl font-black uppercase tracking-tight">Search Institutions</h3>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Category 1.3 - Preference Builder</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name, city or state..."
                        className="pl-10 rounded-2xl bg-muted/20 border-none h-12"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="grid gap-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                    {filteredColleges.map((college) => (
                        <div key={college.id} className="p-4 rounded-2xl bg-card border border-white/5 flex items-center justify-between group hover:border-primary/40 transition-all hover:bg-muted/10">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase leading-tight">{college.name}</p>
                                    <p className="text-[10px] text-muted-foreground font-medium">{college.city}, {college.state} • {college.type}</p>
                                </div>
                            </div>
                            <Button
                                size="icon"
                                variant="ghost"
                                className="rounded-lg hover:bg-primary hover:text-white"
                                onClick={() => addPreference(college)}
                                disabled={locked}
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Preference List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-xl font-black uppercase tracking-tight">Your Choices</h3>
                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest">Priority Ranking (1-10)</p>
                    </div>
                    {!locked && preferences.length > 0 && (
                        <Button onClick={handleLock} className="rounded-xl font-bold text-xs uppercase shadow-lg shadow-primary/20 bg-primary">
                            <Lock className="mr-2 h-3.5 w-3.5" /> Lock Preferences
                        </Button>
                    )}
                </div>

                <div className="space-y-3 min-h-[400px] rounded-3xl border-2 border-dashed border-muted/50 p-4 flex flex-col">
                    {preferences.map((pref, index) => (
                        <div key={pref.id} className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${locked ? 'bg-muted/5 opacity-80 border-white/10' : 'bg-card border-primary/20 shadow-md shadow-primary/5'
                            }`}>
                            <div className="flex items-center gap-4">
                                <span className="text-xl font-black text-primary/40 leading-none">#{index + 1}</span>
                                <div>
                                    <p className="text-xs font-black uppercase leading-tight">{pref.name}</p>
                                    <Badge variant="secondary" className="text-[8px] font-black uppercase px-1.5 py-0 h-4 mt-1">
                                        {pref.state}
                                    </Badge>
                                </div>
                            </div>
                            {!locked && (
                                <div className="flex items-center gap-1">
                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => movePreference(index, 'up')} disabled={index === 0}>
                                        <ArrowUp className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => movePreference(index, 'down')} disabled={index === preferences.length - 1}>
                                        <ArrowDown className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500" onClick={() => removePreference(pref.id)}>
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                    {preferences.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 opacity-30 italic">
                            <GraduationCap className="h-16 w-16" />
                            <p className="text-xs font-black uppercase tracking-widest">Choose Your Medical Colleges</p>
                        </div>
                    )}
                    {locked && (
                        <div className="mt-auto p-4 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-500" />
                            <p className="text-[10px] font-black uppercase text-green-600 tracking-tight">
                                Choices locked for Round 1. Allotment results on 30 Jan 2026.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

function CheckCircle2({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
    )
}
