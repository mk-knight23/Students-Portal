"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function AdminPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setCurrentUser, currentUser } = useAppStore();

    useEffect(() => {
        // Set admin role for this portal section
        if (!currentUser || currentUser.role !== 'admin') {
            setCurrentUser({
                id: "ADM001",
                name: "Super Admin",
                role: "admin"
            });
        }
    }, [currentUser, setCurrentUser]);

    return (
        <RoleGuard allowedRoles={['admin']}>
            {children}
        </RoleGuard>
    )
}
