# Admissions Made Easy Portal (Mock Mode)

<p align="center">
  <img src="public/logo.svg" width="120" alt="AME Logo" />
</p>

<p align="center">
  <strong>A Multi-Tenant Enterprise Platform - Frontend Prototype</strong>
</p>

---

## 🚀 Overview

Admissions Made Easy (AME) is a production-grade frontend prototype for an educational consultancy platform. This version runs in **Pure Mock Mode**, utilizing client-side mock services to simulate a full backend environment without needing a database connection.

## ✨ Key Features

- **Pure Frontend Architecture**: Zero external dependencies (No DB, No Backend).
- **Mock Services**: Comprehensive mock data layer simulating Students, Payments, Compliance, and Auth.
- **Role-Based Access**: Simulated dashboards for Tenant Owners, Staff, and Students.
- **DPDPA Compliance UI**: Visual audit logs and consent management workflows.
- **Enterprise UI**: High-fidelity Shadcn/UI components with responsive design.

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, Shadcn/UI |
| State | Server Actions (Simulated) |
| Icons | Lucide React |
| Charts | Recharts |

## 📁 Project Structure

```
src/
├── actions/        # Server Actions (Mocked)
├── app/            # Next.js App Router
├── components/     # React UI Components
├── hooks/          # Custom Hooks
├── mocks/          # Mock Services & Data Store
├── services/       # Data Access Layer
├── types/          # TypeScript Definitions
└── utils/          # Helpers & Validations
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

# Start the mock server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Mock Credentials

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@mock.com | (any) |

(Modify `src/auth.ts` to switch simulated roles).

## 🗺️ Roadmap

Current Version: **v0.0.2 (Cleanup + Stabilization)**

- [x] **v0.0.1**: Initial mock frontend baseline, Zero Backend.
- [x] **v0.0.2**: Cleanup, naming consistency, lint fixes, docs update.
- [ ] **v0.1.0**: Frontend feature expansion & UI polish.
- [ ] **v0.2.0**: NextAuth integration with real providers.
- [ ] **v0.3.0**: Real Backend API integration (Node/Next.js).
- [ ] **v0.4.0**: Database integration (Postgres + Prisma).
- [ ] **v0.5.0**: Multi-tenancy SaaS mode enabled.
- [ ] **v1.0.0**: Production Stable Release.

## 📄 License

Proprietary software for Admissions Made Easy.
