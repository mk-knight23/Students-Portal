export type PaymentState = 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';
export type PaymentType = 'registration' | 'counseling' | 'tuition' | 'hostel' | 'exam' | 'other';
export type PaymentMethod = 'upi' | 'bank_transfer' | 'card' | 'neft' | 'rtgs' | 'cash' | 'cheque';

export interface FeeStructure {
    id: string;
    name: string;
    type: PaymentType;
    amount: number;
    dueDate: string;
    mandatory: boolean;
    description: string;
    lateFeePenalty?: number;
    lateFeeStartDate?: string;
}

export interface Payment {
    id: string;
    studentId: string;
    feeId: string;
    feeName: string;
    type: PaymentType;
    amount: number;
    status: PaymentState;
    method?: PaymentMethod;
    transactionId?: string;
    gatewayRef?: string;
    paidAt?: string;
    createdAt: string;
    dueDate: string;
    receiptNumber?: string;
    receiptUrl?: string;
    refundedAt?: string;
    refundReason?: string;
    remarks?: string;
}

export interface PaymentSummary {
    studentId: string;
    totalDue: number;
    totalPaid: number;
    totalPending: number;
    overdueFees: number;
    nextDueDate?: string;
    nextDueAmount?: number;
}

export interface PaymentReceipt {
    receiptNumber: string;
    studentId: string;
    studentName: string;
    paymentId: string;
    amount: number;
    method: PaymentMethod;
    transactionId: string;
    date: string;
    description: string;
    issuedBy: string;
    branchName: string;
}
