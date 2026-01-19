import { Student } from "@/store/useAppStore";

export function calculateDashboardStats(students: Student[]) {
    const total = students.length;
    const verified = students.filter(s => s.documents_verified).length;
    const pending = total - verified;

    const genderDist = {
        male: students.filter(s => s.gender === 'Male').length,
        female: students.filter(s => s.gender === 'Female').length,
        other: students.filter(s => s.gender === 'Other').length,
    };

    const categoryDist = students.reduce((acc, s) => {
        acc[s.category] = (acc[s.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const registrationDist = students.reduce((acc, s) => {
        s.counseling_registrations.forEach(reg => {
            acc[reg] = (acc[reg] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    // Geographic Distribution
    const stateDist = students.reduce((acc, s) => {
        acc[s.state] = (acc[s.state] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const cityDist = students.reduce((acc, s) => {
        acc[s.city] = (acc[s.city] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Financial Stats
    const totalRevenueTarget = 25000000; // 2.5 Cr target
    const allPayments = students.flatMap(s => s.payments || []);
    const collectedRevenue = allPayments
        .filter(p => p.status === 'Success')
        .reduce((sum, p) => sum + p.amount, 0);

    const pendingRevenue = allPayments
        .filter(p => p.status === 'Pending')
        .reduce((sum, p) => sum + p.amount, 0);

    const successfulPaymentsCount = allPayments.filter(p => p.status === 'Success').length;
    const totalPaymentsCount = allPayments.length;
    const paymentVelocity = totalPaymentsCount > 0 ? (successfulPaymentsCount / totalPaymentsCount) * 100 : 0;

    // Agency Stats
    const agencyReferrals = students.reduce((acc, s) => {
        if (s.referral_agent_id) {
            acc[s.referral_agent_id] = (acc[s.referral_agent_id] || 0) + 1;
        }
        return acc;
    }, {} as Record<string, number>);

    // Branch Leaderboard
    const branchStats = students.reduce((acc, s) => {
        acc[s.branch] = (acc[s.branch] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const recentTransactions = allPayments
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
        .map(p => {
            const student = students.find(s => s.payments?.some(sp => sp.id === p.id));
            return {
                studentName: student?.name || 'Unknown',
                amount: p.amount,
                date: p.date,
                status: p.status,
                type: p.type
            };
        });

    return {
        total,
        verified,
        pending,
        genderDist,
        categoryDist,
        registrationDist,
        stateDist,
        cityDist,
        financialStats: {
            totalRevenueTarget,
            collectedRevenue,
            pendingRevenue,
            paymentVelocity
        },
        agencyReferrals,
        branchStats,
        recentTransactions
    };
}
