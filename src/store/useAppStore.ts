import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { StudentProfile as Student, StudentWorkflowState, DocumentSlotState, PaymentState } from '@/modules/students/types'
import { mockStudents } from '@/modules/students/mock-data'
import { mockStaff, mockHeads } from '@/modules/staff/mock-data'

export type { Student }

export interface Branch {
    id: string;
    name: string;
    location: string;
    studentCount: number;
}



export interface Staff {
    id: string;
    name: string;
    role: 'admin' | 'head' | 'staff';
    branchId: string;
    email: string;
}

export type UserRole = 'admin' | 'staff' | 'student' | 'head';

export interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'Info' | 'Success' | 'Warning' | 'Error';
    date: string;
    read: boolean;
    recipientId?: string; // If null, it's global
}

interface AppState {
    students: Student[];
    branches: Branch[];
    staff: Staff[];
    notifications: Notification[];
    currentUser: {
        id: string;
        name: string;
        role: UserRole;
        branchId?: string;
    } | null;

    // Actions
    addStudent: (student: Omit<Student, 'id' | 'registrationDate'>) => void;
    updateStudent: (id: string, data: Partial<Student>) => void;
    deleteStudent: (id: string) => void;
    setRole: (role: UserRole) => void;
    setCurrentUser: (user: AppState['currentUser']) => void;
    logout: () => void;

    // Management Actions
    addStaff: (staff: Staff) => void;

    // Communication Actions
    addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
    markAsRead: (id: string) => void;

    // Auth Actions
    login: (role: UserRole) => void;

    // State Machine Actions
    advanceStudentWorkflow: (id: string, nextState: StudentWorkflowState) => void;
    updateDocumentSlot: (studentId: string, docId: string, status: DocumentSlotState) => void;
    updatePaymentStatus: (studentId: string, paymentId: string, status: PaymentState) => void;

    // Branch Context
    activeBranch: string;
    setActiveBranch: (branch: string) => void;
}

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            students: mockStudents,
            // ... (rest of initial state remains same, we just inject actions)

            // Re-adding existing actions for context, but only replacing interface and adding new actions in implementation below

            advanceStudentWorkflow: (id, nextState) => set((state) => ({
                students: state.students.map((s) => s.id === id ? { ...s, workflowState: nextState } : s)
            })),

            updateDocumentSlot: (studentId, docId, status) => set((state) => ({
                students: state.students.map((s) => {
                    if (s.id !== studentId) return s;
                    return {
                        ...s,
                        documents: s.documents.map(d => d.id === docId ? { ...d, status } : d)
                    };
                })
            })),

            updatePaymentStatus: (studentId, paymentId, status) => set((state) => ({
                students: state.students.map((s) => {
                    if (s.id !== studentId) return s;
                    return {
                        ...s,
                        payments: s.payments?.map(p => p.id === paymentId ? { ...p, status } : p) || []
                    };
                })
            })),

            branches: [
                { id: "BR01", name: "Latur Hub", location: "Latur, Maharashtra", studentCount: 1248 },
                { id: "BR02", name: "Pune Center", location: "Pune, Maharashtra", studentCount: 850 },
                { id: "BR03", name: "Bangalore", location: "Bangalore, KA", studentCount: 420 },
            ],
            staff: [
                ...mockStaff,
                ...mockHeads,
                { id: "ADM001", name: "Super Admin", role: "admin", branchId: "Global", email: "admin@ame.com" }
            ],
            notifications: [
                { id: "NT01", title: "K-EA Portal Open", message: "Karnataka state preferences are now live.", type: "Info", date: new Date().toISOString(), read: false },
                { id: "NT02", title: "Document Verified", message: "Your NEET Scorecard has been verified by the Latur Hub.", type: "Success", date: new Date().toISOString(), read: false },
            ],
            currentUser: {
                id: "ADM001",
                name: "Super Admin",
                role: "admin"
            },

            addStudent: (studentData) => set((state) => {
                const id = `ST${new Date().getFullYear()}${String(state.students.length + 1).padStart(3, '0')}`;
                const newStudent: Student = {
                    ...studentData,
                    id,
                    registrationDate: new Date().toISOString(),
                    preferences: studentData.preferences || [],
                    documents: studentData.documents || [],
                    counselingRegistrations: studentData.counselingRegistrations || [],
                    academicHistory: studentData.academicHistory!,
                    payments: studentData.payments || []
                };
                return { students: [...state.students, newStudent] };
            }),

            updateStudent: (id, data) => set((state) => ({
                students: state.students.map((s) => (s.id === id ? { ...s, ...data } : s))
            })),

            deleteStudent: (id) => set((state) => ({
                students: state.students.filter((s) => s.id !== id)
            })),

            setRole: (role) => set((state) => {
                const current = state.currentUser;
                if (!current) return { currentUser: null };
                return {
                    currentUser: {
                        ...current,
                        role
                    }
                };
            }),

            setCurrentUser: (user) => set({ currentUser: user }),

            logout: () => set({ currentUser: null }),

            addStaff: (staff) => set((state) => ({ staff: [...state.staff, staff] })),

            addNotification: (n) => set((state) => ({
                notifications: [
                    { ...n, id: `NT${state.notifications.length + 1}`, date: new Date().toISOString(), read: false },
                    ...state.notifications
                ]
            })),
            markAsRead: (id) => set((state) => ({
                notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
            })),

            login: (role) => set(() => {
                // Pick a student in 'counseling' stage for a better demo experience
                const demoStudent = mockStudents.find(s => s.workflowState === 'counseling') || mockStudents[0];
                const demoStaff = mockStaff[0];
                const demoHead = mockHeads[0];

                const mockUsers: Record<UserRole, AppState['currentUser']> = {
                    student: {
                        id: demoStudent.id,
                        name: demoStudent.name,
                        role: "student",
                        branchId: demoStudent.branchId
                    },
                    admin: { id: "ADM001", name: "Super Admin", role: "admin" },
                    staff: {
                        id: demoStaff.id,
                        name: demoStaff.name,
                        role: "staff",
                        branchId: demoStaff.branchId
                    },
                    head: {
                        id: demoHead.id,
                        name: demoHead.name,
                        role: "head",
                        branchId: demoHead.branchId
                    }
                };
                return { currentUser: mockUsers[role] };
            }),

            activeBranch: "Latur",
            setActiveBranch: (branch) => set({ activeBranch: branch }),
        }),
        {
            name: 'ame-portal-demo-v0.3.2',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);
