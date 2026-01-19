import type { StudentProfile, CasteCategory, StudentWorkflowState, CounselingType, DocumentSlotState, PaymentState } from './types';

// Generate 50 realistic mock students with full lifecycle data
const categories: CasteCategory[] = ['general', 'obc', 'sc', 'st', 'ews'];
const states = ['Maharashtra', 'Karnataka', 'Kerala', 'Tamil Nadu', 'Gujarat', 'Rajasthan', 'Uttar Pradesh', 'Delhi', 'Madhya Pradesh', 'Andhra Pradesh'];
export const workflowStates: StudentWorkflowState[] = ['inquiry', 'application', 'documents', 'verification', 'counseling', 'payment', 'allotment', 'enrollment'];
const counselingTypes: CounselingType[] = ['state_85', 'aiq', 'deemed', 'open_state_ka', 'management', 'nri'];

const firstNames = ['Aditya', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Ananya', 'Rohan', 'Kavya', 'Arjun', 'Ishita', 'Shivam', 'Pooja', 'Kunal', 'Shruti', 'Harsh', 'Nikita', 'Amit', 'Riya', 'Varun', 'Megha'];
const lastNames = ['Sharma', 'Patel', 'Kulkarni', 'Reddy', 'Iyer', 'Verma', 'Singh', 'Deshmukh', 'Nair', 'Rao', 'Joshi', 'Mehta', 'Kapoor', 'Gupta', 'Patil'];
const cities: Record<string, string[]> = {
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Latur', 'Aurangabad'],
    'Karnataka': ['Bangalore', 'Mysore', 'Mangalore', 'Hubli'],
    'Kerala': ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi'],
    'Delhi': ['New Delhi', 'Noida', 'Gurgaon'],
    'Madhya Pradesh': ['Bhopal', 'Indore', 'Gwalior'],
    'Andhra Pradesh': ['Hyderabad', 'Visakhapatnam', 'Vijayawada']
};

const documentTypes = [
    'aadhaar', 'class_10_marksheet', 'class_12_marksheet', 'neet_scorecard',
    'neet_admit_card', 'domicile_certificate', 'passport_photo'
] as const;

const generateMaskedAadhaar = (): string => {
    return `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`;
};

const generateApaarId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateDocuments = (workflowState: StudentWorkflowState, studentIdx: number) => {
    const stateIndex = workflowStates.indexOf(workflowState);

    return documentTypes.map((type, idx) => {
        let status: DocumentSlotState = 'pending';

        if (stateIndex >= 2) { // documents stage or beyond
            if (idx < stateIndex) {
                status = 'verified';
            } else if (idx === stateIndex) {
                status = stateIndex >= 3 ? 'reviewed' : 'uploaded';
            } else {
                status = Math.random() > 0.5 ? 'uploaded' : 'pending';
            }
        }

        return {
            id: `DOC-${type.toUpperCase()}-${studentIdx}-${idx}`,
            type,
            status,
            url: status !== 'pending' ? `/mock/documents/${type}.pdf` : undefined,
            uploadedAt: status !== 'pending' ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
            verifiedAt: status === 'verified' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        };
    });
};

const generatePayments = (workflowState: StudentWorkflowState, studentIdx: number) => {
    const stateIndex = workflowStates.indexOf(workflowState);
    const payments = [];

    // Registration fee
    payments.push({
        id: `PAY-REG-${studentIdx}-${Date.now()}`,
        type: 'registration' as const,
        amount: 5000,
        status: stateIndex >= 1 ? 'paid' as PaymentState : 'unpaid' as PaymentState,
        method: stateIndex >= 1 ? 'upi' as const : undefined,
        paidAt: stateIndex >= 1 ? new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString() : undefined,
    });

    // Counseling fee
    if (stateIndex >= 4) {
        payments.push({
            id: `PAY-CNSL-${studentIdx}-${Date.now()}`,
            type: 'counseling' as const,
            amount: 15000,
            status: stateIndex >= 5 ? 'paid' as PaymentState : 'unpaid' as PaymentState,
            method: stateIndex >= 5 ? 'bank_transfer' as const : undefined,
            paidAt: stateIndex >= 5 ? new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        });
    }

    // Tuition fee
    if (stateIndex >= 6) {
        payments.push({
            id: `PAY-TUI-${studentIdx}-${Date.now()}`,
            type: 'tuition' as const,
            amount: 500000 + Math.floor(Math.random() * 200000),
            status: stateIndex >= 7 ? 'paid' as PaymentState : 'unpaid' as PaymentState,
            method: stateIndex >= 7 ? 'neft' as const : undefined,
            paidAt: stateIndex >= 7 ? new Date(Date.now() - Math.random() * 14 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        });
    }

    return payments;
};

// Expand to 100 students
export const mockStudents: StudentProfile[] = Array.from({ length: 100 }, (_, i) => {
    const state = states[i % states.length];
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    const gender = i % 3 === 0 ? 'female' : i % 3 === 1 ? 'male' : ('other' as 'male' | 'female' | 'other');
    const workflowState = workflowStates[Math.floor(i / (100 / workflowStates.length))];
    const category = categories[i % categories.length];
    const neetScore = 550 + Math.floor(Math.random() * 170);
    const neetRank = Math.floor(10000 + Math.random() * 100000);

    return {
        id: `ST2026${String(i + 1).padStart(4, '0')}`,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
        phone: `+91 ${9000000000 + Math.floor(Math.random() * 999999999)}`,
        gender,
        dob: `${2004 + Math.floor(Math.random() * 3)}-${String(1 + Math.floor(Math.random() * 12)).padStart(2, '0')}-${String(1 + Math.floor(Math.random() * 28)).padStart(2, '0')}`,
        aadhaarMasked: generateMaskedAadhaar(),
        apaarId: Math.random() > 0.5 ? generateApaarId() : undefined,
        category,
        state,
        city: cities[state]?.[Math.floor(Math.random() * (cities[state]?.length || 1))] || 'Unknown',

        workflowState,
        registrationDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),

        academicHistory: {
            class10: {
                board: ['CBSE', 'ICSE', 'State Board'][Math.floor(Math.random() * 3)],
                year: '2022',
                percentage: 75 + Math.floor(Math.random() * 20),
            },
            class12: {
                board: ['CBSE', 'ICSE', 'State Board'][Math.floor(Math.random() * 3)],
                year: '2024',
                percentage: 70 + Math.floor(Math.random() * 25),
                stream: 'PCB',
            },
            neet: {
                rollNo: `NEET${2026}${String(i + 1).padStart(6, '0')}`,
                score: neetScore,
                rank: neetRank,
                percentile: 90 + Math.random() * 9.9,
                year: '2026',
            },
        },

        documents: generateDocuments(workflowState, i),
        documentsVerified: workflowStates.indexOf(workflowState) >= 3,

        counselingRegistrations: [counselingTypes[i % counselingTypes.length]],
        preferences: workflowStates.indexOf(workflowState) >= 4 ? [
            {
                collegeId: `COL${String(i + 1).padStart(3, '0')}`,
                collegeName: `Medical College ${i + 1}`,
                rank: 1,
                type: counselingTypes[i % counselingTypes.length],
                status: workflowStates.indexOf(workflowState) >= 6 ? 'allotted' : 'selected',
            }
        ] : [],
        allottedCollege: workflowStates.indexOf(workflowState) >= 6 ? `Medical College ${i + 1}` : undefined,

        payments: generatePayments(workflowState, i),

        branchId: ['BR01', 'BR02', 'BR03', 'BR04', 'BR05'][i % 5],
    };
});

export default mockStudents;
