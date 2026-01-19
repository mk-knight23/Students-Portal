# Admissions Made Easy Portal (Mock Mode)

<p align="center">
  <img src="../public/logo.png" width="120" alt="AME Logo" />
</p>

<p align="center">
  <strong>A Multi-Tenant Enterprise Platform - Frontend Prototype</strong>
</p>

---

## 🚀 Overview

Admissions Made Easy (AME.HUB) is a production-grade frontend prototype for an educational consultancy platform. This version runs in **Pure Mock Mode**, utilizing client-side mock services to simulate a full backend environment without needing a database connection.

### Core Pillars
- **Multi-Tenant Architecture**: Each consultancy firm (Tenant) has isolated data with branch management.
- **DPDPA 2023 Compliance**: Aadhaar/APAAR ID masking, immutable audit logs, and explicit consent management.
- **Counseling Engine**: Automated preference management for university and course selection.
- **Financial Ledger**: Real-time transaction tracking with digitally signed receipts.

## ✨ Key Features

- **Pure Frontend Architecture**: Zero external dependencies (No DB, No Backend).
- **Consolidated Operational Portals**: 4 core roles (`/portal/student`, `/portal/staff`, `/portal/head`, `/portal/admin`).
- **Branch-Based Permissions (B/B Model)**: Staff and Heads are scoped to specific branch data.
- **Scaled Mock Data**: 100+ records for all core roles with regional binding.
- **Session-Only Mode**: State persists in `sessionStorage` for high-vitality demo runs.
- **Enterprise UI**: High-fidelity Shadcn/UI components with glassmorphism and premium dark/glass aesthetics.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, Shadcn/UI (Vanilla CSS + Radix) |
| State | Zustand (with session-only persist) |
| Icons | Lucide React |
| Animations | Framer Motion |
| Testing | Vitest |

---

## 📁 Project Structure

```
src/
├── app/            # Next.js App Router (Standardized Portals)
├── components/     # Shared UI Components & Layouts
├── features/       # Modular features (Admin, Portal, Counseling, etc.)
├── store/          # Zustand State (AppStore + Mock State)
├── modules/        # Domain-specific logic & mock-data generators
├── types/          # Unified TypeScript Definitions
└── utils/          # Helpers & Formatting
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd students-portal

# Install dependencies
npm install

# Start the demo portal
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Personas
- **Student**: View personalized counseling status, documents, and payments.
- **Branch Staff**: Regional verification tasks and student management.
- **Branch Head**: Operational headquarters with analytics and oversight.
- **Super Admin**: Global system governance and branch management (Hidden login).

> **Tip**: Changes are stored in `sessionStorage`. They persist between portal navigation but reset on browser refresh.

---

## 🗺️ Roadmap

**Current Version: v0.0.3 (Operational Role Model & Branch Intelligence)**

- [x] **v0.0.1**: Initial Frontend Prototype & Setup.
- [x] **v0.0.2**: Canonical Portal Consolidation, Routing Cleanup, Mock Mode Stable.
- [x] **v0.0.3**: Operational Role Model (B/B), Branch Head Portal, Hidden Admin, Scaling Mock Data.
- [ ] **v0.1.x**: Advanced Workflow Simulation & Eligibility Engines.
- [ ] **v0.2.x**: Backend Binding & Prisma Integration.
- [ ] **v0.3.x**: Multi-Tenant Architecture & Enterprise Scaling.
- [ ] **v1.0.0**: Production Stable AME.HUB.

---

## 📝 Changelog

### [v0.0.3] — 2026-01-19
- **Role Model Update**: Consolidated roles to Student, Branch Staff, and Branch Head.
- **Branch Binding**: Scoped all data and access by `branchId`.
- **Head Portal**: Launched `/portal/head` for branch managers.
- **Build Stabilization**: Neutralized legacy portal directories and resolved TypeScript errors.
- **Mock Data Scaling**: 100+ records for all core roles with regional branch binding.
- **Workspace Pruning**: Deep cleanup of unused files.

### [v0.0.2] — 2026-01-19
- Added 6 portal mode entrypoints with standardized access.
- Fixed routing conflicts and consolidated dashboards.
- Staff Portal expansion with regional management views.
- Mock Data Scaling with 100+ student profiles.

### [v0.0.1] — 2026-01-18
- Initial project setup with Next.js and Tailwind CSS.
- Basic mock data integration and preliminary portal structures.

---

## 📄 License

Proprietary software for Admissions Made Easy.
