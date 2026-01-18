# System Overview: Admissions Made Easy

## Introduction
Admissions Made Easy is a multi-tenant B2B2C SaaS platform designed for educational consultancy firms. It streamlines the complex admission process, from student registration and counseling to fee collection and document compliance.

## Core Pillars

### 1. Multi-Tenant Architecture
- **Tenant Isolation**: Each consultancy firm (Tenant) has its own isolated data workspace.
- **Branch Management**: Tenants can manage multiple physical branches with unique identifiers.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for Tenant Owners, Branch Admins, Staff, and Students.

### 2. DPDPA 2023 Compliance
- All personal data is handled according to India's Digital Personal Data Protection Act.
- Features include Aadhaar/APAAR ID masking, immutable audit logs, and explicit consent management.

### 3. Counseling Engine
- Automated preference management for university and course selection.
- Multi-round allotment tracking and reporting.

### 4. Financial Ledger
- Real-time transaction tracking.
- Automated generation of digitally signed receipts.

## Target Users
- **Tenant Owner**: Strategic oversight across all branches and financials.
- **Branch Admin**: Operational control over a specific branch's staff and students.
- **Staff**: Day-to-day data entry, document verification, and counseling support.
- **Student/Parent**: Self-service portal for tracking applications and payments.

## Technology Stack
- **Framework**: Next.js 16 (Server Components, Proxy)
- **Database**: PostgreSQL with Prisma 7 ORM
- **Auth**: NextAuth v5 (Auth.js)
- **UI**: Tailwind CSS, Shadcn/UI, Framer Motion
- **Compliance**: DPDPA-aligned logic and encryption-ready schemas.
