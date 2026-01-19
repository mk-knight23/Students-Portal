// Student workflow states
export type StudentWorkflowState =
    | 'inquiry'
    | 'application'
    | 'documents'
    | 'verification'
    | 'counseling'
    | 'payment'
    | 'allotment'
    | 'enrollment';

export type VerificationState = 'pending' | 'verified' | 'rejected';

export interface StudentDocument {
    id: string;
    type: DocumentType;
    status: DocumentSlotState;
    url?: string;
    uploadedAt?: string;
    verifiedAt?: string;
    verifiedBy?: string;
    rejectionReason?: string;
}

export type DocumentType =
    | 'aadhaar'
    | 'pan'
    | 'class_10_marksheet'
    | 'class_12_marksheet'
    | 'neet_scorecard'
    | 'neet_admit_card'
    | 'domicile_certificate'
    | 'caste_certificate'
    | 'income_certificate'
    | 'transfer_certificate'
    | 'migration_certificate'
    | 'passport_photo'
    | 'medical_fitness'
    | 'gap_certificate';

export type DocumentSlotState = 'pending' | 'uploaded' | 'reviewed' | 'verified' | 'rejected';

export interface CounselingPreference {
    collegeId: string;
    collegeName: string;
    rank: number;
    type: CounselingType;
    state?: string;
    round?: number;
    status: 'selected' | 'locked' | 'allotted' | 'rejected';
}

export type CounselingType =
    | 'state_85'
    | 'aiq'
    | 'deemed'
    | 'open_state_ka'
    | 'open_state_kl'
    | 'open_state_up'
    | 'management'
    | 'nri';

export type PaymentState = 'unpaid' | 'paid' | 'refunded';
export type PaymentType = 'registration' | 'tuition' | 'hostel' | 'counseling' | 'other';
export type PaymentMethod = 'upi' | 'bank_transfer' | 'cash' | 'card' | 'neft';

export interface StudentPayment {
    id: string;
    type: PaymentType;
    amount: number;
    status: PaymentState;
    method?: PaymentMethod;
    transactionId?: string;
    paidAt?: string;
    receiptUrl?: string;
}

export interface AcademicHistory {
    class10: {
        board: string;
        year: string;
        percentage: number;
        marksheetUrl?: string;
    };
    class12: {
        board: string;
        year: string;
        percentage: number;
        stream: string;
        marksheetUrl?: string;
    };
    neet: {
        rollNo: string;
        score: number;
        rank: number;
        percentile?: number;
        year: string;
        admitCardUrl?: string;
        scorecardUrl?: string;
    };
}

export type CasteCategory = 'general' | 'obc' | 'sc' | 'st' | 'ews' | 'pwd';

export interface StudentProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: 'male' | 'female' | 'other';
    dob: string;
    aadhaarMasked: string;
    apaarId?: string;
    category: CasteCategory;
    state: string;
    city: string;
    address?: string;
    pincode?: string;

    // Workflow
    workflowState: StudentWorkflowState;
    registrationDate: string;

    // Academic
    academicHistory: AcademicHistory;

    // Documents
    documents: StudentDocument[];
    documentsVerified: boolean;

    // Counseling
    counselingRegistrations: CounselingType[];
    preferences: CounselingPreference[];
    allottedCollege?: string;

    // Payments
    payments: StudentPayment[];

    // References
    branchId: string;
    assignedStaffId?: string;
    referralAgentId?: string;
}
