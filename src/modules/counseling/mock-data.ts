import { College } from './types';

const collegeNames = [
    "All India Institute of Medical Sciences",
    "Grant Medical College",
    "Seth GS Medical College",
    "Bangalore Medical College",
    "Madras Medical College",
    "BJ Medical College",
    "King George Medical University",
    "Christian Medical College",
    "Kasturba Medical College",
    "Amrita Institute of Medical Sciences"
];

const cities = ["New Delhi", "Mumbai", "Bangalore", "Chennai", "Pune", "Lucknow", "Vellore", "Manipal", "Kochi", "Ahmedabad"];
const states = ["Delhi", "Maharashtra", "Karnataka", "Tamil Nadu", "Maharashtra", "Uttar Pradesh", "Tamil Nadu", "Karnataka", "Kerala", "Gujarat"];

export const mockColleges: College[] = Array.from({ length: 100 }, (_, i) => {
    const baseName = collegeNames[i % collegeNames.length];
    const isDeemed = i % 4 === 0;

    return {
        id: `COL${String(i + 1).padStart(3, '0')}`,
        code: `MED${String(i + 1).padStart(3, '0')}`,
        name: i < 10 ? baseName : `${baseName} - Campus ${Math.floor(i / 10)}`,
        city: cities[i % cities.length],
        state: states[i % states.length],
        type: isDeemed ? 'deemed' : i % 3 === 0 ? 'government' : 'private',
        course: 'mbbs',
        fees: {
            tuition: isDeemed ? 2000000 + Math.random() * 500000 : 100000 + Math.random() * 1000000,
            hostel: 150000,
            other: 50000
        },
        seats: {
            total: 100 + Math.floor(Math.random() * 150),
            general: 50,
            obc: 30,
            sc: 15,
            st: 5,
            ews: 5
        }
    };
});
