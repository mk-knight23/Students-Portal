# Component Library Documentation

## Overview
This document catalogs all UI components available in the Admissions Made Easy portal.

---

## Base Components (Shadcn/UI)

### Button
```tsx
import { Button } from "@/components/ui/button";

<Button variant="default">Default</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Ghost</Button>
```

**Variants**: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
**Sizes**: `default`, `sm`, `lg`, `icon`

---

### Card
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

<Card className="glass">
    <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
    <CardFooter>Footer</CardFooter>
</Card>
```

---

### Input
```tsx
import { Input } from "@/components/ui/input";

<Input placeholder="Enter text..." />
<Input type="email" />
<Input disabled />
```

---

### Select
```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

<Select>
    <SelectTrigger>
        <SelectValue placeholder="Choose..." />
    </SelectTrigger>
    <SelectContent>
        <SelectItem value="1">Option 1</SelectItem>
        <SelectItem value="2">Option 2</SelectItem>
    </SelectContent>
</Select>
```

---

## Custom Components

### StatusBadge
```tsx
import { StatusBadge, getStatusVariant } from "@/components/ui/status-badge";

<StatusBadge variant="pending">Pending</StatusBadge>
<StatusBadge variant="verified">Verified</StatusBadge>
<StatusBadge variant="rejected">Rejected</StatusBadge>
<StatusBadge variant="allotted">Allotted</StatusBadge>
<StatusBadge variant="confirmed">Confirmed</StatusBadge>

// Dynamic usage
<StatusBadge variant={getStatusVariant(student.status)}>
    {student.status}
</StatusBadge>
```

**Variants**: `pending`, `verified`, `rejected`, `processing`, `registered`, `choices_filled`, `allotted`, `confirmed`, `cancelled`, `success`, `failed`

---

### Skeleton
```tsx
import { Skeleton, SkeletonCard, SkeletonTable, SkeletonDashboard } from "@/components/ui/skeleton";

// Basic
<Skeleton width={200} height={20} />
<Skeleton variant="circular" width={48} height={48} />

// Pre-built patterns
<SkeletonCard />
<SkeletonTable rows={5} />
<SkeletonDashboard />
```

---

### Empty States
```tsx
import { 
    EmptyState, 
    NoStudentsFound, 
    NoSearchResults, 
    NoDocuments,
    ErrorState,
    OfflineState 
} from "@/components/ui/empty-states";

<NoStudentsFound onAdd={() => router.push("/students/add")} />
<NoSearchResults query={searchTerm} />
<NoDocuments onUpload={handleUpload} />
<ErrorState onRetry={refetch} />
```

---

### Timeline
```tsx
import { Timeline, CounselingRoundTimeline } from "@/components/ui/timeline";

const steps = [
    { id: "1", label: "Registration", status: "completed" },
    { id: "2", label: "Documents", status: "current" },
    { id: "3", label: "Verification", status: "upcoming" },
];

<Timeline steps={steps} orientation="vertical" />
<Timeline steps={steps} orientation="horizontal" />

// Counseling-specific
<CounselingRoundTimeline rounds={[
    { round: 1, name: "Round 1", startDate: "Jan 15", endDate: "Jan 25", status: "completed" },
    { round: 2, name: "Round 2", startDate: "Feb 1", endDate: "Feb 10", status: "current" },
]} />
```

---

### Column Chooser
```tsx
import { ColumnChooser } from "@/components/ui/column-chooser";

const [columns, setColumns] = useState([
    { key: "name", label: "Name", visible: true },
    { key: "score", label: "Score", visible: true },
    { key: "status", label: "Status", visible: false },
]);

<ColumnChooser 
    columns={columns} 
    onToggle={(key) => toggleColumn(key)} 
/>
```

---

### Advanced Filters
```tsx
import { AdvancedFilters } from "@/components/ui/advanced-filters";

<AdvancedFilters
    filters={filters}
    onFilterChange={setFilters}
    onClear={() => setFilters(defaultFilters)}
    categories={["Open", "OBC", "SC", "ST"]}
    statuses={["REGISTERED", "CHOICES_FILLED", "ALLOTTED"]}
    states={["Maharashtra", "Karnataka", "Kerala"]}
/>
```

---

## Layout Components

### MainLayout
Wraps authenticated pages with Sidebar and Navbar.

```tsx
import { MainLayout } from "@/components/layout/main-layout";

<MainLayout>
    <YourPageContent />
</MainLayout>
```

### Sidebar
Navigation sidebar with collapsible state.

### Navbar
Top navigation with search, notifications, user dropdown.

### BranchSwitcher
Admin-only component for switching between branches.

### ThemeToggle
Dark/Light mode switch.

---

## Form Components

### StudentMasterForm
Multi-step student registration form with Zod validation.

```tsx
import { StudentMasterForm } from "@/components/forms/student-master-form";

<StudentMasterForm onSubmit={handleSubmit} />
```

---

## Onboarding Components

### OnboardingTour
5-step animated tour for new users.

```tsx
import { OnboardingTour } from "@/components/onboarding/onboarding-tour";

<OnboardingTour 
    isOpen={showTour} 
    onClose={() => setShowTour(false)}
    onComplete={handleComplete}
/>
```

### HelpPanel
Floating help button with FAQ accordion.

```tsx
import { HelpPanel } from "@/components/onboarding/help-panel";

<HelpPanel />  // Renders fixed button in bottom-right
```

---

## Data Testid Reference

| Component | Selector |
|-----------|----------|
| Submit Button | `data-testid="submit-button"` |
| Students Table | `data-testid="students-table"` |
| Status Badge | `data-testid="status-badge-{variant}"` |
| Timeline | `data-testid="vertical-timeline"` or `"horizontal-timeline"` |
| Empty State | `data-testid="empty-state"` |
