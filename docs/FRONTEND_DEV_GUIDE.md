# Frontend Developer Guide

## Overview
The Admissions Made Easy portal is built with Next.js 16, React 19, and Tailwind CSS. This guide helps developers understand the codebase and get started quickly.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | App Router, Server Components |
| React | 19.x | UI Library |
| TypeScript | 5.x | Type Safety |
| Tailwind CSS | 4.x | Styling |
| Shadcn/UI | - | Component Library |
| Vitest | 4.x | Unit Testing |
| Prisma | 7.x | ORM (optional) |

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (portal)/          # Authenticated routes
│   │   ├── page.tsx       # Dashboard
│   │   ├── students/      # Student management
│   │   ├── counseling/    # Preference filling
│   │   ├── payments/      # Financial ledger
│   │   ├── reports/       # Analytics
│   │   └── compliance/    # Audit logs
│   ├── api/               # API routes
│   │   ├── ai/           # AI automation endpoints
│   │   └── auth/         # NextAuth routes
│   └── login/            # Public login page
├── components/
│   ├── ui/               # Base components (Button, Card, etc.)
│   ├── layout/           # Sidebar, Navbar, MainLayout
│   ├── forms/            # Form components
│   ├── students/         # Student-specific components
│   ├── onboarding/       # Tour, Help panel
│   └── branding/         # Tenant customization
├── lib/
│   ├── mock/             # Mock data & services
│   ├── validation/       # Zod schemas
│   ├── actions/          # Server actions
│   └── state-machine/    # Counseling round logic
└── hooks/                # Custom React hooks
```

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Development Workflow

### 1. Creating Components
All reusable UI components go in `src/components/ui/`. Follow the Shadcn/UI pattern:

```tsx
// src/components/ui/my-component.tsx
import { cn } from "@/lib/utils";

interface MyComponentProps {
    className?: string;
    children: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
    return (
        <div 
            className={cn("base-classes", className)}
            data-testid="my-component"
        >
            {children}
        </div>
    );
}
```

### 2. Using Mock Services
During development, use mock services instead of real API calls:

```tsx
import { mockStudentService } from "@/lib/mock";

async function loadStudents() {
    const result = await mockStudentService.getAll();
    if (result.success) {
        setStudents(result.data);
    }
}
```

### 3. Adding Tests
Place tests alongside components using `__tests__` directories:

```tsx
// src/components/ui/__tests__/my-component.test.tsx
import { render, screen } from "@testing-library/react";
import { MyComponent } from "../my-component";

describe("MyComponent", () => {
    it("renders children", () => {
        render(<MyComponent>Hello</MyComponent>);
        expect(screen.getByText("Hello")).toBeInTheDocument();
    });
});
```

## Key Conventions

### Naming
- **Components**: PascalCase (`StudentCard.tsx`)
- **Hooks**: camelCase with `use` prefix (`useBranchStore.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Test files**: `*.test.tsx` or `*.test.ts`

### Styling
- Use Tailwind utility classes
- Custom classes in `globals.css`
- Use `cn()` helper for conditional classes
- Glassmorphic design: `.glass`, `.glass-card`

### Data Flow
```
Server Component → fetches data
    ↓
Client Component → receives as props
    ↓
Mock Service (dev) or API (prod)
```

### Testing Selectors
Always add `data-testid` for automation:
```tsx
<button data-testid="submit-button">Submit</button>
<table data-testid="students-table">...</table>
```

## Environment Variables

```env
DATABASE_URL=postgresql://...
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

## Common Tasks

### Add a New Page
1. Create `src/app/(portal)/new-page/page.tsx`
2. Add to sidebar in `src/components/layout/sidebar.tsx`
3. Create necessary components in `src/components/`

### Add a New Component
1. Create in `src/components/ui/` or feature folder
2. Add `data-testid` attributes
3. Write unit test in `__tests__/`
4. Export from index if needed

### Switch from Mock to Real API
Replace mock service calls:
```tsx
// Before (mock)
import { mockStudentService } from "@/lib/mock";
const data = await mockStudentService.getAll();

// After (real)
const data = await fetch("/api/students").then(r => r.json());
```

## Troubleshooting

### Hydration Errors
- Ensure client components have `"use client"` directive
- Avoid browser-only APIs in server components
- Use `useEffect` for client-side logic

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Type Errors
```bash
# Regenerate Prisma types
npx prisma generate
```

## Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn/UI](https://ui.shadcn.com)
- [Vitest](https://vitest.dev)
