import type { AppSettings, UserPreferences } from './types';

export const defaultSettings: AppSettings = {
    general: {
        appName: 'Admissions Made Easy',
        timezone: 'Asia/Kolkata',
        dateFormat: 'DD/MM/YYYY',
        currency: 'INR',
        defaultBranch: 'BR01',
        academicYear: '2026-27',
    },
    notifications: {
        emailEnabled: true,
        smsEnabled: true,
        pushEnabled: true,
        digestFrequency: 'daily',
        channels: {
            applicationUpdates: true,
            documentReminders: true,
            paymentAlerts: true,
            counselingNotices: true,
            systemAnnouncements: true,
        },
    },
    security: {
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        passwordExpiry: 90,
        mfaEnabled: false,
        ipWhitelist: [],
        auditLogRetention: 365,
    },
    display: {
        theme: 'system',
        density: 'comfortable',
        sidebarCollapsed: false,
        tablePageSize: 25,
        language: 'en',
    },
};

export const mockUserPreferences: UserPreferences = {
    userId: 'ADM001',
    display: {
        theme: 'dark',
        density: 'comfortable',
        sidebarCollapsed: false,
        tablePageSize: 50,
        language: 'en',
    },
    notifications: {
        digestFrequency: 'instant',
        channels: {
            applicationUpdates: true,
            documentReminders: true,
            paymentAlerts: true,
            counselingNotices: true,
            systemAnnouncements: true,
        },
    },
    savedFilters: {
        studentList: { status: 'counseling', branch: 'BR01' },
    },
    pinnedReports: ['tpl-student-list', 'tpl-payment'],
    quickLinks: ['/admin/students', '/admin/dashboard', '/admin/reports'],
};

const mockData = { defaultSettings, mockUserPreferences };
export default mockData;
