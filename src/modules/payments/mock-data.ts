import type { FeeStructure, Payment } from './types';

export const feeStructure: FeeStructure[] = [
    {
        id: 'fee-registration',
        name: 'Registration Fee',
        type: 'registration',
        amount: 5000,
        dueDate: '2026-01-31',
        mandatory: true,
        description: 'One-time registration fee for admission process',
    },
    {
        id: 'fee-counseling-aiq',
        name: 'AIQ Counseling Fee',
        type: 'counseling',
        amount: 1000,
        dueDate: '2026-07-20',
        mandatory: false,
        description: 'All India Quota counseling registration fee',
    },
    {
        id: 'fee-counseling-state',
        name: 'State Counseling Fee',
        type: 'counseling',
        amount: 5000,
        dueDate: '2026-07-30',
        mandatory: false,
        description: 'State quota counseling registration fee',
    },
    {
        id: 'fee-counseling-deemed',
        name: 'Deemed University Counseling Fee',
        type: 'counseling',
        amount: 3000,
        dueDate: '2026-08-05',
        mandatory: false,
        description: 'Deemed university counseling registration fee',
    },
    {
        id: 'fee-tuition-govt',
        name: 'Tuition Fee (Government)',
        type: 'tuition',
        amount: 65000,
        dueDate: '2026-09-15',
        mandatory: true,
        description: 'Annual tuition fee for government medical college',
        lateFeePenalty: 500,
        lateFeeStartDate: '2026-09-16',
    },
    {
        id: 'fee-tuition-private',
        name: 'Tuition Fee (Private)',
        type: 'tuition',
        amount: 1500000,
        dueDate: '2026-09-15',
        mandatory: true,
        description: 'Annual tuition fee for private medical college',
        lateFeePenalty: 5000,
        lateFeeStartDate: '2026-09-16',
    },
    {
        id: 'fee-hostel',
        name: 'Hostel Fee',
        type: 'hostel',
        amount: 120000,
        dueDate: '2026-09-15',
        mandatory: false,
        description: 'Annual hostel accommodation fee',
    },
    {
        id: 'fee-exam',
        name: 'Examination Fee',
        type: 'exam',
        amount: 5000,
        dueDate: '2026-11-01',
        mandatory: true,
        description: 'University examination fee',
    },
];

// Generate mock payments for students
export const generateMockPayments = (studentId: string, workflowState: string): Payment[] => {
    const payments: Payment[] = [];
    const stateIndex = ['inquiry', 'application', 'documents', 'verification', 'counseling', 'payment', 'allotment', 'enrollment'].indexOf(workflowState);

    // Registration fee
    payments.push({
        id: `PAY-${studentId}-REG`,
        studentId,
        feeId: 'fee-registration',
        feeName: 'Registration Fee',
        type: 'registration',
        amount: 5000,
        status: stateIndex >= 1 ? 'paid' : 'unpaid',
        method: stateIndex >= 1 ? 'upi' : undefined,
        transactionId: stateIndex >= 1 ? `TXN${Date.now()}REG` : undefined,
        paidAt: stateIndex >= 1 ? new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString() : undefined,
        createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        dueDate: '2026-01-31',
        receiptNumber: stateIndex >= 1 ? `RCP${Date.now()}` : undefined,
    });

    // Counseling fee
    if (stateIndex >= 4) {
        payments.push({
            id: `PAY-${studentId}-CNSL`,
            studentId,
            feeId: 'fee-counseling-state',
            feeName: 'State Counseling Fee',
            type: 'counseling',
            amount: 5000,
            status: stateIndex >= 5 ? 'paid' : 'pending',
            method: stateIndex >= 5 ? 'bank_transfer' : undefined,
            paidAt: stateIndex >= 5 ? new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() : undefined,
            createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            dueDate: '2026-07-30',
        });
    }

    // Tuition fee
    if (stateIndex >= 6) {
        payments.push({
            id: `PAY-${studentId}-TUI`,
            studentId,
            feeId: 'fee-tuition-govt',
            feeName: 'Tuition Fee',
            type: 'tuition',
            amount: 65000,
            status: stateIndex >= 7 ? 'paid' : 'pending',
            method: stateIndex >= 7 ? 'neft' : undefined,
            paidAt: stateIndex >= 7 ? new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() : undefined,
            createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
            dueDate: '2026-09-15',
        });
    }

    return payments;
};

const mockData = { feeStructure, generateMockPayments };
export default mockData;
