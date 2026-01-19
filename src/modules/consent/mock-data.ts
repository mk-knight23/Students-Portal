import type { ConsentItem, ConsentBannerConfig } from './types';

export const consentItems: ConsentItem[] = [
    {
        id: 'consent-essential',
        purpose: 'essential',
        title: 'Essential Services',
        description: 'Required for the portal to function. Includes authentication, security, and core features.',
        required: true,
        defaultValue: true,
        version: '1.0',
        lastUpdated: '2026-01-01',
    },
    {
        id: 'consent-processing',
        purpose: 'data_processing',
        title: 'Data Processing for Admissions',
        description: 'Processing of your personal data for admission counseling, document verification, and enrollment.',
        required: true,
        defaultValue: true,
        version: '1.2',
        lastUpdated: '2026-01-01',
    },
    {
        id: 'consent-analytics',
        purpose: 'analytics',
        title: 'Analytics & Improvements',
        description: 'Anonymous usage data to improve our services and user experience.',
        required: false,
        defaultValue: true,
        version: '1.0',
        lastUpdated: '2026-01-01',
    },
    {
        id: 'consent-marketing',
        purpose: 'marketing',
        title: 'Marketing Communications',
        description: 'Receive updates about new colleges, counseling dates, and educational opportunities.',
        required: false,
        defaultValue: false,
        version: '1.1',
        lastUpdated: '2026-01-01',
    },
    {
        id: 'consent-thirdparty',
        purpose: 'third_party',
        title: 'Partner Colleges Communication',
        description: 'Share your profile with partner colleges for admission-related communication.',
        required: false,
        defaultValue: false,
        version: '1.0',
        lastUpdated: '2026-01-01',
    },
];

export const bannerConfig: ConsentBannerConfig = {
    enabled: true,
    position: 'bottom',
    style: 'card',
    showOnEveryVisit: false,
    items: consentItems,
};

const mockData = { consentItems, bannerConfig };
export default mockData;
