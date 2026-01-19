import { Staff } from './types';

const firstNames = ['Amit', 'Priya', 'Sanjay', 'Deepa', 'Rahul', 'Anjali', 'Vikram', 'Sneha', 'Arjun', 'Kavita', 'Manoj', 'Ritu', 'Sunil', 'Meera', 'Rajesh', 'Pooja', 'Alok', 'Swati', 'Nitin', 'Divya'];
const lastNames = ['Sharma', 'Verma', 'Patil', 'Deshmukh', 'Kulkarni', 'Joshi', 'Mehta', 'Gupta', 'Singh', 'Reddy', 'Iyer', 'Nair', 'Rao', 'Patel', 'Das', 'Chatterjee', 'Banerjee', 'Misra', 'Trivedi', 'Pandey'];
const branches = ['BR01', 'BR02', 'BR03', 'BR04', 'BR05'];

export const mockStaff: Staff[] = Array.from({ length: 100 }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[Math.floor(i / firstNames.length) % lastNames.length];
    return {
        id: `STF${String(i + 1).padStart(3, '0')}`,
        name: `${firstName} ${lastName}`,
        role: 'staff',
        branchId: branches[i % branches.length],
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@ameportal.com`
    };
});

export const mockHeads: Staff[] = Array.from({ length: 100 }, (_, i) => {
    const firstName = firstNames[(i + 5) % firstNames.length];
    const lastName = lastNames[Math.floor((i + 5) / firstNames.length) % lastNames.length];
    return {
        id: `HED${String(i + 1).padStart(3, '0')}`,
        name: `${firstName} ${lastName}`,
        role: 'head',
        branchId: branches[i % branches.length],
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}.head@ameportal.com`
    };
});
