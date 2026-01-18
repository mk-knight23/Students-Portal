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
- `(portal)/`: Protected enterprise portal routes.
- `(public)/`: Public facing marketing pages.
- `layout.tsx`: Root layout.

### `actions/`
Contains **Server Actions** used for form submissions and mutations.
*Note: In this Mock Mode, these actions interact with `src/mocks` instead of a database.*

### `components/`
Reusable UI components.
- `ui/`: Shadcn/UI primitives (Button, Card, Input).
- `branding/`: Logo and Theme components.
- `analytics/`, `students/`, etc.: Feature-specific components.

### `hooks/`
Custom React hooks for state, UI logic, and performance (e.g., `use-debounce`, `use-mobile`).

### `mocks/`
The Mock Backend Layer.
- `data-store.ts`: Centralized in-memory database of students, users, and logs.
- `services.ts`: Async service methods simulating API latency and errors.

### `services/`
The Data Access Adapter layer.
- `data-access.ts`: Standardized getters used by Server Components to fetch data (from Mocks).

### `types/`
Global TypeScript definitions, replacing Prisma generated types.

### `utils/`
Helper functions and static logic.
- `index.ts`: `cn()` utility.
- `validation/`: Zod schemas for form validation.
