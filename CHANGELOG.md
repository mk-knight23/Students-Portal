# Changelog

All notable changes to the Admissions Made Easy Portal will be documented here.

## [0.0.2] - 2026-01-19

### Added
- Consolidated `useAppStore` with branch context (merged `useBranchStore`)
- Unified `validation.ts` (Verhoeff + Zod schemas)

### Changed
- Normalized role types to `admin`/`student` across all components
- Updated Login page UX with cleaner role selector
- Cleaned up unused imports across 10+ files

### Removed
- Legacy route folders: `/student`, `/agent`, `/parent`, `/staff`
- Deprecated mock services: `src/mocks/`, `src/actions/`
- Redundant components: `src/components/portals/`, `src/components/analytics/`
- Old validation folder: `src/utils/validation/`

### Fixed
- Unescaped apostrophes in `not-found.tsx`
- Missing `BranchSwitcher` import in `Navbar`
- Unused variable lint warnings across admin and portal pages

---

## [0.0.1] - 2026-01-18

### Added
- Initial frontend baseline with mock services
- 10 route pages (Admin, Portal, Login)
- Shadcn/UI component library integration
- DPDPA compliance dashboard mockup
