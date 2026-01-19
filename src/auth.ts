import { NextAuthResult } from "next-auth";

// MOCK SESSION - Change role here to test different views
const MOCK_SESSION = {
    user: {
        id: "mock-user-001",
        name: "Mock Super Admin",
        email: "admin@mock.com",
        image: null,
        role: "TENANT_OWNER" as const, // Change to "STAFF", "STUDENT", "BRANCH_ADMIN" as needed
        tenantId: "tenant-mock-001",
        branchId: "branch-mock-001",
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

export const auth = async () => {
    return MOCK_SESSION;
};

export const signIn = async () => {
    // console.log("Mock SignIn called");
    return true;
};

export const signOut = async () => {
    // console.log("Mock SignOut called");
    return true;
};

export const handlers = {
    GET: async () => {
        return new Response(JSON.stringify(MOCK_SESSION), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    },
    POST: async () => {
        return new Response(JSON.stringify(MOCK_SESSION), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    },
};
