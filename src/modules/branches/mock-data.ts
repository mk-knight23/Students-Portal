import type { Branch } from './types';

export const mockBranches: Branch[] = [
    {
        id: 'BR01',
        code: 'LTR',
        name: 'Latur Hub',
        location: 'Latur, Maharashtra',
        city: 'Latur',
        state: 'Maharashtra',
        address: '123 Main Road, Near Bus Stand, Latur 413512',
        phone: '+91 2382 123456',
        email: 'latur@ameportal.com',
        status: 'active',
        headId: 'STF001',
        headName: 'Priya Sharma',
        stats: {
            studentCount: 1248,
            staffCount: 12,
            activeApplications: 312,
            monthlyEnrollments: 45,
        },
        operatingHours: {
            weekdays: '9:00 AM - 7:00 PM',
            saturday: '9:00 AM - 5:00 PM',
            sunday: 'Closed',
        },
        createdAt: '2022-01-15',
    },
    {
        id: 'BR02',
        code: 'PUN',
        name: 'Pune Center',
        location: 'Pune, Maharashtra',
        city: 'Pune',
        state: 'Maharashtra',
        address: '456 FC Road, Shivaji Nagar, Pune 411004',
        phone: '+91 20 12345678',
        email: 'pune@ameportal.com',
        status: 'active',
        headId: 'STF003',
        headName: 'Vikram Patil',
        stats: {
            studentCount: 850,
            staffCount: 8,
            activeApplications: 245,
            monthlyEnrollments: 32,
        },
        operatingHours: {
            weekdays: '9:00 AM - 7:00 PM',
            saturday: '10:00 AM - 4:00 PM',
            sunday: 'Closed',
        },
        createdAt: '2022-06-20',
    },
    {
        id: 'BR03',
        code: 'BLR',
        name: 'Bangalore Center',
        location: 'Bangalore, Karnataka',
        city: 'Bangalore',
        state: 'Karnataka',
        address: '789 MG Road, Indiranagar, Bangalore 560038',
        phone: '+91 80 98765432',
        email: 'bangalore@ameportal.com',
        status: 'active',
        headId: 'STF005',
        headName: 'Ananya Rao',
        stats: {
            studentCount: 420,
            staffCount: 6,
            activeApplications: 156,
            monthlyEnrollments: 18,
        },
        operatingHours: {
            weekdays: '9:30 AM - 6:30 PM',
            saturday: '10:00 AM - 3:00 PM',
            sunday: 'Closed',
        },
        createdAt: '2023-03-10',
    },
];

export const getBranchById = (id: string) => mockBranches.find(b => b.id === id);
export const getActiveBranches = () => mockBranches.filter(b => b.status === 'active');

export default mockBranches;
