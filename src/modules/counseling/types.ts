export type CounselingType =
    | 'state_85'
    | 'aiq'
    | 'deemed'
    | 'open_state_ka'
    | 'open_state_kl'
    | 'open_state_up'
    | 'open_state_tn'
    | 'management'
    | 'nri';

export type CounselingStatus =
    | 'not_started'
    | 'registration_open'
    | 'registration_closed'
    | 'choice_filling'
    | 'choice_locked'
    | 'allotment_round'
    | 'seat_acceptance'
    | 'completed';

export type AllotmentStatus =
    | 'not_allotted'
    | 'allotted'
    | 'accepted'
    | 'rejected'
    | 'upgraded'
    | 'floated'
    | 'resigned';

export interface CounselingSession {
    id: string;
    type: CounselingType;
    name: string;
    description: string;
    state?: string;
    year: number;
    rounds: number;
    currentRound: number;
    status: CounselingStatus;
    registrationFee: number;
    importantDates: {
        registrationStart: string;
        registrationEnd: string;
        choiceFillingStart: string;
        choiceFillingEnd: string;
        round1Result?: string;
        round2Result?: string;
        round3Result?: string;
    };
    eligibility: {
        minNeetScore?: number;
        maxNeetRank?: number;
        categories: string[];
        domicileRequired?: boolean;
    };
}

export interface College {
    id: string;
    code: string;
    name: string;
    state: string;
    city: string;
    type: 'government' | 'private' | 'deemed';
    course: 'mbbs' | 'bds' | 'ayush';
    fees: {
        tuition: number;
        hostel?: number;
        other?: number;
    };
    seats: {
        total: number;
        general: number;
        obc: number;
        sc: number;
        st: number;
        ews: number;
        management?: number;
        nri?: number;
    };
    cutoffs?: {
        year: number;
        general: { openingRank: number; closingRank: number };
        obc?: { openingRank: number; closingRank: number };
        sc?: { openingRank: number; closingRank: number };
        st?: { openingRank: number; closingRank: number };
    }[];
}

export interface StudentPreference {
    id: string;
    studentId: string;
    sessionId: string;
    preferences: {
        rank: number;
        collegeId: string;
        collegeName: string;
        locked: boolean;
    }[];
    submittedAt?: string;
    lockedAt?: string;
}

export interface AllotmentResult {
    id: string;
    studentId: string;
    sessionId: string;
    round: number;
    collegeId: string;
    collegeName: string;
    preferenceRank: number;
    allottedAt: string;
    status: AllotmentStatus;
    reportingDeadline: string;
    feeDeadline: string;
    actions: ('accept' | 'reject' | 'float' | 'upgrade')[];
}
