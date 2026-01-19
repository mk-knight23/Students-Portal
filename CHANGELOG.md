# Changelog

All notable changes to this project will be documented in this file.

## [v0.0.2] — 2026-01-19
### UI Fix + Portal Consolidation + Routing Cleanup + Mock Mode Stable

- **Added 6 portal mode entrypoints**: Standardized access for Student, Parent, Staff, Admin, Agent, and Auditor.
- **Improved Role Selection Hub**: Restored the root page role selector for instant demo access.
- **Fixed Routing Conflicts**: Resolved overlaps between `/portal/admin` and regional admin routes.
- **Consolidated Dashboards**: Removed duplicate layouts and synchronized sidebar navigation across all portals.
- **Direct Redirection**: All roles now redirect to their respective `/portal/[role]/dashboard` upon login or selection.
- **Staff Portal Expansion**: Added dedicated Staff login mode and regional management views.
- **Soft Cleanup**: Removed legacy demo routes and pruned unused structural components.
- **Mock Data Scaling**: Integrated 100+ mock student profiles for high-vitality demo scenarios.
- **Documentation Overhaul**: Regenerated all root guides (README, Release Notes, etc.) to align with v0.0.2.
- **Version Baseline**: Established v0.0.2 as the official stable frontend-only baseline.

---

## [v0.0.1] — 2026-01-18
### Initial Frontend Prototype
- Initial project setup with Next.js and Tailwind CSS.
- Basic mock data integration.
- Preliminary portal structures.
