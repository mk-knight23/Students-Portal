"use client";

import React from "react";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils";

import { useAppStore } from "@/store/useAppStore";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { BranchSwitcher } from "./branch-switcher";

export function Navbar() {
    const { activeBranch, currentUser } = useAppStore();
    const router = useRouter();
    return (
        <header className="sticky top-0 z-10 flex h-16 w-full items-center gap-4 glass border-b px-6 lg:px-8">
            <div className="flex-1 flex items-center gap-6">
                <BranchSwitcher />
                <div className="relative flex-1 max-w-md group">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search students (⌘+K)"
                        className="pl-9 bg-white/5 border-white/10 group-focus-within:border-primary/50 transition-all rounded-xl"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <ThemeToggle />

                <Button variant="ghost" size="icon" className="relative hover:bg-white/10 rounded-xl">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.5)]" />
                </Button>

                <div className="h-6 w-[1px] bg-white/10 mx-2" />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 gap-2 px-2 hover:bg-white/10 rounded-xl">
                            <Avatar className="h-8 w-8 border border-white/20">
                                <AvatarImage src="" alt="User" />
                                <AvatarFallback className="bg-primary/20 text-primary text-xs">MK</AvatarFallback>
                            </Avatar>
                            <div className="hidden flex-col items-start gap-0.5 text-xs lg:flex">
                                <span className="font-bold leading-none">{currentUser?.name || "User"}</span>
                                <span className="text-[10px] text-muted-foreground opacity-70 uppercase tracking-widest font-bold">
                                    {activeBranch} {currentUser?.role === "admin" ? "Office Head" : "Staff"}
                                </span>
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 glass-dark rounded-2xl border-white/10">
                        <DropdownMenuLabel className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem className="focus:bg-white/10 rounded-lg text-sm font-medium">Profile</DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-white/10 rounded-lg text-sm font-medium">Branch Settings</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-white/10" />
                        <DropdownMenuItem
                            onClick={() => router.push("/login")}
                            className="text-destructive focus:bg-destructive/10 rounded-lg text-sm font-bold"
                        >
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
