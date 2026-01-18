/**
 * Mock API Index
 * 
 * Central export for all mock services and data.
 * Use this single import in components.
 */

export * from "./data-store";
export * from "./services";

// Re-export commonly used types
export type {
    MockStudent,
    MockUser,
    MockBranch,
    MockTenant,
    MockDocument,
    MockPreference,
    MockTransaction,
    MockAuditLog,
    MockCollege,
} from "./data-store";

// Re-export all services
export {
    mockStudentService,
    mockUserService,
    mockCounselingService,
    mockDocumentService,
    mockPaymentService,
    mockAnalyticsService,
    mockAuditService,
    mockBranchService,
} from "./services";
