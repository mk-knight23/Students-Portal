"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function AgentPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setCurrentUser, currentUser } = useAppStore();

    useEffect(() => {
        // Set agent role for this portal section
        if (!currentUser || currentUser.role !== 'agent') {
            setCurrentUser({
                id: "AG001",
                name: "Rajesh Kumar",
                role: "agent"
            });
        }
    }, [currentUser, setCurrentUser]);

    return (
        <RoleGuard allowedRoles={['agent']}>
            {children}
        </RoleGuard>
    )
}
