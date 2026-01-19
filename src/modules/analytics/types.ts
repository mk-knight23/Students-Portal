export interface MetricCard {
    id: string;
    label: string;
    value: number | string;
    change?: number; // percentage change
    trend?: 'up' | 'down' | 'stable';
    icon?: string;
    color?: string;
}

export interface ChartDataPoint {
    label: string;
    value: number;
    category?: string;
}

export interface TimeSeriesData {
    date: string;
    value: number;
    category?: string;
}

export interface DashboardMetrics {
    totalStudents: number;
    activeApplications: number;
    pendingVerifications: number;
    counselingRegistrations: number;
    completedEnrollments: number;
    totalRevenue: number;
    byCategory: Record<string, number>;
    byState: Record<string, number>;
    byBranch: Record<string, number>;
    byWorkflowState: Record<string, number>;
}

export interface CounselingMetrics {
    totalRegistrations: number;
    byType: Record<string, number>;
    allotmentRate: number;
    averagePreferenceRank: number;
    topColleges: { name: string; allotments: number }[];
}

export interface RevenueMetrics {
    totalCollected: number;
    pendingCollection: number;
    refunds: number;
    byType: Record<string, number>;
    monthlyTrend: TimeSeriesData[];
}
