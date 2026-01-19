# Test Cases — AME.HUB v0.0.2

## 🧪 Current Suite
This release focuses on **Routing Stabilization** and **Auth Flow Simulation**.

### 1. Auth Flow (`src/__tests__/auth-flow.test.tsx`)
- **Root Redirection**: Verifies `/` leads to `/login` (deprecated in v0.0.2 for Hub Base).
- **Role Redirection**: Verifies Hub Base cards redirect to correct portals.
- **LoginPage Redirection**: Verifies direct dashboard entry for Staff and Admin.

### 2. Role Routing (`src/__tests__/role-routing.test.tsx`)
- **Access Control**: Verifies `RoleGuard` blocks unauthorized attempts.
- **Authorized Render**: Confirms portal layouts render only for the correct role.

## 📊 Summary Metrics
| category | status | coverage |
|----------|--------|----------|
| Routing | ✅ Green | 100% Core Portals |
| Auth Flow | ✅ Green | Mock Simulation |
| UI/Layout | ✅ Green | Responsive Baseline |

## 🛠️ Run Profile
```bash
npx vitest --run
```
Pass Rate: **100% (5 Core Tests)**
Last Validated: 2026-01-19
