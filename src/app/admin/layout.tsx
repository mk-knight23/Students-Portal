"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Ensure admin role for this entire section
    const { setCurrentUser } = useAppStore();

    useEffect(() => {
        // Mock set admin role if not set (for demo visibility)
        setCurrentUser({
            id: "ADM001",
            name: "Super Admin",
            role: "admin"
        });
    }, []);

    return (
        <RoleGuard allowedRoles={['admin']}>
            <MainLayout>
                {children}
            </MainLayout>
        </RoleGuard>
    )
}
