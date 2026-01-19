const fs = require('fs');
const path = require('path');

const firstNames = ['Amit', 'Rahul', 'Sanjay', 'Priya', 'Sneha', 'Anjali', 'Vijay', 'Deepak', 'Arjun', 'Meera', 'Aditya', 'Vikram', 'Neha', 'Rohan', 'Karan', 'Pooja', 'Ishita', 'Sameer', 'Tanvi', 'Abhishek', 'Yash', 'Shruti', 'Varun', 'Sakshi', 'Manoj', 'Pranav', 'Riddhi', 'Gautam', 'Aishwarya', 'Vivek'];
const lastNames = ['Patil', 'Deshmukh', 'Kulkarni', 'Joshi', 'Chavan', 'Pawar', 'Shinde', 'Gaekwad', 'More', 'Phadke', 'Gadgil', 'Bhide', 'Mehta', 'Shah', 'Dube', 'Pandey', 'Mishra', 'Singh', 'Malhotra', 'Kapoor', 'Iyer', 'Menon', 'Reddy', 'Nair', 'Sharma', 'Verma', 'Gupta', 'Bose', 'Chatterjee', 'Das'];

const cities = [
    'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik',
    'Aurangabad', 'Solapur', 'Amravati', 'Navi Mumbai', 'Latur'
];

const categories = ['General', 'OBC', 'SC', 'ST', 'EWS', 'VJ/NT'];
const branches = ['Mumbai Main', 'Pune Tech', 'Nagpur Medical', 'Latur Hub', 'Thane Center', 'Nashik Node'];

function generateStudent(index) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const id = `ST${2026}${String(index + 1).padStart(3, '0')}`;
    const score = Math.floor(Math.random() * (720 - 300) + 300);
    const rank = Math.floor(Math.random() * 500000);
    const agencyIds = ['AG01', 'AG02', null];
    const referralAgentId = agencyIds[Math.floor(Math.random() * agencyIds.length)];

    return {
        id,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@example.com`,
        phone: `9${Math.floor(Math.random() * 900000000 + 100000000)}`,
        gender: Math.random() > 0.5 ? 'Male' : 'Female',
        dob: `${1995 + Math.floor(Math.random() * 15)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        aadhaar_masked: `XXXX XXXX ${Math.floor(Math.random() * 9000 + 1000)}`,
        apaar_id: `AP-${Math.floor(Math.random() * 100000000)}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        neet_score: score,
        neet_rank: rank,
        state: 'Maharashtra',
        city: city,
        status: ['Inquiry', 'Application', 'Documents', 'Verification', 'Counseling', 'Admission', 'Confirmed'][Math.floor(Math.random() * 7)],
        documents_verified: Math.random() > 0.3,
        branch: branches[Math.floor(Math.random() * branches.length)],
        registration_date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
        referral_agent_id: referralAgentId,
        preferences: [
            { collegeId: 'C-001', rank: 1 },
            { collegeId: 'C-002', rank: 2 }
        ],
        documents: [
            { id: 'DOC1', type: 'Aadhaar', status: 'Verified', url: '#' },
            { id: 'DOC2', type: 'NEET Result', status: 'Verified', url: '#' }
        ],
        counseling_registrations: ['Maharashtra State Quota'],
        academic_history: {
            class10: { board: 'SSC', year: '2020', percentage: 85 + Math.random() * 10 },
            class12: { board: 'HSC', year: '2022', percentage: 80 + Math.random() * 15 },
            neetDetails: { rollNo: `NEET${index}`, score: score, rank: rank }
        },
        payments: [
            { id: `PAY-REG-${index}`, amount: 5000, date: '2025-01-10', type: 'Other', method: 'UPI', status: 'Success' },
            { id: `PAY-TUI-${index}`, amount: 150000, date: '2025-02-15', type: 'Tuition', method: 'Bank Transfer', status: Math.random() > 0.5 ? 'Success' : 'Pending' },
            { id: `PAY-HOS-${index}`, amount: 85000, date: '2025-02-20', type: 'Hostel', method: 'Bank Transfer', status: Math.random() > 0.8 ? 'Success' : 'Pending' }
        ]
    };
}

const students = Array.from({ length: 100 }, (_, i) => generateStudent(i));

const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(path.join(dataDir, 'mock-students.json'), JSON.stringify(students, null, 2));
console.log('Generated 100 students in src/data/mock-students.json');
