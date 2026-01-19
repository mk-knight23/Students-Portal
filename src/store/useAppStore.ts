import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AcademicHistory {
    class10: { board: string; year: string; percentage: number; marksheetUrl?: string };
    class12: { board: string; year: string; percentage: number; marksheetUrl?: string };
    neetDetails: { rollNo: string; score: number; rank: number; admitCardUrl?: string };
}

export interface PaymentRecord {
    id: string;
    amount: number;
    date: string;
    type: 'Tuition' | 'Hostel' | 'Other';
    method: 'UPI' | 'Bank Transfer' | 'Cash';
    status: 'Success' | 'Pending' | 'Failed';
}

export interface Student {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: 'Male' | 'Female' | 'Other';
    dob: string;
    aadhaar_masked: string;
    apaar_id?: string;
    category: string;
    neet_score: number;
    neet_rank: number;
    state: string;
    status: 'Inquiry' | 'Application' | 'Documents' | 'Verification' | 'Counseling' | 'Admission' | 'Confirmed';
    documents_verified: boolean;
    branch: string;
    registration_date: string;
    preferences: { collegeId: string; rank: number }[];
    documents: { id: string; type: string; status: 'Pending' | 'Verified' | 'Rejected'; url: string }[];
    counseling_registrations: string[];
    academic_history?: AcademicHistory;
    payments?: PaymentRecord[];
    referral_agent_id?: string;
    city: string;
}

export interface Branch {
    id: string;
    name: string;
    location: string;
    studentCount: number;
}

export interface Agency {
    id: string;
    name: string;
    contactPerson: string;
    phone: string;
    email: string;
    commissions: number;
    studentsReferred: number;
}

export interface Staff {
    id: string;
    name: string;
    role: 'Admin' | 'Office Head' | 'Staff';
    branchId: string;
    email: string;
}

export type UserRole = 'admin' | 'staff' | 'student' | 'parent' | 'agent';

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
    agencies: Agency[];
    staff: Staff[];
    notifications: Notification[];
    currentUser: {
        id: string;
        name: string;
        role: UserRole;
        branchId?: string;
    } | null;

    // Actions
    addStudent: (student: Omit<Student, 'id' | 'registration_date'>) => void;
    updateStudent: (id: string, data: Partial<Student>) => void;
    deleteStudent: (id: string) => void;
    setRole: (role: UserRole) => void;
    setCurrentUser: (user: AppState['currentUser']) => void;
    logout: () => void;

    // Management Actions
    addAgency: (agency: Agency) => void;
    updateAgency: (id: string, data: Partial<Agency>) => void;
    addStaff: (staff: Staff) => void;

    // Communication Actions
    addNotification: (notification: Omit<Notification, 'id' | 'date' | 'read'>) => void;
    markAsRead: (id: string) => void;

    // Branch Context
    activeBranch: string;
    setActiveBranch: (branch: string) => void;
}

import studentsV3 from "../data/mock-students.json"

export const useAppStore = create<AppState>()(
    persist(
        (set) => ({
            students: studentsV3 as Student[],
            branches: [
                { id: "BR01", name: "Latur Hub", location: "Latur, Maharashtra", studentCount: 1248 },
                { id: "BR02", name: "Pune Center", location: "Pune, Maharashtra", studentCount: 850 },
                { id: "BR03", name: "Bangalore", location: "Bangalore, KA", studentCount: 420 },
            ],
            agencies: [
                { id: "AG01", name: "Global Med Ed", contactPerson: "Rajesh Kumar", phone: "+91 99887 76655", email: "rajesh@globalmed.com", commissions: 45000, studentsReferred: 12 },
                { id: "AG02", name: "Elite Admissions", contactPerson: "Anita Deshpande", phone: "+91 88776 65544", email: "anita@elite.com", commissions: 32000, studentsReferred: 8 },
            ],
            staff: [
                { id: "STF01", name: "Priya Sharma", role: "Office Head", branchId: "BR01", email: "priya@ame.com" },
                { id: "STF02", name: "Rahul Verma", role: "Staff", branchId: "BR01", email: "rahul@ame.com" },
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
                    registration_date: new Date().toISOString(),
                    preferences: studentData.preferences || [],
                    documents: studentData.documents || [],
                    counseling_registrations: studentData.counseling_registrations || [],
                    academic_history: studentData.academic_history,
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

            addAgency: (agency) => set((state) => ({ agencies: [...state.agencies, agency] })),
            updateAgency: (id, data) => set((state) => ({
                agencies: state.agencies.map((a) => (a.id === id ? { ...a, ...data } : a))
            })),
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

            activeBranch: "Latur",
            setActiveBranch: (branch) => set({ activeBranch: branch }),
        }),
        {
            name: 'ame-portal-storage',
        }
    )
);
