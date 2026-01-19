"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function AuditorPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setCurrentUser, currentUser } = useAppStore();

    useEffect(() => {
        // Set auditor role for this portal section
        if (!currentUser || currentUser.role !== 'auditor') {
            setCurrentUser({
                id: "AUD001",
                name: "Compliance Auditor",
                role: "auditor" as 'admin' // Cast to admin for now since auditor isn't in UserRole
            });
        }
    }, [currentUser, setCurrentUser]);

    return (
        <RoleGuard allowedRoles={['auditor' as 'admin']}>
            <div className="relative">
                {/* Read-only audit mode indicator */}
                <div className="fixed top-20 right-4 z-50 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                    Audit Mode (Read Only)
                </div>
                {children}
            </div>
        </RoleGuard>
    )
}
