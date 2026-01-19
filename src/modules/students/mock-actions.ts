import type { StudentProfile, StudentWorkflowState, DocumentSlotState, PaymentState } from './types';

// Mock delay to simulate API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Workflow state transitions
const workflowTransitions: Record<StudentWorkflowState, StudentWorkflowState | null> = {
    inquiry: 'application',
    application: 'documents',
    documents: 'verification',
    verification: 'counseling',
    counseling: 'payment',
    payment: 'allotment',
    allotment: 'enrollment',
    enrollment: null, // Final state
};

export const studentActions = {
    /**
     * Advance student to the next workflow state
     */
    advanceWorkflow: async (
        student: StudentProfile
    ): Promise<{ success: boolean; newState?: StudentWorkflowState; error?: string }> => {
        await delay(500);

        const nextState = workflowTransitions[student.workflowState];
        if (!nextState) {
            return { success: false, error: 'Student is already in final state' };
        }

        // Validate preconditions
        if (student.workflowState === 'documents' && !student.documents.every(d => d.status !== 'pending')) {
            return { success: false, error: 'All documents must be uploaded before verification' };
        }

        if (student.workflowState === 'verification' && !student.documentsVerified) {
            return { success: false, error: 'Documents must be verified before counseling' };
        }

        return { success: true, newState: nextState };
    },

    /**
     * Update document slot status
     */
    updateDocumentStatus: async (
        _studentId: string,
        _documentId: string,
        _newStatus: DocumentSlotState,
        _metadata?: { verifiedBy?: string; rejectionReason?: string }
    ): Promise<{ success: boolean; error?: string }> => {
        await delay(300);

        // Validate transition
        // Validate transition logic commented out for mock
        // const validTransitions: Record<DocumentSlotState, DocumentSlotState[]> = { ... };

        return { success: true };
    },

    /**
     * Update payment status
     */
    updatePaymentStatus: async (
        _studentId: string,
        _paymentId: string,
        _newStatus: PaymentState,
        _metadata?: { transactionId?: string; method?: string }
    ): Promise<{ success: boolean; error?: string }> => {
        await delay(300);

        return { success: true };
    },

    /**
     * Register for counseling type
     */
    registerForCounseling: async (
        studentId: string,
        counselingType: string
    ): Promise<{ success: boolean; registrationId?: string; error?: string }> => {
        await delay(500);

        return {
            success: true,
            registrationId: `REG-${counselingType.toUpperCase()}-${Date.now()}`
        };
    },

    /**
     * Submit preference list
     */
    submitPreferences: async (
        studentId: string,
        preferences: Array<{ collegeId: string; rank: number }>
    ): Promise<{ success: boolean; error?: string }> => {
        await delay(500);

        if (preferences.length === 0) {
            return { success: false, error: 'At least one preference is required' };
        }

        return { success: true };
    },

    /**
     * Lock preference list (cannot be changed after locking)
     */
    lockPreferences: async (
        _studentId: string
    ): Promise<{ success: boolean; error?: string }> => {
        await delay(500);

        return { success: true };
    },
};

export default studentActions;
