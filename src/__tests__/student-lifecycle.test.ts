import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../store/useAppStore';

describe('Student Lifecycle State Machine', () => {
    const initialState = useAppStore.getState();

    beforeEach(() => {
        useAppStore.setState(initialState);
    });

    it('advances student workflow status', () => {
        const store = useAppStore.getState();
        // Create a test student
        store.addStudent({
            name: "Test User",
            email: "test@example.com",
            phone: "9999999999",
            gender: "male",
            dob: "2000-01-01",
            aadhaarMasked: "XXXX-XXXX-1234",
            category: "general",
            academicHistory: {
                neet: { score: 500, rank: 10000, rollNo: 'TEST1234', year: '2025' },
                class12: { percentage: 85, board: 'CBSE', year: '2024', stream: 'Science' },
                class10: { percentage: 90, board: 'CBSE', year: '2022' }
            },
            state: "Maharashtra",
            workflowState: "inquiry",
            documentsVerified: false,
            branchId: "BR01",
            preferences: [],
            documents: [],
            counselingRegistrations: [],
            city: "Test City"
        });

        // Get the new student ID
        const studentId = useAppStore.getState().students.find(s => s.email === "test@example.com")?.id;
        if (!studentId) throw new Error("Student not created");

        // Advance workflow
        useAppStore.getState().advanceStudentWorkflow(studentId, 'application');

        // Verify status
        const updatedStudent = useAppStore.getState().students.find(s => s.id === studentId);
        expect(updatedStudent?.workflowState).toBe('application');
    });

    it('updates document slot status', () => {
        const store = useAppStore.getState();
        store.addStudent({
            name: "Doc Test",
            email: "doc@example.com",
            phone: "9999999999",
            gender: "male",
            dob: "2000-01-01",
            aadhaarMasked: "XXXX-XXXX-1234",
            category: "general",
            academicHistory: {
                neet: { score: 500, rank: 10000, rollNo: 'TEST1234', year: '2025' },
                class10: { percentage: 90, board: 'CBSE', year: '2022' },
                class12: { percentage: 85, board: 'CBSE', year: '2024', stream: 'science' }
            },
            state: "Maharashtra",
            workflowState: "documents",
            documentsVerified: false,
            branchId: "BR01",
            preferences: [],
            documents: [{ id: 'doc1', type: 'aadhaar', status: 'pending', url: '' }],
            counselingRegistrations: [],
            city: "Test City"
        });

        const studentId = useAppStore.getState().students.find(s => s.email === "doc@example.com")?.id;
        if (!studentId) throw new Error("Student not created");

        // Update doc status
        useAppStore.getState().updateDocumentSlot(studentId, 'doc1', 'verified');

        const updatedStudent = useAppStore.getState().students.find(s => s.id === studentId);
        expect(updatedStudent?.documents[0].status).toBe('verified');
    });

    it('updates payment status', () => {
        const store = useAppStore.getState();
        store.addStudent({
            name: "Pay Test",
            email: "pay@example.com",
            phone: "9999999999",
            gender: "male",
            dob: "2000-01-01",
            aadhaarMasked: "XXXX-XXXX-1234",
            category: "general",
            academicHistory: {
                neet: { score: 500, rank: 10000, rollNo: 'TEST1234', year: '2025' },
                class12: { percentage: 85, board: 'CBSE', year: '2024', stream: 'Science' },
                class10: { percentage: 90, board: 'CBSE', year: '2022' }
            },
            state: "Maharashtra",
            workflowState: "payment",
            documentsVerified: true,
            branchId: "BR01",
            preferences: [],
            documents: [],
            counselingRegistrations: [],
            payments: [{ id: 'pay1', amount: 5000, type: 'tuition', method: 'upi', status: 'unpaid' }],
            city: "Test City"
        });

        const studentId = useAppStore.getState().students.find(s => s.email === "pay@example.com")?.id;
        if (!studentId) throw new Error("Student not created");

        useAppStore.getState().updatePaymentStatus(studentId, 'pay1', 'paid');

        const updatedStudent = useAppStore.getState().students.find(s => s.id === studentId);
        expect(updatedStudent?.payments?.[0].status).toBe('paid');
    });
});
