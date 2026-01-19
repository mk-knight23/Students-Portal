export interface AppSettings {
    general: GeneralSettings;
    notifications: NotificationSettings;
    security: SecuritySettings;
    display: DisplaySettings;
}

export interface GeneralSettings {
    appName: string;
    timezone: string;
    dateFormat: string;
    currency: string;
    defaultBranch: string;
    academicYear: string;
}

export interface NotificationSettings {
    emailEnabled: boolean;
    smsEnabled: boolean;
    pushEnabled: boolean;
    digestFrequency: 'instant' | 'hourly' | 'daily' | 'weekly';
    channels: {
        applicationUpdates: boolean;
        documentReminders: boolean;
        paymentAlerts: boolean;
        counselingNotices: boolean;
        systemAnnouncements: boolean;
    };
}

export interface SecuritySettings {
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordExpiry: number;
    mfaEnabled: boolean;
    ipWhitelist: string[];
    auditLogRetention: number;
}

export interface DisplaySettings {
    theme: 'light' | 'dark' | 'system';
    density: 'compact' | 'comfortable' | 'spacious';
    sidebarCollapsed: boolean;
    tablePageSize: number;
    language: string;
}

export interface UserPreferences {
    userId: string;
    display: DisplaySettings;
    notifications: Partial<NotificationSettings>;
    savedFilters: Record<string, unknown>;
    pinnedReports: string[];
    quickLinks: string[];
}
