# Role-Based Access Control (RBAC) Model

## Roles Overview

| Role | Scope | Description |
|------|-------|-------------|
| `TENANT_OWNER` | Tenant-wide | Full administrative access to all branches within a tenant. |
| `BRANCH_ADMIN` | Branch-only | Manages a single branch, including its staff and students. |
| `STAFF` | Branch-only | Day-to-day operations: student registration, document verification. |
| `STUDENT` | Self | Access to own profile and documents via the self-service portal. |
| `PARENT` | Child | View-only access to their child's application status. |
| `SUPPORT` | Tenant-wide | Read-only access for customer support and troubleshooting. |

## Permission Matrix

| Action | TENANT_OWNER | BRANCH_ADMIN | STAFF | STUDENT | PARENT |
|--------|:------------:|:------------:|:-----:|:-------:|:------:|
| View All Students | ✅ | ✅ (own branch) | ✅ (own branch) | ❌ | ❌ |
| Register Student | ✅ | ✅ | ✅ | ❌ | ❌ |
| View Student PII | ✅ | ✅ | ❌ | ✅ (self) | ✅ (child) |
| Verify Documents | ✅ | ✅ | ✅ | ❌ | ❌ |
| Process Payments | ✅ | ✅ | ❌ | ❌ | ❌ |
| View Audit Logs | ✅ | ❌ | ❌ | ❌ | ❌ |
| Manage Users | ✅ | ✅ (own branch) | ❌ | ❌ | ❌ |
| Switch Branches | ✅ | ❌ | ❌ | ❌ | ❌ |

## Implementation Notes
- The `role` is stored in the `User` model and propagated to the JWT session.
- Server Actions check `session.user.role` before executing sensitive operations.
- UI elements are conditionally rendered based on the role for a clean user experience.

## Future Enhancements
- Fine-grained permissions (e.g., `CAN_VIEW_NEET_SCORE`).
- Dynamic permission assignment via a settings UI.
- Audit logging for permission changes.
