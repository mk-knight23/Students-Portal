export type ConsentType =
    | 'data_processing'
    | 'marketing'
    | 'third_party_sharing'
    | 'biometric_data'
    | 'sensitive_personal_data';

export type ConsentStatus = 'granted' | 'denied' | 'withdrawn' | 'pending';

export interface ConsentRecord {
    id: string;
    userId: string;
    userName: string;
    type: ConsentType;
    status: ConsentStatus;
    version: string;
    grantedAt?: string;
    withdrawnAt?: string;
    expiresAt?: string;
    ipAddress?: string;
    userAgent?: string;
}

export type AuditAction =
    | 'login'
    | 'logout'
    | 'view_pii'
    | 'export_data'
    | 'modify_student'
    | 'delete_record'
    | 'verify_document'
    | 'payment_processed'
    | 'consent_updated'
    | 'role_changed';

export interface AuditLog {
    id: string;
    timestamp: string;
    userId: string;
    userName: string;
    userRole: string;
    action: AuditAction;
    resource: string;
    resourceId?: string;
    details: string;
    ipAddress: string;
    success: boolean;
    riskLevel: 'low' | 'medium' | 'high';
}

export interface DataRetentionPolicy {
    id: string;
    dataType: string;
    retentionPeriodDays: number;
    autoDeleteEnabled: boolean;
    lastRunAt?: string;
    nextRunAt?: string;
    recordsProcessed?: number;
}

export interface DataAccessRequest {
    id: string;
    requesterId: string;
    requesterName: string;
    type: 'access' | 'rectification' | 'erasure' | 'portability';
    status: 'pending' | 'in_progress' | 'completed' | 'rejected';
    submittedAt: string;
    completedAt?: string;
    assignedTo?: string;
    notes?: string;
}
