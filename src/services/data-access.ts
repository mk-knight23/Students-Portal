import { auth } from "@/auth";
import {
    mockStudentService,
    mockAnalyticsService,
    mockAuditService,
    mockPaymentService
} from "@/mocks";

/**
 * Data Access Layer - Mock Mode
 * Replaces direct Prisma calls with Mock Services.
 */

export async function getStudents() {
    const session = await auth();
    if (!session) return [];

    // Simulate network delay and fetch mock data
    const result = await mockStudentService.getAll({
        branchId: session.user.branchId || undefined,
    });

    return result.success ? result.data : [];
}

export async function getAnalytics() {
    const session = await auth();
    if (!session) return null;

    const stats = await mockAnalyticsService.getDashboardStats();

    if (!stats.success || !stats.data) return null;

    return {
        totalStudents: stats.data.totalStudents,
        totalRevenue: stats.data.totalRevenue,
        pendingDocs: stats.data.pendingDocuments,
        // Mock extra data for reports
        funnel: stats.data.conversionFunnel,
        categoryMix: stats.data.categoryDistribution,
        dailyRevenue: stats.data.revenueByMonth // Mapping month to daily for demo
    };
}

export async function getAuditLogs() {
    const session = await auth();
    if (!session) return []; // Allow all roles to see for demo

    const result = await mockAuditService.getLogs({ limit: 100 });
    return result.success ? result.data : [];
}

export async function getTransactions() {
    const session = await auth();
    if (!session) return [];

    const result = await mockPaymentService.getAll((session.user as any).tenantId);
    return result.success ? result.data : [];
}

export async function getTransactionStats() {
    const session = await auth();
    if (!session) return { total: 0, count: 0, success: 0, pending: 0, failed: 0 };

    const result = await mockPaymentService.getStats((session.user as any).tenantId);
    return result.success ? result.data : { total: 0, count: 0, success: 0, pending: 0, failed: 0 };
}
