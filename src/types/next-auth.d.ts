import { DefaultSession } from "next-auth"

// Define Role locally to avoid Prisma dependency
export type Role = "TENANT_OWNER" | "BRANCH_ADMIN" | "STAFF" | "STUDENT" | "SUPER_ADMIN";

declare module "next-auth" {
    interface User {
        role: Role
        tenantId: string
        branchId: string | null
    }

    interface Session {
        user: {
            role: Role
            tenantId: string
            branchId: string | null
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role: Role
        tenantId: string
        branchId: string | null
    }
}
