/**
 * Mock Services
 * 
 * Service layer that simulates API calls with mock data.
 * Includes realistic delays and error scenarios.
 */

import {
    mockStudents,
    mockUsers,
    mockBranches,
    mockColleges,
    mockTransactions,
    mockAuditLogs,
    mockAnalytics,
    MockStudent,
    // MockUser,
    MockTransaction,
    MockDocument,
    MockPreference,
} from "./data-store";

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const randomDelay = () => delay(100 + Math.random() * 300);

// Error simulation (10% chance)
const shouldFail = () => Math.random() < 0.1;

/**
 * Student Service
 */
export const mockStudentService = {
    async getAll(filters?: { status?: string; category?: string; branchId?: string }) {
        await randomDelay();
        let result = [...mockStudents];

        if (filters?.status) {
            result = result.filter(s => s.status === filters.status);
        }
        if (filters?.category) {
            result = result.filter(s => s.category === filters.category);
        }
        if (filters?.branchId) {
            result = result.filter(s => s.branchId === filters.branchId);
        }

        return { success: true, data: result, total: result.length };
    },

    async getById(id: string) {
        await randomDelay();
        const student = mockStudents.find(s => s.id === id);
        if (!student) {
            return { success: false, error: "Student not found" };
        }
        return { success: true, data: student };
    },

    async create(data: Partial<MockStudent>) {
        await randomDelay();
        if (shouldFail()) {
            return { success: false, error: "Server error. Please try again." };
        }

        const newStudent: MockStudent = {
            id: `std-${Date.now()}`,
            tenantId: "tenant-ame-001",
            branchId: data.branchId || "branch-latur",
            name: data.name || "New Student",
            aadhaarMasked: data.aadhaarMasked || "XXXX XXXX 0000",
            category: data.category || "Open",
            domicileState: data.domicileState || "Maharashtra",
            neetScore: data.neetScore || 0,
            neetRank: data.neetRank || "0",
            status: "REGISTERED",
            createdAt: new Date(),
            documents: [],
        };

        mockStudents.push(newStudent);
        return { success: true, data: newStudent };
    },

    async updateStatus(id: string, status: string) {
        await randomDelay();
        const student = mockStudents.find(s => s.id === id);
        if (!student) {
            return { success: false, error: "Student not found" };
        }
        student.status = status as any;
        return { success: true, data: student };
    },
};

/**
 * User/Auth Service
 */
export const mockUserService = {
    async login(email: string, password: string) {
        await delay(500); // Longer delay for auth

        const user = mockUsers.find(u => u.email === email);
        if (!user) {
            return { success: false, error: "Invalid credentials" };
        }

        // Mock password check (accept any password for demo)
        if (password.length < 4) {
            return { success: false, error: "Invalid credentials" };
        }

        return {
            success: true,
            data: {
                user,
                token: `mock-jwt-${Date.now()}`,
            }
        };
    },

    async getCurrentUser() {
        await randomDelay();
        return { success: true, data: mockUsers[0] };
    },

    async logout() {
        await delay(200);
        return { success: true };
    },
};

/**
 * Counseling Service
 */
export const mockCounselingService = {
    async getColleges() {
        await randomDelay();
        return { success: true, data: mockColleges };
    },

    async getPreferences(studentId: string) {
        await randomDelay();
        // Return empty preferences for now
        return { success: true, data: [] as MockPreference[] };
    },

    async savePreferences(_studentId: string, _preferences: Partial<MockPreference>[]) {
        await randomDelay();
        if (shouldFail()) {
            return { success: false, error: "Failed to save preferences" };
        }
        return { success: true, message: "Preferences saved successfully" };
    },

    async lockPreferences(_studentId: string, _round: number) {
        await randomDelay();
        return { success: true, message: "Preferences locked" };
    },
};

/**
 * Document Service
 */
export const mockDocumentService = {
    async getByStudent(studentId: string) {
        await randomDelay();
        const student = mockStudents.find(s => s.id === studentId);
        return { success: true, data: student?.documents || [] };
    },

    async upload(studentId: string, file: { name: string; type: string }) {
        await delay(1000); // Simulate upload time

        if (shouldFail()) {
            return { success: false, error: "Upload failed. Please try again." };
        }

        const doc: MockDocument = {
            id: `doc-${Date.now()}`,
            studentId,
            type: file.type,
            fileName: file.name,
            fileUrl: `/uploads/${file.name}`,
            status: "PENDING",
            uploadedAt: new Date(),
        };

        const student = mockStudents.find(s => s.id === studentId);
        if (student) {
            student.documents.push(doc);
        }

        return { success: true, data: doc };
    },

    async verify(_documentId: string) {
        await randomDelay();
        return { success: true, message: "Document verified" };
    },

    async reject(_documentId: string, _reason: string) {
        await randomDelay();
        return { success: true, message: "Document rejected" };
    },
};

/**
 * Payment Service
 */
export const mockPaymentService = {
    async getAll(filters?: { studentId?: string }) {
        await randomDelay();
        let result = [...mockTransactions];

        if (filters?.studentId) {
            result = result.filter(t => t.studentId === filters.studentId);
        }

        return { success: true, data: result };
    },

    async create(data: Partial<MockTransaction>) {
        await delay(800);

        if (shouldFail()) {
            return { success: false, error: "Payment processing failed" };
        }

        const txn: MockTransaction = {
            id: `txn-${Date.now()}`,
            studentId: data.studentId || "",
            amount: data.amount || 0,
            type: data.type || "Fee",
            status: "SUCCESS",
            receiptNo: `RCP-${Date.now()}`,
            createdAt: new Date(),
        };

        mockTransactions.push(txn);
        return { success: true, data: txn };
    },

    async getReceipt(transactionId: string) {
        await randomDelay();
        const txn = mockTransactions.find(t => t.id === transactionId);
        if (!txn || !txn.receiptNo) {
            return { success: false, error: "Receipt not found" };
        }
        return { success: true, data: { ...txn, downloadUrl: `/receipts/${txn.receiptNo}.pdf` } };
    },

    async getStats(tenantId: string) {
        await randomDelay();
        const txns = mockTransactions; // In a real mock, filter by tenantId if needed
        return {
            success: true,
            data: {
                total: txns.reduce((sum, t) => sum + t.amount, 0),
                count: txns.length,
                success: txns.filter(t => t.status === "SUCCESS").length,
                pending: txns.filter(t => t.status === "PENDING").length,
                failed: txns.filter(t => t.status === "FAILED").length,
            }
        };
    },
};

/**
 * Analytics Service
 */
export const mockAnalyticsService = {
    async getDashboardStats() {
        await randomDelay();
        return { success: true, data: mockAnalytics };
    },

    async getCategoryDistribution() {
        await randomDelay();
        return { success: true, data: mockAnalytics.categoryDistribution };
    },

    async getConversionFunnel() {
        await randomDelay();
        return { success: true, data: mockAnalytics.conversionFunnel };
    },

    async getRevenueByMonth() {
        await randomDelay();
        return { success: true, data: mockAnalytics.revenueByMonth };
    },
};

/**
 * Audit Service
 */
export const mockAuditService = {
    async getLogs(filters?: { action?: string; limit?: number }) {
        await randomDelay();
        let result = [...mockAuditLogs];

        if (filters?.action) {
            result = result.filter(l => l.action === filters.action);
        }

        if (filters?.limit) {
            result = result.slice(0, filters.limit);
        }

        return { success: true, data: result };
    },

    async log(entry: { action: string; entity: string; details?: string }) {
        const log = {
            id: `log-${Date.now()}`,
            actorId: "user-admin",
            actorName: "M. Kazi",
            ...entry,
            createdAt: new Date(),
        };
        mockAuditLogs.unshift(log);
        return { success: true };
    },
};

/**
 * Branch Service
 */
export const mockBranchService = {
    async getAll() {
        await randomDelay();
        return { success: true, data: mockBranches };
    },

    async getById(id: string) {
        await randomDelay();
        const branch = mockBranches.find(b => b.id === id);
        return { success: !!branch, data: branch };
    },
};
