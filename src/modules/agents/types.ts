export type AgentStatus = 'active' | 'inactive' | 'suspended' | 'pending_verification';
export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'cancelled';

export interface Agent {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: AgentStatus;
    registeredAt: string;
    zone: string;
    city: string;
    state: string;
    panNumber?: string;
    bankDetails?: {
        accountNumber: string;
        ifsc: string;
        bankName: string;
        accountHolder: string;
    };
    stats: {
        totalReferrals: number;
        activeStudents: number;
        conversions: number;
        totalEarnings: number;
        pendingCommissions: number;
    };
}

export interface Referral {
    id: string;
    agentId: string;
    studentId: string;
    studentName: string;
    referredAt: string;
    status: 'pending' | 'active' | 'enrolled' | 'dropped';
    currentStage: string;
    college?: string;
    commissionEligible: boolean;
}

export interface Commission {
    id: string;
    agentId: string;
    referralId: string;
    studentId: string;
    studentName: string;
    amount: number;
    status: CommissionStatus;
    createdAt: string;
    approvedAt?: string;
    approvedBy?: string;
    paidAt?: string;
    transactionId?: string;
    remarks?: string;
}
