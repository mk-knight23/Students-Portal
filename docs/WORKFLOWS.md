# AME Portal — WORKFLOWS.md

## Student Lifecycle Workflow

```
inquiry → application → documents → verification → counseling → payment → allotment → enrollment
```

### States

| State | Description | Actions |
|-------|-------------|---------|
| inquiry | Initial registration | Submit basic info |
| application | Application submitted | Awaiting document upload |
| documents | Documents uploaded | Awaiting verification |
| verification | Under review | Staff verifies |
| counseling | Choice filling | Fill preferences |
| payment | Fees due | Pay fees |
| allotment | Seat allotted | Accept/reject |
| enrollment | Enrolled | Complete |

## Counseling Sub-States

Students can participate in multiple counseling types:

| Type | Description |
|------|-------------|
| state-85% | State quota (85% seats) |
| AIQ | All India Quota (15% seats) |
| deemed | Deemed universities |
| open-state | Open state quota |
| mgmt | Management quota |
| NRI | NRI quota |

## Document Slot States

```
empty → uploaded → reviewed → verified/rejected
```

## Payment States

```
unpaid → paid → refunded (optional)
```

## Verification Workflow

```
pending → verified
        → rejected (with reason)
```

## UI Components for Workflows

- `Timeline` — Visual progress indicator
- `MultiStepWorkflow` — Step-by-step navigation
- `DocumentUpload` — File upload with status
- `ValidationAlert` — Status feedback
