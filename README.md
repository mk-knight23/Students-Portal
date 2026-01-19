# Admissions Made Easy Portal (Mock Mode)

<p align="center">
  <img src="public/logo.svg" width="120" alt="AME Logo" />
</p>

<p align="center">
  <strong>A Multi-Tenant Enterprise Platform - Frontend Prototype</strong>
</p>

---

## 🚀 Overview

Admissions Made Easy (AME.HUB) is a production-grade frontend prototype for an educational consultancy platform. This version runs in **Pure Mock Mode**, utilizing client-side mock services to simulate a full backend environment without needing a database connection. **Release Prep v0.0.2** features portal consolidation, routing fixes, and direct role-based entry.

## ✨ Key Features

- **Pure Frontend Architecture**: Zero external dependencies (No DB, No Backend).
- **Consolidated Portals**: Strict enforcement of 6 canonical roles (/portal/student, /portal/parent, /portal/staff, /portal/admin, /portal/agent, /portal/auditor).
- **Scaled Mock Data**: 100+ generated student profiles with comprehensive academic, financial, and document history.
- **Session-Only Mode**: State persists in `sessionStorage` for high-vitality demo runs (resets on refresh).
- **Enterprise UI**: High-fidelity Shadcn/UI components with glassmorphism, framer-motion animations, and premium dark/glass aesthetics.
- **Multi-Role Dashboards**: Role-specific dashboards with KPIs, financial trackers, and compliance monitors.
- **DPDPA Compliance UI**: Visual audit logs and consent management workflows for regulatory alignment.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, Shadcn/UI (Vanilla CSS + Radix) |
| State | Zustand (with session-only persist) |
| Icons | Lucide React |
| Animations | Framer Motion |

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

### Mock Access

The landing page provides a **Demo Access Hub** to instantly switch between the 6 canonical roles.

## 🗺️ Roadmap
 
 Current Version: **v0.0.2 (UI Fix & Portal Consolidation)**
 
 - [x] **v0.0.1**: Initial Frontend Prototype & Setup.
 - [x] **v0.0.2**: Canonical Portal Consolidation, Routing Cleanup, Mock Mode Stable, Role Hub Base.
 - [ ] **v0.1.x**: Auth Simulation & Security Guard Expansion.
 - [ ] **v0.2.x**: Backend Binding & Prisma Integration.
 - [ ] **v0.3.x**: Multi-Tenant Architecture & Enterprise Scaling.
 - [ ] **v1.0.0**: Production Stable AME.HUB.

## 📄 License

Proprietary software for Admissions Made Easy.
