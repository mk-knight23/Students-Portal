"use client"

import { useAppStore } from "@/store/useAppStore"
import { ReactNode, useEffect, useState } from "react"
import { ShieldAlert, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface RoleGuardProps {
    children: ReactNode;
    allowedRoles: ('admin' | 'staff' | 'student' | 'parent' | 'agent' | 'auditor')[];
    fallbackUrl?: string;
}

export function RoleGuard({ children, allowedRoles, fallbackUrl = "/" }: RoleGuardProps) {
    const { currentUser } = useAppStore();
    const [authorized, setAuthorized] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Simulate complex RBAC check
        if (!currentUser) {
            router.push("/login");
            // setAuthorized(false); // Don't show UI, just redirect
        } else {
            setAuthorized(allowedRoles.includes(currentUser.role));
        }
    }, [currentUser, allowedRoles, router]);

    if (authorized === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    if (!authorized) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
                <div className="max-w-md w-full glass-dark p-10 rounded-[40px] border border-red-500/20 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="h-20 w-20 rounded-3xl bg-red-500/10 flex items-center justify-center mx-auto text-red-500 shadow-xl shadow-red-500/20">
                        <ShieldAlert className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-2xl font-black uppercase tracking-tight">Access Restricted</h1>
                        <p className="text-muted-foreground font-medium text-sm">
                            Category 5.3 Access Enforcement detected an unauthorized role attempt. Your session and IP have been logged.
                        </p>
                    </div>
                    <div className="pt-4">
                        <Button
                            className="w-full rounded-2xl bg-white text-black font-black hover:bg-white/90"
                            onClick={() => router.push(fallbackUrl)}
                        >
                            Return to Discovery
                        </Button>
                    </div>
                    <div className="text-[10px] font-bold text-red-500/50 uppercase tracking-widest pt-4 border-t border-white/5">
                        AME Security Protocol Alpha-9 Active
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
