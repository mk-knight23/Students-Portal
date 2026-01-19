export interface Staff {
    id: string;
    name: string;
    role: 'staff' | 'head' | 'admin';
    branchId: string;
    email: string;
}
