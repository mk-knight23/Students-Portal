"use client";

import React from "react";
import {
    Building2,
    ChevronDown,
    Check,
    Globe
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";

const branches = ["Latur", "Pune", "Mumbai", "Bangalore"];

export function BranchSwitcher() {
    const { activeBranch, setActiveBranch, currentUser } = useAppStore();
    const isAdmin = currentUser?.role === 'admin';

    if (!isAdmin) {
        return (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-bold tracking-tight">{activeBranch} Branch</span>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="glass h-10 px-4 rounded-xl gap-2 border-white/10 shadow-lg">
                    <Globe className="h-4 w-4 text-primary" />
                    <span className="hidden sm:inline text-xs font-bold tracking-tight">{activeBranch} Office</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-dark border-white/10 p-2 min-w-[200px]" align="start">
                <DropdownMenuLabel className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground py-2 px-3">
                    Switch Organization Desk
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/5" />
                {branches.map((branch) => (
                    <DropdownMenuItem
                        key={branch}
                        onClick={() => setActiveBranch(branch)}
                        className="rounded-lg focus:bg-white/10 px-3 py-2 cursor-pointer flex items-center justify-between"
                    >
                        <div className="flex items-center gap-2">
                            <Building2 className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">{branch}</span>
                        </div>
                        {activeBranch === branch && <Check className="h-4 w-4 text-primary" />}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
