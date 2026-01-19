export type DocumentSlotState = 'pending' | 'uploaded' | 'reviewed' | 'verified' | 'rejected';

export type DocumentCategory = 'identity' | 'academic' | 'eligibility' | 'financial' | 'medical';

export interface DocumentSlot {
    id: string;
    typeCode: string;
    typeName: string;
    category: DocumentCategory;
    required: boolean;
    maxSizeMB: number;
    allowedFormats: string[];
    instructions: string;
}

export interface UploadedDocument {
    id: string;
    slotId: string;
    studentId: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    url: string;
    status: DocumentSlotState;
    uploadedAt: string;
    uploadedBy: 'student' | 'staff';
    reviewedAt?: string;
    reviewedBy?: string;
    verifiedAt?: string;
    verifiedBy?: string;
    rejectedAt?: string;
    rejectedBy?: string;
    rejectionReason?: string;
    metadata?: {
        ocrExtracted?: boolean;
        autoVerified?: boolean;
        documentNumber?: string;
    };
}

export interface DocumentVerificationResult {
    slotId: string;
    isValid: boolean;
    confidence: number;
    extractedData?: Record<string, string>;
    issues?: string[];
}
