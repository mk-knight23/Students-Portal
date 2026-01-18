"use client";

import React from "react";
import { X, Filter as FilterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from "@/components/ui/sheet";

interface FilterConfig {
    category: string;
    status: string;
    state: string;
    minScore: string;
    maxScore: string;
}

interface AdvancedFiltersProps {
    filters: FilterConfig;
    onFilterChange: (filters: FilterConfig) => void;
    onClear: () => void;
    categories: string[];
    statuses: string[];
    states: string[];
}

export function AdvancedFilters({
    filters,
    onFilterChange,
    onClear,
    categories,
    statuses,
    states,
}: AdvancedFiltersProps) {
    const activeFilterCount = Object.values(filters).filter(Boolean).length;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="h-12 glass rounded-2xl border-white/10 gap-2 px-5 relative">
                    <FilterIcon className="h-4 w-4" /> Filters
                    {activeFilterCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-primary">
                            {activeFilterCount}
                        </Badge>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="glass border-white/10 w-[400px]">
                <SheetHeader>
                    <SheetTitle className="text-white flex items-center gap-2">
                        <FilterIcon className="h-5 w-5 text-primary" /> Advanced Filters
                    </SheetTitle>
                    <SheetDescription>
                        Filter students by category, status, state, or score range.
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-6 py-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                        <Select
                            value={filters.category}
                            onValueChange={(value) => onFilterChange({ ...filters, category: value })}
                        >
                            <SelectTrigger className="glass border-white/10 rounded-xl">
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10">
                                <SelectItem value="">All Categories</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</label>
                        <Select
                            value={filters.status}
                            onValueChange={(value) => onFilterChange({ ...filters, status: value })}
                        >
                            <SelectTrigger className="glass border-white/10 rounded-xl">
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10">
                                <SelectItem value="">All Statuses</SelectItem>
                                {statuses.map((status) => (
                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">State</label>
                        <Select
                            value={filters.state}
                            onValueChange={(value) => onFilterChange({ ...filters, state: value })}
                        >
                            <SelectTrigger className="glass border-white/10 rounded-xl">
                                <SelectValue placeholder="All States" />
                            </SelectTrigger>
                            <SelectContent className="glass border-white/10">
                                <SelectItem value="">All States</SelectItem>
                                {states.map((state) => (
                                    <SelectItem key={state} value={state}>{state}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">NEET Score Range</label>
                        <div className="flex gap-3">
                            <Input
                                type="number"
                                placeholder="Min"
                                value={filters.minScore}
                                onChange={(e) => onFilterChange({ ...filters, minScore: e.target.value })}
                                className="glass border-white/10 rounded-xl"
                            />
                            <Input
                                type="number"
                                placeholder="Max"
                                value={filters.maxScore}
                                onChange={(e) => onFilterChange({ ...filters, maxScore: e.target.value })}
                                className="glass border-white/10 rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                <SheetFooter className="flex gap-3">
                    <Button variant="ghost" onClick={onClear} className="flex-1 rounded-xl">
                        <X className="h-4 w-4 mr-2" /> Clear All
                    </Button>
                    <Button className="flex-1 rounded-xl bg-primary">
                        Apply Filters
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
