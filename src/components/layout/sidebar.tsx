"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserPlus,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  CreditCard,
  ShieldCheck
} from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const adminMenuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin/dashboard" },
  { icon: ShieldCheck, label: "Management Hub", href: "/admin/management" },
  { icon: Users, label: "Student Master", href: "/admin/students" },
  { icon: FileText, label: "Reports & Logs", href: "/admin/reports" },
  { icon: ShieldCheck, label: "Compliance Hub", href: "/admin/compliance" },
];

const studentMenuItems = [
  { icon: LayoutDashboard, label: "My Success Hub", href: "/portal/dashboard" },
];

import { useAppStore } from "@/store/useAppStore";


export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { currentUser } = useAppStore();
  const userRole = currentUser?.role === 'admin' ? 'Admin' : 'Student';

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen transition-all duration-300 glass border-r shadow-2xl z-20 bg-background/80 backdrop-blur-xl",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      <div className="flex items-center justify-between p-6 h-20">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="bg-primary h-10 w-10 flex items-center justify-center rounded-2xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] animate-float">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-lg tracking-tight italic leading-none text-foreground">AME.OS</span>
              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-primary/60 mt-0.5">Regional Node v0.3.0</span>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto hover:bg-primary/5 rounded-lg h-9 w-9"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <Separator className="bg-white/5 mx-6" />

      <ScrollArea className="flex-1 py-6">
        <nav className="px-4 space-y-2">
          {(userRole === "Admin" ? adminMenuItems : studentMenuItems).map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className="block">
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                    isActive
                      ? "bg-primary text-white shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.4)]"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-transform duration-200 group-hover:scale-105",
                    isActive ? "text-white" : "text-muted-foreground"
                  )} />
                  {!isCollapsed && <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>}

                  {/* Premium Hover Glow */}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-6 mt-auto">
        {!isCollapsed && (
          <div className="rounded-2xl bg-black/90 p-4 text-white shadow-lg border border-white/5 relative overflow-hidden group">
            <div className="relative z-10 space-y-0.5 text-left">
              <p className="text-[9px] font-bold uppercase tracking-wider text-primary/80">Active Operator</p>
              <p className="text-sm font-bold italic truncate">{currentUser?.name || "Latur Office"}</p>
              <p className="text-[8px] font-medium text-white/40 uppercase tracking-widest">{userRole} Credentials</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
