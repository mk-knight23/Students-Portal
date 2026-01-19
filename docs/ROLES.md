# AME Portal — ROLES.md

## Overview

The AME Portal supports 6 distinct user roles, each with specific permissions and UI experiences.

## Roles

### 1. Student
- **Route**: `/portal/student/`
- **Theme**: SaaS style (purple primary)
- **Access**: Own profile, documents, payments, counseling
- **Actions**: Upload documents, pay fees, fill preferences

### 2. Parent
- **Route**: `/portal/parent/`
- **Theme**: SaaS style (teal primary)
- **Access**: Read-only view of linked student
- **Actions**: View progress, documents, payments (no edits)

### 3. Admin
- **Route**: `/portal/admin/`
- **Theme**: Console style (red primary)
- **Access**: All students, all branches, system settings
- **Actions**: Full CRUD, user management, reports

### 4. Staff
- **Route**: `/portal/staff/`
- **Theme**: Console style (orange primary)
- **Access**: Students in assigned branch
- **Actions**: Document verification, payment processing

### 5. Agent
- **Route**: `/portal/agent/`
- **Theme**: Console style (green primary)
- **Access**: Referred students only
- **Actions**: Track referrals, view commissions

### 6. Auditor
- **Route**: `/portal/auditor/`
- **Theme**: Console style (purple primary)
- **Access**: All data (read-only)
- **Actions**: View logs, compliance reports

## Role Guard

All portal routes are protected by `RoleGuard` component:

```tsx
<RoleGuard allowedRoles={['student']}>
  {children}
</RoleGuard>
```

## Theme Classes

Apply role-specific theming:
- `.portal-student` — Purple theme
- `.portal-parent` — Teal theme
- `.portal-admin` — Red theme
- `.portal-staff` — Orange theme
- `.portal-agent` — Green theme
- `.portal-auditor` — Dark purple theme
