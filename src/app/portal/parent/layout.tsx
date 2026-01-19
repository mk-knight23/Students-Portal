"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function ParentPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setCurrentUser, currentUser } = useAppStore();

    useEffect(() => {
        // Set parent role for this portal section
        if (!currentUser || currentUser.role !== 'parent') {
            setCurrentUser({
                id: "PAR20260001",
                name: "Mr. Sharma",
                role: "parent"
            });
        }
    }, [currentUser, setCurrentUser]);

    return (
        <RoleGuard allowedRoles={['parent']}>
            <div className="relative">
                {/* Read-only indicator for parent view */}
                <div className="fixed top-20 right-4 z-50 bg-blue-500/10 border border-blue-500/20 text-blue-500 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
                    Parent View (Read Only)
                </div>
                {children}
            </div>
        </RoleGuard>
    )
}
