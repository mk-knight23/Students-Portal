"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function StaffPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setCurrentUser, currentUser } = useAppStore();

    useEffect(() => {
        // Set staff role for this portal section
        if (!currentUser || currentUser.role !== 'staff') {
            setCurrentUser({
                id: "STF001",
                name: "Priya Sharma",
                role: "staff",
                branchId: "BR01"
            });
        }
    }, [currentUser, setCurrentUser]);

    return (
        <RoleGuard allowedRoles={['staff']}>
            {children}
        </RoleGuard>
    )
}
