import type { DashboardMetrics, CounselingMetrics, RevenueMetrics, MetricCard } from './types';

export const dashboardMetrics: DashboardMetrics = {
    totalStudents: 2547,
    activeApplications: 892,
    pendingVerifications: 156,
    counselingRegistrations: 1834,
    completedEnrollments: 423,
    totalRevenue: 15420000,
    byCategory: {
        general: 1120,
        obc: 658,
        sc: 412,
        st: 189,
        ews: 168,
    },
    byState: {
        Maharashtra: 1248,
        Karnataka: 420,
        Kerala: 312,
        'Tamil Nadu': 189,
        Gujarat: 156,
        'Uttar Pradesh': 122,
        Delhi: 100,
    },
    byBranch: {
        'Latur Hub': 1248,
        'Pune Center': 850,
        Bangalore: 449,
    },
    byWorkflowState: {
        inquiry: 245,
        application: 312,
        documents: 289,
        verification: 156,
        counseling: 678,
        payment: 234,
        allotment: 210,
        enrollment: 423,
    },
};

export const counselingMetrics: CounselingMetrics = {
    totalRegistrations: 1834,
    byType: {
        state_85: 892,
        aiq: 456,
        deemed: 234,
        management: 156,
        nri: 96,
    },
    allotmentRate: 78.5,
    averagePreferenceRank: 3.2,
    topColleges: [
        { name: 'Government Medical College, Nagpur', allotments: 45 },
        { name: 'B.J. Medical College, Pune', allotments: 38 },
        { name: 'Grant Medical College, Mumbai', allotments: 32 },
        { name: 'SRMC Chennai', allotments: 28 },
        { name: 'KMC Mangalore', allotments: 25 },
    ],
};

export const revenueMetrics: RevenueMetrics = {
    totalCollected: 15420000,
    pendingCollection: 3250000,
    refunds: 125000,
    byType: {
        registration: 1250000,
        counseling: 920000,
        tuition: 12500000,
        hostel: 620000,
        other: 130000,
    },
    monthlyTrend: [
        { date: '2026-01', value: 2500000 },
        { date: '2025-12', value: 3200000 },
        { date: '2025-11', value: 2800000 },
        { date: '2025-10', value: 2100000 },
        { date: '2025-09', value: 1800000 },
        { date: '2025-08', value: 1500000 },
        { date: '2025-07', value: 1520000 },
    ],
};

export const kpiCards: MetricCard[] = [
    {
        id: 'kpi-students',
        label: 'Total Students',
        value: 2547,
        change: 12.5,
        trend: 'up',
        color: 'primary',
    },
    {
        id: 'kpi-applications',
        label: 'Active Applications',
        value: 892,
        change: 8.2,
        trend: 'up',
        color: 'blue',
    },
    {
        id: 'kpi-verifications',
        label: 'Pending Verifications',
        value: 156,
        change: -15.3,
        trend: 'down',
        color: 'yellow',
    },
    {
        id: 'kpi-enrollments',
        label: 'Enrollments',
        value: 423,
        change: 22.1,
        trend: 'up',
        color: 'green',
    },
    {
        id: 'kpi-revenue',
        label: 'Revenue Collected',
        value: '₹1.54 Cr',
        change: 18.7,
        trend: 'up',
        color: 'emerald',
    },
    {
        id: 'kpi-counseling',
        label: 'Counseling Registrations',
        value: 1834,
        change: 5.4,
        trend: 'up',
        color: 'purple',
    },
];

const mockData = { dashboardMetrics, counselingMetrics, revenueMetrics, kpiCards };
export default mockData;
