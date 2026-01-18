/**
 * Mock Data Store
 * 
 * Central mock data for all entities. Follows the Prisma schema contracts
 * for easy swap to real API later.
 */

// Types matching Prisma schema
export type StudentStatus =
    | "REGISTERED"
    | "CHOICES_FILLED"
    | "ALLOTTED"
    | "CONFIRMED"
    | "COMPLETED"
    | "CANCELLED";

export interface MockTenant {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    primaryColor: string;
    createdAt: Date;
}

export interface MockBranch {
    id: string;
    tenantId: string;
    name: string;
    code: string;
    city: string;
    state: string;
}

export interface MockUser {
    id: string;
    tenantId: string;
    branchId: string;
    email: string;
    name: string;
    role: "TENANT_OWNER" | "BRANCH_ADMIN" | "STAFF" | "STUDENT" | "PARENT";
    avatar?: string;
}

export interface MockStudent {
    id: string;
    tenantId: string;
    branchId: string;
    name: string;
    aadhaarMasked: string;
    category: string;
    domicileState: string;
    neetScore: number;
    neetRank: string;
    status: StudentStatus;
    phone?: string;
    email?: string;
    createdAt: Date;
    documents: MockDocument[];
}

export interface MockDocument {
    id: string;
    studentId: string;
    type: string;
    fileName: string;
    fileUrl: string;
    status: "PENDING" | "VERIFIED" | "REJECTED";
    uploadedAt: Date;
}

export interface MockPreference {
    id: string;
    studentId: string;
    collegeId: string;
    collegeName: string;
    course: string;
    priority: number;
    round: number;
    isLocked: boolean;
}

export interface MockTransaction {
    id: string;
    studentId: string;
    amount: number;
    type: string;
    status: "PENDING" | "SUCCESS" | "FAILED";
    receiptNo?: string;
    createdAt: Date;
}

export interface MockAuditLog {
    id: string;
    actorId: string;
    actorName: string;
    action: string;
    entity: string;
    details?: string;
    createdAt: Date;
}

export interface MockCollege {
    id: string;
    name: string;
    city: string;
    state: string;
    courses: string[];
    totalSeats: number;
    cutoffRank?: number;
}

// Mock Data Instances
export const mockTenants: MockTenant[] = [
    {
        id: "tenant-ame-001",
        name: "Admissions Made Easy",
        slug: "ame",
        logo: "/logo.svg",
        primaryColor: "#6366f1",
        createdAt: new Date("2024-01-01"),
    },
];

export const mockBranches: MockBranch[] = [
    { id: "branch-latur", tenantId: "tenant-ame-001", name: "Latur", code: "LAT", city: "Latur", state: "Maharashtra" },
    { id: "branch-pune", tenantId: "tenant-ame-001", name: "Pune", code: "PUN", city: "Pune", state: "Maharashtra" },
    { id: "branch-mumbai", tenantId: "tenant-ame-001", name: "Mumbai", code: "MUM", city: "Mumbai", state: "Maharashtra" },
    { id: "branch-nashik", tenantId: "tenant-ame-001", name: "Nashik", code: "NSK", city: "Nashik", state: "Maharashtra" },
];

export const mockUsers: MockUser[] = [
    { id: "user-admin", tenantId: "tenant-ame-001", branchId: "branch-latur", email: "admin@ame.com", name: "M. Kazi", role: "TENANT_OWNER", avatar: "" },
    { id: "user-staff-1", tenantId: "tenant-ame-001", branchId: "branch-latur", email: "staff@ame.com", name: "Rahul Sharma", role: "STAFF" },
    { id: "user-staff-2", tenantId: "tenant-ame-001", branchId: "branch-pune", email: "pune@ame.com", name: "Priya Patil", role: "BRANCH_ADMIN" },
];

export const mockStudents: MockStudent[] = [
    {
        id: "std-001",
        tenantId: "tenant-ame-001",
        branchId: "branch-latur",
        name: "Arjun Patil",
        aadhaarMasked: "XXXX XXXX 4521",
        category: "Open",
        domicileState: "Maharashtra",
        neetScore: 645,
        neetRank: "8234",
        status: "REGISTERED",
        phone: "9876543210",
        email: "arjun@example.com",
        createdAt: new Date("2026-01-10"),
        documents: [],
    },
    {
        id: "std-002",
        tenantId: "tenant-ame-001",
        branchId: "branch-latur",
        name: "Sneha Deshmukh",
        aadhaarMasked: "XXXX XXXX 7832",
        category: "OBC",
        domicileState: "Maharashtra",
        neetScore: 598,
        neetRank: "12450",
        status: "CHOICES_FILLED",
        createdAt: new Date("2026-01-12"),
        documents: [],
    },
    {
        id: "std-003",
        tenantId: "tenant-ame-001",
        branchId: "branch-latur",
        name: "Vikram Jadhav",
        aadhaarMasked: "XXXX XXXX 9012",
        category: "SC",
        domicileState: "Maharashtra",
        neetScore: 512,
        neetRank: "24680",
        status: "ALLOTTED",
        createdAt: new Date("2026-01-08"),
        documents: [],
    },
    {
        id: "std-004",
        tenantId: "tenant-ame-001",
        branchId: "branch-pune",
        name: "Priya Kulkarni",
        aadhaarMasked: "XXXX XXXX 3456",
        category: "Open",
        domicileState: "Maharashtra",
        neetScore: 678,
        neetRank: "5120",
        status: "CONFIRMED",
        createdAt: new Date("2026-01-05"),
        documents: [],
    },
    {
        id: "std-005",
        tenantId: "tenant-ame-001",
        branchId: "branch-mumbai",
        name: "Rahul Mehta",
        aadhaarMasked: "XXXX XXXX 6789",
        category: "EWS",
        domicileState: "Maharashtra",
        neetScore: 534,
        neetRank: "21000",
        status: "REGISTERED",
        createdAt: new Date("2026-01-15"),
        documents: [],
    },
];

export const mockColleges: MockCollege[] = [
    { id: "col-001", name: "Grant Medical College", city: "Mumbai", state: "Maharashtra", courses: ["MBBS"], totalSeats: 200, cutoffRank: 1500 },
    { id: "col-002", name: "B.J. Medical College", city: "Pune", state: "Maharashtra", courses: ["MBBS", "BDS"], totalSeats: 250, cutoffRank: 2000 },
    { id: "col-003", name: "Government Medical College", city: "Nagpur", state: "Maharashtra", courses: ["MBBS"], totalSeats: 180, cutoffRank: 3500 },
    { id: "col-004", name: "SRTR Medical College", city: "Ambajogai", state: "Maharashtra", courses: ["MBBS"], totalSeats: 150, cutoffRank: 8000 },
    { id: "col-005", name: "Dr. V.M. Medical College", city: "Solapur", state: "Maharashtra", courses: ["MBBS"], totalSeats: 150, cutoffRank: 10000 },
    { id: "col-006", name: "GMC Latur", city: "Latur", state: "Maharashtra", courses: ["MBBS"], totalSeats: 100, cutoffRank: 12000 },
    { id: "col-007", name: "GMC Aurangabad", city: "Aurangabad", state: "Maharashtra", courses: ["MBBS", "BDS"], totalSeats: 200, cutoffRank: 5000 },
    { id: "col-008", name: "LTMMC Mumbai", city: "Mumbai", state: "Maharashtra", courses: ["MBBS"], totalSeats: 180, cutoffRank: 2500 },
];

export const mockTransactions: MockTransaction[] = [
    { id: "txn-001", studentId: "std-001", amount: 50000, type: "Registration Fee", status: "SUCCESS", receiptNo: "RCP-2026-001", createdAt: new Date("2026-01-10") },
    { id: "txn-002", studentId: "std-002", amount: 50000, type: "Registration Fee", status: "SUCCESS", receiptNo: "RCP-2026-002", createdAt: new Date("2026-01-12") },
    { id: "txn-003", studentId: "std-003", amount: 150000, type: "Admission Fee", status: "PENDING", createdAt: new Date("2026-01-16") },
    { id: "txn-004", studentId: "std-004", amount: 200000, type: "Tuition Fee", status: "SUCCESS", receiptNo: "RCP-2026-004", createdAt: new Date("2026-01-14") },
];

export const mockAuditLogs: MockAuditLog[] = [
    { id: "log-001", actorId: "user-admin", actorName: "M. Kazi", action: "REGISTER_STUDENT", entity: "Student: Arjun Patil", createdAt: new Date("2026-01-10T09:30:00") },
    { id: "log-002", actorId: "user-staff-1", actorName: "Rahul Sharma", action: "UPLOAD_DOCUMENT", entity: "Document: 10th Marksheet", createdAt: new Date("2026-01-11T14:15:00") },
    { id: "log-003", actorId: "user-admin", actorName: "M. Kazi", action: "VERIFY_DOCUMENT", entity: "Document: Aadhaar Card", createdAt: new Date("2026-01-12T10:00:00") },
    { id: "log-004", actorId: "user-staff-1", actorName: "Rahul Sharma", action: "SAVE_PREFERENCES", entity: "Student: Sneha Deshmukh", createdAt: new Date("2026-01-13T16:30:00") },
    { id: "log-005", actorId: "user-admin", actorName: "M. Kazi", action: "PROCESS_PAYMENT", entity: "Transaction: ₹50,000", createdAt: new Date("2026-01-14T11:45:00") },
];

// Analytics mock data
export const mockAnalytics = {
    totalStudents: 524,
    registeredToday: 12,
    choicesFilled: 312,
    allotted: 156,
    confirmed: 89,
    pendingDocuments: 45,
    totalRevenue: 12500000,
    categoryDistribution: [
        { category: "Open", count: 210 },
        { category: "OBC", count: 145 },
        { category: "SC", count: 78 },
        { category: "ST", count: 42 },
        { category: "EWS", count: 49 },
    ],
    conversionFunnel: [
        { stage: "Registered", count: 524 },
        { stage: "Choices Filled", count: 312 },
        { stage: "Allotted", count: 156 },
        { stage: "Confirmed", count: 89 },
    ],
    revenueByMonth: [
        { month: "Jan", revenue: 2500000 },
        { month: "Feb", revenue: 3200000 },
        { month: "Mar", revenue: 4100000 },
        { month: "Apr", revenue: 2700000 },
    ],
};
