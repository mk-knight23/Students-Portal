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

    useEffect(() => {
        // Mock set student role if not set (for demo visibility)
        const currentUser = useAppStore.getState().currentUser;
        if (!currentUser || currentUser.role !== 'student') {
            setCurrentUser({
                id: "ST2026001",
                name: "Aditya Kulkarni",
                role: "student"
            });
        }
    }, []);

    return (
        <RoleGuard allowedRoles={['student']}>
            <MainLayout>
                {children}
            </MainLayout>
        </RoleGuard>
    )
}
