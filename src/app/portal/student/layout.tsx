"use client"

import { MainLayout } from "@/components/layout/main-layout"
import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function StudentPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setCurrentUser, currentUser } = useAppStore();

    useEffect(() => {
        // Set student role for this portal section
        if (!currentUser || currentUser.role !== 'student') {
            setCurrentUser({
                id: "ST20260001",
                name: "Aditya Sharma",
                role: "student"
            });
        }
    }, [currentUser, setCurrentUser]);

    return (
        <RoleGuard allowedRoles={['student']}>
            {children}
        </RoleGuard>
    )
}
