"use client"

import { useAppStore } from "@/store/useAppStore"
import { useEffect } from "react"
import { RoleGuard } from "@/components/auth/role-guard"

export default function HeadPortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { setCurrentUser, currentUser } = useAppStore();

    useEffect(() => {
        // Set head role for this portal section
        if (!currentUser || currentUser.role !== 'head') {
            setCurrentUser({
                id: "HED001",
                name: "Vikram Patil",
                role: "head",
                branchId: "BR01"
            });
        }
    }, [currentUser, setCurrentUser]);

    return (
        <RoleGuard allowedRoles={['head']}>
            {children}
        </RoleGuard>
    )
}
