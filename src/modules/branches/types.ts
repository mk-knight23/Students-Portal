export type BranchStatus = 'active' | 'inactive' | 'maintenance';

export interface Branch {
    id: string;
    code: string;
    name: string;
    location: string;
    city: string;
    state: string;
    address: string;
    phone: string;
    email: string;
    status: BranchStatus;
    headId?: string;
    headName?: string;
    stats: {
        studentCount: number;
        staffCount: number;
        activeApplications: number;
        monthlyEnrollments: number;
    };
    operatingHours: {
        weekdays: string;
        saturday: string;
        sunday: string;
    };
    createdAt: string;
}

export interface BranchStaff {
    id: string;
    branchId: string;
    name: string;
    email: string;
    phone: string;
    role: 'branch_head' | 'senior_staff' | 'staff' | 'intern';
    department: string;
    joinedAt: string;
    status: 'active' | 'on_leave' | 'inactive';
}
