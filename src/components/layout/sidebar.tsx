"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  FileText,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  CreditCard,
  ShieldCheck,
  Briefcase,
  Eye,
  FileCheck,
  BarChart3,
  Building2,
  UserCog,
  Menu
} from "lucide-react";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAppStore, UserRole } from "@/store/useAppStore";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Role-specific menu configurations

// Role-specific menu configurations
const menuConfigs: Record<UserRole, { icon: typeof LayoutDashboard; label: string; href: string }[]> = {
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/portal/admin/dashboard" },
    { icon: Users, label: "Student Master", href: "/portal/admin/students" },
    { icon: Building2, label: "Branches", href: "/portal/admin/management" },
    { icon: FileText, label: "Reports", href: "/portal/admin/reports" },
    { icon: ShieldCheck, label: "Compliance", href: "/portal/admin/compliance" },
    { icon: UserCog, label: "Settings", href: "/portal/admin/settings" },
  ],
  staff: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/portal/staff/dashboard" },
    { icon: Users, label: "Students", href: "/portal/staff/students" },
    { icon: FileCheck, label: "Verifications", href: "/portal/staff/verifications" },
    { icon: CreditCard, label: "Payments", href: "/portal/staff/payments" },
  ],
  student: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/portal/student/dashboard" },
    { icon: FileText, label: "Documents", href: "/portal/student/documents" },
    { icon: GraduationCap, label: "Counseling", href: "/portal/student/counseling" },
    { icon: CreditCard, label: "Payments", href: "/portal/student/payments" },
  ],
  parent: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/portal/parent/dashboard" },
    { icon: FileText, label: "Documents", href: "/portal/parent/documents" },
    { icon: CreditCard, label: "Fee Status", href: "/portal/parent/payments" },
  ],
  agent: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/portal/agent/dashboard" },
    { icon: Users, label: "Referrals", href: "/portal/agent/referrals" },
    { icon: Briefcase, label: "Commissions", href: "/portal/agent/commissions" },
    { icon: BarChart3, label: "Performance", href: "/portal/agent/performance" },
  ],
  auditor: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/portal/auditor/dashboard" },
    { icon: Eye, label: "Audit Logs", href: "/portal/auditor/logs" },
    { icon: ShieldCheck, label: "Compliance", href: "/portal/auditor/compliance" },
    { icon: FileText, label: "Reports", href: "/portal/auditor/reports" },
  ],
};

const roleLabels: Record<UserRole, string> = {
  admin: 'Administrator',
  staff: 'Staff',
  student: 'Student',
  parent: 'Parent',
  agent: 'Partner Agent',
  auditor: 'Auditor',
};

export function SidebarContent({ isCollapsed = false, onMobileClose }: { isCollapsed?: boolean; onMobileClose?: () => void }) {
  const pathname = usePathname();
  const { currentUser } = useAppStore();
  const userRole = currentUser?.role || 'student';
  const menuItems = menuConfigs[userRole] || menuConfigs.student;

  return (
    <div className={cn("flex flex-col h-full", isCollapsed ? "items-center" : "")}>
      <div className={cn("flex items-center justify-between p-6 h-20", isCollapsed && "p-0 justify-center")}>
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="bg-primary h-10 w-10 flex items-center justify-center rounded-2xl shadow-[0_0_20px_rgba(var(--primary-rgb),0.3)] animate-float shrink-0">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col text-left">
              <span className="font-bold text-lg tracking-tight italic leading-none text-foreground">AME.OS</span>
              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-primary/60 mt-0.5">v0.3.2</span>
            </div>
          )}
        </div>
      </div>

      <Separator className="bg-white/5 mx-6" />

      <ScrollArea className="flex-1 py-6 w-full">
        <nav className={cn("px-4 space-y-2", isCollapsed && "px-2")}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link key={item.href} href={item.href} className="block" onClick={onMobileClose}>
                <div
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                    isActive
                      ? "bg-primary text-white shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.4)]"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary",
                    isCollapsed && "justify-center px-2"
                  )}
                >
                  <item.icon className={cn(
                    "h-4 w-4 transition-transform duration-200 group-hover:scale-105 shrink-0",
                    isActive ? "text-white" : "text-muted-foreground"
                  )} />
                  {!isCollapsed && <span className="text-[11px] font-bold uppercase tracking-wider">{item.label}</span>}
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-10 transition-opacity" />
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      <div className="p-6 mt-auto w-full">
        {!isCollapsed && (
          <div className="rounded-2xl bg-black/90 p-4 text-white shadow-lg border border-white/5 relative overflow-hidden group">
            <div className="relative z-10 space-y-0.5 text-left">
              <p className="text-[9px] font-bold uppercase tracking-wider text-primary/80">{roleLabels[userRole]}</p>
              <p className="text-sm font-bold italic truncate">{currentUser?.name || "Guest"}</p>
              <p className="text-[8px] font-medium text-white/40 uppercase tracking-widest">{currentUser?.branchId || 'Global'}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div
      className={cn(
        "hidden lg:flex relative flex-col h-screen transition-all duration-300 glass border-r shadow-2xl z-30 bg-background/80 backdrop-blur-xl",
        isCollapsed ? "w-20" : "w-72"
      )}
    >
      <SidebarContent isCollapsed={isCollapsed} />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-4 top-6 z-50 hover:bg-primary/5 rounded-lg h-9 w-9"
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 border-r border-white/10 w-72 bg-background/95 backdrop-blur-xl">
        <SidebarContent onMobileClose={() => document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'Escape' }))} />
        {/* Hack: Sheet usually closes on item click if we manage state, but sticking to simple composition first. 
                    Actually, passing a close handler is cleaner but requires state. 
                    Let's just let the user click outside or rely on Link navigation possibly closing it if the router changes? 
                    Next.js navigation doesn't auto-close Sheet. 
                    I'll add a proper primitive Close later if needed, but for now standard Sheet behavior. 
                    Actually, let's just render the content.
                */}
      </SheetContent>
    </Sheet>
  )
}

