# Mock Data & Services Documentation

## Overview
The mock system provides a complete simulation of the backend for frontend development. It includes realistic data, async delays, and error scenarios.

## Mock Data Store

### Location
```
src/lib/mock/data-store.ts
```

### Available Entity Types

| Entity | Type | Count | Description |
|--------|------|-------|-------------|
| Tenants | `MockTenant` | 1 | Multi-tenant organizations |
| Branches | `MockBranch` | 4 | Office locations |
| Users | `MockUser` | 3 | Staff accounts |
| Students | `MockStudent` | 5 | Student records |
| Colleges | `MockCollege` | 8 | College options |
| Transactions | `MockTransaction` | 4 | Payment records |
| Audit Logs | `MockAuditLog` | 5 | Activity logs |

### Sample Data Structure

```typescript
interface MockStudent {
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
```

---

## Mock Services

### Location
```
src/lib/mock/services.ts
```

### Available Services

#### Student Service
```typescript
import { mockStudentService } from "@/lib/mock";

// Get all students (with optional filters)
const result = await mockStudentService.getAll({ 
    status: "REGISTERED",
    category: "Open",
    branchId: "branch-latur"
});

// Get single student
const student = await mockStudentService.getById("std-001");

// Create new student
const newStudent = await mockStudentService.create({
    name: "John Doe",
    category: "Open",
    neetScore: 550
});

// Update status
await mockStudentService.updateStatus("std-001", "CHOICES_FILLED");
```

#### User/Auth Service
```typescript
import { mockUserService } from "@/lib/mock";

// Login
const result = await mockUserService.login("admin@ame.com", "password");
// Returns: { success: true, data: { user, token } }

// Get current user
const user = await mockUserService.getCurrentUser();

// Logout
await mockUserService.logout();
```

#### Counseling Service
```typescript
import { mockCounselingService } from "@/lib/mock";

// Get colleges
const colleges = await mockCounselingService.getColleges();

// Get student preferences
const prefs = await mockCounselingService.getPreferences("std-001");

// Save preferences
await mockCounselingService.savePreferences("std-001", preferences);

// Lock preferences
await mockCounselingService.lockPreferences("std-001", 1);
```

#### Document Service
```typescript
import { mockDocumentService } from "@/lib/mock";

// Get student documents
const docs = await mockDocumentService.getByStudent("std-001");

// Upload document (simulates 1s upload time)
const doc = await mockDocumentService.upload("std-001", {
    name: "marksheet.pdf",
    type: "10th Marksheet"
});

// Verify/Reject
await mockDocumentService.verify("doc-001");
await mockDocumentService.reject("doc-001", "Blurry image");
```

#### Payment Service
```typescript
import { mockPaymentService } from "@/lib/mock";

// Get all transactions
const txns = await mockPaymentService.getAll();

// Filter by student
const studentTxns = await mockPaymentService.getAll({ studentId: "std-001" });

// Process payment
const txn = await mockPaymentService.create({
    studentId: "std-001",
    amount: 50000,
    type: "Registration Fee"
});

// Get receipt
const receipt = await mockPaymentService.getReceipt("txn-001");
```

#### Analytics Service
```typescript
import { mockAnalyticsService } from "@/lib/mock";

// Dashboard stats
const stats = await mockAnalyticsService.getDashboardStats();
// Returns: totalStudents, registeredToday, choicesFilled, etc.

// Category distribution (for charts)
const categories = await mockAnalyticsService.getCategoryDistribution();

// Conversion funnel
const funnel = await mockAnalyticsService.getConversionFunnel();
```

#### Audit Service
```typescript
import { mockAuditService } from "@/lib/mock";

// Get logs
const logs = await mockAuditService.getLogs({ limit: 10 });

// Log action
await mockAuditService.log({
    action: "VIEW_STUDENT",
    entity: "Student: John Doe"
});
```

---

## Async Behavior

### Delays
- **Normal operations**: 100-400ms random delay
- **Auth operations**: 500ms fixed
- **File uploads**: 1000ms fixed

### Error Simulation
- **10% failure rate** on create/update operations
- Returns `{ success: false, error: "message" }`

```typescript
const result = await mockStudentService.create(data);
if (!result.success) {
    toast.error(result.error);
    return;
}
```

---

## Switching to Real API

Mock services follow the same contract as real APIs:

```typescript
// Current (mock)
const result = await mockStudentService.getAll();

// Future (real API)
const result = await fetch("/api/students").then(r => r.json());

// Both return:
{
    success: boolean;
    data?: T[];
    error?: string;
}
```

To switch:
1. Create real API routes matching mock contracts
2. Replace mock imports with fetch calls
3. No component changes needed!

---

## Adding New Mock Data

### 1. Define Type
```typescript
// In data-store.ts
export interface MockNewEntity {
    id: string;
    name: string;
    // ...
}
```

### 2. Add Mock Data
```typescript
export const mockNewEntities: MockNewEntity[] = [
    { id: "new-001", name: "Example" },
];
```

### 3. Create Service
```typescript
// In services.ts
export const mockNewService = {
    async getAll() {
        await randomDelay();
        return { success: true, data: mockNewEntities };
    },
    // ...
};
```

### 4. Export
```typescript
// In index.ts
export { mockNewService } from "./services";
```
