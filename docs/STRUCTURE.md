# Project Structure

This project follows a normalized feature-based structure optimized for Next.js App Router with a Mock Service layer.

## Root Directory

| Directory | Description |
|-----------|-------------|
| `src/` | Source code |
| `public/` | Static assets (logs, images, fonts) |
| `docs/` | Project documentation |

## Source Directory (`src/`)

### `app/`
Contains the Next.js App Router file-system based routing.
- `portal/`: Role-specific portal routes (student, parent, admin, staff, agent, auditor)
- `admin/`: Legacy admin routes
- `layout.tsx`: Root layout

### `modules/`
Feature modules with types and mock data.
- `students/`: Student profiles, workflow states
- `documents/`: Document slots, verification
- `counseling/`: Sessions, colleges, preferences
- `payments/`: Fee structure, transactions
- `agents/`: Referrals, commissions
- `analytics/`: Metrics, KPIs
- `compliance/`: Audit logs, DPDPA
- `consent/`: Consent management
- `reports/`: Report templates
- `branches/`: Multi-branch management
- `settings/`: App configuration
- `dashboard/`: Widget types, layouts

### `components/`
Reusable UI components.
- `ui/`: Shadcn/UI primitives and custom components
- `auth/`: RoleGuard, login components
- `layout/`: Sidebar, Navbar, etc.
- `branding/`: Logo and Theme components

### `store/`
Zustand state management.
- `useAppStore.ts`: Unified application store

### `hooks/`
Custom React hooks for state, UI logic, and performance.

### `types/`
Global TypeScript definitions.

### `utils/`
Helper functions and static logic.
- `index.ts`: `cn()` utility
- `validation.ts`: Zod schemas and Verhoeff validation

