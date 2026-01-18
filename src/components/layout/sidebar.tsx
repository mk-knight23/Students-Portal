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

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: UserPlus, label: "Add Student", href: "/students/add" },
  { icon: Users, label: "Students", href: "/students" },
  { icon: GraduationCap, label: "Counseling", href: "/counseling" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: LayoutDashboard, label: "Intelligence", href: "/reports" },
  { icon: ShieldCheck, label: "Compliance", href: "/compliance" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

import { useBranchStore } from "@/hooks/use-branch-store";

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const { activeBranch, userRole } = useBranchStore();

  return (
    <div
      className={cn(
        "relative flex flex-col h-screen transition-all duration-300 glass border-r shadow-2xl z-20",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 h-16">
        {!isCollapsed && (
          <div className="flex items-center gap-2 animate-float">
            <div className="bg-primary p-1.5 rounded-lg shadow-lg">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight text-gradient">AME Portal</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="ml-auto hover:bg-white/10"
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <Separator className="bg-white/10" />

      <ScrollArea className="flex-1 py-4">
        <nav className="px-3 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                    isActive
                      ? "bg-primary/10 text-primary font-medium shadow-sm"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "h-5 w-5 transition-transform group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )} />
                  {!isCollapsed && <span>{item.label}</span>}
                  {isActive && <div className="absolute left-0 w-1 h-6 bg-primary rounded-full" />}
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-4 mt-auto">
        {!isCollapsed && (
          <div className="glass-card p-3 rounded-2xl text-[10px] space-y-1 uppercase tracking-widest">
            <p className="font-bold text-primary">{activeBranch} Branch</p>
            <p className="text-muted-foreground font-medium">{userRole === "Admin" ? "Latur Office Head" : "Office Staff"}</p>
          </div>
        )}
      </div>
    </div>
  );
}
