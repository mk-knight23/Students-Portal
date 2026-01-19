export type ConsentPurpose =
    | 'essential'
    | 'data_processing'
    | 'marketing'
    | 'analytics'
    | 'third_party'
    | 'biometric';

export interface ConsentItem {
    id: string;
    purpose: ConsentPurpose;
    title: string;
    description: string;
    required: boolean;
    defaultValue: boolean;
    version: string;
    lastUpdated: string;
}

export interface UserConsent {
    id: string;
    userId: string;
    consentId: string;
    granted: boolean;
    timestamp: string;
    version: string;
    method: 'explicit' | 'implicit';
    source: 'web' | 'mobile' | 'api';
}

export interface ConsentBannerConfig {
    enabled: boolean;
    position: 'top' | 'bottom';
    style: 'bar' | 'modal' | 'card';
    showOnEveryVisit: boolean;
    items: ConsentItem[];
}
