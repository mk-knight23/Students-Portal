# AME Portal — FEATURES.md

## Core Features

### 1. Role-Based Access Control
- 6 user roles: Student, Parent, Admin, Staff, Agent, Auditor
- Protected routes with RoleGuard
- Role-specific theming

### 2. Student Workflow Management
- Complete lifecycle tracking (inquiry → enrollment)
- State machine-driven status updates
- Timeline visualization

### 3. Document Management
- 8+ document slot types
- Drag-drop upload with progress
- Verification workflow
- Status badges (pending, verified, rejected)

### 4. Counseling System
- Multiple counseling types (State 85%, AIQ, Deemed, etc.)
- Preference list management (up to 100 choices)
- Round-based tracking

### 5. Payment Processing
- Fee structure display
- Payment history with receipts
- Multiple payment methods (Mock)

### 6. Compliance & Privacy
- DPDPA-compliant consent banner
- Audit logging
- Data retention policies

## UI Components

| Component | Purpose |
|-----------|---------|
| DataTable | Filterable, sortable data display |
| FormBuilder | Dynamic form generation |
| MaskedInput | Aadhaar/PAN/Phone masking |
| ApaarInput | APAAR ID validation |
| DocumentUpload | File upload with progress |
| PaymentReceipt | Printable receipts |
| ReportViewer | Data export (PDF/Excel) |
| Timeline | Progress visualization |
| ConsentBanner | Privacy consent management |

## Responsive Design

- Mobile-first utilities
- Tablet-optimized grids
- Print-friendly layouts
- Touch-friendly targets (44px min)

## Tech Stack

- Next.js 15 (App Router)
- React 19
- Tailwind CSS v4
- Shadcn/UI
- Zustand (State Management)
- TypeScript
