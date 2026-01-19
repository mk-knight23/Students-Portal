import type { ReportTemplate, GeneratedReport } from './types';

export const reportTemplates: ReportTemplate[] = [
    {
        id: 'tpl-student-list',
        name: 'Student Master List',
        type: 'student_list',
        description: 'Complete list of students with personal and academic details',
        availableFormats: ['pdf', 'excel', 'csv'],
        filters: [
            { id: 'date_range', name: 'Registration Date', type: 'date_range', required: false },
            {
                id: 'branch', name: 'Branch', type: 'multi_select', options: [
                    { value: 'BR01', label: 'Latur Hub' },
                    { value: 'BR02', label: 'Pune Center' },
                    { value: 'BR03', label: 'Bangalore' },
                ], required: false
            },
            {
                id: 'status', name: 'Workflow Status', type: 'select', options: [
                    { value: 'inquiry', label: 'Inquiry' },
                    { value: 'application', label: 'Application' },
                    { value: 'documents', label: 'Documents' },
                    { value: 'verification', label: 'Verification' },
                    { value: 'counseling', label: 'Counseling' },
                    { value: 'enrollment', label: 'Enrollment' },
                ], required: false
            },
        ],
        schedulable: true,
    },
    {
        id: 'tpl-enrollment',
        name: 'Enrollment Summary',
        type: 'enrollment_summary',
        description: 'Summary of enrollments by college, category, and quota',
        availableFormats: ['pdf', 'excel'],
        filters: [
            { id: 'date_range', name: 'Enrollment Period', type: 'date_range', required: true },
            {
                id: 'counseling_type', name: 'Counseling Type', type: 'multi_select', options: [
                    { value: 'state_85', label: 'State 85%' },
                    { value: 'aiq', label: 'AIQ' },
                    { value: 'deemed', label: 'Deemed' },
                    { value: 'management', label: 'Management' },
                ], required: false
            },
        ],
        schedulable: true,
    },
    {
        id: 'tpl-payment',
        name: 'Payment Collection Report',
        type: 'payment_collection',
        description: 'Fee collection summary with pending and overdue amounts',
        availableFormats: ['pdf', 'excel'],
        filters: [
            { id: 'date_range', name: 'Collection Period', type: 'date_range', required: true },
            {
                id: 'payment_type', name: 'Payment Type', type: 'multi_select', options: [
                    { value: 'registration', label: 'Registration' },
                    { value: 'counseling', label: 'Counseling' },
                    { value: 'tuition', label: 'Tuition' },
                    { value: 'hostel', label: 'Hostel' },
                ], required: false
            },
        ],
        schedulable: true,
    },
    {
        id: 'tpl-docverify',
        name: 'Document Verification Status',
        type: 'document_verification',
        description: 'Status of document uploads and verifications',
        availableFormats: ['pdf', 'excel'],
        filters: [
            {
                id: 'status', name: 'Verification Status', type: 'select', options: [
                    { value: 'pending', label: 'Pending' },
                    { value: 'verified', label: 'Verified' },
                    { value: 'rejected', label: 'Rejected' },
                ], required: false
            },
        ],
        schedulable: false,
    },
];

export const recentReports: GeneratedReport[] = [
    {
        id: 'RPT001',
        templateId: 'tpl-student-list',
        name: 'Student Master List - January 2026',
        type: 'student_list',
        format: 'excel',
        status: 'completed',
        requestedBy: 'Super Admin',
        requestedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 1.9 * 60 * 60 * 1000).toISOString(),
        downloadUrl: '/mock/reports/student-list-jan-2026.xlsx',
        filters: { branch: ['BR01', 'BR02'] },
        recordCount: 1542,
        fileSize: 256000,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: 'RPT002',
        templateId: 'tpl-payment',
        name: 'Payment Collection - Q4 2025',
        type: 'payment_collection',
        format: 'pdf',
        status: 'completed',
        requestedBy: 'Branch Head',
        requestedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date(Date.now() - 23.8 * 60 * 60 * 1000).toISOString(),
        downloadUrl: '/mock/reports/payment-q4-2025.pdf',
        filters: { date_range: { from: '2025-10-01', to: '2025-12-31' } },
        recordCount: 892,
        fileSize: 128000,
    },
];

const mockData = { reportTemplates, recentReports };
export default mockData;
