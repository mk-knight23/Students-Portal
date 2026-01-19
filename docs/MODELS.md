# AME Portal — Data Models

## Core Entities

### Student
Primary entity representing an applicant.
```typescript
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  category: Category;      // General, OBC, SC, ST, EWS
  neetDetails: NEETDetails;
  address: Address;
  status: WorkflowStatus;  // inquiry...enrollment
  assignedBranchId: string;
  documents: DocumentSlot[];
  payments: PaymentRecord[];
  counseling: CounselingState;
}
```

### NEET Details
Academic performance data.
```typescript
interface NEETDetails {
  rollNumber: string;
  applicationNumber: string;
  score: number;           // Max 720
  allIndiaRank: number;
  percentile: number;
  year: number;
}
```

### Document Slot
Manages file uploads and verification.
```typescript
interface DocumentSlot {
  id: string;
  type: DocumentType;      // aadhaar, neet_scorecard, etc.
  label: string;
  isRequired: boolean;
  status: 'empty' | 'uploaded' | 'verified' | 'rejected';
  fileUrl?: string;
  uploadedAt?: string;
  verifiedBy?: string;
  rejectionReason?: string;
}
```

### Payment Record
Financial transaction tracking.
```typescript
interface PaymentRecord {
  id: string;
  studentId: string;
  amount: number;
  type: 'registration' | 'token' | 'seat_acceptance' | 'tuition';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  method: 'upi' | 'card' | 'netbanking' | 'cash';
  transactionId?: string;
  date: string;
  receiptUrl?: string;
}
```

### Counseling State
Tracks counseling progress.
```typescript
interface CounselingState {
  currentRound: number;
  participatingTypes: CounselingType[];
  preferences: CollegePreference[];
  allotment?: AllotmentDetails;
}

interface CollegePreference {
  id: string;
  collegeId: string;
  courseId: string;
  priority: number;
  type: CounselingType;
}
```

### User
Portal access control.
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'student' | 'parent' | 'agent' | 'auditor';
  branchId?: string;
  avatar?: string;
}
```

## Enums & Constants

### WorkflowStatus
- `inquiry`
- `application`
- `documents`
- `verification`
- `counseling`
- `payment`
- `allotment`
- `enrollment`

### DocumentType
- `photo`
- `signature`
- `aadhaar`
- `pan_card`
- `neet_scorecard`
- `neet_admit_card`
- `class_10_mark_sheet`
- `class_12_mark_sheet`
- `caste_certificate`
- `domicile_certificate`
