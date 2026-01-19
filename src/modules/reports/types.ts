export type ReportType =
    | 'student_list'
    | 'enrollment_summary'
    | 'counseling_status'
    | 'payment_collection'
    | 'document_verification'
    | 'agent_performance'
    | 'branch_comparison'
    | 'category_wise'
    | 'state_wise'
    | 'audit_log';

export type ReportFormat = 'pdf' | 'excel' | 'csv';
export type ReportStatus = 'pending' | 'generating' | 'completed' | 'failed';

export interface ReportTemplate {
    id: string;
    name: string;
    type: ReportType;
    description: string;
    availableFormats: ReportFormat[];
    filters: ReportFilter[];
    schedulable: boolean;
}

export interface ReportFilter {
    id: string;
    name: string;
    type: 'date_range' | 'select' | 'multi_select' | 'text';
    options?: { value: string; label: string }[];
    required: boolean;
}

export interface GeneratedReport {
    id: string;
    templateId: string;
    name: string;
    type: ReportType;
    format: ReportFormat;
    status: ReportStatus;
    requestedBy: string;
    requestedAt: string;
    completedAt?: string;
    downloadUrl?: string;
    filters: Record<string, unknown>;
    recordCount?: number;
    fileSize?: number;
    expiresAt?: string;
}

export interface ScheduledReport {
    id: string;
    templateId: string;
    name: string;
    frequency: 'daily' | 'weekly' | 'monthly';
    nextRunAt: string;
    lastRunAt?: string;
    recipients: string[];
    format: ReportFormat;
    filters: Record<string, unknown>;
    enabled: boolean;
}
