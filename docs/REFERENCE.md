# Reference Guide — AME.HUB

This document covers portals, roles, features, workflows, and the RBAC model.

---

## 🚪 Portal Guide

The AME.HUB features 4 distinct entrypoints tailored to operational roles.

### 1. Student Portal (`/portal/student`)
- **Dashboard**: Track admission progress (Applied → Documentation → Counseling → Allotted).
- **Documents**: Upload and verify academic records.
- **Counseling**: Preference builder for college selection.
- **Payments**: Complete fee payments via mock gateway.

### 2. Office Staff Portal (`/portal/staff`)
- **Dashboard**: Branch-specific KPI counter (Pending Verifications, Today's Verifications).
- **Verifications**: Review and approve student document uploads.
- **Students**: Manage student records for the assigned branch.
- **Payments**: Monitor collections and financial statuses.

### 3. Branch Head Portal (`/portal/head`)
- **Dashboard**: High-level strategy monitor with conversion analytics.
- **Oversight**: Regional view of all students and staff actions.
- **Intelligence**: Performance reporting and branch growth metrics.

### 4. Super Admin Portal (`/portal/admin`)
- **Dashboard**: Global system health and executive monitors.
- **Management**: Multi-tenant branch controls and system settings.
- **Audit**: Compliance logs and system-wide visibility.

---

## 👥 Roles & Permissions

### Role Overview

| Role | Route | Theme | Access |
|------|-------|-------|--------|
| Student | `/portal/student/` | Purple | Own profile, documents, payments, counseling |
| Staff | `/portal/staff/` | Orange | Students in assigned branch |
| Head | `/portal/head/` | Deep Blue | Regional oversight |
| Admin | `/portal/admin/` | Red | All students, all branches, system settings |

### Permission Matrix

| Action | Admin | Head | Staff | Student |
|--------|:-----:|:----:|:-----:|:-------:|
| View All Students | ✅ | ✅ (region) | ✅ (branch) | ❌ |
| Register Student | ✅ | ✅ | ✅ | ❌ |
| View Student PII | ✅ | ✅ | ❌ | ✅ (self) |
| Verify Documents | ✅ | ✅ | ✅ | ❌ |
| Process Payments | ✅ | ✅ | ❌ | ❌ |
| View Audit Logs | ✅ | ❌ | ❌ | ❌ |
| Manage Users | ✅ | ✅ (region) | ❌ | ❌ |
| Switch Branches | ✅ | ❌ | ❌ | ❌ |

### Role Guard
```tsx
<RoleGuard allowedRoles={['student']}>
  {children}
</RoleGuard>
```

---

## ✨ Feature Index

### Core Platform
| Feature | Status |
|---------|--------|
| Multi-Tenant Architecture | ✅ |
| Branch Management | ✅ |
| Role-Based Access Control | ✅ |
| Session-Based Authentication | ✅ |
| Route Protection (Proxy) | ✅ |

### Student Management
| Feature | Status |
|---------|--------|
| Student Registration Form | ✅ |
| Aadhaar/APAAR Validation (Verhoeff) | ✅ |
| Aadhaar Masking | ✅ |
| Student Directory | ✅ |
| Advanced Data Table (Sort, Filter) | ✅ |
| Bulk Actions | ✅ |
| Document Center (Slideout) | ✅ |

### Counseling & Allotment
| Feature | Status |
|---------|--------|
| College Preference Management | ✅ |
| Drag-and-Drop Prioritization | ✅ |
| Lock Preferences | ✅ |
| Multi-Round Tracking | 🚧 |

### Payments & Financials
| Feature | Status |
|---------|--------|
| Transaction Ledger | ✅ |
| Real-Time Stats Aggregation | ✅ |
| Receipt Generation (Simulated) | ✅ |

### Compliance & Audit
| Feature | Status |
|---------|--------|
| Immutable Audit Ledger | ✅ |
| Compliance Dashboard | ✅ |
| Consent Density Metrics | ✅ |
| Right to Erasure Workflow | 🚧 |

### UI/UX
| Feature | Status |
|---------|--------|
| Glassmorphic UI | ✅ |
| Dark/Light Theme Toggle | ✅ |
| Responsive Layout | ✅ |
| Collapsible Sidebar | ✅ |
| Branch Switcher (Admin) | ✅ |
| Animated Page Transitions | ✅ |

**Legend**: ✅ Fully Implemented | 🚧 In Progress

---

## 🔄 Workflows

### Student Lifecycle
```
inquiry → application → documents → verification → counseling → payment → allotment → enrollment
```

| State | Description | Actions |
|-------|-------------|---------|
| inquiry | Initial registration | Submit basic info |
| application | Application submitted | Awaiting document upload |
| documents | Documents uploaded | Awaiting verification |
| verification | Under review | Staff verifies |
| counseling | Choice filling | Fill preferences |
| payment | Fees due | Pay fees |
| allotment | Seat allotted | Accept/reject |
| enrollment | Enrolled | Complete |

### Counseling Types
| Type | Description |
|------|-------------|
| state-85% | State quota (85% seats) |
| AIQ | All India Quota (15% seats) |
| deemed | Deemed universities |
| mgmt | Management quota |
| NRI | NRI quota |

### Document Slot States
```
empty → uploaded → reviewed → verified/rejected
```

### Payment States
```
unpaid → paid → refunded (optional)
```

### Verification Workflow
```
pending → verified
        → rejected (with reason)
```

---

## 📦 Feature Modules

| Module | Path | Purpose |
|--------|------|---------|
| Students | `src/modules/students/` | Student identity and lifecycle |
| Documents | `src/modules/documents/` | File uploads and verification |
| Counseling | `src/modules/counseling/` | College selection, preferences |
| Payments | `src/modules/payments/` | Fee tracking, receipts |
| Dashboard | `src/modules/dashboard/` | Widget definitions, layouts |
| Compliance | `src/modules/compliance/` | Audit logging, DPDPA consent |
| Reports | `src/modules/reports/` | PDF/Excel generation |
| Branches | `src/modules/branches/` | Multi-tenancy support |
| Analytics | `src/modules/analytics/` | Business intelligence |
