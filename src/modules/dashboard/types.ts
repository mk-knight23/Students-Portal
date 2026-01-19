export type DashboardType = 'student' | 'parent' | 'admin' | 'staff' | 'agent' | 'auditor';

export interface DashboardWidget {
    id: string;
    type: WidgetType;
    title: string;
    size: 'small' | 'medium' | 'large' | 'full';
    position: { row: number; col: number };
    config?: Record<string, unknown>;
}

export type WidgetType =
    | 'status_timeline'
    | 'document_checklist'
    | 'counseling_steps'
    | 'fees_summary'
    | 'kpi_card'
    | 'metrics_grid'
    | 'data_table'
    | 'chart_bar'
    | 'chart_line'
    | 'chart_pie'
    | 'quick_actions'
    | 'notifications'
    | 'activity_feed'
    | 'referral_list'
    | 'commission_tracker';

export interface DashboardLayout {
    id: string;
    name: string;
    role: DashboardType;
    widgets: DashboardWidget[];
    columns: number;
}

// Student Dashboard specific types
export interface TimelineStep {
    id: string;
    label: string;
    status: 'completed' | 'current' | 'upcoming' | 'locked';
    date?: string;
    description?: string;
}

export interface DocumentChecklistItem {
    id: string;
    name: string;
    status: 'pending' | 'uploaded' | 'verified' | 'rejected';
    required: boolean;
    dueDate?: string;
}

export interface CounselingStep {
    id: string;
    type: string;
    name: string;
    status: 'not_registered' | 'registered' | 'choice_filling' | 'allotted' | 'completed';
    currentRound?: number;
    allottedCollege?: string;
}

export interface FeeItem {
    id: string;
    name: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
}
