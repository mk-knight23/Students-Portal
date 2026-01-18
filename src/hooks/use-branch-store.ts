import { create } from "zustand";

export type UserRole = "Admin" | "Staff";

interface BranchState {
    activeBranch: string;
    userRole: UserRole;
    setActiveBranch: (branch: string) => void;
    setUserRole: (role: UserRole) => void;
}

export const useBranchStore = create<BranchState>((set) => ({
    activeBranch: "Latur",
    userRole: "Admin", // Defaulting to Admin for demo purposes
    setActiveBranch: (branch) => set({ activeBranch: branch }),
    setUserRole: (role) => set({ userRole: role }),
}));
