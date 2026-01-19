"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Ensure student role for this entire section
    const { setCurrentUser } = useAppStore();

    // RoleGuard handles access control, so we don't need to force a user here.
    // The login page is now the entry point.

    return (
        <RoleGuard allowedRoles={['student', 'staff', 'head', 'admin']}>
            <MainLayout>
                {children}
            </MainLayout>
        </RoleGuard>
    )
}
